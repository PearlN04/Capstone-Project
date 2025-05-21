package com.myadvisor.myadvisor.controller;

import com.myadvisor.myadvisor.model.User;
import com.myadvisor.myadvisor.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3002")
public class AuthController {

    @Autowired
    private UserService userService; // Inject UserService here

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest loginRequest) {
        try {
            // Use the injected userService to call login method
            User user = userService.login(loginRequest.getEmail(), loginRequest.getPassword());

            Map<String, String> response = new HashMap<>();
            response.put("message", "Login successful! Redirecting to dashboard...");
            response.put("role", user.getRole()); // Assuming the User class has a getRole() method

            return ResponseEntity.ok(response);
            // If login is successful, return a success message
            //return "Login successful! Redirecting to dashboard...";
        } catch (Exception e) {
            // If login fails, return the error message
            //return "Login failed: " + e.getMessage();
            Map<String, String> response = new HashMap<>();
            response.put("message", "Login failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
}

// Login Request DTO
class LoginRequest {
    private String email;
    private String password;
    private String role;

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    // Getters and Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {  // Fix method name
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
