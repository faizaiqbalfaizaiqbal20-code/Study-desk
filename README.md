# 📚 StudyDeck – AI-Powered Active Recall & Study Assistant

# 📚 StudyDeck – AI-Powered Active Recall & Study Assistant

> 🌐 **Live Application**: https://study-deckapp1.vercel.app  
> 💻 **GitHub Repository**: https://github.com/faizaiqbalfaizaiqbal20-code/Study-desk

---

## 🎯 Problem Statement & Solution

### The Problem
Students often struggle with **information overload** during exam preparation. Traditional note-taking is passive and ineffective for long-term retention. Converting massive lecture slides (PDFs, Word docs) into active recall materials (flashcards, diagnostic quizzes, summaries) manually takes hours that could otherwise be spent studying.

### The Solution
**StudyDeck** solves this problem by using **Google Gemini 1.5 Flash AI** to transform raw lecture notes, PDF documents, and Word files into a structured study kit in seconds. It enforces active recall and spaced repetition through dynamic flashcards, sticky note takeaways, multiple-choice diagnostic quizzes, and adaptive study schedules.

---

## ✨ Features List

* 📄 **Multi-Format Document Parsing**: Upload lecture slides/notes in **PDF, DOCX, PPTX, or TXT** formats, or directly paste raw text.
* 🤖 **Instant Active Recall Kits**: Automatically generates:
  * Executive high-level document summaries.
  * Interactive Q/A Flashcards.
  * Essential Sticky Notes (core formulas, definitions, key rules).
  * Diagnostic Multiple Choice Quizzes (MCQs) with full explanations.
  * Spaced Repetition Study Schedules.
* 🌓 **Dark / Light Mode Toggle**: Seamlessly switch between dark mode and high-contrast light mode for student eye comfort.
* ⚠️ **Weak Spot Tracker**: Tracks incorrectly answered questions/cards to build a targeted revision queue.
* 📱 **Fully Responsive Glassmorphic UI**: High-energy, student-focused modern UI built with Tailwind CSS.

---

## 🤖 AI Feature & System Prompt Details

* **AI Provider / Model**: Google Gemini 1.5 Flash (`@google/generative-ai`)
* **Purpose**: Analyzes unstructured student notes/files and outputs strictly formatted structured JSON containing study components.

### System Prompt / Instructions Used in Application:
```javascript
`You are an expert academic tutor specializing in active recall, spaced repetition, and effective study techniques.
Analyze the provided study notes and create a complete study kit.

Generate a strictly valid JSON response containing ALL 4 components below without any additional commentary:
{
  "deckTitle": "Short descriptive topic title based on notes",
  "summary": "A comprehensive 3-4 sentence high-level summary of the provided text.",
  "flashcards": [
    {
      "id": "fc_1",
      "question": "Clear active-recall question testing a single concept",
      "answer": "Concise, precise answer"
    }
  ],
  "stickyNotes": [
    {
      "id": "sn_1",
      "title": "Core Formula / Essential Takeaway Header",
      "content": "Key definition, rule, or critical insight for quick visual reference",
      "color": "yellow"
    }
  ],
  "quiz": [
    {
      "id": "q_1",
      "question": "Diagnostic question testing comprehension",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanation": "Brief explanation why this answer is correct"
    }
  ],
  "schedule": [
    {
      "day": "Day 1",
      "task": "Review Sticky Notes & 5 Flashcards",
      "durationMinutes": 25
    }
  ]
}`