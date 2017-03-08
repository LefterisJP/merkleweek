from __future__ import division

import pytest
from ethereum.tester import TransactionFailed


def test_flawed_random(chain, accounts, web3):
    # Deploy the Random Contract
    contract = chain.get_contract(
        'RandomFlawed',
        deploy_transaction={'from': accounts[0]}
    )

    # print the number
    num = contract.call({'from': accounts[0]}).getRandomNumber()
    print("Random NUM IS {}".format(num))
