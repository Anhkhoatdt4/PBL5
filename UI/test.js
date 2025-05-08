const QRCode = require('qrcode');

const qrText = "00020101021238530010A000000727012300069704230109mynamebvh0208QRIBFTTA53037045405500005802VN62080804test6304AB76";

// Tạo mã QR và hiển thị trong terminal
QRCode.toString(qrText, { type: 'terminal' }, (err, url) => {
  if (err) throw err;
  console.log(url);
});

// Tạo mã QR và lưu dưới dạng hình ảnh
QRCode.toFile('vietQR.png', qrText, (err) => {
  if (err) throw err;
  console.log('Mã QR đã được lưu dưới dạng vietQR.png');
});