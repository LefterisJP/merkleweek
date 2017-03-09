from __future__ import division

import pytest
from ethereum.tester import TransactionFailed


def test_flawed_fallback(chain, accounts, web3):
    # Deploy the Contract
    contract = chain.get_contract(
        'FallbackFlawed',
        deploy_transaction={'from': accounts[0]}
    )

    with pytest.raises(TransactionFailed):
        web3.eth.sendTransaction(
            {
                'from': accounts[0],
                'value': 999999999,
                'to': contract.address,
                'gas': 21000}
        )


def test_fixed_fallback(chain, accounts, web3):
    contract = chain.get_contract(
        'FallbackFixed',
        deploy_transaction={'from': accounts[0]}
    )

    contract.transact({'from': accounts[0], 'value': 999999999}).deposit()
    assert web3.eth.getBalance(contract.address) == 999999999
