package com.myadvisor.myadvisor.model;

import jakarta.persistence.*;

@Entity
@Table(name = "students")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String studentNumber;

    @Column(nullable = false)
    private String names;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String peoplesoftID;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String majors;

    @Column(nullable = false)
    private String faculty;

    @Column(nullable = false)
    private String yearOfStudy;

    @Column(nullable = false)
    private String coursesPassed;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStudentNumber() {
        return studentNumber;
    }

    public void setStudentNumber(String studentNumber) {
        this.studentNumber = studentNumber;
    }

    public String getNames() {
        return names;
    }

    public void setNames(String names) {
        this.names = names;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPeoplesoftID() {
        return peoplesoftID;
    }

    public void setPeoplesoftID(String peoplesoftID) {
        this.peoplesoftID = peoplesoftID;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMajors() {
        return majors;
    }

    public void setMajors(String majors) {
        this.majors = majors;
    }

    public String getFaculty() {
        return faculty;
    }

    public void setFaculty(String faculty) {
        this.faculty = faculty;
    }

    public String getYearOfStudy() {
        return yearOfStudy;
    }

    public void setYearOfStudy(String yearOfStudy) {
        this.yearOfStudy = yearOfStudy;
    }

    public String getCoursesPassed() {
        return coursesPassed;
    }

    public void setCoursesPassed(String coursesPassed) {
        this.coursesPassed = coursesPassed;
    }
}