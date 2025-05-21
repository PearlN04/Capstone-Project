package com.myadvisor.myadvisor.repository;

import com.myadvisor.myadvisor.model.Student;
import com.myadvisor.myadvisor.model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    @Transactional
    @Modifying
    @Query("DELETE FROM User u WHERE u.peoplesoftID = :peoplesoftID")
    void deleteByPeoplesoftID(@Param("peoplesoftID")String peoplesoftID);
    Optional<User> findByEmail(String email);
    User findBypeoplesoftID(@Param("peoplesoft_id") String peoplesoft_id);

}