// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenFarm is Ownable {
    // stake token
    // unstake token
    // issue token
    // add allow token
    // getEthValue
    address[] public allowedTokens;

    function stakeTokens(uint256 _amount, address _token) public {
        // what token can they stake
        // how much can they stake
        require(_amount > 0, "Amount must be more than 0");
        // require(_token is allow);
    }

    function addAllowedTokens(address _token) public onlyOwner {
        allowedTokens.push(_token);
    }

    function tokenIsAllowed(address _token) public returns (bool) {
        for (
            uint256 allowedTokensIndex = 0;
            allowedTokensIndex < allowedTokens.length;
            allowedTokensIndex++
        ) {
            if (allowedTokens[allowedTokensIndex] == _token) {
                return true;
            }
        }
        return false;
    }
}
