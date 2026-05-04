// FoodPlease — Web Pública (Desktop) — comparte tokens con FP del mobile
const WEB_DISHES = [
  { id: 'pasta', name: 'Pasta Boloñesa', price: 35000, hue: 18, available: true,
    desc: 'Espaguetis con salsa roja de carne molida, tomate y hierbas frescas.',
    cat: 'Pastas',
    ingredients: ['Espaguetis', 'Carne molida', 'Tomate', 'Ajo', 'Albahaca', 'Queso parmesano'],
    nutrition: { kcal: '620', prot: '28g', carb: '78g', fat: '18g' },
    descLong: 'Una receta tradicional italiana preparada en casa: pasta al dente bañada en salsa boloñesa cocinada a fuego lento durante 4 horas, con carne de res seleccionada, tomate San Marzano y un toque de hierbas frescas del huerto.',
  },
  { id: 'risotto', name: 'Risotto de Hongos', price: 19990, hue: 60, available: true,
    desc: 'Arroz arborio cremoso con mezcla de hongos y queso parmesano.', cat: 'Pastas' },
  { id: 'salmon', name: 'Salmón a la Parrilla', price: 25990, hue: 30, available: false,
    desc: 'Filete de salmón con costra de hierbas, papas rústicas y limón.', cat: 'Pescados' },
  { id: 'cesar', name: 'Ensalada César', price: 12990, hue: 130, available: true,
    desc: 'Lechuga romana, crutones, queso parmesano y aderezo César clásico.', cat: 'Carnes' },
  { id: 'pizza', name: 'Pizza Margarita', price: 14990, hue: 24, available: true,
    desc: 'Masa fina, salsa de tomate, mozzarella fresca y albahaca.', cat: 'Pastas' },
  { id: 'sushi', name: 'Sushi Roll', price: 18990, hue: 200, available: true,
    desc: 'Selección variada de 8 piezas con salmón, atún y palta.', cat: 'Pescados' },
  { id: 'lasagna', name: 'Lasagna', price: 16500, hue: 14, available: true,
    desc: 'Capas de pasta con boloñesa, bechamel y queso gratinado.', cat: 'Pastas' },
  { id: 'tirami', name: 'Tiramisú', price: 7990, hue: 38, available: true,
    desc: 'Postre italiano con bizcocho, mascarpone y café espresso.', cat: 'Postres' },
];

// ─────────────────────────────────────────────────────────────
// Atoms
// ─────────────────────────────────────────────────────────────
const fmt = (n) => '$' + n.toLocaleString('es-CL');

function WebImage({ label, hue = 14, ratio = 4 / 3, radius = 16, style = {} }) {
  return (
    <div style={{
      width: '100%', aspectRatio: `${ratio}`, borderRadius: radius, position: 'relative',
      overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: `linear-gradient(135deg, oklch(0.42 0.08 ${hue}) 0%, oklch(0.30 0.06 ${hue + 20}) 100%)`,
      ...style,
    }}>
      <div style={{ position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0 10px, transparent 10px 20px)' }}/>
      <span style={{ position: 'relative', fontFamily: 'ui-monospace, SFMono-Regular, monospace',
        fontSize: 11, color: 'rgba(255,255,255,0.55)', letterSpacing: 0.5, textAlign: 'center', padding: '0 12px' }}>
        {label}
      </span>
    </div>
  );
}

function StoreButtons({ size = 'md' }) {
  const big = size === 'lg';
  const h = big ? 56 : 44;
  const Btn = ({ store }) => (
    <button style={{
      height: h, padding: big ? '0 22px' : '0 16px', borderRadius: 12,
      background: '#000', border: '1px solid rgba(255,255,255,0.18)',
      color: '#fff', cursor: 'pointer', fontFamily: FP.font,
      display: 'flex', alignItems: 'center', gap: 10,
    }}>
      {store === 'apple' ? (
        <svg width={big ? 24 : 20} height={big ? 24 : 20} viewBox="0 0 22 22" fill="#fff">
          <path d="M16.4 11.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9-.7 0-1.9-.8-3.1-.8-1.6 0-3.1.9-3.9 2.4-1.7 2.9-.4 7.2 1.2 9.5.8 1.1 1.7 2.4 3 2.4 1.2-.1 1.7-.8 3.1-.8s1.9.8 3.1.7c1.3 0 2.1-1.2 2.9-2.3.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.7-1-2.7-4z"/>
          <path d="M14.1 4.7c.6-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.1 1.8-1 2.9 1.1.1 2.2-.6 2.8-1.4z"/>
        </svg>
      ) : (
        <svg width={big ? 22 : 18} height={big ? 22 : 18} viewBox="0 0 22 22">
          <path fill="#3DDC84" d="M4 4l9 7-9 7V4z"/>
          <path fill="#FFCE00" d="M13 11l5-3v6l-5-3z"/>
          <path fill="#E63946" d="M4 4l14 7-5 3-9-10z"/>
          <path fill="#4285F4" d="M4 18l14-7-5-3-9 10z"/>
        </svg>
      )}
      <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)', letterSpacing: 0.4, textTransform: 'uppercase' }}>
          {store === 'apple' ? 'Descarga en' : 'Disponible en'}
        </div>
        <div style={{ fontSize: big ? 15 : 13, fontWeight: 700, marginTop: 1 }}>
          {store === 'apple' ? 'App Store' : 'Google Play'}
        </div>
      </div>
    </button>
  );
  return <div style={{ display: 'flex', gap: 10 }}><Btn store="apple"/><Btn store="google"/></div>;
}

// ─────────────────────────────────────────────────────────────
// Header (sticky)
// ─────────────────────────────────────────────────────────────
function WebHeader({ active = 'Menú' }) {
  const links = ['Menú', 'Sucursales', 'Sobre nosotros', 'Contacto'];
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(15,15,18,0.85)', backdropFilter: 'blur(16px) saturate(180%)',
      borderBottom: `1px solid ${FP.border}`,
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px',
        height: 76, display: 'flex', alignItems: 'center', gap: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <FPIcons.fork size={28} color={FP.accent}/>
          <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.6, color: FP.accent }}>
            FoodPlease
          </span>
        </div>
        <nav style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 36 }}>
          {links.map(l => (
            <a key={l} style={{
              fontSize: 14, fontWeight: 500, letterSpacing: -0.1, cursor: 'pointer',
              color: l === active ? '#fff' : FP.textMuted,
              position: 'relative', padding: '8px 0',
            }}>
              {l}
              {l === active && <span style={{
                position: 'absolute', left: 0, right: 0, bottom: -2, height: 2, borderRadius: 2,
                background: FP.accent,
              }}/>}
            </a>
          ))}
        </nav>
        <button style={{
          height: 44, padding: '0 20px', borderRadius: 12, background: FP.accent,
          color: '#fff', border: 'none', cursor: 'pointer', fontFamily: FP.font,
          fontSize: 14, fontWeight: 600, letterSpacing: -0.1,
          display: 'flex', alignItems: 'center', gap: 10,
          boxShadow: '0 4px 14px rgba(230,57,70,0.35)',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v9m0 0L4 7m3 3l3-3M2 12h10" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Descargar app
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Footer + CTA band
// ─────────────────────────────────────────────────────────────
function WebCTABand() {
  return (
    <div style={{ padding: '0 32px', marginTop: 80 }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        background: 'linear-gradient(95deg, #1A0A0E 0%, #3A1218 50%, #1A0A0E 100%)',
        border: '1px solid rgba(230,57,70,0.3)',
        borderRadius: 24, padding: '48px 64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: -80, top: -80, width: 320, height: 320, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(230,57,70,0.4) 0%, transparent 70%)' }}/>
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: -0.8, lineHeight: 1.2 }}>
            ¿Listo para pedir? <span style={{ color: FP.accent }}>Descarga la app.</span>
          </div>
          <div style={{ fontSize: 15, color: FP.textMuted, marginTop: 10, maxWidth: 460 }}>
            Pide tus platos favoritos, sigue tu pedido en tiempo real y guarda tus direcciones.
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <StoreButtons size="lg"/>
        </div>
      </div>
    </div>
  );
}

function WebFooter() {
  const cols = [
    { title: 'FoodPlease', items: ['Tu menú favorito,', 'siempre fresco.'], brand: true },
    { title: 'Producto', items: ['Menú', 'App móvil', 'Sucursales'] },
    { title: 'Empresa', items: ['Sobre nosotros', 'Trabaja con nosotros', 'Contacto'] },
    { title: 'Legal', items: ['Términos y condiciones', 'Política de privacidad'] },
  ];
  return (
    <footer style={{ marginTop: 80, padding: '64px 32px 32px', borderTop: `1px solid ${FP.border}` }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 48 }}>
          {cols.map((c, i) => (
            <div key={i}>
              {c.brand ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <FPIcons.fork size={24} color={FP.accent}/>
                    <span style={{ fontSize: 18, fontWeight: 800, color: FP.accent, letterSpacing: -0.4 }}>FoodPlease</span>
                  </div>
                  <div style={{ fontSize: 14, color: FP.textMuted, lineHeight: 1.6, maxWidth: 280 }}>
                    {c.items.join(' ')}
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 16, letterSpacing: 0.6, textTransform: 'uppercase' }}>
                    {c.title}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {c.items.map(it => (
                      <a key={it} style={{ fontSize: 14, color: FP.textMuted, cursor: 'pointer' }}>{it}</a>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        <div style={{
          marginTop: 56, paddingTop: 24, borderTop: `1px solid ${FP.border}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: 13, color: FP.textDim,
        }}>
          <span>© 2026 FoodPlease. Todos los derechos reservados.</span>
          <span>Hecho en Chile 🇨🇱</span>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────
// Mini phone showing the mobile Home — used in hero
// ─────────────────────────────────────────────────────────────
function WebHeroPhone() {
  return (
    <div style={{
      width: 320, height: 660, borderRadius: 44, background: '#000', overflow: 'hidden',
      boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 0 8px #1a1a1f, 0 0 0 10px #2a2a32',
      transform: 'rotate(4deg)',
      position: 'relative',
    }}>
      <div style={{ transform: 'scale(0.82)', transformOrigin: 'top left', width: 390, height: 844 }}>
        <ScreenHome onDish={() => {}} onTab={() => {}} cartCount={2}/>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// W1 — Home / Menú
// ─────────────────────────────────────────────────────────────
function WebHome() {
  const [cat, setCat] = React.useState('Todos');
  const cats = ['Todos', 'Pastas', 'Carnes', 'Pescados', 'Bebidas', 'Postres'];

  return (
    <div style={{ width: 1440, background: FP.bg, color: '#fff', fontFamily: FP.font, WebkitFontSmoothing: 'antialiased' }}>
      <WebHeader active="Menú"/>

      {/* HERO */}
      <section style={{ position: 'relative', height: 480, padding: '0 32px', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: -100, left: '12%', width: 640, height: 640, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(230,57,70,0.32) 0%, rgba(230,57,70,0.08) 40%, transparent 70%)',
          filter: 'blur(20px)', pointerEvents: 'none',
        }}/>
        <div style={{
          maxWidth: 1200, margin: '0 auto', height: '100%',
          display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 60, alignItems: 'center', position: 'relative',
        }}>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px',
              borderRadius: 999, background: 'rgba(230,57,70,0.12)', border: '1px solid rgba(230,57,70,0.3)',
              fontSize: 12, fontWeight: 600, color: FP.accent, letterSpacing: 0.4, textTransform: 'uppercase',
              marginBottom: 24,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: FP.accent }}/>
              Cocina abierta · 11:00 — 23:00
            </div>
            <h1 style={{
              fontSize: 64, fontWeight: 800, letterSpacing: -2, lineHeight: 1.05, margin: 0,
            }}>
              Tu menú favorito,<br/>siempre <span style={{ color: FP.accent }}>fresco.</span>
            </h1>
            <p style={{
              fontSize: 17, color: FP.textMuted, lineHeight: 1.55, marginTop: 20, maxWidth: 480, textWrap: 'pretty',
            }}>
              Explora nuestra carta completa, conoce los ingredientes y haz tu pedido desde la app móvil de FoodPlease.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
              <button style={{
                height: 54, padding: '0 28px', borderRadius: 12, background: FP.accent,
                color: '#fff', border: 'none', cursor: 'pointer', fontFamily: FP.font,
                fontSize: 15, fontWeight: 600, letterSpacing: -0.1,
                boxShadow: '0 6px 20px rgba(230,57,70,0.4)',
              }}>Ver menú →</button>
              <button style={{
                height: 54, padding: '0 28px', borderRadius: 12, background: 'transparent',
                color: '#fff', border: `1.5px solid ${FP.borderStrong}`, cursor: 'pointer', fontFamily: FP.font,
                fontSize: 15, fontWeight: 600, letterSpacing: -0.1,
              }}>Descargar app</button>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100%' }}>
            <WebHeroPhone/>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ padding: '40px 32px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {cats.map(c => {
              const active = c === cat;
              return (
                <button key={c} onClick={() => setCat(c)} style={{
                  height: 40, padding: '0 20px', borderRadius: 999,
                  background: active ? FP.accent : FP.card,
                  color: '#fff', fontSize: 14, fontWeight: 600,
                  border: active ? 'none' : `1px solid ${FP.border}`,
                  cursor: 'pointer', fontFamily: FP.font, letterSpacing: -0.1,
                  transition: 'all 0.15s',
                }}>{c}</button>
              );
            })}
          </div>
        </div>
      </section>

      {/* MENU GRID */}
      <section style={{ padding: '32px 32px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24 }}>
            <div>
              <h2 style={{ fontSize: 32, fontWeight: 800, letterSpacing: -1, margin: 0 }}>Nuestro menú</h2>
              <p style={{ fontSize: 14, color: FP.textMuted, marginTop: 6 }}>
                {WEB_DISHES.length} platos preparados con ingredientes seleccionados.
              </p>
            </div>
            <div style={{ fontSize: 13, color: FP.textMuted }}>Pídelos desde la app</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {WEB_DISHES.map(d => (
              <div key={d.id} className="dish-card" style={{
                background: FP.card, borderRadius: 16, overflow: 'hidden',
                border: `1px solid ${FP.border}`, cursor: 'pointer',
                display: 'flex', flexDirection: 'column',
                transition: 'transform 0.18s, border-color 0.18s, box-shadow 0.18s',
              }}>
                <WebImage label={`PHOTO\n${d.name.toUpperCase()}`} hue={d.hue} radius={0}/>
                <div style={{ padding: '16px 18px 18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.3, lineHeight: 1.25 }}>
                    {d.name}
                  </div>
                  <div style={{
                    fontSize: 13, color: FP.textMuted, marginTop: 6, lineHeight: 1.45,
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    minHeight: 38,
                  }}>{d.desc}</div>
                  <div style={{
                    marginTop: 14, paddingTop: 14, borderTop: `1px solid ${FP.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}>
                    <span style={{ fontSize: 22, fontWeight: 700, color: FP.accent, letterSpacing: -0.4 }}>
                      {fmt(d.price)}
                    </span>
                    <span style={{
                      height: 24, padding: '0 10px', borderRadius: 999, fontSize: 11, fontWeight: 700,
                      background: d.available ? FP.successBg : 'rgba(150,150,160,0.18)',
                      color: d.available ? FP.success : FP.textMuted,
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      border: `1px solid ${d.available ? 'rgba(46,204,113,0.3)' : 'rgba(255,255,255,0.1)'}`,
                    }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%',
                        background: d.available ? FP.success : FP.textMuted }}/>
                      {d.available ? 'Disponible' : 'Agotado'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WebCTABand/>
      <WebFooter/>
      <style>{`
        .dish-card:hover { border-color: ${FP.accent} !important; transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.4), 0 0 0 1px ${FP.accent}; }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// W2 — Detalle del plato
// ─────────────────────────────────────────────────────────────
function WebDetail() {
  const dish = WEB_DISHES[0]; // Pasta Boloñesa
  const related = WEB_DISHES.filter(d => d.id !== dish.id).slice(0, 3);
  const [thumb, setThumb] = React.useState(0);
  const breadcrumb = ['Inicio', 'Menú', 'Pastas', dish.name];

  return (
    <div style={{ width: 1440, background: FP.bg, color: '#fff', fontFamily: FP.font, WebkitFontSmoothing: 'antialiased' }}>
      <WebHeader active="Menú"/>

      {/* breadcrumb */}
      <div style={{ padding: '24px 32px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: FP.textMuted }}>
          {breadcrumb.map((b, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span style={{ color: FP.textDim }}>›</span>}
              <span style={{ color: i === breadcrumb.length - 1 ? '#fff' : FP.textMuted, cursor: 'pointer', fontWeight: i === breadcrumb.length - 1 ? 600 : 400 }}>
                {b}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* main 60/40 */}
      <section style={{ padding: '32px 32px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 48 }}>
          {/* LEFT */}
          <div>
            <WebImage label={`HERO PHOTO\n${dish.name.toUpperCase()} · view ${thumb + 1}`} hue={dish.hue + thumb * 6} radius={16}
              style={{ boxShadow: '0 16px 48px rgba(0,0,0,0.5)' }}/>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 16 }}>
              {[0, 1, 2, 3].map(i => (
                <button key={i} onClick={() => setThumb(i)} style={{
                  border: 'none', padding: 0, cursor: 'pointer', background: 'transparent',
                  borderRadius: 12, overflow: 'hidden', position: 'relative',
                  outline: i === thumb ? `2px solid ${FP.accent}` : 'none', outlineOffset: 2,
                }}>
                  <WebImage label={`thumb ${i + 1}`} hue={dish.hue + i * 6} radius={12}/>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{
              display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 6,
              height: 28, padding: '0 12px', borderRadius: 999,
              background: FP.successBg, border: '1px solid rgba(46,204,113,0.3)',
              color: FP.success, fontSize: 12, fontWeight: 600, marginBottom: 16,
            }}>
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: FP.success, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FPIcons.check size={9}/>
              </div>
              Disponible para pedido
            </div>
            <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: -1, margin: 0, lineHeight: 1.1 }}>
              {dish.name}
            </h1>
            <div style={{ marginTop: 16, fontSize: 32, fontWeight: 800, color: FP.accent, letterSpacing: -0.8 }}>
              {fmt(dish.price)}
            </div>

            <div style={{ marginTop: 28 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: FP.textMuted, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 10 }}>Descripción</div>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: FP.textMuted, margin: 0, textWrap: 'pretty' }}>
                {dish.descLong}
              </p>
            </div>

            <div style={{ marginTop: 28 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: FP.textMuted, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 10 }}>Ingredientes</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {dish.ingredients.map(ing => (
                  <span key={ing} style={{
                    height: 32, padding: '0 14px', borderRadius: 999, fontSize: 13, fontWeight: 500,
                    background: FP.cardElev, color: '#fff', border: `1px solid ${FP.border}`,
                    display: 'inline-flex', alignItems: 'center',
                  }}>{ing}</span>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 28 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: FP.textMuted, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 10 }}>Información nutricional</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                {[
                  { l: 'Calorías', v: dish.nutrition.kcal },
                  { l: 'Proteínas', v: dish.nutrition.prot },
                  { l: 'Carbohidratos', v: dish.nutrition.carb },
                  { l: 'Grasas', v: dish.nutrition.fat },
                ].map((s, i) => (
                  <div key={i} style={{
                    background: FP.card, border: `1px solid ${FP.border}`, borderRadius: 12,
                    padding: '14px 12px', textAlign: 'center',
                  }}>
                    <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.4 }}>{s.v}</div>
                    <div style={{ fontSize: 11, color: FP.textMuted, marginTop: 4 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* App promo card */}
            <div style={{
              marginTop: 28, padding: 20, borderRadius: 16, background: FP.cardElev,
              border: `1px solid ${FP.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20,
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.2 }}>Pídelo desde nuestra app móvil</div>
                <div style={{ fontSize: 12, color: FP.textMuted, marginTop: 4 }}>Sigue tu pedido en tiempo real.</div>
              </div>
              <StoreButtons size="md"/>
            </div>

            <button style={{
              marginTop: 16, height: 50, borderRadius: 12, background: 'transparent',
              color: '#fff', border: `1.5px solid ${FP.borderStrong}`, cursor: 'pointer', fontFamily: FP.font,
              fontSize: 14, fontWeight: 600, letterSpacing: -0.1,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 3L5 7l4 4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Volver al menú
            </button>
          </div>
        </div>
      </section>

      {/* Related */}
      <section style={{ padding: '64px 32px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.8, margin: '0 0 24px' }}>
            También te puede gustar
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {related.map(d => (
              <div key={d.id} className="dish-card" style={{
                background: FP.card, borderRadius: 16, overflow: 'hidden',
                border: `1px solid ${FP.border}`, cursor: 'pointer',
                display: 'flex', alignItems: 'stretch',
                transition: 'transform 0.18s, border-color 0.18s, box-shadow 0.18s',
              }}>
                <div style={{ width: 160, flexShrink: 0 }}>
                  <WebImage label={d.name} hue={d.hue} radius={0} ratio={1}/>
                </div>
                <div style={{ flex: 1, padding: '14px 16px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: -0.3, lineHeight: 1.25 }}>{d.name}</div>
                  <div style={{
                    fontSize: 12, color: FP.textMuted, marginTop: 4, lineHeight: 1.4,
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}>{d.desc}</div>
                  <div style={{ marginTop: 'auto', paddingTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 18, fontWeight: 700, color: FP.accent, letterSpacing: -0.3 }}>{fmt(d.price)}</span>
                    <span style={{
                      height: 22, padding: '0 9px', borderRadius: 999, fontSize: 10, fontWeight: 700,
                      background: d.available ? FP.successBg : 'rgba(150,150,160,0.18)',
                      color: d.available ? FP.success : FP.textMuted,
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      border: `1px solid ${d.available ? 'rgba(46,204,113,0.3)' : 'rgba(255,255,255,0.1)'}`,
                    }}>
                      <span style={{ width: 4, height: 4, borderRadius: '50%',
                        background: d.available ? FP.success : FP.textMuted }}/>
                      {d.available ? 'Disponible' : 'Agotado'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WebFooter/>
    </div>
  );
}

window.WebHome = WebHome;
window.WebDetail = WebDetail;
