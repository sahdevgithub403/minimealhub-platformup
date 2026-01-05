package com.minimealhub.controller;

import com.minimealhub.entity.Order;
import com.minimealhub.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderRepository orderRepository;
    private final com.minimealhub.repository.UserRepository userRepository;

    @GetMapping
    public List<Order> getMyOrders() {
        String email = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication()
                .getName();
        com.minimealhub.entity.User user = userRepository.findByEmail(email).orElseThrow();
        return orderRepository.findByUser(user);
    }

    @PostMapping
    public ResponseEntity<Order> placeOrder(@RequestBody Order order) {
        String email = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication()
                .getName();
        com.minimealhub.entity.User user = userRepository.findByEmail(email).orElseThrow();

        order.setUser(user);
        order.setStatus("PENDING");
        order.setOrderDate(java.time.LocalDateTime.now());
        return ResponseEntity.ok(orderRepository.save(order));
    }

    @org.springframework.security.access.prepost.PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @org.springframework.security.access.prepost.PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long id,
            @RequestBody java.util.Map<String, String> statusMap) {
        Order order = orderRepository.findById(id).orElseThrow();
        order.setStatus(statusMap.get("status"));
        return ResponseEntity.ok(orderRepository.save(order));
    }
}
