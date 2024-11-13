"use client";
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'; 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  requestId: z.string().min(1, {
    message: "Request ID is required.",
  }),
  userAddress: z.string().min(1, {
    message: "User Address is required.",
  }),
});

export default function Home() {
  const [userDetails, setUserDetails] = useState<any | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      requestId: "",
      userAddress: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Fetch user details and update state
    // setUserDetails(fetchedDetails);
  };

  return (
    <div className="flex flex-row items-center justify-between gap-8 font-[family-name:var(--font-geist-sans)] min-h-screen">
      <div className="flex w-[50%] h-full items-center justify-center">
        <Card className='p-8 w-[80%]'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
              <CardHeader>
                <CardTitle className='text-primary font-bold text-3xl'>Request Details</CardTitle>
              </CardHeader>
              <CardContent className='w-full'>
                <div className='flex flex-col w-full space-y-4'>
                  <FormField
                    control={form.control}
                    name="requestId"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Request ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter request ID" {...field} className="w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="userAddress"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>User Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter user address" {...field} className="w-full" />
                        </FormControl>
                        <FormMessage />
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
          {userDetails ? (
            <CardContent className='w-full'>
              {/* Display user details here */}
              <div>
                <p>User ID: {userDetails.userId}</p>
                <p>User Address: {userDetails.userAddress}</p>
                {/* Add more details as needed */}
              </div>
            </CardContent>
          ) : (
            <CardContent className='w-full flex items-center justify-center'>
              <Label className="text-center text-muted-foreground">No details fetched yet</Label>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}