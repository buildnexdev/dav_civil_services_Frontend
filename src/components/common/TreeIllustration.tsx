const TreeIllustration = ({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) => {
  return (
    <svg
      viewBox="0 0 400 450"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: '100%', height: 'auto', maxWidth: '380px', ...style }}
    >
      <defs>
        <linearGradient id="trunkGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#2C1B12" />
          <stop offset="50%" stopColor="#5C4030" />
          <stop offset="100%" stopColor="#8A6F55" />
        </linearGradient>

        <linearGradient id="leafGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A8896C" />
          <stop offset="60%" stopColor="#8A6F55" />
          <stop offset="100%" stopColor="#5C4030" />
        </linearGradient>

        <linearGradient id="leafGradRight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C5A059" />
          <stop offset="70%" stopColor="#A8896C" />
          <stop offset="100%" stopColor="#3D2A1F" />
        </linearGradient>

        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Sun glow ring behind tree */}
      <circle cx="200" cy="180" r="140" fill="url(#leafGradRight)" opacity="0.08" />
      <circle cx="200" cy="180" r="100" stroke="#A8896C" strokeWidth="1" strokeDasharray="4 4" opacity="0.25" />

      {/* Tree trunk and roots */}
      <g stroke="url(#trunkGrad)" strokeLinecap="round">
        <path d="M200 420 C190 380 180 340 180 290 C180 250 170 210 160 180 C150 150 130 130 110 120" strokeWidth="8" />
        <path d="M200 420 C210 380 220 340 220 290 C220 250 230 210 240 180 C250 150 270 130 290 120" strokeWidth="8" />
        <path d="M180 290 C160 270 140 250 120 240" strokeWidth="6" />
        <path d="M220 290 C240 270 260 250 280 240" strokeWidth="6" />
        <path d="M200 420 C160 435 120 445 80 448" strokeWidth="5" />
        <path d="M200 420 C240 435 280 445 320 448" strokeWidth="5" />
        <path d="M190 220 C175 190 155 170 140 160" strokeWidth="4" />
        <path d="M210 220 C225 190 245 170 260 160" strokeWidth="4" />
      </g>

      {/* Leaves Cluster Left */}
      <g fill="url(#leafGradLeft)" opacity="0.9">
        <path d="M110 115 C90 100 70 110 60 130 C50 150 70 170 90 160 C110 150 120 130 110 115 Z" stroke="#F3EBE1" strokeWidth="0.8" />
        <path d="M70 160 C50 150 30 170 30 190 C30 210 50 220 80 200 Z" stroke="#F3EBE1" strokeWidth="0.8" />
        <path d="M120 80 C100 60 70 70 60 90 C50 110 80 130 100 110 Z" stroke="#F3EBE1" strokeWidth="0.8" />
        <path d="M160 100 C140 70 110 80 100 100 C90 120 120 140 140 120 Z" stroke="#F3EBE1" strokeWidth="0.8" />
        <path d="M140 180 C120 170 100 190 100 210 C100 230 130 230 140 200 Z" stroke="#F3EBE1" strokeWidth="0.8" />
      </g>

      {/* Leaves Cluster Center */}
      <g fill="url(#leafGradRight)" opacity="0.95">
        <path d="M200 60 C180 30 140 40 140 70 C140 100 180 110 200 80 Z" stroke="#F3EBE1" strokeWidth="0.8" />
        <path d="M220 70 C240 40 280 50 280 80 C280 110 240 120 220 90 Z" stroke="#F3EBE1" strokeWidth="0.8" />
        <path d="M200 110 C170 90 150 120 160 150 C170 180 210 170 200 130 Z" stroke="#F3EBE1" strokeWidth="0.8" />
      </g>

      {/* Leaves Cluster Right */}
      <g fill="url(#leafGradLeft)" opacity="0.9">
        <path d="M290 115 C310 100 330 110 340 130 C350 150 330 170 310 160 C290 150 280 130 290 115 Z" stroke="#F3EBE1" strokeWidth="0.8" />
        <path d="M330 160 C350 150 370 170 370 190 C370 210 350 220 320 200 Z" stroke="#F3EBE1" strokeWidth="0.8" />
        <path d="M280 80 C300 60 330 70 340 90 C350 110 320 130 300 110 Z" stroke="#F3EBE1" strokeWidth="0.8" />
        <path d="M240 100 C260 70 290 80 300 100 C310 120 280 140 260 120 Z" stroke="#F3EBE1" strokeWidth="0.8" />
        <path d="M260 180 C280 170 300 190 300 210 C300 230 270 230 260 200 Z" stroke="#F3EBE1" strokeWidth="0.8" />
      </g>
    </svg>
  );
};

export default TreeIllustration;
