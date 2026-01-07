
import React from 'react';
import { ModuleType, ModuleProgress } from '../types';
import { calculateTotalTime, calculateAverageScore, formatTime, isModuleComplete } from '../utils/storage';

interface StudentOverviewProps {
  progress: Record<ModuleType, ModuleProgress>;
}

const StudentOverview: React.FC<StudentOverviewProps> = ({ progress }) => {
  const completedCount = Object.values(progress).filter(isModuleComplete).length;
  const avgScore = calculateAverageScore(progress);
  const totalTime = calculateTotalTime(progress);

  return (
    <div className="bg-white p-6 rounded-[6px] shadow-sm border border-[#d0d7de] h-full flex flex-col justify-between">
      <div className="mb-6">
        <h2 className="text-[#1f3a5f] text-xl font-semibold mb-6">Student Overview</h2>
        
        {/* LINE 1: Progress Tracker */}
        <div className="space-y-2 mb-6">
          <p className="text-sm text-[#555555] font-semibold uppercase tracking-wider">
            Progress: {completedCount} / 3 Modules Completed
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#2e7d32] h-2 rounded-full transition-all duration-500" 
              style={{ width: `${(completedCount / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <hr className="border-[#d0d7de] mb-6" />

        {/* LINE 2: Two Columns */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-xs text-[#555555] font-semibold uppercase tracking-wider">Average Score</p>
            <p className="text-2xl font-bold text-[#1f3a5f]">{avgScore.toFixed(0)}%</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-[#555555] font-semibold uppercase tracking-wider">Total Time Spent</p>
            <p className="text-2xl font-bold text-[#1f3a5f]">{formatTime(totalTime)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentOverview;
