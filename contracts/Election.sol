pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

// import "@nomiclabs/builder/console.sol";

contract Election {
    // Model a Candidate
   
    struct Poll {
        uint256 id;
        string pollid;
        string option;
        uint256 voteCount;
        //
    }

    // mapping(address => bool) public voters;
    mapping(uint256 => Poll) public polls;
    uint256 public pollCount;
    bool public check=false;


    event voteEvent(string indexed pollId, string indexed option);

    function voted(string memory pollid, string memory option) public
    {
        if(keccak256(abi.encodePacked((polls[pollCount].pollid))) == keccak256(abi.encodePacked((pollid))) && (keccak256(abi.encodePacked(polls[pollCount].option)) == (keccak256(abi.encodePacked(option)))))
        {
            check = true;
            require(!voters[msg.sender], "Message from Solidity trHello World");
            voters[msg.sender] = true;
              
            polls[pollCount].voteCount ++;
            emit voteEvent(pollid,option);

        } else {
            check = false;
            require(!voters[msg.sender], "User Already Voted");
            voters[msg.sender] = true;
            pollCount++;
            polls[pollCount]= Poll(pollCount, pollid, option,0);
            polls[pollCount].voteCount ++;
            emit voteEvent(pollid,option);
        }

        
    }


    function getAll() public view returns (Poll[] memory){

        Poll [] memory myPoll = new Poll[](pollCount);
        for (uint256 i = 0 ; i <pollCount; i++)    {
            Poll storage pol = polls[i];
            myPoll[i] = pol;
        }
        return myPoll;
    }        

    // Store accounts that have voted
    mapping(address => bool) public voters;
    // Store Candidates
    // Fetch Candidate



    constructor() public {
        
    }


   
}
