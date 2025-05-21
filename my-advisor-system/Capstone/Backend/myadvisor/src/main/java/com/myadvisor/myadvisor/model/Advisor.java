package com.myadvisor.myadvisor.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;
import java.util.List;

@Entity
@Table(name = "advisors")
public class Advisor {
    //primary key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "peoplesoft_id", nullable = false, unique = true)
    private String peoplesoftId;

    @Column(name = "department", nullable = false)
    private String department;

    @Column(name = "faculty", nullable = false)
    private String faculty;

    @Column(name = "venue", nullable = false)
    private String venue;

    @Column(name = "type", nullable = false)
    private String type; // Can be Senior Advisor or Advisor

    @OneToMany(mappedBy = "advisor", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("advisor-availabilitySlots")
    private List<AvailabilitySlot> availabilitySlots ;

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "advisor_majors",
            joinColumns = @JoinColumn(name = "advisor_id"),
            inverseJoinColumns = @JoinColumn(name = "major_id")
    )
    @JsonManagedReference
    private List<Majors> majors;



    //constructor
    public Advisor(String peoplesoft_id, String department, String faculty, String venue, String type, List<AvailabilitySlot> availabilitySlots, List<Majors> majors) {
        this.peoplesoftId = peoplesoft_id;
        this.department = department;
        this.faculty = faculty;
        this.venue = venue;
        this.type = type;
        this.availabilitySlots = availabilitySlots;
        this.majors = majors;
    }

    public Advisor(){}
    
    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmployeeId() {
        return peoplesoftId;
    }

    public void setEmployeeId(String peoplesoft_id) {
        this.peoplesoftId = peoplesoft_id;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getFaculty() {
        return faculty;
    }

    public void setFaculty(String faculty) {
        this.faculty = faculty;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<AvailabilitySlot> getAvailabilitySlots() {
        return availabilitySlots;
    }

    public void setAvailabilitySlots(List<AvailabilitySlot> availabilitySlots) {
        this.availabilitySlots = availabilitySlots;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public List<Majors> getMajors() {
        return majors;
    }

    public void setMajors(List<Majors> majors) {
        this.majors = majors;
    }
}


