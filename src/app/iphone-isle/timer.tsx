"use client"

import { 
  PauseIcon, 
  XMarkIcon,
  PlayIcon
} from '@heroicons/react/24/solid'

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Isle({ closeTimer }) {
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval = null;
    
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else if (interval !== null) {
      clearInterval(interval);
    }

    return () => { 
      if (interval !== null) clearInterval(interval);
    }
  }, [isRunning]);

  const formatTime = (): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hrs < 10 ? '0' : ''}${hrs}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  const timer: string[] = formatTime().split('');
  const variants = {
    initial: { scale: 0, opacity: 0},
    animate: { scale: 1, opacity: 1},
    exit: { scale: 0, opacity: 0},
  }
  const transition = { 
    type: "sprint", 
    bounce: false, 
    opacity: { 
      duration: .050
    },
    scale: { 
      duration: .130
    }
  }

  return (
    <>
      <div className="flex gap-4">
        <button
            onClick={() => setIsRunning(!isRunning)} 
            className="flex justify-center items-center w-[56px] h-[56px] bg-orange-500/[40%] hover:bg-orange-500/[50%] transition-all duration-200 rounded-full cursor-pointer"
          >
          <AnimatePresence mode="popLayout" initial={false}>
            {
              isRunning 
              ? (
                  <motion.div
                    key="pause"
                    variants={variants} 
                    initial="initial" 
                    animate="animate" 
                    exit="exit"
                    transition={{ ...transition }}
                  >
                    <PauseIcon className="size-8 text-amber-500" />
                  </motion.div>
                )
              : (
                  <motion.div
                    key="play"
                    variants={variants} 
                    initial="initial" 
                    animate="animate" 
                    exit="exit"
                    transition={{ ...transition }}
                  >
                    <PlayIcon className="size-8 text-amber-500" />
                  </motion.div>
                )
            }
          </AnimatePresence>
        </button>
        <button 
          onClick={closeTimer}  
          className="flex justify-center items-center w-[56px] h-[56px] bg-gray-500/[40%] hover:bg-gray-500/[50%] transition-all duration-200 rounded-full cursor-pointer"
        >
          <XMarkIcon className="size-8 text-white" />
        </button>
      </div>
      <div className="flex items-end gap-2 text-amber-500">
        <div className="text-lg font-semibold">Timer</div>
        <div className='relative whitespace-nowrap w-[194px] text-5xl tabular-nums'>
          <AnimatePresence mode="popLayout" initial={false}>
              {timer.map((digit, index) => {
                  return (
                      <motion.span
                          key={`${digit}-${index}`}
                          className='inline-block'
                          initial={{ y: -16, opacity: 0, filter: "blur(4px)" }} 
                          animate={{ y: 0, opacity: 1,filter: "blur(0px)" }} 
                          exit={{ y: 16, opacity: 0,  filter: "blur(4px)" }}
                      >
                          {digit}
                      </motion.span>
                  );
              })}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
