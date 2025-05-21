package com.myadvisor.myadvisor.controller;

import com.myadvisor.myadvisor.model.Appointment;
import com.myadvisor.myadvisor.repository.AppointmentRepository;
import com.myadvisor.myadvisor.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:3000")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @GetMapping("/advisor/{employeeId}")
    public List<Appointment> getAppointmentsByEmployeeId(@PathVariable Long employeeId) {
        return appointmentService.getAppointmentsByEmployeeId(employeeId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long id) {
        Optional<Appointment> appointment = appointmentService.getAppointmentById(id);
        return appointment.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Appointment> updateAppointment(@PathVariable Long id, @RequestBody Appointment updatedAppointment) {
        try {
            Appointment appointment = appointmentService.updateAppointment(id, updatedAppointment);
            return ResponseEntity.ok(appointment);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Appointment> createAppointment(@RequestBody Appointment newAppointment) {
        Appointment appointment = appointmentService.createAppointment(newAppointment);
        return ResponseEntity.status(HttpStatus.CREATED).body(appointment);

    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<String> cancelAppointment(@PathVariable Long id) {
        try {
            appointmentService.cancelAppointmentById(id);
            return new ResponseEntity<>("Appointment cancelled successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error cancelling appointment", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}