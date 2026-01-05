package com.minimealhub.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String planType; // e.g., "Weekly", "Monthly"
    private double totalAmount;
    private LocalDateTime orderDate;
    private String status; // PENDING, DELIVERED

    // Customer Details
    private String parentName;
    private String phoneNumber;
    private String childName;
    private String ageGroup;
    private String schoolArea;
    private String allergies;

    // Payment Details
    private String paymentId; // Razorpay payment ID
    private String paymentStatus; // PENDING, PAID, FAILED
    private String paymentMethod; // RAZORPAY, UPI, CARD
}
