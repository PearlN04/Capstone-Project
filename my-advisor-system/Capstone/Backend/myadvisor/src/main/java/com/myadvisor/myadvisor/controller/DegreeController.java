package com.myadvisor.myadvisor.controller;

import com.myadvisor.myadvisor.model.Degree;
import com.myadvisor.myadvisor.service.DegreeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/degree")
@CrossOrigin(origins = "http://localhost:8080")
public class DegreeController {

        @Autowired
        private DegreeService degreeService;

        @PostMapping("/add")
        public String add(@RequestBody Degree degree){
            degreeService.saveDegree(degree);
            return "New degree has been added";
        }

        @GetMapping("/getAll")
        public List<Degree> getAllDegrees(){
            return degreeService.getAllDegrees();
        }

        @DeleteMapping("/delete/{degreename}")
        public String deleteUser(@PathVariable String degreename){
            return degreeService.deleteDegree(degreename);
        }
    }

