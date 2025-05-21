package com.myadvisor.myadvisor.repository;

import com.myadvisor.myadvisor.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    // Method to find appointments by Employee ID
    List<Appointment> findByEmployeeId(Long employeeId);
}