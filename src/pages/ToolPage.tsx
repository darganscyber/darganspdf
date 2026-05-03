import { useParams, Navigate } from 'react-router-dom';
import { ALL_TOOLS } from '@/data/tools';
import { MergePdf } from './tools/MergePdf';
import { SplitPdf } from './tools/SplitPdf';
import { 
  RotatePdf, CompressPdf, 
  PdfToWord, PdfToJpg, JpgToPdf, WatermarkPdf, 
  SignPdf, MetadataEditorPdf, 
  ExtractTextPdf, RemovePagesPdf, ExtractPagesPdf,
  FlattenPdf, AddPageNumbersPdf, PdfToPng, RepairPdf, ReversePdf,
  PngToPdf, 
  TextToPdf, CsvToPdf
} from './tools/SimplePdfTools';

export default function ToolPage() {
  const { id } = useParams<{ id: string }>();
  const tool = ALL_TOOLS.find(t => t.id === id);

  if (!tool) {
    return <Navigate to="/" replace />;
  }

  // Render specific tool component
  let ToolComponent;
  switch (id) {
    case 'merge-pdf': ToolComponent = MergePdf; break;
    case 'split-pdf': ToolComponent = SplitPdf; break;
    case 'compress-pdf': ToolComponent = CompressPdf; break;
    case 'pdf-to-word': ToolComponent = PdfToWord; break;
    case 'pdf-to-jpg': ToolComponent = PdfToJpg; break;
    case 'jpg-to-pdf': ToolComponent = JpgToPdf; break;
    case 'protect-pdf': ToolComponent = ProtectPdf; break;
    case 'unlock-pdf': ToolComponent = UnlockPdf; break;
    case 'rotate-pdf': ToolComponent = RotatePdf; break;
    case 'add-watermark': ToolComponent = WatermarkPdf; break;
    case 'sign-pdf': ToolComponent = SignPdf; break;
    case 'edit-metadata': ToolComponent = MetadataEditorPdf; break;
    case 'remove-pages': ToolComponent = RemovePagesPdf; break;
    case 'extract-pages': ToolComponent = ExtractPagesPdf; break;
    case 'flatten-pdf': ToolComponent = FlattenPdf; break;
    case 'add-page-numbers': ToolComponent = AddPageNumbersPdf; break;
    case 'pdf-to-png': ToolComponent = PdfToPng; break;
    case 'repair-pdf': ToolComponent = RepairPdf; break;
    case 'reverse-pdf': ToolComponent = ReversePdf; break;
    case 'word-to-pdf': ToolComponent = WordToPdf; break;
    case 'png-to-pdf': ToolComponent = PngToPdf; break;
    case 'pdf-to-excel': ToolComponent = PdfToExcel; break;
    case 'excel-to-pdf': ToolComponent = ExcelToPdf; break;
    case 'pdf-to-ppt': ToolComponent = PdfToPpt; break;
    case 'ppt-to-pdf': ToolComponent = PptToPdf; break;
    case 'pdf-to-text': ToolComponent = ExtractTextPdf; break;
    case 'text-to-pdf': ToolComponent = TextToPdf; break;
    case 'html-to-pdf': ToolComponent = HtmlToPdf; break;
    case 'pdf-to-html': ToolComponent = PdfToHtml; break;
    case 'epub-to-pdf': ToolComponent = EpubToPdf; break;
    case 'pdf-to-epub': ToolComponent = PdfToEpub; break;
    case 'csv-to-pdf': ToolComponent = CsvToPdf; break;
    default:
      ToolComponent = () => (
        <div className="flex flex-col items-center justify-center py-24 text-center border border-border bg-bg-card rounded-2xl">
          <tool.icon className="w-16 h-16 text-text-muted mb-6 opacity-50" />
          <h2 className="text-3xl font-heading font-bold mb-4">Under Construction</h2>
          <p className="text-text-muted max-w-md">This tool is currently being built. Please check back later.</p>
        </div>
      );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-white">
          {tool.name}
        </h1>
        <p className="text-xl text-text-muted mb-4">{tool.description}</p>
        {tool.isPro && (
          <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/30 text-xs font-mono font-bold uppercase tracking-wider">
            Pro Feature
          </span>
        )}
      </div>

      <ToolComponent />
    </div>
  );
}
