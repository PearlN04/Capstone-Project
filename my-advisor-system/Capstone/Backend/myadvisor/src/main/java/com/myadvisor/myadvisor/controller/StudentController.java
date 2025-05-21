package com.myadvisor.myadvisor.controller;

import com.myadvisor.myadvisor.model.Student;
import com.myadvisor.myadvisor.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody Student student) {
        if (studentService.getStudentRepository().existsByEmail(student.getEmail())) {
            return new ResponseEntity<>("Email already exists", HttpStatus.BAD_REQUEST);
        }
        studentService.registerStudent(student);
        return new ResponseEntity<>("Student registered successfully!", HttpStatus.CREATED);
    }
}

