var Election = artifacts.require("./Election.sol");
var Registration = artifacts.require("./Registration.sol");
var Login = artifacts.require("./Login.sol");
var Option = artifacts.require("./Option.sol");
var Polls= artifacts.require("./Polls.sol")

module.exports = function(deployer) {
  deployer.deploy(Election);
  deployer.deploy(Registration);
  deployer.deploy(Login);
  deployer.deploy(Option);
  deployer.deploy(Polls);

};

