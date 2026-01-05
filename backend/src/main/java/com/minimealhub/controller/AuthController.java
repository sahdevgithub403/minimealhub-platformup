package com.minimealhub.controller;

import com.minimealhub.dto.JwtResponse;
import com.minimealhub.dto.LoginRequest;
import com.minimealhub.dto.RegisterRequest;
import com.minimealhub.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Allow React Frontend to access
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<JwtResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(userService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> authenticate(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(userService.authenticate(request));
    }
}
