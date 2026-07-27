import React from 'react';
import { Sparkles, Layers, StickyNote, HelpCircle, AlertTriangle, Clock, Sun, Moon } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, weakSpotsCount = 0, isDark, setIsDark }) {
  const navItems = [
    { id: 'notes', label: 'New Kit / Upload', icon: Sparkles },
    { id: 'summary', label: 'Summary', icon: Sparkles },
    { id: 'flashcards', label: 'Flashcards', icon: Layers },
    { id: 'stickies', label: 'Sticky Notes', icon: StickyNote },
    { id: 'quiz', label: 'Quiz (MCQs)', icon: HelpCircle },
    { 
      id: 'weakspots', 
      label: 'Weak Spots', 
      icon: AlertTriangle, 
      badge: weakSpotsCount > 0 ? weakSpotsCount : null 
    },
    { id: 'timer', label: 'Planner', icon: Clock },
  ];

  return (
    <header className={`sticky top-0 z-50 border-b transition-colors ${
      isDark ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white/90 border-slate-200 text-slate-800 shadow-sm'
    } backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div onClick={() => setActiveTab('notes')} className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight">
                Study<span className="text-indigo-500">Deck</span>
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className={`hidden md:flex items-center gap-1 p-1.5 rounded-2xl border ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md'
                      : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-rose-500 text-white rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Dark/Light Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-2.5 rounded-xl border transition ${
              isDark ? 'bg-slate-800 border-slate-700 text-amber-400' : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}
            title="Toggle Light/Dark Theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

        </div>
      </div>
    </header>
  );
}