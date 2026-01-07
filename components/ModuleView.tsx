
import React, { useState, useEffect, useRef } from 'react';
import { SyllabusModule, Step } from '../types';
import LessonStep from './steps/LessonStep';
import LivePreviewStep from './steps/LivePreviewStep';
import PracticeStep from './steps/PracticeStep';
import AssessmentStep from './steps/AssessmentStep';
import SummaryStep from './steps/SummaryStep';
import { updateModuleProgress, getProgress } from '../utils/storage';

interface ModuleViewProps {
  module: SyllabusModule;
  onBack: () => void;
}

const ModuleView: React.FC<ModuleViewProps> = ({ module, onBack }) => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.LESSON);
  const startTimeRef = useRef<number>(Date.now());

  const steps = [
    { id: Step.LESSON, label: "1. Lesson" },
    { id: Step.LIVE_PREVIEW, label: "2. Live Preview" },
    { id: Step.PRACTICE, label: "3. Practice" },
    { id: Step.ASSESSMENT, label: "4. Assessment" },
    { id: Step.SUMMARY, label: "5. Summary" },
  ];

  // Time Tracking Logic
  useEffect(() => {
    startTimeRef.current = Date.now();
    
    // Mark lesson as viewed if they land on it
    if (currentStep === Step.LESSON) {
      updateModuleProgress(module.id, { lessonViewed: true });
    }

    return () => {
      const elapsedSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const currentProgress = getProgress();
      const existingTime = currentProgress[module.id].timeSpentSeconds || 0;
      updateModuleProgress(module.id, { timeSpentSeconds: existingTime + elapsedSeconds });
    };
  }, [module.id, currentStep]);

  const handlePracticeRun = () => {
    updateModuleProgress(module.id, { practiceAttempted: true });
  };

  return (
    <div className="max-w-[1000px] mx-auto space-y-6">
      <button 
        onClick={onBack}
        className="text-[#4f81bd] text-sm font-semibold hover:underline mb-2"
      >
        &larr; Back to Dashboard
      </button>

      {/* Navigation Tabs */}
      <div className="flex rounded-[6px] overflow-hidden bg-white shadow-sm border border-[#d0d7de]">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => setCurrentStep(step.id)}
            className={`flex-1 py-3 px-4 text-center font-semibold text-xs md:text-sm transition-colors ${
              currentStep === step.id 
                ? 'bg-[#1f3a5f] text-white' 
                : 'bg-[#f4f6f8] text-[#555555] hover:bg-gray-200'
            }`}
          >
            {step.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="min-h-[600px]">
        {currentStep === Step.LESSON && <LessonStep lesson={module.lesson} />}
        {currentStep === Step.LIVE_PREVIEW && <LivePreviewStep preview={module.livePreview} moduleId={module.id} />}
        {currentStep === Step.PRACTICE && (
          <PracticeStep 
            practice={module.practice} 
            moduleId={module.id} 
            onRun={handlePracticeRun}
          />
        )}
        {currentStep === Step.ASSESSMENT && (
          <AssessmentStep 
            questions={module.assessment} 
            moduleId={module.id}
            onComplete={() => {}} // Score saved in component
          />
        )}
        {currentStep === Step.SUMMARY && <SummaryStep summary={module.summary} />}
      </div>
    </div>
  );
};

export default ModuleView;
