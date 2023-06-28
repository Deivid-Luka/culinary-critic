package com.culinaryCritic.service;

import com.culinaryCritic.entity.Restaurant;
import com.culinaryCritic.entity.Review;

public interface ReviewService {

    void saveReview(Long restaurantId,Review review) throws Exception;

    void saveReviewWithUser(Long restaurantId,Review review, String token) throws Exception;


}
