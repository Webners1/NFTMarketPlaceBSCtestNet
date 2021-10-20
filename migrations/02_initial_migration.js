const myNFTs = artifacts.require("myNFTs");

module.exports = function(deployer) {
  deployer.deploy(myNFTs);
};
