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

contract CustodianFlawed {

    mapping (address => uint) public tokens;
    address public custodian;


    function CustodianFlawed(address c) payable {
        custodian = c;
    }

    function change_custodian (address new_custodian) {
        // send 50% of the funds to the previous custodian
        custodian.send(this.balance/2);
        //change custodian
        custodian = new_custodian;
    }
}
