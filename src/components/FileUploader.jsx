import { useState, useCallback } from 'react';
import { Upload, File, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FileUploader() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success, error

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFiles = [...e.dataTransfer.files];
    setFiles(droppedFiles);
    simulateUpload();
  }, []);

  const handleFileSelect = (e) => {
    const selectedFiles = [...e.target.files];
    setFiles(selectedFiles);
    simulateUpload();
  };

  const simulateUpload = () => {
    setUploadStatus('uploading');
    setTimeout(() => {
      setUploadStatus(Math.random() > 0.5 ? 'success' : 'error');
    }, 2000);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`
            relative rounded-xl border-2 border-dashed p-8 transition-all
            ${isDragging 
              ? 'border-purple-500 bg-purple-50/50 dark:bg-purple-900/10' 
              : 'border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50'}
            backdrop-blur-sm
          `}
        >
          <input
            type="file"
            multiple
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="text-center">
            <Upload className="w-12 h-12 mx-auto mb-4 text-purple-500" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
              Drop your files here
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              or click to browse
            </p>
          </div>
        </div>

        <AnimatePresence>
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 bg-white dark:bg-slate-800/90 rounded-xl p-4 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50"
            >
              <div className="space-y-3">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <File className="w-5 h-5 text-purple-500" />
                    <span className="text-sm text-slate-700 dark:text-slate-300 truncate">
                      {file.name}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      ({(file.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                ))}
              </div>

              {uploadStatus === 'uploading' && (
                <div className="mt-4 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 animate-[progress_2s_ease-in-out_infinite] rounded-full" />
                </div>
              )}

              {uploadStatus === 'success' && (
                <div className="mt-4 flex items-center gap-2 text-emerald-500">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm">Upload complete!</span>
                </div>
              )}

              {uploadStatus === 'error' && (
                <div className="mt-4 flex items-center gap-2 text-red-500">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm">Upload failed. Please try again.</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}