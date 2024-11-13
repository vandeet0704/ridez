"use client";
import React, { useState } from 'react';
import Link from 'next/link';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Player } from '@lottiefiles/react-lottie-player';

const loginSchema = z.object({
  loginType: z.enum(["admin", "user"], {
    message: "Please select a login type.",
  }),
  userId: z.string().optional(),
  userAddress: z.string().optional(),
});

export default function Home() {
  const [loginType, setLoginType] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      loginType: undefined,
      userId: "",
      userAddress: "",
    },
  });

  const handleLoginTypeChange = (value: string) => {
    setLoginType(value);
    form.setValue("loginType", value);
  };

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    if (values.loginType === "user") {
      // Perform user login actions
      console.log(values);
    }
  };

  return (
    <div className="flex flex-row items-center justify-between gap-8 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-grow w-[30%] h-full items-start justify-start px-16 py-24 pt-48">
        <Player
          src='/Animation - 1731473858963.json'
          className="player h-[400px]"
          loop
          autoplay
        />
      </div>
      <div className="flex w-[70%] h-full items-center justify-center">
        <Card className='p-8 w-[80%]'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
              <CardHeader>
                <CardTitle className='text-primary font-bold text-3xl'>Login</CardTitle>
              </CardHeader>
              <CardContent className='w-full'>
                <div className='flex flex-col w-full space-y-4'>
                  <FormField
                    control={form.control}
                    name="loginType"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Login as</FormLabel>
                        <Select onValueChange={handleLoginTypeChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select login type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {loginType === "user" && (
                    <>
                      <FormField
                        control={form.control}
                        name="userId"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>User ID</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter user ID" {...field} className="w-full" />
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
                    </>
                  )}
                </div>
              </CardContent>
              <CardFooter className='flex flex-row w-full items-center justify-end'>
                {loginType === "admin" ? (
                  <Link href="/admin-dashboard">
                    <Button type="button">Login</Button>
                  </Link>
                ) : (
                  <Link href="/user-dashboard">
                    <Button type="submit">Login</Button>
                  </Link>
                )}
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}