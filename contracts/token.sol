// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, ERC20Burnable, Ownable {
    // Constructor to initialize the token with name, symbol, and initial supply
    constructor(string memory name_, string memory symbol_, uint256 initialSupply, address initialOwner) 
        Ownable(initialOwner) 
        ERC20(name_, symbol_) 
    {
        _mint(msg.sender, initialSupply * (10 ** decimals())); // Mint initial supply to the deployer
    }

    // Override the decimals function to set the number of decimals to 2
    function decimals() public view virtual override returns (uint8) {
        return 0; // Set to 2 decimals
    }

    // Mint new tokens (only callable by the owner)
    function mint(address to, uint256 amount) public onlyOwner {
        require(to != address(0), "Mint to the zero address");
        require(amount > 0, "Amount must be greater than 0");

        _mint(to, amount * (10 ** decimals())); // Use the overridden decimals
    }

    // Transfer tokens using human-readable amounts
    function transferHumanReadable(address recipient, uint256 amount) external returns (bool) {
        return transfer(recipient, amount * (10 ** decimals())); // Use the overridden decimals
    }

    // Approve tokens using human-readable amounts
    function approveHumanReadable(address spender, uint256 amount) external returns (bool) {
        return approve(spender, amount * (10 ** decimals())); // Use the overridden decimals
    }

    // Transfer tokens from one address to another using human-readable amounts
    function transferFromHumanReadable(address sender, address recipient, uint256 amount) external returns (bool) {
        return transferFrom(sender, recipient, amount * (10 ** decimals())); // Use the overridden decimals
    }
}