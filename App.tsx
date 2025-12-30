
import React, { useState } from 'react';
import Assessment from './components/Assessment';
import ResultView from './components/ResultView';
import { AssessmentResult } from './types';
import { COLORS } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<'welcome' | 'assessment' | 'result'>('welcome');
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const startAssessment = () => setView('assessment');

  const handleAssessmentComplete = (data: AssessmentResult) => {
    setResult(data);
    setView('result');
  };

  const restart = () => {
    setResult(null);
    setView('welcome');
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
      <header className="w-full text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
          幸福教练 <span className="text-soft-green font-light italic">Coach</span>
        </h1>
        <p className="text-sm text-gray-500">探索内心的喜悦，提升心理韧性</p>
      </header>

      <main className="w-full bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 min-h-[500px] flex flex-col transition-all duration-300">
        {view === 'welcome' && (
          <div className="flex flex-col items-center justify-center space-y-8 flex-grow fade-in text-center">
            <div className="w-48 h-48 bg-serene-blue rounded-full flex items-center justify-center overflow-hidden">
               <img src="https://picsum.photos/seed/happiness/400/400" alt="Joy" className="opacity-80" />
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-gray-800">开始你的幸福之旅</h2>
              <p className="text-gray-600 leading-relaxed">
                本测评基于国际公认的牛津幸福感问卷 (OHQ)。<br/>
                只需花费约 5 分钟，我们将为你绘制“幸福雷达图”，<br/>
                并提供由 AI 幸福教练定制的成长建议。
              </p>
            </div>
            <button
              onClick={startAssessment}
              className="w-full py-4 rounded-2xl bg-soft-green text-white font-bold text-lg hover:shadow-lg active:scale-95 transition-all"
            >
              开始测评
            </button>
            <p className="text-xs text-gray-400 mt-4">
              🛡️ 数据已加密存储，仅供个人成长参考
            </p>
          </div>
        )}

        {view === 'assessment' && (
          <Assessment onComplete={handleAssessmentComplete} />
        )}

        {view === 'result' && result && (
          <ResultView result={result} onRestart={restart} />
        )}
      </main>

      <footer className="mt-auto py-6 text-xs text-gray-400">
        &copy; {new Date().getFullYear()} 幸福教练 - 积极心理学实践助手
      </footer>
    </div>
  );
};

export default App;
