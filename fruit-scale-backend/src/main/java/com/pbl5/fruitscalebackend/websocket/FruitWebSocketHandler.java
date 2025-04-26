package com.pbl5.fruitscalebackend.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pbl5.fruitscalebackend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.nio.file.attribute.BasicFileAttributes;
import java.util.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.*;
import java.util.concurrent.ConcurrentHashMap;
@Component
public class FruitWebSocketHandler extends TextWebSocketHandler {

    @Autowired
    private OrderService orderService;

    private static final String IMAGE_FOLDER = "D:/PBL5/img/";
    private final Set<WebSocketSession> sessions = ConcurrentHashMap.newKeySet();
    private volatile boolean watching = false;
    private Map<String, Integer> fruitPrices = new HashMap<>(){{
        put("Apples", 35000);
        put("Bananas", 18000);
        put("Grapes", 60000);
        put("Oranges", 40000);
        put("Strawberries", 90000);
        put("Watermelons", 12000);
        put("Pineapples", 25000);
        put("Tomatoes", 22000);
    }};

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("✅ Client connected: " + session.getId());
        sessions.add(session);

        // Chỉ khởi động thread 1 lần
        if (!watching) {
            watching = true;
            watchFolder();
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        System.out.println("❌ Client disconnected: " + session.getId() +
                ", Reason: " + status.getReason() +
                ", Code: " + status.getCode());
        sessions.remove(session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        System.out.println("📩 Received metadata: " + payload);

        // Xử lý lệnh từ client
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, String> messageData = objectMapper.readValue(payload, Map.class);

        if ("disconnect".equalsIgnoreCase(messageData.get("action"))) {
            System.out.println("🔌 Client requested disconnect. Closing session...");
            session.close(CloseStatus.NORMAL);
        } else {
            session.sendMessage(new TextMessage("Metadata received: " + payload));
        }
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        System.err.println("⚠️ WebSocket error for session " + session.getId() + ": " + exception.getMessage());
        exception.printStackTrace();
        sessions.remove(session);
    }

    private void watchFolder() {
        Thread thread = new Thread(() -> {
            try {
                WatchService watchService = FileSystems.getDefault().newWatchService();
                Path path = Paths.get(IMAGE_FOLDER);
                path.register(watchService, StandardWatchEventKinds.ENTRY_CREATE);

                while (true) {
                    WatchKey key = watchService.take();
                    for (WatchEvent<?> event : key.pollEvents()) {
                        if (event.kind() == StandardWatchEventKinds.ENTRY_CREATE) {
                            Thread.sleep(2000); // Đợi file copy xong
                            String jsonStr = getLatestImageWithBase64();
                            if (jsonStr != null) {
                                System.out.println("👥 Current session count: " + sessions.size());
                                System.out.println("📤 Sending JSON to all clients");
                                for (WebSocketSession session : sessions) {
                                    if (session.isOpen()) {
                                        try {
                                            synchronized (session) {
                                                session.sendMessage(new TextMessage(jsonStr));
                                            }
                                            System.out.println("📤 Successfully sent JSON to session: " + session.getId());
                                        } catch (IOException e) {
                                            System.err.println("❌ Error sending to " + session.getId() + ": " + e.getMessage());
                                        }
                                    }
                                }
                            }
                        }
                    }
                    boolean valid = key.reset();
                    if (!valid) {
                        break;
                    }
                }

            } catch (Exception e) {
                e.printStackTrace();
            }
        });
        thread.setDaemon(true);
        thread.start();
    }

    private String getLatestImageWithBase64() {
        File folder = new File(IMAGE_FOLDER);
        if (!folder.exists() || !folder.isDirectory()) return null;

        File[] jpgFiles = folder.listFiles((dir, name) -> name.toLowerCase().endsWith(".jpg"));
        if (jpgFiles == null || jpgFiles.length == 0) return null;

        File latestFile = getLatestCreatedFile(jpgFiles);
        if (latestFile == null) return null;

        try (FileInputStream fileInputStream = new FileInputStream(latestFile)) {
            byte[] bytes = fileInputStream.readAllBytes();
            String base64Image = Base64.getEncoder().encodeToString(bytes);

            Map<String, String> map = new HashMap<>();
            map.put("image_base64", "data:image/jpeg;base64," + base64Image);
            map.put("image_name", latestFile.getName());
            map.put("fruit_weight", "600 gram");
            map.put("fruit_price" , getPriceFromFruitName(getNameFruit(latestFile.getName())));
            ObjectMapper mapper = new ObjectMapper();
            return mapper.writeValueAsString(map);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    private String getNameFruit(String name) {
        for(Map.Entry<String, Integer> entry : fruitPrices.entrySet()) {
            if (name.startsWith(entry.getKey())) {
                String fruit = entry.getKey();
                return fruit;
            }
        }
        return null;
    }

    private String getPriceFromFruitName(String name) {
        Integer price = fruitPrices.get(name);
        if (price != null) {
            return price.toString();
        }
        return "0 VND";
    }

    private File getLatestCreatedFile(File[] files) {
        return Arrays.stream(files).max(Comparator.comparingLong(file -> {
            try {
                return Files.readAttributes(file.toPath(), BasicFileAttributes.class).creationTime().toMillis();
            } catch (IOException e) {
                e.printStackTrace();
                return 0;
            }
        })).orElse(null);
    }
}


//package com.pbl5.fruitscalebackend.websocket;
//
//
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.web.socket.CloseStatus;
//import org.springframework.web.socket.TextMessage;
//import org.springframework.web.socket.WebSocketSession;
//import org.springframework.web.socket.handler.TextWebSocketHandler;
//// --- Các import không dùng đến (JSONObject, Base64, File, Path, WatchService...) đã bị xóa ---
//@Slf4j
//public class FruitWebSocketHandler extends TextWebSocketHandler {
//
//    // Comment out hoặc xóa biến không dùng đến
//    // private static final String IMAGE_FOLDER = "D:/PBL5/img/";
//
//    /*
//     * --- Toàn bộ phần logic phức tạp đã được comment out ---
//     * // private void watchFolder(WebSocketSession session) { ... }
//     * // private JSONObject getLatestImageWithBase64() { ... }
//     * // Các @Override cũ cũng đã được comment out
//     */
//
//    @Override
//    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
//        // Log khi kết nối thành công Được gọi khi client kết nối thành công với server qua WebSocket.
//        System.out.println(">>> FruitScaleHandler connected successfully: " + session.getId());
//
//    }
//
//    @Override
//    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception { // Thêm throws Exception để khớp lớp cha
//        // Log khi nhận được tin nhắn từ client
//        // Được gọi mỗi khi client gửi một tin nhắn dạng text.
//        System.out.println(">>> FruitScaleHandler received message from client " + session.getId() + ": " + message.getPayload());
//        session.sendMessage(new TextMessage("FruitScaleHandler: " + message.getPayload()));
//        // --- Tạm thời không xử lý gì hoặc gửi phản hồi đơn giản ---
//        // Ví dụ: gửi lại xác nhận
//        // session.sendMessage(new TextMessage("Server received: " + message.getPayload()));
//
//        // Gọi phương thức của lớp cha (nếu cần) - TextWebSocketHandler gốc không làm gì trong handleTextMessage
//        // super.handleTextMessage(session, message);
//    }
//
//    @Override
//    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
//        // Log khi có lỗi trong quá trình giao tiếp .  Được gọi khi có lỗi giao tiếp WebSocket xảy ra.
//        //Ví dụ: mất kết nối mạng, timeout, lỗi khi đọc/gửi dữ liệu
//        System.err.println(">>> FruitScaleHandler transport error for session " + session.getId() + ": " + exception.getMessage());
//        // In đầy đủ stack trace để debug
//        exception.printStackTrace();
//        // Gọi phương thức của lớp cha
//        super.handleTransportError(session, exception);
//    }
//
//    @Override
//    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
//        // Log khi kết nối bị đóng
//        // Được gọi khi client đóng kết nối với server.
//        System.out.println(">>> FruitScaleHandler disconnected " + session.getId() + " with status: " + status);
//        // Gọi phương thức của lớp cha
//        super.afterConnectionClosed(session, status);
//    }
//}