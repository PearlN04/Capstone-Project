package com.myadvisor.myadvisor.service;

import com.myadvisor.myadvisor.model.Degree;

import java.util.List;

public interface DegreeService {
    public Degree saveDegree(Degree degree);
    public List<Degree> getAllDegrees();

    public String deleteDegree(String degreename);
}
