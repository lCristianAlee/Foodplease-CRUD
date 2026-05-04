// 7. Profile
function ScreenProfile({ onTab, cartCount }) {
  const items = [
    { id: 'orders', icon: '📋', label: 'Mis pedidos' },
    { id: 'fav', icon: '❤️', label: 'Favoritos' },
    { id: 'addr', icon: '📍', label: 'Direcciones guardadas' },
    { id: 'pay', icon: '💳', label: 'Métodos de pago' },
    { id: 'notif', icon: '🔔', label: 'Notificaciones' },
    { id: 'lang', icon: '🌐', label: 'Idioma', detail: 'Español' },
    { id: 'help', icon: '❓', label: 'Ayuda y soporte' },
    { id: 'logout', icon: '🚪', label: 'Cerrar sesión', danger: true },
  ];

  return (
    <FPPhone>
      <FPStatusBar/>
      <div style={{ flex: 1, overflow: 'auto', paddingBottom: 12 }}>
        <div style={{ padding: '8px 24px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>Perfil</div>
        </div>

        {/* Avatar header */}
        <div style={{ padding: '16px 24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            width: 96, height: 96, borderRadius: FP.r.full,
            background: 'linear-gradient(135deg, #E63946, #8B1A26)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 36, fontWeight: 700, position: 'relative',
            boxShadow: '0 8px 24px rgba(230,57,70,0.35)',
          }}>
            CG
            <div style={{
              position: 'absolute', bottom: 0, right: 0, width: 28, height: 28,
              borderRadius: FP.r.full, background: FP.cardElev,
              border: `3px solid ${FP.bg}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <FPIcons.edit size={12}/>
            </div>
          </div>
          <div style={{ marginTop: 14, fontSize: 20, fontWeight: 700, letterSpacing: -0.4 }}>Cristian González</div>
          <div style={{ marginTop: 4, fontSize: 13, color: FP.textMuted }}>cristian.gonzalez@mail.com</div>
          <button style={{
            marginTop: 12, height: 32, padding: '0 18px', borderRadius: FP.r.full,
            background: 'transparent', border: `1.5px solid ${FP.borderStrong}`,
            color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer',
            fontFamily: FP.font, display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <FPIcons.edit size={11}/> Editar perfil
          </button>
        </div>

        {/* Stats */}
        <div style={{ padding: '20px 24px 4px' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
            background: FP.card, borderRadius: FP.r.lg, padding: '16px 0',
            border: `1px solid ${FP.border}`,
          }}>
            {[
              { v: '12', l: 'Pedidos' },
              { v: '$420k', l: 'Gastado' },
              { v: '4', l: 'Favoritos' },
            ].map((s, i) => (
              <div key={i} style={{
                textAlign: 'center', position: 'relative',
                borderRight: i < 2 ? `1px solid ${FP.border}` : 'none',
              }}>
                <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.4 }}>{s.v}</div>
                <div style={{ fontSize: 11, color: FP.textMuted, marginTop: 2, fontWeight: 500 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Options list */}
        <div style={{ padding: '16px 24px 0' }}>
          <div style={{ background: FP.card, borderRadius: FP.r.lg, overflow: 'hidden', border: `1px solid ${FP.border}` }}>
            {items.map((it, i) => (
              <button key={it.id} style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 16px', background: 'transparent', border: 'none', cursor: 'pointer',
                borderTop: i > 0 ? `1px solid ${FP.border}` : 'none',
                fontFamily: FP.font, textAlign: 'left',
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: FP.r.sm,
                  background: it.danger ? 'rgba(230,57,70,0.12)' : FP.cardElev,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16,
                }}>{it.icon}</div>
                <div style={{
                  flex: 1, fontSize: 14, fontWeight: 500, letterSpacing: -0.1,
                  color: it.danger ? FP.accent : '#fff',
                }}>{it.label}</div>
                {it.detail && (
                  <span style={{ fontSize: 13, color: FP.textMuted, marginRight: 4 }}>{it.detail}</span>
                )}
                {!it.danger && <FPIcons.chevronRight/>}
              </button>
            ))}
          </div>
        </div>
        <div style={{ height: 16 }}/>
      </div>
      <FPBottomNav active="profile" cartCount={cartCount} onChange={onTab}/>
      <FPHomeIndicator/>
    </FPPhone>
  );
}

window.ScreenProfile = ScreenProfile;
