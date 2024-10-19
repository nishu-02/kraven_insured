require('dotenv').config();
require('@nomiclabs/hardhat-ethers');

module.exports = {
  solidity: "0.8.17",
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`]  // 0x prefix added here
    }
  }
};
