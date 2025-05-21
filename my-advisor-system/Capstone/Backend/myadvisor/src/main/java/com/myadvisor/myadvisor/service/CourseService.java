package com.myadvisor.myadvisor.service;

import com.myadvisor.myadvisor.model.Course;
import java.util.List;
import java.util.Optional;

public interface CourseService {

    // Add a new course
    Course addCourse(Course course);

    // Find a course by its code
    Optional<Course> getCourseByCode(String courseCode);

    // Edit course details
    Course updateCourse(String courseCode, Course course);

    // Delete a course by its code
    void deleteCourse(String courseCode);

    // Get all courses
    List<Course> getAllCourses();
}

