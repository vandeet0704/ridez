"use client";
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Registration from "@/contracts/Registration.json"; // Contract ABI
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';

const Home = () => {
  const [applications, setApplications] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      const web3Instance = new Web3(Web3.givenProvider || 'http://localhost:7545');
      setWeb3(web3Instance);

      const networkId = await web3Instance.eth.net.getId();
      const deployedNetwork = Registration.networks[networkId];
      const instance = new web3Instance.eth.Contract(
        Registration.abi,
        deployedNetwork && deployedNetwork.address
      );
      setContract(instance);

      loadApplications(instance);
    };
    init();
  }, []);

  const loadApplications = async (contractInstance) => {
    try {
      const apps = await contractInstance.methods.getAllApplications().call();
      const mappedApps = apps.map(app => ({
        fullname: app.fullname,
        email: app.email,
        livingAddress: app.livingAddress,
        gender: app.gender,
        userType: app.userType,
        vehicleName: app.vehicleName,
        vehicleNumber: app.vehicleNumber,
        requestId: Number(app.requestId), // Convert BigNumber to number
        status: Number(app.status),       // Convert BigNumber to number
        userId: Number(app.userId),       // Convert BigNumber to number
        statusText: mapStatusToText(Number(app.status)) // Convert and map status
      }));
      setApplications(mappedApps);
    } catch (error) {
      console.error("Error loading applications:", error);
    }
  };

  // Helper function to map status codes to text
  const mapStatusToText = (status) => {
    if (status === 0) return "Pending";
    if (status === 1) return "Approved";
    if (status === 2) return "Rejected";
    return "Unknown";
  };

  const handleApprove = async (requestId) => {
    try {
      const accounts = await web3.eth.getAccounts(); // Get the list of accounts
      await contract.methods.setApplicationStatus(requestId, true).send({ from: accounts[0] }); // Approve
      loadApplications(contract); // Refresh applications list
    } catch (error) {
      console.error("Approval error:", error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      const accounts = await web3.eth.getAccounts(); // Get the list of accounts
      await contract.methods.setApplicationStatus(requestId, false).send({ from: accounts[0] }); // Reject
      loadApplications(contract); // Refresh applications list
    } catch (error) {
      console.error("Rejection error:", error);
    }
  };

  return (
    <div className="flex flex-col items-start justify-start min-h-screen p-8 gap-8 font-[family-name:var(--font-geist-sans)]">
      <h2 className="text-2xl font-bold text-primary">Admin Dashboard</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Request ID</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>User Type</TableHead>
            <TableHead>Vehicle Name</TableHead>
            <TableHead>Vehicle Number</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app, index) => (
            <TableRow key={index}>
              <TableCell>{app.requestId}</TableCell>
              <TableCell>{app.fullname}</TableCell>
              <TableCell>{app.email}</TableCell>
              <TableCell>{app.livingAddress}</TableCell>
              <TableCell>{app.gender}</TableCell>
              <TableCell>{app.userType}</TableCell>
              <TableCell>{app.vehicleName}</TableCell>
              <TableCell>{app.vehicleNumber}</TableCell>
              <TableCell>{app.statusText}</TableCell>
              <TableCell>{app.userId || 'N/A'}</TableCell>
              <TableCell>
                {app.statusText === "Pending" ? (
                  <>
                    <Button onClick={() => handleApprove(app.requestId)} className="mr-2">Approve</Button>
                    <Button onClick={() => handleReject(app.requestId)} variant="destructive">Reject</Button>
                  </>
                ) : (
                  <span>{app.statusText}</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Home;