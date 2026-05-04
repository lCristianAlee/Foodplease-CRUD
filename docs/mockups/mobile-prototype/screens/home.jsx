// 3. Home / Menu
const DISHES = [
  { id: 'pasta', name: 'Pasta Boloñesa', price: 35000, hue: 18, available: true, cat: 'Pastas',
    desc: 'Espaguetis o tallarines acompañados de una salsa roja de carne molida, tomate y hierbas frescas.' },
  { id: 'risotto', name: 'Risotto de Hongos', price: 19990, hue: 60, available: true, cat: 'Pastas' },
  { id: 'salmon', name: 'Salmón a la Parrilla', price: 25990, hue: 30, available: false, cat: 'Pescados' },
  { id: 'cesar', name: 'Ensalada César', price: 12990, hue: 130, available: true, cat: 'Carnes' },
];

function ScreenHome({ onDish, onTab, cartCount }) {
  const [cat, setCat] = React.useState('Todos');
  const cats = ['Todos', 'Pastas', 'Carnes', 'Pescados', 'Bebidas', 'Postres'];

  const formatPrice = (n) => '$' + n.toLocaleString('es-CL');

  return (
    <FPPhone>
      <FPStatusBar/>
      <div style={{ flex: 1, overflow: 'auto', paddingBottom: 12 }}>
        {/* Greeting */}
        <div style={{ padding: '8px 24px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>Hola, Cristian 👋</div>
            <div style={{ fontSize: 14, color: FP.textMuted, marginTop: 2 }}>¿Qué se te antoja hoy?</div>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: FP.r.full, background: 'linear-gradient(135deg, #E63946, #B22838)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16 }}>
            CG
          </div>
        </div>

        {/* Search */}
        <div style={{ padding: '0 24px 16px' }}>
          <div style={{
            height: 48, borderRadius: FP.r.lg, background: FP.card,
            display: 'flex', alignItems: 'center', padding: '0 16px', gap: 10,
            border: `1px solid ${FP.border}`,
          }}>
            <FPIcons.search/>
            <input placeholder="Buscar platos..." style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: '#fff', fontSize: 14, fontFamily: FP.font,
            }}/>
          </div>
        </div>

        {/* Categories */}
        <div style={{ display: 'flex', gap: 8, padding: '0 24px 18px', overflowX: 'auto' }}>
          {cats.map(c => {
            const active = c === cat;
            return (
              <button key={c} onClick={() => setCat(c)} style={{
                flexShrink: 0, height: 36, padding: '0 16px', borderRadius: FP.r.full,
                background: active ? FP.accent : FP.card,
                color: '#fff', fontSize: 13, fontWeight: 600,
                border: active ? 'none' : `1px solid ${FP.border}`,
                cursor: 'pointer', fontFamily: FP.font, letterSpacing: -0.1,
              }}>{c}</button>
            );
          })}
        </div>

        {/* Featured banner (subtle) */}
        <div style={{ padding: '0 24px 18px' }}>
          <div style={{
            height: 92, borderRadius: FP.r.lg, padding: 16,
            background: 'linear-gradient(95deg, #2A1418 0%, #4A1820 100%)',
            border: `1px solid rgba(230,57,70,0.3)`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontSize: 11, color: FP.accent, fontWeight: 700, letterSpacing: 0.8 }}>OFERTA DEL DÍA</div>
              <div style={{ fontSize: 16, fontWeight: 700, marginTop: 4, letterSpacing: -0.2 }}>30% en pastas</div>
              <div style={{ fontSize: 12, color: FP.textMuted, marginTop: 2 }}>Hasta las 18:00</div>
            </div>
            <div style={{
              width: 64, height: 64, borderRadius: FP.r.md,
              background: 'linear-gradient(135deg, #E63946, #8B1A26)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, fontWeight: 800, transform: 'rotate(-6deg)',
            }}>30%</div>
          </div>
        </div>

        {/* Grid */}
        <div style={{ padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {DISHES.map(d => (
            <div key={d.id} onClick={() => d.available && onDish(d)} style={{
              background: FP.card, borderRadius: FP.r.lg, overflow: 'hidden',
              cursor: d.available ? 'pointer' : 'default', position: 'relative',
              border: `1px solid ${FP.border}`,
            }}>
              <div style={{ position: 'relative' }}>
                <FPImagePlaceholder label={`PHOTO\n${d.name.toUpperCase()}`} h={110} hue={d.hue} radius={0}/>
                {/* availability badge */}
                <div style={{
                  position: 'absolute', top: 8, left: 8, height: 22, padding: '0 8px',
                  borderRadius: FP.r.full, fontSize: 10, fontWeight: 700,
                  background: d.available ? FP.successBg : 'rgba(150,150,160,0.2)',
                  color: d.available ? FP.success : FP.textMuted,
                  display: 'flex', alignItems: 'center', gap: 4, backdropFilter: 'blur(4px)',
                  border: `1px solid ${d.available ? 'rgba(46,204,113,0.3)' : 'rgba(255,255,255,0.1)'}`,
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: d.available ? FP.success : FP.textMuted }}/>
                  {d.available ? 'Disponible' : 'Agotado'}
                </div>
              </div>
              <div style={{ padding: '10px 12px 14px', position: 'relative' }}>
                <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.25, letterSpacing: -0.2, paddingRight: 8 }}>
                  {d.name}
                </div>
                <div style={{ marginTop: 6, fontSize: 14, fontWeight: 700, color: FP.accent, letterSpacing: -0.2 }}>
                  {formatPrice(d.price)}
                </div>
                {/* + button */}
                <button onClick={(e) => { e.stopPropagation(); d.available && onDish(d); }} style={{
                  position: 'absolute', bottom: 10, right: 10,
                  width: 30, height: 30, borderRadius: FP.r.full,
                  background: d.available ? FP.accent : '#2A2A30',
                  border: 'none', cursor: d.available ? 'pointer' : 'not-allowed',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: d.available ? '0 3px 10px rgba(230,57,70,0.4)' : 'none',
                }}>
                  <FPIcons.plus/>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <FPBottomNav active="menu" cartCount={cartCount} onChange={onTab}/>
      <FPHomeIndicator/>
    </FPPhone>
  );
}

window.ScreenHome = ScreenHome;
window.DISHES = DISHES;
