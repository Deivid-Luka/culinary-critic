package com.culinaryCritic.controller;

import com.culinaryCritic.DTO.Authentification.AuthenticationDTO;
import com.culinaryCritic.entity.Restaurant;
import com.culinaryCritic.entity.Review;
import com.culinaryCritic.service.RestaurantService;
import com.culinaryCritic.service.ReviewService;
import com.culinaryCritic.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/public")
public class PublicController {

    private final UserService userService;

    private final RestaurantService restaurantService;

    private final ReviewService reviewService;

    @Autowired
    public PublicController(UserService userService, RestaurantService restaurantService, ReviewService reviewService) {
        this.userService = userService;
        this.restaurantService = restaurantService;
        this.reviewService = reviewService;
    }




    @PostMapping("/login")
    public ResponseEntity<String> authenticate(@RequestBody AuthenticationDTO user) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", userService.authenticate(user));
        String jsonResponse = "{\"message\": \"OK\"}";

        return new ResponseEntity<>(jsonResponse, headers, HttpStatus.OK);
    }

    @GetMapping("/locations")
    public ResponseEntity<List<String>> getAllLocations() {

        return new ResponseEntity<>(restaurantService.getAllLocations(), HttpStatus.OK);
    }

    @PostMapping("/register/restaurant")
    public ResponseEntity<String> registerRestaurant(@RequestBody Restaurant restaurant) {
        try {
            restaurantService.save(restaurant);
            return new ResponseEntity<>("OK", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/restaurants")
    public ResponseEntity<List<Restaurant>> getRestaurantsByLocation(@RequestParam("location") String location) {
        List<Restaurant> restaurants = restaurantService.getRestaurantsByLocation(location);
        return ResponseEntity.ok(restaurants);
    }


    @PostMapping("/review/{restaurantId}")
    public ResponseEntity<?> createReview(@PathVariable("restaurantId") Long restaurantId, @RequestBody Review review) {
        try {
            Review savedReview = reviewService.save(restaurantId, review);
            return ResponseEntity.ok(savedReview);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
