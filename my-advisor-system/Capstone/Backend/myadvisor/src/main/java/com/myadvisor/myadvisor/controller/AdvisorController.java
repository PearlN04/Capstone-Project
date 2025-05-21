package com.myadvisor.myadvisor.controller;

import com.myadvisor.myadvisor.model.Advisor;
import com.myadvisor.myadvisor.model.Majors;
import com.myadvisor.myadvisor.model.AvailabilitySlot;
import com.myadvisor.myadvisor.service.AdvisorService;
import com.myadvisor.myadvisor.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("api/advisors")
@CrossOrigin(origins = "http://localhost:3000")
public class AdvisorController {

    @Autowired
    private AdvisorService advisorService;
    private UserService userService;


    @GetMapping("/{id}")
    public ResponseEntity<Advisor> getAdvisorById(@PathVariable Long id) {
        Optional<Advisor> advisor = advisorService.findById(id);
        return advisor.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update advisor availability
    @PutMapping("/{id}/availability")
    public ResponseEntity<Advisor> updateAdvisorAvailability(@PathVariable Long id, @RequestBody List<AvailabilitySlot> availabilitySlots) {
        Optional<Advisor> updatedAdvisor = advisorService.updateAvailability(id, availabilitySlots);
        return updatedAdvisor.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{advisorId}/majors")
    public List<Majors> getMajorsByAdvisorId(@PathVariable Long advisorId) {
        return advisorService.getMajorsByAdvisorId(advisorId);
    }

    // Update meeting venue
    @PutMapping("/{id}/venue")
    public ResponseEntity<Advisor> updateAdvisorVenue(@PathVariable Long id, @RequestBody String venue) {
        Optional<Advisor> updatedAdvisor = advisorService.updateVenue(id, venue);
        return updatedAdvisor.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public Advisor addAdvisor(@RequestBody Advisor advisor) {
        return advisorService.addAdvisor(advisor);
    }

    @GetMapping("/getAll")
    public List<Advisor> getAllAdvisors(){
        return advisorService.getAllAdvisors();
    }

    @GetMapping("/getName")
    public List<String> getAllAdvisorFullNames(){
        return advisorService.getAllAdvisorFullNames();
    }
    public String getAdvisorFullName(@RequestBody String peoplesoft_id) {
        return advisorService.getAdvisorFullName(peoplesoft_id);
    }


}
