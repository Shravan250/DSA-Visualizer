// ArrayVisualizer.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export type ArrayItem = {
  id: string;
  value: number;
};

type ArrayVisualizerProps = {
  data: ArrayItem[];
};

const ArrayBox = ({ item }: { item: ArrayItem }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{ duration: 0.3 }}
      className="w-12 h-12 mx-1.5 bg-blue-500 flex items-center justify-center text-white font-bold rounded-md"
    >
      {item.value}
    </motion.div>
  );
};

const ArrayVisualizer = ({ data }: ArrayVisualizerProps) => {
  return (
    <div className="flex items-center justify-center p-4">
      <AnimatePresence>
        {data.map((item) => (
          <ArrayBox key={item.id} item={item} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ArrayVisualizer;
