package com.myadvisor.myadvisor.repository;

import com.myadvisor.myadvisor.model.Advisor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


@Repository
public interface AdvisorRepository extends JpaRepository<Advisor, Long> {
    Advisor findBypeoplesoftId(@Param("peoplesoft_id") String peoplesoft_id);

}

