package com.myadvisor.myadvisor.service;

import com.myadvisor.myadvisor.model.Majors;

import java.util.List;

public interface MajorsService {
    Majors saveMajors(Majors majors);

    // Get all majors
    List<Majors> getAllMajors();

    // Update an existing major (excluding name and ID)
    Majors updateMajors(Integer majorID, Majors majorDetails);

    // Delete a major by its ID
    String deleteMajors(Integer majorID);

    Majors getMajorById(int id);
}
