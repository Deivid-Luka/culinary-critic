package com.culinaryCritic.service;

import com.culinaryCritic.entity.Restaurant;

import java.util.List;

public interface RestaurantService {

    List<String> getAllLocations();

    void save(Restaurant restaurant);

    List<Restaurant> getRestaurantsByLocation(String location);

}
