// src/web3.js
import Web3 from "web3";

let web3;

if (window.ethereum) {
    // Initialize web3 instance with MetaMask provider
    web3 = new Web3(window.ethereum);

    // Request the user's wallet to connect to MetaMask
    window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(() => console.log("Wallet connected"))
        .catch((err) => {
            console.error("Error connecting wallet", err);
            alert("Error connecting MetaMask. Please try again.");
        });

    // Enable MetaMask (legacy support)
    window.ethereum.enable().catch((err) => {
        console.error("Error enabling MetaMask", err);
        alert("Error enabling MetaMask. Please check your connection.");
    });
} else {
    // If MetaMask is not detected, alert the user
    alert("MetaMask not detected! Please install MetaMask.");
}

export default web3;
