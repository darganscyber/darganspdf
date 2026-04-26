import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-border mt-24 py-16 px-6 relative overflow-hidden bg-bg-secondary">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="text-2xl font-bold font-heading tracking-tight mb-4 inline-block">
            <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
              Dargans
            </span>
            <span className="text-text-primary">PDF</span>
          </Link>
          <p className="text-text-muted text-sm max-w-sm mb-6">
            {t('home.footerText')}
          </p>
          <p className="text-xs text-text-muted/60 opacity-80 subtle-obs">Built with obsession.</p>
        </div>
        
        <div>
          <h4 className="font-heading font-semibold mb-4">Product</h4>
          <ul className="space-y-2 text-sm text-text-muted">
            <li><Link to="/#tools" className="hover:text-accent-blue transition-colors">All Tools</Link></li>
            <li><a href="https://github.com/your-username/dargans-pdf" target="_blank" rel="noopener noreferrer" className="hover:text-accent-blue transition-colors">GitHub</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-heading font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-text-muted">
            <li><a href="#" className="hover:text-accent-blue transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-accent-blue transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-accent-blue transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
