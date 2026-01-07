
import React, { useState, useRef, useEffect } from 'react';
import { ModuleType } from '../../types';

interface PracticeStepProps {
  practice: {
    instruction: string;
    validationRegex: RegExp;
    successMessage: string;
    errorMessage: string;
  };
  moduleId: ModuleType;
  onRun?: () => void;
}

const PracticeStep: React.FC<PracticeStepProps> = ({ practice, moduleId, onRun }) => {
  const [code, setCode] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const handleRun = () => {
    if (onRun) onRun();
    setFeedback(null);
    
    // Clear previous output UI
    if (outputRef.current) outputRef.current.innerHTML = '';

    // Simple validation based on syllabus rules
    const isValid = practice.validationRegex.test(code);
    
    if (isValid) {
      setFeedback({ type: 'success', text: practice.successMessage });
    } else {
      setFeedback({ type: 'error', text: practice.errorMessage });
    }

    // Run actual code for visualization
    if (moduleId === ModuleType.HTML_CSS) {
      const iframe = document.createElement('iframe');
      iframe.className = "w-full h-[200px] border border-[#d0d7de]";
      outputRef.current?.appendChild(iframe);
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(code);
        doc.close();
      }
    } else if (moduleId === ModuleType.PYTHON) {
      const pre = document.createElement('pre');
      pre.id = "python-practice-output";
      pre.className = "p-2 text-sm font-mono";
      outputRef.current?.appendChild(pre);

      const script = document.createElement('script');
      script.type = "text/python";
      script.text = `
from browser import document, sys
class OutputCatcher:
    def write(self, data):
        document["python-practice-output"].text += data
sys.stdout = OutputCatcher()
try:
    ${code.replace(/\n/g, '\n    ')}
except Exception as e:
    print(str(e))
      `;
      document.body.appendChild(script);
      // @ts-ignore
      if (window.brython) window.brython();
      setTimeout(() => { if (document.body.contains(script)) document.body.removeChild(script); }, 100);
    } else if (moduleId === ModuleType.JAVASCRIPT) {
        const p5Script = document.createElement('script');
        p5Script.text = `
          (function() {
            const container = document.getElementById('practice-output-container');
            if(container) container.innerHTML = '';
            new p5((p) => {
              ${code.replace(/setup\s*\(\)/g, 'p.setup = () =>').replace(/draw\s*\(\)/g, 'p.draw = () =>').replace(/(\w+)\(/g, (m, name) => {
                const p5Funcs = ['createCanvas', 'background', 'fill', 'rect', 'circle', 'ellipse', 'stroke', 'noStroke'];
                return p5Funcs.includes(name) ? 'p.'+name+'(' : m;
              }).replace(/mouseX/g, 'p.mouseX').replace(/mouseY/g, 'p.mouseY')}
            }, container);
          })();
        `;
        outputRef.current?.appendChild(p5Script);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-[6px] shadow-sm border border-[#d0d7de]">
        <h3 className="text-[#1f3a5f] font-semibold mb-2">Instructions</h3>
        <p className="text-[#555555]">{practice.instruction}</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="flex flex-col bg-white border border-[#d0d7de] rounded-[6px] overflow-hidden">
          <div className="bg-[#1f3a5f] text-white px-4 py-2 flex justify-between items-center">
            <span className="text-xs font-semibold">Editor</span>
            <button 
              onClick={handleRun}
              className="bg-white text-[#1f3a5f] text-xs px-4 py-1 rounded-[4px] font-bold hover:bg-gray-100 transition-colors"
            >
              Run Code
            </button>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 p-4 font-mono text-sm bg-gray-50 focus:outline-none"
            placeholder={`Type your ${moduleId.toLowerCase()} code here...`}
            spellCheck={false}
          />
        </div>

        <div className="flex flex-col bg-white border border-[#d0d7de] rounded-[6px] overflow-hidden">
          <div className="bg-[#4f81bd] text-white px-4 py-2 text-xs font-semibold">
            Output Panel
          </div>
          <div 
            id="practice-output-container"
            ref={outputRef} 
            className="p-4 min-h-[150px] bg-white border-b border-[#d0d7de] flex items-center justify-center overflow-auto"
          >
            {/* Real-time output renders here */}
          </div>
          
          {feedback && (
            <div className={`p-4 font-semibold text-sm ${
              feedback.type === 'success' ? 'text-[#2e7d32] bg-green-50' : 'text-[#c62828] bg-red-50'
            }`}>
              {feedback.type === 'success' ? '✔ ' : '✖ '}
              {feedback.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PracticeStep;
