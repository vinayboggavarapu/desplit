// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CrossChainReceiver is ERC20, Ownable {
    address public bridgeAddress;

    uint8 private _decimals = 6;  // Assuming the token has 6 decimals

    event TokensMinted(address indexed to, uint256 amount);

    constructor(string memory name, string memory symbol, address initialOwner) Ownable(initialOwner) ERC20(name, symbol) {}

    // Set the bridge address (the source chain bridge contract)
    function setBridgeAddress(address _bridgeAddress) external onlyOwner {
        bridgeAddress = _bridgeAddress;
    }

    // Mint tokens after receiving valid cross-chain transfer info
    function mintTokens(address to, uint256 amount) external {
        require(msg.sender == bridgeAddress, "Only bridge contract can mint tokens");

        // Adjust amount for the custom decimal places
        uint256 adjustedAmount = amount * 10 ** uint256(_decimals);

        // Mint the tokens with adjusted amount
        _mint(to, adjustedAmount);

        emit TokensMinted(to, adjustedAmount);
    }

    // Token validation function (signature verification or proof)
    function validateTransfer() external pure returns (bool) {
        // Implement logic for verifying the Merkle proof or signature
        return true;
    }
}
