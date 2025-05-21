package com.myadvisor.myadvisor.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

import java.util.List;

//import java.util.List;

@Entity
public class Majors {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int majorID;
    @Column(name = "majorName", nullable = false)
    private String majorName;
    @Column(name = "totalCredits", nullable = false)
    private int totalCredits;
    @Column(name = "totalCourses", nullable = false)
    private int totalCourses;
    @Column(name = "requiredCourses", nullable = false)
    private List<String> requiredCourses;
    @Column(name = "commonElectives", nullable = false)
    private List<String> commonElectives;

    @ManyToMany(mappedBy = "majors", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JsonBackReference
    private List<Advisor> advisors;

    public Majors(int majorID,String majorName,int totalCourses,int totalCredits,List<String>requiredCourses, List<String> commonElectives, List<Advisor> advisors) {

        this.majorID = majorID;
        this.majorName = majorName;
        this.totalCourses=totalCourses;
        this.totalCredits=totalCredits;
        this.requiredCourses=requiredCourses;
        this.commonElectives=commonElectives;
        this.advisors=advisors;
    }

    public Majors(){};

    public int getMajorID() {
        return majorID;
    }

    public void setMajorID(int majorID) {
        this.majorID = majorID;
    }

    public String getMajorName() {
        return majorName;
    }

    public void setMajorName(String majorName) {
        this.majorName = majorName;
    }

    public List<String> getRequiredCourses() {
        return requiredCourses;
    }

    public void setRequiredCourses(List<String> requiredCourses) {
        this.requiredCourses = requiredCourses;
    }

    public int getTotalCredits() {
        return totalCredits;
    }

    public void setTotalCredits(int totalCredits) {
        this.totalCredits = totalCredits;
    }

    public int getTotalCourses() {
        return totalCourses;
    }

    public void setTotalCourses(int totalCourses) {
        this.totalCourses = totalCourses;
    }

    public List<String> getCommonElectives() {
        return commonElectives;
    }

    public void setCommonElectives(List<String> commonElectives) {
        this.commonElectives = commonElectives;
    }

    public List<Advisor> getAdvisors() {
        return advisors;
    }

    public void setAdvisors(List<Advisor> advisors) {
        this.advisors = advisors;
    }
}
