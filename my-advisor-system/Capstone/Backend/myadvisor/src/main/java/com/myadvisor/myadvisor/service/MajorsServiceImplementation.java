package com.myadvisor.myadvisor.service;

import com.myadvisor.myadvisor.model.Majors;
import com.myadvisor.myadvisor.repository.MajorsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.NoSuchElementException;

import java.util.List;
import java.util.Optional;

@Service
public class MajorsServiceImplementation implements MajorsService{
    @Autowired
    private MajorsRepository majorsRepository;
    @Override
    public Majors saveMajors(Majors majors) {
        return majorsRepository.save(majors);
    }

    @Override
    public List<Majors> getAllMajors() {
        return majorsRepository.findAll();
    }

    @Override
    public String deleteMajors(Integer majorsID){
        majorsRepository.deleteById(majorsID);
        return "Major removed";
    }

    @Override
    public Majors getMajorById(int id) {
        Optional<Majors> major = majorsRepository.findById(id);
        return major.orElse(null);
    }

    @Override
    public Majors updateMajors(Integer majorID, Majors majorDetails) {
        Optional<Majors> existingMajor = majorsRepository.findById(majorID);

        if (existingMajor.isPresent()) {
            Majors major = existingMajor.get();
            if (majorDetails.getMajorName()!= null) {
                major.setMajorName(majorDetails.getMajorName());
            }
            return majorsRepository.save(major);
        } else {
            throw new NoSuchElementException("Major not found with ID: " + majorID);
        }
    }

}

