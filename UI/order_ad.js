let orders = [];

async function loadOrders() {
    const apiUrl = "http://localhost:8080/api/orders";
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("data ", data);
        orders = data; // Lưu dữ liệu vào mảng orders
        renderOrders(orders); // Hiển thị tất cả đơn hàng ban đầu
    } catch (error) {
        console.error('Lỗi khi tải đơn hàng:', error);
    }
}

function renderOrders(data) {
    const productTable = document.getElementById("productTable");
    productTable.innerHTML = "";
    data.forEach(element => {
        const row = document.createElement("tr");
        const orderIdCell = document.createElement("td");
        orderIdCell.textContent = element.id;
        const totalAmountCell = document.createElement("td");
        totalAmountCell.textContent = element.totalPrice + " VNĐ";

        const statusCell = document.createElement("td");
        statusCell.textContent = element.status;

        const editBtnCell = document.createElement("td");
        editBtnCell.classList.add("edit-btn-id"); ;
        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-btn");
        editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
        editBtn.addEventListener('click', function () {
            const orderId = element.id;
            window.location.href = `edit_order_details.html?orderId=${orderId}`;
        });
        editBtnCell.appendChild(editBtn);
        
        const viewBtnCell = document.createElement("td");
        viewBtnCell.classList.add = ("view-btn-id");
        const viewBtn = document.createElement("button");
        viewBtn.classList.add("view-btn");
        viewBtn.addEventListener('click', function () {
            const orderId = element.id;
            window.location.href = `order_details.html?orderId=${orderId}`;
        });
        viewBtn.innerHTML = '<i class="fa-solid fa-eye"></i>';
        viewBtnCell.appendChild(viewBtn);

        row.appendChild(orderIdCell);
        row.appendChild(totalAmountCell);
        row.appendChild(statusCell);
        row.appendChild(editBtnCell);
        row.appendChild(viewBtnCell);

        productTable.appendChild(row);
    });
}

function searchOrders() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    console.log('searchValue : ', searchValue);

    const filteredOrders = orders.filter(order =>
        order.id.toLowerCase().includes(searchValue)
    );
    renderOrders(filteredOrders);
}

document.getElementById('searchInput').addEventListener('input', searchOrders);

   

    window.onload = loadOrders;

