package com.pbl5.fruitscalebackend.service;

import com.pbl5.fruitscalebackend.entity.InventoryItem;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.MimeMessageHelper;

import java.util.List;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;
    @Value("${spring.mail.username}")
    private String sender;


    public void sendLowStockEmail(String recipientEmail, List<InventoryItem> inventoryItemList) {
        System.out.println("inventoryItemList: " + inventoryItemList);

        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setFrom(sender);
            helper.setTo(recipientEmail);
            helper.setSubject("⚠️ Thông báo: Sản phẩm một số sản phẩm sắp hết hàng");

            StringBuilder tableRows = new StringBuilder();
            for (InventoryItem item : inventoryItemList) {
                tableRows.append(String.format("""
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">%s</td>
                    <td style="border: 1px solid #ddd; padding: 8px; color: red;">%.2f</td>
                </tr>
            """, item.getFruitName(), item.getQuantityInKg()));
            }

            String htmlContent = """
<html>
<body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: white; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
        <div style="text-align: center;">
            <img src="https://cdn-icons-png.flaticon.com/512/564/564619.png" alt="Warning" width="70" height="70">
            <h2 style="color: #d9534f;">Cảnh báo: Nhiều sản phẩm sắp hết hàng</h2>
        </div>
        <p>Xin chào,</p>
        <p>Các sản phẩm sau đây đang gần hết trong kho:</p>
        <table style="width: 100%%; border-collapse: collapse; margin-top: 15px;">
            <tr style="background-color: #f2f2f2;">
                <th style="border: 1px solid #ddd; padding: 8px;">Tên trái cây</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Số lượng còn lại (kg)</th>
            </tr>
            %s
        </table>
        <p style="margin-top: 20px;">Vui lòng kiểm tra và bổ sung kho sớm để đảm bảo đủ hàng cung cấp.</p>
        <p>Trân trọng,<br>FruitScale System</p>
    </div>
</body>
</html>
""".formatted(tableRows.toString());


            helper.setText(htmlContent, true); // true for HTML

            javaMailSender.send(mimeMessage);

        } catch (MessagingException e) {
            System.err.println("Lỗi khi gửi email: " + e.getMessage());
        }
    }

}
