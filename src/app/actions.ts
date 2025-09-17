
"use server";

import { answerFinancialQuestions } from "@/ai/flows/answer-financial-questions";
import type { AnalyzeFinancialReportOutput } from "@/ai/flows/analyze-financial-report";
import { z } from "zod";


const chatSchema = z.object({
  question: z.string(),
  analysisData: z.any().optional(),
});

export async function handleChatSubmit(question: string, analysisData: AnalyzeFinancialReportOutput | null) {
    const validatedFields = chatSchema.safeParse({ question, analysisData });

    if (!validatedFields.success) {
        return { error: 'Invalid input format.' };
    }

    if (!analysisData) {
        return { error: 'Please analyze a report first to use the chatbot.' };
    }
    
    // Convert the analysis data into a string format for the AI prompt
    const financialContext = `
        Summary: ${analysisData.summary.summary}
        Key Metrics: ${analysisData.keyMetrics.map(m => `${m.name}: ${m.value}`).join(', ')}
        Forecasts: ${analysisData.predictions.forecasts.map(f => `${f.metric}: ${f.value} (${f.commentary})`).join(', ')}
        Risks: ${analysisData.riskAssessment.risks.join(', ')}
    `;

    try {
        const result = await answerFinancialQuestions({
            question: validatedFields.data.question,
            financialReport: financialContext,
        });
        return result;
    } catch (error) {
        console.error("Error calling AI flow:", error);
        return { error: 'Failed to get an answer from the AI assistant.' };
    }
}
