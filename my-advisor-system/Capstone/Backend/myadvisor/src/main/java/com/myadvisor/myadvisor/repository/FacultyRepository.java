package com.myadvisor.myadvisor.repository;

import com.myadvisor.myadvisor.model.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FacultyRepository extends JpaRepository<Faculty,Integer>{
}
