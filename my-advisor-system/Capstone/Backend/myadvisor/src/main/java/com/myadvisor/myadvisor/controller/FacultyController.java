package com.myadvisor.myadvisor.controller;

import com.myadvisor.myadvisor.model.Faculty;
import com.myadvisor.myadvisor.service.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/faculty")
@CrossOrigin
public class FacultyController {

        @Autowired
        private FacultyService facultyService;

        @PostMapping("/add")
        public String add(@RequestBody Faculty faculty){
            facultyService.saveFaculty(faculty);
            return "A new faculty has been added";
        }

        @GetMapping("/getAll")
        public List<Faculty> getAllFaculties(){
            return facultyService.getAllFaculties();
        }

        @DeleteMapping("/delete/{facultyID}")
        public String deleteFaculty(@PathVariable Integer facultyID){
            return facultyService.deleteFaculty(facultyID);
        }
    }

