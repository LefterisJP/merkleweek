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

    // example of iterating over arbitrarily large collection
    // already have the total_contributions variable but this function
    // is just to showcase loops that are okay.
    function getSumOfParticipantsContributions() constant returns (uint){
        uint sum = 0;
        for (uint i = 0; i < all_participants.length; i++) {
            sum += contributions[all_participants[i]];
        }
    }
}
