package com.culinaryCritic.service;

import com.culinaryCritic.entity.Restaurant;
import com.culinaryCritic.entity.Review;

public interface ReviewService {

    Review save(Long restaurantId,Review review) throws Exception;

}
