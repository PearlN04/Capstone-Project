package com.myadvisor.myadvisor.repository;

import com.myadvisor.myadvisor.model.Majors;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MajorsRepository extends JpaRepository<Majors,Integer> {
}
