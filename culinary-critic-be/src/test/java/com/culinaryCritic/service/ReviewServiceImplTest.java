package com.culinaryCritic.service;

import com.culinaryCritic.DTO.Authentification.JWTValues;
import com.culinaryCritic.entity.Restaurant;
import com.culinaryCritic.entity.Review;
import com.culinaryCritic.repository.RestaurantRepository;
import com.culinaryCritic.repository.ReviewRepository;
import com.culinaryCritic.securityConfig.JWTTokenFunctions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import javax.naming.LimitExceededException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

class ReviewServiceImplTest {

    private ReviewService reviewService;

    @Mock
    private RestaurantRepository restaurantRepository;

    @Mock
    private ReviewRepository reviewRepository;

    @Mock
    private JWTTokenFunctions jwtTokenFunctions;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        reviewService = new ReviewServiceImpl(restaurantRepository, reviewRepository, jwtTokenFunctions);
    }

    @Test
    void saveReviewWithUser_ValidReview_SaveReview() throws Exception {
        // Arrange
        Long restaurantId = 1L;
        String token = "dummyToken";
        Review review = new Review();
        review.setReviewerName("John Doe");
        review.setReport("ASDASDASD");
        Restaurant restaurant = new Restaurant();
        restaurant.setId(restaurantId);

        List<Review> existingReviews = new ArrayList<>();

        JWTValues jwtValues = new JWTValues();
        jwtValues.setUsername("John Doe");
        when(jwtTokenFunctions.tokenValueExtractor(token)).thenReturn(jwtValues);
        when(restaurantRepository.findById(restaurantId)).thenReturn(Optional.of(restaurant));
        when(reviewRepository.findByReviewerNameAndRestaurantIdAndReviewDateBetween(any(String.class), any(Long.class), any(Date.class), any(Date.class)))
                .thenReturn(existingReviews);

        // Act
        reviewService.saveReviewWithUser(restaurantId, review, token);

        // Assert
        assertEquals(restaurant, review.getRestaurant());
        assertNotNull(review.getReviewDate());
        assertEquals(0, existingReviews.size());
    }

    @Test
    void saveReviewWithUser_ExistingReview_ThrowLimitExceededException() throws Exception {
        // Arrange
        Long restaurantId = 1L;
        String token = "dummyToken";
        Review review = new Review();
        review.setReviewerName("John Doe");

        Date currentDate = new Date();
        Date weekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);

        List<Review> existingReviews = new ArrayList<>();
        existingReviews.add(new Review());
        JWTValues jwtValues = new JWTValues();
        jwtValues.setUsername("John Doe");
        when(jwtTokenFunctions.tokenValueExtractor(token)).thenReturn(jwtValues);
        when(restaurantRepository.findById(restaurantId)).thenReturn(Optional.empty());
        when(reviewRepository.findByReviewerNameAndRestaurantIdAndReviewDateBetween(any(String.class), any(Long.class), any(Date.class), any(Date.class)))
                .thenReturn(existingReviews);

        // Assert
        assertThrows(LimitExceededException.class, () ->
                reviewService.saveReviewWithUser(restaurantId, review, token));
    }

    @Test
    void saveReview_ReviewExceedsLimit_ThrowLimitExceededException() throws LimitExceededException {
        // Arrange
        Long restaurantId = 1L;
        Review review = new Review();
        String report = "This is a very long report that exceeds the limit of 100 characters.";
        review.setReport(report.repeat(10));

        when(restaurantRepository.findById(restaurantId)).thenReturn(Optional.empty());

        // Assert
        assertThrows(LimitExceededException.class, () ->
                reviewService.saveReview(restaurantId, review));
    }
}
