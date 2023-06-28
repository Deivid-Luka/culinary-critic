package com.culinaryCritic.controller;

import com.culinaryCritic.DTO.Authentification.AuthenticationDTO;
import com.culinaryCritic.DTO.Display.RestaurantDisplay;
import com.culinaryCritic.DTO.SimpleUserDTO;
import com.culinaryCritic.entity.Restaurant;
import com.culinaryCritic.entity.Review;
import com.culinaryCritic.entity.User;
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
    public ResponseEntity<SimpleUserDTO> authenticate(@RequestBody AuthenticationDTO user) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", userService.authenticate(user));
        SimpleUserDTO simpleUserDTO = userService.getUserByUsername(user.getUsername());
        return ResponseEntity.ok().headers(headers).body(simpleUserDTO);
    }

    @GetMapping("/locations")
    public ResponseEntity<List<String>> getAllLocations() {

        return new ResponseEntity<>(restaurantService.getAllLocations(), HttpStatus.OK);
    }


    @GetMapping("/restaurants")
    public ResponseEntity<List<RestaurantDisplay>> getRestaurantsByLocation(@RequestParam("location") String location) {
        List<RestaurantDisplay> restaurants = restaurantService.getRestaurantsByLocation(location);
        return ResponseEntity.ok(restaurants);
    }


    @PostMapping("/review/{restaurantId}")
    public ResponseEntity<?> createReview(@PathVariable("restaurantId") Long restaurantId, @RequestBody Review review) {
        try {
            reviewService.saveReview(restaurantId, review);
            return new ResponseEntity<>("OK", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
