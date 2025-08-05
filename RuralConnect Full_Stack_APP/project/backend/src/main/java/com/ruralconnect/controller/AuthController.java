package com.ruralconnect.controller;

import com.ruralconnect.dto.LoginRequest;
import com.ruralconnect.dto.LoginResponse;
import com.ruralconnect.dto.SignupRequest;
import com.ruralconnect.model.User;
import com.ruralconnect.security.JwtUtil;
import com.ruralconnect.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
        try {
            if (userService.existsByEmail(signupRequest.getEmail())) {
                return ResponseEntity.badRequest()
                        .body(Map.of("message", "Email is already taken!"));
            }

            User user = new User();
            user.setName(signupRequest.getName());
            user.setEmail(signupRequest.getEmail());
            user.setPhone(signupRequest.getPhone());
            user.setAddress(signupRequest.getAddress());
            user.setPassword(signupRequest.getPassword());

            User savedUser = userService.createUser(user);

            UserDetails userDetails = userDetailsService.loadUserByUsername(savedUser.getEmail());
            String jwt = jwtUtil.generateToken(userDetails);

            return ResponseEntity.ok(new LoginResponse(jwt, savedUser));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );

            UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());
            String jwt = jwtUtil.generateToken(userDetails);

            User user = userService.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            return ResponseEntity.ok(new LoginResponse(jwt, user));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Invalid email or password"));
        }
    }
}