package com.myadvisor.myadvisor.service;

import com.myadvisor.myadvisor.model.Advisor;
import com.myadvisor.myadvisor.model.Majors;
import com.myadvisor.myadvisor.model.User;
import com.myadvisor.myadvisor.model.AvailabilitySlot;
import com.myadvisor.myadvisor.repository.AdvisorRepository;
import com.myadvisor.myadvisor.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.NoSuchElementException;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AdvisorServiceImple implements AdvisorService {

    @Autowired
    private AdvisorRepository advisorRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public Optional<Advisor> findById(Long id) {
        return advisorRepository.findById(id);
    }

    @Override
    public Optional<Advisor> updateAvailability(Long id, List<AvailabilitySlot> availabilitySlots) {
        Optional<Advisor> advisorOptional = advisorRepository.findById(id);
        if (advisorOptional.isPresent()) {
            Advisor advisor = advisorOptional.get();

            // Clear existing slots if you're replacing them entirely
            advisor.getAvailabilitySlots().clear();

            // Set the advisor for each new slot
            for (AvailabilitySlot slot : availabilitySlots) {
                slot.setAdvisor(advisor); // Associate each slot with the advisor
                advisor.getAvailabilitySlots().add(slot); // Add to the advisor's list
            }

            advisorRepository.save(advisor); // Persist the changes
            return Optional.of(advisor);
        }
        return Optional.empty();
    }

    @Override
    public Advisor addAdvisor(Advisor advisor) {
        return advisorRepository.save(advisor);
    }

    @Override
    public List<Advisor> getAllAdvisors() {
        return advisorRepository.findAll();
    }

    @Override
    public Optional<Advisor> updateVenue(Long id, String venue) {
        Optional<Advisor> advisorOptional = advisorRepository.findById(id);
        if (advisorOptional.isPresent()) {
            Advisor advisor = advisorOptional.get();
            advisor.setVenue(venue);  // Assuming there is a venue field in the Advisor entity
            advisorRepository.save(advisor);
            return Optional.of(advisor);
        }
        return Optional.empty();
    }

    @Override
    public List<Majors> getMajorsByAdvisorId(Long advisorId) {
        // Fetch the advisor from the repository by ID
        Advisor advisor = advisorRepository.findById(advisorId)
                .orElseThrow(() -> new NoSuchElementException("Advisor not found with id: " + advisorId));

        // Return the set of majors
        return advisor.getMajors();
    }

    public String getAdvisorFullName(String campusID) {
        // Find the advisor using campusID
        Advisor advisor = advisorRepository.findBypeoplesoftId(campusID);

        if (advisor != null) {
            // Fetch the associated User entity using campusID
            User user = userRepository.findBypeoplesoftID(campusID);

            if (user != null) {
                // Return the full name of the advisor
                return user.getName() + " " + user.getSurname();
            } else {
                return "User not found";
            }
        } else {
            return "Advisor not found";
        }

    }
    public List<String> getAllAdvisorFullNames() {
        List<User> users = userRepository.findAll(); // Retrieve all users (advisors)
        return users.stream()
                .map(user -> getAdvisorFullName(user.getPeoplesoftID())) // Map to full names
                .collect(Collectors.toList());
    }


}

