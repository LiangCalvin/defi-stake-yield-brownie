import { useEthers } from "@usedapp/core"
import helperConfig from "../helper-config.json"

export const Main = () => {
    // const { chainId } = useEthers()
    const { account, chainId } = useEthers();
    // const networkName = chainId ? helperConfig[chainId] : "dev"
    // const networkName = chainId
    //     ? helperConfig[String(chainId) as keyof typeof helperConfig]
    //     : "dev"
    const networkName = chainId
        ? helperConfig[String(chainId) as keyof typeof helperConfig]
        : undefined;

    console.log("account", account)
    console.log("chain", chainId)
    console.log("networkname", networkName)
    // const dappTokenAddress
    return (
        <div>
            {account ? (
                <p>Connected to {networkName} ({chainId})</p>
            ) : (
                <p>Please connect your wallet</p>
            )}
        </div>
    )
}