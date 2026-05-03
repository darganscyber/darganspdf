import { useCallback, useState } from 'react';
import { useDropzone, FileRejection, DropEvent } from 'react-dropzone';
import { motion, AnimatePresence } from 'motion/react';
import { UploadCloud, File as FileIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MagneticButton } from './MagneticButton';

interface UploadZoneProps {
  onFilesAccepted: (files: File[]) => void;
  accept?: Record<string, string[]>;
  maxFiles?: number;
  multiple?: boolean;
}

export function UploadZone({ onFilesAccepted, accept = { 'application/pdf': ['.pdf'] }, maxFiles = 9999, multiple = true }: UploadZoneProps) {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => {
    if (fileRejections.length > 0) {
      setError(fileRejections[0].errors[0].message);
      return;
    }
    setError(null);
    onFilesAccepted(acceptedFiles);
  }, [onFilesAccepted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDrop as any,
    accept,
    maxFiles,
    multiple
  } as any);

  return (
    <div className="w-full">
      <div 
        {...getRootProps()} 
        className={cn(
          "relative overflow-hidden w-full rounded-[32px] border border-white/10 p-12 transition-all duration-500 flex flex-col items-center justify-center min-h-[350px] cursor-pointer group hover:-translate-y-1 shadow-xl",
          isDragActive ? "border-amber-500 bg-[#111111] shadow-[0_0_50px_-15px_rgba(245,158,11,0.4)]" : "bg-[#111111] hover:border-amber-500/50"
        )}
      >
        <input {...getInputProps()} />
        
        {/* Glow effect on drag */}
        <div className={cn(
          "absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.15),transparent_60%)] transition-opacity duration-500 pointer-events-none",
          isDragActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )} />

        <div className="relative z-10 flex flex-col items-center flex-1 w-full justify-center text-center">
          <motion.div 
            animate={{ y: isDragActive ? -10 : 0, scale: isDragActive ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn(
              "w-24 h-24 rounded-full flex items-center justify-center mb-8 transition-colors duration-500",
              isDragActive ? "bg-amber-500/20 text-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.3)]" : "bg-white/5 border border-white/10 text-white/50 group-hover:bg-amber-500/10 group-hover:text-amber-400 group-hover:border-amber-500/30"
            )}
          >
            <UploadCloud className="w-10 h-10" />
          </motion.div>
          
          <h3 className="text-3xl font-heading font-bold text-white mb-4">
            {isDragActive ? "Drop it here!" : "Select files or drop them here"}
          </h3>
          <p className="text-text-muted text-lg mb-8 max-w-sm">
            Upload your files securely. All processing happens entirely in your local browser window.
          </p>
          
          <MagneticButton type="button" className="!bg-amber-500 hover:!bg-amber-600 !text-black font-bold uppercase tracking-widest text-sm px-10 py-4 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.3)] border-none pointer-events-none transition-all duration-300 transform group-hover:scale-105">
            Choose Files
          </MagneticButton>
          
          <p className="mt-8 text-xs text-text-muted/60 font-mono">
            {multiple ? 'Multiple files allowed' : 'Single file allowed'} • Local processing only
          </p>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center justify-between"
          >
            <span>{error}</span>
            <button onClick={() => setError(null)} className="p-1 hover:bg-red-500/20 rounded-md transition-colors">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
