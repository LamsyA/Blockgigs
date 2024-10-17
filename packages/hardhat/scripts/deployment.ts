import hre from "hardhat";

async function main() {
  const Adwumapa = await hre.ethers.getContractFactory("Adwumapa");
  const adwumapa = await Adwumapa.deploy();

  await adwumapa.waitForDeployment();

  console.log(`adwumapa deployed to  ${adwumapa.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
