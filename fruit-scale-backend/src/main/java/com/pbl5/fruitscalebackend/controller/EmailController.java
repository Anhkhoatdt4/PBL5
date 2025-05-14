//package com.pbl5.fruitscalebackend.controller;
//
//import com.pbl5.fruitscalebackend.service.EmailService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/email")
//@CrossOrigin
//public class EmailController {
//
//    @Autowired
//    private EmailService emailService;
//
//    @GetMapping("/test")
//    public String testEmail(@RequestParam String toEmail,
//                            @RequestParam String fruitName,
//                            @RequestParam double quantity) {
//        try {
//            emailService.sendLowStockEmail(toEmail, fruitName, quantity);
//            return "Email sent successfully to " + toEmail;
//        } catch (Exception e) {
//            return "Failed to send email: " + e.getMessage();
//        }
//    }
//}
