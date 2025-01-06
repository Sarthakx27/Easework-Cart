import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import ThemeSwitcher from './components/ThemeSwitcher';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import products from './data/products';

function App() {
  const [currentPage, setCurrentPage] = useState('listing');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, change) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
      }
      return item;
    }).filter(item => item !== null));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-200">
              E-commerce Store
            </h1>
            <ThemeSwitcher />
          </div>
        </header>

        <main className="max-w-7xl mx-auto">
          {currentPage === 'listing' && (
            <ProductList
              products={products}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              cart={cart}
              addToCart={addToCart}
              setSelectedProduct={setSelectedProduct}
              setCurrentPage={setCurrentPage}
              updateQuantity={updateQuantity}
            />
          )}
          {currentPage === 'details' && selectedProduct && (
            <ProductDetails
              selectedProduct={selectedProduct}
              setCurrentPage={setCurrentPage}
              addToCart={addToCart}
              cart={cart}
              updateQuantity={updateQuantity}
            />
          )}
          {currentPage === 'cart' && (
            <Cart
              cart={cart}
              setCurrentPage={setCurrentPage}
              clearCart={clearCart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              cartTotal={cartTotal}
            />
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
