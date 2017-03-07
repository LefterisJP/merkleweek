from __future__ import division

import pytest
from ethereum.tester import TransactionFailed


def test_flawed_custodian(chain, accounts, web3):
    # Deploy the Custodian Contract
    contract_balance = 200000000000000
    contract = chain.get_contract(
        'CustodianFlawed',
        deploy_transaction={'from': accounts[0], 'value': contract_balance},
        deploy_args=[accounts[0]]
    )
    # Assert custodian is set and balance is correct
    assert contract.call().custodian() == accounts[0]
    assert web3.eth.getBalance(contract.address) == contract_balance

    # Assert changing to a normal account custodian works
    start_balance = web3.eth.getBalance(accounts[0])
    contract.transact({'from': accounts[0], 'gas': 40000}).change_custodian(
        accounts[1]
    )
    end_balance = web3.eth.getBalance(accounts[0])
    assert end_balance > start_balance + contract_balance / 2 - 1000
    contract_balance /= 2
    assert web3.eth.getBalance(contract.address) == contract_balance
    assert contract.call().custodian() == accounts[1]

    # Assert changing to a contract custodian works
    contract_custodian = chain.get_contract('ContractCustodian')
    assert web3.eth.getBalance(contract_custodian.address) == 0
    contract.transact({'from': accounts[1], 'gas': 40000}).change_custodian(
        contract_custodian.address
    )
    contract_balance /= 2
    assert web3.eth.getBalance(contract.address) == contract_balance
    assert web3.eth.getBalance(contract_custodian.address) == 0
    assert contract.call().custodian() == contract_custodian.address

    # And now the tricky part, sending to a contract custodian will work
    # but the internal send will not work due to Out Of Gas. This will not be
    # propagated and since we do not check for it we won't see it
    # and change custodian without paying out the proper amount of money
    contract.transact({'from': accounts[0], 'gas': 40000}).change_custodian(accounts[0])
    assert web3.eth.getBalance(contract_custodian.address) == 0
    # The proper amount of money was not paid!
    assert web3.eth.getBalance(contract.address) != contract_balance / 2
    # But the custodian changed anyway! That's bad :(
    assert contract.call().custodian() == accounts[0]


def test_fixed_custodian(chain, accounts, web3):
    # Deploy the Custodian Contract
    contract_balance = 200000000000000
    contract = chain.get_contract(
        'CustodianFixed',
        deploy_transaction={'from': accounts[0], 'value': contract_balance},
        deploy_args=[accounts[0]]
    )
    # Assert custodian is set and balance is correct
    assert contract.call().custodian() == accounts[0]
    assert web3.eth.getBalance(contract.address) == contract_balance

    # Assert changing to a normal account custodian works
    start_balance = web3.eth.getBalance(accounts[0])
    contract.transact({'from': accounts[0], 'gas': 40000}).change_custodian(
        accounts[1]
    )
    end_balance = web3.eth.getBalance(accounts[0])
    assert end_balance > start_balance + contract_balance / 2 - 1000
    contract_balance /= 2
    assert web3.eth.getBalance(contract.address) == contract_balance
    assert contract.call().custodian() == accounts[1]

    # Assert changing to a contract custodian works
    contract_custodian = chain.get_contract('ContractCustodian')
    assert web3.eth.getBalance(contract_custodian.address) == 0
    contract.transact({'from': accounts[1], 'gas': 40000}).change_custodian(
        contract_custodian.address
    )
    contract_balance /= 2
    assert web3.eth.getBalance(contract.address) == contract_balance
    assert web3.eth.getBalance(contract_custodian.address) == 0
    assert contract.call().custodian() == contract_custodian.address

    # And now the tricky part, sending to a contract custodian will work
    # but the internal send will not work due to Out Of Gas.
    # Now in the fixed version we check for send() failure and so the entire
    # transaction will throw
    with pytest.raises(TransactionFailed):
        contract.transact({'from': accounts[0], 'gas': 40000}).change_custodian(
            accounts[0]
        )
    assert web3.eth.getBalance(contract_custodian.address) == 0
    # The proper amount of money was not paid!
    assert web3.eth.getBalance(contract.address) != contract_balance / 2
    # But this time the custodian also did not change (since we throw)
    assert contract.call().custodian() != accounts[0]
