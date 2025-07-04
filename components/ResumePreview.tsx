import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type ResumePreviewProps = {
  content: string;
};

export function ResumePreview({ content }: ResumePreviewProps) {
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (resumeRef.current) {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgProps = {
        width: canvas.width,
        height: canvas.height,
      };

      // Resize image to fit A4 width
      const ratio = Math.min(pageWidth / imgProps.width, pageHeight / imgProps.height);
      const imgWidth = imgProps.width * ratio;
      const imgHeight = imgProps.height * ratio;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("resume.pdf");
    }
  };

  if (!content) {
    return <p className="text-gray-500">Resume will appear here...</p>;
  }

  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className="space-y-4">
      <div
        ref={resumeRef}
        className="bg-white mx-auto shadow-md p-10 w-[794px] min-h-[1123px] font-serif text-black space-y-3"
      >
        {lines.map((line, idx) => {
          if (line.startsWith("###")) {
            return (
              <h2 key={idx} className="text-lg font-bold uppercase border-b pt-4">
                {line.replace(/^#+\s*/, "")}
              </h2>
            );
          }

          if (/^\*\*(.+?)\*\*$/.test(line)) {
            return (
              <h1 key={idx} className="text-xl font-bold text-center">
                {line.replace(/\*\*/g, "")}
              </h1>
            );
          }

          if (line.startsWith("- ")) {
            return (
              <li key={idx} className="list-disc list-inside">
                {line.slice(2)}
              </li>
            );
          }

          const [label, ...rest] = line.split(":");
          const value = rest.join(":").trim();

          return (
            <div key={idx} className="whitespace-pre-line">
              {rest.length ? (
                <p>
                  <strong>{label.trim()}:</strong> {value}
                </p>
              ) : (
                <p>{line}</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleDownload}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded shadow"
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
}
