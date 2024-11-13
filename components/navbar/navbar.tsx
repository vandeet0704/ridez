import React from 'react'
import { Label } from '../ui/label'
import { ModeToggle } from './theme-toggle'
import { Button } from '../ui/button'
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className='flex flex-row w-full px-8 py-4 border items-center justify-between z-1000'>
        <Label className='text-2xl font-bold'>RidEZ</Label>
        <div className='flex flex-row space-x-4'>
            <ModeToggle />
            <Button variant="secondary">
              <Link href="/check-status">Check Status</Link>
            </Button>
            <Button>
              <Link href="/login">Sign In</Link>
            </Button>
        </div>
    </div>
  )
}
