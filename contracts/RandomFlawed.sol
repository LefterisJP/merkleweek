pragma solidity ^0.4.4;

contract RandomFlawed {
    
    function getRandomNumber() returns (uint) {
        return uint(sha3(block.blockhash(block.number))) % 10 + 1;
    }
}
