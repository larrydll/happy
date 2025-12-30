
import React, { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { AssessmentResult } from '../types';
import { getCoachingAdvice } from '../services/geminiService';
import { COLORS } from '../constants';

interface ResultViewProps {
  result: AssessmentResult;
  onRestart: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ result, onRestart }) => {
  const [advice, setAdvice] = useState<string>('教练正在整理思绪，请稍候...');
  const [loadingAdvice, setLoadingAdvice] = useState(true);

  useEffect(() => {
    const fetchAdvice = async () => {
      const msg = await getCoachingAdvice(result.dimensions);
      setAdvice(msg);
      setLoadingAdvice(false);
    };
    fetchAdvice();
  }, [result.dimensions]);

  const scoreDescription = () => {
    const avg = result.averageScore;
    if (avg > 5) return { label: '非常幸福', color: 'text-green-600' };
    if (avg > 4) return { label: '相当幸福', color: 'text-soft-green' };
    if (avg > 3) return { label: '中等幸福', color: 'text-blue-500' };
    return { label: '面临压力', color: 'text-gray-500' };
  };

  const status = scoreDescription();

  return (
    <div className="space-y-8 fade-in flex flex-col items-center">
      <div className="text-center">
        <h2 className="text-lg text-gray-400 mb-1">你的幸福指数</h2>
        <div className={`text-5xl font-bold mb-2 ${status.color}`}>
          {result.averageScore.toFixed(2)}
        </div>
        <div className="px-4 py-1 rounded-full bg-gray-100 text-xs text-gray-500 inline-block">
          {status.label} (1-6 量表)
        </div>
      </div>

      <div className="w-full h-72 md:h-80 -my-4">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={result.dimensions}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 6]} tick={false} axisLine={false} />
            <Radar
              name="幸福维度"
              dataKey="value"
              stroke={COLORS.primary}
              fill={COLORS.primary}
              fillOpacity={0.4}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full space-y-4">
        <h3 className="text-md font-medium text-gray-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-soft-green" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.435 15.561a1 1 0 101.414-1.414l-.707-.707a1 1 0 10-1.414 1.414l.707.707zM15.561 13.435a1 1 0 10-1.414-1.414l-.707.707a1 1 0 101.414 1.414l.707-.707z" />
          </svg>
          幸福教练的建议
        </h3>
        <div className={`p-6 rounded-3xl bg-gray-50 border border-gray-100 text-sm leading-relaxed text-gray-700 relative
          ${loadingAdvice ? 'animate-pulse' : ''}`}>
          {loadingAdvice && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-3xl">
              <div className="w-6 h-6 border-2 border-soft-green border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <p className="whitespace-pre-wrap">{advice}</p>
        </div>
      </div>

      <div className="w-full flex gap-3 pt-4">
        <button
          onClick={() => window.print()}
          className="flex-1 py-4 rounded-2xl bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 transition-all text-sm"
        >
          保存结果
        </button>
        <button
          onClick={onRestart}
          className="flex-1 py-4 rounded-2xl bg-soft-green text-white font-bold hover:shadow-lg transition-all text-sm"
        >
          重新测试
        </button>
      </div>
    </div>
  );
};

export default ResultView;
