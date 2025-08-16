import { useEthers } from "@usedapp/core";
import helperConfig from "../helper-config.json";
import networkMapping from "../chain-info/deployments/map.json";
import { constants } from "ethers";
import brownieConfig from "../brownie-config.json";
import dapp from "../dapp.png"
import eth from "../eth.png"
import dai from "../dai.png"
import { YourWallet } from "./yourWallet/YourWallet";
interface ContractAddresses {
    DappToken: string[];
    TokenFarm: string[];
    [key: string]: string[]; // for any other contract names dynamically
}

interface NetworkMapping {
    [chainId: string]: ContractAddresses;
}

const networkMappingTyped: NetworkMapping =
    networkMapping as unknown as NetworkMapping;

export type Token = {
    image: string
    address: string
    name: string
}

export const Main = () => {
    const { account, chainId } = useEthers();

    const networkName = chainId
        ? helperConfig[String(chainId) as keyof typeof helperConfig]
        : "dev";

    console.log("account", account);
    console.log("chain", chainId);
    console.log("networkname", networkName);
    if (!account) {
        return <p>Please connect your wallet</p>;
    }

    if (!chainId) {
        return <p>Loading network info...</p>;
    }
    const dappTokenAddress = chainId
        ? networkMappingTyped[String(chainId)]["DappToken"][0]
        : constants.AddressZero;
    const wethTokenAddress =
        chainId && networkName
            ? (brownieConfig["networks"] as any)[networkName]?.["weth_token"]
            : constants.AddressZero;
    console.log(wethTokenAddress);
    const fauTokenAddress =
        chainId && networkName
            ? (brownieConfig["networks"] as any)[networkName]?.["fau_token"]
            : constants.AddressZero;
    console.log(fauTokenAddress);

    const supportedTokens: Array<Token> = [
        {
            image: dapp,
            address: dappTokenAddress,
            name: "DAPP"
        },
        {
            image: eth,
            address: wethTokenAddress,
            name: "WETH"
        },
        {
            image: dai,
            address: fauTokenAddress,
            name: "DAI"
        }
    ]

    return (
        <div>
            <YourWallet supportedTokens={supportedTokens} />
            <p>
                {/* Connected to {networkName} ({chainId}) */}
            </p>
        </div>
    );
};
