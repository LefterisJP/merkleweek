pragma solidity ^0.4.4;


contract ContractCustodian {

    mapping(uint => uint) public stuff;

    function () payable {
        // a lot of SSTORE that eat up gas
        for (uint i = 0; i < 100000; i++) {
            stuff[i] = i;
        }
    }
}

contract CustodianFixed {

    mapping (address => uint) public tokens;
    address public custodian;


    function CustodianFixed(address c) payable {
        custodian = c;
    }

    function change_custodian (address new_custodian) {
        // send 50% of the funds to the previous custodian
        if (!custodian.send(this.balance/2)) {
            throw;
        }
        //change custodian
        custodian = new_custodian;
    }
}
