
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

const DoubtClarifier: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: "Hi! I’m your Doubt Clarifier. How can I help?" }
  ]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim() || loading) return;
    
    const userMessage = question.trim();
    setQuestion('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
      const prompt = `You are a professional Grade 8 ICT teacher. 
The student is asking about the Grade 8 ICT syllabus.
Syllabus Modules:
1. HTML/CSS: div, class, flexbox, forms, inputs, images, links, CSS types.
2. Python: variables (str, int, float), math operators, if/elif/else logic.
3. JavaScript/p5.js: setup(), draw(), mouseX, mouseY, arrays, DOM manipulation.

Student's question: "${userMessage}"

Instructions:
1. Answer in 5-20 lines.
2. Explain WHY and HOW using Grade 8 appropriate concepts.
3. Use a teacher-like, calm, professional tone.
4. If the question is unclear, rephrase it using one of the syllabus concepts.
5. Do not refuse to answer.
6. Try explaining in points`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });

      const answer = response.text || "I'm sorry, I couldn't process that. Try asking in simpler terms.";
      setMessages(prev => [...prev, { role: 'assistant', text: answer }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', text: "An error occurred while contacting the teacher assistant. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-[#1f3a5f] text-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] flex items-center justify-center hover:bg-[#162a45] transition-all"
          title="Doubt Clarifier"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="bg-white border border-[#d0d7de] rounded-[6px] shadow-[0_4px_20px_rgba(0,0,0,0.15)] w-[320px] h-[450px] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[#1f3a5f] text-white px-4 py-3 flex justify-between items-center">
            <span className="font-semibold text-sm uppercase tracking-wider">Doubt Clarifier</span>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white opacity-80 hover:opacity-100 transition-opacity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-grow p-4 overflow-y-auto bg-gray-50 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-3 rounded text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-[#4f81bd] text-white' 
                      : 'bg-white border border-[#d0d7de] text-[#1a1a1a]'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-[#d0d7de] p-3 rounded text-sm text-[#4f81bd] italic">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-[#d0d7de] bg-white flex gap-2">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
              placeholder="Type your message..."
              className="flex-grow text-sm border border-[#d0d7de] rounded px-3 py-2 focus:ring-1 focus:ring-[#1f3a5f] focus:outline-none"
            />
            <button
              onClick={handleAsk}
              disabled={loading || !question.trim()}
              className="bg-[#1f3a5f] text-white p-2 rounded hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoubtClarifier;
