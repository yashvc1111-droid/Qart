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
import { ShoppingList } from './screens/ShoppingList';
import { ScanHistory } from './screens/ScanHistory';

function App() {
  const [screen, setScreen] = useState<Screen>('login');
  const [userName, setUserName] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [shoppingList, setShoppingList] = useState<string[]>([]);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [scanHistory, setScanHistory] = useState<Product[]>([]);

  const handleLogin = (name: string) => {
    setUserName(name);
    setScreen('home');
  };

  const goHome = () => setScreen('home');

  const handleSelectProduct = (p: Product) => {
    setSelectedProduct(p);
    setScreen('product');
  };

  const markScannedForList = (p: Product) => {
    if (shoppingList.includes(p.id)) {
      setCheckedList((current) =>
        current.includes(p.id) ? current : [...current, p.id]
      );
    }
  };

  const handleScan = (p: Product) => {
    setSelectedProduct(p);

    if (shoppingList.includes(p.id)) {
      setCheckedList((current) =>
        current.includes(p.id) ? current : [...current, p.id]
      );
    }

    setScanHistory((current) => [
      p,
      ...current.filter((item) => item.id !== p.id),
    ].slice(0, 10));

    setScreen('product');
  };

  const addToShoppingList = (productId: string) => {
    setShoppingList((current) =>
      current.includes(productId) ? current : [...current, productId]
    );
  };

  const removeFromShoppingList = (productId: string) => {
    setShoppingList((current) => current.filter((id) => id !== productId));
    setCheckedList((current) => current.filter((id) => id !== productId));
  };

  const handleCheckoutSuccess = (o: OrderDetails) => {
    setOrder(o);
    setScreen('success');
  };

  return (
    <CartProvider>
      {screen === 'login' && <Login onLogin={handleLogin} />}

      {screen === 'home' && (
        <Home
          userName={userName}
          onNavigate={(s) => setScreen(s)}
          onSelectProduct={handleSelectProduct}
          shoppingListCount={shoppingList.length}
          onOpenHistory={() => setScreen('history')}
        />
      )}

      {screen === 'scanner' && (
        <Scanner
          onBack={goHome}
          onScan={handleScan}
          onProductDetected={markScannedForList}
        />
      )}


      {screen === 'history' && (
        <ScanHistory history={scanHistory} onBack={goHome} onScan={() => setScreen('scanner')} />
      )}

      {screen === 'shoppingList' && (
        <ShoppingList
          productIds={shoppingList}
          checkedIds={checkedList}
          onBack={goHome}
          onAddProduct={addToShoppingList}
          onRemoveProduct={removeFromShoppingList}
          onScan={() => setScreen('scanner')}
          onNewList={() => {
            setShoppingList([]);
            setCheckedList([]);
          }}
        />
      )}

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
