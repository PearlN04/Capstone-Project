package com.myadvisor.myadvisor.service;

import com.myadvisor.myadvisor.model.Advisor;
import com.myadvisor.myadvisor.model.Majors;
import com.myadvisor.myadvisor.model.AvailabilitySlot;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface AdvisorService {

    Optional<Advisor> findById(Long id);
    Optional<Advisor> updateAvailability(Long id, List<AvailabilitySlot> availabilitySlots);
    Optional<Advisor> updateVenue(Long id, String venue);
    public List<Advisor> getAllAdvisors();
    List<Majors> getMajorsByAdvisorId(Long advisorId);
    Advisor addAdvisor(Advisor advisor);
    public String getAdvisorFullName(String empid);
    public List<String> getAllAdvisorFullNames();
}
