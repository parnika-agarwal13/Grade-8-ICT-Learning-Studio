
import React from 'react';

interface LessonStepProps {
  lesson: {
    heading: string;
    content: string[];
    codeExample: string;
  };
}

const LessonStep: React.FC<LessonStepProps> = ({ lesson }) => {
  return (
    <div className="bg-white p-8 rounded-[6px] shadow-[0_2px_6px_rgba(0,0,0,0.08)]">
      <h2 className="text-[#1f3a5f] text-2xl font-semibold mb-6">{lesson.heading}</h2>
      
      <div className="space-y-4 mb-8">
        {lesson.content.map((p, i) => (
          <p key={i} className="text-[#1a1a1a] leading-relaxed">
            {p}
          </p>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-[#1f3a5f] text-lg font-semibold mb-3">Example Code</h3>
        <pre className="bg-[#f4f6f8] p-6 rounded-[4px] border border-[#d0d7de] text-sm overflow-x-auto">
          <code>{lesson.codeExample}</code>
        </pre>
      </div>
    </div>
  );
};

export default LessonStep;
