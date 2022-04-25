const CONTRACT_ADDRESS = "0x3434D450c83Ac2cD1EeEd89019874a134dD09416"
const API_URL="https://speedy-nodes-nyc.moralis.io/7b2cdb644152ec2b77693bc4/avalanche/testnet"
const Web3 = require('web3')
const contract = require("../metaDataApi/artifacts/contracts/testd.sol/testdf.json");

const provider = new Web3.providers.HttpProvider(API_URL);
const web3 = new Web3(provider);
const nftContract = new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS)

module.exports = {

  getTotalSupply : () => {
    var tsupply = 
    nftContract.methods.MAX_SUPPLY().call(function (err, res) {
      if (err) {
        console.log("An error occured", err)
        return
      }
      tsupply = res
  })
  return tsupply
  }
};

