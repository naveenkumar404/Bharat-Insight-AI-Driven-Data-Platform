"use client";

import { useState } from "react";
import { getGeminiService } from "@/lib/geminiService";
import { useDataStore } from "@/store/useDataStore";
import { useOrgStore } from "@/store/useOrgStore";

interface Message {
  role: "user" | "assistant";
  content: string;
  thinking?: string;
}

export function AIInsightPanel() {
  const [panelOpen, setPanelOpen] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [thinking, setThinking] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I can help analyze your data. Ask me questions about the current dataset and filters.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const { getTotalCount, getFilteredCount, getCurrentFilters } = useDataStore();
  const { department } = useOrgStore();

  const handleSendMessage = async () => {
    if (!inputValue.trim() || processing) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setProcessing(true);
    setThinking("");

    try {
      const gemini = getGeminiService();
      let assistantMessage = "";

      await gemini.streamResponse(
        userMessage,
        {
          totalRecords: getTotalCount(),
          filteredRecords: getFilteredCount(),
          filters: getCurrentFilters(),
          department: department,
        },
        (chunk) => {
          assistantMessage += chunk;
          setMessages((prev) => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            
            if (lastMessage?.role === "assistant" && !lastMessage.thinking) {
              lastMessage.content = assistantMessage;
            } else {
              newMessages.push({ role: "assistant", content: assistantMessage });
            }
            
            return newMessages;
          });
        },
        (thinkingText) => {
          setThinking(thinkingText);
        }
      );
    } catch (error) {
      console.error("AI Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I apologize, but I'm having trouble connecting to the AI service. Please make sure your Gemini API key is configured in the .env.local file.",
        },
      ]);
    } finally {
      setProcessing(false);
      setThinking("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      className={`border-l border-zinc-800/50 bg-zinc-950 transition-all duration-300 ${
        panelOpen ? "w-96" : "w-0"
      } overflow-hidden`}
    >
      <div className="w-96 h-full flex flex-col">
        <div className="p-4 border-b border-zinc-800/50 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <h2 className="font-semibold">AI Assistant</h2>
          </div>
          <button
            onClick={() => setPanelOpen(!panelOpen)}
            className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, idx) => (
            <div
              key={idx}
              className={`glass border border-zinc-800/50 rounded-lg p-4 ${
                message.role === "user" ? "bg-blue-500/5" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 ${
                    message.role === "assistant"
                      ? "bg-gradient-to-br from-blue-500 to-violet-500"
                      : "bg-zinc-700"
                  } rounded-lg flex items-center justify-center flex-shrink-0`}
                >
                  <span className="text-sm">
                    {message.role === "assistant" ? "🤖" : "👤"}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {thinking && (
            <div className="glass border border-zinc-800/50 rounded-lg p-4 bg-blue-500/5">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <div className="flex gap-1">
                  <div
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
                <span>{thinking}</span>
              </div>
            </div>
          )}

          {processing && !thinking && (
            <div className="glass border border-zinc-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <div className="flex gap-1">
                  <div
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
                <span>Processing...</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-zinc-800/50">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ask about your data..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={processing}
              className="flex-1 px-4 py-2 bg-zinc-900/50 border border-zinc-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
            />
            <button
              onClick={handleSendMessage}
              disabled={processing || !inputValue.trim()}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
          <p className="text-xs text-zinc-600 mt-2">
            Powered by Google Gemini • Press Enter to send
          </p>
        </div>
      </div>
    </div>
  );
}
