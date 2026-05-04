// 1. Splash / Welcome
function ScreenSplash({ onLogin, onSignup, onGuest }) {
  return (
    <FPPhone>
      <FPStatusBar/>
      {/* radial red glow behind logo */}
      <div style={{
        position: 'absolute', top: 180, left: '50%', transform: 'translateX(-50%)',
        width: 460, height: 460, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(230,57,70,0.35) 0%, rgba(230,57,70,0.08) 40%, transparent 70%)',
        filter: 'blur(8px)', pointerEvents: 'none',
      }}/>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1, paddingBottom: 80 }}>
        <FPIcons.fork size={88}/>
        <div style={{ marginTop: 22, fontSize: 36, fontWeight: 700, letterSpacing: -1.2 }}>
          FoodPlease
        </div>
        <div style={{ marginTop: 10, fontSize: 15, color: FP.textMuted, letterSpacing: -0.1 }}>
          Tu comida favorita, en minutos.
        </div>
      </div>

      <div style={{ padding: '0 24px 8px', display: 'flex', flexDirection: 'column', gap: 12, position: 'relative', zIndex: 1 }}>
        <FPButton onClick={onLogin}>Iniciar sesión</FPButton>
        <FPButton variant="outline" onClick={onSignup}>Crear cuenta</FPButton>
        <button onClick={onGuest} style={{
          marginTop: 8, background: 'transparent', border: 'none', cursor: 'pointer',
          color: FP.textMuted, fontSize: 13, textDecoration: 'underline',
          fontFamily: FP.font, padding: '8px 0',
        }}>
          Continuar como invitado
        </button>
      </div>
      <FPHomeIndicator/>
    </FPPhone>
  );
}

// 2. Login
function ScreenLogin({ onBack, onSignIn, onSignup }) {
  const [email, setEmail] = React.useState('cristian@mail.com');
  const [pwd, setPwd] = React.useState('••••••••');
  const [showPwd, setShowPwd] = React.useState(false);
  const [focused, setFocused] = React.useState(null);

  const Field = ({ id, label, value, onChange, type = 'text', icon }) => {
    const isFocus = focused === id;
    const hasValue = value && value.length > 0;
    const float = isFocus || hasValue;
    return (
      <div style={{
        position: 'relative', height: 60, borderRadius: FP.r.lg,
        background: FP.card,
        border: `1.5px solid ${isFocus ? FP.accent : 'transparent'}`,
        transition: 'border-color 0.15s', padding: '0 16px',
        display: 'flex', alignItems: 'center',
      }}>
        <label style={{
          position: 'absolute', left: 16, pointerEvents: 'none',
          color: float ? (isFocus ? FP.accent : FP.textMuted) : FP.textMuted,
          fontSize: float ? 11 : 15,
          top: float ? 10 : '50%', transform: float ? 'translateY(0)' : 'translateY(-50%)',
          transition: 'all 0.15s', fontWeight: 500, letterSpacing: -0.1,
        }}>{label}</label>
        <input
          type={type === 'password' && !showPwd ? 'password' : 'text'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(id)}
          onBlur={() => setFocused(null)}
          style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            color: '#fff', fontSize: 15, fontFamily: FP.font, paddingTop: 14,
            letterSpacing: -0.1,
          }}
        />
        {icon}
      </div>
    );
  };

  return (
    <FPPhone>
      <FPStatusBar/>
      <FPHeader title="Iniciar sesión" onBack={onBack}/>
      <div style={{ flex: 1, padding: '12px 24px 0', overflow: 'auto' }}>
        <div style={{ marginBottom: 8, fontSize: 24, fontWeight: 700, letterSpacing: -0.6 }}>
          Bienvenido de vuelta 👋
        </div>
        <div style={{ marginBottom: 28, fontSize: 14, color: FP.textMuted, letterSpacing: -0.1 }}>
          Ingresa tus datos para continuar
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Field id="email" label="Correo electrónico" value={email} onChange={setEmail}/>
          <Field id="pwd" label="Contraseña" value={pwd} onChange={setPwd} type="password"
            icon={
              <button onClick={() => setShowPwd(!showPwd)} style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                padding: 6, display: 'flex', alignItems: 'center',
              }}>
                <FPIcons.eye off={!showPwd}/>
              </button>
            }
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 14, marginBottom: 28 }}>
          <a style={{ color: FP.accent, fontSize: 13, fontWeight: 500, cursor: 'pointer', textDecoration: 'none' }}>
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        <FPButton onClick={onSignIn}>Ingresar</FPButton>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
          <div style={{ flex: 1, height: 1, background: FP.border }}/>
          <span style={{ fontSize: 12, color: FP.textDim }}>o continuar con</span>
          <div style={{ flex: 1, height: 1, background: FP.border }}/>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button style={{
            flex: 1, height: 56, borderRadius: FP.r.lg, background: FP.card,
            border: `1px solid ${FP.border}`, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="22" height="22" viewBox="0 0 22 22">
              <path fill="#4285F4" d="M21 11.2c0-.7-.1-1.4-.2-2H11v3.8h5.6a4.8 4.8 0 0 1-2.1 3.1v2.6h3.4c2-1.8 3.1-4.5 3.1-7.5z"/>
              <path fill="#34A853" d="M11 21c2.8 0 5.2-.9 6.9-2.5l-3.4-2.6c-.9.6-2.1 1-3.5 1-2.7 0-5-1.8-5.8-4.3H1.7v2.7C3.4 18.7 6.9 21 11 21z"/>
              <path fill="#FBBC05" d="M5.2 12.6a6 6 0 0 1 0-3.8V6.1H1.7a10 10 0 0 0 0 9l3.5-2.5z"/>
              <path fill="#EA4335" d="M11 4.8c1.5 0 2.9.5 4 1.5l3-3C16.2 1.7 13.8.8 11 .8 6.9.8 3.4 3.1 1.7 6.5l3.5 2.7c.8-2.5 3.1-4.4 5.8-4.4z"/>
            </svg>
          </button>
          <button style={{
            flex: 1, height: 56, borderRadius: FP.r.lg, background: FP.card,
            border: `1px solid ${FP.border}`, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="#fff">
              <path d="M16.4 11.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9-.7 0-1.9-.8-3.1-.8-1.6 0-3.1.9-3.9 2.4-1.7 2.9-.4 7.2 1.2 9.5.8 1.1 1.7 2.4 3 2.4 1.2-.1 1.7-.8 3.1-.8s1.9.8 3.1.7c1.3 0 2.1-1.2 2.9-2.3.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.7-1-2.7-4z"/>
              <path d="M14.1 4.7c.6-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.1 1.8-1 2.9 1.1.1 2.2-.6 2.8-1.4z"/>
            </svg>
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: 32, fontSize: 14, color: FP.textMuted }}>
          ¿No tienes cuenta?{' '}
          <a onClick={onSignup} style={{ color: FP.accent, fontWeight: 600, cursor: 'pointer' }}>
            Regístrate
          </a>
        </div>
      </div>
      <FPHomeIndicator/>
    </FPPhone>
  );
}

window.ScreenSplash = ScreenSplash;
window.ScreenLogin = ScreenLogin;
