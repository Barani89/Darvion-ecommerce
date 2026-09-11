package com.darvion.ecommerce.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.darvion.ecommerce.entity.User;
import com.darvion.ecommerce.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(User user) {

        user.setRole("USER");

        user.setPassword(
            passwordEncoder.encode(user.getPassword())
        );

        return userRepository.save(user);
    }

    public boolean loginUser(String email, String password) {

    User user = userRepository.findByEmail(email);

    if (user == null) {
        return false;
    }

    return passwordEncoder.matches(password, user.getPassword());
}

public User getUserByEmail(String email) {
    return userRepository.findByEmail(email);
}
}