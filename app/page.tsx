'use client';

import Link from 'next/link';
import { FileText, UploadCloud, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 sm:p-20 bg-white dark:bg-black text-black dark:text-white">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">Build Your Resume</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Choose a method to get started
        </p>
      </div>

      <main className="grid gap-8 sm:grid-cols-3 w-full max-w-5xl">
        <OptionCard title="Create Resume Manually" href="/manual" />
        <OptionCard title="Create from Existing Resume" href="/upload" />
        <OptionCard title="Create Using AI" href="/ai" />
      </main>
    </div>
  );
}

const icons = {
  manual: FileText,
  upload: UploadCloud,
  ai: Sparkles,
};

function OptionCard({ title, href }: { title: string; href: string }) {
  const Icon = icons[href.split('/')[1] as keyof typeof icons];

  return (
    <Link href={href}>
      <div
        role="button"
        aria-label={title}
        tabIndex={0}
        className="aspect-square bg-gray-100 dark:bg-zinc-800 rounded-2xl shadow-md flex flex-col items-center justify-center text-center p-6 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer font-medium text-lg space-y-4"
      >
        {Icon && <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />}
        <span>{title}</span>
      </div>
    </Link>
  );
}
