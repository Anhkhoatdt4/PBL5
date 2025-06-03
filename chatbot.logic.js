// chatbot.logic.js

// Hàm lấy giá động từ backend (Spring Boot)
export async function fetchPriceList() {
  try {
    const response = await fetch('http://localhost:8080/api/inventory');
    if (!response.ok) throw new Error('Không lấy được bảng giá');
    const data = await response.json();
    // data là mảng object [{ fruitName, pricePerKg, ... }]
    let priceMsg = '📋 <b>BẢNG GIÁ BKN FRUITS</b>:<br>';
    for (const item of data) {
      // Gán icon theo loại trái cây
      let icon = '🍏';
      switch(item.fruitName.toLowerCase()) {
        case 'apples': icon = '🍎'; break;
        case 'bananas': icon = '🍌'; break;
        case 'grapes': icon = '🍇'; break;
        case 'oranges': icon = '🍊'; break;
        case 'strawberries': icon = '🍓'; break;
        case 'watermelons': icon = '🍉'; break;
        case 'pineapples': icon = '🍍'; break;
        case 'tomatoes': icon = '🍅'; break;
      }
      priceMsg += `${icon} ${item.fruitName}: ${item.pricePerKg.toLocaleString()}đ/kg<br>`;
    }
    priceMsg += '<br>Tất cả đều tươi ngon, chất lượng cao! 🌟';
    return priceMsg;
  } catch (e) {
    return 'Không lấy được bảng giá. Vui lòng thử lại sau!';
  }
}

// Hàm lấy giá một loại trái cây cụ thể từ backend
export async function fetchPriceByName(fruitName) {
  try {
    const response = await fetch('http://localhost:8080/api/inventory');
    if (!response.ok) throw new Error('Không lấy được bảng giá');
    const data = await response.json();
    const name = fruitName.trim().toLowerCase();
    // So sánh chính xác tên (không dùng includes)
    const item = data.find(f => f.fruitName.trim().toLowerCase() === name);
    if (item) {
      // Gán icon theo loại trái cây
      let icon = '🍏';
      switch(item.fruitName.toLowerCase()) {
        case 'apples': icon = '🍎'; break;
        case 'bananas': icon = '🍌'; break;
        case 'grapes': icon = '🍇'; break;
        case 'oranges': icon = '🍊'; break;
        case 'strawberries': icon = '🍓'; break;
        case 'watermelons': icon = '🍉'; break;
        case 'pineapples': icon = '🍍'; break;
        case 'tomatoes': icon = '🍅'; break;
      }
      return `${icon} Giá ${item.fruitName}: <b>${item.pricePerKg.toLocaleString()}đ/kg</b>`;
    } else {
      return `Không tìm thấy giá cho loại trái cây "${fruitName}".`;
    }
  } catch (e) {
    return 'Không lấy được bảng giá. Vui lòng thử lại sau!';
  }
}

export function getFruitListReply() {
  return 'Chúng tôi có 🍎 Táo, 🍌 Chuối, 🍇 Nho, 🍊 Cam, 🍓 Dâu tây, 🍉 Dưa hấu, 🍍 Thơm, 🍅 Cà chua.';
}

export function getHistoryReply() {
  return '🕑 Bạn muốn xem lịch sử đơn hàng? Vui lòng đăng nhập để xem chi tiết.';
}

export function getPurchaseReply() {
  return '🛒 Bạn muốn mua loại trái cây nào? Vui lòng chọn sản phẩm và số lượng!';
}

export function getDefaultReply() {
  return '🤖 Xin chào! Tôi là chatbot của hệ thống cân thông minh BKN Fruits. Bạn cần hỏi về giá, loại trái cây, lịch sử hay đặt hàng?';
}
