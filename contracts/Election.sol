pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

contract Election {
// Model a Candidate
struct Poll {
// uint256 id;
string pollid;
string option;
uint256 voteCount;
}

struct Verification {
string pollid;
address voter;
}

Verification[] public proposals;
Poll[] public polls;

mapping(address => bool) public voters;
// mapping(uint256 => Poll) public polls;

uint256 public pollCount;

constructor() public {}

bool public check = false;
bool public voterExist = false;

event votedEvent(string indexed pollId, string indexed option);

function vote(string memory pollid, string memory option) public {
for (uint256 p = 0; p < proposals.length; p++) {
if (
keccak256(abi.encodePacked((proposals[p].pollid))) ==
keccak256(abi.encodePacked((pollid))) &&
proposals[p].voter == msg.sender
) {
voterExist = true;
voters[msg.sender] = true;
require(!voters[msg.sender], "User Already Voted ");
break;
}
}

voterExist = checkOptionExist(pollid, option);
if (voterExist == false) {
check = false;
proposals.push(Verification({pollid: pollid, voter: msg.sender}));
polls.push(Poll({pollid: pollid, option: option, voteCount: 1}));
}
}

function checkOptionExist(string memory id, string memory opt)
public
returns (bool)
{
for (uint256 i = 0; i < polls.length; i++) {
if (
keccak256(abi.encodePacked((polls[i].pollid))) ==
keccak256(abi.encodePacked((id))) &&
(keccak256(abi.encodePacked(polls[i].option)) ==
(keccak256(abi.encodePacked(opt))))
) {
polls[i].voteCount++;
proposals.push(Verification({pollid: id, voter: msg.sender}));

return true;
}
}
}

function getAll() public view returns (Poll[] memory) {
return polls;
}

function getVoters() public view returns (Verification[] memory) {
return proposals;
}

function getLength() public view returns (uint256) {
return polls.length;
}

}