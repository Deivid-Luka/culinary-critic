package com.culinaryCritic.service;

import com.culinaryCritic.DTO.Authentification.AuthenticationDTO;
import com.culinaryCritic.DTO.Save.UserSaveDTO;
import com.culinaryCritic.DTO.SimpleUserDTO;


public interface UserService {

     void save(UserSaveDTO userSaveDTO) throws Exception;

    String authenticate(AuthenticationDTO authenticationDto);

    SimpleUserDTO getUserByUsername(String username);
}
