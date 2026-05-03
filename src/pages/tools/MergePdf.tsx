import { useState } from 'react';
import { UploadZone } from '@/components/ui/UploadZone';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { mergePdfs } from '@/lib/pdf/merge';
import { motion, AnimatePresence } from 'motion/react';
import { File, X, GripVertical, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUsage } from '@/components/UsageProvider';

export function MergePdf() {
  const { incrementUsage } = useUsage();
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);

  const handleFilesAccepted = (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles]);
    setResultBlob(null);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setResultBlob(null);
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const newFiles = [...files];
    if (direction === 'up' && index > 0) {
      [newFiles[index - 1], newFiles[index]] = [newFiles[index], newFiles[index - 1]];
    } else if (direction === 'down' && index < newFiles.length - 1) {
      [newFiles[index + 1], newFiles[index]] = [newFiles[index], newFiles[index + 1]];
    }
    setFiles(newFiles);
  };

  const handleMerge = async () => {
    if (files.length < 2) return;
    if (!incrementUsage()) return; // Stop if limit reached
    
    setIsProcessing(true);
    try {
      const blob = await mergePdfs(files);
      setResultBlob(blob);
    } catch (error) {
      console.error("Failed to merge PDFs:", error);
      alert("Failed to merge PDFs. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resultBlob) return;
    const url = URL.createObjectURL(resultBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `merged-document-${Date.now()}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setFiles([]);
    setResultBlob(null);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <AnimatePresence mode="wait">
        {files.length === 0 && !resultBlob ? (
          <motion.div 
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-2xl"
          >
            <UploadZone onFilesAccepted={handleFilesAccepted} multiple />
          </motion.div>
        ) : resultBlob ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl p-12 bg-bg-card rounded-3xl border border-amber-500/30 text-center flex flex-col items-center shadow-[0_0_40px_-15px_rgba(245,158,11,0.4)]"
          >
            <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-accent-blue" />
            </div>
            <h2 className="text-3xl font-heading font-bold mb-4">Merge Complete!</h2>
            <p className="text-text-muted mb-8">Your PDFs have been successfully combined into a single document.</p>
            
            <div className="flex gap-4">
              <MagneticButton onClick={handleDownload} className="!bg-white !text-black border-transparent shadow-lg shadow-white/10 hover:!bg-white/90">
                Download PDF
              </MagneticButton>
              <MagneticButton onClick={handleReset} className="bg-transparent border border-border">
                Start Over
              </MagneticButton>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="files"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-3xl flex flex-col"
          >
            <div className="bg-bg-card border border-border rounded-2xl overflow-hidden mb-8">
              <div className="p-4 border-b border-border bg-bg-secondary flex justify-between items-center text-sm font-medium">
                <span>{files.length} {files.length === 1 ? 'file' : 'files'} selected</span>
                <button onClick={() => setFiles([])} className="text-text-muted hover:text-white transition-colors">Clear all</button>
              </div>
              <ul className="max-h-[400px] overflow-y-auto divide-y divide-border/50">
                <AnimatePresence>
                  {files.map((file, idx) => (
                    <motion.li 
                      key={`${file.name}-${idx}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors group"
                    >
                      <div className="flex flex-col gap-1">
                        <button disabled={idx === 0} onClick={() => moveFile(idx, 'up')} className="text-text-muted hover:text-white disabled:opacity-30 disabled:hover:text-text-muted"><GripVertical className="w-4 h-4 rotate-90" /></button>
                        <button disabled={idx === files.length - 1} onClick={() => moveFile(idx, 'down')} className="text-text-muted hover:text-white disabled:opacity-30 disabled:hover:text-text-muted"><GripVertical className="w-4 h-4 rotate-90" /></button>
                      </div>
                      <div className="w-10 h-10 rounded bg-red-500/10 flex items-center justify-center shrink-0 text-red-500">
                        <File className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate font-medium text-white">{file.name}</p>
                        <p className="text-xs text-text-muted">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      <button onClick={() => removeFile(idx)} className="p-2 text-text-muted hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                        <X className="w-5 h-5" />
                      </button>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
              
              <div className="p-4 border-t border-border bg-bg-secondary/50">
                 <UploadZone onFilesAccepted={handleFilesAccepted} multiple />
              </div>
            </div>

            <div className="flex justify-center">
              <MagneticButton 
                onClick={handleMerge}
                disabled={files.length < 2 || isProcessing}
                className={cn(
                  "flex items-center gap-2",
                  files.length >= 2 ? "!bg-amber-500 text-white hover:!bg-amber-500/90 border-transparent shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)]" : "opacity-50 cursor-not-allowed"
                )}
              >
                {isProcessing ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Merging...</>
                ) : (
                  <>Merge {files.length} {files.length === 1 ? 'file' : 'files'}</>
                )}
              </MagneticButton>
            </div>
            {files.length < 2 && (
               <p className="text-center text-sm text-text-muted mt-4">Please add at least 2 files to merge.</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
