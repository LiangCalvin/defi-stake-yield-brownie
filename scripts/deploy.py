from scripts.helpful_scripts import get_account
from brownie import DappToken, TokenFarm, config, network


def deploy_token_farm_and_dapp_token():
    account = get_account()
    dapp_token = DappToken.deploy({"from": account})
    token_farm = TokenFarm.deploy(
        dapp_token.address,
        {"from": account},
        publish_source=config["networks"][network.show_active()].get("verify", False),
    )


def main():
    deploy_token_farm_and_dapp_token()
