
import React, { useEffect, useState } from 'react';
import { ModuleType, SYLLABUS, ModuleProgress } from '../types';
import StudentOverview from './StudentOverview';
import DoubtClarifier from './DoubtClarifier';
import { getProgress, isModuleComplete } from '../utils/storage';

interface DashboardProps {
  onOpenModule: (id: ModuleType) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onOpenModule }) => {
  const [progress, setProgress] = useState<Record<ModuleType, ModuleProgress>>(getProgress());
  const modules = Object.values(SYLLABUS);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const getModuleIcon = (id: ModuleType) => {
    switch (id) {
      case ModuleType.HTML_CSS: return '</>';
      case ModuleType.PYTHON: return '{}';
      case ModuleType.JAVASCRIPT: return 'JS';
      default: return '';
    }
  };

  return (
    <div className="space-y-8 relative">
      {/* Top Section: Overview */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full">
          <StudentOverview progress={progress} />
        </div>
      </div>
      
      {/* Modules Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {modules.map((mod) => {
          const isDone = isModuleComplete(progress[mod.id]);
          return (
            <div 
              key={mod.id} 
              className="bg-white border-t-4 border-[#4f81bd] rounded-[6px] shadow-[0_2px_6px_rgba(0,0,0,0.08)] p-6 flex flex-col h-full relative"
            >
              {isDone && (
                <div className="absolute top-4 right-4 bg-[#2e7d32] text-white text-[10px] px-2 py-1 rounded font-bold uppercase">
                  Complete
                </div>
              )}
              
              <div className="flex items-center gap-3 mb-4">
                <div className="text-[#1f3a5f] font-mono font-bold text-lg opacity-80 select-none">
                  {getModuleIcon(mod.id)}
                </div>
                <h2 className="text-[#1f3a5f] text-xl font-semibold">{mod.title}</h2>
              </div>

              <ul className="mb-8 flex-grow">
                {mod.topics.map((topic, i) => (
                  <li key={i} className="text-[#555555] text-sm mb-2 list-disc ml-4">
                    {topic}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => onOpenModule(mod.id)}
                className="w-full bg-[#1f3a5f] text-white py-2 px-4 rounded-[6px] font-semibold hover:opacity-90 transition-opacity mt-auto"
              >
                Open Module
              </button>
            </div>
          );
        })}
      </div>

      {/* Floating Doubt Clarifier Assistant (Dashboard Only) */}
      <DoubtClarifier />
    </div>
  );
};

export default Dashboard;
