package com.myadvisor.myadvisor.repository;

import com.myadvisor.myadvisor.model.Degree;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DegreeRepository extends JpaRepository<Degree,String> {

}
