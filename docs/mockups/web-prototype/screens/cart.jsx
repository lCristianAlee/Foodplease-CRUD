// 5. Cart
function ScreenCart({ items, onBack, onChangeQty, onRemove, onCheckout }) {
  const fmt = (n) => '$' + n.toLocaleString('es-CL');
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const ship = 3500;
  const total = subtotal + ship;

  return (
    <FPPhone>
      <FPStatusBar/>
      <FPHeader title={`Mi carrito (${items.length})`} onBack={onBack}/>
      <div style={{ flex: 1, overflow: 'auto', padding: '4px 24px 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.map(it => (
            <div key={it.id} style={{
              display: 'flex', gap: 12, padding: 12, background: FP.card,
              borderRadius: FP.r.lg, alignItems: 'flex-start',
            }}>
              <FPImagePlaceholder label="DISH" h={72} hue={it.hue} radius={FP.r.md} style={{ width: 72, flexShrink: 0 }}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: -0.2, lineHeight: 1.25 }}>{it.name}</div>
                <div style={{ marginTop: 4, fontSize: 13, color: FP.accent, fontWeight: 600 }}>{fmt(it.price)}</div>
                <div style={{ marginTop: 2, fontSize: 11, color: FP.textDim }}>Unitario · ×{it.qty}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: FP.cardElev, borderRadius: FP.r.full, padding: 3 }}>
                  <button onClick={() => onChangeQty(it.id, Math.max(1, it.qty - 1))} style={{
                    width: 24, height: 24, borderRadius: FP.r.full, background: 'transparent',
                    border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <FPIcons.minus size={12}/>
                  </button>
                  <span style={{ fontSize: 13, fontWeight: 700, minWidth: 14, textAlign: 'center' }}>{it.qty}</span>
                  <button onClick={() => onChangeQty(it.id, it.qty + 1)} style={{
                    width: 24, height: 24, borderRadius: FP.r.full, background: FP.accent,
                    border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <FPIcons.plus size={12}/>
                  </button>
                </div>
                <button onClick={() => onRemove(it.id)} style={{
                  background: 'transparent', border: 'none', cursor: 'pointer', padding: 4,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <FPIcons.trash/>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Discount code */}
        <div style={{ marginTop: 20, display: 'flex', gap: 8 }}>
          <input placeholder="Código de descuento" style={{
            flex: 1, height: 44, borderRadius: FP.r.md, background: FP.card,
            border: `1px solid ${FP.border}`, padding: '0 14px',
            color: '#fff', fontSize: 13, fontFamily: FP.font, outline: 'none',
          }}/>
          <button style={{
            height: 44, padding: '0 18px', borderRadius: FP.r.md,
            background: 'transparent', border: `1.5px solid ${FP.accent}`, color: FP.accent,
            fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: FP.font,
          }}>Aplicar</button>
        </div>

        {/* Summary */}
        <div style={{ marginTop: 22 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: FP.textMuted, textTransform: 'uppercase', letterSpacing: 0.6 }}>
            Resumen del pedido
          </div>
          <div style={{ background: FP.card, borderRadius: FP.r.lg, padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
              <span style={{ color: FP.textMuted }}>Subtotal</span>
              <span style={{ fontWeight: 600 }}>{fmt(subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
              <span style={{ color: FP.textMuted }}>Costo de envío</span>
              <span style={{ fontWeight: 600 }}>{fmt(ship)}</span>
            </div>
            <div style={{ height: 1, background: FP.border, margin: '4px 0' }}/>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 15, fontWeight: 700 }}>Total</span>
              <span style={{ fontSize: 20, fontWeight: 800, color: FP.accent, letterSpacing: -0.4 }}>{fmt(total)}</span>
            </div>
          </div>
        </div>

        <div style={{ height: 110 }}/>
      </div>

      <div style={{
        padding: '12px 24px 0',
        background: 'linear-gradient(180deg, rgba(15,15,18,0) 0%, #0F0F12 30%)',
      }}>
        <FPButton onClick={onCheckout}>Ir a pagar · {fmt(total)}</FPButton>
        <FPHomeIndicator/>
      </div>
    </FPPhone>
  );
}

window.ScreenCart = ScreenCart;
