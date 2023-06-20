package com.culinaryCritic.service;

import com.culinaryCritic.DTO.Authentification.AuthenticationDTO;
import com.culinaryCritic.DTO.Save.UserSaveDTO;


public interface UserService {

     void save(UserSaveDTO userSaveDTO) throws Exception;


    String authenticate(AuthenticationDTO authenticationDto);

}
