const MandalaPattern = ({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) => {
  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: '100%', height: '100%', opacity: 0.08, pointerEvents: 'none', ...style }}
    >
      <circle cx="250" cy="250" r="230" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
      <circle cx="250" cy="250" r="190" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="250" cy="250" r="150" stroke="currentColor" strokeWidth="2" />
      <circle cx="250" cy="250" r="110" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
      <circle cx="250" cy="250" r="70" stroke="currentColor" strokeWidth="2" />
      
      {/* Petals */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 250 + 70 * Math.cos(angle);
        const y1 = 250 + 70 * Math.sin(angle);
        const x2 = 250 + 190 * Math.cos(angle);
        const y2 = 250 + 190 * Math.sin(angle);
        const cx1 = 250 + 130 * Math.cos(angle - 0.3);
        const cy1 = 250 + 130 * Math.sin(angle - 0.3);
        const cx2 = 250 + 130 * Math.cos(angle + 0.3);
        const cy2 = 250 + 130 * Math.sin(angle + 0.3);
        return (
          <g key={i}>
            <path d={`M ${x1} ${y1} Q ${cx1} ${cy1} ${x2} ${y2}`} stroke="currentColor" strokeWidth="1.2" />
            <path d={`M ${x1} ${y1} Q ${cx2} ${cy2} ${x2} ${y2}`} stroke="currentColor" strokeWidth="1.2" />
          </g>
        );
      })}
      
      {/* Outer Radiating Sun Rays */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * 15 * Math.PI) / 180;
        const x1 = 250 + 190 * Math.cos(angle);
        const y1 = 250 + 190 * Math.sin(angle);
        const x2 = 250 + 225 * Math.cos(angle);
        const y2 = 250 + 225 * Math.sin(angle);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1.5" />;
      })}
    </svg>
  );
};

export default MandalaPattern;
