const hre = require("hardhat");

async function main() {
    const Warranty = await hre.ethers.getContractFactory("Warranty"); // Match the contract name case
    const warranty = await Warranty.deploy();

    await warranty.deployed();
    console.log("Warranty contract deployed to:", Warranty.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
