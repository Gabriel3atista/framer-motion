"use client"

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
 
export default function Circle() {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const boundingBox = useRef(null);

  return (
    <main className="flex items-center justify-center antialiased min-h-screen">
      <div ref={boundingBox} className="grid place-items-center w-[700px] h-[700px] p-6 bg-black border border-slate-800 shadow-sm rounded-md space-y-6">
        <button 
          className="bg-white text-black py-2 px-4 rounded-md" 
          onClick={() => setShouldAnimate((s) => !s)}

        >Animate</button>
        <motion.div
          drag
          dragMomentum={ false }
          dragConstraints={ boundingBox }
          animate={{ 
            scale: shouldAnimate ? 1.5 : 1, 
            y: shouldAnimate ? -40 : 0 
          }}
          className="w-12 h-12 bg-yellow-300 rounded-lg"
        ></motion.div>
      </div>
    </main>
  );
}
