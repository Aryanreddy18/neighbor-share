package com.neighborshare.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.neighborshare.backend.dto.ItemRequest;
import com.neighborshare.backend.dto.ItemResponse;
import com.neighborshare.backend.service.ItemService;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "*")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @PostMapping
    public ResponseEntity<ItemResponse> addItem(@RequestBody ItemRequest request,
                                                Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(itemService.addItem(request, email));
    }

    @GetMapping
    public ResponseEntity<List<ItemResponse>> getAllItems() {
        return ResponseEntity.ok(itemService.getAllItems());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemResponse> getItemById(@PathVariable Long id) {
        return ResponseEntity.ok(itemService.getItemById(id));
    }

    @GetMapping("/my-items")
    public ResponseEntity<List<ItemResponse>> getMyItems(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(itemService.getMyItems(email));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMyItem(@PathVariable Long id,
                                               Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(itemService.deleteMyItem(id, email));
    }
}