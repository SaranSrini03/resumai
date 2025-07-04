"use client";
import { useState, useRef } from 'react';

export default function UploadPage() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
    } else {
      alert('Please select a valid PDF file');
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    setPdfUrl(null);
    fileInputRef.current!.value = ""; // clear file input
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-10 bg-white dark:bg-black text-black dark:text-white">
      <h1 className="text-2xl font-semibold mb-8">Create from Existing Resume</h1>

      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-8">
        {/* Upload Section */}
        <div className="flex-1 flex flex-col items-center">
          <div
            className="w-full h-64 border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            onClick={handleButtonClick}
          >
            <input
              type="file"
              ref={fileInputRef}
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-500 dark:text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              <span className="font-semibold text-blue-600 dark:text-blue-400">Click to upload</span> or drag and drop
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">PDF format (max 10MB)</p>
          </div>

          {pdfUrl && (
            <div className="mt-4 text-center">
              <p className="text-green-600 dark:text-green-400 font-medium">
                ✓ File uploaded successfully
              </p>
              <button
                className="mt-2 text-sm text-red-500 hover:text-red-700 dark:hover:text-red-400"
                onClick={handleRemove}
              >
                Remove File
              </button>
            </div>
          )}
        </div>

        {/* Preview Section */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">Resume Preview</h2>
          <div className="border rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900 h-[75vh]">
            {pdfUrl ? (
              <iframe
                src={pdfUrl}
                title="PDF Preview"
                className="w-full h-full"
                frameBorder="0"
                
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p>Upload a PDF to preview</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
