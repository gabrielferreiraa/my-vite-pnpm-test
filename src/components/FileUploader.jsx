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
            relative rounded-xl p-8 text-center
            ${isDragging ? 
              'bg-blue-50/80 dark:bg-blue-950/30 border-blue-300 dark:border-blue-700' : 
              'bg-white/60 dark:bg-slate-800/60'
            }
            backdrop-blur-md border-2 border-dashed
            border-slate-300 dark:border-slate-700
            transition-all duration-300 ease-in-out
          `}
        >
          <input
            type="file"
            multiple
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
              <Upload className="w-8 h-8 text-blue-500 dark:text-blue-400" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">
                Drop your files here
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                or click to browse
              </p>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg p-4 border border-slate-200 dark:border-slate-700"
            >
              <div className="space-y-3">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300"
                  >
                    <File className="w-4 h-4" />
                    <span className="flex-1 truncate">{file.name}</span>
                    <span className="text-xs text-slate-400">
                      {(file.size / 1024).toFixed(1)} KB
                    </span>
                  </div>
                ))}
              </div>

              {uploadStatus !== 'idle' && (
                <div className="mt-4 flex items-center gap-2">
                  {uploadStatus === 'uploading' && (
                    <div className="flex items-center gap-2 text-blue-500 dark:text-blue-400">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span className="text-sm">Uploading...</span>
                    </div>
                  )}
                  {uploadStatus === 'success' && (
                    <div className="flex items-center gap-2 text-emerald-500 dark:text-emerald-400">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Upload complete!</span>
                    </div>
                  )}
                  {uploadStatus === 'error' && (
                    <div className="flex items-center gap-2 text-red-500 dark:text-red-400">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">Upload failed. Please try again.</span>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}