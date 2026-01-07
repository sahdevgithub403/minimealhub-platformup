package com.minimealhub.config;

import com.minimealhub.entity.Role;
import com.minimealhub.entity.User;
import com.minimealhub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminSeeder implements CommandLineRunner {

    private final UserRepository userRepository;

    @Override
    public void run(String... args) {

        String adminPhone = "9999999999"; // real phone number

        if (userRepository.findByPhone(adminPhone).isEmpty()) {

            User admin = User.builder()
                    .firstname("Admin")
                    .lastname("User")
                    .phone(adminPhone)
                    .role(Role.ADMIN)
                    .build();

            userRepository.save(admin);

            System.out.println("ADMIN USER CREATED WITH PHONE: " + adminPhone);
        }
    }
}
