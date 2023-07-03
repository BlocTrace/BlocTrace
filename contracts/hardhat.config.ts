import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  paths: { tests: "tests" },
};

module.exports = {
  networks: {
    mainnet: { avalanche, avalanchefuji },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "Q3CGS4W85F73WSGBWAKA6X3THHSM8AUYXF",
  },
};

export default config;
