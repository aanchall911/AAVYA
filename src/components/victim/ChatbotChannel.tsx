import React, { useState } from 'react';
import { Send, ArrowLeft, MoreVertical, RotateCcw, CheckCheck, ShieldCheck, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ChatbotChannel: React.FC = () => {
  const { chatMessages, sendChatMessage, resetChat, language } = useApp();
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(inputText.trim());
    setInputText('');
  };

  const handleChipClick = (option: string) => {
    sendChatMessage(option);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col h-[390px]">
      
      {/* Bot App Header */}
      <div className="bg-slate-900 px-3.5 py-2.5 flex items-center justify-between text-white border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-xs shrink-0 border border-blue-500">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="leading-tight">
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>AAVYA Sahayak</span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-blue-900/80 text-blue-200 border border-blue-700 font-medium">14566</span>
            </div>
            <div className="text-[10px] text-slate-400 font-medium">Confidential Victim Support Line</div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button 
            onClick={resetChat} 
            title="Reset Session" 
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 p-3 overflow-y-auto bg-slate-50 space-y-2.5 text-xs">
        
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-end gap-1.5 max-w-[90%]">
              {msg.sender === 'bot' && (
                <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                  A
                </div>
              )}
              
              <div
                className={`p-2.5 rounded-xl ${
                  msg.sender === 'user'
                    ? 'bg-blue-800 text-white rounded-br-xs shadow-2xs'
                    : 'bg-white text-slate-900 border border-slate-200 rounded-bl-xs shadow-2xs'
                }`}
              >
                <p className="leading-relaxed whitespace-pre-wrap text-xs">{msg.text}</p>
                <div
                  className={`text-[9px] mt-1 flex items-center justify-end gap-1 ${
                    msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                  }`}
                >
                  <span>{msg.time}</span>
                  {msg.sender === 'user' && <CheckCheck className="w-3 h-3 text-cyan-200" />}
                </div>
              </div>
            </div>

            {/* Quick Option Chips if attached */}
            {msg.sender === 'bot' && msg.options && (
              <div className="flex flex-wrap gap-1.5 mt-1.5 ml-7 max-w-[92%]">
                {msg.options.map((option, optIdx) => (
                  <button
                    key={optIdx}
                    onClick={() => handleChipClick(option)}
                    className="px-2.5 py-1 text-[11px] font-medium bg-white text-slate-800 border border-slate-300 rounded-lg hover:bg-slate-100 hover:border-slate-400 transition shadow-2xs active:scale-95"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Quick fallback chips */}
        {chatMessages.length <= 3 && (
          <div className="flex flex-wrap gap-1.5 pt-1 ml-7">
            {['हाँ, मैं सुरक्षित हूँ', 'मुझे सहायता चाहिए', 'परामर्शदाता से बात कराएं'].map((opt) => (
              <button
                key={opt}
                onClick={() => handleChipClick(opt)}
                className="px-2.5 py-1 text-[11px] font-medium bg-white text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition shadow-2xs active:scale-95"
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Chat Input Bar */}
      <form onSubmit={handleSubmit} className="p-2 bg-white border-t border-slate-200 flex items-center gap-1.5">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={language === 'hi' ? 'संदेश लिखें (उदा. मुझे मदद चाहिए)...' : 'Type your message (e.g. I need help)...'}
          className="flex-1 px-3 py-1.5 text-xs bg-slate-100 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-700 focus:bg-white transition text-slate-900"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="w-8 h-8 bg-blue-800 hover:bg-blue-900 disabled:opacity-40 text-white rounded-lg flex items-center justify-center shrink-0 transition shadow-2xs cursor-pointer"
        >
          <Send className="w-3.5 h-3.5 ml-0.5" />
        </button>
      </form>
    </div>
  );
};
