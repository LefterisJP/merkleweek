pragma solidity ^0.4.4;

contract DiscountPoolFixed {

    mapping (address => uint) public tokens;
    address trustee;


    function DiscountPoolFixed(address addr, uint amount, address addr2, uint amount2) payable {
        tokens[addr] = amount;
        tokens[addr2] = amount2;
        trustee = addr;
        if (msg.value != amount + amount2) {
            throw;
        }
    }

    function escapeHatch() {
        if (msg.sender == trustee) {
            msg.sender.send(this.balance);
        }
    }

    // get the amount of money corresponding to my number of tokens
    function getMoney() {
        uint value_to_send = tokens[msg.sender];
        tokens[msg.sender] = 0;
        if (!msg.sender.call.value(value_to_send)()) {
            throw;
        }
    }

    function sendToken(address receiver, uint amount) {
        if (tokens[msg.sender] < amount) {
            throw;
        }
        tokens[msg.sender] -= amount;
        tokens[receiver] += amount;
    }
}
