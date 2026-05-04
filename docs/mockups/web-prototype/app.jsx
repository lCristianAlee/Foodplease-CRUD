// App — wires all screens into a navigable prototype, presented in a DesignCanvas

const HOME_DISH_BY_ID = Object.fromEntries(window.DISHES.map(d => [d.id, d]));

function PhoneFrame({ children }) {
  // Wraps each phone in a subtle bezel for design canvas presentation
  return (
    <div style={{
      width: 390, height: 844, borderRadius: 44, overflow: 'hidden',
      background: '#000',
      boxShadow: '0 30px 60px rgba(0,0,0,0.35), 0 0 0 10px #1a1a1f, 0 0 0 12px #2a2a32',
    }}>{children}</div>
  );
}

// Each artboard hosts an INDEPENDENT mini-app whose internal screen state
// starts at the screen the artboard is meant to showcase. Buttons inside
// navigate locally, so each card stays interactive without bleeding state.
function MiniApp({ start = 'splash' }) {
  const [screen, setScreen] = React.useState(start);
  const [activeDish, setActiveDish] = React.useState(window.DISHES[0]);
  const [cart, setCart] = React.useState([
    { id: 'pasta', name: 'Pasta Boloñesa', price: 35000, qty: 1, hue: 18 },
    { id: 'risotto', name: 'Risotto de Hongos', price: 19990, qty: 2, hue: 60 },
  ]);
  const cartCount = cart.reduce((s, it) => s + it.qty, 0);

  const onTab = (id) => {
    if (id === 'menu') setScreen('home');
    else if (id === 'cart') setScreen('cart');
    else if (id === 'profile') setScreen('profile');
    else if (id === 'orders') setScreen('tracking');
  };

  const screens = {
    splash: <ScreenSplash
      onLogin={() => setScreen('login')}
      onSignup={() => setScreen('login')}
      onGuest={() => setScreen('home')}
    />,
    login: <ScreenLogin
      onBack={() => setScreen('splash')}
      onSignIn={() => setScreen('home')}
      onSignup={() => setScreen('home')}
    />,
    home: <ScreenHome
      onDish={(d) => { setActiveDish(d); setScreen('detail'); }}
      onTab={onTab}
      cartCount={cartCount}
    />,
    detail: <ScreenDetail
      dish={activeDish}
      onBack={() => setScreen('home')}
      onAddCart={() => setScreen('cart')}
    />,
    cart: <ScreenCart
      items={cart}
      onBack={() => setScreen('home')}
      onChangeQty={(id, q) => setCart(cart.map(it => it.id === id ? { ...it, qty: q } : it))}
      onRemove={(id) => setCart(cart.filter(it => it.id !== id))}
      onCheckout={() => setScreen('tracking')}
    />,
    tracking: <ScreenTracking
      onBack={() => setScreen('home')}
      onDetail={() => setScreen('cart')}
    />,
    profile: <ScreenProfile
      onTab={onTab}
      cartCount={cartCount}
    />,
  };

  return <PhoneFrame>{screens[screen]}</PhoneFrame>;
}

function App() {
  return (
    <DesignCanvas>
      <DCSection id="flow" title="FoodPlease — App de delivery"
        subtitle="iPhone 14 · 390×844 · prototipo interactivo · click en cualquier pantalla para abrirla en focus mode">
        <DCArtboard id="splash" label="01 · Splash" width={390} height={844}>
          <MiniApp start="splash"/>
        </DCArtboard>
        <DCArtboard id="login" label="02 · Iniciar sesión" width={390} height={844}>
          <MiniApp start="login"/>
        </DCArtboard>
        <DCArtboard id="home" label="03 · Menú" width={390} height={844}>
          <MiniApp start="home"/>
        </DCArtboard>
        <DCArtboard id="detail" label="04 · Detalle del plato" width={390} height={844}>
          <MiniApp start="detail"/>
        </DCArtboard>
        <DCArtboard id="cart" label="05 · Carrito" width={390} height={844}>
          <MiniApp start="cart"/>
        </DCArtboard>
        <DCArtboard id="tracking" label="06 · Seguimiento" width={390} height={844}>
          <MiniApp start="tracking"/>
        </DCArtboard>
        <DCArtboard id="profile" label="07 · Perfil" width={390} height={844}>
          <MiniApp start="profile"/>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
