import React, { useState } from 'react';
import './ConnectWallet.css';
import wallet from './wallet.png';

const ConnectWallet = ({ onMetaMaskConnect }) => {
    const [account, setAccount] = useState('');
    const [connecting, setConnecting] = useState(false);

    const connectWallet = async () => {
        if (window.ethereum) {
            setConnecting(true);  // Start the connecting state
            try {
                // Request account access
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                // Set the connected account
                setAccount(accounts[0]);
                console.log("Wallet connected:", accounts[0]);
                onMetaMaskConnect();  // Call the function passed as prop to indicate wallet connection
            } catch (error) {
                console.error("Error connecting to MetaMask:", error);
            } finally {
                setConnecting(false);  // End the connecting state
            }
        } else {
            alert('MetaMask not detected. Please install it.');
        }
    };

    return (
        <div className="connect-wallet-container">
            <div className="wallet-icon">
                <img src={wallet} alt="Wallet Icon" />
            </div>
            <h1>Connect Your Wallet</h1>
            {account ? (
                <div className="wallet-info">
                    <p>Connected as: {account}</p>
                    <button className="disconnect-button" onClick={() => setAccount('')}>
                        Disconnect Wallet
                    </button>
                </div>
            ) : (
                <button className="connect-button" onClick={connectWallet}>
                    {connecting ? <div className="loading-spinner"></div> : 'Connect Wallet'}
                </button>
            )}
        </div>
    );
};

export default ConnectWallet;
