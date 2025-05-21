package com.myadvisor.myadvisor.service;

import com.myadvisor.myadvisor.model.Appointment;
import com.myadvisor.myadvisor.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentServiceImple implements AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Override
    public List<Appointment> getAppointmentsByEmployeeId(Long employeeId) {
        return appointmentRepository.findByEmployeeId(employeeId);
    }

    @Override
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    @Override
    public Optional<Appointment> getAppointmentById(Long id) {
        return appointmentRepository.findById(id);
    }

    @Override
    public Appointment createAppointment(Appointment newAppointment) {
        return appointmentRepository.save(newAppointment);
    }

    public void cancelAppointmentById(Long id) {
        Optional<Appointment> appointmentOptional = appointmentRepository.findById(id);
        if (appointmentOptional.isPresent()) {
            Appointment appointment = appointmentOptional.get();
            appointment.setStatus("Cancelled"); // Change status to 'Cancelled'
            appointmentRepository.save(appointment);
        } else {
            throw new RuntimeException("Appointment not found");
        }
    }

    @Override
    public Appointment updateAppointment(Long id, Appointment updatedAppointment) {
        Optional<Appointment> existingAppointment = appointmentRepository.findById(id);
        if (existingAppointment.isPresent()) {
            Appointment appointment = existingAppointment.get();
            appointment.setDateTime(updatedAppointment.getDateTime());
            appointment.setVenue(updatedAppointment.getVenue());
            appointment.setMessages(updatedAppointment.getMessages());
            appointment.setNote(updatedAppointment.getNote());
            appointment.setStatus(updatedAppointment.getStatus());
            return appointmentRepository.save(appointment);
        } else {
            throw new RuntimeException("Appointment not found");
        }
    }
}
