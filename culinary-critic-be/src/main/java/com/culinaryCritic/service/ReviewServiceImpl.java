package com.culinaryCritic.service;

import com.culinaryCritic.DTO.Authentification.JWTValues;
import com.culinaryCritic.entity.Restaurant;
import com.culinaryCritic.entity.Review;
import com.culinaryCritic.repository.RestaurantRepository;
import com.culinaryCritic.repository.ReviewRepository;
import com.culinaryCritic.securityConfig.JWTTokenFunctions;
import org.springframework.stereotype.Service;

import javax.naming.LimitExceededException;
import java.util.Date;
import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService{

    private final RestaurantRepository restaurantRepository;

    private final ReviewRepository reviewRepository;

    private final JWTTokenFunctions jwtTokenFunctions;


    public ReviewServiceImpl(RestaurantRepository restaurantRepository, ReviewRepository reviewRepository, JWTTokenFunctions jwtTokenFunctions) {
        this.restaurantRepository = restaurantRepository;
        this.reviewRepository = reviewRepository;
        this.jwtTokenFunctions = jwtTokenFunctions;
    }


    @Override
    public void saveReviewWithUser(Long restaurantId, Review review, String token) throws Exception {
        JWTValues jwtValues = jwtTokenFunctions.tokenValueExtractor(token);
        review.setReviewerName(jwtValues.getUsername());

        Date currentDate = new Date();
        Date weekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000); // Calculate the date one week ago

        // Check if the user has already given a review within the current week
        List<Review> existingReviews = reviewRepository.findByReviewerNameAndReviewDateBetween(review.getReviewerName(), weekAgo, currentDate);
        if (!existingReviews.isEmpty()) {
            throw new LimitExceededException("You have already submitted a review for this restaurant within the current week.");
        }

        saveReview(restaurantId, review);
    }

    @Override
    public void saveReview(Long restaurantId, Review review) throws LimitExceededException {
        if (review.getReport().length()>=100) {
            throw new LimitExceededException("Report can not exceed 100 characters");
        }
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new NullPointerException("Restaurant not found with ID: " + restaurantId));
        review.setRestaurant(restaurant);
        review.setReviewDate(new Date());
        reviewRepository.save(review);
    }

}
