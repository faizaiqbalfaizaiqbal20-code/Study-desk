import React, { useState } from 'react';
import Navbar from './components/Navbar';
import NoteInput from './components/NoteInput';
import { Sparkles, FileText, Layers, StickyNote, HelpCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('notes');
  const [studyKit, setStudyKit] = useState(null);
  const [weakCards, setWeakCards] = useState([]);
  const [isDark, setIsDark] = useState(true);

  const handleKitGenerated = (kitData) => {
    setStudyKit(kitData);
    setActiveTab('summary');
  };

  return (
    <div className={`min-h-screen transition-colors font-sans ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        weakSpotsCount={weakCards.length}
        isDark={isDark}
        setIsDark={setIsDark}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TAB 1: Note & File Input */}
        {activeTab === 'notes' && (
          <NoteInput onKitGenerated={handleKitGenerated} isDark={isDark} />
        )}

        {/* TAB 2: Summary View */}
        {activeTab === 'summary' && (
          <div className="max-w-3xl mx-auto">
            {!studyKit ? (
              <EmptyState isDark={isDark} onAction={() => setActiveTab('notes')} />
            ) : (
              <div className={`p-8 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-md'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-indigo-500" />
                  <h2 className="text-2xl font-bold">{studyKit.deckTitle}</h2>
                </div>
                <p className="text-lg leading-relaxed text-indigo-400 font-medium mb-4">Executive Summary</p>
                <div className={`p-5 rounded-xl border text-sm leading-relaxed ${
                  isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}>
                  {studyKit.summary}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Flashcards View */}
        {activeTab === 'flashcards' && (
          <div className="max-w-3xl mx-auto">
            {!studyKit ? (
              <EmptyState isDark={isDark} onAction={() => setActiveTab('notes')} />
            ) : (
              <div className="grid gap-4">
                {studyKit.flashcards?.map((fc, i) => (
                  <div key={i} className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <span className="text-xs font-bold text-indigo-500 uppercase">Flashcard #{i+1}</span>
                    <h4 className="text-lg font-semibold my-2">Q: {fc.question}</h4>
                    <p className={`text-sm pt-2 border-t ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-600'}`}>
                      <strong>Ans:</strong> {fc.answer}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: Sticky Notes View */}
        {activeTab === 'stickies' && (
          <div className="max-w-4xl mx-auto">
            {!studyKit ? (
              <EmptyState isDark={isDark} onAction={() => setActiveTab('notes')} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {studyKit.stickyNotes?.map((sn, i) => (
                  <div key={i} className="p-5 rounded-2xl border bg-amber-500/10 border-amber-500/30">
                    <h4 className="font-bold text-amber-500 mb-2">{sn.title}</h4>
                    <p className="text-sm">{sn.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: Quiz / MCQs View */}
        {activeTab === 'quiz' && (
          <div className="max-w-3xl mx-auto">
            {!studyKit ? (
              <EmptyState isDark={isDark} onAction={() => setActiveTab('notes')} />
            ) : (
              <div className="space-y-6">
                {studyKit.quiz?.map((q, i) => (
                  <div key={i} className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <h4 className="font-bold text-base mb-4">Question {i+1}: {q.question}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {q.options?.map((opt, optIdx) => (
                        <div key={optIdx} className={`p-3 rounded-xl border text-sm font-medium ${
                          optIdx === q.correctIndex 
                            ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-500' 
                            : isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                        }`}>
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}

function EmptyState({ isDark, onAction }) {
  return (
    <div className={`p-10 rounded-2xl border text-center ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
      <Sparkles className="w-10 h-10 text-indigo-500 mx-auto mb-3" />
      <h3 className="text-lg font-bold mb-1">No Material Uploaded Yet</h3>
      <p className="text-sm opacity-60 mb-6">Upload a document (PDF / DOCX) or paste text to generate decks.</p>
      <button onClick={onAction} className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition">
        Upload Document
      </button>
    </div>
  );
}