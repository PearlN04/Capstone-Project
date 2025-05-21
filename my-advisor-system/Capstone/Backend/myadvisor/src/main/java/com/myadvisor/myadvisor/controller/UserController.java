package com.myadvisor.myadvisor.controller;

import com.myadvisor.myadvisor.model.User;
import com.myadvisor.myadvisor.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;


import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/add")
    public String add(@RequestBody User user){
        userService.saveUser(user);
        return "New user is added";
    }

    @GetMapping("/getAll")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @DeleteMapping("/delete/{peoplesoftID}")
    public String deleteUser(@PathVariable String peoplesoftID){
        return userService.deleteUser(peoplesoftID);
    }


}

