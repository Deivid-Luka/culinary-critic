package com.culinaryCritic.controller;

import com.culinaryCritic.entity.Review;
import com.culinaryCritic.service.ReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private final ReviewService reviewService;

    public UserController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/review/{restaurantId}")
    public ResponseEntity<?> createReview(@RequestHeader("Authorization") String token, @PathVariable("restaurantId") Long restaurantId, @RequestBody Review review) {
        try {
            Review savedReview = reviewService.saveReviewWithUser(restaurantId, review, token);
            return ResponseEntity.ok(savedReview);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
