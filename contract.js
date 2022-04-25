const CONTRACT_ADDRESS = "0xc63d5fBAe773d1d52E98e955cd689c3eaf0113FF"
const API_URL="https://speedy-nodes-nyc.moralis.io/7b2cdb644152ec2b77693bc4/avalanche/mainnet"
const Web3 = require('web3')
const contract = require("./artifacts/contracts/dwarf.sol/dwarfknights.json");

const provider = new Web3.providers.HttpProvider(API_URL);
const web3 = new Web3(provider);
const nftContract = new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS)

module.exports = {

  getTotalSupply : () => {
    var tsupply = 
    nftContract.methods.totalSupply().call(function (err, res) {
      console.log(res)
      if (err) {
        console.log("An error occured", err)
        return
      }
      tsupply = res
  })
  return tsupply
  }
};

