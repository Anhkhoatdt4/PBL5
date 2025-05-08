import React from 'react';
import './user_info.css';

const UserInfo = () => {
  return (
    <div>
      <header>
        <div className="logo">
          <img src="/image/logo.png" alt="Logo" />
          <span>BKN Fruits</span>
        </div>
        <a href="/home" className="back-btn">🏠 Home</a>
      </header>

      <section className="user-info">
        <h2>Thông tin người dùng</h2>
        <div className="user-details">
          <p><strong>Tên:</strong> Nguyễn Văn B</p>
          <p><strong>Email:</strong> nguyenb@example.com</p>
          <p><strong>Số điện thoại:</strong> 0123456789</p>
        </div>
      </section>
    </div>
  );
};

export default UserInfo;