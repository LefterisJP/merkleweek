pragma solidity ^0.4.4;

contract FallbackFixed {

    address owner;
    mapping (address => uint) public deposits;
    function FallbackFlawed() payable {
        owner = msg.sender;
    }

    event Deposited(address a, uint value);

    function deposit() payable {
        deposits[msg.sender] = msg.value;
    }
    
    function () payable {
        Deposited(msg.sender, msg.value);
    }
}
