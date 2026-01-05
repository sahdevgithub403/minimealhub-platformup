package com.minimealhub.controller;

import com.minimealhub.entity.Meal;
import com.minimealhub.repository.MealRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/meals")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MealController {

    private final MealRepository mealRepository;

    @GetMapping
    public List<Meal> getAllMeals() {
        return mealRepository.findAll();
    }

    @org.springframework.security.access.prepost.PreAuthorize("hasRole('ADMIN')")
    @org.springframework.web.bind.annotation.PostMapping
    public Meal createMeal(@org.springframework.web.bind.annotation.RequestBody Meal meal) {
        return mealRepository.save(meal);
    }

    @org.springframework.security.access.prepost.PreAuthorize("hasRole('ADMIN')")
    @org.springframework.web.bind.annotation.PutMapping("/{id}")
    public org.springframework.http.ResponseEntity<Meal> updateMeal(
            @org.springframework.web.bind.annotation.PathVariable Long id,
            @org.springframework.web.bind.annotation.RequestBody Meal mealDetails) {
        Meal meal = mealRepository.findById(id).orElseThrow();
        meal.setName(mealDetails.getName());
        meal.setDescription(mealDetails.getDescription());
        meal.setPrice(mealDetails.getPrice());
        meal.setImageUrl(mealDetails.getImageUrl());
        meal.setDayOfWeek(mealDetails.getDayOfWeek());
        meal.setVegetarian(mealDetails.isVegetarian());
        return org.springframework.http.ResponseEntity.ok(mealRepository.save(meal));
    }

    @org.springframework.security.access.prepost.PreAuthorize("hasRole('ADMIN')")
    @org.springframework.web.bind.annotation.DeleteMapping("/{id}")
    public org.springframework.http.ResponseEntity<Void> deleteMeal(
            @org.springframework.web.bind.annotation.PathVariable Long id) {
        mealRepository.deleteById(id);
        return org.springframework.http.ResponseEntity.noContent().build();
    }
}
