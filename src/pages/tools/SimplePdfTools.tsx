import { useState, ReactNode } from 'react';
import { UploadZone } from '@/components/ui/UploadZone';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { protectPdf } from '@/lib/pdf/protect';
import { unlockPdf } from '@/lib/pdf/unlock';
import { rotatePdf } from '@/lib/pdf/rotate';
import { compressPdf } from '@/lib/pdf/compress';
import { updateMetadata } from '@/lib/pdf/metadata';
import { addWatermark } from '@/lib/pdf/watermark';
import { signPdf } from '@/lib/pdf/signPdf';
import { jpgToPdf } from '@/lib/pdf/jpgToPdf';
import { pdfToWord } from '@/lib/pdf/pdfToWord';
import { pdfToJpg } from '@/lib/pdf/pdfToJpg';
import { 
  removePages, extractPages, flattenPdf, addPageNumbers, 
  repairPdf, reversePdf, pdfToPng, extractText,
  wordToPdf, pngToPdf, pdfToExcel, excelToPdf, pdfToPpt, pptToPdf,
  textToPdf, htmlToPdf, pdfToHtml, epubToPdf, pdfToEpub, csvToPdf
} from '@/lib/pdf/additional';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Loader2, CheckCircle2, Lock, Unlock, RotateCw,
  Minimize2, FileText, FileImage, ImageIcon, Droplet, PenTool, Settings,
  Type, FileMinus, FileOutput, Layers, Hash, Wrench, ArrowDownUp
} from 'lucide-react';
import { useUsage } from '@/components/UsageProvider';

function GenericToolShell({ 
  title, 
  icon: Icon,
  actionText,
  colorClass,
  colorShadowClass,
  onProcess,
  extraInputs,
  accept,
  multiple = false
}: {
  title: string;
  icon: any;
  actionText: string;
  colorClass: string;
  colorShadowClass: string;
  onProcess: (files: File[]) => Promise<Blob>;
  extraInputs?: (files: File[]) => ReactNode;
  accept?: Record<string, string[]>;
  multiple?: boolean;
}) {
  const { incrementUsage } = useUsage();
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);

  const handleFilesAccepted = (newFiles: File[]) => {
    if (newFiles.length > 0) {
      setFiles(multiple ? [...files, ...newFiles] : [newFiles[0]]);
      setResultBlob(null);
    }
  };

  const clearFiles = () => {
    setFiles([]);
    setResultBlob(null);
  };

  const handleProcess = async () => {
    if (files.length === 0) return;
    if (!incrementUsage()) return; // Stop if limit reached
    
    setIsProcessing(true);
    try {
      const blob = await onProcess(files);
      setResultBlob(blob);
    } catch (error) {
      console.error(`Failed to execute ${title}:`, error);
      alert(`Failed. ${error instanceof Error ? error.message : "Ensure the file and inputs are correct."}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resultBlob) return;
    const url = URL.createObjectURL(resultBlob);
    const a = document.createElement('a');
    a.href = url;
    
    let extension = 'pdf';
    const type = resultBlob.type;
    if (type.includes('zip')) extension = 'zip';
    else if (type.includes('wordprocessingml') || type.includes('msword')) extension = 'docx';
    else if (type.includes('spreadsheetml') || type.includes('ms-excel')) extension = 'xlsx';
    else if (type.includes('presentationml') || type.includes('ms-powerpoint')) extension = 'pptx';
    else if (type.includes('html')) extension = 'html';
    else if (type.includes('epub')) extension = 'epub';
    else if (type.includes('csv')) extension = 'csv';
    else if (type.includes('text/plain')) extension = 'txt';
    else if (type.includes('image/png')) extension = 'png';
    
    a.download = `darganspdf-${title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.${extension}`;
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
    <div className="w-full flex flex-col items-center border border-border bg-bg-card rounded-2xl p-8 shadow-lg shadow-black/20">
      <AnimatePresence mode="wait">
        {files.length === 0 && !resultBlob ? (
          <motion.div 
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full"
          >
            <UploadZone accept={accept} onFilesAccepted={handleFilesAccepted} multiple={multiple} />
          </motion.div>
        ) : resultBlob ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`w-full p-12 bg-bg-secondary rounded-3xl border ${colorClass.replace('bg-', 'border-').replace('/20', '/30')} text-center flex flex-col items-center ${colorShadowClass}`}
          >
            <div className={`w-20 h-20 ${colorClass} rounded-full flex items-center justify-center mb-6`}>
              <CheckCircle2 className={`w-10 h-10 text-white`} />
            </div>
            <h2 className="text-3xl font-heading font-bold mb-4">Complete!</h2>
            <p className="text-text-muted mb-8">Successfully processed your document(s).</p>
            
            <div className="flex gap-4">
              <MagneticButton onClick={handleDownload} className="!bg-white !text-black border-transparent shadow-lg shadow-white/10 hover:!bg-white/90">
                Download Result
              </MagneticButton>
              <MagneticButton onClick={handleReset} className="bg-transparent border border-border">
                Start Over
              </MagneticButton>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="process"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full flex flex-col items-center"
          >
            <div className={`w-16 h-16 ${colorClass} rounded-2xl flex items-center justify-center mb-6 shadow-xl`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            
            {multiple ? (
               <div className="text-text-muted mb-8">{files.length} files selected.</div>
            ) : (
               <div className="text-text-muted mb-8">{files[0].name} ({(files[0].size / 1024 / 1024).toFixed(2)} MB)</div>
            )}

            {extraInputs && extraInputs(files)}

            {(multiple && !isProcessing) && (
               <div className="w-full mt-4 flex justify-center">
                 <div className="max-w-md w-full scale-90 opacity-80">
                   <UploadZone accept={accept} onFilesAccepted={handleFilesAccepted} multiple={multiple} />
                 </div>
               </div>
            )}

            <div className="flex gap-4 mt-8">
               <button onClick={clearFiles} className="px-6 py-3 text-text-muted hover:text-white transition-colors font-medium">Cancel</button>
               <MagneticButton 
                  onClick={handleProcess}
                  disabled={isProcessing}
                  className={`flex items-center gap-2 ${colorClass.replace('/20', '')} text-white border-transparent ${colorShadowClass} hover:opacity-90`}
                >
                  {isProcessing ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                  ) : (
                    <>{actionText}</>
                  )}
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function RotatePdf() {
  const [rotation, setRotation] = useState<number>(90);
  return (
    <GenericToolShell 
      title="Rotate PDF"
      icon={RotateCw}
      actionText={`Rotate ${rotation}°`}
      colorClass="bg-amber-500/20"
      colorShadowClass="shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)]"
      onProcess={(files) => rotatePdf(files[0], rotation)}
      extraInputs={() => (
        <div className="w-full max-w-sm flex gap-4">
          <button onClick={() => setRotation(90)} className={`flex-1 py-3 border rounded-xl font-medium transition-colors ${rotation === 90 ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'bg-bg-secondary border-border text-text-muted'}`}>90° Right</button>
          <button onClick={() => setRotation(-90)} className={`flex-1 py-3 border rounded-xl font-medium transition-colors ${rotation === -90 ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'bg-bg-secondary border-border text-text-muted'}`}>90° Left</button>
          <button onClick={() => setRotation(180)} className={`flex-1 py-3 border rounded-xl font-medium transition-colors ${rotation === 180 ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'bg-bg-secondary border-border text-text-muted'}`}>180°</button>
        </div>
      )}
    />
  );
}

export function CompressPdf() {
  return (
    <GenericToolShell 
      title="Compress PDF"
      icon={Minimize2}
      actionText="Compress PDF"
      colorClass="bg-amber-500/20"
      colorShadowClass="shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)]"
      onProcess={(files) => compressPdf(files[0], 'medium')}
    />
  );
}

export function PdfToWord() {
  return (
    <GenericToolShell 
      title="PDF to Word"
      icon={FileText}
      actionText="Convert to DOCX"
      colorClass="bg-amber-500/20"
      colorShadowClass="shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)]"
      onProcess={(files) => pdfToWord(files[0])}
    />
  );
}

export function PdfToJpg() {
  return (
    <GenericToolShell 
      title="PDF to JPG"
      icon={FileImage}
      actionText="Convert to JPG"
      colorClass="bg-amber-500/20"
      colorShadowClass="shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)]"
      onProcess={(files) => pdfToJpg(files[0])}
    />
  );
}

export function JpgToPdf() {
  return (
    <GenericToolShell 
      title="JPG to PDF"
      icon={ImageIcon}
      actionText="Create PDF"
      colorClass="bg-amber-500/20"
      colorShadowClass="shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)]"
      accept={{'image/*': ['.jpg', '.jpeg', '.png', '.webp']}}
      multiple={true}
      onProcess={(files) => jpgToPdf(files)}
    />
  );
}

export function WatermarkPdf() {
  const [text, setText] = useState('CONFIDENTIAL');
  return (
    <GenericToolShell 
      title="Add Watermark"
      icon={Droplet}
      actionText="Apply Watermark"
      colorClass="bg-amber-500/20"
      colorShadowClass="shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)]"
      onProcess={(files) => addWatermark(files[0], { text })}
      extraInputs={() => (
        <div className="w-full max-w-sm">
          <label className="block text-sm font-medium text-text-muted mb-2">Watermark Text</label>
          <input 
            type="text" 
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-bg-secondary border border-border focus:border-accent-blue rounded-xl px-4 py-3 outline-none transition-colors"
          />
        </div>
      )}
    />
  );
}

export function SignPdf() {
  const [signatureName, setSignatureName] = useState('');
  return (
    <GenericToolShell 
      title="Sign PDF"
      icon={PenTool}
      actionText="Sign PDF"
      colorClass="bg-amber-500/20"
      colorShadowClass="shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)]"
      onProcess={(files) => signPdf(files[0], { signatureName })}
      extraInputs={() => (
        <div className="w-full max-w-sm">
          <label className="block text-sm font-medium text-text-muted mb-2">Signature Name</label>
          <input 
            type="text" 
            value={signatureName}
            onChange={(e) => setSignatureName(e.target.value)}
            placeholder="John Doe"
            className="w-full bg-bg-secondary border border-border focus:border-accent-purple rounded-xl px-4 py-3 outline-none transition-colors"
          />
        </div>
      )}
    />
  );
}

export function MetadataEditorPdf() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  return (
    <GenericToolShell 
      title="Edit PDF Metadata"
      icon={Settings}
      actionText="Save Metadata"
      colorClass="bg-amber-500/20"
      colorShadowClass="shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)]"
      onProcess={(files) => updateMetadata(files[0], { title, author })}
      extraInputs={() => (
        <div className="w-full max-w-sm space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-bg-secondary border border-border focus:border-orange-500 rounded-xl px-4 py-3 outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Author</label>
            <input 
              type="text" 
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full bg-bg-secondary border border-border focus:border-orange-500 rounded-xl px-4 py-3 outline-none transition-colors"
            />
          </div>
        </div>
      )}
    />
  );
}

export function ExtractTextPdf() {
  return (
    <GenericToolShell 
      title="Extract Text"
      icon={Type}
      actionText="Extract to TXT"
      colorClass="bg-amber-500/20"
      colorShadowClass="shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)]"
      onProcess={(files) => extractText(files[0])}
    />
  );
}

export function RemovePagesPdf() {
  const [pages, setPages] = useState('');
  return (
    <GenericToolShell 
      title="Remove Pages"
      icon={FileMinus}
      actionText="Remove Pages"
      colorClass="bg-amber-500/20"
      colorShadowClass="shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)]"
      onProcess={(files) => removePages(files[0], pages)}
      extraInputs={() => (
        <div className="w-full max-w-sm">
          <label className="block text-sm font-medium text-text-muted mb-2">Pages to Remove (e.g., 1, 3, 5-7)</label>
          <input 
            type="text" 
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            placeholder="1, 2, 3"
            className="w-full bg-bg-secondary border border-border focus:border-red-500 rounded-xl px-4 py-3 outline-none transition-colors"
          />
        </div>
      )}
    />
  );
}

export function ExtractPagesPdf() {
  const [pages, setPages] = useState('');
  return (
    <GenericToolShell 
      title="Extract Pages"
      icon={FileOutput}
      actionText="Extract Pages"
      colorClass="bg-amber-500/20"
      colorShadowClass="shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)]"
      onProcess={(files) => extractPages(files[0], pages)}
      extraInputs={() => (
        <div className="w-full max-w-sm">
          <label className="block text-sm font-medium text-text-muted mb-2">Pages to Keep (e.g., 1, 3)</label>
          <input 
            type="text" 
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            placeholder="1, 2"
            className="w-full bg-bg-secondary border border-border focus:border-sky-500 rounded-xl px-4 py-3 outline-none transition-colors"
          />
        </div>
      )}
    />
  );
}

export function FlattenPdf() {
  return (
    <GenericToolShell 
      title="Flatten PDF"
      icon={Layers}
      actionText="Flatten"
      colorClass="bg-amber-500/20"
      colorShadowClass="shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)]"
      onProcess={(files) => flattenPdf(files[0])}
    />
  );
}

export function AddPageNumbersPdf() {
  return (
    <GenericToolShell 
      title="Add Page Numbers"
      icon={Hash}
      actionText="Add Numbers"
      colorClass="bg-amber-500/20"
      colorShadowClass="shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)]"
      onProcess={(files) => addPageNumbers(files[0])}
    />
  );
}

export function PdfToPng() {
  return (
    <GenericToolShell 
      title="PDF to PNG"
      icon={FileImage}
      actionText="Convert to PNG"
      colorClass="bg-amber-500/20"
      colorShadowClass="shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)]"
      onProcess={(files) => pdfToPng(files[0])}
    />
  );
}

export function RepairPdf() {
  return (
    <GenericToolShell 
      title="Repair PDF"
      icon={Wrench}
      actionText="Attempt Repair"
      colorClass="bg-amber-500/20"
      colorShadowClass="shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)]"
      onProcess={(files) => repairPdf(files[0])}
    />
  );
}

export function ReversePdf() {
  return (
    <GenericToolShell 
      title="Reverse PDF"
      icon={ArrowDownUp}
      actionText="Reverse Pages"
      colorClass="bg-amber-500/20"
      colorShadowClass="shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)]"
      onProcess={(files) => reversePdf(files[0])}
    />
  );
}

export function PngToPdf() { return <GenericToolShell title="PNG to PDF" icon={FileImage} actionText="Create PDF" colorClass="bg-amber-500/20" colorShadowClass="shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)]" accept={{'image/png': ['.png']}} multiple={true} onProcess={(files) => pngToPdf(files[0])} />; }
export function TextToPdf() { return <GenericToolShell title="Text to PDF" icon={Type} actionText="Convert to PDF" colorClass="bg-amber-500/20" colorShadowClass="shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)]" accept={{'text/plain': ['.txt']}} onProcess={(files) => textToPdf(files[0])} />; }
export function CsvToPdf() { return <GenericToolShell title="CSV to PDF" icon={FileText} actionText="Convert to PDF" colorClass="bg-amber-500/20" colorShadowClass="shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)]" accept={{'text/csv': ['.csv']}} onProcess={(files) => csvToPdf(files[0])} />; }
