'use client';

import Link from 'next/link';
import { FileText, UploadCloud, Sparkles, Star, Users, Award, ArrowRight } from 'lucide-react';
import ChatSupport from '@/components/ChatSupport';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 text-gray-900 dark:text-gray-100 relative overflow-hidden">
      {/* Enhanced decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-200 to-indigo-300 dark:from-blue-800 dark:to-indigo-900 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-purple-200 to-pink-300 dark:from-purple-800 dark:to-pink-900 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-cyan-200 to-blue-300 dark:from-cyan-800 dark:to-blue-900 rounded-full opacity-10 blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Enhanced header section */}
      <div className="text-center mb-16 z-10 max-w-4xl mx-auto">
        <div className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold py-2 px-6 rounded-full mb-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <Star className="w-4 h-4 mr-2" />
          Resume Builder v2.0
          <div className="ml-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent leading-tight">
          Craft Your <span className="relative">Perfect Resume
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
          </span>
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
          Choose your preferred method </p>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500 dark:text-gray-400 mb-8">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>500K+ users</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            <span>98% success rate</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>4.9/5 rating</span>
          </div>
        </div>
      </div>

      {/* Enhanced main options grid */}
      <main className="grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-3 w-full max-w-7xl z-10 mb-16">
        <OptionCard
          title="Manual Builder"
          description="Full control with our intuitive step-by-step editor"
          href="/manual"
          icon={FileText}
          color="blue"
          features={["Custom sections", "Real-time preview", "Export options"]}
        />
        <OptionCard
          title="Upload & Enhance"
          description="Upload your existing resume and let AI enhance it"
          href="/upload"
          icon={UploadCloud}
          color="indigo"
          features={["Smart formatting", "Content optimization", "ATS compatibility"]}
          popular={true}
        />
        <OptionCard
          title="AI Resume Builder"
          description="Let AI create the perfect resume tailored to your role"
          href="/ai"
          icon={Sparkles}
          color="purple"
          features={["Job-specific content", "Industry keywords", "Instant generation"]}
        />
      </main>

      {/* Enhanced chat support */}
      <ChatSupport />

      {/* Footer section */}
      <div className="text-center text-gray-500 dark:text-gray-400 text-sm z-10">
        <p>Trusted by professionals worldwide • Free to get started</p>
      </div>
    </div>
  );
}

function OptionCard({
  title,
  description,
  href,
  icon: Icon,
  color,
  features,
  popular = false
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;

  color: string;
  features: string[];
  popular?: boolean;
}) {
  const colorVariants = {
    blue: {
      bg: "from-blue-500 to-blue-600",
      hover: "hover:from-blue-600 hover:to-blue-700",
      iconBg: "bg-blue-100 dark:bg-blue-900",
      iconColor: "text-blue-600 dark:text-blue-400",
      border: "border-blue-200 dark:border-blue-800"
    },
    indigo: {
      bg: "from-indigo-500 to-indigo-600",
      hover: "hover:from-indigo-600 hover:to-indigo-700",
      iconBg: "bg-indigo-100 dark:bg-indigo-900",
      iconColor: "text-indigo-600 dark:text-indigo-400",
      border: "border-indigo-200 dark:border-indigo-800"
    },
    purple: {
      bg: "from-purple-500 to-purple-600",
      hover: "hover:from-purple-600 hover:to-purple-700",
      iconBg: "bg-purple-100 dark:bg-purple-900",
      iconColor: "text-purple-600 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-800"
    }
  };

  const variant = colorVariants[color as keyof typeof colorVariants];

  return (
    <Link href={href}>
      <div className="relative group">
        {/* Popular badge */}
        {popular && (
          <div className="absolute -top-3 -right-3 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full transform rotate-12 shadow-lg">
            POPULAR
          </div>
        )}

        {/* Main card */}
        <div className={`
          relative overflow-hidden bg-white dark:bg-gray-800 rounded-3xl shadow-xl 
          hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2
          border-2 ${variant.border} group-hover:border-opacity-50
          p-8 h-full flex flex-col justify-between
        `}>
          {/* Background gradient on hover */}
          <div className={`
            absolute inset-0 bg-gradient-to-br ${variant.bg} opacity-0 
            group-hover:opacity-5 transition-opacity duration-500
          `}></div>

          {/* Icon section */}
          <div className="relative z-10 mb-6">
            <div className={`
              ${variant.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center
              mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300
            `}>
              <Icon className={`w-8 h-8 ${variant.iconColor}`} />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {title}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
              {description}
            </p>
          </div>

          {/* Features list */}
          <div className="relative z-10 mb-6">
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <div className={`w-1.5 h-1.5 rounded-full ${variant.bg} mr-3`}></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Call to action */}
          <div className="relative z-10">
            <div className={`
              inline-flex items-center text-sm font-semibold ${variant.iconColor}
              group-hover:translate-x-1 transition-transform duration-300
            `}>
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </div>

          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
    </Link>
  );
}