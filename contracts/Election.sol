pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

contract Election {

    string myname;
    string myemail; 
    // Model a Candidate
    struct Poll {
        uint256 id;
        string pollid;
        string option;
        uint256 voteCount;
    }

    struct Verification{
      string pollid;
      address voter;
    }
    
        Verification[] public proposals;

    mapping(address => bool) public voters;
    mapping(uint256 => Poll) public polls;
 

    uint256 public pollCount;

    constructor() public {}

    bool public check = false;
    bool public voterExist = false;

    event votedEvent(string indexed pollId, string indexed option);

    function vote(string memory pollid, string memory option) public {
   
         for (uint p = 0; p < proposals.length; p++) {
            if(  keccak256(abi.encodePacked((proposals[p].pollid))) ==
            keccak256(abi.encodePacked((pollid)))  &&   proposals[p].voter == msg.sender)
             {
                     voterExist= true;
                      voters[msg.sender]=true;
                      require(!voters[msg.sender], "User Already Voted ");
                      break;
            }
        }
      
if(keccak256(abi.encodePacked((polls[pollCount].pollid))) == keccak256(abi.encodePacked((pollid)))

&& (keccak256(abi.encodePacked(polls[pollCount].option)) == (keccak256(abi.encodePacked(option))))  )
{
     polls[pollCount].voteCount++;   
         proposals.push(Verification({
                pollid:pollid,
                voter: msg.sender
            }));
 }
   
else

{
//stonedetailsTable[0].stoneidsbycutter.push("hello");

check = false;
 proposals.push(Verification({
                pollid:pollid,
                voter: msg.sender
            }));
pollCount++;
polls[pollCount].id= pollCount;
polls[pollCount].pollid= pollid;
polls[pollCount].option= option;
polls[pollCount].voteCount= 0;
polls[pollCount].voteCount ++;
emit votedEvent(pollid,option);

}

        
    }

     function setName(string memory _name) public {
        myname = _name;
    }

    function getName() public view returns (string memory) {
        return myname;
    }

    function getAllData() public view returns (Poll[] memory) {
        Poll[] memory myPoll = new Poll[](pollCount);
        for (uint256 i = 0; i < pollCount; i++) {
            Poll storage pol = polls[i];
            myPoll[i] = pol;
        }

        return myPoll;
    }
}
