// 6. Order tracking
function ScreenTracking({ onBack, onDetail }) {
  const steps = [
    { id: 'confirmed', label: 'Pedido confirmado', time: '19:32', status: 'done' },
    { id: 'preparing', label: 'Preparando en cocina', time: '19:38', status: 'done' },
    { id: 'enroute', label: 'En camino contigo', time: '19:51', status: 'active' },
    { id: 'delivered', label: 'Entregado', time: '', status: 'pending' },
  ];

  return (
    <FPPhone>
      <FPStatusBar/>
      <FPHeader title="Tu pedido" onBack={onBack}/>
      <style>{`
        @keyframes fp-pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(2.6); opacity: 0; } }
        @keyframes fp-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
      `}</style>
      <div style={{ flex: 1, overflow: 'auto', padding: '0 24px 100px' }}>
        {/* Rider illustration */}
        <div style={{
          height: 180, borderRadius: FP.r.xl, position: 'relative',
          background: 'radial-gradient(circle at 50% 60%, rgba(230,57,70,0.18) 0%, transparent 60%), linear-gradient(135deg, #1A1A1F, #232328)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: `1px solid ${FP.border}`, overflow: 'hidden',
        }}>
          {/* dotted road */}
          <svg viewBox="0 0 300 60" width="100%" height="40" style={{ position: 'absolute', bottom: 18, opacity: 0.4 }}>
            <path d="M0 30 Q 75 0, 150 30 T 300 30" fill="none" stroke={FP.accent} strokeWidth="2" strokeDasharray="6 6"/>
          </svg>
          {/* delivery rider — flat icon */}
          <div style={{ animation: 'fp-bob 1.6s ease-in-out infinite', position: 'relative' }}>
            <svg width="120" height="100" viewBox="0 0 120 100" fill="none">
              {/* helmet + head */}
              <circle cx="48" cy="22" r="11" fill="#E63946"/>
              <rect x="40" y="18" width="16" height="6" rx="1" fill="#0F0F12"/>
              {/* body */}
              <path d="M40 32 L 56 32 L 60 56 L 36 56 Z" fill="#fff"/>
              {/* bag */}
              <rect x="58" y="36" width="22" height="22" rx="3" fill="#E63946"/>
              <rect x="65" y="42" width="8" height="8" fill="#fff" opacity="0.6"/>
              {/* arm holding handle */}
              <path d="M40 40 L 28 50" stroke="#fff" strokeWidth="5" strokeLinecap="round"/>
              {/* moto body */}
              <path d="M18 70 L 30 60 L 70 60 L 88 70 L 88 78 L 18 78 Z" fill="#22222A"/>
              <path d="M30 60 L 36 56 L 56 56 L 60 60" stroke="#E63946" strokeWidth="3" strokeLinecap="round"/>
              {/* wheels */}
              <circle cx="28" cy="80" r="10" fill="#0F0F12" stroke="#fff" strokeWidth="2"/>
              <circle cx="78" cy="80" r="10" fill="#0F0F12" stroke="#fff" strokeWidth="2"/>
              <circle cx="28" cy="80" r="3" fill="#9A9AA0"/>
              <circle cx="78" cy="80" r="3" fill="#9A9AA0"/>
            </svg>
          </div>
        </div>

        {/* Order info card */}
        <div style={{ marginTop: 16, padding: 16, background: FP.card, borderRadius: FP.r.lg, border: `1px solid ${FP.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, color: FP.textMuted, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>Pedido</div>
              <div style={{ fontSize: 18, fontWeight: 700, marginTop: 2, letterSpacing: -0.3 }}>#FP-1042</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: FP.textMuted, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>Llegada</div>
              <div style={{ fontSize: 18, fontWeight: 700, marginTop: 2, color: FP.accent, letterSpacing: -0.3 }}>25–35 min</div>
            </div>
          </div>
        </div>

        {/* Stepper */}
        <div style={{ marginTop: 20, padding: '4px 4px' }}>
          {steps.map((s, i) => {
            const isLast = i === steps.length - 1;
            const isActive = s.status === 'active';
            const isDone = s.status === 'done';
            const isPending = s.status === 'pending';
            const dotColor = isActive ? FP.accent : isDone ? FP.success : 'transparent';
            const labelColor = isPending ? FP.textDim : '#fff';
            return (
              <div key={s.id} style={{ display: 'flex', gap: 14, position: 'relative', paddingBottom: isLast ? 0 : 18 }}>
                <div style={{ width: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%', background: dotColor,
                    border: isPending ? `2px solid ${FP.borderStrong}` : 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
                  }}>
                    {isDone && <FPIcons.check size={12}/>}
                    {isActive && (
                      <>
                        <div style={{
                          position: 'absolute', inset: 0, borderRadius: '50%',
                          background: FP.accent, animation: 'fp-pulse 1.6s ease-out infinite',
                        }}/>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff', position: 'relative' }}/>
                      </>
                    )}
                  </div>
                  {!isLast && (
                    <div style={{
                      flex: 1, width: 2, marginTop: 4,
                      background: isDone ? FP.success : FP.border, minHeight: 24,
                    }}/>
                  )}
                </div>
                <div style={{ flex: 1, paddingTop: 2 }}>
                  <div style={{
                    fontSize: 14, fontWeight: isActive ? 700 : 600, color: labelColor,
                    letterSpacing: -0.2,
                  }}>{s.label}</div>
                  {s.time && <div style={{ fontSize: 12, color: FP.textMuted, marginTop: 2 }}>{s.time}</div>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Map */}
        <div style={{
          marginTop: 20, height: 160, borderRadius: FP.r.lg, position: 'relative',
          background: 'linear-gradient(135deg, #18222A, #1A1A1F)', overflow: 'hidden',
          border: `1px solid ${FP.border}`,
        }}>
          {/* grid streets */}
          <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.15 }}>
            <defs>
              <pattern id="streets" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 0 20 L 40 20 M 20 0 L 20 40" stroke="#fff" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#streets)"/>
          </svg>
          {/* route */}
          <svg viewBox="0 0 340 160" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
            <path d="M40 130 Q 100 60, 180 90 T 300 40" fill="none" stroke={FP.accent} strokeWidth="3" strokeDasharray="6 4" strokeLinecap="round"/>
          </svg>
          {/* rider start */}
          <div style={{ position: 'absolute', left: 30, bottom: 22, width: 14, height: 14, borderRadius: '50%', background: '#fff', border: `3px solid ${FP.accent}` }}/>
          {/* destination pin */}
          <div style={{ position: 'absolute', right: 24, top: 22 }}>
            <FPIcons.pin/>
          </div>
        </div>

        {/* Driver card */}
        <div style={{
          marginTop: 16, padding: 14, background: FP.card, borderRadius: FP.r.lg,
          border: `1px solid ${FP.border}`, display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: FP.r.full,
            background: 'linear-gradient(135deg, #4A6B7A, #2C3E50)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: 16,
          }}>JP</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: -0.2 }}>Juan Pérez</div>
            <div style={{ fontSize: 12, color: FP.textMuted, marginTop: 2 }}>Moto · patente XX-1234</div>
          </div>
          <button style={{
            width: 40, height: 40, borderRadius: FP.r.full, background: FP.accent,
            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <FPIcons.phone/>
          </button>
          <button style={{
            width: 40, height: 40, borderRadius: FP.r.full, background: FP.cardElev,
            border: `1px solid ${FP.border}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <FPIcons.message/>
          </button>
        </div>

        <div style={{ marginTop: 18 }}>
          <FPButton variant="outline" onClick={onDetail}>Ver detalle del pedido</FPButton>
        </div>
      </div>
      <FPHomeIndicator/>
    </FPPhone>
  );
}

window.ScreenTracking = ScreenTracking;
