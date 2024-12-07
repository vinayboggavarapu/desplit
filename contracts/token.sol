// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CustomToken is ERC20, Ownable {
    uint8 private _decimals = 6;

    event Mint(address indexed to, uint256 amount);
    event Burn(address indexed from, uint256 amount);

    constructor(
        string memory name, 
        string memory symbol, 
        uint256 initialSupply, 
        address initialOwner
    ) Ownable(initialOwner) ERC20(name, symbol) {
        _mint(msg.sender, initialSupply * 10 ** uint256(_decimals));
    }

    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }

    function mint(address account, uint256 amount) external onlyOwner {
        require(account != address(0), "ERC20: mint to the zero address");
        require(amount > 0, "Amount must be greater than 0");
        _mint(account, amount * 10 ** uint256(_decimals));  // Ensure correct scaling with decimals
        emit Mint(account, amount);
    }

    function burn(address account, uint256 amount) external onlyOwner {
        require(account != address(0), "ERC20: burn from the zero address");
        require(amount > 0, "Amount must be greater than 0");
        _burn(account, amount * 10 ** uint256(_decimals));  // Ensure correct scaling with decimals
        emit Burn(account, amount);
    }
}
