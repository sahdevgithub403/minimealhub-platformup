package com.minimealhub.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.minimealhub.entity.OtpVerification;

public interface OtpRepository extends JpaRepository<OtpVerification, Long> {
    Optional<OtpVerification> findTopByPhoneOrderByIdDesc(String phone);
}
