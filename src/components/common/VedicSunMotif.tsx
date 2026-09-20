const VedicSunMotif = ({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) => {
  return (
    <div
      className={`vedic-sun-motif ${className}`}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', position: 'relative', ...style }}
    >
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '44px', height: '44px', color: '#c5a059' }}>
        <circle cx="60" cy="60" r="30" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="60" cy="60" r="38" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
        {/* Rays */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 22.5 * Math.PI) / 180;
          const x1 = 60 + 40 * Math.cos(angle);
          const y1 = 60 + 40 * Math.sin(angle);
          const x2 = 60 + 54 * Math.cos(angle);
          const y2 = 60 + 54 * Math.sin(angle);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="2" strokeLinecap="round" />;
        })}
      </svg>
      <span
        style={{
          position: 'absolute',
          color: '#ffffff',
          fontWeight: 800,
          fontSize: '0.85rem',
          fontFamily: 'serif',
          letterSpacing: '0.02em',
          textShadow: '0 1px 2px rgba(0,0,0,0.5)',
        }}
      >
        ओ३म्
      </span>
    </div>
  );
};

export default VedicSunMotif;
