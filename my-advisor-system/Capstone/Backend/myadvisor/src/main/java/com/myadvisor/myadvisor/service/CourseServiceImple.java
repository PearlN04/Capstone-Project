package com.myadvisor.myadvisor.service;

import com.myadvisor.myadvisor.model.Course;
import com.myadvisor.myadvisor.repository.CourseRepository;
import com.myadvisor.myadvisor.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseServiceImple implements CourseService {

    private final CourseRepository courseRepository;

    @Autowired
    public CourseServiceImple(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @Override
    public Course addCourse(Course course) {
        // Add a new course
        if (!courseRepository.existsByCourseCode(course.getCourseCode())) {
            return courseRepository.save(course);
        } else {
            throw new IllegalArgumentException("Course with this code already exists");
        }
    }

    @Override
    public Optional<Course> getCourseByCode(String courseCode) {
        // Find course by course code
        return courseRepository.findByCourseCode(courseCode);
    }

    @Override
    public Course updateCourse(String courseCode, Course updatedCourse) {
        // Update course details
        return courseRepository.findByCourseCode(courseCode)
                .map(existingCourse -> {
                    existingCourse.setCourseName(updatedCourse.getCourseName());
                    existingCourse.setCredits(updatedCourse.getCredits());
                    existingCourse.setEquivalentCourses(updatedCourse.getEquivalentCourses());
                    existingCourse.setPrerequisiteCourses(updatedCourse.getPrerequisiteCourses());
                    existingCourse.setFaculty(updatedCourse.getFaculty());
                    return courseRepository.save(existingCourse);
                })
                .orElseThrow(() -> new IllegalArgumentException("Course not found"));
    }

    @Override
    public void deleteCourse(String courseCode) {
        // Delete course by course code
        if (courseRepository.existsByCourseCode(courseCode)) {
            courseRepository.deleteById(courseCode);
        } else {
            throw new IllegalArgumentException("Course not found");
        }
    }

    @Override
    public List<Course> getAllCourses() {
        // Get all courses
        return courseRepository.findAll();
    }
}

