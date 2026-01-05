package com.minimealhub.repository;

import com.minimealhub.entity.RecipeSuggestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeSuggestionRepository extends JpaRepository<RecipeSuggestion, Long> {
    List<RecipeSuggestion> findAllByOrderByCreatedAtDesc();

    List<RecipeSuggestion> findByStatus(String status);
}
