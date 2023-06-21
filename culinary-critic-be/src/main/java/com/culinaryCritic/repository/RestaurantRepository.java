package com.culinaryCritic.repository;

import com.culinaryCritic.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    @Query("SELECT DISTINCT r.location FROM Restaurant r")
    List<String> getAllLocations();

    List<Restaurant> findByLocation(String location);

}

