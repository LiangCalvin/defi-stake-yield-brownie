import { useEthers, useTokenBalance } from "@usedapp/core"
import { Token } from "../Main"
import { formatUnits } from "@ethersproject/units"
import Button from "@mui/material/Button"
import SendIcon from '@mui/icons-material/Send';
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useStakeTokens } from "../../hooks/useStakeTokens";
import { utils } from "ethers";

export interface StakeFormProps {
    token: Token
}

export const StakeForm = ({ token }: StakeFormProps) => {
    const { address: tokenAddress, name } = token
    const { account } = useEthers()
    const tokenBalance = useTokenBalance(tokenAddress, account)
    const formattedTokenBalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0
    // const [loading, setLoading] = React.useState(true);
    const [amount, setAmount] = useState<number | string | Array<number | string>>(0)

    // function handleStakeSubmit() {
    //     setLoading(true);
    // }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAmount = event.target.value === "" ? "" : Number(event.target.value)
        setAmount(newAmount)
        console.log("new amount", newAmount)
        console.log("amount", amount)
    }

    const { approve, approveErc20State } = useStakeTokens(tokenAddress)
    const handleStakeSubmit = () => {
        const amountAsWei = utils.parseEther(amount.toString())
        return approve(amountAsWei.toString())
    }

    return (
        <div>
            <TextField onChange={handleInputChange} id="standard-basic" label="please fill amount" variant="standard" />
            <Button
                size="small"
                onClick={handleStakeSubmit}
                loadingPosition="end"
                variant="contained"
            >
                Supply
            </Button>
        </div >
    )
}