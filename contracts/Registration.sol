pragma solidity ^0.5.16;

contract Registration {
    // Model a Candidate
    struct User {
        uint id;
        int sap_id;
        string name;
        string departmnet;
        string degree;
        string password;
        string email;
    }

  
    mapping(uint => User) public users;
    uint public usersCount;

    
    constructor() public {
        addUser(2400,"Zara", "FC","BSSE","ABD123","test@gmail.com");
        addUser(2500,"Zarish", "FC","BSSE","FGH123","test1@gmail.com");
        
    }

    function addUser (int sap, string memory _name, string memory dep, string memory degree,  string memory pass,  string memory email) private {
      usersCount ++;
      users[usersCount] = User(usersCount,sap, _name, dep,degree,pass,email);
       
    }


    
}
