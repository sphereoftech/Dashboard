import React, { useState } from "react";
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { TopNavbar } from '@/components/layout/TopNavbar';
import { Info, Lightbulb, Users, Award, Send, Slack, FileText } from 'lucide-react';

const PredictiveCharts = () => {
  const [isDark, setIsDark] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [xp, setXp] = useState(80); // Example XP progress

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <TopNavbar isDark={isDark} toggleTheme={toggleTheme} />
          <main className="flex-1 p-6 space-y-10 overflow-auto bg-gradient-to-br from-indigo-50 via-white to-blue-50">
            <div className="space-y-2">
              <h1 className="text-4xl font-extrabold font-tomorrow bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
                Predictive Charts
              </h1>
              <p className="text-lg text-gray-600 font-medium">
                Visualize AI-powered predictions and analytics here.
              </p>
            </div>

            {/* Confidence Meter - Polished */}
            <section className="bg-gradient-to-br from-white via-indigo-50 to-blue-100 rounded-3xl shadow-2xl p-12 flex flex-col md:flex-row items-center justify-between gap-12 mb-10 w-full max-w-6xl mx-auto border border-indigo-100 transition-all duration-300">
              <div className="flex flex-col items-center md:items-start flex-1">
                <h2 className="text-2xl font-bold mb-3 flex items-center gap-3 text-indigo-700">
                  <Award className="w-8 h-8 text-indigo-500 drop-shadow" /> Confidence Meter
                </h2>
                <p className="text-gray-500 mb-6 max-w-md text-base">
                  Your current industry alignment score, based on your learning path and recent activities. <span className="inline-block align-middle cursor-pointer" onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}><Info className="w-4 h-4 text-indigo-400 inline" /></span>
                  {showTooltip && (
                    <span className="ml-2 bg-white border border-indigo-200 text-xs rounded px-2 py-1 absolute z-10 shadow-lg animate-fade-in">This score reflects how closely your skills match industry trends.</span>
                  )}
                </p>
                <div className="flex items-center gap-10">
                  <div className="relative flex items-center justify-center">
                    <svg className="w-48 h-48 drop-shadow-lg" viewBox="0 0 100 100">
                      <defs>
                        <linearGradient id="meterGradient" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#6366f1" />
                          <stop offset="100%" stopColor="#a5b4fc" />
                        </linearGradient>
                      </defs>
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#e0e7ff" strokeWidth="12" />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="url(#meterGradient)"
                        strokeWidth="12"
                        strokeDasharray={2 * Math.PI * 45}
                        strokeDashoffset={2 * Math.PI * 45 * (1 - 0.82)}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 0.7s' }}
                      />
                      <text x="50" y="56" textAnchor="middle" fontSize="2.5em" fill="#6366f1" fontWeight="bold">82%</text>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-indigo-600 inline-block"></span>
                      <span className="text-base font-medium text-indigo-700">Industry Alignment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-gray-300 inline-block"></span>
                      <span className="text-base text-gray-500">Not aligned</span>
                    </div>
                  </div>
                </div>
                <div className="mt-8 w-full max-w-xs">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Skill Growth</span>
                    <span>67%</span>
                  </div>
                  <div className="w-full h-3 bg-indigo-100 rounded-full overflow-hidden">
                    <div className="h-3 bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500" style={{ width: '67%' }}></div>
                  </div>
                </div>
              </div>
            </section>

            {/* AI Suggestions for XP - Polished */}
            <section className="bg-gradient-to-br from-white via-yellow-50 to-indigo-50 rounded-3xl shadow-2xl p-12 flex flex-col gap-8 w-full max-w-6xl mx-auto border border-yellow-100 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <Lightbulb className="w-8 h-8 text-yellow-400 animate-pulse" />
                <h2 className="text-2xl font-bold text-yellow-700">AI Suggestions for XP</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex items-center gap-4 bg-gradient-to-r from-indigo-100 to-indigo-200 rounded-xl p-6 shadow hover:scale-105 hover:shadow-lg transition-all duration-300">
                  <Award className="w-10 h-10 text-indigo-600" />
                  <div>
                    <p className="font-semibold text-lg">Complete a DevOps mini-project</p>
                    <span className="text-xs text-indigo-500">+50 XP</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-gradient-to-r from-green-100 to-green-200 rounded-xl p-6 shadow hover:scale-105 hover:shadow-lg transition-all duration-300">
                  <Users className="w-10 h-10 text-green-600" />
                  <div>
                    <p className="font-semibold text-lg">Participate in a team code review</p>
                    <span className="text-xs text-green-500">+30 XP</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-xl p-6 shadow hover:scale-105 hover:shadow-lg transition-all duration-300">
                  <FileText className="w-10 h-10 text-yellow-600" />
                  <div>
                    <p className="font-semibold text-lg">Share a learning resource in the forum</p>
                    <span className="text-xs text-yellow-500">+20 XP</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-8">
                <div className="w-full md:w-1/2">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>XP Earned This Week</span>
                    <span>{xp}/100 XP</span>
                  </div>
                  <div className="w-full h-3 bg-yellow-100 rounded-full overflow-hidden">
                    <div className="h-3 bg-gradient-to-r from-indigo-400 to-yellow-400 rounded-full transition-all duration-500" style={{ width: `${xp}%` }}></div>
                  </div>
                </div>
                <button
                  className="bg-gradient-to-r from-indigo-500 to-yellow-400 hover:from-indigo-600 hover:to-yellow-500 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition-all duration-300 mt-4 md:mt-0"
                  onClick={() => setXp(Math.min(100, xp + 10))}
                >
                  Get More Suggestions
                </button>
              </div>
            </section>

            {/* Share to Notion/Slack - Polished */}
            <section className="bg-gradient-to-br from-white via-indigo-50 to-purple-50 rounded-3xl shadow-2xl p-12 flex flex-col md:flex-row gap-12 w-full max-w-6xl mx-auto items-center border border-purple-100 transition-all duration-300">
              <div className="flex-1 flex flex-col gap-6">
                <div className="flex items-center gap-4 mb-2">
                  <FileText className="w-8 h-8 text-indigo-600" />
                  <h2 className="text-2xl font-bold text-purple-700">Learning Digest Preview</h2>
                </div>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8 text-gray-700 text-base shadow-inner mb-2 border border-indigo-100">
                  <strong>Daily Recommendation:</strong> Explore the new "Kubernetes for Beginners" module.<br />
                  <strong>Weekly Stat:</strong> You completed 5 learning goals this week!<br />
                  <strong>AI Insight:</strong> "Your DevOps skills are now in the top 15% of your cohort."
                </div>
                <div className="flex gap-6 mt-2">
                  <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm hover:bg-indigo-50 transition-all duration-200 cursor-pointer">
                    <Slack className="w-6 h-6 text-blue-500" />
                    <span className="text-base font-medium">Slack</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm hover:bg-purple-50 transition-all duration-200 cursor-pointer">
                    <FileText className="w-6 h-6 text-black" />
                    <span className="text-base font-medium">Notion</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-6">
                <div className="w-72 h-44 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex flex-col justify-center items-center text-gray-500 text-center p-6 border border-dashed border-indigo-200 shadow-inner">
                  <Send className="w-10 h-10 mb-2 text-indigo-400 animate-bounce" />
                  <span className="text-lg font-semibold">Preview of message to be shared</span>
                  <span className="text-xs mt-2">"Check out my latest learning progress and AI insights!"</span>
                </div>
                <button
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg transition-all duration-300 relative"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  Share to Notion/Slack
                  {showTooltip && (
                    <span className="absolute left-1/2 -translate-x-1/2 top-full mt-3 bg-gray-900 text-white text-xs rounded px-3 py-2 z-20 whitespace-nowrap shadow-xl animate-fade-in">Share your digest to Notion or Slack</span>
                  )}
                </button>
              </div>
            </section>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default PredictiveCharts; 