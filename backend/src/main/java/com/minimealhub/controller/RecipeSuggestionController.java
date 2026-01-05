package com.minimealhub.controller;

import com.minimealhub.entity.RecipeSuggestion;
import com.minimealhub.entity.User;
import com.minimealhub.repository.RecipeSuggestionRepository;
import com.minimealhub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recipes/suggestions")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class RecipeSuggestionController {

    private final RecipeSuggestionRepository suggestionRepository;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<RecipeSuggestion>> getAllSuggestions() {
        List<RecipeSuggestion> suggestions = suggestionRepository.findAllByOrderByCreatedAtDesc();
        return ResponseEntity.ok(suggestions);
    }

    @PostMapping
    public ResponseEntity<RecipeSuggestion> createSuggestion(@RequestBody Map<String, Object> request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow();

        RecipeSuggestion suggestion = RecipeSuggestion.builder()
                .user(user)
                .recipeName((String) request.get("recipeName"))
                .description((String) request.get("description"))
                .ingredients((String) request.get("ingredients"))
                .category((String) request.get("category"))
                .vegetarian((Boolean) request.getOrDefault("vegetarian", false))
                .ageGroup((String) request.get("ageGroup"))
                .createdAt(LocalDateTime.now())
                .status("PENDING")
                .build();

        RecipeSuggestion saved = suggestionRepository.save(suggestion);
        return ResponseEntity.ok(saved);
    }
}
