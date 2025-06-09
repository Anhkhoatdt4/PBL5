// Kiểm tra nếu orders chưa được khai báo
let sortDesc = true;

if (typeof orders === "undefined") {
  var orders = [];
}

async function loadOrders() {
  const apiUrl = "http://localhost:8080/api/orders";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log("Orders data:", data);
    // Log createdAt của từng đơn hàng để debug
    // data.forEach((order) =>
    //   //console.log(`Order ID: ${order.id}, createdAt: ${order.createdAt}`)
    // );
    orders = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    renderOrders(orders);
  } catch (error) {
    console.error("Lỗi khi tải đơn hàng:", error);
  }
}

function renderOrders(data) {
  const productTable = document.getElementById("productTable");
  if (!productTable) {
    console.error("Không tìm thấy phần tử productTable");
    return;
  }
  productTable.innerHTML = "";

  // Render các hàng đơn hàng
  data.forEach((element, index) => {
    const row = document.createElement("tr");

    const orderIdCell = document.createElement("td");
    orderIdCell.textContent = index + 1;

    const totalAmountCell = document.createElement("td");
    totalAmountCell.textContent =
      Math.round(element.totalPrice || 0).toLocaleString("vi-VN") + " VNĐ";

    const timeCell = document.createElement("td");
    timeCell.textContent = element.createdAt
      ? new Date(element.createdAt).toLocaleString("vi-VN")
      : "Không xác định";

    const statusCell = document.createElement("td");
    statusCell.textContent = element.status;

    const editBtnCell = document.createElement("td");
    editBtnCell.classList.add("edit-btn-id");
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    editBtn.addEventListener("click", function () {
      openOrderModal(element);
    });
    editBtnCell.appendChild(editBtn);

    const viewBtnCell = document.createElement("td");
    viewBtnCell.classList.add("view-btn-id");
    const viewBtn = document.createElement("button");
    viewBtn.classList.add("view-btn");
    viewBtn.addEventListener("click", function () {
      const orderId = element.id;
      window.location.href = `order_details.html?orderId=${orderId}`;
    });
    viewBtn.innerHTML = '<i class="fa-solid fa-eye"></i>';
    viewBtnCell.appendChild(viewBtn);

    row.appendChild(orderIdCell);
    row.appendChild(totalAmountCell);
    row.appendChild(timeCell);
    row.appendChild(statusCell);
    row.appendChild(editBtnCell);
    row.appendChild(viewBtnCell);

    productTable.appendChild(row);
  });

  // Thêm hàng tổng tiền
  const totalRow = document.createElement("tr");
  totalRow.classList.add("total-row");
  const totalPrice = data.reduce(
    (sum, order) => sum + Math.round(order.totalPrice || 0),
    0
  );
  totalRow.innerHTML = `
    <td>Tổng cộng</td>
    <td>${totalPrice.toLocaleString("vi-VN")} VNĐ</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  `;
  productTable.appendChild(totalRow);

  // Hiển thị thông báo nếu không có đơn hàng
  if (data.length === 0) {
    const emptyRow = document.createElement("tr");
    emptyRow.innerHTML = `<td colspan="6">Không tìm thấy đơn hàng nào.</td>`;
    productTable.appendChild(emptyRow);
  }
}

function sortOrders() {
    sortDesc = !sortDesc;
    orders.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return sortDesc ? dateB - dateA : dateA - dateB;
    });
    renderOrders(orders);
     const sortIcon = document.getElementById("sortIcon");
  if (sortIcon) sortIcon.textContent = sortDesc ? "⬇️" : "⬆️";
}

function setupSortButton() {
  const timeHeader = document.getElementById("timeHeader");
  if (timeHeader) {
    timeHeader.style.cursor = "pointer";
    timeHeader.addEventListener("click", sortOrders);
  }
}

function searchOrders() {
    const dateFilter = document.getElementById("dateFilter");
  const searchValue =
    document.getElementById("searchInput")?.value.toLowerCase() || "";
  const dateValue = dateFilter.value || "";
  console.log("Search value:", searchValue, "Date value:", dateValue);

  let filteredOrders = orders;

  // Lọc theo ID đơn hàng
  if (searchValue) {
    filteredOrders = filteredOrders.filter((order) =>
      order.id.toString().toLowerCase().includes(searchValue)
    );
  }

  // Lọc theo ngày
  if (dateValue) {
    filteredOrders = filteredOrders.filter((order) => {
      if (!order.createdAt) {
        console.warn(`Order ID: ${order.id} không có createdAt`);
        return false;
      }
      // Thử parse createdAt với nhiều định dạng
      let orderDate;
      try {
        orderDate = new Date(order.createdAt).toISOString().split("T")[0];
      } catch (e) {
        console.warn(
          `Invalid createdAt format for order ID: ${order.id}, createdAt: ${order.createdAt}`
        );
        return false;
      }
      return orderDate === dateValue;
    });
  }

  console.log("Filtered orders:", filteredOrders);
  renderOrders(filteredOrders);
}

function closeOrderModal() {
  document.getElementById("orderModal").style.display = "none";
  document.body.style.overflow = "auto";
}

function setupEventListeners() {
  const searchInput = document.getElementById("searchInput");
  const dateFilter = document.getElementById("dateFilter");
const closeModalBtn = document.getElementById("closeModalBtn");

  if (searchInput) {
    searchInput.addEventListener("input", searchOrders);
  } else {
    console.error("Không tìm thấy searchInput");
  }
  if (dateFilter) {
    dateFilter.addEventListener("change", searchOrders);
    dateFilter.classList.add("style-input"); // Thêm dòng này để style áp dụng ngay
  } else {
    console.error("Không tìm thấy dateFilter");
  }
   if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeOrderModal);
  } else {
    console.error("Không tìm thấy closeModalBtn");
  }
}


function exportTableToCSV(filename = "donhang.csv") {
  let csv = "Số thứ tự,Tổng tiền,Ngày,Giờ,Trạng thái\n";
  orders.forEach((order, index) => {
    const dateObj = order.createdAt ? new Date(order.createdAt) : null;
    const dateStr = dateObj
      ? dateObj.toLocaleDateString("vi-VN")
      : "Không xác định";
    const timeStr = dateObj
      ? dateObj.toLocaleTimeString("vi-VN")
      : "Không xác định";
    csv += [
      index + 1,
      Math.round(order.totalPrice || 0).toLocaleString("vi-VN") + " VNĐ",
      dateStr,
      timeStr,
      order.status,
    ].join(",") + "\n";
  });

  // Thêm dòng tổng cộng
  const totalPrice = orders.reduce(
    (sum, order) => sum + Math.round(order.totalPrice || 0),
    0
  );
  csv += [
    "Tổng cộng",
    totalPrice.toLocaleString("vi-VN") + " VNĐ",
    "",
    "",
    "",
  ].join(",") + "\n";

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

function setupExportButton() {
  const exportBtn = document.querySelector(".export-btn");
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      exportTableToCSV("donhang.csv");
    });
  } else {
    console.error("Không tìm thấy export-btn");
  }
}

function openOrderModal(order) {
  document.getElementById("modalOrderId").value = order.id;
  document.getElementById("modalOrderTotal").value = Math.round(order.totalPrice || 0).toLocaleString("vi-VN") + " VNĐ";
  document.getElementById("modalOrderDate").value = order.createdAt ? new Date(order.createdAt).toLocaleString("vi-VN") : "Không xác định";
  // Set đúng trạng thái đang có
  const statusSelect = document.getElementById("modalOrderStatus");
  if (statusSelect) statusSelect.value = order.status;
  document.getElementById("orderModal").style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeOrderModal() {
  document.getElementById("orderModal").style.display = "none";
  document.body.style.overflow = "auto";
}

const form = document.getElementById("orderModal");
if (form) {
  form.onsubmit = async function (e) {
    e.preventDefault();
    const id = document.getElementById("modalOrderId").value;
    const status = document.getElementById("modalOrderStatus").value;
    
    try {
      const response = await fetch(`http://localhost:8080/api/orders/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: status })
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        console.log("Cập nhật thành công:", updatedOrder);
        const index = orders.findIndex(o => o.id == id);
        if (index !== -1) {
          orders[index] = updatedOrder;
          renderOrders(orders);
        }

        closeOrderModal();
      } else {
        const errorText = await response.text();
        alert("Cập nhật thất bại: " + errorText);
      }
    } catch (err) {
      alert("Lỗi kết nối server: " + err.message);
    }
  };
} else {
  console.error("Không tìm thấy form với id 'orderForm'");
}


function init() {
  setupEventListeners();
  setupExportButton();
  setupSortButton();
  loadOrders();
}

// Khởi tạo khi DOM sẵn sàng
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
