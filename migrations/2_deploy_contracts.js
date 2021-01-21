var Election = artifacts.require("./Election.sol");

// var VotingPoll = artifacts.require("./VotingPoll.sol");

module.exports = function(deployer) {
  deployer.deploy(Election);

  // deployer.deploy(VotingPoll);

};

