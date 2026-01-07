package com.minimealhub.service;

import com.minimealhub.dto.*;
import com.minimealhub.entity.*;
import com.minimealhub.repository.*;
import com.minimealhub.util.OtpUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final OtpRepository otpRepository;
    private final JwtService jwtService;

    public void sendOtp(SendOtpRequest request) {

        String otp = OtpUtil.generateOtp();

        otpRepository.save(
                OtpVerification.builder()
                        .phone(request.getPhone())
                        .otp(otp)
                        .firstname(request.getFirstname())
                        .lastname(request.getLastname())
                        .expiryTime(LocalDateTime.now().plusMinutes(5))
                        .verified(false)
                        .build()
        );

        System.out.println("OTP for " + request.getPhone() + " : " + otp);
    }

    public JwtResponse verifyOtp(VerifyOtpRequest request) {

        OtpVerification otp = otpRepository
                .findTopByPhoneOrderByIdDesc(request.getPhone())
                .orElseThrow(() -> new RuntimeException("OTP not found"));

        if (otp.isVerified()) throw new RuntimeException("OTP already used");
        if (otp.getExpiryTime().isBefore(LocalDateTime.now())) throw new RuntimeException("OTP expired");
        if (!otp.getOtp().equals(request.getOtp())) throw new RuntimeException("Invalid OTP");

        otp.setVerified(true);
        otpRepository.save(otp);

        User user = userRepository.findByPhone(request.getPhone())
                .orElseGet(() -> userRepository.save(
                        User.builder()
                                .firstname(otp.getFirstname())
                                .lastname(otp.getLastname())
                                .phone(request.getPhone())
                                .role(Role.USER)
                                .build()
                ));

        Map<String, Object> claims = new HashMap<>();
        claims.put("role", user.getRole());

        return JwtResponse.builder()
                .token(jwtService.generateToken(claims, user))
                .build();
    }
}
