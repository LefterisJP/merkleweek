from __future__ import division


def test_discount_pool(chain, accounts, web3):
    # Deploy the flawed discount pool contract
    contract = chain.get_contract(
        'DiscountPoolFlawed',
        deploy_transaction={'from': accounts[0], 'value': 600000000000000},
        deploy_args=[accounts[0], 300000000000000, accounts[1], 300000000000000]
    )
    # Assert both accounts have same amount of tokens
    assert contract.call().tokens(accounts[0]) == 300000000000000
    assert contract.call().tokens(accounts[1]) == 300000000000000
    assert web3.eth.getBalance(contract.address) == 600000000000000

    # Malicious account[1] deploys the attack contract
    attack_contract = chain.get_contract(
        'DiscountPoolAttack',
        deploy_transaction={'from': accounts[1]},
        deploy_args=[contract.address]
    )

    # Then it sends all its tokens to the attack contract so that it can act on its behalf
    contract.transact({'from': accounts[1]}).sendToken(
        attack_contract.address, 300000000000000
    )
    assert contract.call().tokens(accounts[1]) == 0
    assert contract.call().tokens(attack_contract.address) == 300000000000000

    # Finally the attack is performed, no tokens are left but all money is
    # gone from the original contract and now resides in the attack contract
    attack_contract.transact({'from': accounts[1]}).attack()
    assert contract.call().tokens(accounts[1]) == 0
    assert contract.call().tokens(attack_contract.address) == 0
    assert web3.eth.getBalance(contract.address) == 0
    assert web3.eth.getBalance(attack_contract.address) == 600000000000000

    # Finally account[1] can get his loot from the attack contract
    start_balance = web3.eth.getBalance(accounts[1])
    attack_contract.transact({'from': accounts[1]}).getMyLoot()
    end_balance = web3.eth.getBalance(accounts[1])
    # checking close to 600000000000000 and not exact due to gas costs
    assert end_balance - start_balance > 590000000000000
