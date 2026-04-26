import { useState, useEffect } from 'react';
import { UploadZone } from '@/components/ui/UploadZone';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { splitPdf } from '@/lib/pdf/split';
import { motion, AnimatePresence } from 'motion/react';
import { File, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import * as pdfjsLib from 'pdfjs-dist';
import { useUsage } from '@/components/UsageProvider';

// Configure pdfjs worker to render thumbnails.
// We use a public CDN worker for this demo.
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export function SplitPdf() {
  const { incrementUsage } = useUsage();
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!file) return;
    const loadPdfInfo = async () => {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        setPageCount(pdf.numPages);
        // default select all
        setSelectedPages(new Set(Array.from({length: pdf.numPages}, (_, i) => i)));
      } catch (e) {
        console.error("Failed to load PDF info", e);
      }
    };
    loadPdfInfo();
  }, [file]);

  const handleFilesAccepted = (newFiles: File[]) => {
    if (newFiles.length > 0) {
      setFile(newFiles[0]);
      setResultBlob(null);
      setPageCount(0);
      setSelectedPages(new Set());
    }
  };

  const handleSplit = async () => {
    if (!file || selectedPages.size === 0) return;
    if (!incrementUsage()) return; // Stop if limit reached
    
    setIsProcessing(true);
    try {
      const pagesToExtract = Array.from(selectedPages.values()).map(Number).sort((a,b) => a - b);
      const blob = await splitPdf(file, pagesToExtract);
      setResultBlob(blob);
    } catch (error) {
      console.error("Failed to split PDF:", error);
      alert("Failed to split PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resultBlob) return;
    const url = URL.createObjectURL(resultBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `extracted-pages-${Date.now()}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const togglePage = (idx: number) => {
    const newSet = new Set(selectedPages);
    if (newSet.has(idx)) {
      newSet.delete(idx);
    } else {
      newSet.add(idx);
    }
    setSelectedPages(newSet);
  };

  const handleReset = () => {
    setFile(null);
    setResultBlob(null);
    setPageCount(0);
    setSelectedPages(new Set());
  };

  return (
    <div className="w-full flex flex-col items-center">
      <AnimatePresence mode="wait">
        {!file && !resultBlob ? (
          <motion.div 
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-2xl"
          >
            <UploadZone onFilesAccepted={handleFilesAccepted} multiple={false} />
          </motion.div>
        ) : resultBlob ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl p-12 bg-bg-card rounded-3xl border border-accent-purple/30 text-center flex flex-col items-center shadow-[0_0_40px_-15px_rgba(124,92,252,0.3)]"
          >
            <div className="w-20 h-20 bg-accent-purple/20 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-accent-purple" />
            </div>
            <h2 className="text-3xl font-heading font-bold mb-4">Pages Extracted!</h2>
            <p className="text-text-muted mb-8">Successfully created a new PDF with {selectedPages.size} selected pages.</p>
            
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
            key="pages"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full relative"
          >
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">{file.name}</h3>
                <p className="text-text-muted">{pageCount > 0 ? `${pageCount} pages loaded` : 'Loading pages...'}</p>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => setSelectedPages(new Set(Array.from({length: pageCount}, (_, i) => i)))} className="text-sm font-medium text-text-muted hover:text-white transition-colors">Select All</button>
                <button onClick={() => setSelectedPages(new Set())} className="text-sm font-medium text-text-muted hover:text-white transition-colors">Clear</button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-12">
              {Array.from({length: pageCount}).map((_, idx) => (
                <div 
                  key={idx}
                  onClick={() => togglePage(idx)}
                  className={cn(
                    "relative aspect-[1/1.4] rounded-xl cursor-pointer border-2 transition-all p-2 flex flex-col items-center justify-center overflow-hidden group",
                    selectedPages.has(idx) ? "border-accent-purple bg-accent-purple/10 shadow-[0_0_20px_-5px_rgba(124,92,252,0.4)]" : "border-border bg-bg-card hover:border-border-hover blur-0"
                  )}
                >
                  <File className={cn("w-12 h-12 mb-2 transition-colors", selectedPages.has(idx) ? "text-accent-purple" : "text-text-muted")} />
                  <span className={cn("font-mono font-bold transition-colors", selectedPages.has(idx) ? "text-white" : "text-text-muted")}>Page {idx + 1}</span>
                  
                  <div className={cn(
                    "absolute top-2 right-2 w-5 h-5 rounded-full border flex items-center justify-center transition-colors",
                    selectedPages.has(idx) ? "bg-accent-purple border-accent-purple text-white" : "border-border text-transparent"
                  )}>
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>

            <div className="sticky bottom-6 left-0 right-0 py-6 px-8 rounded-2xl bg-bg-secondary/80 backdrop-blur-xl border border-border flex items-center justify-between shadow-2xl z-50">
               <div>
                 <p className="font-bold text-lg">{selectedPages.size} pages selected</p>
               </div>
               <div className="flex items-center gap-4">
                  <button onClick={handleReset} className="px-4 py-2 text-text-muted hover:text-white transition-colors font-medium">Cancel</button>
                  <MagneticButton 
                    onClick={handleSplit}
                    disabled={selectedPages.size === 0 || isProcessing}
                    className={cn(
                      "flex items-center gap-2",
                      selectedPages.size > 0 ? "!bg-accent-purple text-white hover:!bg-accent-purple/90 border-transparent shadow-[0_0_30px_-5px_rgba(124,92,252,0.4)]" : "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {isProcessing ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                    ) : (
                      <>Extract pages</>
                    )}
                  </MagneticButton>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
