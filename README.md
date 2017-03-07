## Testing

In order to run the tests we use [populus](https://github.com/pipermerriam/populus), a python framework for testing smart contracts.

- [Create](http://docs.python-guide.org/en/latest/dev/virtualenvs/) a python virtual environment and activate it.

- Run `pip install -r requirements.txt`

- And now run all the tests by `pytest tests/` or run each single test for each contract individually by pointing to its test file: `pytest tests/test_name_registry.py`.
