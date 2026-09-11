package com.darvion.ecommerce.controller;

import org.springframework.web.bind.annotation.*;

import com.darvion.ecommerce.entity.LoginRequest;
import com.darvion.ecommerce.entity.User;
import com.darvion.ecommerce.service.JwtService;
import com.darvion.ecommerce.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    public UserController(UserService userService,
                          JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public String loginUser(@RequestBody LoginRequest loginRequest) {

        User user = userService.getUserByEmail(
                loginRequest.getEmail()
        );

        if (user == null) {
            return "Invalid email or password";
        }

        boolean success = userService.loginUser(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );

        if (success) {
            return jwtService.generateToken(user);
        }

        return "Invalid email or password";
    }
}