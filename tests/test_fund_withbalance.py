from __future__ import division

import pytest
from ethereum.tester import TransactionFailed


def test_flawed_fund_withbalance(chain, accounts, web3):
    # Deploy the Fund Contract
    balance = 100000000000000000
    contract = chain.get_contract(
        'FundWithBalanceFlawed',
        deploy_transaction={'from': accounts[0], 'value': 0}
    )

    # And now everyone wants to buy in
    for account in accounts:
        contract.transact({'from': account, 'value': balance}).buy()
    # and everyone gets their share
    for account in accounts:
        assert contract.call().contributions(account) == balance
        old_balance = web3.eth.getBalance(account)
        contract.transact({'from': account}).cashOut()
        new_balance = web3.eth.getBalance(account)
        assert new_balance > old_balance + balance - 100000


    # But .... if someone sneaky manages to somehow send money to the contract
    contract = chain.get_contract(
        'FundWithBalanceFlawed',
        deploy_transaction={'from': accounts[0], 'value': 0}
    )
    force_pay_contract = chain.get_contract(
        'ForcePay',
        deploy_transaction={'from': accounts[0], 'value': balance * 10000}
    )
    force_pay_contract.transact({'from': accounts[0]}).surprise(contract.address)

    # we try the same distribution as before
    for account in accounts:
        contract.transact({'from': account, 'value': balance}).buy()
    # and everyone gets their share
    all_acounts_okay = True
    for account in accounts:
        assert contract.call().contributions(account) == balance
        old_balance = web3.eth.getBalance(account)
        contract.transact({'from': account}).cashOut()
        new_balance = web3.eth.getBalance(account)
        if new_balance > old_balance + balance - 100000:
            all_acounts_okay = False
    # But unfortunately this time, not everyone got their fair share due to
    # the contract's balance being off and our accounting relying on it
    assert not all_acounts_okay


def test_fixed_fund_withbalance(chain, accounts, web3):
    # Deploy the Fund Contract
    balance = 100000000000000000
    contract = chain.get_contract(
        'FundWithBalanceFixed',
        deploy_transaction={'from': accounts[0], 'value': 0}
    )

    # And now everyone wants to buy in
    for account in accounts:
        contract.transact({'from': account, 'value': balance}).buy()

    # We have the same malicious move
    force_pay_contract = chain.get_contract(
        'ForcePay',
        deploy_transaction={'from': accounts[0], 'value': balance * 10000}
    )
    force_pay_contract.transact({'from': accounts[0]}).surprise(contract.address)

    # but everyone gets their share regardless!
    for account in accounts:
        assert contract.call().contributions(account) == balance
        old_balance = web3.eth.getBalance(account)
        contract.transact({'from': account}).cashOut()
        new_balance = web3.eth.getBalance(account)
        assert new_balance > old_balance + balance - 100000
