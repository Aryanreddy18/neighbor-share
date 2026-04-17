package com.neighborshare.backend.service;

import com.neighborshare.backend.dto.ItemRequest;
import com.neighborshare.backend.dto.ItemResponse;
import com.neighborshare.backend.entity.Item;
import com.neighborshare.backend.entity.User;
import com.neighborshare.backend.repository.ItemRepository;
import com.neighborshare.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private UserRepository userRepository;

    public ItemResponse addItem(ItemRequest request, String userEmail) {
        User owner = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Item item = Item.builder()
                .name(request.getName())
                .description(request.getDescription())
                .category(request.getCategory())
                .pricePerDay(request.getPricePerDay())
                .depositAmount(request.getDepositAmount())
                .imageUrl(request.getImageUrl())
                .availabilityStatus("AVAILABLE")
                .createdAt(LocalDateTime.now())
                .owner(owner)
                .build();

        Item savedItem = itemRepository.save(item);
        return mapToResponse(savedItem);
    }

    public List<ItemResponse> getAllItems() {
        return itemRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public ItemResponse getItemById(Long id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));
        return mapToResponse(item);
    }

    public List<ItemResponse> getMyItems(String userEmail) {
        User owner = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return itemRepository.findByOwner(owner)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public String deleteMyItem(Long itemId, String userEmail) {
        User owner = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        if (!item.getOwner().getId().equals(owner.getId())) {
            throw new RuntimeException("You can delete only your own items");
        }

        itemRepository.delete(item);
        return "Item deleted successfully";
    }

    private ItemResponse mapToResponse(Item item) {
        return ItemResponse.builder()
                .id(item.getId())
                .name(item.getName())
                .description(item.getDescription())
                .category(item.getCategory())
                .pricePerDay(item.getPricePerDay())
                .depositAmount(item.getDepositAmount())
                .imageUrl(item.getImageUrl())
                .availabilityStatus(item.getAvailabilityStatus())
                .ownerName(item.getOwner().getName())
                .ownerEmail(item.getOwner().getEmail())
                .build();
    }
}