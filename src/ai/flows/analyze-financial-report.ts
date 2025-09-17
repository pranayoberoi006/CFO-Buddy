
'use server';

/**
 * @fileOverview Analyzes a financial report to generate a summary, predict future metrics, and assess risk.
 *
 * - analyzeFinancialReport - A function that orchestrates the entire financial analysis.
 * - AnalyzeFinancialReportInput - The input type for the analyzeFinancialReport function.
 * - AnalyzeFinancialReportOutput - The return type for the analyzeFinancialReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import JSZip from 'jszip';

// Input Schema
const AnalyzeFinancialReportInputSchema = z.object({
  financialReportDataUri: z
    .string()
    .describe(
      "A financial report document as a data URI. It must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'. Can be a ZIP file."
    ),
   metrics: z
    .array(z.string())
    .describe('The specific financial metrics to forecast, e.g., revenue growth, profitability, liabilities, cash reserves, burn rate, runway.'),
  forecastHorizon: z
    .string()
    .describe('The time horizon for the forecast, e.g., 1 year, 5 years. Use a parsable string like "5 years"'),
});
export type AnalyzeFinancialReportInput = z.infer<typeof AnalyzeFinancialReportInputSchema>;


// Output Schema
const SummaryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the financial report, highlighting the most critical insights.'),
});

const KeyMetricSchema = z.object({
    name: z.string().describe("The name of the Key Performance Indicator (e.g., 'Gross Profit Margin')."),
    value: z.string().describe("The value of the KPI (e.g., '60%' or '$1.35M')."),
    change: z.string().optional().describe("The period-over-period change, if available (e.g., '+5.2%' or '-$50k').")
});

const TimeSeriesDataPointSchema = z.object({
    period: z.string().describe("The time period for the data point (e.g., 'Q1 2023', 'Jan', '2022')."),
    revenue: z.number().describe("The revenue for the period.").optional(),
    profit: z.number().describe("The net profit for the period.").optional(),
    cashFlow: z.number().describe("The cash flow for the period.").optional(),
    stockPrice: z.number().describe("The stock price for the period.").optional(),
});

const ChartDataSchema = z.object({
    pnl: z.array(TimeSeriesDataPointSchema).describe("An array of data points for the Profit & Loss chart, containing period, revenue, and profit."),
    cashFlow: z.array(TimeSeriesDataPointSchema).describe("An array of data points for the Cash Flow chart, containing period and cash flow values."),
    stockPrice: z.array(TimeSeriesDataPointSchema).describe("An array of data points for the Stock Price chart, containing period and stock price values."),
});

const ForecastSchema = z.object({
    metric: z.string().describe('The name of the financial metric being forecasted.'),
    value: z.string().describe('The forecasted value for the metric, as a string to accommodate various formats (e.g., "18 months", "20%", "$1.5M").'),
    commentary: z.string().describe('A brief commentary on the forecast.'),
});

const PredictionsOutputSchema = z.object({
  forecasts: z.array(ForecastSchema).describe('An array of financial metric forecasts.'),
});

const RiskAssessmentOutputSchema = z.object({
  risks: z.array(z.string()).describe('A list of potential financial risks identified from the report.'),
});

const AnalyzeFinancialReportOutputSchema = z.object({
    summary: SummaryOutputSchema,
    keyMetrics: z.array(KeyMetricSchema).describe("A list of the most important key financial metrics derived from the report."),
    chartData: ChartDataSchema.describe("Structured data points for generating interactive charts."),
    predictions: PredictionsOutputSchema,
    riskAssessment: RiskAssessmentOutputSchema,
});
export type AnalyzeFinancialReportOutput = z.infer<typeof AnalyzeFinancialReportOutputSchema>;


// Exported function to be called from the frontend
export async function analyzeFinancialReport(
  input: AnalyzeFinancialReportInput
): Promise<AnalyzeFinancialReportOutput> {
  return analyzeFinancialReportFlow(input);
}


// Main analysis prompt
const analysisPrompt = ai.definePrompt({
    name: 'financialAnalysisPrompt',
    input: { schema: z.object({
        reportContent: z.string().optional(),
        reportImage: z.string().optional(),
        metrics: z.array(z.string()),
        forecastHorizon: z.string(),
    }) },
    output: { schema: AnalyzeFinancialReportOutputSchema },
    model: 'googleai/gemini-1.5-flash',
    prompt: `You are an expert financial analyst. Based on the provided financial document(s), perform a comprehensive analysis.
    
    1.  **Summary**: Generate a concise summary of the key financial information.
    2.  **Key Metrics**: Extract the most important financial KPIs. Include the value and any period-over-period change if available.
    3.  **Chart Data**: Extract time-series data for P&L (revenue, profit), Cash Flow, and Stock Price. Provide at least 4-6 data points if possible to create meaningful charts. The period should be consistent (e.g., monthly or quarterly). If stock price is not available, generate realistic sample data for it based on the company's overall performance.
    4.  **Predictions**: Forecast future financial performance for the following metrics: {{#each metrics}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}} over a {{{forecastHorizon}}} horizon. Provide a forecasted value and a brief commentary for each.
    5.  **Risk Assessment**: Identify and list potential financial risks.


    {{#if reportContent}}
    Financial Document Content:
    {{{reportContent}}}
    {{else if reportImage}}
    Financial Document Image:
    {{media url=reportImage}}
    {{/if}}

    Return the entire analysis in a single JSON object with keys for summary, keyMetrics, chartData, predictions, and riskAssessment.`
});

// Define the text extractor prompt once, outside of the function.
const extractorPrompt = ai.definePrompt({
    name: 'extractTextFromDocument',
    input: {schema: z.object({dataUri: z.string()})},
    output: {schema: z.object({content: z.string()})},
    model: 'googleai/gemini-1.5-flash',
    prompt: `Extract all text content from the following document.
    Document: {{media url=dataUri}}`
});

// Helper function to extract text from various document types
async function extractTextContent(dataUri: string): Promise<string> {
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 1000; // 1 second

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const {output} = await extractorPrompt({ dataUri });
            if (output?.content) {
                return output.content;
            }
            // If the model runs successfully but returns no content, we still want to retry.
            if (attempt === MAX_RETRIES) {
                break; 
            }
        } catch (error: any) {
            if (error.message && error.message.includes('503 Service Unavailable') && attempt < MAX_RETRIES) {
                console.warn(`Attempt ${attempt} failed with 503 error. Retrying in ${RETRY_DELAY * attempt}ms...`);
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * attempt)); // Exponential backoff
                continue; // Continue to the next iteration to retry
            } else {
                 // For other errors or if we've exhausted retries, throw the error
                console.error(`Failed to extract text after ${attempt} attempts:`, error);
                throw new Error("An unexpected error occurred while processing the document.");
            }
        }
    }
    
    // This will be reached if all retries fail or if the model consistently returns empty content.
    return "";
}


// The Genkit Flow
const analyzeFinancialReportFlow = ai.defineFlow(
  {
    name: 'analyzeFinancialReportFlow',
    inputSchema: AnalyzeFinancialReportInputSchema,
    outputSchema: AnalyzeFinancialReportOutputSchema,
  },
  async ({ financialReportDataUri, metrics, forecastHorizon }) => {
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 1000; // 1 second
    const mimeType = financialReportDataUri.substring(financialReportDataUri.indexOf(':') + 1, financialReportDataUri.indexOf(';'));
    const base64Data = financialReportDataUri.substring(financialReportDataUri.indexOf(',') + 1);
    
    // If the file is an image, pass it directly to the multimodal prompt
    if (mimeType.startsWith('image/')) {
        for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            try {
                const {output} = await analysisPrompt({
                    reportImage: financialReportDataUri,
                    metrics,
                    forecastHorizon
                });
                if (output) {
                  return output;
                }
            } catch (error: any) {
                if (error.message && error.message.includes('503 Service Unavailable') && attempt < MAX_RETRIES) {
                    console.warn(`Analysis Attempt ${attempt} failed with 503 error. Retrying in ${RETRY_DELAY * attempt}ms...`);
                    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * attempt)); // Exponential backoff
                    continue;
                }
                console.error(`Failed analysis after ${attempt} attempts:`, error);
                throw new Error("The AI model is currently busy. Please try again in a few moments.");
            }
        }
        throw new Error("The AI model failed to produce a valid analysis from the image after multiple retries. Please try a different file.");
    }

    let reportContent = '';
    
    // If it's a ZIP file, extract text from all contained files
    if (mimeType === 'application/zip' || mimeType === 'application/x-zip-compressed') {
        try {
            const zip = await JSZip.loadAsync(base64Data, { base64: true });
            const textExtractionPromises: Promise<string>[] = [];
            
            zip.forEach((relativePath, file) => {
                // Ignore directories and macOS metadata files
                if (!file.dir && !relativePath.startsWith('__MACOSX/')) {
                    const promise = file.async('base64').then(content => {
                        // We need to determine the MIME type for the file inside the ZIP.
                        // A more robust solution might use a library, but for now we can infer from extension.
                        const extension = relativePath.split('.').pop()?.toLowerCase() || '';
                        let fileMimeType = 'application/octet-stream'; // Default
                        if (['pdf'].includes(extension)) fileMimeType = 'application/pdf';
                        if (['doc', 'docx'].includes(extension)) fileMimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
                        if (['jpg', 'jpeg'].includes(extension)) fileMimeType = 'image/jpeg';
                        if (['png'].includes(extension)) fileMimeType = 'image/png';
                        if (['txt'].includes(extension)) fileMimeType = 'text/plain';

                        // For text files, we can just decode them. For others, we need the AI extractor.
                        if (fileMimeType === 'text/plain') {
                            return Buffer.from(content, 'base64').toString('utf-8');
                        } else {
                            const dataUri = `data:${fileMimeType};base64,${content}`;
                            return extractTextContent(dataUri);
                        }
                    });
                    textExtractionPromises.push(promise);
                }
            });

            const fileContents = await Promise.all(textExtractionPromises);
            reportContent = fileContents.join('\n\n---\n\n');
        } catch (error) {
            console.error("Error processing ZIP file:", error);
            throw new Error("Failed to process the uploaded ZIP file. It might be corrupted or in an unsupported format.");
        }
    } else {
        // For other document types (PDF, DOCX, etc.), use an AI model to extract text
        reportContent = await extractTextContent(financialReportDataUri);
    }
    
    // If no content could be extracted, throw an error
    if (!reportContent.trim()) {
       throw new Error("Could not extract any text from the uploaded document(s). Please check the file format and content.");
    }
    
    // Perform the analysis using the extracted text content
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const {output} = await analysisPrompt({
                reportContent,
                metrics,
                forecastHorizon
            });
            if (output) {
                return output;
            }
        } catch (error: any) {
            if (error.message && error.message.includes('503 Service Unavailable') && attempt < MAX_RETRIES) {
                console.warn(`Analysis Attempt ${attempt} failed with 503 error. Retrying in ${RETRY_DELAY * attempt}ms...`);
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * attempt));
                continue;
            }
            console.error(`Failed analysis after ${attempt} attempts:`, error);
            throw new Error("The AI model is currently busy. Please try again in a few moments.");
        }
    }
    throw new Error("The AI model failed to produce a valid analysis from the document after multiple retries. Please try a different file.");
  }
);
