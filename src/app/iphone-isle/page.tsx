"use client"

import Timer from './timer';

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
            className='w-full flex justify-between p-6'
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
            <span className='opacity-0'>isle</span>
          </motion.div>
        );
    }
  }, [currentState]);

  return (
    <main className="flex items-center justify-center antialiased min-h-screen">
      <div className='flex flex-col justify-center items-center gap-32'>
        <motion.div
          layout
          className="relative flex items-center justify-center bg-black rounded-full"
          style={
            currentState === 'default'
            ? { width: 128, height: 32 }
            : { width: 464, height: 96 }
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
    </main>
  );
}
