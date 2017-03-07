pragma solidity ^0.4.4;

contract FundFlawed {

    mapping (address => uint) contributions;
    address[] all_participants;
    uint public total_contributions;
    uint public total_balance;

    function participate() internal {
        contributions[msg.sender] = msg.value;
        total_contributions += msg.value;
        total_balance += msg.value;
        all_participants.push(msg.sender);
    }

    function FundFlawed() payable {
        participate();
    }

    function buy() payable {
        participate();
    }

    function cashOut() {
        for (uint i = 0; i < all_participants.length; i++) {
            uint contribution = contributions[all_participants[i]];
            uint share = contribution * total_contributions / total_balance;
            contributions[all_participants[i]] = 0;
            if (!all_participants[i].send(share)) {
                throw;
            }
        }
    }

    function () payable {
        total_balance += msg.value;
        // this is either for donations or outside income
    }
}
