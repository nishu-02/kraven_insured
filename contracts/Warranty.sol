// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Warranty {
    struct WarrantyInfo {
        string productName;
        uint256 purchaseDate;
        uint256 warrantyPeriod; // in months
        bool isActive;
    }

    // Mapping from user wallet address to their warranty information
    mapping(address => WarrantyInfo) public warranties;

    // Events for logging
    event WarrantyCreated(address indexed owner, string productName, uint256 purchaseDate, uint256 warrantyPeriod);
    
    // Function to create a warranty, callable by the backend
    function registerWarranty(address user, string memory productName, uint256 warrantyPeriod) public {
        require(warranties[user].isActive == false, "Warranty already exists.");

        warranties[user] = WarrantyInfo({
            productName: productName,
            purchaseDate: block.timestamp,
            warrantyPeriod: warrantyPeriod,
            isActive: true
        });

        emit WarrantyCreated(user, productName, block.timestamp, warrantyPeriod);
    }

    // Function to retrieve warranty information for the caller
    function getWarrantyInfo() public view returns (WarrantyInfo memory) {
        return warranties[msg.sender];
    }

    // Function to get warranty information for a specific user (can be called by backend)
    function getWarrantyInfoByUser(address user) public view returns (WarrantyInfo memory) {
        return warranties[user];
    }
}
