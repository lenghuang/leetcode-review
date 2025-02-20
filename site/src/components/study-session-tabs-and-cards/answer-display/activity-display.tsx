'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { ActivityDisplayProps } from '@/types/study-session.types';
import { MultipleChoiceV0AnswerType } from '@/types/zod.types';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const EMPTY_DRAWER_DATA = {
  displayChoice: '',
  feedback: '',
  isCorrect: false,
};

export function ActivityDisplayForMultipleChoiceV0({
  data,
  onActivityCompleted,
}: ActivityDisplayProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isFirstAttempt, setIsFirstAttempt] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerData, setDrawerData] =
    useState<MultipleChoiceV0AnswerType>(EMPTY_DRAWER_DATA);

  const handleAnswer = (answerData: MultipleChoiceV0AnswerType) => {
    setIsDrawerOpen(true);
    setDrawerData(answerData);
  };

  const handleDrawerClose = (open: boolean) => {
    if (!open) {
      if (isFirstAttempt && drawerData.isCorrect) {
        setScore((score) => score + 1);
      } else {
        setIsFirstAttempt(false);
      }

      if (drawerData.isCorrect) {
        if (currentQuestion < data.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          onActivityCompleted();
        }
      }

      setIsDrawerOpen(false);
      setDrawerData(EMPTY_DRAWER_DATA);
    }
  };

  return (
    <div className="p-4 md:p-8 flex flex-col justify-center items-center">
      <div className="w-full max-w-2xl">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold">
              Question {currentQuestion + 1} of {data.length}
            </span>
            <span className="text-sm font-semibold">
              Score: {score}/{data.length}
            </span>
          </div>
          <Progress value={((currentQuestion + 1) / data.length) * 100} />
        </div>
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            {data[currentQuestion].displayQuestion}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data[currentQuestion].displayAnswers.map((option, index) => (
              <motion.button
                key={index}
                className="text-secondary-foreground bg-primary/30 py-3 px-6 rounded-lg text-lg
                  font-semibold transition shadow-sm duration-200 ease-in-out transform"
                onClick={() => handleAnswer(option)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {option.displayChoice}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      <Drawer open={isDrawerOpen} onOpenChange={handleDrawerClose}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>
                {drawerData.isCorrect ? 'Correct!' : 'Not quite...'}
              </DrawerTitle>
              <DrawerDescription>{drawerData.feedback}</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">
                  {drawerData.isCorrect ? 'Continue' : 'Try Again'}
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
