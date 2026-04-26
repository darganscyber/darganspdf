import { Outlet } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';
import { NoiseOverlay, GridBackground, AmbientOrbs } from './ui/BackgroundFx';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col relative selection:bg-accent-purple/30 selection:text-white">
      <NoiseOverlay />
      <GridBackground />
      
      <Nav />
      
      <main className="flex-1 relative z-10 pt-24 w-full">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}
