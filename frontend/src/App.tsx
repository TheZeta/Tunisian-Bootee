import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ProductPage from './components/ProductPage';
import ShoppingCart from './components/ShoppingCart';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<ShoppingCart />} />
            </Routes>
            <ToastContainer />
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
