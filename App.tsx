
import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ModuleView from './components/ModuleView';
import { ModuleType, SYLLABUS } from './types';

const App: React.FC = () => {
  const [activeModuleId, setActiveModuleId] = useState<ModuleType | null>(null);

  const activeModule = activeModuleId ? SYLLABUS[activeModuleId] : null;

  const handleOpenModule = (id: ModuleType) => {
    setActiveModuleId(id);
  };

  const handleBackToDashboard = () => {
    setActiveModuleId(null);
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#1a1a1a]">
      <Header />
      <main className="max-w-[1200px] mx-auto px-4 py-8">
        {!activeModule ? (
          <Dashboard onOpenModule={handleOpenModule} />
        ) : (
          <ModuleView 
            module={activeModule} 
            onBack={handleBackToDashboard} 
          />
        )}
      </main>
    </div>
  );
};

export default App;
