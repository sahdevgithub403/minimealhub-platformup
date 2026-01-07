// package com.minimealhub.controller;

// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// @RestController
// @RequestMapping("/api/reviews")
// @CrossOrigin
// public class ReviewController {

//     private final ReviewRepository repo;
//     private final SimpMessagingTemplate messagingTemplate;

//     public ReviewController(
//             ReviewRepository repo,
//             SimpMessagingTemplate messagingTemplate
//     ) {
//         this.repo = repo;
//         this.messagingTemplate = messagingTemplate;
//     }

//     @PutMapping("/{id}/approve")
//     public void approve(@PathVariable Long id) {
//         Review r = repo.findById(id).orElseThrow();
//         r.setStatus("APPROVED");
//         repo.save(r);

//         // 🔥 REAL-TIME PUSH
//         messagingTemplate.convertAndSend(
//             "/topic/reviews",
//             r
//         );
//     }
// }

