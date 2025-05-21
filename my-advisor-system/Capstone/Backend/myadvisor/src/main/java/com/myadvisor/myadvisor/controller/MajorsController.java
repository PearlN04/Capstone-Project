package com.myadvisor.myadvisor.controller;

import com.myadvisor.myadvisor.model.Majors;
import com.myadvisor.myadvisor.service.MajorsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/majors")
@CrossOrigin(origins = "http://localhost:3000")
public class MajorsController {

    @Autowired
    private MajorsService majorsService;

    // Add a new major
    @PostMapping
    public ResponseEntity<Majors> addMajor(@RequestBody Majors majors) {
        Majors newMajor = majorsService.saveMajors(majors);
        return new ResponseEntity<>(newMajor, HttpStatus.CREATED);
    }

    // Get all majors
    @GetMapping("/getAll")
    public ResponseEntity<List<Majors>> getAllMajors() {
        List<Majors> majorsList = majorsService.getAllMajors();
        return ResponseEntity.ok(majorsList);
    }

    // Update an existing major
    @PutMapping("/{majorID}")
    public ResponseEntity<Majors> updateMajor(
            @PathVariable Integer majorID,
            @RequestBody Majors majorDetails) {
        Majors updatedMajor = majorsService.updateMajors(majorID, majorDetails);
        return ResponseEntity.ok(updatedMajor);
    }

    @GetMapping("/getMajor/{id}")
    public Majors getMajorById(@PathVariable int id) {
        return majorsService.getMajorById(id);
    }

    // Delete a major
    @DeleteMapping("/{majorID}")
    public ResponseEntity<String> deleteMajor(@PathVariable Integer majorID) {
        String responseMessage = majorsService.deleteMajors(majorID);
        return ResponseEntity.ok(responseMessage);
    }
}
