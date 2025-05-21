package com.myadvisor.myadvisor.service;

import com.myadvisor.myadvisor.model.Faculty;
import com.myadvisor.myadvisor.repository.FacultyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacultyServiceImplementation implements FacultyService{
        @Autowired
        private FacultyRepository facultyRepository;
        @Override
        public Faculty saveFaculty(Faculty faculty) {
            return facultyRepository.save(faculty);
        }

        @Override
        public List<Faculty> getAllFaculties() {
            return facultyRepository.findAll();
        }

        @Override
        public String deleteFaculty(Integer facultyID){
            facultyRepository.deleteById(facultyID);
            return "Faculty removed";
        }
}
