package com.culinaryCritic.service;
import com.culinaryCritic.DTO.Authentification.AuthenticationDTO;
import com.culinaryCritic.DTO.Save.UserSaveDTO;
import com.culinaryCritic.entity.Role;
import com.culinaryCritic.entity.User;
import com.culinaryCritic.repository.RoleRepository;
import com.culinaryCritic.repository.UserRepository;
import com.culinaryCritic.securityConfig.AuthenticationConfig;
import com.culinaryCritic.securityConfig.JWTTokenFunctions;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.management.relation.RoleNotFoundException;

@Service
public class UserServiceImpl implements UserService {

    ModelMapper modelMapper = new ModelMapper();

    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final JWTTokenFunctions jwtTokenFunctions;
    private final AuthenticationConfig authenticationConfig;

    @Autowired
    public UserServiceImpl(PasswordEncoder passwordEncoder, UserRepository userRepository, RoleRepository roleRepository, JWTTokenFunctions jwtTokenFunctions, AuthenticationConfig authenticationConfig) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.jwtTokenFunctions = jwtTokenFunctions;
        this.authenticationConfig = authenticationConfig;
    }

    @Override
    public void save(UserSaveDTO userSaveDTO) throws Exception {
        User user = modelMapper.map(userSaveDTO, User.class);
        User existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser != null) {
            throw new Exception("User already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Role role = roleRepository.findById(2L).orElseThrow(() -> new RoleNotFoundException("Role not found"));
        user.setRole(role);
        userRepository.save(user);

    }




    @Override
    public String authenticate(AuthenticationDTO user) {
        Authentication authentication = authenticationConfig.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        return jwtTokenFunctions.generateToken(authentication);
    }


}
