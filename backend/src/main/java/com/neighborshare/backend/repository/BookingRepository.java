package com.neighborshare.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.neighborshare.backend.entity.Booking;
import com.neighborshare.backend.entity.User;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByBorrower(User borrower);

    List<Booking> findByOwner(User owner);
}