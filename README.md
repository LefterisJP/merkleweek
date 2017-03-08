## Smart Contract Security

### Generating Randomness through block data

For the most trivial of cases you can generate random data by using block data as a randomness seed as we can see in RandomFlawed.sol. But the problem with such approaches is that depending on block data we render ourselves vulnerable to miners. A miner can know the timestamp and the blockhash of a block in advance and insert a transaction in the same block all the while knowing the value of the random number.

#### A Possible Solution

A DAO that people can participate in and all together generate random numbers. Examples are: [RanDAO](https://github.com/randao/randao) and MakerDAO.

The basic idea is the same. Many people participate in periods of voting where they provide hashes of a secret along with an ether deposit. Subsequently the secrets to the hashes are revealed and if the secrets match then those hashes are used as seeds to generate a random number and send it to anyone requesting it. People who lied about their secret lose the deposit.


## Testing

In order to run the tests we use [populus](https://github.com/pipermerriam/populus), a python framework for testing smart contracts.

- [Create](http://docs.python-guide.org/en/latest/dev/virtualenvs/) a python virtual environment and activate it.

- Run `pip install -r requirements.txt`

- And now run all the tests by `pytest tests/` or run each single test for each contract individually by pointing to its test file: `pytest tests/test_name_registry.py`.
