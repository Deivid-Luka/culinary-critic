package com.culinaryCritic.service;

import com.culinaryCritic.entity.Restaurant;
import com.culinaryCritic.entity.Review;
import com.culinaryCritic.repository.RestaurantRepository;
import com.culinaryCritic.repository.ReviewRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import javax.naming.LimitExceededException;
import java.util.Date;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ReviewServiceImplTest {

    @Mock
    private RestaurantRepository restaurantRepository;

    @Mock
    private ReviewRepository reviewRepository;

    @InjectMocks
    private ReviewServiceImpl reviewService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void save_ValidReview_SuccessfullySaved() throws Exception {
        // Arrange
        Long restaurantId = 1L;
        String report = "Good restaurant.";
        Review review = new Review();
        review.setReport(report);

        Restaurant restaurant = new Restaurant();
        restaurant.setId(restaurantId);

        when(restaurantRepository.findById(restaurantId)).thenReturn(Optional.of(restaurant));
        when(reviewRepository.save(review)).thenReturn(review);

        // Act
        Review savedReview = reviewService.save(restaurantId, review);

        // Assert
        assertNotNull(savedReview);
        assertEquals(restaurant, savedReview.getRestaurant());
        assertNotNull(savedReview.getReviewDate());
        assertEquals(report, savedReview.getReport());

        verify(restaurantRepository).findById(restaurantId);
        verify(reviewRepository).save(review);
    }

    @Test
    void save_InvalidReview_ThrowsLimitExceededException() {
        // Arrange
        Long restaurantId = 1L;
        String report = "This is a sample report.";
        Review review = new Review();
        review.setReport(report.repeat(10));

        // Adjust the behavior of the restaurantRepository mock
        when(restaurantRepository.findById(restaurantId)).thenReturn(Optional.of(new Restaurant()));

        // Act and Assert
        assertThrows(LimitExceededException.class, () -> reviewService.save(restaurantId, review));

        verify(restaurantRepository, never()).findById(anyLong());
        verify(reviewRepository, never()).save(any());
    }


    @Test
    void save_RestaurantNotFound_ThrowsNullPointerException() {
        // Arrange
        Long restaurantId = 1L;
        Review review = new Review();
        review.setReport("Good restaurant.");

        when(restaurantRepository.findById(restaurantId)).thenReturn(Optional.empty());

        // Act and Assert
        assertThrows(NullPointerException.class, () -> reviewService.save(restaurantId, review));

        verify(restaurantRepository).findById(restaurantId);
        verify(reviewRepository, never()).save(any());
    }
}
