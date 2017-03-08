pragma solidity ^0.4.4;

contract ForcePay {

    address owner;
    function ForcePay() payable {
        owner = msg.sender;
    }

    function surprise(address beneficiary) {
        if (owner != msg.sender) {
            throw;
        }
        selfdestruct(beneficiary);
    }
}
