function loadFruitData() {
  fetch("http://localhost:8080/api/fruit/latest")
    .then((response) => response.json())
    .then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        const orderQueue = document.querySelector("#orderQueue");
        
        // Duyệt qua tất cả các phần tử trong data
        data.forEach((fruitData) => {
          const totalItemPrice = parseInt(fruitData.fruit_price.replace(/[^\d]/g, ""), 10) || 0;

          // Kiểm tra xem bảng có hàng nào chưa
          const newRow = document.createElement("tr");

          newRow.innerHTML = `
            <td><img src="${fruitData.image_base64}" alt="${fruitData.image_name}" width="200" height="200"></td>
            <td>${fruitData.image_name}</td>
            <td>${fruitData.fruit_price}</td>
            <td>${fruitData.fruit_weight}</td>
            <td>${totalItemPrice.toLocaleString()} VNĐ</td>
          `;

          orderQueue.appendChild(newRow); // Thêm dòng mới vào bảng
        });
      } else {
        console.error("Dữ liệu không hợp lệ:", data);
      }
    })
    .catch((error) => {
      console.error("Lỗi khi tải dữ liệu trái cây:", error);
    });
}

// Tải dữ liệu khi trang được load
window.onload = loadFruitData;
