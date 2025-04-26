import React, { useEffect, useState } from 'react';
import './order_details.css';

const orders: Record<string, { total: string; items: { fruit: string; weight: string; price: string; }[] }> = {
  1: {
    total: "150.000 VNĐ",
    items: [
      { fruit: "Táo", weight: "2kg", price: "60.000 VNĐ" },
      { fruit: "Chuối", weight: "1.5kg", price: "30.000 VNĐ" },
      { fruit: "Nho", weight: "3kg", price: "60.000 VNĐ" },
    ],
  },
  2: {
    total: "180.000 VNĐ",
    items: [
      { fruit: "Dứa", weight: "1kg", price: "40.000 VNĐ" },
      { fruit: "Xoài", weight: "2kg", price: "70.000 VNĐ" },
      { fruit: "Cam", weight: "2.5kg", price: "70.000 VNĐ" },
    ],
  },
  3: {
    total: "210.000 VNĐ",
    items: [
      { fruit: "Cherry", weight: "1kg", price: "80.000 VNĐ" },
      { fruit: "Dưa hấu", weight: "3kg", price: "50.000 VNĐ" },
      { fruit: "Táo", weight: "2.5kg", price: "80.000 VNĐ" },
    ],
  },
};

const OrderDetails = () => {
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    setOrderId(id);

    if (id && orders[id]) {
      setOrderDetails(orders[id]);
    }
  }, []);

  return (
    <div>
      <header>
        <div className="logo">
          <img src="/image/logo.png" alt="Logo" />
          <span>BKN Fruits</span>
        </div>
        <a href="/order" className="back-btn">
          <i className="fa-solid fa-backward-step"></i> Back to Orders
        </a>
      </header>

      <section className="order-details">
        <h2 id="orderTitle">
          {orderDetails ? `Chi tiết Hóa đơn #${orderId}` : "Không tìm thấy hóa đơn!"}
        </h2>
        {orderDetails && (
          <>
            <h4>Danh sách trái cây:</h4>
            <div id="orderItems" className="order-items">
              {orderDetails.items.map((item: any, index: number) => (
                <div className="order-item" key={index}>
                  <span className="fruit">{item.fruit}</span>
                  <span className="weight">{item.weight}</span>
                  <span className="price">{item.price}</span>
                </div>
              ))}
            </div>
            <div id="orderTotal" className="total-price">
              <strong>Tổng tiền:</strong> {orderDetails.total}
            </div>
            <button id="exportInvoice" className="export-btn">
              <i className="fa-solid fa-file-export"></i> Xuất Hóa Đơn
            </button>
          </>
        )}
      </section>

      <footer>
        <p>&copy; BKN Fruits. Mỗi ngày trái cây, mỗi ngày sức khỏe.</p>
      </footer>
    </div>
  );
};

export default OrderDetails;