package com.minimealhub.dto;

import lombok.Data;

@Data
public class SendOtpRequest {
    private String firstname;
    private String lastname;
    private String phone;
}

