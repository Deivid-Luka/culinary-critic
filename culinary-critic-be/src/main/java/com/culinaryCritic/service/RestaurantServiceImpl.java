package com.culinaryCritic.service;

import com.culinaryCritic.entity.Restaurant;
import com.culinaryCritic.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public List<Restaurant> getRestaurantsByLocation(String location) {
        return restaurantRepository.findByLocation(location);
    }
}
