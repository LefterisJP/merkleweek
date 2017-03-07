pragma solidity ^0.4.4;

contract FundFixed {

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

    function FundFixed() payable {
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
        if (!msg.sender.send(share)) {
            throw;
        }
    }

    function () payable {
        total_balance += msg.value;
        // this is either for donations or outside income
    }
}
