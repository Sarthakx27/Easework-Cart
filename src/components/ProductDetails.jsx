import React from 'react';
import { ArrowLeft, Plus, Minus } from 'lucide-react';

const ProductDetails = ({ 
  selectedProduct = {}, 
  setCurrentPage = () => {}, 
  addToCart = () => {}, 
  cart = [], 
  updateQuantity = () => {} 
}) => {
  const cartItem = cart.find(item => item.id === selectedProduct.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => setCurrentPage('listing')}
          className="inline-flex items-center mb-8 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 text-lg"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Products
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative overflow-hidden">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-[500px] object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-8 lg:p-12">
              <div className="h-full flex flex-col">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4 dark:text-white">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-6">
                    ${selectedProduct.price.toFixed(2)}
                  </p>
                  <div className="prose dark:prose-invert max-w-none mb-8">
                    <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                      {selectedProduct.description}
                    </p>
                  </div>
                </div>
                
                <div className="mt-auto">
                  {quantity === 0 ? (
                    <button
                      onClick={() => addToCart({ ...selectedProduct, quantity: 1 })}
                      className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-medium shadow-md hover:shadow-xl transition-all duration-200"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex items-center justify-between gap-4 bg-gray-100 dark:bg-gray-700 rounded-xl p-4">
                      <button
                        onClick={() => updateQuantity(selectedProduct.id, -1)}
                        className="p-3 rounded-lg bg-white dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-200"
                      >
                        <Minus size={20} className="text-gray-600 dark:text-white" />
                      </button>
                      <span className="text-xl font-bold text-gray-900 dark:text-white">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(selectedProduct.id, 1)}
                        className="p-3 rounded-lg bg-white dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-200"
                      >
                        <Plus size={20} className="text-gray-600 dark:text-white" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
