import { useState } from 'react';
import { CartProvider } from './cart';
import type { OrderDetails, Product, Screen } from './types';
import { Login } from './screens/Login';
import { Home } from './screens/Home';
import { Scanner } from './screens/Scanner';
import { ProductDetails } from './screens/ProductDetails';
import { Cart } from './screens/Cart';
import { Checkout } from './screens/Checkout';
import { Success } from './screens/Success';
import { ExitScanner } from './screens/ExitScanner';

function App() {
  const [screen, setScreen] = useState<Screen>('login');
  const [userName, setUserName] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [order, setOrder] = useState<OrderDetails | null>(null);

  const handleLogin = (name: string) => {
    setUserName(name);
    setScreen('home');
  };

  const goHome = () => setScreen('home');

  const handleSelectProduct = (p: Product) => {
    setSelectedProduct(p);
    setScreen('product');
  };

  const handleScan = (p: Product) => {
    setSelectedProduct(p);
    setScreen('product');
  };

  const handleCheckoutSuccess = (o: OrderDetails) => {
    setOrder(o);
    setScreen('success');
  };

  return (
    <CartProvider>
      {screen === 'login' && <Login onLogin={handleLogin} />}

      {screen === 'home' && (
        <Home userName={userName} onNavigate={(s) => setScreen(s)} onSelectProduct={handleSelectProduct} />
      )}

      {screen === 'scanner' && <Scanner onBack={goHome} onScan={handleScan} />}

      {screen === 'product' && selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onBack={goHome}
          onGoCart={() => setScreen('cart')}
        />
      )}

      {screen === 'cart' && (
        <Cart
          onBack={goHome}
          onCheckout={() => setScreen('checkout')}
          onScan={() => setScreen('scanner')}
        />
      )}

      {screen === 'checkout' && (
        <Checkout onBack={() => setScreen('cart')} onSuccess={handleCheckoutSuccess} />
      )}

      {screen === 'success' && order && (
        <Success
          order={order}
          onExit={() => setScreen('exit')}
          onHome={() => {
            setOrder(null);
            setScreen('home');
          }}
        />
      )}

      {screen === 'exit' && (
        <ExitScanner
          order={order}
          onHome={() => {
            setOrder(null);
            setScreen('home');
          }}
        />
      )}
    </CartProvider>
  );
}

export default App;
