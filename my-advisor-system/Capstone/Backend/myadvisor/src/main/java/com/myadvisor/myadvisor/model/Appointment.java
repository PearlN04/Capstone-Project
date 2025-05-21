package com.myadvisor.myadvisor.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;


@Entity
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long appointmentId;

    @Column(nullable = false)
    private Long employeeId;

    @Column(nullable = false)
    private String studentNumber;

    @Column(nullable = false)
    private String transcript;

    @Column(nullable = false)
    private LocalDateTime dateTime;

    @Column(nullable = false)
    private String venue;

    @OneToMany(mappedBy = "appointment", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Message> messages;

    @Lob
    private String note; // This is where the meeting minutes or notes will be stored

    @Column(nullable = false)
    private String status;

    // Constructors, getters, and setters

    public Appointment() {
    }

    public Appointment(Long employeeId, String studentNumber, LocalDateTime dateTime, String venue, String message, String note, String status, List<Message> messages, String transcript) {
        this.employeeId = employeeId;
        this.studentNumber = studentNumber;
        this.dateTime = dateTime;
        this.venue = venue;
        this.note = note;
        this.status = status;
        this.messages = messages;
        this.transcript=transcript;
    }

    public Long getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(Long appointmentId) {
        this.appointmentId = appointmentId;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public String getStudentNumber() {
        return studentNumber;
    }

    public void setStudentNumber(String studentNumber) {
        this.studentNumber = studentNumber;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    public String getTranscript(){return transcript;}

    public void setTranscript(String transcript){this.transcript=transcript;}
}
