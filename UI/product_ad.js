async function loadProducts() {
  const tableBody = document.getElementById("productTable");

  try {
    const response = await fetch("http://localhost:8080/api/inventory");
    const data = await response.json();

    tableBody.innerHTML = ""; // Xóa dữ liệu cũ

    data.forEach((item, index) => {
      const tr = document.createElement("tr");
      tr.classList.add("product-row-hover"); // Thêm class cho hiệu ứng hover
      const lowStock = item.quantityInKg < 10;
      const quantityCell = lowStock
        ? `<td style="color: red; font-weight: bold;">${item.quantityInKg} <br><span style="font-size: 12px; color: darkred;">⚠ Sắp hết hàng!</span></td>`
        : `<td>${item.quantityInKg}</td>`;
      tr.innerHTML = `
          <td>${index + 1}</td>
          <td>${item.fruitName}</td>
          <td>${item.pricePerKg.toLocaleString("vi-VN")}đ</td>
          ${quantityCell}
          <td>
              <div class="action-buttons">
                    <button class="edit-btn" onclick="editProduct('${item.fruitName}', ${item.pricePerKg}, ${item.quantityInKg})">
                        <i class="fa-solid fa-pen"></i> Edit
                    </button>
                  <button class="add-btn" onclick="addStock('${item.fruitName}')">
                      <i class="fa-solid fa-plus"></i> Add
                  </button>
              </div>
          </td>
      `;

      tableBody.appendChild(tr);

      // if (lowStock) {
      //   alert(`⚠️ Cảnh báo: ${item.fruitName} sắp hết hàng! Chỉ còn ${item.quantityInKg}kg`);
      // }
    });
  } catch (error) {
    console.error("Lỗi khi load tồn kho:", error);
    tableBody.innerHTML = `<tr><td colspan="5">Không thể tải dữ liệu.</td></tr>`;
  }
}

function addStock(fruitName) {

  const modal = document.getElementById("addStockModal");
  modal.style.display = "block";

  document.getElementById("modalTitle").innerText = "Thêm Tồn Kho";
  document.getElementById("amountLabel").innerText = "Số lượng cần thêm (kg):";
  document.getElementById("amount").value = "";
  document.getElementById("priceInputContainer").style.display = "none";
  updateProductImage(fruitName);

  const form = document.getElementById("addStockForm");
  form.onsubmit = function (event) {
    event.preventDefault();
    addNewStock(fruitName);
  };
}

function addNewStock(fruitName) {
  const amount = parseFloat(document.getElementById("amount").value);

  if (isNaN(amount) || amount <= 0) {
    alert("Vui lòng nhập thông tin hợp lệ!");
    return;
  }

  fetch(`http://localhost:8080/api/inventory/${fruitName}/add`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(amount), // Gửi số lượng cần thêm
  })
    .then((response) => {
      if (response.ok) {
        alert(`✅ Đã cập nhật thêm ${amount}kg cho ${fruitName}`);
        loadProducts();
        closeModal();
      } else {
        alert("❌ Không tìm thấy sản phẩm!");
      }
    })
    .catch((error) => console.error("Lỗi khi cập nhật:", error));
}

function closeModal() {
  const modal = document.getElementById("addStockModal");
  modal.style.display = "none"; 
}

function updateProductImage(fruitName) {
    const productImages = {
                "Apples": "https://i.pinimg.com/736x/23/e5/bd/23e5bdee6b301f3e5e2e92630afb6496.jpg",
                "Bananas": "https://i.pinimg.com/736x/1c/16/62/1c1662f546cc85a1d77732c840ff9113.jpg",
                "Grapes": "https://i.pinimg.com/736x/02/5d/ab/025dab583cff4e270588e882d7b1edf2.jpg",
                "Oranges": "https://i.pinimg.com/736x/90/28/81/90288198edffa1d0f96b194ae0448409.jpg",
                "Strawberries": "https://i.pinimg.com/736x/2e/dd/e5/2edde51bf1093fb111181945aa234470.jpg",
                "Watermelons": "https://i.pinimg.com/736x/1e/a7/a9/1ea7a9f76ef5487ed6f0e04286a48126.jpg",
                "Pineapples": "https://i.pinimg.com/736x/0f/5e/e5/0f5ee587a0d7400de8c62f59bd9aca5d.jpg",
                "Tomatoes": "https://i.pinimg.com/736x/23/e5/bd/23e5bdee6b301f3e5e2e92630afb6496.jpg"
            }

  const imageUrl = productImages[fruitName] || "images/default.jpg";
  document.getElementById("productImage").src = imageUrl;
}

function editProduct(fruitName, currentPrice, currentQuantity) {
const modal = document.getElementById("addStockModal");
  modal.style.display = "block";

  document.getElementById("modalTitle").innerText = "Cập nhật giá sản phẩm";
  document.getElementById("amountLabel").innerText = "Số lượng hiện tại (kg):";
  document.getElementById("amount").disabled = true;
  document.getElementById("amount").value = currentQuantity;
  document.getElementById("priceInputContainer").style.display = "block";
  document.getElementById("price").value = currentPrice;

  updateProductImage(fruitName);

const form = document.getElementById("addStockForm");
  form.onsubmit = function (event) {
    event.preventDefault();

    const newPrice = document.getElementById("price").value;
    const newPriceNum = parseFloat(newPrice);
    const newQuantityNum = parseFloat(document.getElementById("amount").value);

    if (isNaN(newPriceNum) || newPriceNum <= 0) {
      alert("Vui lòng nhập giá hợp lệ!");
      return;
    }

  if (isNaN(newPrice) || newPriceNum <= 0 ){
    alert("Vui lòng nhập giá và số lượng hợp lệ!");
    return;
  }

  console.log('price: ' , newPriceNum);
  

  fetch(`http://localhost:8080/api/inventory/${fruitName}/price`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: newPriceNum
  })
    .then((response) => {
      if (response.ok) {
        alert(`✅ Đã cập nhật ${fruitName} với giá mới: ${newPriceNum.toLocaleString("vi-VN")}đ và số lượng: ${newQuantityNum}kg`);
        document.getElementById("amount").disabled = false;
        loadProducts();
        closeModal();
      } else {
        alert("❌ Không tìm thấy sản phẩm!");
      }
    })
    .catch((error) => console.error("Lỗi khi cập nhật:", error));
}
}

// --- Export CSV logic ---
function exportTableToCSV(filename = 'tonkho.csv') {
  const rows = Array.from(document.querySelectorAll('#productTable tr'));
  let csv = 'ID,Tên sản phẩm,Giá/kg,Số lượng (kg)\n';
  rows.forEach(tr => {
    const tds = tr.querySelectorAll('td');
    if (tds.length >= 4) {
      // Lấy số lượng (kg) chỉ là số, bỏ mọi ký tự/icon/cảnh báo
      let soLuong = tds[3].innerText.match(/\d+[.,]?\d*/);
      soLuong = soLuong ? soLuong[0].replace(/,/g, '') : '';
      const row = [
        tds[0].innerText.replace(/,/g, ''),
        tds[1].innerText.replace(/,/g, ''),
        tds[2].innerText.replace(/,/g, ''),
        soLuong
      ].join(',');
      csv += row + '\n';
    }
  });
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

function setupExportButton() {
  const exportBtn = document.querySelector('.export-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      exportTableToCSV('tonkho.csv');
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupExportButton);
} else {
  setupExportButton();
}

// Thêm CSS hiệu ứng hover cho các td trong bảng sản phẩm
const style = document.createElement('style');
style.innerHTML = `
#productTable tr.product-row-hover td {
  transition: background 0.18s, color 0.18s;
}
#productTable tr.product-row-hover:hover td {
  background: #eaf1ff;
  color: #3366ff;
  cursor: pointer;
}
`;
document.head.appendChild(style);