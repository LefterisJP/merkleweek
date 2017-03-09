## Etherpad for sharing information


https://public.etherpad-mozilla.org/p/merkleweek

## Setting up our testing environment

We will be using the go-ethereum client and the [populus](https://github.com/pipermerriam/populus) smart contract testing framework along with solidity.

### Seting up geth

Go to [go-ethereum](https://github.com/ethereum/go-ethereum)'s page and either clone and build it if you know how to or follow
the [installation instructions](https://github.com/ethereum/go-ethereum/wiki/Building-Ethereum).

### Setting up solc

Go to [solidity](https://github.com/ethereum/solidity/releases) releases page and get release 0.4.8.

### Setting up populus

You will need to have python in your system and solidity version 0.4.8 and not higher. Solidity v0.4.9 has a bug that causes it to not play well with many other tools including populus. If you have v0.4.9 please downgrade to 0.4.8.

- [Create](http://docs.python-guide.org/en/latest/dev/virtualenvs/) a python virtual environment and activate it.

- Run `pip install -r requirements.txt`

- And now you can run all the tests by `pytest tests/` or run each single test for each contract individually by pointing to its test file: `pytest tests/test_name_registry.py`.

## Connecting To Our Own Private Network

- Create a new directory for the chaindata of this private network. For our example I will call it `merkleweek`.

- Download the custom genesis file from [here](https://gist.github.com/LefterisJP/e008a5fc4f4fa65160b150258f16b72f).

- Enter the following geth command to initialize the custom chain data: `geth --datadir ~/merklechain --networkid 90317  init ~/merklechain/genesis.json `

- Start geth with the following arguments:
  ```geth --datadir ~/merklechain --networkid 90317 --bootnodes "enode://4022a711922d9c8f83a4762a1d501c8c4c15454924f6152fe20e20fca552495c821b1a45c68d1757e704005057215fbfb20701613a433647a3885350b97a4751@10.0.1.124:30303" --rpc console```

	  - Replace `~/merklechain` with the name of the directory you created for the private net
	  - Replace the `--bootnode` and its argument with the bootnode I will give you at the time of the conference. This will be my node.


## Smart Contract Security

### Checking results of send and call

In solidity `send()` and `call()` can be quite tricky if not used properly. They can fail and even throw but these errors do not automatically propagate upwards unless they are explicitly checked for.

The solution is simple. All `send` and `call()` invocations have to be checked for success and `throw;` in case of failure.

As an example of this problem and its solution in action please have a look at test_custodian.py

### Generating Randomness through block data

Generating randomness in a deterministic blockchain system such as ethereum is not an easy task. For the most trivial of cases you can generate random data by using block data as a randomness seed as we can see in RandomFlawed.sol. But the problem with such approaches is that depending on block data we render ourselves vulnerable to miners. A miner can influence the number by not publishing a block with an unwanted outcome and forfeit the 5 ETH reward. If more than 5 ETH is at stake on the outcome of the random number then people should not use such a hacky random generator.

A possible solution would be a DAO that people can participate in and all together generate random numbers. Examples are: [RanDAO](https://github.com/randao/randao) and MakerDAO.

The basic idea for both is the same. Many people participate in periods of voting where they provide hashes of a secret along with an ether deposit. After the voting period there is a revelation period where the secrets to the hashes are revealed and if the secrets match, then those hashes are used as seeds to generate a random number and send it to anyone requesting a random number during that period. People who lied about their secret lose the deposit. The voting and revelation period need to be sufficiently small so that random numbers can be generated as frequently as possible.


### Unbound loops

In normal programming languages we are used to looping over collections. In fact that is considered clean and neat coding. In Ethereum unbound loops should always be avoided since they introduce the risk of eventually iterating over a collection so large that even with the maximum block gas limit we will run out of gas. When this happens the contract is bricked. For an example of this in action check out `test_fund.py::test_flawed_fund()`.

In this example we have a fund which gathers contributions from its members. All members put in an amount of ether, the fund has also other external income and at some point the contributors get their earnings by the `cashOut()` function. This is nice and good
for a few contributors but if the amount of contributors increases a lot then we reach a point where the `cashOut()` function will always throw. As such the contract is bricked and useles and everyone's money is stuck in it forever.

The solution here is simple, and only requires us to change the way we think. Instead of having a function that will pay out the earnings of all contributors we should push the responsibility of withdrawing their earnings to each individual contributor. This is showcased by `test_fund.py::test_fixed_fund()`

Also it is important to note that there is one type of unbound loops that are A-Okay! You can always iterate over collections of arbitrary sizes if it's a `constant` function. As an example look at the `getSumOfParticipantsContributions()` in `FundFixed.sol`. Constant functions are functions that do not alter the state in any manner but are just reading from it and as such can be executed in a special manner, essentially just querying the blockchain where gas does not matter.

### Counting on `this.balance`

Never ever base your contract's accounting on `this.balance`. There are many ways to stop contract functions from accepting money but there is also ways to go around them. Even back in the DAO days someone could piggyback a value transfer on a public getter of a contract attribute and send money to a contract that did not expect it. This is why the DAO had no public getters.

This has been fixed in latest solidity versions with the introduction of the `payable` modifier. This is a built-in modifier that needs to be in all functions (even the constructor) that want to accept money. But even the `payable` modifier has a flaw which we can see in `test_fund_withbalance.py::test_flawed_fund_withbalance()`.

You may ask, and why would we care if someone manages to send money to our contract? The answer is simple. If we count on `this.balance` for our accounting someone can throw of our accounting by doing so. This accounting could be anything, from share dividends to donations.

There is an EVM opcode called `SUICIDE` which allows you to mark an address for deletion and send its balance somewhere else. This is implemented in solidity as the `selfdestruct()` command. This is at the EVM level and not at solidity level and as such there is absolutely nothing someone can do to stop it. For an example of this in action take a look at `ForcePay.sol` and `test_fund_withbalance.py::test_flawed_fund_withbalance()`.

The only solution to this is to switch accounting measure to not use `this.balance` and instead manually keep count of all funds deposited/withdraw to/from the contract as seen in `test_fund_withbalance.py::test_fixed_fund_withbalance()`.

### Bookkeeping always before calls

This is the vulnerability that brought down the DAO. There are 2 things you should be very very careful about.

1. DO NOT unless it is absolutely necessary make calls from your contract to unknown addresses. They can run any type of code.
2. Do all accounting/bookeepingBefore doing `call()` or `send()` to protect yourself
   from revursive attacks.

An example of this vulnerability in action can be seen in `test_discount_pool.py::test_flawed_discount_pool()`. The `getMyMoney()` function sends money by call() and also does the bookkeeping after sending. A cunning attack notices this and wastes no time, by deploying `DiscountPoolAttack.sol` and using it to recursively call into the contract. The result is catastrophic, as he runs away with all the money.

The fix is quite simple and can be seen in `test_discount_pool.py::test_fixed_discount_pool()` and the `DiscountPoolFixed.sol` contract. Always do the bookkeeping change before sending the money out.


### Keep fallback functions simple

Fallback functions should be extremely simple. They should either do nothing or at most just throw an event. The reason is simple. The intrinsic `send()` functionality of solidity forwards only 21000 gas which is enough for only the most basic operations. If your fallback function contains more complicated functionality then it will simply fail when someone tries to send it funds.

As an example of this problem take a look at `test_fallback.py()`


### Do not assume contracts start with 0 balance

Do not assume that the the contract you create starts with a 0 balance. Contract accounts are predictable since they are derived from the creator's address and the creator's nonce. Someone may try to throw off your accounting by predicting your new contract's address before you deploy it and sending some ether to it.

The solution to this is the same as the one on the aforementioned `this.balance` section.

### Escape Hatches

Solidity is actively developed by many people but as all software it can have bugs. In November 2016 a bug that could overwrite variables was discovered that affected all contracts up to that day. Thankfully the bug's conditions were quite rare and as such not many contracts were affected.

More bugs like that can emerge, ethereum is still a technology at its infancy. At this point in time never leave it all up to decentralization. Always provide a big red button for your and your user's safety. An escape hatch is simple. The contract has a trustee that all users can trust to do the right thing if a black-swan type even happens. If such a thing happens the trustee can ativate the escape hatch, empty the contract of all funds and redistribute after a fix has been found.

For an example of such a construct check out `DiscountPoolFixed.sol`. I personally think escape hatches with multisignature wallets as trustees is a must for any project that is handling serious amounts of money. Let us not have another DAO.
