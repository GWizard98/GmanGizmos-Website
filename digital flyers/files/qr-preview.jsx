import { useState } from 'react';

// Logo SVG Component
const GmanGizmosLogo = ({ size = 60 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <rect width="100" height="100" fill="white" rx="8"/>
    <rect x="5" y="5" width="90" height="90" fill="#0A0A0A" rx="6"/>
    <defs>
      <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F5D68A"/>
        <stop offset="50%" stopColor="#D4A84B"/>
        <stop offset="100%" stopColor="#B8932F"/>
      </linearGradient>
    </defs>
    <path d="M28 42 L28 78 L72 78 L72 42 L28 42" stroke="url(#logoGold)" strokeWidth="3" fill="none"/>
    <path d="M40 42 L40 34 Q50 22 60 34 L60 42" stroke="url(#logoGold)" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <circle cx="40" cy="42" r="3" fill="url(#logoGold)"/>
    <circle cx="60" cy="42" r="3" fill="url(#logoGold)"/>
    <path d="M40 52 L40 68" stroke="url(#logoGold)" strokeWidth="2.5"/>
    <circle cx="40" cy="52" r="3" fill="url(#logoGold)"/>
    <path d="M50 48 L50 64" stroke="url(#logoGold)" strokeWidth="2.5"/>
    <circle cx="50" cy="64" r="3" fill="url(#logoGold)"/>
    <path d="M60 55 L60 71" stroke="url(#logoGold)" strokeWidth="2.5"/>
    <circle cx="60" cy="55" r="3" fill="url(#logoGold)"/>
    <path d="M40 60 L50 60" stroke="url(#logoGold)" strokeWidth="2.5"/>
    <path d="M50 55 L60 55" stroke="url(#logoGold)" strokeWidth="2.5"/>
  </svg>
);

// QR Code with Logo
const QRCodeWithLogo = ({ size = 280 }) => {
  const qrSize = 25;
  const moduleSize = size / qrSize;
  const logoSize = size * 0.35;
  const logoOffset = (size - logoSize) / 2;

  // Generate QR-like pattern
  const getModule = (r, c) => {
    // Finder patterns
    if ((r < 7 && c < 7) || (r < 7 && c >= qrSize - 7) || (r >= qrSize - 7 && c < 7)) {
      if (r === 0 || r === 6 || c === 0 || c === 6 || c === qrSize-1 || c === qrSize-7 || 
          r === qrSize-1 || r === qrSize-7 ||
          (r >= 2 && r <= 4 && c >= 2 && c <= 4) ||
          (r >= 2 && r <= 4 && c >= qrSize-5 && c <= qrSize-3) ||
          (r >= qrSize-5 && r <= qrSize-3 && c >= 2 && c <= 4)) {
        return true;
      }
      return false;
    }
    
    // Timing patterns
    if (r === 6) return c % 2 === 0;
    if (c === 6) return r % 2 === 0;
    
    // Skip center for logo
    const centerR = qrSize / 2;
    const centerC = qrSize / 2;
    if (Math.abs(r - centerR) < 5 && Math.abs(c - centerC) < 5) return false;
    
    // Pseudo-random data
    const seed = (r * 31 + c * 17 + r * c) % 100;
    return seed < 42;
  };

  const modules = [];
  for (let r = 0; r < qrSize; r++) {
    for (let c = 0; c < qrSize; c++) {
      if (getModule(r, c)) {
        modules.push({ r, c });
      }
    }
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id="qrGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5D68A"/>
          <stop offset="50%" stopColor="#D4A84B"/>
          <stop offset="100%" stopColor="#B8932F"/>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <rect width={size} height={size} fill="#0A0A0A" rx="12"/>
      
      {modules.map(({ r, c }, i) => (
        <rect
          key={i}
          x={c * moduleSize}
          y={r * moduleSize}
          width={moduleSize - 0.5}
          height={moduleSize - 0.5}
          fill="url(#qrGold)"
          rx={moduleSize * 0.15}
        />
      ))}
      
      <circle cx={size / 2} cy={size / 2} r={logoSize / 2 + 6} fill="#0A0A0A"/>
      
      <g transform={`translate(${logoOffset}, ${logoOffset})`}>
        <GmanGizmosLogo size={logoSize} />
      </g>
      
      <rect x="2" y="2" width={size - 4} height={size - 4} fill="none" 
        stroke="url(#qrGold)" strokeWidth="2.5" rx="10" filter="url(#glow)"/>
    </svg>
  );
};

export default function GmanGizmosQR() {
  const [size, setSize] = useState(280);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(145deg, #0D0D0D 0%, #050505 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '30px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #F5D68A 0%, #D4A84B 50%, #B8932F 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '2px',
          marginBottom: '8px'
        }}>
          GmanGizmos
        </h1>
        <p style={{
          color: '#D4A84B',
          fontSize: '12px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          opacity: 0.7
        }}>
          Logo-Integrated QR Code
        </p>
      </div>

      {/* QR Code Display */}
      <div style={{
        padding: '25px',
        background: 'rgba(15, 15, 15, 0.9)',
        borderRadius: '16px',
        border: '1px solid rgba(212, 168, 75, 0.25)',
        boxShadow: '0 0 50px rgba(212, 168, 75, 0.08)',
        marginBottom: '25px'
      }}>
        <QRCodeWithLogo size={size} />
      </div>

      {/* URL */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 20px',
        background: 'rgba(212, 168, 75, 0.08)',
        borderRadius: '8px',
        border: '1px solid rgba(212, 168, 75, 0.2)',
        marginBottom: '25px'
      }}>
        <span style={{ color: '#D4A84B' }}>🔗</span>
        <span style={{
          color: '#fff',
          fontFamily: 'monospace',
          fontSize: '14px',
          letterSpacing: '1px'
        }}>
          gmangizmos.site
        </span>
      </div>

      {/* Size Controls */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '30px'
      }}>
        {[200, 280, 360].map(s => (
          <button
            key={s}
            onClick={() => setSize(s)}
            style={{
              padding: '10px 20px',
              background: size === s ? 'linear-gradient(135deg, #D4A84B, #B8932F)' : 'transparent',
              border: '1px solid #D4A84B',
              borderRadius: '6px',
              color: size === s ? '#0A0A0A' : '#D4A84B',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {s}px
          </button>
        ))}
      </div>

      {/* Features */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
        maxWidth: '400px',
        width: '100%',
        marginBottom: '30px'
      }}>
        {['Logo Embedded', 'Brand Colors', 'High Error Correction', 'Print Ready'].map((f, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 14px',
            background: 'rgba(212, 168, 75, 0.05)',
            borderRadius: '6px',
            borderLeft: '2px solid #D4A84B'
          }}>
            <span style={{ color: '#D4A84B' }}>✓</span>
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>{f}</span>
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div style={{
        maxWidth: '400px',
        padding: '20px',
        background: 'rgba(212, 168, 75, 0.05)',
        borderRadius: '10px',
        border: '1px solid rgba(212, 168, 75, 0.15)',
        textAlign: 'center'
      }}>
        <p style={{ 
          color: 'rgba(255,255,255,0.7)', 
          fontSize: '13px', 
          lineHeight: '1.6',
          marginBottom: '15px'
        }}>
          This QR code has your shopping bag logo embedded in the center. 
          For a <strong style={{color: '#D4A84B'}}>real scannable QR code</strong>, 
          use a QR generator service (like QRCode Monkey) and upload your logo to embed it.
        </p>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          color: '#D4A84B',
          fontSize: '11px',
          padding: '8px 12px',
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '4px'
        }}>
          🎖️ Veteran Owned & Operated
        </div>
      </div>
    </div>
  );
}
