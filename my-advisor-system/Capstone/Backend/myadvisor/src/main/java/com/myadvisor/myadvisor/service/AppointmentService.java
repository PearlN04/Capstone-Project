package com.myadvisor.myadvisor.service;

import com.myadvisor.myadvisor.model.Appointment;

import java.util.List;
import java.util.Optional;

public interface AppointmentService {
    List<Appointment> getAppointmentsByEmployeeId(Long employeeId);
    Optional<Appointment> getAppointmentById(Long id);
    Appointment updateAppointment(Long id, Appointment updatedAppointment);
    Appointment createAppointment(Appointment newAppointment);
    public void cancelAppointmentById(Long id);
    List<Appointment> getAllAppointments();
}
