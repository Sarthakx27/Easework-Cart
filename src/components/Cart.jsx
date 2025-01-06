import React from 'react';
import { Plus, Minus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';

const Cart = ({ 
  cart = [], 
  setCurrentPage = () => {}, 
  clearCart = () => {}, 
  updateQuantity = () => {}, 
  removeFromCart = () => {} 
}) => {
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => setCurrentPage('listing')}
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 text-lg"
          >
            <ArrowLeft className="mr-2" size={20} />
            Continue Shopping
          </button>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="inline-flex items-center px-4 py-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
            >
              <Trash2 size={20} className="mr-2" /> Clear Cart
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
            <ShoppingBag size={48} className="mx-auto mb-4 text-gray-400 dark:text-gray-500" />
            <h2 className="text-2xl font-bold mb-3 dark:text-white">Your cart is empty</h2>
            <p className="text-gray-600 dark:text-gray-300">Add some products to your cart to see them here.</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
            <div className="divide-y dark:divide-gray-700">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-6 p-6 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold dark:text-white mb-1">{item.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-2 rounded-md hover:bg-white dark:hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50"
                      disabled={item.quantity === 1}
                    >
                      <Minus size={18} className="dark:text-white" />
                    </button>
                    <span className="w-8 text-center font-medium dark:text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-2 rounded-md hover:bg-white dark:hover:bg-gray-600 transition-colors duration-200"
                    >
                      <Plus size={18} className="dark:text-white" />
                    </button>
                  </div>
                  <div className="text-right min-w-[120px]">
                    <p className="text-lg font-bold dark:text-white mb-1">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-700/50">
              <div className="flex justify-between items-center mb-6">
                <span className="text-2xl font-bold dark:text-white">Total:</span>
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => alert('Checkout functionality not implemented')}
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-medium shadow-md hover:shadow-xl transition-all duration-200"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;