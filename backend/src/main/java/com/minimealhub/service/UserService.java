package com.minimealhub.service;

import com.minimealhub.dto.JwtResponse;
import com.minimealhub.dto.LoginRequest;
import com.minimealhub.dto.RegisterRequest;
import com.minimealhub.entity.Role;
import com.minimealhub.entity.User;
import com.minimealhub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;
        private final AuthenticationManager authenticationManager;

        public JwtResponse register(RegisterRequest request) {
                var user = User.builder()
                                .firstname(request.getFirstname())
                                .lastname(request.getLastname())
                                .email(request.getEmail())
                                .password(passwordEncoder.encode(request.getPassword()))
                                .role(Role.USER)
                                .build();
                userRepository.save(user);
                java.util.Map<String, Object> extraClaims = new java.util.HashMap<>();
                extraClaims.put("role", user.getRole());
                var jwtToken = jwtService.generateToken(extraClaims, user);
                return JwtResponse.builder()
                                .token(jwtToken)
                                .build();
        }

        public JwtResponse authenticate(LoginRequest request) {
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                request.getEmail(),
                                                request.getPassword()));
                var user = userRepository.findByEmail(request.getEmail())
                                .orElseThrow();
                java.util.Map<String, Object> extraClaims = new java.util.HashMap<>();
                extraClaims.put("role", user.getRole());
                var jwtToken = jwtService.generateToken(extraClaims, user);
                return JwtResponse.builder()
                                .token(jwtToken)
                                .build();
        }
}
