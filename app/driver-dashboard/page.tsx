"use client";
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";

const initialRides = [
  { rideId: 1, source: "Location A", destination: "Location B" },
  { rideId: 2, source: "Location C", destination: "Location D" },
  // Add more rides as needed
];

export default function Home() {
  const [rides, setRides] = useState(initialRides);
  const [selectedRide, setSelectedRide] = useState(null);

  const handleAccept = (ride) => {
    setSelectedRide(ride);
  };

  const handleReject = (rideId) => {
    setRides(rides.filter(ride => ride.rideId !== rideId));
  };

  const handleComplete = () => {
    setSelectedRide(null);
    setRides(rides.filter(ride => ride.rideId !== selectedRide.rideId));
  };

  return (
    <div className="flex flex-row items-center justify-between gap-8 font-[family-name:var(--font-geist-sans)] min-h-screen">
      <div className="flex w-[50%] h-full items-center justify-center">
        <Card className='p-8 w-[80%]'>
          <CardHeader>
            <CardTitle className='text-primary font-bold text-3xl'>Available Rides</CardTitle>
          </CardHeader>
          <CardContent className='w-full'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ride ID</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rides.map((ride) => (
                  <TableRow key={ride.rideId}>
                    <TableCell>{ride.rideId}</TableCell>
                    <TableCell>{ride.source}</TableCell>
                    <TableCell>{ride.destination}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleAccept(ride)} className="mr-2">Accept</Button>
                      <Button onClick={() => handleReject(ride.rideId)} variant="destructive">Reject</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div className="flex w-[50%] h-full items-center justify-center">
        <Card className='p-8 w-[80%]'>
          {selectedRide ? (
            <CardContent className='w-full'>
              <div>
                <p>Ride ID: {selectedRide.rideId}</p>
                <p>Source: {selectedRide.source}</p>
                <p>Destination: {selectedRide.destination}</p>
                <Button onClick={handleComplete} className="mt-4">Complete</Button>
              </div>
            </CardContent>
          ) : (
            <CardContent className='w-full flex items-center justify-center'>
              <Label className="text-center text-muted-foreground">No details displayed</Label>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}