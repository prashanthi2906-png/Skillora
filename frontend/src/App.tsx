import React from 'react';
import { Sparkles, Terminal, BookOpen, Layers } from 'lucide-react';

export const App: React.FC = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white">
      <div className="max-w-2xl w-full bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-2xl p-8 shadow-2xl space-y-6">
        <header className="flex items-center space-x-3">
          <div className="p-3 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-500/30">
            <Sparkles className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Skillora</h1>
            <p className="text-sm text-slate-400">Collaborative Skill Development Platform</p>
          </div>
        </header>

        <section className="p-4 bg-slate-900/60 rounded-xl border border-slate-700/60 space-y-3">
          <h2 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
            <Terminal className="w-4 h-4" /> Environment Status
          </h2>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="p-3 rounded-lg bg-slate-800 border border-slate-700/50">
              <span className="text-slate-400 block text-xs">Frontend</span>
              <span className="font-medium text-emerald-400">React + Vite + TS + Tailwind</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-800 border border-slate-700/50">
              <span className="text-slate-400 block text-xs">Branch</span>
              <span className="font-mono text-xs text-amber-400">feature/project-setup</span>
            </div>
          </div>
        </section>

        <footer className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" /> Ready for team feature development
          </span>
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" /> Skillora Starter
          </span>
        </footer>
      </div>
    </main>
  );
};

export default App;

