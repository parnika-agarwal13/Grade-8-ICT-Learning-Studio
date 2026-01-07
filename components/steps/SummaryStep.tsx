
import React from 'react';

interface SummaryStepProps {
  summary: {
    points: string[];
  };
}

const SummaryStep: React.FC<SummaryStepProps> = ({ summary }) => {
  return (
    <div className="bg-white p-8 rounded-[6px] shadow-[0_2px_6px_rgba(0,0,0,0.08)]">
      <h2 className="text-[#1f3a5f] text-2xl font-semibold mb-6">Module Summary</h2>
      
      <div className="space-y-4">
        <p className="text-[#1a1a1a] mb-4">You have completed this module! Here is a recap of what we covered:</p>
        <ul className="space-y-4">
          {summary.points.map((point, i) => (
            <li key={i} className="flex items-start">
              <span className="text-[#4f81bd] mr-3 mt-1">•</span>
              <span className="text-[#555555] leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 p-6 bg-blue-50 border border-blue-100 rounded-[6px]">
        <h3 className="text-[#1f3a5f] font-semibold mb-2">Next Steps</h3>
        <p className="text-sm text-[#555555]">
          You can now return to the dashboard to select another module or revisit the lesson to reinforce your learning.
        </p>
      </div>
    </div>
  );
};

export default SummaryStep;
