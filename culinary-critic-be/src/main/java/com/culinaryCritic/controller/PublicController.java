package com.culinaryCritic.controller;

import com.culinaryCritic.DTO.Authentification.AuthenticationDTO;
import com.culinaryCritic.DTO.Save.UserSaveDTO;
import com.culinaryCritic.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/public")
public class PublicController {

    private final UserService userService;

    @Autowired
    public PublicController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping("/register/user")
    public ResponseEntity<String> registerUser(@RequestBody UserSaveDTO userSaveDTO) {
        try {
            userService.save(userSaveDTO);
            return new ResponseEntity<>("OK", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }


    @PostMapping("/login")
    public ResponseEntity<String> authenticate(@RequestBody AuthenticationDTO user) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", userService.authenticate(user));
        String jsonResponse = "{\"message\": \"OK\"}";

        return new ResponseEntity<>(jsonResponse, headers, HttpStatus.OK);
    }
}
