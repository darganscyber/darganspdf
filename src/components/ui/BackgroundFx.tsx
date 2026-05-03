export function NoiseOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.04] mix-blend-overlay">
      <svg className="absolute inset-0 h-full w-full">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}

export function GridBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-full w-full"
         style={{
           backgroundImage: 'radial-gradient(circle at center, rgba(245,158,11,0.04) 1px, transparent 1px)',
           backgroundSize: '40px 40px'
         }}
    />
  );
}

export function AmbientOrbs() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none transform-gpu">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/15 blur-[120px] mix-blend-screen" />
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-orange-500/10 blur-[130px] mix-blend-screen" />
      <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] rounded-full bg-amber-300/10 blur-[140px] mix-blend-screen" />
    </div>
  );
}
