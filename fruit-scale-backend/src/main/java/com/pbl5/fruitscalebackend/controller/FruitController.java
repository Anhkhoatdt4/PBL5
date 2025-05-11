package com.pbl5.fruitscalebackend.controller;

import com.pbl5.fruitscalebackend.entity.InventoryItem;
import com.pbl5.fruitscalebackend.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/api/fruit")
@CrossOrigin
public class FruitController {

    @Autowired
    private InventoryService inventoryService;

    private static final String IMAGE_FOLDER = "D:/PBL5/img/";

    @GetMapping("/latest")
    public ResponseEntity<List<Map<String, String>>> getLatestFruitImages() {
        File folder = new File(IMAGE_FOLDER);
        if (!folder.exists() || !folder.isDirectory()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        // Lọc tất cả các file .jpg trong thư mục
        File[] jpgFiles = folder.listFiles((dir, name) -> name.toLowerCase().endsWith(".jpg"));
        if (jpgFiles == null || jpgFiles.length == 0) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        List<Map<String, String>> responseList = new ArrayList<>();
        List<InventoryItem> inventoryItems = inventoryService.getAllInventoryItems();
        for (File file : jpgFiles) {
            try (FileInputStream fileInputStream = new FileInputStream(file)) {
                byte[] bytes = fileInputStream.readAllBytes();
                String base64Image = Base64.getEncoder().encodeToString(bytes);

                Map<String, String> response = new HashMap<>();
                response.put("image_base64", "data:image/jpeg;base64," + base64Image);
                response.put("image_name", file.getName());
                response.put("fruit_weight", "7 kg");
                String formattedFruitName = getNameFruit(file.getName());
                System.out.println("formattedFruitName " + formattedFruitName);
                Optional<InventoryItem> newitem = inventoryItems.stream().filter(item -> item.getFruitName().equalsIgnoreCase(formattedFruitName)).findFirst();

                if (newitem.isPresent()) {
                    response.put("fruit_price", newitem.get().getPricePerKg() + " VND");
                } else {

                    response.put("fruit_price", "N/A");
                }

                responseList.add(response);
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

        return ResponseEntity.ok(responseList);
    }


    private Map<String, Integer> fruitPrices = new HashMap<>() {{
        put("Apples", 35000);
        put("Bananas", 18000);
        put("Grapes", 60000);
        put("Oranges", 40000);
        put("Strawberries", 90000);
        put("Watermelons", 12000);
        put("Pineapples", 25000);
        put("Tomatoes", 22000);
    }};

    private String getNameFruit(String fileName) {
        // Remove the file extension (.jpg, .jpeg, etc.) and then remove any non-alphabetic characters
        String cleanedName = fileName.replaceAll("\\.jpg$|\\.jpeg$|\\.png$", "") // Remove file extension
                .replaceAll("[^a-zA-Z]", "") // Remove non-alphabetic characters
                .trim();
        for (Map.Entry<String, Integer> entry : fruitPrices.entrySet()) {
            if (cleanedName.equalsIgnoreCase(entry.getKey())) {
                return entry.getKey();
            }
        }

        return null;
    }


}
