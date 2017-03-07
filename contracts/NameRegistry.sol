pragma solidity ^0.4.4;

contract NameRegistry {
    mapping (address => string) public addr_to_string;
    mapping (string => address) string_to_addr;

    event NameRegistered(address a, string name);


    function NameRegistry () {
    }

    function register (string name) {
        if (string_to_addr[name] != 0x0) {
            throw;
        }
        string_to_addr[name] = msg.sender;
        addr_to_string[msg.sender] = name;
        NameRegistered(msg.sender, name);
    }

    function name_for(address addr) constant returns (string) {
        return addr_to_string[addr];
    }
}
