// 4. Dish detail
function ScreenDetail({ dish, onBack, onAddCart }) {
  const [size, setSize] = React.useState('Personal');
  const [extras, setExtras] = React.useState({ queso: false, pan: false });
  const [qty, setQty] = React.useState(1);
  const [fav, setFav] = React.useState(false);

  const base = dish.price;
  const extraPrice = (extras.queso ? 1500 : 0) + (extras.pan ? 2000 : 0);
  const total = (base + extraPrice) * qty;
  const fmt = (n) => '$' + n.toLocaleString('es-CL');

  return (
    <FPPhone>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 5 }}>
        <FPStatusBar/>
      </div>
      {/* Hero image */}
      <div style={{ position: 'relative', height: 340, flexShrink: 0 }}>
        <FPImagePlaceholder label={`HERO PHOTO\n${dish.name.toUpperCase()}`} h={340} hue={dish.hue} radius={0}/>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(15,15,18,0.4) 0%, transparent 30%, rgba(15,15,18,0.6) 100%)',
        }}/>
        {/* back + heart */}
        <button onClick={onBack} style={{
          position: 'absolute', top: 56, left: 16, width: 40, height: 40, borderRadius: FP.r.full,
          background: 'rgba(15,15,18,0.6)', backdropFilter: 'blur(10px)', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <FPIcons.back/>
        </button>
        <button onClick={() => setFav(!fav)} style={{
          position: 'absolute', top: 56, right: 16, width: 40, height: 40, borderRadius: FP.r.full,
          background: 'rgba(15,15,18,0.6)', backdropFilter: 'blur(10px)', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <FPIcons.heart filled={fav}/>
        </button>
      </div>

      {/* Sheet */}
      <div style={{
        flex: 1, marginTop: -28, background: FP.bg, borderRadius: '24px 24px 0 0',
        padding: '24px 24px 0', overflow: 'auto', position: 'relative', zIndex: 2,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ flex: 1, fontSize: 24, fontWeight: 700, letterSpacing: -0.6, lineHeight: 1.2 }}>
            {dish.name}
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: FP.accent, letterSpacing: -0.4 }}>
            {fmt(dish.price)}
          </div>
        </div>

        {/* Available badge */}
        <div style={{
          marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 6,
          height: 28, padding: '0 12px', borderRadius: FP.r.full,
          background: FP.successBg, border: '1px solid rgba(46,204,113,0.3)',
          color: FP.success, fontSize: 12, fontWeight: 600,
        }}>
          <div style={{ width: 16, height: 16, borderRadius: '50%', background: FP.success, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FPIcons.check size={10}/>
          </div>
          Disponible para pedido
        </div>

        {/* Description */}
        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Descripción</div>
          <div style={{ fontSize: 14, lineHeight: 1.55, color: FP.textMuted, textWrap: 'pretty' }}>
            {dish.desc || 'Espaguetis o tallarines acompañados de una salsa roja de carne molida, tomate y hierbas frescas.'}
          </div>
        </div>

        {/* Customize */}
        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Personaliza tu pedido</div>

          <div style={{ fontSize: 13, color: FP.textMuted, marginBottom: 8, fontWeight: 500 }}>Tamaño</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { id: 'Personal', label: 'Personal', extra: 0 },
              { id: 'Familiar', label: 'Familiar', extra: 8000 },
            ].map(o => {
              const sel = size === o.id;
              return (
                <button key={o.id} onClick={() => setSize(o.id)} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '14px 16px', background: FP.card,
                  border: `1.5px solid ${sel ? FP.accent : 'transparent'}`,
                  borderRadius: FP.r.md, cursor: 'pointer',
                }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%',
                    border: `2px solid ${sel ? FP.accent : FP.borderStrong}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {sel && <div style={{ width: 10, height: 10, borderRadius: '50%', background: FP.accent }}/>}
                  </div>
                  <div style={{ flex: 1, textAlign: 'left', color: '#fff', fontSize: 14, fontWeight: 500 }}>{o.label}</div>
                  {o.extra > 0 && <div style={{ fontSize: 13, color: FP.textMuted }}>+{fmt(o.extra)}</div>}
                </button>
              );
            })}
          </div>

          <div style={{ fontSize: 13, color: FP.textMuted, margin: '20px 0 8px', fontWeight: 500 }}>Extras</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { id: 'queso', label: 'Queso parmesano', extra: 1500 },
              { id: 'pan', label: 'Pan de ajo', extra: 2000 },
            ].map(o => {
              const sel = extras[o.id];
              return (
                <button key={o.id} onClick={() => setExtras({ ...extras, [o.id]: !sel })} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '14px 16px', background: FP.card,
                  border: `1.5px solid ${sel ? FP.accent : 'transparent'}`,
                  borderRadius: FP.r.md, cursor: 'pointer',
                }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: 5,
                    border: `2px solid ${sel ? FP.accent : FP.borderStrong}`,
                    background: sel ? FP.accent : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {sel && <FPIcons.check size={11}/>}
                  </div>
                  <div style={{ flex: 1, textAlign: 'left', color: '#fff', fontSize: 14, fontWeight: 500 }}>{o.label}</div>
                  <div style={{ fontSize: 13, color: FP.textMuted }}>+{fmt(o.extra)}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quantity */}
        <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>Cantidad</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: FP.card, borderRadius: FP.r.full, padding: 4 }}>
            <button onClick={() => setQty(Math.max(1, qty - 1))} style={{
              width: 36, height: 36, borderRadius: FP.r.full, background: FP.cardElev,
              border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <FPIcons.minus/>
            </button>
            <span style={{ fontSize: 16, fontWeight: 700, minWidth: 16, textAlign: 'center' }}>{qty}</span>
            <button onClick={() => setQty(qty + 1)} style={{
              width: 36, height: 36, borderRadius: FP.r.full, background: FP.accent,
              border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <FPIcons.plus/>
            </button>
          </div>
        </div>

        <div style={{ height: 100 }}/>
      </div>

      {/* Sticky CTA */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 4,
        padding: '14px 24px 0',
        background: 'linear-gradient(180deg, rgba(15,15,18,0) 0%, rgba(15,15,18,0.95) 30%, #0F0F12 100%)',
      }}>
        <FPButton onClick={() => onAddCart(dish, { size, extras, qty, total })}>
          Agregar al carrito · {fmt(total)}
        </FPButton>
        <FPHomeIndicator/>
      </div>
    </FPPhone>
  );
}

window.ScreenDetail = ScreenDetail;
