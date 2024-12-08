// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Bridge is Ownable {
    IERC20 public token; // The token being bridged

    // Event emitted when tokens are locked
    event TokensLocked(address indexed user, uint256 amount);
    // Event emitted when tokens are burned, now includes emailID and groupID
    event TokensBurned(address indexed user, uint256 amount, string emailID, string groupID);

    constructor(IERC20 _token, address initialOwner) Ownable(initialOwner) {
        token = _token; // Set the token to be bridged
    }

    // Function to initiate a bridge transaction
    function initiateBridgeTransaction(uint256 amount, string memory emailID,string memory groupID) external {
        require(amount > 0, "Amount must be greater than 0");

        // Transfer tokens from the user to the bridge contract
        token.transferFrom(msg.sender, address(this), amount);
        
        // Emit event for locking tokens
        emit TokensLocked(msg.sender, amount);

        // Burn the tokens
        _burnTokens(amount, emailID, groupID);
    }

    // Internal function to burn tokens
    function _burnTokens(uint256 amount, string memory emailID, string memory groupID) internal {
        require(amount > 0, "Amount must be greater than 0");
        
        // Burn the tokens by sending them to the zero address
        token.transfer(address(0), amount);
        
        // Emit the TokensBurned event with additional parameters
        emit TokensBurned(msg.sender, amount, emailID, groupID);
    }

    // Function to approve tokens for transfer (if needed)
    function approveTokens(address spender, uint256 amount) external onlyOwner {
        token.approve(spender, amount);
    }
}