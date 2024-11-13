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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  source: z.string().min(1, {
    message: "Source is required.",
  }),
  destination: z.string().min(1, {
    message: "Destination is required.",
  }),
  openToShare: z.boolean().optional(),
});

export default function Home() {
  const [rides, setRides] = useState<any[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      source: "",
      destination: "",
      openToShare: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Add a new ride to the rides array
    const newRide = {
      rideId: rides.length + 1,
      source: values.source,
      destination: values.destination,
      openToShare: values.openToShare,
    };
    setRides([...rides, newRide]);
  };

  return (
    <div className="flex flex-row items-center justify-between gap-8 font-[family-name:var(--font-geist-sans)] min-h-screen">
      <div className="flex w-[50%] h-full items-center justify-center">
        <Card className='p-8 w-[80%]'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
              <CardHeader>
                <CardTitle className='text-primary font-bold text-3xl'>Start a Ride</CardTitle>
              </CardHeader>
              <CardContent className='w-full'>
                <div className='flex flex-col w-full space-y-4'>
                  <FormField
                    control={form.control}
                    name="source"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Source</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter source" {...field} className="w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="destination"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Destination</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter destination" {...field} className="w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="openToShare"
                    render={({ field }) => (
                      <FormItem className="w-full flex flex-row items-center justify-start gap-2">
                        <FormLabel>Open to Share</FormLabel>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
              <CardFooter className='flex flex-row w-full items-center justify-end'>
                <Button type="submit">Submit</Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
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
                {rides.map((ride, index) => (
                  <TableRow key={index}>
                    <TableCell>{ride.rideId}</TableCell>
                    <TableCell>{ride.source}</TableCell>
                    <TableCell>{ride.destination}</TableCell>
                    <TableCell>
                      <Button>Join Now</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}