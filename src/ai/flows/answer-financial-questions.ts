'use server';

/**
 * @fileOverview Answers financial questions using an AI chatbot.
 *
 * - answerFinancialQuestions - A function that answers user questions about financial data.
 * - AnswerFinancialQuestionsInput - The input type for the answerFinancialQuestions function.
 * - AnswerFinancialQuestionsOutput - The return type for the answerFinancialQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerFinancialQuestionsInputSchema = z.object({
  question: z.string().describe('The question to ask about the financial data.'),
  financialReport: z.string().describe('The financial report to use as context.'),
});
export type AnswerFinancialQuestionsInput = z.infer<typeof AnswerFinancialQuestionsInputSchema>;

const AnswerFinancialQuestionsOutputSchema = z.object({
  answer: z.string().describe('The answer to the question about the financial data.'),
});
export type AnswerFinancialQuestionsOutput = z.infer<typeof AnswerFinancialQuestionsOutputSchema>;

export async function answerFinancialQuestions(
  input: AnswerFinancialQuestionsInput
): Promise<AnswerFinancialQuestionsOutput> {
  return answerFinancialQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerFinancialQuestionsPrompt',
  input: {schema: AnswerFinancialQuestionsInputSchema},
  output: {schema: AnswerFinancialQuestionsOutputSchema},
  prompt: `You are an AI-powered CFO assistant. Use the provided financial report to answer the user's question.

Financial Report:
{{{financialReport}}}

Question:
{{{question}}}

Answer:`,
});

const answerFinancialQuestionsFlow = ai.defineFlow(
  {
    name: 'answerFinancialQuestionsFlow',
    inputSchema: AnswerFinancialQuestionsInputSchema,
    outputSchema: AnswerFinancialQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
