
import { ModuleType, ModuleProgress } from '../types';

const STORAGE_KEY = 'ict_learning_studio_progress';

export const getProgress = (): Record<ModuleType, ModuleProgress> => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse progress", e);
    }
  }
  
  // Default structure
  const initial: any = {};
  [ModuleType.HTML_CSS, ModuleType.PYTHON, ModuleType.JAVASCRIPT].forEach(id => {
    initial[id] = {
      lessonViewed: false,
      practiceAttempted: false,
      assessmentSubmitted: false,
      score: null,
      timeSpentSeconds: 0
    };
  });
  return initial;
};

export const saveProgress = (progress: Record<ModuleType, ModuleProgress>) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

export const updateModuleProgress = (moduleId: ModuleType, updates: Partial<ModuleProgress>) => {
  const current = getProgress();
  current[moduleId] = { ...current[moduleId], ...updates };
  saveProgress(current);
};

export const isModuleComplete = (progress: ModuleProgress): boolean => {
  return progress.lessonViewed && progress.practiceAttempted && progress.assessmentSubmitted;
};

export const calculateTotalTime = (progress: Record<ModuleType, ModuleProgress>): number => {
  return Object.values(progress).reduce((acc, curr) => acc + curr.timeSpentSeconds, 0);
};

export const calculateAverageScore = (progress: Record<ModuleType, ModuleProgress>): number => {
  const scores = Object.values(progress)
    .filter(p => p.score !== null)
    .map(p => (p.score! / 5) * 100); // 5 questions per module
  
  if (scores.length === 0) return 0;
  return scores.reduce((a, b) => a + b, 0) / scores.length;
};

export const formatTime = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}h ${m}m ${s}s`;
};
