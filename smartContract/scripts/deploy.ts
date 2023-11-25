import { ethers } from "hardhat";

async function main() {
  const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("deploying....");

  const simpleStorage = await simpleStorageFactory.deploy();
  await simpleStorage.waitForDeployment();


  const contractAddress = await simpleStorage.getAddress();
  console.log(`contract deployed at ${contractAddress}`);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
