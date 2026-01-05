package com.minimealhub.controller;

import com.minimealhub.service.AiAssistantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AiAssistantController {

    private final AiAssistantService aiAssistantService;

    @PostMapping("/chat")
    public ResponseEntity<String> chat(@RequestBody String prompt) {
        return ResponseEntity.ok(aiAssistantService.getResponse(prompt));
    }
}
