package com.culinaryCritic.service;

import com.culinaryCritic.DTO.Display.RestaurantDisplay;
import com.culinaryCritic.entity.Restaurant;
import com.culinaryCritic.entity.Review;
import com.culinaryCritic.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RestaurantServiceImpl implements RestaurantService{

    private final RestaurantRepository restaurantRepository;

    @Autowired
    public RestaurantServiceImpl(RestaurantRepository restaurantRepository) {

        this.restaurantRepository = restaurantRepository;
    }

    @Override
    public List<String> getAllLocations() {
        return restaurantRepository.getAllLocations();
    }

    @Override
    public void save(Restaurant restaurant) {
        try {
            restaurantRepository.save(restaurant);
        }catch (Exception e){
            e.getMessage();
        }
    }

    @Override
    public List<RestaurantDisplay> getRestaurantsByLocation(String location) {
        List<Restaurant> restaurants = restaurantRepository.findByLocation(location);
        List<RestaurantDisplay> restaurantInfos = new ArrayList<>();

        for (Restaurant r : restaurants) {
            List<Review> reviews = r.getReviews();
            int numReviews = reviews != null ? reviews.size() : 0;
            double sumRating = 0.0;
            double sumFoodQualityRating = 0.0;
            double sumAmbianceRating = 0.0;
            double sumServiceQualityRating = 0.0;
            double sumCleanlinessRating = 0.0;
            double sumSpeedOfServiceRating = 0.0;
            double sumValueForMoneyRating = 0.0;

            if (reviews != null && !reviews.isEmpty()) {
                for (Review rev : reviews) {
                    sumRating += rev.getRating();
                    sumFoodQualityRating += rev.getFoodQualityRating();
                    sumAmbianceRating += rev.getAmbianceRating();
                    sumServiceQualityRating += rev.getServiceQualityRating();
                    sumCleanlinessRating += rev.getCleanlinessRating();
                    sumSpeedOfServiceRating += rev.getSpeedOfServiceRating();
                    sumValueForMoneyRating += rev.getValueForMoneyRating();

                    // Set the restaurant to null to avoid cyclic loops
                    rev.setRestaurant(null);
                }
            }

            // Calculate the average ratings
            double averageRating = numReviews > 0 ? sumRating / numReviews : 0.0;
            double averageFoodQualityRating = numReviews > 0 ? sumFoodQualityRating / numReviews : 0.0;
            double averageAmbianceRating = numReviews > 0 ? sumAmbianceRating / numReviews : 0.0;
            double averageServiceQualityRating = numReviews > 0 ? sumServiceQualityRating / numReviews : 0.0;
            double averageCleanlinessRating = numReviews > 0 ? sumCleanlinessRating / numReviews : 0.0;
            double averageSpeedOfServiceRating = numReviews > 0 ? sumSpeedOfServiceRating / numReviews : 0.0;
            double averageValueForMoneyRating = numReviews > 0 ? sumValueForMoneyRating / numReviews : 0.0;

            // Create a new RestaurantDisplay object for each restaurant
            RestaurantDisplay restaurantInfo = new RestaurantDisplay();
            restaurantInfo.setAverageRating(averageRating);
            restaurantInfo.setAverageFoodQualityRating(averageFoodQualityRating);
            restaurantInfo.setAverageAmbianceRating(averageAmbianceRating);
            restaurantInfo.setAverageServiceQualityRating(averageServiceQualityRating);
            restaurantInfo.setAverageCleanlinessRating(averageCleanlinessRating);
            restaurantInfo.setAverageSpeedOfServiceRating(averageSpeedOfServiceRating);
            restaurantInfo.setAverageValueForMoneyRating(averageValueForMoneyRating);
            restaurantInfo.setNumberOfReviews(numReviews);
            restaurantInfo.setRestaurant(r);
            restaurantInfos.add(restaurantInfo);
        }

        return restaurantInfos;
    }


}
