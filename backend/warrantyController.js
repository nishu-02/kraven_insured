// const express = require('express');
// const bodyParser = require('body-parser');
// const { ethers } = require('ethers');
// // const admin = require('firebase-admin');

// // // Initialize Firebase Admin SDK
// // admin.initializeApp({
// //     credential: admin.credential.applicationDefault(),
// // });

// const app = express();
// app.use(bodyParser.json());

// // Connect to Ethereum
// const provider = new ethers.providers.InfuraProvider('mainnet', '1e5f5ecdead549e6850dbf4696b7604f');
// const wallet = new ethers.Wallet('26d66c570d3bfff93c70a39085466790b7071e45487236a03957068502f90659', provider);

// // Contract ABI and Address
// const warrantyABI = [
//     "function registerWarranty(address user, string memory productName, uint256 warrantyPeriod) public",
//     "function getWarrantyInfoByUser(address user) public view returns (tuple(string memory productName, uint256 purchaseDate, uint256 warrantyPeriod, bool isActive))"
// ];
// const warrantyContractAddress = '0xd5666f5b46f311ab406fab1f054bfd55562bf45a';
// const warrantyContract = new ethers.Contract(warrantyContractAddress, warrantyABI, wallet);

// // API endpoint to register a warranty
// app.post('/registerWarranty', async (req, res) => {
//     const { userId, productName, warrantyPeriod } = req.body;

//     try {
//         // Retrieve user wallet address from Firebase
//         const userSnapshot = await admin.firestore().collection('users').doc(userId).get();
//         if (!userSnapshot.exists) {
//             return res.status(404).send('User not found');
//         }

//         const userData = userSnapshot.data();
//         const userWalletAddress = userData.walletAddress;

//         // Register warranty on the blockchain
//         const tx = await warrantyContract.registerWarranty(userWalletAddress, productName, warrantyPeriod);
//         await tx.wait(); // Wait for the transaction to be mined

//         return res.status(200).send(`Warranty registered for ${userWalletAddress}`);
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send('Error registering warranty');
//     }
// });

// // API endpoint to get warranty information for a specific user
// app.post('/getWarrantyInfo', async (req, res) => {
//     const { userId } = req.body;

//     try {
//         // Retrieve user wallet address from Firebase
//         const userSnapshot = await admin.firestore().collection('users').doc(userId).get();
//         if (!userSnapshot.exists) {
//             return res.status(404).send('User not found');
//         }

//         const userData = userSnapshot.data();
//         const userWalletAddress = userData.walletAddress;

//         // Get warranty information from the blockchain
//         const warrantyInfo = await warrantyContract.getWarrantyInfoByUser(userWalletAddress);
        
//         return res.status(200).json({
//             productName: warrantyInfo.productName,
//             purchaseDate: warrantyInfo.purchaseDate,
//             warrantyPeriod: warrantyInfo.warrantyPeriod,
//             isActive: warrantyInfo.isActive,
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send('Error retrieving warranty information');
//     }
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });


require('dotenv').config({ path: '../.env' }); // Adjust path if necessary
const { ethers } = require('ethers');

// Create the provider using Infura
const provider = new ethers.providers.InfuraProvider('mainnet', process.env.INFURA_PROJECT_ID);

// Initialize the wallet with the private key (use environment variables for security)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider); // Set your private key in .env

// Address of the deployed Warranty contract
const warrantyContractAddress = '0xd5666f5b46f311ab406fab1f054bfd55562bf45a'; // Replace with your contract address
const warrantyABI = [ /* ABI array here */ ]; // Add your contract's ABI here

// Create an instance of the contract
const warrantyContract = new ethers.Contract(warrantyContractAddress, warrantyABI, wallet);

// Function to register a warranty
const registerWarranty = async (req, res) => {
    const { walletAddress, productName, warrantyPeriod } = req.body;

    try {
        // Call the createWarranty function on the contract
        const tx = await warrantyContract.createWarranty(productName, warrantyPeriod);
        await tx.wait(); // Wait for the transaction to be mined

        res.status(200).json({ message: 'Warranty issued successfully!', transaction: tx });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to issue warranty.' });
    }
};

// Function to get warranty info
const getWarrantyInfo = async (req, res) => {
    const { walletAddress } = req.body;

    try {
        const warrantyInfo = await warrantyContract.getWarrantyInfo(walletAddress);
        res.status(200).json({ warrantyInfo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve warranty information.' });
    }
};

module.exports = {
    registerWarranty,
    getWarrantyInfo
};
