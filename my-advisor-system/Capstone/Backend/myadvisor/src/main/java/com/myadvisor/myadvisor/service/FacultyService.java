package com.myadvisor.myadvisor.service;

import com.myadvisor.myadvisor.model.Faculty;

import java.util.List;

public interface FacultyService {
    public Faculty saveFaculty(Faculty user);
    public List<Faculty> getAllFaculties();

    public String deleteFaculty(Integer facultyID);
}
