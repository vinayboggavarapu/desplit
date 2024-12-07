// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "contracts/crossChainReceiver.sol";

contract CrossChainBridge is Ownable {
    // Mapping to track the locked tokens for each user on the source chain
    mapping(address => uint256) public lockedTokens;

    // Address of the token on the source chain (e.g., USDC, ETH, etc.)
    address public sourceToken;

    // Event to emit when tokens are locked with emailID and groupID
    event TokensLockedWithInfo(address indexed user, uint256 amount, uint256 timestamp, string emailID, string groupID);
    
    // Event to emit when tokens are burned on the source chain
    event TokensBurned(address indexed user, uint256 amount, uint256 timestamp);

    // Event to emit when tokens are minted on the destination chain
    event TokensMinted(address indexed user, uint256 amount, uint256 timestamp);

    // Constructor for the CrossChainBridge contract
    constructor(address _sourceToken, address initialOwner) Ownable(initialOwner) {
        sourceToken = _sourceToken;
        transferOwnership(initialOwner);
    }

    // Function to lock and burn tokens in a single transaction
    function lockAndBurnTokens(uint256 amount, string memory emailID, string memory groupID) external {
        require(amount > 0, "Amount must be greater than 0");
        
        // Automatically approve the bridge contract to transfer tokens
        IERC20(sourceToken).approve(address(this), amount);
        
        // Transfer tokens from the sender to this bridge contract (locking them)
        IERC20(sourceToken).transferFrom(msg.sender, address(this), amount);
        
        // Update the locked tokens mapping
        lockedTokens[msg.sender] += amount;
        
        // Emit event for locking the tokens with email and group info
        emit TokensLockedWithInfo(msg.sender, amount, block.timestamp, emailID, groupID);
        
        // Burn the tokens after locking
        burnTokens(msg.sender, amount);
    }

    // Function to burn tokens on the source chain (after successful bridge transaction)
    function burnTokens(address user, uint256 amount) internal onlyOwner {
        require(lockedTokens[user] >= amount, "Insufficient locked tokens");
        require(amount > 0, "Amount must be greater than 0");

        // Burn the tokens from the source chain (remove from circulation)
        lockedTokens[user] -= amount;
        
        // Emit event for burning tokens
        emit TokensBurned(user, amount, block.timestamp);
    }

    // Function to mint new tokens on the destination chain (after successful burning)
    function mintTokens(address user, uint256 amount) external onlyOwner {
        require(amount > 0, "Amount must be greater than 0");

        // Ensure the token contract supports minting
        MintableToken(sourceToken).mint(user, amount); // Mint tokens to the user on the destination chain
        
        // Emit event for minting tokens on the destination chain
        emit TokensMinted(user, amount, block.timestamp);
    }

    // Function to unlock tokens and send back to the user (in case of failure on destination chain)
    function unlockTokens(address user, uint256 amount) external onlyOwner {
        require(lockedTokens[user] >= amount, "Insufficient locked tokens");
        require(amount > 0, "Amount must be greater than 0");

        // Refund the user the locked tokens
        lockedTokens[user] -= amount;
        
        // Transfer the tokens back to the user
        IERC20(sourceToken).transfer(user, amount);
    }

    // Allow contract owner to change the source token address (in case it changes)
    function setSourceToken(address newSourceToken) external onlyOwner {
        sourceToken = newSourceToken;
    }
}

// The mintable token contract
contract MintableToken is ERC20, Ownable {
    constructor(string memory name, string memory symbol, address initialOwner) Ownable(initialOwner) ERC20(name, symbol) {}

    // Mint function to allow the bridge contract to mint new tokens on the destination chain
    function mint(address account, uint256 amount) external onlyOwner {
        _mint(account, amount);
    }
}
