package com.myadvisor.myadvisor.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "courses")
public class Course {

    @Id
    @Column(name = "course_code", nullable = false, unique = true)
    private String courseCode;

    @Column(name = "course_name", nullable = false)
    private String courseName;

    @Column(name = "credits", nullable = false)
    private int credits;

    @Column(name = "equivalent_courses")
    @ElementCollection
    private List<String> equivalentCourses;

    @Column(name = "prerequisite_courses")
    @ElementCollection
    private List<String> prerequisiteCourses;


    @Column(name = "faculty", nullable = false)
    private String faculty;

    // Getters and Setters
    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public int getCredits() {
        return credits;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }

    public List<String> getEquivalentCourses() {
        return equivalentCourses;
    }

    public void setEquivalentCourses(List<String> equivalentCourses) {
        this.equivalentCourses = equivalentCourses;
    }

    public List<String> getPrerequisiteCourses() {
        return prerequisiteCourses;
    }

    public void setPrerequisiteCourses(List<String> prerequisiteCourses) {
        this.prerequisiteCourses = prerequisiteCourses;
    }

    public String getFaculty() {
        return faculty;
    }

    public void setFaculty(String faculty) {
        this.faculty = faculty;
    }
}
