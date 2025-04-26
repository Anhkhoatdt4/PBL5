import React from 'react';
import './product_ad.css';

const Product = () => {
  return (
    <div>
      <header>
        <div className="logo">
          <img src="/image/logo.png" alt="Logo" />
          <span>BKN Fruits</span>
        </div>
        <a href="/home" className="back-btn">🏠 Home</a>
      </header>

      <section className="products">
        <h2>Danh sách sản phẩm</h2>
        <div className="product-container">
          {/* Example Product */}
          <div className="product">
            <img src="/image/apple.png" alt="Táo" />
            <h3>Táo</h3>
            <p>Giá: 30.000 VNĐ/kg</p>
            <button className="add-to-cart-btn">Thêm vào giỏ</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;