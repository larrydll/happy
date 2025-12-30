
import React, { useEffect, useState, Suspense } from 'react';
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
  const [hasChartError, setHasChartError] = useState(false);

  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        const msg = await getCoachingAdvice(result.dimensions);
        setAdvice(msg);
      } catch (e) {
        setAdvice('抱歉，获取建议时遇到了小问题，请稍后再试。');
      } finally {
        setLoadingAdvice(false);
      }
    };
    fetchAdvice();
  }, [result.dimensions]);

  const scoreDescription = () => {
    const avg = result.averageScore;
    if (avg > 5) return { label: '非常幸福', color: 'text-green-600' };
    if (avg > 4) return { label: '相当幸福', color: 'text-green-500' };
    if (avg > 3) return { label: '中等幸福', color: 'text-blue-500' };
    return { label: '面临压力', color: 'text-gray-500' };
  };

  const status = scoreDescription();

  return (
    <div className="space-y-8 fade-in flex flex-col items-center w-full">
      <div className="text-center">
        <h2 className="text-sm text-gray-400 mb-1">你的幸福指数</h2>
        <div className={`text-5xl font-bold mb-2 ${status.color}`}>
          {result.averageScore.toFixed(2)}
        </div>
        <div className="px-4 py-1 rounded-full bg-gray-100 text-xs text-gray-500 inline-block">
          {status.label} (1-6 量表)
        </div>
      </div>

      <div className="w-full h-72 md:h-80 -my-4 flex items-center justify-center">
        {!hasChartError ? (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart 
              cx="50%" 
              cy="50%" 
              outerRadius="70%" 
              data={result.dimensions}
              onError={() => setHasChartError(true)}
            >
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
        ) : (
          <div className="text-xs text-gray-300 border border-dashed rounded-xl p-8 text-center">
            图表组件受限，请参考以下数值：<br/>
            {result.dimensions.map(d => `${d.name}: ${d.value}`).join(' | ')}
          </div>
        )}
      </div>

      <div className="w-full space-y-4 px-2">
        <h3 className="text-md font-medium text-gray-800 flex items-center gap-2">
          <span className="text-green-400">✦</span>
          幸福教练建议
        </h3>
        <div className={`p-5 rounded-2xl bg-gray-50 border border-gray-100 text-sm leading-relaxed text-gray-700 relative min-h-[120px]
          ${loadingAdvice ? 'animate-pulse' : ''}`}>
          {loadingAdvice && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-2xl">
              <div className="w-5 h-5 border-2 border-green-300 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <p className="whitespace-pre-wrap">{advice}</p>
        </div>
      </div>

      <div className="w-full flex gap-3 pt-4 px-2">
        <button
          onClick={() => window.print()}
          className="flex-1 py-3.5 rounded-xl bg-gray-100 text-gray-600 font-medium text-sm"
        >
          保存结果
        </button>
        <button
          onClick={onRestart}
          className="flex-1 py-3.5 rounded-xl bg-green-200 text-green-800 font-bold text-sm shadow-sm"
        >
          重新测试
        </button>
      </div>
    </div>
  );
};

export default ResultView;
