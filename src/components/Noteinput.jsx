import React, { useState } from 'react';
import { Sparkles, BookOpen, Loader2, Upload, FileText } from 'lucide-react';
import { generateStudyKit } from '../lib/gemini';
import { parseFileText } from '../lib/fileParser';

export default function NoteInput({ onKitGenerated, isDark }) {
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setLoading(true);
    setError('');

    try {
      const extractedText = await parseFileText(file);
      if (!extractedText.trim()) {
        throw new Error('Could not extract text from file.');
      }
      setNotes(extractedText);
    } catch (err) {
      setError('Error reading file. Try pasting the text directly.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!notes.trim()) {
      setError('Please paste notes or upload a PDF/DOCX document!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const kitData = await generateStudyKit(notes);
      onKitGenerated(kitData);
    } catch (err) {
      setError('Failed to generate study kit. Make sure VITE_GEMINI_API_KEY is valid in .env & restart server.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`max-w-3xl mx-auto border rounded-2xl p-6 shadow-xl my-6 transition-colors ${
      isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
    }`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-indigo-600/20 text-indigo-500 rounded-xl">
          <BookOpen className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Import Study Material</h2>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Upload PDF/Word files or paste raw text to create summaries, MCQs & flashcards.
          </p>
        </div>
      </div>

      {/* File Dropzone */}
      <div className="mb-4">
        <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-5 cursor-pointer transition ${
          isDark ? 'border-slate-700 hover:border-indigo-500 bg-slate-950/50' : 'border-slate-300 hover:border-indigo-500 bg-slate-50'
        }`}>
          <Upload className="w-8 h-8 text-indigo-500 mb-2" />
          <span className="text-sm font-semibold">
            {fileName ? `Loaded: ${fileName}` : 'Click to Upload PDF, DOCX or TXT File'}
          </span>
          <span className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            AI will parse document text automatically
          </span>
          <input 
            type="file" 
            accept=".pdf,.docx,.doc,.txt,.pptx" 
            onChange={handleFileUpload} 
            className="hidden" 
          />
        </label>
      </div>

      <form onSubmit={handleGenerate} className="space-y-4">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Or paste lecture notes, topic outlines, or chapter summaries here..."
          rows={6}
          className={`w-full border rounded-xl p-4 transition resize-none ${
            isDark 
              ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500' 
              : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500'
          }`}
        />

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !notes.trim()}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-indigo-600/20"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Analyzing Document & Generating Kit...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-indigo-300" />
              <span>Generate Summary, MCQs & Flashcards</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}