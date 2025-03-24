import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, CheckCircle, AlertCircle, FileIcon } from 'lucide-react';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'];

export default function FileUploader() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`File ${file.name} is too large. Maximum size is 10MB`);
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error(`File type ${file.type} is not supported`);
    }
  };

  const handleFiles = async (fileList) => {
    setError(null);
    const newFiles = [...files];

    for (const file of fileList) {
      try {
        validateFile(file);
        const fileWithProgress = {
          file,
          progress: 0,
          status: 'uploading',
          id: Math.random().toString(36).substring(7)
        };
        newFiles.push(fileWithProgress);

        // Simulate upload progress
        const intervals = Array.from({ length: 5 }, (_, i) => (i + 1) * 20);
        for (const progress of intervals) {
          await new Promise(resolve => setTimeout(resolve, 500));
          setFiles(current => 
            current.map(f => 
              f.id === fileWithProgress.id 
                ? { ...f, progress } 
                : f
            )
          );
        }

        // Simulate successful upload
        setFiles(current =>
          current.map(f =>
            f.id === fileWithProgress.id
              ? { ...f, status: 'completed', progress: 100 }
              : f
          )
        );
      } catch (err) {
        setError(err.message);
      }
    }
    setFiles(newFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const removeFile = (fileId) => {
    setFiles(files.filter(f => f.id !== fileId));
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleFiles(Array.from(e.target.files))}
          className="hidden"
          multiple
        />

        <motion.div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          animate={{
            scale: isDragging ? 1.02 : 1,
            borderColor: isDragging ? '#3b82f6' : '#e2e8f0'
          }}
          className={`
            min-h-[200px] rounded-xl
            border-2 border-dashed
            bg-white/60 dark:bg-slate-800/60
            backdrop-blur-lg
            flex flex-col items-center justify-center
            cursor-pointer
            transition-colors
            dark:border-slate-700
            ${isDragging ? 'border-blue-500' : 'border-slate-200 dark:border-slate-700'}
          `}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-12 h-12 text-blue-500 mb-4" />
          <p className="text-slate-600 dark:text-slate-300 text-center">
            Drag & drop files here or click to select
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Supported files: JPG, PNG, PDF, TXT (Max 10MB)
          </p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 flex items-center gap-2"
          >
            <AlertCircle className="w-5 h-5" />
            {error}
          </motion.div>
        )}

        <AnimatePresence>
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 space-y-4"
            >
              {files.map((file) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="relative p-4 rounded-lg bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-center gap-4">
                    <FileIcon className="w-8 h-8 text-blue-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                        {file.file.name}
                      </p>
                      <div className="mt-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${file.progress}%` }}
                          className={`h-full rounded-full ${
                            file.status === 'completed'
                              ? 'bg-green-500'
                              : 'bg-blue-500'
                          }`}
                        />
                      </div>
                    </div>
                    {file.status === 'completed' ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <button
                        onClick={() => removeFile(file.id)}
                        className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        <X className="w-5 h-5 text-slate-500" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}