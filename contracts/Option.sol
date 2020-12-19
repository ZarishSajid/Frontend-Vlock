  pragma solidity ^0.5.16;

  contract Option {

     /* Bytes32 Array */
     bytes32[] public MyBytesArray;

     


     function addItem(bytes32 _item) public {
          MyBytesArray.push(_item) -1;
     }

  
   
     
   

 function getMyBytesArray(uint index) public view returns(bytes32) {
  return(MyBytesArray[index]);
}
  }