
import React, { useState, useEffect } from 'react';
import { QUESTIONS, OPTION_LABELS, DIMENSION_LABELS } from '../constants';
import { Score, AssessmentResult, DimensionScore } from '../types';

interface AssessmentProps {
  onComplete: (result: AssessmentResult) => void;
}

const Assessment: React.FC<AssessmentProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Score>>({});
  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;

  const handleSelect = (score: Score) => {
    const newAnswers = { ...answers, [QUESTIONS[currentIndex].id]: score };
    setAnswers(newAnswers);

    if (currentIndex < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 300);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<number, Score>) => {
    let total = 0;
    const dimensionTotals: Record<string, number[]> = {
      satisfaction: [],
      esteem: [],
      resilience: [],
      optimism: [],
      control: []
    };

    QUESTIONS.forEach((q) => {
      let score = finalAnswers[q.id];
      if (q.reverse) {
        score = (7 - score) as Score;
      }
      total += score;
      dimensionTotals[q.dimension].push(score);
    });

    const dimensions: DimensionScore[] = Object.entries(dimensionTotals).map(([key, scores]) => {
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      return {
        name: DIMENSION_LABELS[key as keyof typeof DIMENSION_LABELS],
        value: Number(avg.toFixed(2)),
        fullMark: 6
      };
    });

    onComplete({
      totalScore: total,
      averageScore: total / QUESTIONS.length,
      dimensions
    });
  };

  const currentQuestion = QUESTIONS[currentIndex];

  return (
    <div className="flex flex-col h-full fade-in">
      <div className="mb-8">
        <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
          <span>题目 {currentIndex + 1} / {QUESTIONS.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-soft-green transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex-grow flex flex-col justify-center">
        <div key={currentIndex} className="fade-in space-y-8">
          <h2 className="text-xl md:text-2xl font-medium text-gray-800 leading-tight text-center min-h-[4em] flex items-center justify-center">
            {currentQuestion.text}
          </h2>

          <div className="grid grid-cols-1 gap-3">
            {[1, 2, 3, 4, 5, 6].map((val) => (
              <button
                key={val}
                onClick={() => handleSelect(val as Score)}
                className={`w-full py-4 px-6 rounded-2xl border transition-all text-left flex justify-between items-center
                  ${answers[currentQuestion.id] === val 
                    ? 'border-soft-green bg-soft-green/5 text-soft-green font-medium' 
                    : 'border-gray-200 text-gray-600 hover:border-soft-green'}`}
              >
                <span>{OPTION_LABELS[val]}</span>
                {answers[currentQuestion.id] === val && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center">
        <button
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex(currentIndex - 1)}
          className={`text-sm ${currentIndex === 0 ? 'text-gray-200 cursor-not-allowed' : 'text-gray-400 hover:text-gray-600'}`}
        >
          上一题
        </button>
      </div>
    </div>
  );
};

export default Assessment;
