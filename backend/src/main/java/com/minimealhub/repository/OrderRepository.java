package com.minimealhub.repository;

import com.minimealhub.entity.Order;
import com.minimealhub.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
}
