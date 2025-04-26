import React from 'react';
import './order_ad.css';

const OrderAdmin = () => {
  return (
    <div className="main-content">
      <header>
        <h2>Quản lý Đơn hàng</h2>
      </header>

      <div className="top-bar">
        <div className="actions">
          <button className="export-btn" style={{ backgroundColor: '#efcaca', border: '#efcaca', color: '#bf0000' }}>
            <i className="fa-solid fa-file-export"></i> Xuất dữ liệu
          </button>
        </div>
        <div className="search-box">
          <input type="text" id="searchInput" placeholder="Tìm kiếm đơn hàng..." />
          <i className="fa-solid fa-search"></i>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID đơn hàng</th>
            <th>Tổng tiền</th>
            <th>Edit</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody id="productTable">
          <tr>
            <td>1</td>
            <td>50.000đ</td>
            <td>
              <button className="edit-btn">
                <i className="fa-solid fa-pen"></i>
              </button>
            </td>
            <td>
              <button className="view-btn">
                <i className="fa-solid fa-eye"></i>
              </button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>20.000đ</td>
            <td>
              <button className="edit-btn">
                <i className="fa-solid fa-pen"></i>
              </button>
            </td>
            <td>
              <button className="view-btn">
                <i className="fa-solid fa-eye"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderAdmin;