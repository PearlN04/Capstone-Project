package com.myadvisor.myadvisor.controller;

import com.myadvisor.myadvisor.model.Course;
import com.myadvisor.myadvisor.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:3000")
public class CourseController {

    private final CourseService courseService;

    @Autowired
    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @PostMapping("/add")
    public ResponseEntity<Course> addCourse(@RequestBody Course course) {
        try {
            Course newCourse = courseService.addCourse(course);
            return new ResponseEntity<>(newCourse, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{courseCode}")
    public ResponseEntity<Course> getCourseByCode(@PathVariable String courseCode) {
        Optional<Course> course = courseService.getCourseByCode(courseCode);
        return course.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // update course details
    @PutMapping("/{courseCode}")
    public ResponseEntity<Course> updateCourse(@PathVariable String courseCode, @RequestBody Course course) {
        try {
            Course updatedCourse = courseService.updateCourse(courseCode, course);
            return new ResponseEntity<>(updatedCourse, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // delete a course by course code
    @DeleteMapping("/{courseCode}")
    public ResponseEntity<HttpStatus> deleteCourse(@PathVariable String courseCode) {
        try {
            courseService.deleteCourse(courseCode);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // get all courses
    @GetMapping("/all")
    public ResponseEntity<List<Course>> getAllCourses() {
        List<Course> courses = courseService.getAllCourses();
        return new ResponseEntity<>(courses, HttpStatus.OK);
    }
}
