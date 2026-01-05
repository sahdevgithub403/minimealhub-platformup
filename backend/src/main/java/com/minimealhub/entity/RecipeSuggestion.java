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
@Table(name = "recipe_suggestions")
public class RecipeSuggestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String recipeName;

    @Column(length = 1000)
    private String description;

    private String ingredients;
    private String category; // BREAKFAST, LUNCH, SNACK, DINNER
    private boolean vegetarian;
    private String ageGroup;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    private String status; // PENDING, APPROVED, REJECTED
}
