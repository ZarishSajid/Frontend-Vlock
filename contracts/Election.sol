pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

// import "@nomiclabs/builder/console.sol";

contract Election {
    // Model a Candidate
    struct Candidate {
        uint id;
        string sapid;
        string name;
        uint voteCount;
        string department;
        string email;
    }

    struct Poll {
        uint256 id;
        string pollid;
        string option;
        uint256 voteCount;
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
            polls[pollCount].voteCount ++;
            voters[msg.sender]=true;
            emit voteEvent(pollid,option);

        } else {
            check = false;
            voters[msg.sender]=true;
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
    mapping(uint => Candidate) public candidates;
    // Store Candidates Count
    uint public candidatesCount;
  //  string public partyFetch;

    // voted event
    event votedEvent (
        uint indexed _candidateId
    );

    event registerCandidate (
        uint indexed _candidateId
    );

    constructor() public {
   //     console.log("Welcome to Election");
      
       addCandidate("2400","Zaraa", "rajazara@gmail.com", "FC");
       addCandidate("2500","Zarish", "zarish@gmail.com", "BCA");
       
        
    }

    function addCandidate (string memory sap, string memory _name, string memory email, string memory dep) public {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, sap, _name,0,email,dep);
        emit registerCandidate(candidatesCount);
        // console.log("Message from Solidity trHello World", candidates);
    }


    function vote (uint _candidateId) public {
        // require that they haven't voted before
      require(!voters[msg.sender],"Message from Solidity trHello World");

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Message Valid from Solidity trHello World");

        // record that voter has voted
        voters[msg.sender] = true;

        // update candidate vote Count
        candidates[_candidateId].voteCount ++;

        // trigger voted event
        emit votedEvent(_candidateId);
    }
}
