// FoodPlease shared design tokens + primitives
const FP = {
  bg: '#0F0F12',
  card: '#1A1A1F',
  cardElev: '#22222A',
  border: 'rgba(255,255,255,0.08)',
  borderStrong: 'rgba(255,255,255,0.16)',
  text: '#FFFFFF',
  textMuted: '#9A9AA0',
  textDim: '#6A6A72',
  accent: '#E63946',
  accentHover: '#F04A57',
  success: '#2ECC71',
  successBg: 'rgba(46, 204, 113, 0.16)',
  warn: '#F4A261',
  font: 'Inter, -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", system-ui, sans-serif',
  r: { sm: 8, md: 12, lg: 16, xl: 20, full: 9999 },
};

// Status bar (dark variant) — minimal, since screens are dark
function FPStatusBar() {
  return (
    <div style={{
      height: 47, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px 0 32px', position: 'relative', zIndex: 5, flexShrink: 0,
    }}>
      <span style={{ color: '#fff', fontWeight: 600, fontSize: 15, letterSpacing: -0.2, fontFamily: FP.font }}>9:41</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <svg width="17" height="11" viewBox="0 0 17 11"><rect x="0" y="6" width="3" height="5" rx="0.6" fill="#fff"/><rect x="4.5" y="4" width="3" height="7" rx="0.6" fill="#fff"/><rect x="9" y="2" width="3" height="9" rx="0.6" fill="#fff"/><rect x="13.5" y="0" width="3" height="11" rx="0.6" fill="#fff"/></svg>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="#fff"><path d="M7.5 3a7.5 7.5 0 0 1 5.3 2.2l1-1A9 9 0 0 0 7.5 1.5 9 9 0 0 0 1.2 4.2l1 1A7.5 7.5 0 0 1 7.5 3z"/><path d="M7.5 6a4.5 4.5 0 0 1 3.2 1.3l1-1A6 6 0 0 0 7.5 4.5 6 6 0 0 0 3.3 6.3l1 1A4.5 4.5 0 0 1 7.5 6z"/><circle cx="7.5" cy="9" r="1.4"/></svg>
        <svg width="25" height="12" viewBox="0 0 25 12"><rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="#fff" strokeOpacity="0.4" fill="none"/><rect x="2" y="2" width="18" height="8" rx="1.6" fill="#fff"/><path d="M23 4v4c.7-.3 1.3-1 1.3-2s-.6-1.7-1.3-2z" fill="#fff" fillOpacity="0.5"/></svg>
      </div>
    </div>
  );
}

function FPHomeIndicator({ light = true }) {
  return (
    <div style={{
      height: 34, display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
      paddingBottom: 8, flexShrink: 0,
    }}>
      <div style={{
        width: 134, height: 5, borderRadius: 100,
        background: light ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.3)',
      }}/>
    </div>
  );
}

// Phone shell — 390x844 with safe areas
function FPPhone({ children, bg = FP.bg }) {
  return (
    <div style={{
      width: 390, height: 844, background: bg, position: 'relative',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      fontFamily: FP.font, color: FP.text,
      WebkitFontSmoothing: 'antialiased',
    }}>
      {children}
    </div>
  );
}

// Header with back button + title
function FPHeader({ title, onBack, right }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', padding: '4px 16px 12px',
      gap: 8, flexShrink: 0,
    }}>
      <button onClick={onBack} style={{
        width: 40, height: 40, borderRadius: FP.r.full,
        background: FP.card, border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <FPIcons.back/>
      </button>
      <div style={{ flex: 1, textAlign: 'center', fontSize: 17, fontWeight: 600, letterSpacing: -0.2 }}>
        {title}
      </div>
      <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {right}
      </div>
    </div>
  );
}

// Primary red button
function FPButton({ children, variant = 'primary', onClick, full = true, style = {}, disabled }) {
  const base = {
    height: 54, borderRadius: FP.r.lg, fontSize: 16, fontWeight: 600, letterSpacing: -0.2,
    border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
    width: full ? '100%' : 'auto', padding: full ? 0 : '0 24px',
    fontFamily: FP.font, transition: 'all 0.15s',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    opacity: disabled ? 0.5 : 1,
  };
  const variants = {
    primary: { background: FP.accent, color: '#fff', boxShadow: '0 4px 18px rgba(230,57,70,0.35)' },
    outline: { background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.25)' },
    ghost: { background: FP.card, color: '#fff' },
  };
  return <button onClick={onClick} disabled={disabled} style={{ ...base, ...variants[variant], ...style }}>{children}</button>;
}

// Bottom nav (4 tabs) — used on Home and Profile
function FPBottomNav({ active = 'menu', cartCount = 2, onChange }) {
  const items = [
    { id: 'menu', label: 'Menú', Icon: FPIcons.navMenu },
    { id: 'orders', label: 'Pedidos', Icon: FPIcons.navOrders },
    { id: 'cart', label: 'Carrito', Icon: FPIcons.navCart, badge: cartCount },
    { id: 'profile', label: 'Perfil', Icon: FPIcons.navProfile },
  ];
  return (
    <div style={{
      flexShrink: 0, background: FP.card, borderTop: `1px solid ${FP.border}`,
      padding: '10px 12px 6px', display: 'flex', justifyContent: 'space-around',
    }}>
      {items.map(({ id, label, Icon, badge }) => {
        const isActive = id === active;
        const color = isActive ? FP.accent : FP.textMuted;
        return (
          <button key={id} onClick={() => onChange && onChange(id)} style={{
            flex: 1, background: 'transparent', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            padding: '6px 0', position: 'relative',
          }}>
            <div style={{ position: 'relative' }}>
              <Icon color={color}/>
              {badge && (
                <div style={{
                  position: 'absolute', top: -4, right: -8, minWidth: 18, height: 18,
                  borderRadius: 9, background: FP.accent, color: '#fff',
                  fontSize: 11, fontWeight: 700, padding: '0 5px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `2px solid ${FP.card}`,
                }}>{badge}</div>
              )}
            </div>
            <span style={{ fontSize: 11, fontWeight: 500, color, letterSpacing: -0.1 }}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

// Reusable striped placeholder (for dish images)
function FPImagePlaceholder({ label, h = 120, hue = 14, radius = FP.r.lg, style = {} }) {
  // warm food-tones via hue rotation
  const bg = `linear-gradient(135deg, oklch(0.42 0.08 ${hue}) 0%, oklch(0.32 0.06 ${hue + 20}) 100%)`;
  return (
    <div style={{
      height: h, borderRadius: radius, background: bg, position: 'relative',
      overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
      ...style,
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0 8px, transparent 8px 16px)',
      }}/>
      <span style={{
        position: 'relative', fontFamily: 'ui-monospace, SFMono-Regular, monospace',
        fontSize: 10, color: 'rgba(255,255,255,0.55)', letterSpacing: 0.5, textAlign: 'center', padding: '0 8px',
      }}>{label}</span>
    </div>
  );
}

Object.assign(window, { FP, FPStatusBar, FPHomeIndicator, FPPhone, FPHeader, FPButton, FPBottomNav, FPImagePlaceholder });
