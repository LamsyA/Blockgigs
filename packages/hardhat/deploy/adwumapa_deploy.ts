import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";
import { Adwumapa__factory } from "../typechain-types";

/**
 * Deploys a contract named "Adwumapa" using the deployer account and
 * constructor arguments set to the deployer address.
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployAdwumapa: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network sepolia`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  console.log("testing ");
  const deploymentResult = await deploy("Adwumapa", {
    from: deployer,
    // Contract constructor arguments
    args: [],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  // Get the deployed contract to interact with it after deploying.
  const signer = await hre.ethers.provider.getSigner(deployer);
  console.log("testing deployment");
  const adwumapa = Adwumapa__factory.connect(deploymentResult.address, signer);
  console.log("Contract deployed at:", deploymentResult.address);
};

export default deployAdwumapa;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags Adwumapa
deployAdwumapa.tags = ["Adwumapa"];
