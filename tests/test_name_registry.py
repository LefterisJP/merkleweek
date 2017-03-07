from __future__ import division


def test_name_registry(chain, accounts):
    contract = chain.get_contract('NameRegistry')
    res = contract.transact({'from': accounts[0]}).register('Lefteris')
    

    events = contract.pastEvents("NameRegistered").get()
    assert len(events) == 1
    e = events[0]
    assert e["args"]["a"] == accounts[0]
    assert e["args"]["name"] == 'Lefteris'

    res = contract.call().name_for(accounts[0])
    assert res == 'Lefteris'
