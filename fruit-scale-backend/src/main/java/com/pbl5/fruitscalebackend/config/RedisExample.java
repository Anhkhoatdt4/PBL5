//package com.pbl5.fruitscalebackend.config;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.data.redis.core.RedisTemplate;
//import org.springframework.stereotype.Component;
//
//@Component
//public class RedisExample implements CommandLineRunner {
//    @Autowired
//    private RedisTemplate template;
//
//    @Override
//    public void run(String... args) throws Exception {
//        template.opsForValue().set("welcome", "Welcome to the Fruit Scale Backend!");
//        System.out.println("Redis Example: " + template.opsForValue().get("welcome"));
//
//        template.opsForValue().set("welcome" , "Hello Redis Updated!");
//        System.out.println("welcome updated: " + template.opsForValue().get("welcome"));
//
//        // 3. Xóa key
//        template.delete("welcome");
//        System.out.println("welcome after delete: " + template.opsForValue().get("welcome"));
//
//        // 4. Kiểm tra key có tồn tại không
//        template.opsForValue().set("count" , "10");
//        Boolean exists = template.hasKey("count");
//        System.out.println("Does 'count' key exist? " + exists);
//
//        // 5. Tăng giá trị số nguyên
//        template.opsForValue().increment("count", 5);
//        System.out.println("Count after increment: " + template.opsForValue().get("count"));
//        // 6. Giảm giá trị số nguyên
//        template.opsForValue().decrement("count", 3);
//        System.out.println("Count after decrement: " + template.opsForValue().get("count"));
//
//        // 7. Lưu Hash (Map) đơn giản
//        template.opsForHash().put("user:1001", "name", "John Doe");
//        template.opsForHash().put("user:1001" , "email" , "nguyenvana@exampl.com");
//
//        String name = (String) template.opsForHash().get("user:1001", "name");
//        String email = (String) template.opsForHash().get("user:1001", "email");
//        System.out.println("User 1001 Name: " + name + ", Email: " + email);
//
//        //8 . Xóa Hash field
//        template.opsForHash().delete("user:1001", "email");
//        Object deletedEmail = template.opsForHash().get("user:1001", "email");
//        System.out.println("Email after deletion: " + deletedEmail);
//    }
//
//
//}