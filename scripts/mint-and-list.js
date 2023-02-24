const { ethers } = require("hardhat")

async function mintAndList() {
    const nftMarketplace = await ethers.getContract("NftMarketPlace")
    const basicNft = await ethers.getContract("BasicNft")

    console.log("minting...")
    const mintTx = await basicNft.mintNft()
    const mintTxReceipt = await mintTx.wait(1)
    const tokenId = mintTxReceipt.events[0].args.tokenId
    console.log("Aproving Nft...")

    const approvalTx = await basicNft.approve(nftMarketplace.address, tokenId)
    await approvalTx.wait(1)
    console.log("Listing NFT...")
    const tx = await nftMarketplace.listItem(nftMarketplace.address, tokenId)
    await tx.wait(1)
    console.log("Listed!!!")
}

mintAndList()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
