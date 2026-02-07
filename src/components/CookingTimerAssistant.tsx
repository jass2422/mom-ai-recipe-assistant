"use client";
import { useState, useEffect } from "react";

interface CookingStep {
  step: number;
  instruction: string;
  duration?: number; // in minutes
  timerActive?: boolean;
}

interface CookingTimerAssistantProps {
  recipeName: string;
  steps: CookingStep[];
}

export function CookingTimerAssistant({ recipeName, steps = [] }: CookingTimerAssistantProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning && timeLeft && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      // Could add audio alert here
    }
  }, [isRunning, timeLeft]);

  const startTimer = (minutes: number) => {
    setTimeLeft(minutes * 60);
    setIsRunning(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="border rounded-lg p-6 bg-gradient-to-br from-orange-50 to-yellow-50 shadow-lg max-w-2xl">
      <h2 className="text-2xl font-bold mb-2">👨‍🍳 Cooking: {recipeName}</h2>
      <div className="text-sm text-gray-600 mb-4">
        Step {currentStep + 1} of {steps.length}
      </div>

      {currentStepData && (
        <div className="bg-white rounded-lg p-4 mb-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
              {currentStep + 1}
            </div>
            <div className="flex-1">
              <p className="text-lg">{currentStepData.instruction}</p>
              
              {currentStepData.duration && (
                <div className="mt-3">
                  {timeLeft !== null ? (
                    <div className="text-center">
                      <div className="text-4xl font-bold text-orange-600 mb-2">
                        {formatTime(timeLeft)}
                      </div>
                      <button
                        onClick={() => setIsRunning(!isRunning)}
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                      >
                        {isRunning ? "⏸️ Pause" : "▶️ Resume"}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => startTimer(currentStepData.duration!)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      ⏱️ Start {currentStepData.duration} min timer
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        >
          ← Previous
        </button>
        <button
          onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
          disabled={currentStep === steps.length - 1}
          className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50"
        >
          Next Step →
        </button>
      </div>

      {currentStep === steps.length - 1 && (
        <div className="mt-4 text-center text-green-600 font-semibold">
          🎉 Almost done! One more step!
        </div>
      )}
    </div>
  );
}