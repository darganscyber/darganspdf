import { 
  Combine, SplitSquareHorizontal, FileDown, FileText, 
  Image as ImageIcon, Replace, Lock, Unlock, 
  RotateCw, Droplet, PenTool, Edit3, Type,
  FileMinus, FileOutput, Layers, Hash,
  FileImage, Wrench, ArrowDownUp,
  FileBox, FileCode, Book, Table, Presentation, FileSpreadsheet, ImagePlus
} from 'lucide-react';

export const ALL_TOOLS = [
  // Core PDF Tools
  {
    id: 'merge-pdf',
    name: 'Merge PDF',
    description: 'Combine multiple PDFs into a single, unified document.',
    icon: Combine,
    isPro: false,
    color: 'from-amber-400 to-amber-600',
    category: 'Core PDF Tools'
  },
  {
    id: 'split-pdf',
    name: 'Split PDF',
    description: 'Extract pages or split a large PDF into smaller ones.',
    icon: SplitSquareHorizontal,
    isPro: false,
    color: 'from-amber-400 to-amber-600',
    category: 'Core PDF Tools'
  },
  {
    id: 'compress-pdf',
    name: 'Compress PDF',
    description: 'Reduce file size while keeping visual quality intact.',
    icon: FileDown,
    isPro: false,
    color: 'from-amber-400 to-amber-600',
    category: 'Core PDF Tools'
  },  {
    id: 'pdf-to-jpg',
    name: 'PDF to JPG',
    description: 'Extract every page of your PDF as high-quality images.',
    icon: ImageIcon,
    isPro: false,
    color: 'from-amber-400 to-amber-600',
    category: 'Core PDF Tools'
  },
  {
    id: 'jpg-to-pdf',
    name: 'JPG to PDF',
    description: 'Convert images to a combined PDF document seamlessly.',
    icon: Replace,
    isPro: false,
    color: 'from-amber-400 to-amber-600',
    category: 'Core PDF Tools'
  },
  {
    id: 'pdf-to-png',
    name: 'PDF to PNG',
    description: 'Convert PDF pages into transparent PNG images.',
    icon: FileImage,
    isPro: false,
    color: 'from-amber-400 to-amber-600',
    category: 'Core PDF Tools'
  },
  {
    id: 'png-to-pdf',
    name: 'PNG to PDF',
    description: 'Convert PNG images into a PDF document.',
    icon: ImagePlus,
    isPro: false,
    color: 'from-amber-400 to-amber-600',
    category: 'Core PDF Tools'
  },
  // Conversion Tools
  {
    id: 'pdf-to-text',
    name: 'PDF to Text',
    description: 'Instantly extract raw text from your PDF.',
    icon: Type,
    isPro: false,
    color: 'from-amber-400 to-amber-600',
    category: 'Conversion Tools'
  },
  {
    id: 'text-to-pdf',
    name: 'Text to PDF',
    description: 'Convert raw text files into PDF documents.',
    icon: Type,
    isPro: false,
    color: 'from-amber-400 to-amber-600',
    category: 'Conversion Tools'
  },  {
    id: 'csv-to-pdf',
    name: 'CSV to PDF',
    description: 'Convert CSV data files into PDF format.',
    icon: Table,
    isPro: false,
    color: 'from-amber-400 to-amber-600',
    category: 'Conversion Tools'
  },

  // Security & Manage Tools
  {
    id: 'rotate-pdf',
    name: 'Rotate PDF',
    description: 'Rotate specific pages or all pages effortlessly.',
    icon: RotateCw,
    isPro: false,
    color: 'from-amber-400 to-amber-600',
    category: 'Manage Tools'
  },
  {
    id: 'watermark-pdf',
    name: 'Add Watermark',
    description: 'Stamp your PDF with text or an image watermark.',
    icon: Droplet,
    isPro: false,
    color: 'from-amber-400 to-amber-600',
    category: 'Manage Tools'
  },
  {
    id: 'sign-pdf',
    name: 'Sign PDF',
    description: 'Add your electronic signature to any PDF document.',
    icon: PenTool,
    isPro: false,
    color: 'from-amber-400 to-amber-600',
    category: 'Manage Tools'
  },
  {
    id: 'edit-metadata',
    name: 'Metadata Editor',
    description: 'Modify title, author, keywords, and other file metadata.',
    icon: Edit3,
    isPro: false,
    color: 'from-amber-400 to-amber-600',
    category: 'Manage Tools'
  },
  {
    id: 'remove-pages',
    name: 'Remove Pages',
    description: 'Delete unwanted pages from your document.',
    icon: FileMinus,
    isPro: false,
    color: 'from-amber-400 to-amber-600',
    category: 'Manage Tools'
  },
  {
    id: 'extract-pages',
    name: 'Extract Pages',
    description: 'Keep only the pages you want.',
    icon: FileOutput,
    isPro: false,
    color: 'from-amber-400 to-amber-600',
    category: 'Manage Tools'
  },
  {
    id: 'flatten-pdf',
    name: 'Flatten PDF',
    description: 'Make forms and annotations permanent and uneditable.',
    icon: Layers,
    isPro: false,
    color: 'from-amber-400 to-amber-600',
    category: 'Manage Tools'
  },
  {
    id: 'add-page-numbers',
    name: 'Page Numbers',
    description: 'Insert page numbers into your PDF automatically.',
    icon: Hash,
    isPro: false,
    color: 'from-amber-400 to-amber-600',
    category: 'Manage Tools'
  },
  {
    id: 'repair-pdf',
    name: 'Repair PDF',
    description: 'Attempt to fix corrupted or broken PDF structures.',
    icon: Wrench,
    isPro: false,
    color: 'from-amber-400 to-amber-600',
    category: 'Manage Tools'
  },
  {
    id: 'reverse-pdf',
    name: 'Reverse PDF',
    description: 'Reverse the order of pages in your document.',
    icon: ArrowDownUp,
    isPro: false,
    color: 'from-amber-400 to-amber-600',
    category: 'Manage Tools'
  }
];
