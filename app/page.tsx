"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Player } from '@lottiefiles/react-lottie-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';


export default function Home() {
  return (
    <div className="flex items-center justify-items-start min-h-screen p-8 gap-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 items-start w-full">
        <div className="flex flex-row items-center justify-start gap-12 w-full">
          <div className="flex flex-col items-start justify-start w-[50%]">
            <Label className="text-2xl font-md text-left">Going Somewhere?</Label>
            <Label className="text-6xl font-extrabold text-left">Find a ride or offer one</Label>
            <Button className="pl-8 pr-4 p-4 mt-12 flex items-center space-x-2 group">
              <Link href="/register" className="flex flex-row gap-2 items-center">
                  Get going
                  <FontAwesomeIcon icon={faArrowRight} className="group-hover:ml-2 group-hover:pr-2 pr-4 transition-all duration-300 ease-in-out" />
              </Link>
            </Button>        
          </div>
          <div className="flex flex-col items-center justify-center w-[50%]">
            <Player
              src='/Animation - 1731434977496.json'
              className="player"
              loop
              autoplay
            />
          </div>
        </div>
      </main>
    </div>
  );
}