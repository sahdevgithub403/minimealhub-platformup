package com.minimealhub.service;

import org.springframework.stereotype.Service;

@Service
public class AiAssistantService {

    public String getResponse(String prompt) {
        // Mock response for now. Ideally this would call Gemini API or similar.
        return "As your MiniMeal assistant, I suggest a balanced meal with fruits and veggies! How about some carrot sticks with hummus today?";
    }
}
