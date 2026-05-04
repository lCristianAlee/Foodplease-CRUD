// FoodPlease — Driver app (4 screens)

const DRIVER_ICONS = {
  rut: ({ color = '#9A9AA0' }) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="4" width="14" height="10" rx="2" stroke={color} strokeWidth="1.5"/>
      <circle cx="6.5" cy="9" r="1.5" stroke={color} strokeWidth="1.4"/>
      <path d="M10 8h4M10 11h3" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  lock: ({ color = '#9A9AA0' }) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="3" y="8" width="12" height="8" rx="2" stroke={color} strokeWidth="1.5"/>
      <path d="M5.5 8V5.5a3.5 3.5 0 0 1 7 0V8" stroke={color} strokeWidth="1.5"/>
    </svg>
  ),
  navHome: ({ color = '#9A9AA0' }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1v-9z" stroke={color} strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  ),
  navOrders: ({ color = '#9A9AA0' }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="5" y="4" width="14" height="16" rx="2" stroke={color} strokeWidth="1.6"/>
      <path d="M9 9h6M9 13h6M9 17h4" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  navEarn: ({ color = '#9A9AA0' }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 18l5-6 4 3 8-9" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 6h4v4" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  navProfile: ({ color = '#9A9AA0' }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="9" r="3.5" stroke={color} strokeWidth="1.6"/>
      <path d="M5 20c1-4 4-6 7-6s6 2 7 6" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
};

// R1 — Driver Login
function DriverLogin({ onConnect }) {
  const [rut, setRut] = React.useState('12.345.678-9');
  const [pwd, setPwd] = React.useState('••••••••');
  const [keep, setKeep] = React.useState(true);
  const [show, setShow] = React.useState(false);

  return (
    <FPPhone>
      <FPStatusBar/>
      <FPHeader title="Soy repartidor" onBack={() => {}}/>
      <div style={{ flex: 1, padding: '0 24px', overflow: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 8 }}>
          <div style={{
            width: 100, height: 100, borderRadius: '50%',
            background: 'linear-gradient(135deg, #E63946, #8B1A26)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 36, fontWeight: 800, position: 'relative',
            boxShadow: '0 12px 32px rgba(230,57,70,0.4)',
          }}>
            JP
            <div style={{
              position: 'absolute', bottom: 2, right: 2, width: 24, height: 24,
              borderRadius: '50%', background: FP.success, border: `3px solid ${FP.bg}`,
            }}/>
          </div>
          <div style={{ marginTop: 16, fontSize: 22, fontWeight: 700, letterSpacing: -0.4 }}>
            Bienvenido de vuelta
          </div>
          <div style={{ marginTop: 4, fontSize: 13, color: FP.textMuted }}>
            Conéctate para empezar tu turno
          </div>
        </div>

        <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Field label="RUT del repartidor" value={rut} onChange={setRut} icon={<DRIVER_ICONS.rut/>}/>
          <Field label="Contraseña" value={pwd} onChange={setPwd} type={show ? 'text' : 'password'}
            icon={<DRIVER_ICONS.lock/>}
            trailing={
              <button onClick={() => setShow(!show)} style={{
                background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, display: 'flex',
              }}><FPIcons.eye off={!show}/></button>
            }/>
        </div>

        {/* Switch */}
        <div style={{
          marginTop: 20, padding: '14px 16px', borderRadius: 12, background: FP.card,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: 14, fontWeight: 500 }}>Mantener sesión iniciada</span>
          <button onClick={() => setKeep(!keep)} style={{
            width: 46, height: 28, borderRadius: 14, border: 'none', cursor: 'pointer',
            background: keep ? FP.accent : 'rgba(255,255,255,0.18)',
            position: 'relative', transition: 'background 0.15s', padding: 0,
          }}>
            <div style={{
              position: 'absolute', top: 3, left: keep ? 21 : 3, width: 22, height: 22,
              borderRadius: 11, background: '#fff', transition: 'left 0.15s',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}/>
          </button>
        </div>

        <div style={{ marginTop: 24 }}>
          <FPButton onClick={onConnect}>Conectarme</FPButton>
        </div>

        <div style={{
          marginTop: 16, fontSize: 11, color: FP.textDim, textAlign: 'center', lineHeight: 1.5, padding: '0 12px',
        }}>
          Al conectarte aceptas estar disponible para recibir pedidos.
        </div>
      </div>
      <FPHomeIndicator/>
    </FPPhone>
  );
}

function Field({ label, value, onChange, icon, trailing, type = 'text' }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <div style={{
      height: 60, borderRadius: 12, background: FP.card,
      border: `1.5px solid ${focus ? FP.accent : 'transparent'}`,
      padding: '0 14px', display: 'flex', alignItems: 'center', gap: 10,
      transition: 'border-color 0.15s',
    }}>
      {icon}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11, color: focus ? FP.accent : FP.textMuted, fontWeight: 500 }}>{label}</div>
        <input
          type={type} value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{
            width: '100%', background: 'transparent', border: 'none', outline: 'none',
            color: '#fff', fontSize: 14, fontFamily: FP.font, padding: '2px 0', letterSpacing: -0.1,
          }}/>
      </div>
      {trailing}
    </div>
  );
}

// R2 — Incoming order modal
function DriverIncoming({ onAccept, onReject }) {
  const [seconds, setSeconds] = React.useState(15);
  React.useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);
  const pct = seconds / 15;
  const C = 2 * Math.PI * 38;

  return (
    <FPPhone bg="#0F0F12">
      {/* Backdrop showing dimmed home behind */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.18 }}>
        <ScreenHome onDish={() => {}} onTab={() => {}} cartCount={0}/>
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,15,18,0.85)', backdropFilter: 'blur(8px)' }}/>
      <FPStatusBar/>

      <div style={{ flex: 1, padding: '8px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        {/* Modal */}
        <div style={{
          width: '100%', background: FP.card, borderRadius: 24, padding: '24px 20px 20px',
          border: `1px solid ${FP.border}`,
          boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
        }}>
          {/* Title + countdown */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <div style={{ position: 'relative', width: 88, height: 88 }}>
              <svg width="88" height="88" viewBox="0 0 88 88" style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
                <circle cx="44" cy="44" r="38" stroke="rgba(255,255,255,0.1)" strokeWidth="5" fill="none"/>
                <circle cx="44" cy="44" r="38" stroke={FP.accent} strokeWidth="5" fill="none"
                  strokeDasharray={C} strokeDashoffset={C * (1 - pct)} strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 1s linear' }}/>
              </svg>
              <div style={{
                position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 26, fontWeight: 800, letterSpacing: -0.6, color: FP.accent,
              }}>{seconds}s</div>
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.3, textAlign: 'center' }}>
              ¡Nuevo pedido disponible!
            </div>
          </div>

          {/* Stats row */}
          <div style={{
            marginTop: 18, padding: '14px 0', display: 'grid', gridTemplateColumns: '1fr 1fr',
            background: FP.cardElev, borderRadius: 12,
          }}>
            <div style={{ textAlign: 'center', borderRight: `1px solid ${FP.border}` }}>
              <div style={{ fontSize: 11, color: FP.textMuted, fontWeight: 600, letterSpacing: 0.4, textTransform: 'uppercase' }}>Distancia</div>
              <div style={{ fontSize: 20, fontWeight: 800, marginTop: 4, letterSpacing: -0.4 }}>2.4 km</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: FP.textMuted, fontWeight: 600, letterSpacing: 0.4, textTransform: 'uppercase' }}>Ganancia</div>
              <div style={{ fontSize: 20, fontWeight: 800, marginTop: 4, letterSpacing: -0.4, color: FP.accent }}>$3.500</div>
            </div>
          </div>

          {/* Pickup */}
          <div style={{ marginTop: 14, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div style={{ width: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, paddingTop: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: FP.accent }}/>
              <div style={{ width: 2, flex: 1, background: FP.border, marginTop: 2, minHeight: 22 }}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: FP.textMuted, fontWeight: 600, letterSpacing: 0.4, textTransform: 'uppercase' }}>Recoger en</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginTop: 2 }}>FoodPlease — Sucursal Providencia</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginTop: 4 }}>
            <div style={{ width: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, paddingTop: 4 }}>
              <FPIcons.pin size={16}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: FP.textMuted, fontWeight: 600, letterSpacing: 0.4, textTransform: 'uppercase' }}>Entregar en</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginTop: 2 }}>Av. Los Leones 2280, Providencia</div>
            </div>
          </div>

          {/* Items */}
          <div style={{ marginTop: 14, padding: 12, background: FP.cardElev, borderRadius: 12 }}>
            <div style={{ fontSize: 11, color: FP.textMuted, fontWeight: 600, letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 8 }}>3 ítems</div>
            {[
              { n: 'Pasta Boloñesa', q: 1 },
              { n: 'Risotto de Hongos', q: 2 },
              { n: 'Tiramisú', q: 1 },
            ].map(it => (
              <div key={it.n} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '4px 0' }}>
                <span>{it.n}</span>
                <span style={{ color: FP.textMuted, fontWeight: 600 }}>×{it.q}</span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <FPButton onClick={onAccept}>Aceptar pedido</FPButton>
            <FPButton variant="outline" onClick={onReject}>Rechazar</FPButton>
          </div>
        </div>
      </div>
      <FPHomeIndicator/>
    </FPPhone>
  );
}

// R3 — Active route
function DriverRoute({ onDelivered }) {
  const [swipe, setSwipe] = React.useState(0);
  const sliderRef = React.useRef(null);
  const onPointerDown = (e) => {
    const rect = sliderRef.current.getBoundingClientRect();
    const max = rect.width - 56;
    const move = (ev) => {
      const x = Math.max(0, Math.min(max, ev.clientX - rect.left - 28));
      setSwipe(x / max);
      if (x / max > 0.92) {
        document.removeEventListener('pointermove', move);
        document.removeEventListener('pointerup', up);
        setTimeout(() => onDelivered(), 200);
      }
    };
    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      if (swipe < 0.9) setSwipe(0);
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  };

  const steps = [
    { id: 'pick', label: 'Recogido', state: 'done' },
    { id: 'enroute', label: 'En camino', state: 'active' },
    { id: 'deliv', label: 'Entregado', state: 'pending' },
  ];

  return (
    <FPPhone>
      <FPStatusBar/>
      <style>{`
        @keyframes fp-pulse2 { 0%, 100% { transform: scale(1); opacity: .7; } 50% { transform: scale(2.4); opacity: 0; } }
      `}</style>

      {/* Map */}
      <div style={{
        flex: '0 0 50%', position: 'relative',
        background: 'linear-gradient(135deg, #15202A, #1A1A1F)', overflow: 'hidden',
      }}>
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.18 }}>
          <defs>
            <pattern id="dr-streets" width="44" height="44" patternUnits="userSpaceOnUse">
              <path d="M 0 22 L 44 22 M 22 0 L 22 44" stroke="#fff" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dr-streets)"/>
        </svg>
        {/* Major roads */}
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
          <path d="M0 200 L390 180" stroke="#3A3A42" strokeWidth="14" strokeLinecap="round"/>
          <path d="M120 0 L 160 421" stroke="#3A3A42" strokeWidth="10" strokeLinecap="round"/>
        </svg>
        {/* Route */}
        <svg viewBox="0 0 390 421" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
          <path d="M70 340 Q 130 220, 220 240 T 320 90" fill="none" stroke={FP.accent} strokeWidth="4" strokeLinecap="round" strokeDasharray="0"/>
        </svg>
        {/* Origin (restaurant) */}
        <div style={{ position: 'absolute', left: 60, bottom: 70, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 8, padding: '4px 8px', fontSize: 10, fontWeight: 700, color: FP.bg, marginBottom: 4 }}>RESTAURANTE</div>
          <div style={{ width: 18, height: 18, borderRadius: '50%', background: FP.accent, border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }}/>
        </div>
        {/* Destination (client) */}
        <div style={{ position: 'absolute', right: 60, top: 70 }}>
          <FPIcons.pin size={32}/>
        </div>
        {/* Driver in motion */}
        <div style={{ position: 'absolute', left: 200, top: 200 }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', inset: -4, borderRadius: '50%',
              background: FP.accent, animation: 'fp-pulse2 1.6s ease-out infinite',
            }}/>
            <div style={{
              width: 28, height: 28, borderRadius: '50%', background: FP.accent,
              border: '3px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="#fff">
                <path d="M2 9l5-7 5 7-5-2-5 2z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Back button on map */}
        <button style={{
          position: 'absolute', top: 56, left: 16, width: 40, height: 40, borderRadius: '50%',
          background: 'rgba(15,15,18,0.85)', backdropFilter: 'blur(10px)', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <FPIcons.back/>
        </button>
      </div>

      {/* Bottom sheet */}
      <div style={{
        flex: 1, background: FP.bg, marginTop: -24, borderRadius: '24px 24px 0 0',
        padding: '20px 20px 0', position: 'relative', overflow: 'auto',
      }}>
        <div style={{ width: 40, height: 4, borderRadius: 2, background: FP.borderStrong, margin: '0 auto 16px' }}/>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              height: 24, padding: '0 10px', borderRadius: 999,
              background: 'rgba(230,57,70,0.15)', border: `1px solid rgba(230,57,70,0.3)`,
              fontSize: 11, fontWeight: 700, color: FP.accent, letterSpacing: 0.4,
            }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: FP.accent }}/>
              EN CAMINO
            </div>
            <div style={{ marginTop: 8, fontSize: 24, fontWeight: 800, letterSpacing: -0.6 }}>8 min</div>
            <div style={{ fontSize: 12, color: FP.textMuted, marginTop: 2 }}>Av. Los Leones 2280</div>
          </div>
          <button style={{
            width: 48, height: 48, borderRadius: '50%', background: FP.accent, border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 18px rgba(230,57,70,0.4)',
          }}>
            <FPIcons.phone/>
          </button>
        </div>

        {/* Stepper horizontal */}
        <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
          {steps.map((s, i) => {
            const done = s.state === 'done';
            const active = s.state === 'active';
            const pending = s.state === 'pending';
            return (
              <React.Fragment key={s.id}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minWidth: 64 }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: done ? FP.success : active ? FP.accent : 'transparent',
                    border: pending ? `2px solid ${FP.borderStrong}` : 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {done && <FPIcons.check size={11}/>}
                    {active && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }}/>}
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 600, letterSpacing: -0.1,
                    color: pending ? FP.textDim : '#fff',
                  }}>{s.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div style={{
                    flex: 1, height: 2, marginTop: -16,
                    background: done ? FP.success : FP.border,
                  }}/>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Client card */}
        <div style={{
          marginTop: 18, padding: 14, background: FP.card, borderRadius: 16,
          display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${FP.border}`,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: 'linear-gradient(135deg, #E63946, #8B1A26)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: 14,
          }}>CG</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: -0.2 }}>Cristian González</div>
            <div style={{ fontSize: 11, color: FP.textMuted, marginTop: 2 }}>Pedido #FP-1042</div>
          </div>
          <button style={{
            width: 36, height: 36, borderRadius: '50%', background: FP.cardElev,
            border: `1px solid ${FP.border}`, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <FPIcons.phone size={16}/>
          </button>
          <button style={{
            width: 36, height: 36, borderRadius: '50%', background: FP.cardElev,
            border: `1px solid ${FP.border}`, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <FPIcons.message size={16}/>
          </button>
        </div>

        {/* Swipe to confirm */}
        <div style={{ marginTop: 18 }}>
          <div ref={sliderRef} style={{
            height: 56, borderRadius: 28, background: FP.card, position: 'relative', overflow: 'hidden',
            border: `1px solid ${FP.border}`,
          }}>
            <div style={{
              position: 'absolute', inset: 0, background: FP.accent, opacity: swipe * 0.9,
              borderRadius: 28, transition: swipe === 0 ? 'opacity 0.2s' : 'none',
            }}/>
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, fontWeight: 700, color: '#fff', letterSpacing: -0.2,
              opacity: 1 - swipe * 1.2,
            }}>
              Desliza para marcar entregado →
            </div>
            <div onPointerDown={onPointerDown} style={{
              position: 'absolute', top: 4, left: 4, width: 48, height: 48, borderRadius: 24,
              background: FP.accent, cursor: 'grab',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transform: `translateX(${swipe * (350 - 56)}px)`,
              transition: swipe === 0 ? 'transform 0.2s' : 'none',
              boxShadow: '0 4px 12px rgba(230,57,70,0.5)',
            }}>
              <FPIcons.check size={18}/>
            </div>
          </div>
        </div>
      </div>
      <FPHomeIndicator/>
    </FPPhone>
  );
}

// R4 — Daily summary / earnings
function DriverEarnings({ onIncoming }) {
  const [connected, setConnected] = React.useState(true);
  const orders = [
    { time: '19:42', name: 'Cristian G.', amount: 3500 },
    { time: '18:58', name: 'María L.', amount: 4200 },
    { time: '18:15', name: 'Pedro R.', amount: 3800 },
    { time: '17:30', name: 'Sofía V.', amount: 3500 },
  ];
  const fmtP = (n) => '$' + n.toLocaleString('es-CL');

  return (
    <FPPhone>
      <FPStatusBar/>
      <div style={{ flex: 1, overflow: 'auto', paddingBottom: 100 }}>
        <div style={{ padding: '8px 24px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>Hola, Juan 👋</div>
            <div style={{ fontSize: 13, color: FP.textMuted, marginTop: 2 }}>Resumen de hoy</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', borderRadius: 999, background: connected ? 'rgba(46,204,113,0.16)' : 'rgba(150,150,160,0.18)', border: `1px solid ${connected ? 'rgba(46,204,113,0.3)' : 'rgba(255,255,255,0.1)'}` }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: connected ? FP.success : FP.textMuted }}/>
            <span style={{ fontSize: 11, fontWeight: 700, color: connected ? FP.success : FP.textMuted }}>{connected ? 'En línea' : 'Desconectado'}</span>
          </div>
        </div>

        {/* Big earnings card */}
        <div style={{ padding: '0 24px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #1A0A0E 0%, #3A1218 100%)',
            border: '1px solid rgba(230,57,70,0.3)',
            borderRadius: 20, padding: '24px 22px', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', right: -40, top: -40, width: 200, height: 200, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(230,57,70,0.35) 0%, transparent 70%)' }}/>
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: 11, color: FP.accent, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase' }}>Total ganado</div>
              <div style={{ fontSize: 36, fontWeight: 800, color: FP.accent, letterSpacing: -1.4, marginTop: 6 }}>$42.500</div>
              <div style={{ fontSize: 13, color: FP.textMuted, marginTop: 4 }}>12 pedidos completados</div>
            </div>
          </div>
        </div>

        {/* 3 stats */}
        <div style={{ padding: '16px 24px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            {[
              { v: '8 km', l: 'Recorridos' },
              { v: '3.5h', l: 'En línea' },
              { v: '4.9 ⭐', l: 'Promedio' },
            ].map((s, i) => (
              <div key={i} style={{
                background: FP.card, borderRadius: 12, padding: '14px 8px',
                border: `1px solid ${FP.border}`, textAlign: 'center',
              }}>
                <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: -0.3 }}>{s.v}</div>
                <div style={{ fontSize: 10, color: FP.textMuted, marginTop: 4, fontWeight: 500 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Orders */}
        <div style={{ padding: '24px 24px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: FP.textMuted, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>Pedidos completados hoy</div>
            <button onClick={onIncoming} style={{
              background: 'transparent', border: 'none', color: FP.accent, fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: FP.font,
            }}>+ simular nuevo</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {orders.map((o, i) => (
              <div key={i} style={{
                background: FP.card, borderRadius: 12, padding: '12px 14px',
                border: `1px solid ${FP.border}`,
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10, background: FP.cardElev,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700, color: FP.textMuted,
                }}>{o.time}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{o.name}</div>
                  <div style={{
                    marginTop: 4, display: 'inline-flex', alignItems: 'center', gap: 4,
                    height: 18, padding: '0 8px', borderRadius: 999,
                    background: FP.successBg, border: '1px solid rgba(46,204,113,0.3)',
                    fontSize: 9, fontWeight: 700, color: FP.success,
                  }}>
                    <FPIcons.check size={8} color={FP.success}/> ENTREGADO
                  </div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: FP.accent, letterSpacing: -0.2 }}>{fmtP(o.amount)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div style={{
        padding: '12px 24px 0',
        background: 'linear-gradient(180deg, transparent 0%, #0F0F12 30%)',
      }}>
        <FPButton variant={connected ? 'outline' : 'primary'} onClick={() => setConnected(!connected)}>
          {connected ? 'Cerrar turno' : 'Continuar conectado'}
        </FPButton>
      </div>

      {/* Bottom nav */}
      <div style={{
        flexShrink: 0, background: FP.card, borderTop: `1px solid ${FP.border}`,
        padding: '10px 12px 6px', display: 'flex', justifyContent: 'space-around', marginTop: 12,
      }}>
        {[
          { id: 'home', label: 'Inicio', Icon: DRIVER_ICONS.navHome },
          { id: 'orders', label: 'Pedidos', Icon: DRIVER_ICONS.navOrders, active: true },
          { id: 'earn', label: 'Ganancias', Icon: DRIVER_ICONS.navEarn },
          { id: 'profile', label: 'Perfil', Icon: DRIVER_ICONS.navProfile },
        ].map(({ id, label, Icon, active }) => {
          const color = active ? FP.accent : FP.textMuted;
          return (
            <button key={id} style={{
              flex: 1, background: 'transparent', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '6px 0',
            }}>
              <Icon color={color}/>
              <span style={{ fontSize: 11, fontWeight: 500, color, letterSpacing: -0.1 }}>{label}</span>
            </button>
          );
        })}
      </div>
      <FPHomeIndicator/>
    </FPPhone>
  );
}

window.DriverLogin = DriverLogin;
window.DriverIncoming = DriverIncoming;
window.DriverRoute = DriverRoute;
window.DriverEarnings = DriverEarnings;
