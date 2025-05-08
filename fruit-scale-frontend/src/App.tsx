import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/login';
import Home from './pages/Home/Home';
import Order from './pages/Order/Order';
import Pay from './pages/Pay/Pay';
import Product from './pages/Product/Product';

function App() {
  return (
    <Router>
      <Routes>
        {/* Trang mặc định (/) sẽ là Home */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </Router>
  );
}

export default App;
