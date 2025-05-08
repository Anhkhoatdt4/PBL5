async function loadOrderDetails() {

    const ImageJson = {
        "Apples": "https://i.pinimg.com/736x/23/e5/bd/23e5bdee6b301f3e5e2e92630afb6496.jpg",
        "Bananas": "https://i.pinimg.com/736x/1c/16/62/1c1662f546cc85a1d77732c840ff9113.jpg",
        "Grapes": "https://i.pinimg.com/736x/02/5d/ab/025dab583cff4e270588e882d7b1edf2.jpg",
        "Oranges": "https://i.pinimg.com/736x/90/28/81/90288198edffa1d0f96b194ae0448409.jpg",
        "Strawberries": "https://i.pinimg.com/736x/2e/dd/e5/2edde51bf1093fb111181945aa234470.jpg",
        "Watermelons": "https://i.pinimg.com/736x/1e/a7/a9/1ea7a9f76ef5487ed6f0e04286a48126.jpg",
        "Pineapples": "https://i.pinimg.com/736x/0f/5e/e5/0f5ee587a0d7400de8c62f59bd9aca5d.jpg",
        "Tomatoes": "https://i.pinimg.com/736x/23/e5/bd/23e5bdee6b301f3e5e2e92630afb6496.jpg"
    }

    const orderId = getURLParameter('orderId');
    console.log('orderId:', orderId);

    if (orderId) {
        try {
            const response = await fetch(`http://localhost:8080/api/orders/${orderId}`);
            if (!response.ok) {
                throw new Error('Unable to fetch order details');
            }
            const orderDetails = await response.json();
            console.log('orderDetails:', orderDetails);

            // document.getElementById('orderTitle').textContent = `Chi tiết Hóa đơn #${orderDetails.id}`;


            const orderMeta = document.createElement('div');
            orderMeta.innerHTML = `
                <p><strong>Ngày tạo:</strong> ${new Date(orderDetails.createdAt).toLocaleString('vi-VN')}</p>
                <p><strong>Trạng thái:</strong> ${orderDetails.status === 'PAID' ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
            `;
            document.getElementById('orderItems').appendChild(orderMeta);


            const itemsHTML = orderDetails.items.map(item => {
                const imageUrl = ImageJson[item.fruitName] || "image/default.png"; 
                return `
                    <div class="order-item">
                        <img src="${imageUrl}" alt="${item.fruitName}">
                        <div class="item-info">
                            <p><strong>${item.fruitName}</strong></p>
                            <p>Khối lượng: ${item.weight} kg</p>
                            <p>Đơn giá: ${item.pricePerKg.toLocaleString()} VND/kg</p>
                            <p>Thành tiền: ${item.totalPrice.toLocaleString()} VND</p>
                        </div>
                    </div>
                `;
            }).join('');
            document.getElementById('orderItems').innerHTML += itemsHTML;
            document.getElementById('orderTotal').textContent = `Tổng cộng: ${orderDetails.totalPrice.toLocaleString()} VND`;

        } catch (error) {
            console.error('Error loading order details:', error);
            document.getElementById('orderItems').innerHTML = `<p>Không thể tải chi tiết đơn hàng.</p>`;
        }
    }
}

function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

window.onload = loadOrderDetails;
