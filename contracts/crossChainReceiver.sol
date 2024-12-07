// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CrossChainReceiver is ERC20, Ownable {
    address public bridgeAddress;

    event TokensMinted(address indexed to, uint256 amount);

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    // Set the bridge address (the source chain bridge contract)
    function setBridgeAddress(address _bridgeAddress) external onlyOwner {
        bridgeAddress = _bridgeAddress;
    }

    // Mint tokens after receiving valid cross-chain transfer info
    function mintTokens(address to, uint256 amount) external {
        require(msg.sender == bridgeAddress, "Only bridge contract can mint tokens");
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }

    // Token validation function (signature verification or proof)
    function validateTransfer(uint256 amount, bytes memory proof) external view returns (bool) {
        // Implement logic for verifying the Merkle proof or signature
        return true;
    }
}
