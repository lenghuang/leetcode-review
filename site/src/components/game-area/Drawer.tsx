'use client';

import { motion } from 'framer-motion';
import { XIcon } from 'lucide-react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isCorrect: boolean;
}

export default function Drawer({ isOpen, onClose, isCorrect }: DrawerProps) {
  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: isOpen ? 0 : '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed inset-x-0 bottom-0 z-50 bg-white shadow-lg rounded-t-3xl"
    >
      <div className="p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <XIcon size={24} />
        </button>
        <div className="flex flex-col items-center">
          {isCorrect ? (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 10, stiffness: 100 }}
              >
                <span className="text-6xl mb-4">🎉</span>
              </motion.div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">
                Correct!
              </h2>
              <p className="text-gray-600">Great job! Keep up the good work!</p>
            </>
          ) : (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 10, stiffness: 100 }}
              >
                <span className="text-6xl mb-4">😕</span>
              </motion.div>
              <h2 className="text-2xl font-bold text-red-600 mb-2">Oops!</h2>
              <p className="text-gray-600">
                Don't worry, try again. You've got this!
              </p>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
