package com.myadvisor.myadvisor.service;


import com.myadvisor.myadvisor.model.Appointment;
import com.myadvisor.myadvisor.model.User;
import jakarta.transaction.Transactional;

import java.util.List;

    public interface UserService {
        public User saveUser(User user);
        public List<User> getAllUsers();

        @Transactional
        public String deleteUser(String peoplesoftID);
        public  User login(String email, String password) throws Exception;

    }

