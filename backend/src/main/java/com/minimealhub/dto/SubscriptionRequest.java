package com.minimealhub.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionRequest {
    private String parentName;
    private String phoneNumber;
    private String childName;
    private String ageGroup;
    private String schoolArea;
    private String allergies;
}
