pragma solidity ^0.4.4;

contract FallbackFlawed {

    address owner;
    mapping (address => uint) public deposits;
    function FallbackFlawed() payable {
        owner = msg.sender;
    }

    
    function () payable {
        deposits[msg.sender] = msg.value;
    }
}
