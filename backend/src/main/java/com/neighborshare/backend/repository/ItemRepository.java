package com.neighborshare.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.neighborshare.backend.entity.Item;
import com.neighborshare.backend.entity.User;

public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByOwner(User owner);
    List<Item> findByAvailabilityStatus(String availabilityStatus);
    List<Item> findByCategoryIgnoreCase(String category);
}