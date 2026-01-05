package com.minimealhub.controller;

import com.minimealhub.dto.PaymentVerificationRequest;
import com.minimealhub.entity.Order;
import com.minimealhub.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PaymentController {

    private final OrderRepository orderRepository;

    // TODO: Move to application.properties
    private static final String RAZORPAY_KEY_ID = "YOUR_RAZORPAY_KEY_ID";
    private static final String RAZORPAY_KEY_SECRET = "YOUR_RAZORPAY_KEY_SECRET";

    @PostMapping("/verify")
    public ResponseEntity<Map<String, Object>> verifyPayment(@RequestBody PaymentVerificationRequest request) {
        Map<String, Object> response = new HashMap<>();

        try {
            // Verify Razorpay signature
            String generatedSignature = generateSignature(
                    request.getRazorpayOrderId() + "|" + request.getRazorpayPaymentId(),
                    RAZORPAY_KEY_SECRET);

            if (generatedSignature.equals(request.getRazorpaySignature())) {
                // Signature is valid - update order
                Order order = orderRepository.findById(request.getOrderId())
                        .orElseThrow(() -> new RuntimeException("Order not found"));

                order.setPaymentId(request.getRazorpayPaymentId());
                order.setPaymentStatus("PAID");
                order.setPaymentMethod("RAZORPAY");
                order.setStatus("CONFIRMED");

                orderRepository.save(order);

                response.put("success", true);
                response.put("message", "Payment verified successfully");
                response.put("order", order);
            } else {
                response.put("success", false);
                response.put("message", "Invalid payment signature");
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Payment verification failed: " + e.getMessage());
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/config")
    public ResponseEntity<Map<String, String>> getPaymentConfig() {
        Map<String, String> config = new HashMap<>();
        config.put("key", RAZORPAY_KEY_ID);
        return ResponseEntity.ok(config);
    }

    private String generateSignature(String data, String secret) throws Exception {
        Mac sha256Hmac = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKey = new SecretKeySpec(secret.getBytes(), "HmacSHA256");
        sha256Hmac.init(secretKey);
        byte[] signedBytes = sha256Hmac.doFinal(data.getBytes());
        return bytesToHex(signedBytes);
    }

    private String bytesToHex(byte[] bytes) {
        StringBuilder result = new StringBuilder();
        for (byte b : bytes) {
            result.append(String.format("%02x", b));
        }
        return result.toString();
    }
}
