"use client";
import { useState } from "react";
import { ResumePreview } from "@/components/ResumePreview";
import { Sparkles, ArrowRight, Lightbulb, Zap, FileText, Download, Eye, Loader2 } from "lucide-react";

export default function AIPage() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  function cleanResponse(text: string) {
    // Remove everything before the first '---'
    const start = text.indexOf("---");
    const trimmedStart = start !== -1 ? text.slice(start) : text;
    // Remove trailing incomplete sentences
    const endTriggers = ["Would you like", "Let me know", "If you need"];
    const regex = new RegExp(`(${endTriggers.join("|")}).*`, "i");
    const trimmedEnd = trimmedStart.replace(regex, "").trim();
    return trimmedEnd;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResponse("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_POLLINATIONS_API}/${encodeURIComponent(prompt)}`);
      if (!res.ok) throw new Error(`API returned status ${res.status}`);
      const rawText = await res.text();
      const cleaned = cleanResponse(rawText);
      setResponse(cleaned);
    } catch {
      setResponse("Error fetching from Pollinations AI.");
    }
    finally {
      setLoading(false);
    }
  }

  const examplePrompts = [
    "Create a resume for a frontend developer with 3 years of React experience",
    "Generate a marketing manager resume with campaign experience",
    "Build a data scientist resume with Python and machine learning skills",
    "Create a UX designer resume with portfolio and design thinking experience"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-200 to-indigo-300 dark:from-blue-800 dark:to-indigo-900 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-purple-200 to-pink-300 dark:from-purple-800 dark:to-pink-900 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold py-2 px-6 rounded-full mb-4 shadow-lg">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Resume Builder
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-indigo-900 dark:from-white dark:via-purple-200 dark:to-indigo-200 bg-clip-text text-transparent mb-4">
              Create Your Perfect Resume with AI
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Describe your experience and let our AI craft a professional resume tailored to your career goals
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-200px)] relative z-10">
        {/* Left Panel: Prompt Input */}
        <div className="w-full lg:w-1/2 p-6 lg:pr-3">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 h-full">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-2xl mr-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">AI Resume Generator</h2>
                <p className="text-gray-600 dark:text-gray-300">Tell us about your experience</p>
              </div>
            </div>

            {/* Tips Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 mb-6 border border-blue-200 dark:border-blue-800">
              <div className="flex items-start">
                <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">💡 Pro Tips for Better Results:</h3>
                  <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                    <li>• Include your name, role, and years of experience</li>
                    <li>• Mention specific technologies, skills, or achievements</li>
                    <li>• Specify the industry or job type you are targeting</li>
                    <li>• Add any certifications or notable projects</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Example Prompts */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Example Prompts:</h3>
              <div className="space-y-2">
                {examplePrompts.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(example)}
                    className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <textarea
                  className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:border-indigo-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                  placeholder="e.g., Create a resume for John Smith, a frontend developer with 3 years of experience in React, TypeScript, and Next.js. Include experience at a tech startup building e-commerce platforms..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  required
                  rows={4}
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                  {prompt.length}/500
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating Your Resume...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Resume
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </form>

            {/* Loading State */}
            {loading && (
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl border border-purple-200 dark:border-purple-800">
                <div className="flex items-center">
                  <Loader2 className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-3 animate-spin" />
                  <div>
                    <p className="font-medium text-purple-900 dark:text-purple-200">AI is crafting your resume...</p>
                    <p className="text-sm text-purple-700 dark:text-purple-300">This may take a few moments</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Resume Preview */}
        <div className="w-full lg:w-1/2 p-6 lg:pl-3">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 h-full flex flex-col">
            {/* Preview Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-2xl mr-4">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Resume Preview</h2>
                  <p className="text-gray-600 dark:text-gray-300">Real-time preview of your resume</p>
                </div>
              </div>
              
              {response && (
                <div className="flex gap-2">
                  <button className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 p-3 rounded-xl transition-colors duration-200">
                    <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white p-3 rounded-xl transition-all duration-200 transform hover:scale-105">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Preview Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {!response && !loading && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 p-6 rounded-3xl mb-6">
                    <FileText className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Ready to Create Your Resume?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Enter your details in the form and watch your professional resume appear here in real-time.
                  </p>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-2xl">
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      ✨ Our AI will format, optimize, and enhance your content automatically
                    </p>
                  </div>
                </div>
              )}
              
              {response && (
                <div className="animate-fade-in">
                  <ResumePreview content={response} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}