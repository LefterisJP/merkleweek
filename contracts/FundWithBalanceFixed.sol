pragma solidity ^0.4.4;

contract FundWithBalanceFixed {

    mapping (address => uint) public contributions;
    address[] all_participants;
    uint public total_contributions;
    uint public total_balance;

    function participate() internal {
        contributions[msg.sender] = msg.value;
        total_contributions += msg.value;
        total_balance += msg.value;
        all_participants.push(msg.sender);
    }

    function FundWithBalanceFlawed() payable {
        participate();
    }

    function buy() payable {
        participate();
    }

    function cashOut() {
        uint contribution = contributions[msg.sender];
        if (contribution == 0) {
            throw;
        }
        uint share = contribution * total_contributions / total_balance;
        contributions[msg.sender] = 0;
        total_contributions -= share;
        total_balance -= share;
        if (!msg.sender.send(share)) {
            throw;
        }
    }

    function ()  {
        throw;
    }
}
