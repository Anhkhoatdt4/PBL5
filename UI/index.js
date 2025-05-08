const express = require("express");
const cors = require("cors"); // Import thư viện cors
const EventEmitter = require("events");
const VietQR = require("./vietQR");

const app = express();
const port = 3000;

app.use(cors()); // Sử dụng middleware cors
app.use(express.json());

const eventEmitter = new EventEmitter();
const vietQR = new VietQR();

app.post("/api/set-amount", (req, res) => {
  const { amount } = req.body;
  if (!amount) {
    return res.status(400).json({ error: "Amount is required" });
  }

  vietQR
    .setBeneficiaryOrganization("970422", "khoa")
    .setTransactionAmount(amount)
    .setAdditionalDataFieldTemplate("Thanh toan hoa don");

  const qrText = vietQR.build();
  console.log("Updated QR Text:", qrText);
  eventEmitter.emit("qrTextReady", qrText);

  res.json({ qrText });
});

// API trả về nội dung QR
app.get("/api/qr-text", (req, res) => {
  res.json({ qrText: vietQR.build() });
});

// Khởi động server
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});

module.exports = eventEmitter;