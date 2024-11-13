"use client";
import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
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
 
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  livingAddress: z.string().min(2, {
    message: "Please enter a valid address.",
  }),
  gender: z.enum(["male", "female"], {
    message: "Please select a gender.",
  }),
  type: z.enum(["rider", "driver"], {
    message: "Please select a user type.",
  }),
  vehicleName: z.string().optional(),
  vehicleNumber: z.string().optional(),
})

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      livingAddress: "",
      gender: undefined,
      type: undefined,
      vehicleName: "",
      vehicleNumber: "",
    },
  })

  const userType = form.watch("type");

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

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
                <CardTitle className='text-primary font-bold text-3xl'>Register</CardTitle>
              </CardHeader>
              <CardContent className='w-full'>
                <div className='flex flex-col w-full space-y-6'>
                  <div className='flex flex-row w-full space-x-4'>
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter username" {...field} className="w-full" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter email" {...field} className="w-full" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='flex flex-row w-full space-x-4'>
                  <FormField
                      control={form.control}
                      name="livingAddress"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your address" {...field} className="w-full" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Gender</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose your gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>User Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose user type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="rider">Rider</SelectItem>
                              <SelectItem value="driver">Driver</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {userType === "driver" && (
                    <div className='flex flex-row w-full space-x-4'>
                      <FormField
                        control={form.control}
                        name="vehicleName"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Vehicle Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter vehicle name" {...field} className="w-full" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="vehicleNumber"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Vehicle Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter vehicle number" {...field} className="w-full" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className='flex flex-row w-full items-center justify-end'>
                <Button type="submit">Register</Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}