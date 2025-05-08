import React from 'react';
import './signup.css';

const Signup = () => {
  return (
    <div className="signup-container">
      <header>
        <h2>Đăng ký tài khoản</h2>
      </header>
      <form className="signup-form">
        <label htmlFor="username">Tên người dùng:</label>
        <input type="text" id="username" placeholder="Nhập tên người dùng" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" placeholder="Nhập email" required />

        <label htmlFor="password">Mật khẩu:</label>
        <input type="password" id="password" placeholder="Nhập mật khẩu" required />

        <label htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
        <input type="password" id="confirmPassword" placeholder="Nhập lại mật khẩu" required />

        <button type="submit" className="signup-btn">Đăng ký</button>
      </form>
    </div>
  );
};

export default Signup;