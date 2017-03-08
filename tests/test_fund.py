from __future__ import division

import pytest
from ethereum.tester import TransactionFailed


def test_flawed_fund(chain, accounts, web3):
    # Deploy the Fund Contract
    balance = 100000000000000000
    contract = chain.get_contract(
        'FundFlawed',
        deploy_transaction={'from': accounts[0], 'value': balance}
    )

    # three more members buy into it
    contract.transact({'from': accounts[1], 'value': balance}).buy()
    contract.transact({'from': accounts[2], 'value': balance}).buy()
    contract.transact({'from': accounts[3], 'value': balance}).buy()
    # and someone else sends a donation/earned income for the fund doubling
    # everyone's ROI
    contract.transact({'from': accounts[4], 'value': balance * 4})

    # And now the fund pays out everyone's share
    previous_balances = {}
    for i in range(0, 4):
        previous_balances[accounts[i]] = web3.eth.getBalance(accounts[i])
    contract.transact({'from': accounts[4], 'gas': 90000}).cashOut()
    # make sure everyone got 2 times what they put in.
    for i in range(0, 4):
        web3.eth.getBalance(accounts[i]) > previous_balances[accounts[i]] + balance * 2

    # Now for the unhappy scenario let's redeploy
    contract = chain.get_contract(
        'FundFlawed',
        deploy_transaction={'from': accounts[0], 'value': balance}
    )
    # But now a lot more people want to buy in
    for account in accounts:
        contract.transact({'from': account, 'value': balance}).buy()

    # And now the if the fund pays out everyone's share, after some point
    # even with the maximum amount of gas the transaction will always be
    # failing and the money will be stuck in the contract.
    with pytest.raises(TransactionFailed):
        contract.transact({'from': accounts[4], 'gas': 90000}).cashOut()


def test_fixed_fund(chain, accounts, web3):
    # Deploy the Fixed Fund Contract
    balance = 100000000000000000
    contract = chain.get_contract(
        'FundFixed',
        deploy_transaction={'from': accounts[0], 'value': 0}
    )

    # And now everyone wants to buy in
    for account in accounts:
        contract.transact({'from': account, 'value': balance}).buy()

    # But unlike the flawed scenario, here we follow the strategy of each
    # single contributor cashing out on their own with their own call instead
    # of doing it all in a batch call with an unbound loop
    for account in accounts:
        assert contract.call().contributions(account) == balance
        old_balance = web3.eth.getBalance(account)
        contract.transact({'from': account}).cashOut()
        new_balance = web3.eth.getBalance(account)
        assert new_balance > old_balance + balance - 100000
