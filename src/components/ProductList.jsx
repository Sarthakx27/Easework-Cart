import React from 'react';
import { Search, ShoppingCart, Plus, Minus } from 'lucide-react';

const ProductList = ({
  products = [],
  searchQuery = '',
  setSearchQuery = () => {},
  cart = [],
  addToCart = () => {},
  setSelectedProduct = () => {},
  setCurrentPage = () => {},
  updateQuantity = () => {}
}) => {
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCartQuantity = (productId) => {
    const cartItem = cart.find(item => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full p-3 pl-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-3.5 text-gray-400" size={24} />
          </div>
          <button
            onClick={() => setCurrentPage('cart')}
            className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <ShoppingCart size={24} />
            <span className="font-bold text-lg">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
          </button>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p className="text-xl">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredProducts.map(product => {
            const quantity = getCartQuantity(product.id);

            return (
              <div key={product.id} className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 dark:text-white">{product.name}</h3>
                  <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-6">${product.price.toFixed(2)}</p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setCurrentPage('details');
                      }}
                      className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-3 rounded-xl font-medium transition-colors duration-200"
                    >
                      View Details
                    </button>
                    {quantity === 0 ? (
                      <button
                        onClick={() => addToCart(product)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200"
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div className="flex-1 flex items-center justify-between gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(product.id, -1)}
                          className="p-2 rounded-md hover:bg-white dark:hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50"
                          disabled={quantity === 1}
                        >
                          <Minus size={18} className="dark:text-white" />
                        </button>
                        <span className="w-8 text-center font-medium dark:text-white">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, 1)}
                          className="p-2 rounded-md hover:bg-white dark:hover:bg-gray-600 transition-colors duration-200"
                        >
                          <Plus size={18} className="dark:text-white" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductList;
