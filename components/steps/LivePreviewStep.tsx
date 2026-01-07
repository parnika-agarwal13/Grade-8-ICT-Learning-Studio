
import React, { useEffect, useRef } from 'react';
import { ModuleType } from '../../types';

interface LivePreviewStepProps {
  preview: {
    code: string;
    explanation: string;
  };
  moduleId: ModuleType;
}

const LivePreviewStep: React.FC<LivePreviewStepProps> = ({ preview, moduleId }) => {
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!outputRef.current) return;

    // Clear previous output
    outputRef.current.innerHTML = '';

    if (moduleId === ModuleType.HTML_CSS) {
      const iframe = document.createElement('iframe');
      iframe.className = "w-full h-[400px] border-none";
      outputRef.current.appendChild(iframe);
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(preview.code);
        doc.close();
      }
    } else if (moduleId === ModuleType.PYTHON) {
      // Create separate div for Brython output to strictly show only prints
      const pre = document.createElement('pre');
      pre.id = "python-live-output";
      pre.className = "p-4 text-sm font-mono";
      outputRef.current.appendChild(pre);

      // We use a simplified script execution for Brython
      const script = document.createElement('script');
      script.type = "text/python";
      script.text = `
from browser import document, sys

class OutputCatcher:
    def write(self, data):
        document["python-live-output"].text += data

sys.stdout = OutputCatcher()
${preview.code}
      `;
      document.body.appendChild(script);
      // @ts-ignore
      if (window.brython) window.brython();
      
      return () => {
        document.body.removeChild(script);
      };
    } else if (moduleId === ModuleType.JAVASCRIPT) {
      const canvasDiv = document.createElement('div');
      canvasDiv.id = "p5-live-container";
      outputRef.current.appendChild(canvasDiv);

      // p5 Instance mode
      const sketch = (p: any) => {
        p.setup = () => {
          const setupFunc = new Function('p', `with(p) { ${preview.code.split('function setup() {')[1].split('}')[0]} }`);
          setupFunc(p);
        };
        p.draw = () => {
          if (preview.code.includes('function draw()')) {
             const drawContent = preview.code.split('function draw() {')[1].split('}')[0];
             const drawFunc = new Function('p', `with(p) { ${drawContent} }`);
             drawFunc(p);
          }
        };
      };
      
      // Since parsing the functions from raw text is complex, we use a simpler strategy:
      // Dynamically create a script that targets our div
      const p5Script = document.createElement('script');
      p5Script.text = `
        (function() {
          const container = document.getElementById('p5-live-container');
          new p5((p) => {
            ${preview.code.replace(/setup\s*\(\)/g, 'p.setup = () =>').replace(/draw\s*\(\)/g, 'p.draw = () =>').replace(/(\w+)\(/g, (m, name) => {
              const p5Funcs = ['createCanvas', 'background', 'fill', 'rect', 'circle', 'ellipse', 'stroke', 'noStroke'];
              return p5Funcs.includes(name) ? 'p.'+name+'(' : m;
            }).replace(/mouseX/g, 'p.mouseX').replace(/mouseY/g, 'p.mouseY')}
          }, container);
        })();
      `;
      outputRef.current.appendChild(p5Script);
    }
  }, [preview, moduleId]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Code Panel */}
      <div className="bg-[#f4f6f8] border border-[#d0d7de] rounded-[6px] flex flex-col overflow-hidden">
        <div className="bg-[#1f3a5f] text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider">
          Code Panel
        </div>
        <pre className="p-4 text-sm font-mono overflow-auto flex-grow bg-gray-50">
          <code>{preview.code}</code>
        </pre>
      </div>

      {/* Explanation Panel */}
      <div className="bg-white border border-[#d0d7de] rounded-[6px] flex flex-col overflow-hidden">
        <div className="bg-[#4f81bd] text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider">
          Explanation
        </div>
        <div className="p-6 text-[#1a1a1a] flex-grow">
          {preview.explanation}
        </div>
      </div>

      {/* Output Panel */}
      <div className="bg-white border border-[#d0d7de] rounded-[6px] flex flex-col overflow-hidden">
        <div className="bg-[#2e7d32] text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider">
          Output
        </div>
        <div ref={outputRef} className="p-4 flex-grow overflow-auto flex items-start justify-center">
          {/* Output renders here */}
        </div>
      </div>
    </div>
  );
};

export default LivePreviewStep;
