import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import ThemeToggle from './components/ThemeToggle';
import { Split, FileText } from 'lucide-react';

const initialMarkdown = `# Welcome to the Markdown Editor!

## Features
- Live preview
- Dark mode support
- Beautiful design
- Responsive layout

## How to use
1. Write markdown in the left panel
2. See the preview in the right panel
3. Enjoy writing!

> This is a blockquote

\`\`\`
// This is a code block
console.log('Hello, World!');
\`\`\`
`;

export default function App() {
  const [markdown, setMarkdown] = useState(initialMarkdown);

  // Internal use, used to capture errors. Do not delete.
  useEffect(() => {
    window.addEventListener('error', function ({ message, filename, lineno, colno, error }) {
      window.parent.postMessage({
        type: 'error',
        message: message,
        line: lineno,
        column: colno,
        stack: error ? error.stack : null
      }, '*');
    });

    return () => {
      window.removeEventListener('error', () => {});
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/30 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 text-transparent bg-clip-text">
              Markdown Editor
            </h1>
          </div>
          <ThemeToggle />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative">
            <div className="absolute -top-10 left-0 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Split className="w-4 h-4" />
              Editor
            </div>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="w-full h-[calc(100vh-12rem)] p-6 rounded-xl bg-white/70 dark:bg-gray-800/50 backdrop-blur-lg border border-purple-100/30 dark:border-purple-500/20 shadow-xl shadow-purple-500/5 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:text-gray-200 resize-none font-mono text-sm"
              placeholder="Write your markdown here..."
            />
          </div>

          <div className="relative">
            <div className="absolute -top-10 left-0 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <FileText className="w-4 h-4" />
              Preview
            </div>
            <div className="w-full h-[calc(100vh-12rem)] p-6 rounded-xl bg-white/70 dark:bg-gray-800/50 backdrop-blur-lg border border-purple-100/30 dark:border-purple-500/20 shadow-xl shadow-purple-500/5 overflow-auto prose dark:prose-invert max-w-none markdown-preview dark:text-gray-200">
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}