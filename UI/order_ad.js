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

function exportTableToCSV(filename = 'donhang.csv') {
    const rows = Array.from(document.querySelectorAll('#productTable tr'));
    let csv = 'ID đơn hàng,Tổng tiền,Trạng thái\n';
    console.log('rows : ', rows);
    const headerRow = rows[0].querySelectorAll('th');
    if (headerRow.length > 0) {
        const headers = Array.from(headerRow).map(th => th.innerText.replace(/,/g, ''));
        csv += headers.join(',') + '\n';
    }
    
    rows.forEach(tr => {
        const tds = tr.querySelectorAll('td');
        if (tds.length >= 3) {
            const row = [
                tds[0].innerText.replace(/,/g, ''),
                tds[1].innerText.replace(/,/g, ''),
                tds[2].innerText.replace(/,/g, '')
            ].join(',');
            csv += row + '\n';
        }
    });

    // Tạo file và tự động tải về
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

// Gắn vào nút export
function setupExportButton() {
    const exportBtn = document.querySelector('.export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            exportTableToCSV('donhang.csv');
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupExportButton);
} else {
    setupExportButton();
}

window.onload = loadOrders;

