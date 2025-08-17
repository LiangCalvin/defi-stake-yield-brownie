import { useEthers, useTokenBalance } from "@usedapp/core"
import { Token } from "../Main"
import { formatUnits } from "ethers/lib/utils"
import { BalanceMsg } from "../BalanceMsg";

// Extend the Window interface to include ethereum
declare global {
    interface Window {
        ethereum?: any;
    }
}

export interface WalletBalanceProps {
    token: Token
}

export const WalletBalance = ({ token }: WalletBalanceProps) => {
    const { image, address, name } = token
    const { account } = useEthers()
    const tokenBalance = useTokenBalance(address, account)
    const formattedTokenBalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0
    // console.log("tokenbal", tokenBalance?.toString() ?? "loading...")
    // console.log("Account:", account)
    // console.log("Token Address:", address)
    // console.log("Chain ID:", window.ethereum?.chainId)
    // console.log("Token Balance:", tokenBalance)
    return (
        <div>
            {/* <p>{name} Balance: {tokenBalance ? formatUnits(tokenBalance, 18) : "Loading..."}</p> */}
            <BalanceMsg
                label={`Your un-staked ${name} balance`}
                tokenImgSrc={image}
                amount={formattedTokenBalance}
            />
        </div>
    )
}