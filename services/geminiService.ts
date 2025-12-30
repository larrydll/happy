
import { GoogleGenAI } from "@google/genai";
import { DimensionScore } from "../types";

export const getCoachingAdvice = async (scores: DimensionScore[]): Promise<string> => {
  // Use the API key directly from process.env as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Find the lowest scoring dimension to focus the coaching advice
  const sorted = [...scores].sort((a, b) => a.value - b.value);
  const weakest = sorted[0];
  
  const prompt = `
    作为一位专业的积极心理学教练，请根据以下测评数据提供启发式的建议。
    用户维度得分（1-6分）：
    ${scores.map(s => `${s.name}: ${s.value.toFixed(1)}`).join('\n')}
    
    最弱项是：${weakest.name}。
    
    要求：
    1. 语气：温和、启发式、非批判性。
    2. 结构：先肯定整体积极的一面，再针对最弱项提供一个具体的、可实操的“5分钟微习惯”。
    3. 字数：控制在200-300字之间。
    4. 语言：简体中文。
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });

    return response.text || "暂时无法获取建议，请保持积极心态。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "心语微澜，智慧正在赶来的路上。请稍后再试。";
  }
};
