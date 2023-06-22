package com.culinaryCritic.service;

import com.culinaryCritic.entity.Restaurant;
import com.culinaryCritic.entity.Review;
import com.culinaryCritic.repository.RestaurantRepository;
import com.culinaryCritic.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class ReviewServiceImpl implements ReviewService{

    private final RestaurantRepository restaurantRepository;

    private final ReviewRepository reviewRepository;

    public ReviewServiceImpl(RestaurantRepository restaurantRepository, ReviewRepository reviewRepository) {
        this.restaurantRepository = restaurantRepository;
        this.reviewRepository = reviewRepository;
    }

    @Override
    public Review save(Long restaurantId, Review review) throws Exception {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new Exception("Restaurant not found with ID: " + restaurantId));
        review.setRestaurant(restaurant);
        review.setReviewDate(new Date());
        return reviewRepository.save(review);
    }
}
