pragma solidity ^0.5.16;

contract Login {
    // Model a Candidate

    string myname;
    string myemail;

    struct Log {
        uint256 id;
        int256 sap_id;
        string name;
        string departmnet;
        string degree;
        string password;
        string email;
    }

    mapping(uint256 => Log) public logs;
    uint256 public logCount;

    constructor() public {
        //console.log("Login Contract")
        addLog(2400, "Sohail", "FC", "BSSE", "ABD123", "test@gmail.com");
        addLog(2500, "Tanzeela", "FC", "BSSE", "FGH123", "test1@gmail.com");
        myname = "Zara";
        myemail = "test.com";
    }

    function addLog(
        int256 sap,
        string memory _name,
        string memory dep,
        string memory degree,
        string memory pass,
        string memory email
    ) private {
        logCount++;
        logs[logCount] = Log(logCount, sap, _name, dep, degree, pass, email);
    }

    function setName(string memory _name) public {
        myname = _name;
    }

    function getName() public view returns (string memory) {
        return myname;
    }

    function setEmail(string memory _email) public {
        myemail = _email;
    }

    function getEmail() public view returns (string memory) {
        return myemail;
    }
}
