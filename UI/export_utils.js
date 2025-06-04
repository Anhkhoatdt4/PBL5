// export_utils.js
// Utility functions for exporting data to Excel and PDF
// Requires: SheetJS (xlsx) and jsPDF (for PDF)

// Export array of objects to Excel
export function exportToExcel(data, filename = 'export.xlsx', sheetName = 'Sheet1') {
    if (!window.XLSX) {
        alert('Thư viện SheetJS (xlsx) chưa được nạp!');
        return;
    }
    const ws = window.XLSX.utils.json_to_sheet(data);
    const wb = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(wb, ws, sheetName);
    window.XLSX.writeFile(wb, filename);
}

// Export array of objects to PDF (simple table)
export function exportToPDF(data, columns, filename = 'export.pdf', title = '') {
    if (!window.jspdf || !window.jspdf.autoTable) {
        alert('Thư viện jsPDF hoặc autoTable chưa được nạp!');
        return;
    }
    const doc = new window.jspdf.jsPDF();
    if (title) doc.text(title, 14, 16);
    doc.autoTable({
        head: [columns],
        body: data.map(row => columns.map(col => row[col] ?? '')),
        startY: title ? 22 : 10,
        styles: { fontSize: 10 }
    });
    doc.save(filename);
}

window.exportToExcel = exportToExcel;
window.exportToPDF = exportToPDF;
