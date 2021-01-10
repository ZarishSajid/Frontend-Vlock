pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

contract Election {
    // Model a Candidate
    struct Poll {
        uint256 id;
        string pollid;
        string option;
        uint256 voteCount;
        address[] voter;
    }

    mapping(address => bool) public voters;
    mapping(uint256 => Poll) public polls;

    uint256 public pollCount;

    constructor() public {}

    bool public check = false;
    bool public voterExist = false;

    event votedEvent(string indexed pollId, string indexed option);

    function vote(string memory pollid, string memory option) public {
        if (
            keccak256(abi.encodePacked((polls[pollCount].pollid))) ==
            keccak256(abi.encodePacked((pollid))) &&
            (keccak256(abi.encodePacked(polls[pollCount].option)) ==
                (keccak256(abi.encodePacked(option))))
        ) {
            for (uint256 i = 0; i < polls[pollCount].voter.length; i++) {
                if (polls[pollCount].voter[i] == msg.sender) {
                    voterExist = true;
                    voters[msg.sender] = true;
                    require(!voters[msg.sender], "User Already Voted ");
                } else {
                    polls[pollCount].voter.push(msg.sender);
                    polls[pollCount].voteCount++;
                    // here neeed to store id and suser
                }
            }
        } else {
            //stonedetailsTable[0].stoneidsbycutter.push("hello");

            check = false;
            pollCount++;
            polls[pollCount].id = pollCount;
            polls[pollCount].pollid = pollid;
            polls[pollCount].option = option;
            polls[pollCount].voteCount = 0;
            polls[pollCount].voter.push(msg.sender);
            polls[pollCount].voteCount++;
            emit votedEvent(pollid, option);
        }
    }

    function getAll() public view returns (Poll[] memory) {
        Poll[] memory myPoll = new Poll[](pollCount);
        for (uint256 i = 0; i < pollCount; i++) {
            Poll storage pol = polls[i];
            myPoll[i] = pol;
        }
        return myPoll;
    }
}
