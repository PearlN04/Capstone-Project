package com.myadvisor.myadvisor.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Degree {

    @Id
    private String degreeID;
    private String degreename;


    // Many degrees can have many courses
    @ManyToMany
    @JoinTable(
            name = "degree_course",
            joinColumns = @JoinColumn(name = "degreeID"),  // Foreign key for Degree
            inverseJoinColumns = @JoinColumn(name = "courseCode")  // Foreign key for Course
    )
    private List<Course> courses;

    public List<Course> getCourses() {
        return courses;
    }

    public void setCourses(List<Course> courses) {
        this.courses = courses;
    }

    public String getDegreeID() {
        return degreeID;
    }

    public void setDegreeID(String degreeID) {
        this.degreeID = degreeID;
    }

    private String description;
    private int duration;
    private int totalCredits;



    public int getTotalCredits() {
        return totalCredits;
    }

    public void setTotalCredits(int totalCredits) {
        this.totalCredits = totalCredits;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }


    public Degree() {
    }

    public String getDegreeName() {
        return degreename;
    }

    public void setDegreeName(String degreeName) {
        this.degreename = degreeName;
    }



    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
