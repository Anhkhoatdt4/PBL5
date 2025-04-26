import React from 'react';
import './pay.css';

const Pay = () => {
  return (
    <div>
      <header>
        <div className="logo">
          <img src="/image/logo.png" alt="Logo" />
          <h1>BKN Fruits</h1>
        </div>
        <a href="/home" className="back-btn">🏠 Home</a>
      </header>

      <section className="checkout-container">
        <h2>Cân Thông Minh</h2>
        <div className="scale-section">
          <div className="fruit-display">
            <img id="fruit-image" src="/image/images.jpeg" alt="Ảnh trái cây" />
            <div className="fruit-details">
              <p><strong>Loại quả:</strong> <span id="fruit-name">Đang chờ...</span></p>
              <p><strong>Khối lượng:</strong> <span id="fruit-weight">0g</span></p>
            </div>
          </div>
        </div>

        <h3>Danh sách mặt hàng</h3>
        <div className="item-list">
          <table>
            <thead>
              <tr>
                <th>Ảnh</th>
                <th>Tên</th>
                <th>Giá/kg</th>
                <th>Cân nặng</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody id="order-queue">
              {/* Các mặt hàng sẽ hiển thị tại đây */}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4}><strong>Tổng tiền:</strong></td>
                <td id="total-price">0 VNĐ</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <br /><br />
        <div className="customer-info">
          <h3>Thông tin người mua</h3>
          <label htmlFor="customerName">Tên khách hàng:</label>
          <input type="text" id="customerName" placeholder="Nhập tên người mua" required />

          <label htmlFor="customerPhone">Số điện thoại:</label>
          <input type="text" id="customerPhone" placeholder="Nhập số điện thoại" required />
        </div>
        <button id="exportInvoice" className="export-btn">
          <i className="fa-solid fa-file-export"></i> Xuất Hóa Đơn
        </button>
        <br /><br />
        <h3>Thanh toán</h3>
        <div className="payment">
          <img src="/image/qrcode.png" alt="Mã QR để thanh toán" className="qr-code" />
          <p>Vui lòng quét mã QR để thanh toán</p>
        </div>
      </section>
    </div>
  );
};

export default Pay;