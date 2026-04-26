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

export function UploadZone({ onFilesAccepted, accept = { 'application/pdf': ['.pdf'] }, maxFiles = 20, multiple = true }: UploadZoneProps) {
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
          "relative overflow-hidden w-full rounded-2xl border-2 border-dashed p-12 transition-all duration-300 flex flex-col items-center justify-center min-h-[300px] cursor-pointer group",
          isDragActive ? "border-accent-blue bg-accent-blue/5 scale-[1.02]" : "border-border hover:border-border-hover bg-bg-card hover:bg-bg-card/80"
        )}
      >
        <input {...getInputProps()} />
        
        {/* Glow effect on drag */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-tr from-accent-blue/0 via-accent-purple/0 to-accent-teal/0 transition-opacity duration-500",
          isDragActive ? "opacity-20 blur-2xl" : "opacity-0"
        )} />

        <div className="relative z-10 flex flex-col items-center flex-1 w-full justify-center text-center">
          <motion.div 
            animate={{ y: isDragActive ? -10 : 0, scale: isDragActive ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn(
              "w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-colors",
              isDragActive ? "bg-accent-blue/20 text-accent-blue" : "bg-white/5 text-text-muted group-hover:text-white"
            )}
          >
            <UploadCloud className="w-10 h-10" />
          </motion.div>
          
          <h3 className="text-2xl font-heading font-semibold text-white mb-2">
            {isDragActive ? "Drop files now" : "Drag & drop files here"}
          </h3>
          <p className="text-text-muted mb-6">
            or click to browse your computer
          </p>
          
          <MagneticButton type="button" className="pointer-events-none">
            Select Files
          </MagneticButton>
          
          <p className="mt-8 text-xs text-text-muted/60 font-mono">
            Requires PDF • Max {multiple ? maxFiles : 1} {multiple ? 'files' : 'file'} at a time
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
