
import React, { useState } from 'react';
import { MCQ, ModuleType } from '../../types';
import { updateModuleProgress } from '../../utils/storage';

interface AssessmentStepProps {
  questions: MCQ[];
  moduleId: ModuleType;
  onComplete: () => void;
}

const AssessmentStep: React.FC<AssessmentStepProps> = ({ questions, moduleId, onComplete }) => {
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (qIdx: number, oIdx: number) => {
    if (submitted) return;
    const newAnswers = [...answers];
    newAnswers[qIdx] = oIdx;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (answers.includes(null)) {
      alert("Please answer all questions before submitting.");
      return;
    }

    let correctCount = 0;
    answers.forEach((ans, idx) => {
      if (ans === questions[idx].correctIndex) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setSubmitted(true);
    
    updateModuleProgress(moduleId, { 
      assessmentSubmitted: true, 
      score: correctCount 
    });
    
    onComplete();
  };

  return (
    <div className="bg-white p-8 rounded-[6px] shadow-[0_2px_6px_rgba(0,0,0,0.08)]">
      <h2 className="text-[#1f3a5f] text-2xl font-semibold mb-6">Module Assessment</h2>
      
      <div className="space-y-8">
        {questions.map((q, qIdx) => (
          <div key={qIdx} className="space-y-4">
            <p className="font-semibold text-[#1a1a1a]">{qIdx + 1}. {q.question}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {q.options.map((opt, oIdx) => {
                let bgColor = 'bg-white';
                let borderColor = 'border-[#d0d7de]';
                
                if (submitted) {
                  if (oIdx === q.correctIndex) {
                    bgColor = 'bg-green-50';
                    borderColor = 'border-[#2e7d32]';
                  } else if (answers[qIdx] === oIdx) {
                    bgColor = 'bg-red-50';
                    borderColor = 'border-[#c62828]';
                  }
                } else if (answers[qIdx] === oIdx) {
                  bgColor = 'bg-blue-50';
                  borderColor = 'border-[#4f81bd]';
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelect(qIdx, oIdx)}
                    disabled={submitted}
                    className={`text-left p-3 border rounded-[6px] text-sm transition-all ${bgColor} ${borderColor} hover:shadow-sm`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {!submitted ? (
        <button
          onClick={handleSubmit}
          className="mt-12 w-full bg-[#1f3a5f] text-white py-3 rounded-[6px] font-bold hover:opacity-90 transition-opacity"
        >
          Submit Assessment
        </button>
      ) : (
        <div className="mt-12 p-6 rounded-[6px] border text-center" style={{ 
          borderColor: score >= 3 ? '#2e7d32' : '#c62828',
          backgroundColor: score >= 3 ? '#f1f8f1' : '#fff5f5'
        }}>
          <h3 className="text-xl font-bold mb-2">Final Score: {score} / {questions.length}</h3>
          <p className="text-sm">
            {score === questions.length ? "Perfect score! Well done." : 
             score >= 3 ? "Good job! You've passed the assessment." : 
             "Review the lesson and try to improve your score next time."}
          </p>
        </div>
      )}
    </div>
  );
};

export default AssessmentStep;
