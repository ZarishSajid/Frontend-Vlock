pragma solidity ^0.5.16;

contract Polls {
    // Model a Candidate
    int id;
    struct Poll {
        uint256 id;
        string option;
        uint256 voteCount;
        
    }
        

   
    mapping(address => bool) public voters;

    mapping(uint256 => Poll) public options;

    
    uint256 public candidatesCount;

   
    event votedEvent(uint256 indexed _candidateId);

    event registerCandidate(uint256 indexed _candidateId);

    constructor() public {}

    function addOption(string memory option) public {
        candidatesCount++;
        options[candidatesCount] = Poll(candidatesCount, option,0);
        emit registerCandidate(candidatesCount);
    }

   

    function vote(uint256 _candidateId) public {
        // require that they haven't voted before
        require(!voters[msg.sender], "Message from Solidity trHello World");

        // require a valid candidate
        require(
            _candidateId > 0 && _candidateId <= candidatesCount,
            "Message Valid from Solidity trHello World"
        );

        // record that voter has voted
        voters[msg.sender] = true;

        // update candidate vote Count
      options[_candidateId].voteCount++;

        // trigger voted event
        emit votedEvent(_candidateId);
    }
}

