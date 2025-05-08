let socket;

function itemTotal(fruitPrice, fruitWeightStr) {
  let weightInKg = 0;
    if (fruitWeightStr.includes('gram')) {
      const gram = parseFloat(fruitWeightStr);
      weightInKg = gram / 1000;
    } else if (fruitWeightStr.includes('kg')) {
      weightInKg = parseFloat(fruitWeightStr);
    }
    console.log('weightInKg:', weightInKg);
    console.log('fruitPrice:', fruitPrice);
    console.log( fruitPrice * weightInKg);
  return fruitPrice * weightInKg;
}

function connectWebSocket() {
  if (socket && socket.readyState === WebSocket.OPEN) {
    console.log('🔁 WebSocket is already open.');
    return;
  }

  socket = new WebSocket('ws://localhost:8080/fruit-scale');

  socket.onopen = () => {
    console.log('✅ WebSocket connected');
    const fruitPriceElement = document.querySelector('.item-list');
    console.log('🍏 fruitPriceElement:', fruitPriceElement);
 

  };
  let total = 0;
  socket.onmessage = (event) => {
    try {
      // console.log('📨 Raw event data:', event.data);
      console.log('📨 Type of event data:', typeof event.data);

      const data = JSON.parse(event.data);
      console.log('📦 Received data:', data);

      if (typeof data.image_base64 === 'string' && data.image_base64.startsWith('data:image')) {
        const fruitImage = document.getElementById('fruit-image');
        if (fruitImage) {
          fruitImage.src = data.image_base64;
          fruitImage.alt = data.image_name || 'Ảnh trái cây';
        }
        // element.insertAdjacentHTML(position, text);
        // Giá trị	Vị trí chèn (vào element)
        // "beforebegin"	Trước chính element
        // "afterbegin"	Bên trong element, trước nội dung con đầu tiên
        // "beforeend"	Bên trong element, sau nội dung con cuối cùng
        // "afterend"	Sau chính element
        
        const fruitPrice = data.fruit_price || 0;
        const fruitWeight = data.fruit_weight || 0;
        const totalItemPrice  = itemTotal(fruitPrice, fruitWeight);
        console.log('totalItemPrice :', totalItemPrice );
        const fruitNameElement = document.getElementById('fruit-name');
        const fruitWeightElement = document.getElementById('fruit-weight');
        if (fruitNameElement) fruitNameElement.textContent = data.image_name || 'Không xác định';
        if (fruitWeightElement) fruitWeightElement.textContent = fruitWeight || '0g';
        
        const orderQueue = document.querySelector('#order-queue');
        orderQueue.insertAdjacentHTML('beforeend', `
          <tr>
            <td><img src="${data.image_base64}" alt="${data.image_name}" width="60" height="60"></td>
            <td>${data.image_name}</td>
            <td>${fruitPrice.toLocaleString()}</td>
            <td>${data.fruit_weight}</td>
            <td>${totalItemPrice .toLocaleString()} VNĐ</td>
          </tr>
          `);
          total += totalItemPrice ;
        document.querySelector("#total-price").textContent = total.toLocaleString() + " VNĐ";
        console.log('orderQueue:', orderQueue);

      } else {
        console.warn('⚠️ Dữ liệu không chứa ảnh hợp lệ:', data);
      }
    } catch (error) {
      console.error('❌ Error parsing WebSocket message:', error);
    }
  };

  socket.onclose = (event) => {
    console.warn('🔌 WebSocket disconnected');
    if (event.wasClean) {
      console.log(`🔁 Clean close: code=${event.code}, reason=${event.reason}`);
    } else {
      console.log(`❌ Abnormal close: code=${event.code}`);
    }

    // 👉 Optional: Tự động reconnect sau 3 giây
    setTimeout(() => {
      console.log('🔄 Reconnecting WebSocket...');
      connectWebSocket();
    }, 3000);
  };

  socket.onerror = (error) => {
    console.error('🔥 WebSocket error:', error.message || error);
  };
}

// Gọi khi trang load
window.addEventListener('load', () => {
  connectWebSocket();
});

// document.getElementById('exportInvoice').addEventListener('click', () => {
//   if (socket && socket.readyState === WebSocket.OPEN) {
//       const message = JSON.stringify({ action: 'disconnect' });
//       socket.send(message);
//       console.log('📤 Sent disconnect message to server:', message);
//       document.querySelector('#order-queue').innerHTML = '';
//       document.querySelector('#total-price').textContent = '0 VNĐ';
//       total = 0;
//       socket.close();
//   } else {
//     console.warn("⚠️ WebSocket is not open. Cannot send disconnect request.");
//   }
// });

function getContent(){
  const rows = document.querySelectorAll('#order-queue tr');
  const fruits = [];
  let total = 0;

  rows.forEach(row => {
    const fruitName = row.querySelector('td:nth-child(2)')?.textContent.trim() || 'Không xác định';
    const fruitWeight = row.querySelector('td:nth-child(4)')?.textContent.trim() || '0g';
    const fruitPrice = row.querySelector('td:nth-child(5)')?.textContent.trim() || '0 VNĐ';

    fruits.push({
      name: fruitName,
      weight: fruitWeight,
      price: fruitPrice
    });
    const priceValue = parseInt(fruitPrice.replace(/[^\d]/g, ''), 10) || 0;
    total += priceValue;
  })
  console.log('total : ' , total);
  return total;
}

module.exports = {getContent};
