import { GoogleGenerativeAI } from "@google/generative-ai";

export interface AIMessage {
  role: "user" | "assistant";
  content: string;
  thinking?: string;
}

export class GeminiService {
  private aiClient: GoogleGenerativeAI | null = null;
  private activeModel: any = null;

  constructor(apiKey?: string) {
    if (!apiKey) return;
    
    this.aiClient = new GoogleGenerativeAI(apiKey);
    this.activeModel = this.aiClient.getGenerativeModel({ model: "gemini-pro" });
  }

  async streamResponse(
    userQuery: string,
    dataContext: {
      totalRecords: number;
      filteredRecords: number;
      filters: {
        search?: string;
        state?: string;
        year?: string;
      };
      department: string;
    },
    onChunk: (chunk: string) => void,
    onThinking: (thinking: string) => void
  ): Promise<void> {
    if (!this.activeModel) {
      throw new Error("Gemini API key not configured");
    }

    onThinking("Analyzing your data and filters...");

    // Build the prompt with context
    const fullPrompt = `
You are analyzing a dataset. Here's what you're working with:

Department: ${dataContext.department}
Total Records: ${dataContext.totalRecords.toLocaleString()}
Currently Filtered: ${dataContext.filteredRecords.toLocaleString()}

Active Filters:
${dataContext.filters.search ? `- Search term: "${dataContext.filters.search}"` : ""}
${dataContext.filters.state && dataContext.filters.state !== "all" ? `- State: ${dataContext.filters.state}` : ""}
${dataContext.filters.year && dataContext.filters.year !== "all" ? `- Year: ${dataContext.filters.year}` : ""}

Question: ${userQuery}

Please provide a concise answer based on this context.
`;

    try {
      const streamResult = await this.activeModel.generateContentStream(fullPrompt);

      for await (const part of streamResult.stream) {
        const text = part.text();
        onChunk(text);
      }
    } catch (err) {
      console.error("Gemini API error:", err);
      throw err;
    }
  }

  async generateInsight(
    dataContext: {
      totalRecords: number;
      filteredRecords: number;
      department: string;
    }
  ): Promise<string> {
    if (!this.activeModel) {
      return "Configure Gemini API key to enable AI insights.";
    }

    const insightPrompt = `
Give me one interesting insight about this dataset:
- Department: ${dataContext.department}
- Total Records: ${dataContext.totalRecords.toLocaleString()}
- Currently Viewing: ${dataContext.filteredRecords.toLocaleString()} records

Keep it brief - 2-3 sentences max.
`;

    try {
      const response = await this.activeModel.generateContent(insightPrompt);
      const result = await response.response;
      return result.text();
    } catch (err) {
      console.error("Error generating insight:", err);
      return "Unable to generate insight at this time.";
    }
  }
}

let serviceInstance: GeminiService | null = null;

export function getGeminiService(): GeminiService {
  if (!serviceInstance) {
    const key = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    serviceInstance = new GeminiService(key);
  }
  return serviceInstance;
}
