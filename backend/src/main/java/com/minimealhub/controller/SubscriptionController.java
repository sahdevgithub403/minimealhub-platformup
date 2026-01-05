package com.minimealhub.controller;

import com.minimealhub.dto.SubscriptionRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/subscriptions")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SubscriptionController {

    @PostMapping("/trial")
    public ResponseEntity<String> requestTrial(@RequestBody SubscriptionRequest request) {
        // TODO: Save to database or send email notification
        System.out.println("==============================================");
        System.out.println("NEW TRIAL PLAN REQUEST");
        System.out.println("Parent: " + request.getParentName());
        System.out.println("Phone: " + request.getPhoneNumber());
        System.out.println("Child: " + request.getChildName());
        System.out.println("Age Group: " + request.getAgeGroup());
        System.out.println("School/Area: " + request.getSchoolArea());
        System.out.println("Allergies: " + request.getAllergies());
        System.out.println("==============================================");

        return ResponseEntity.ok("Trial plan request received! We'll contact you soon.");
    }
}
