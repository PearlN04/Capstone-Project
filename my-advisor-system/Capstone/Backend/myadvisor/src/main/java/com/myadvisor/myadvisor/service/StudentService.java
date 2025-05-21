package com.myadvisor.myadvisor.service;

import com.myadvisor.myadvisor.model.Student;
import com.myadvisor.myadvisor.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public Student login(String email, String password) throws Exception {
        Optional<Student> optionalStudent = studentRepository.findByEmail(email);

        if (optionalStudent.isPresent()) {
            Student student = optionalStudent.get();

            if (password.equals(student.getPassword())) {
                return student;
            } else {
                throw new Exception("Invalid username or password");
            }
        } else {
            throw new Exception("Invalid username or password");
        }
    }

    public StudentRepository getStudentRepository() {
        return studentRepository;
    }

    public void registerStudent(Student student) {
        studentRepository.save(student);
    }
}
