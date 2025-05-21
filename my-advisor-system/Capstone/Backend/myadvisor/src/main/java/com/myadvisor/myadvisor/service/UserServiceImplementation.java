package com.myadvisor.myadvisor.service;

import com.myadvisor.myadvisor.model.Student;
import com.myadvisor.myadvisor.model.User;
import com.myadvisor.myadvisor.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImplementation implements UserService{
    @Autowired
    private UserRepository userRepository;
    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public String deleteUser(String peoplesoftID){
        userRepository.deleteByPeoplesoftID(peoplesoftID);
        return "User removed";
    }

    @Override
    public User login(String email, String password) throws Exception {
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            if (password.equals(user.getPassword())) {
                return user;
            } else {
                throw new Exception("Invalid username or password");
            }
        } else {
            throw new Exception("Invalid username or password");
        }
    }


}
