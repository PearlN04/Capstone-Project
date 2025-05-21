package com.myadvisor.myadvisor.repository;

import com.myadvisor.myadvisor.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, String> {
    // Find a course by its course code
    Optional<Course> findByCourseCode(String courseCode);

    // Check if a course exists by its course code
    boolean existsByCourseCode(String courseCode);
}
