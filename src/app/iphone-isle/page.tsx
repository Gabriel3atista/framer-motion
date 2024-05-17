"use client"

import Timer from './timer';

import Image from 'next/image'
import { useMemo, useState, useRef } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";

export default function Phone() {
  const [currentState, setCurrentState] = useState('default');

  const isleContainer = useRef(null);

  const variants = {
    initial: { 
      opacity: 0, 
      filter: "blur(8px)"
    },
    animate: { 
      opacity: 1, 
      filter: "blur(0px)"
    },
    exit: { 
      opacity: 0,
      filter: "blur(8px)"
    },
  }

  const closeIsle = () => {
    setCurrentState('default');
  }

  const isleStates = useMemo(() => {
    switch (currentState) {
      case 'timer':
        return (
          <motion.div
            key="timer"
            layoutId='isle'
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: .6, type: "spring" }}
            className='w-full flex justify-between py-4 pl-4 pr-6'
          >
              <Timer closeIsle={closeIsle}/>
          </motion.div>
        );
      default:
        return (
          <motion.div 
            layoutId='isle'
            transition={{ duration: .6, type: "spring" }}
          >
            <span className='opacity-0 pointer-events-none'>isle</span>
          </motion.div>
        );
    }
  }, [currentState]);

  useOnClickOutside(isleContainer, () => { setCurrentState('default')})

  return (
    <main className="bg-black flex flex-col items-center justify-center antialiased h-screen max-h-screen gap-16">
      <h1 className="text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-br from-fuchsia-400 to-fuchsia-700">iPhone 14 Pro Max</h1>
      <div className="relative w-[400px] h-[400px] overflow-hidden after:content-[''] after:bg-gradient-to-t after:from-black after:from-10% after:rounded-lg after:pointer-events-none after:absolute after:bottom-0 after:w-full after:h-52">
        <nav>
          <motion.div 
            className="absolute top-6 h-8 left-9 flex gap-2 items-center"
            animate={{
              x: currentState === 'default' ? 0 : -24, 
              opacity: currentState === 'default' ? 1 : 0, 
              filter: currentState === 'default' ? "blur(0px)" : "blur(4px)",
            }}
            transition={{ type: "spring", duration: .6 }}
          >
              <span className="text-white font-medium text-sm">19:04</span>
              <Image
                className=''
                src="/icons/location.svg" 
                alt="iPhone 15" 
                width={15} height={14} 
              />
          </motion.div>
          <div className='absolute top-6 left-1/2 -translate-x-1/2 z-10'>
              <motion.div
                layout
                ref={isleContainer}
                className="relative flex items-center justify-center bg-black rounded-full"
                style={
                  currentState === 'default'
                  ? { width: 128, height: 32 }
                  : { width: 348, height: 77 }
                }
                transition={{ duration: .6, type: "spring" }}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  {isleStates}
                </AnimatePresence>
              </motion.div>
          </div>
          <motion.div 
            className="absolute top-6 h-8 right-9 flex gap-2 items-center"
            animate={{
              x: currentState === 'default' ? 0 : 24, 
              opacity: currentState === 'default' ? 1 : 0, 
              filter: currentState === 'default' ? "blur(0px)" : "blur(4px)",
            }}
            transition={{ type: "spring", duration: .6 }}
          >
            <Image
              className=''
              src="/icons/network.svg" 
              alt="iPhone 15" 
              width={19} height={14} 
            />
            <Image
              className=''
              src="/icons/data.svg" 
              alt="iPhone 15" 
              width={21} height={14} 
            />
            <Image
              className=''
              src="/icons/battery.svg" 
              alt="iPhone 15" 
              width={27} height={14} 
            />
          </motion.div>
        </nav>
        <ul className="absolute z-10 w-full p-8 top-24 flex gap-4">
          <li 
            onClick={() => setCurrentState('timer')} 
            className="cursor-pointer active:opacity-80">
            <Image
              className="w-14 h-14"
              src="/icons/clock.svg" 
              alt="iPhone 15" 
              width={260} height={260} 
            />
          </li>
          <li 
            onClick={() => setCurrentState('timer')} 
            className="cursor-pointer active:opacity-80">
            <Image
              className="w-14 h-14"
              src="/icons/spotify.png" 
              alt="iPhone 15" 
              width={260} height={260} 
            />
          </li>
        </ul>
        <Image
          priority
          className='w-full pointer-events-none'
          src="/mockups/iphone-15.webp" 
          alt="iPhone 15" 
          width={508} height={1000} 
        />
      </div>
    </main>
  );
}
