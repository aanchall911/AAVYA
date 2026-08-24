import React, { useState } from 'react';
import { MessageSquare, Send, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SmsChannel: React.FC = () => {
  const { updateCaseScore, triggerSosAlert, showToast, selectedCase } = useApp();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [replies, setReplies] = useState<Array<{ sender: 'server' | 'user'; text: string; time: string }>>([
    {
      sender: 'server',
      text: 'AAVYA: कृपया बताएं आप अभी कैसा महसूस कर रहे हैं?\n1. अच्छा  2. सामान्य  3. परेशान  4. बहुत परेशान\nउत्तर दें: 1 / 2 / 3 / 4',
      time: '11:35 AM'
    }
  ]);
  const [customReply, setCustomReply] = useState('');

  const handleSelectOption = (num: string, label: string) => {
    setSelectedOption(num);
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add user reply
    const newReplies = [
      ...replies,
      { sender: 'user' as const, text: `${num} (${label})`, time }
    ];
    setReplies(newReplies);

    // AI automated SMS Gateway response
    setTimeout(() => {
      let confirmation = '';
      let scoreDelta = 0;

      if (num === '1') {
        confirmation = 'AAVYA: धन्यवाद। आपकी स्थिति सुरक्षित दर्ज की गई है।';
        scoreDelta = -3;
      } else if (num === '2') {
        confirmation = 'AAVYA: धन्यवाद। अगला चेक-इन 48 घंटे में होगा।';
        scoreDelta = 0;
      } else if (num === '3') {
        confirmation = 'AAVYA: हमने आपकी परेशानी नोट की है। परामर्शदाता से 1 घंटे में संपर्क कराया जाएगा।';
        scoreDelta = 5;
      } else if (num === '4') {
        confirmation = 'AAVYA: आपातकालीन सूचना दर्ज। नोडल अधिकारी एवं सुरक्षा दल को अलर्ट भेजा गया है।';
        scoreDelta = 9;
        triggerSosAlert(selectedCase.id, 'SMS Gateway: Victim responded Option 4 (बहुत परेशान)');
      }

      setReplies((prev) => [
        ...prev,
        { sender: 'server', text: confirmation, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);

      updateCaseScore(selectedCase.id, scoreDelta, `SMS Check-in: Option ${num} selected`);
      showToast(`SMS response recorded: Option ${num}`);
    }, 700);
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customReply.trim()) return;
    const opt = customReply.trim();
    setCustomReply('');
    if (['1', '2', '3', '4'].includes(opt)) {
      handleSelectOption(opt, opt === '1' ? 'अच्छा' : opt === '2' ? 'सामान्य' : opt === '3' ? 'परेशान' : 'बहुत परेशान');
    } else {
      setReplies((prev) => [
        ...prev,
        { sender: 'user', text: opt, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
        { sender: 'server', text: 'AAVYA: आपका संदेश प्राप्त हुआ। नोडल टीम समीक्षा कर रही है।', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
      updateCaseScore(selectedCase.id, 4, `SMS Text: "${opt}"`);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-3.5 flex flex-col justify-between h-[210px]">
      
      {/* SMS Header & Body */}
      <div className="space-y-2 overflow-y-auto pr-1 text-xs">
        {replies.map((r, i) => (
          <div
            key={i}
            className={`flex flex-col ${r.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`p-2.5 rounded-xl max-w-[95%] text-xs leading-relaxed whitespace-pre-wrap ${
                r.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-xs'
                  : 'bg-slate-100 text-slate-800 border border-slate-200 font-sans'
              }`}
            >
              <p>{r.text}</p>
              <div
                className={`text-[9px] mt-1 text-right ${
                  r.sender === 'user' ? 'text-blue-100' : 'text-slate-400'
                }`}
              >
                {r.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Option Buttons & Simulator */}
      <div className="pt-2 border-t border-slate-100">
        <div className="grid grid-cols-4 gap-1.5 mb-1.5">
          {[
            { num: '1', label: 'अच्छा', color: 'hover:bg-emerald-50 hover:border-emerald-400 text-emerald-700' },
            { num: '2', label: 'सामान्य', color: 'hover:bg-blue-50 hover:border-blue-400 text-blue-700' },
            { num: '3', label: 'परेशान', color: 'hover:bg-amber-50 hover:border-amber-400 text-amber-700' },
            { num: '4', label: 'बहुत परेशान', color: 'hover:bg-rose-50 hover:border-rose-400 text-rose-700 font-bold' }
          ].map((item) => (
            <button
              key={item.num}
              onClick={() => handleSelectOption(item.num, item.label)}
              className={`py-1 px-1 text-center bg-white border border-slate-200 rounded-lg text-[11px] font-medium transition active:scale-95 ${item.color}`}
            >
              <span className="block font-bold">{item.num}</span>
              <span className="text-[9px] truncate block">{item.label}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSendCustom} className="flex items-center gap-1.5">
          <input
            type="text"
            value={customReply}
            onChange={(e) => setCustomReply(e.target.value)}
            placeholder="उत्तर दें: 1, 2, 3, 4..."
            className="flex-1 px-2.5 py-1 text-[11px] bg-slate-50 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!customReply.trim()}
            className="px-2 py-1 bg-slate-800 hover:bg-slate-900 disabled:opacity-40 text-white rounded-md text-[11px] font-medium transition"
          >
            <Send className="w-3 h-3" />
          </button>
        </form>
      </div>

    </div>
  );
};
