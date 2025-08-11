// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract TokenFarm is Ownable {
    // stake token
    // unstake token
    // issue token
    // add allow token
    // getEthValue

    // mapping token address -> staker address -> amount
    mapping(address => mapping(address => uint256)) public stakingBalance;
    mapping(address => uint256) public uniqueTokensStaked;
    mapping(address => address) public tokenPriceFeedMapping;
    address[] public stakers;
    address[] public allowedTokens;
    IERC20 public dappToken;
    // for every 1 ETH, we give 1 DappToken
    // 50 ETH and 50 DAI staked, give 1 DAPP per 1 DAI
    constructor(address _dappTokenAddress) public {
        dappToken = IERC20(_dappTokenAddress);
    }

    function setPriceFeedContract(
        address _token,
        address _priceFeed
    ) public onlyOwner {
        tokenPriceFeedMapping[_token] = _priceFeed;
    }
    // 4. Issue Token
    function issueTokens() public onlyOwner {
        // Issue tokens to all stakers
        for (
            uint256 stakersIndex = 0;
            stakersIndex < stakers.length;
            stakersIndex++
        ) {
            address recipient = stakers[stakersIndex];
            uint256 userTotalValue = getUserTotalValue(recipient);
            // send them a token reward
            // based on their total value locked

            dappToken.transfer(recipient, userTotalValue);
        }
    }
    // 5. Get Total value of user token
    function getUserTotalValue(address _user) public view returns (uint256) {
        //we not airdrop it make user cost gas fee
        uint256 totalValue = 0;
        require(uniqueTokensStaked[_user] > 0, "No tokens staked!");
        for (
            uint256 allowedTokensIndex = 0;
            allowedTokensIndex < allowedTokens.length;
            allowedTokensIndex++
        ) {
            totalValue =
                totalValue +
                getUserSingleTokenValue(
                    _user,
                    allowedTokens[allowedTokensIndex]
                );
        }
        return totalValue;
    }

    // 6. Get single token value of user
    function getUserSingleTokenValue(
        address _user,
        address _token
    ) public view returns (uint256) {
        // stake 1 ETH = $2000 , we must return 2000. if stake 20 DAI we return 20
        if (uniqueTokensStaked[_user] <= 0) {
            return 0;
        }
        // we need price of the token * stakingBalance[_token][user]
        (uint256 price, uint256 decimals) = getTokenValue(_token);
        return ((stakingBalance[token][user] * price) / (10 ** decimals));
    }
    // 7. Get token value price feed
    function getTokenValue(
        address _token
    ) public view returns (uint256, uint256) {
        // priceFeedAddress
        address priceFeedAddress = tokenPriceFeedMapping[_token];
        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            priceFeedAddress
        );
        (, int256 price, , , ) = priceFeed.latestRoundData();
        uint256 decimals = uint256(priceFeed.decimals());
        return (uint256(price), decimals);
    }
    // 1. Stake Token
    function stakeTokens(uint256 _amount, address _token) public {
        // what token can they stake
        // how much can they stake
        require(_amount > 0, "Amount must be more than 0");
        require(tokenIsAllowed(_token), "Token is currently no allowed");
        // transferFrom
        IERC20(_token).transferFrom(msg.sender, address(this), _amount);
        updateUniqueTokensStaked(msg.sender, _token);
        stakingBalance[_token][msg.sender] =
            stakingBalance[_token][msg.sender] +
            _amount;
        if (uniqueTokensStaked[msg.sender] == 1) {
            stakers.push(msg.sender);
        }
    }
    // 5. How many unique tokens user has, if has 1 we add to list
    function updateUniqueTokensStaked(address _user, address _token) internal {
        if (stakingBalance[_token][_user] <= 0) {
            uniqueTokenStaked[_user] = uniqueTokenStaked[_user] + 1;
        }
    }
    // 3. Allowed tokens
    function addAllowedTokens(address _token) public onlyOwner {
        allowedTokens.push(_token);
    }
    // 2. Is token allowed
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
