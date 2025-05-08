import React from 'react';
import './staff_ad.css';

const Staff = () => {
  return (
    <div>
      <header>
        <div className="logo">
          <img src="/image/logo.png" alt="Logo" />
          <span>BKN Fruits</span>
        </div>
        <a href="/home" className="back-btn">🏠 Home</a>
      </header>

      <section className="staff">
        <h2>Danh sách nhân viên</h2>
        <div className="staff-container">
          {/* Example Staff */}
          <div className="staff-member">
            <img src="/image/staff1.png" alt="Nhân viên 1" />
            <h3>Nguyễn Văn A</h3>
            <p>Chức vụ: Quản lý</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Staff;