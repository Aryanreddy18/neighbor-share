package com.neighborshare.backend.service;

import com.neighborshare.backend.dto.BookingRequest;
import com.neighborshare.backend.dto.BookingResponse;
import com.neighborshare.backend.entity.*;
import com.neighborshare.backend.repository.BookingRepository;
import com.neighborshare.backend.repository.ItemRepository;
import com.neighborshare.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final ItemRepository itemRepository;
    private final UserRepository userRepository;

    public BookingResponse requestItem(BookingRequest request, String userEmail) {

        User borrower = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Item item = itemRepository.findById(request.getItemId())
                .orElseThrow(() -> new RuntimeException("Item not found"));

        Booking booking = Booking.builder()
                .item(item)
                .borrower(borrower)
                .owner(item.getOwner())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .status(BookingStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .build();

        bookingRepository.save(booking);

        return mapToResponse(booking);
    }

    public List<BookingResponse> getMyBookings(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return bookingRepository.findByBorrower(user)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<BookingResponse> getIncomingRequests(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return bookingRepository.findByOwner(user)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public BookingResponse approveBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus(BookingStatus.APPROVED);
        bookingRepository.save(booking);

        return mapToResponse(booking);
    }

    public BookingResponse rejectBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus(BookingStatus.REJECTED);
        bookingRepository.save(booking);

        return mapToResponse(booking);
    }

    private BookingResponse mapToResponse(Booking booking) {
        return BookingResponse.builder()
                .id(booking.getId())
                .itemName(booking.getItem().getName())
                .borrowerEmail(booking.getBorrower().getEmail())
                .ownerEmail(booking.getOwner().getEmail())
                .startDate(booking.getStartDate())
                .endDate(booking.getEndDate())
                .status(booking.getStatus().name())
                .build();
    }
}