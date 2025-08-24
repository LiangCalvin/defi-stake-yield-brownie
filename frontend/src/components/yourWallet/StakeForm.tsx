import { useEthers, useNotifications, useTokenBalance } from "@usedapp/core";
import { Token } from "../Main";
import { formatUnits } from "@ethersproject/units";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useStakeTokens } from "../../hooks/useStakeTokens";
import { utils } from "ethers";
import CircularProgress from "@mui/material/CircularProgress";

export interface StakeFormProps {
    token: Token;
}

export const StakeForm = ({ token }: StakeFormProps) => {
    const { address: tokenAddress, name } = token;
    const { account } = useEthers();
    const tokenBalance = useTokenBalance(tokenAddress, account);
    const formattedTokenBalance: number = tokenBalance
        ? parseFloat(formatUnits(tokenBalance, 18))
        : 0;

    const { notifications } = useNotifications();
    // const [loading, setLoading] = React.useState(true);

    const [amount, setAmount] = useState<
        number | string | Array<number | string>
    >(0);

    // function handleStakeSubmit() {
    //     setLoading(true);
    // }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAmount =
            event.target.value === "" ? "" : Number(event.target.value);
        setAmount(newAmount);
        console.log("new amount", newAmount);
        console.log("amount", amount);
    };

    const { approveAndStake, state: approveAndStakeErc20State } = useStakeTokens(tokenAddress);
    const handleStakeSubmit = () => {
        const amountAsWei = utils.parseEther(amount.toString());
        return approveAndStake(amountAsWei.toString());
    };

    const isMining = approveAndStakeErc20State.status === "Mining";


    useEffect(() => {
        if (
            notifications.filter(
                (notification) =>
                    notification.type === "transactionSucceed" &&
                    notification.transactionName === "Approve ERC20 transfer"
            ).length > 0
        ) {
            console.log("Approved!");
        }
        if (
            notifications.filter(
                (notification) =>
                    notification.type === "transactionSucceed" &&
                    notification.transactionName === "Stake Tokens"
            ).length > 0
        ) {
            console.log("Tokens Staked!");
        }
    }, [notifications]);

    return (
        <div>
            <TextField
                onChange={handleInputChange}
                id="standard-basic"
                label="please fill amount"
                variant="standard"
            />
            <Button
                size="small"
                onClick={handleStakeSubmit}
                loadingPosition="end"
                variant="contained"
                disabled={isMining}>
                {isMining ? <CircularProgress /> : "Stake!!!"}
                Supply
            </Button>
        </div>
    );
};
