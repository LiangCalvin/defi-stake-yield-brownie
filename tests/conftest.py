import pytest
from web3 import Web3


@pytest.fixture
def amount_staked():
    return Web3.to_wei(1, "ether")
