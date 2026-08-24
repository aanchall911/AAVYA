import React, { useState } from 'react';
import { X, Activity, Check, Heart, Shield, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SelfAssessmentModal: React.FC = () => {
  const { isSelfAssessmentOpen, setIsSelfAssessmentOpen, updateCaseScore, showToast, selectedCase, language } = useApp();

  const questions = [
    {
      id: 1,
      q_hi: 'क्या आप पिछले 24 घंटों में अपने घर या आस-पास सुरक्षित महसूस कर रहे हैं?',
      q_en: 'Have you felt safe at home or in your surroundings in the last 24 hours?',
      options: [
        { text_hi: 'हाँ, पूरी तरह सुरक्षित', text_en: 'Yes, completely safe', score: 0 },
        { text_hi: 'थोड़ा असुरक्षित', text_en: 'A little unsafe', score: 10 },
        { text_hi: 'काफी डर लग रहा है', text_en: 'Feeling quite fearful', score: 20 },
        { text_hi: 'अत्यधिक खतरा / धमकी मिली', text_en: 'Severe threat / intimidation', score: 30 }
      ]
    },
    {
      id: 2,
      q_hi: 'क्या आपको नींद आने में परेशानी या बुरे सपने आ रहे हैं?',
      q_en: 'Are you experiencing trouble sleeping or severe nightmares?',
      options: [
        { text_hi: 'नहीं, सामान्य नींद', text_en: 'No, normal sleep', score: 0 },
        { text_hi: 'हल्की परेशानी', text_en: 'Mild disturbance', score: 5 },
        { text_hi: 'रातभर बेचैनी / नींद नहीं आती', text_en: 'Severe insomnia / restlessness', score: 15 }
      ]
    },
    {
      id: 3,
      q_hi: 'क्या आपको आगामी कोर्ट सुनवाई या गवाही को लेकर अत्यधिक तनाव है?',
      q_en: 'Are you feeling overwhelming anxiety regarding upcoming court proceedings or testimony?',
      options: [
        { text_hi: 'नहीं / अभी कोई सुनवाई नहीं', text_en: 'No / no upcoming date', score: 0 },
        { text_hi: 'हाँ, थोड़ा तनाव है', text_en: 'Yes, moderate stress', score: 10 },
        { text_hi: 'हाँ, बहुत अधिक घबराहट और दबाव है', text_en: 'Yes, extreme pressure and panic', score: 25 }
      ]
    }
  ];

  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [submitted, setSubmitted] = useState(false);

  if (!isSelfAssessmentOpen) return null;

  const handleSelect = (qId: number, score: number) => {
    setAnswers({ ...answers, [qId]: score });
  };

  const calculateTotalDistress = () => {
    let base = 30;
    Object.values(answers).forEach((val) => { 
      base += Number(val) || 0; 
    });
    return Math.min(100, Math.max(10, base));
  };

  const handleSubmit = () => {
    const calculated = calculateTotalDistress();
    const diff = calculated - selectedCase.currentDistressScore;
    updateCaseScore(selectedCase.id, diff, 'Victim completed mobile self-assessment questionnaire');
    setSubmitted(true);
    showToast('Self-assessment recorded. Distress index recalculated.');
    setTimeout(() => {
      setSubmitted(false);
      setIsSelfAssessmentOpen(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-emerald-700 px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm">
                {language === 'hi' ? 'अपनी स्थिति बताएं (स्व-मूल्यांकन)' : 'Distress & Safety Self-Assessment'}
              </h3>
              <p className="text-[11px] text-emerald-200">
                {language === 'hi' ? 'गोपनीय एवं सुरक्षित जांच' : 'Confidential & Secure Evaluation'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSelfAssessmentOpen(false)}
            className="p-1 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs max-h-[75vh] overflow-y-auto">
          {submitted ? (
            <div className="py-8 text-center space-y-2">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-slate-800">
                {language === 'hi' ? 'आपका मूल्यांकन दर्ज कर लिया गया है' : 'Assessment Recorded Successfully'}
              </h4>
              <p className="text-slate-500">
                {language === 'hi' ? 'आव्या (AAVYA) एआई आपके स्वास्थ्य और सुरक्षा पर निरंतर नजर रख रहा है।' : 'AAVYA AI is continuously monitoring your safety and well-being.'}
              </p>
            </div>
          ) : (
            <>
              {questions.map((q, idx) => (
                <div key={q.id} className="space-y-2 pb-3 border-b border-slate-100 last:border-0">
                  <span className="font-bold text-slate-800 block text-xs">
                    {idx + 1}. {language === 'hi' ? q.q_hi : q.q_en}
                  </span>

                  <div className="space-y-1.5">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = answers[q.id] === opt.score;
                      return (
                        <div
                          key={oIdx}
                          onClick={() => handleSelect(q.id, opt.score)}
                          className={`p-2.5 rounded-lg border flex items-center justify-between cursor-pointer transition ${
                            isSelected
                              ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500 font-semibold text-emerald-950'
                              : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                          }`}
                        >
                          <span>{language === 'hi' ? opt.text_hi : opt.text_en}</span>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300'}`}>
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer */}
        {!submitted && (
          <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex items-center justify-end gap-2.5">
            <button
              onClick={() => setIsSelfAssessmentOpen(false)}
              className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 font-semibold text-xs transition"
            >
              {language === 'hi' ? 'रद्द करें' : 'Cancel'}
            </button>
            <button
              onClick={handleSubmit}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs shadow-md transition flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>{language === 'hi' ? 'जमा करें और स्कोर अपडेट करें' : 'Submit & Recalculate'}</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
