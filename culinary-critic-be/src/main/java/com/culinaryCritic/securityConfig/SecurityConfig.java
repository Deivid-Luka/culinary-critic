package com.culinaryCritic.securityConfig;

import com.culinaryCritic.securityConfig.filter.JWTTokenValidatorFilter;
import com.culinaryCritic.securityConfig.filter.AuthoritiesLoggingAfterFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Collections;
import java.util.List;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.csrf(AbstractHttpConfigurer::disable);
        http.cors((cors) -> cors.configurationSource(request -> {
            CorsConfiguration config = new CorsConfiguration();
            config.setAllowedOrigins(Collections.singletonList("http://localhost:4200"));
            config.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
            config.setAllowedOrigins(Collections.singletonList("http://dermolife.adevg.com/"));
            config.setAllowedMethods(Collections.singletonList("*"));
            config.setAllowCredentials(true);
            config.setAllowedHeaders(Collections.singletonList("*"));
            config.setExposedHeaders(List.of("Authorization"));
            config.setMaxAge(3600L);
            return config;
        }));
        http.addFilterAfter(new AuthoritiesLoggingAfterFilter(), BasicAuthenticationFilter.class);
        http.addFilterBefore(new JWTTokenValidatorFilter(), BasicAuthenticationFilter.class);
        http.authorizeHttpRequests((authz) -> authz
                .requestMatchers("/home/**").hasRole("ADMIN")
                .requestMatchers("/user/**").hasRole("USER")
                .requestMatchers("/doctor/**").hasRole("DOCTOR")
                .requestMatchers("/staff/**").hasRole("STAFF")
                .requestMatchers("/public/**").permitAll()
                .anyRequest().authenticated());


        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
