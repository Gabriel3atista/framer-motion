"use client"

import './style.css'

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import useMeasure from 'react-use-measure'

export default function Example() {
  const [showExtraContent, setShowExtraContent] = useState(false);
  const [box, boxBounds] = useMeasure();

  return (
    <div className="wrapper">
      <button className="button" onClick={() => setShowExtraContent((b) => !b)}>
        Toggle height
      </button>
      <motion.div 
        animate={{ height: boxBounds.height ? boxBounds.height : null }}
        transition={{ duration: 0.3 }}
        className="element"
      >
        <div ref={ box } className="inner">
          <h1>Fake Family Drawer</h1>
          <p>
            This is a fake family drawer. Animating height is tricky, but
            satisfying when it works.
          </p>
          <AnimatePresence mode="popLayout">
            { showExtraContent && (
                <motion.p
                  key="extraText"
                  exit={{ y: "75%" }}
                  transition={{ duration: 1 }}
                >This extra content will change the height of the drawer. Some even more content to make the drawer taller and taller and taller...</motion.p>
              )
            }
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}