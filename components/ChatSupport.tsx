"use client";

import React, { useState } from "react";
import { MessageCircle } from "lucide-react";

const ChatSupport: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Hello! 👋 How can we help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: { role: "user"; text: string } = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_POLLINATIONS_API}/${encodeURIComponent(input)}`
      );
      const text = await res.text();

      const botMessage: { role: "bot"; text: string } = { role: "bot", text };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-50"
        aria-label="Career Advisory"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-[28rem] bg-white dark:bg-[#0f172a] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 z-40 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 font-semibold flex justify-between items-center shadow-md">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-medium">Support Chat</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-indigo-500 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gradient-to-b from-white to-gray-50 dark:from-[#0f172a] dark:to-[#1e293b]">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={
                  msg.role === "user"
                    ? "flex justify-end"
                    : "flex items-start"
                }
              >
                {msg.role === "bot" && (
                  <div className="bg-gray-200 dark:bg-slate-700 rounded-full p-2 mr-2">
                    <MessageCircle className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  </div>
                )}
                <div
                  className={`px-4 py-3 rounded-2xl max-w-[75%] ${
                    msg.role === "user"
                      ? "bg-indigo-500 text-white rounded-tr-none"
                      : "bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-tl-none"
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-xs text-gray-400 dark:text-gray-500">
                Typing...
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 px-4 py-3 bg-gray-100 dark:bg-slate-800 border-0 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatSupport;
