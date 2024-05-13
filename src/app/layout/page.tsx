"use client"

import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useState } from 'react';
 
export default function Layout() {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  return (
    <main className="flex items-center justify-center antialiased min-h-screen">
      <div className="relative grid place-items-center w-[700px] h-[700px] p-6 bg-black shadow-sm rounded-xl space-y-6">
        <motion.div
          layout
          onClick={() => setShouldAnimate((s) => !s)}
          className="bg-yellow-300 rounded-lg"
          style={
            shouldAnimate
              ? { position: "absolute", inset: 0, width: "100%", height: "100%" }
              : { height: 48, width: 48 }
          }
        />
      </div>
    </main>
  );
}
