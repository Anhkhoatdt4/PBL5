package model;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Base64;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import org.json.JSONObject;

@ServerEndpoint("/chat")
public class FruitWebSocket {

    @OnOpen
    public void onOpen(Session session) {
        System.out.println("Client connected: " + session.getId());
    }

    @OnMessage
    public void onMessage(String message, Session session) {
        System.out.println("Received metadata: " + message);
        // Xu ly metadata
        try {
            JSONObject json = new JSONObject(message);
            String weight = json.getString("weight");
            String fruitName = json.getString("fruit_name");
            System.out.println("Extracted metadata: weight=" + weight + ", fruitName=" + fruitName);
        } catch (Exception e) {
            System.err.println("Error processing metadata: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @OnMessage
    public void onBinaryMessage(byte[] data, Session session) {
        // Xu ly anh nhan duoc (binary)
        System.out.println("Received binary data: " + data.length + " bytes");
        // Luu anh (vi du)
        String filePath = "C:/Users/ADMIN/Downloads/received_image_" + System.currentTimeMillis() + ".jpg";
        try (FileOutputStream fos = new FileOutputStream(filePath)) {
            fos.write(data);
            System.out.println("Saved binary image at: " + filePath);
        } catch (IOException e) {
            System.err.println("Error saving binary image: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @OnClose
    public void onClose(Session session) {
        System.out.println("Client disconnected: " + session.getId());
    }

    private void saveImage(String base64Image, String filePath) throws IOException {
        System.out.println("Saving image to: " + filePath);
        byte[] decodedBytes = Base64.getDecoder().decode(base64Image);
        File file = new File(filePath);
        file.getParentFile().mkdirs(); // Tạo thư mục nếu chưa có
        try (FileOutputStream fos = new FileOutputStream(file)) {
            fos.write(decodedBytes);
            System.out.println("Image saved successfully: " + filePath);
        } catch (IOException e) {
            System.err.println("Error saving image: " + e.getMessage());
            throw e;
        }
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        System.err.println("WebSocket error: " + throwable.getMessage());
        throwable.printStackTrace();
    }
}