package com.pbl5.fruitscalebackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity(name = "orderItems")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class OrderItem {
    @Id
    @GeneratedValue
    private UUID id;

    private String fruitName;
    private double weight;
    private double pricePerKg;
    private double totalPrice;
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "order_id")
    @JsonIgnore
    @ToString.Exclude
    private Order order;
}

//@JsonIgnore và @ToString.Exclude có sự khác biệt như sau:
//1. @JsonIgnore
//Mục đích: Bỏ qua một trường khi chuyển đổi đối tượng sang JSON (serialization) hoặc từ JSON sang đối tượng (deserialization).
//Phạm vi: Ảnh hưởng đến dữ liệu trả về từ API hoặc dữ liệu nhận vào từ request.
//Sử dụng: Dùng khi bạn không muốn trường đó xuất hiện trong JSON (ví dụ: tránh lặp vô hạn hoặc bảo mật dữ liệu).
//Ví dụ:
//@JsonIgnore
//private Order order;
//Trường order sẽ không xuất hiện trong JSON trả về từ API.
//<hr></hr>
//        2. @ToString.Exclude
//Mục đích: Loại bỏ một trường khỏi phương thức toString() được tự động sinh bởi Lombok.
//Phạm vi: Chỉ ảnh hưởng đến kết quả của phương thức toString().
//Sử dụng: Dùng khi bạn muốn tránh lặp vô hạn hoặc không muốn hiển thị trường đó trong chuỗi mô tả đối tượng.
//Ví dụ:
//@ToString.Exclude
//private Order order;
//Trường order sẽ không được hiển thị khi gọi toString().
//<hr></hr>
//So sánh
//Đặc điểm
//@JsonIgnore
//@ToString.Exclude
//Mục đích
//Bỏ qua trường trong JSON
//Bỏ qua trường trong toString()
//Phạm vi
//Serialization/Deserialization
//String representation
//Sử dụng
//API (REST, JSON)
//Debugging/logging với toString
//Ảnh hưởng
//JSON output
//Kết quả toString()
//<hr></hr>
//Khi nào sử dụng
//Dùng @JsonIgnore khi bạn muốn ẩn trường trong JSON trả về từ API.
//Dùng @ToString.Exclude khi bạn muốn tránh lặp vô hạn hoặc bảo mật dữ liệu trong toString().