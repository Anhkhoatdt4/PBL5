const eventEmitter = require('./index.js');

function handleClick() {
    try {
        console.log("Clicked");

        // Lắng nghe sự kiện qrTextReady
        eventEmitter.on('qrTextReady', (qrText) => {
            console.log('qrText:', qrText);

            const qrContainer = document.querySelector('.payment');
            qrContainer.innerHTML = ''; // Xóa mã QR cũ nếu có

            // Tạo mã QR từ qrText
            new QRCode(qrContainer, {
                text: qrText,
                width: 256,
                height: 256,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });

            console.log('QR Code generated successfully:', qrText);
        });
    } catch (error) {
        console.error('Lỗi khi tạo mã QR:', error);
        alert('Đã xảy ra lỗi khi tạo mã QR. Vui lòng thử lại.');
    }
}

module.exports = { handleClick };