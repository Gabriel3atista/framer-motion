"use client"

import Timer from './timer';

import Image from 'next/image'
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";

const isleLabels = ['default', 'timer'];

export default function Phone() {
  const [currentState, setCurrentState] = useState('default');

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

  function closeTimer () {
    setCurrentState('default')
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
            className='w-full flex justify-between p-4'
          >
              <Timer closeTimer={closeTimer}/>
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

  return (
    <main className="flex items-center justify-center antialiased h-screen max-h-screen">
      <div className="relative w-[480px] h-[480px] overflow-hidden after:content-[''] after:bg-gradient-to-t after:from-slate-50 after:from-10% after:rounded-lg after:pointer-events-none after:absolute after:bottom-0 after:w-full after:h-52">
        <Image
          className='w-full pointer-events-none'
          src="/mockups/iphone-15.png" 
          alt="iPhone 15" 
          width={508} height={1000} 
        />
        <div className='absolute top-11 left-1/2 -translate-x-1/2 z-10 flex flex-col justify-center items-center gap-32'>
          <motion.div
            layout
            className="relative flex items-center justify-center bg-black rounded-full"
            style={
              currentState === 'default'
              ? { width: 128, height: 32 }
              : { width: 378, height: 77 }
            }
            transition={{ duration: .6, type: "spring" }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {isleStates}
            </AnimatePresence>
          </motion.div>
          <div className="flex gap-4">
            {isleLabels.map((state, index) => {
              return <button key={index} onClick={() => setCurrentState(state)} className='bg-gray-100 rounded-md px-4 py-1 border border-gray-200 hover:bg-gray-200'>{state}</button>
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
