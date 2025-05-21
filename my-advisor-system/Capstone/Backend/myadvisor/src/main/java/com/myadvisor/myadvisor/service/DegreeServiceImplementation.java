package com.myadvisor.myadvisor.service;

import com.myadvisor.myadvisor.model.Degree;
import com.myadvisor.myadvisor.repository.DegreeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DegreeServiceImplementation implements DegreeService{
        @Autowired
        private DegreeRepository degreeRepository;
        @Override
        public Degree saveDegree(Degree degree) {
            return degreeRepository.save(degree);
        }

        @Override
        public List<Degree> getAllDegrees() {
            return degreeRepository.findAll();
        }

        @Override
        public String deleteDegree(String degreename){
            degreeRepository.deleteById(degreename);
            return "Degree removed";
        }
}
