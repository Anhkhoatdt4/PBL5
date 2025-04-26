import React from 'react';
import './order.css';

const Order = () => {
  return (
    <div>
      <header>
        <div className="logo">
          <img src="/image/logo.png" alt="Logo" />
          <span>BKN Fruits</span>
        </div>
        <a href="/pay">
          <button className="new-order-btn">
            <i className="fa-solid fa-plus"></i> New Order
          </button>
        </a>
        <a href="/home" className="back-btn">🏠 Home</a>
      </header>

      <section className="orders">
        <h2>Your Orders</h2>
        <div className="order-list">
          {/* Example Order */}
          <div className="order">
            <div className="order-header">
              <p><i className="fa-solid fa-cart-shopping"></i> Hóa đơn #001</p>
              <span className="price">150.000 VNĐ</span>
            </div>
            <div className="order-body">
              <ul>
                <li>Táo - 2kg</li>
                <li>Chuối - 1.5kg</li>
                <li>Nho - 3kg</li>
              </ul>
            </div>
            <div className="order-footer">
              <button className="view-btn" onClick={() => viewOrder(1)}>View Details</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const viewOrder = (orderId: number) => {
  window.location.href = `/order-details?id=${orderId}`;
};

export default Order;