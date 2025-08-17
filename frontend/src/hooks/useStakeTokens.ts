import { useContractFunction, useEthers } from "@usedapp/core";
import TokenFarm from "../chain-info/contracts/TokenFarm.json";
import { networkMappingTyped } from "../components/Main";
import { constants, Contract, utils } from "ethers";
import ERC20 from "../chain-info/contracts/MockERC20.json";
import { useState } from "react";
export const useStakeTokens = (tokenAddress: string) => {
  // need address, abi, chainId
  const { chainId } = useEthers();
  const { abi } = TokenFarm;
  const tokenFarmAddress = chainId
    ? networkMappingTyped[String(chainId)]["DappToken"][0]
    : constants.AddressZero;

  //approve
  const tokenFarmInterface = new utils.Interface(abi);
  const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface);

  const erc20ABI = ERC20.abi;
  const erc20Interface = new utils.Interface(erc20ABI);
  const erc20Contract = new Contract(tokenAddress, erc20Interface);

  // stake
  const { send: approveErc20Send, state: approveErc20State } =
    useContractFunction(erc20Contract, "approve", {
      transactionName: "Approve ERC20 transfer",
    });

  const approve = (amount: string) => {
    return approveErc20Send(tokenFarmAddress, amount);
  };
  //   const [state, setState] = useState(approveErc20State);

  return { approve, approveErc20State };
};
