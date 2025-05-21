package com.myadvisor.myadvisor.service;

import com.myadvisor.myadvisor.model.Appointment;
import com.myadvisor.myadvisor.model.Message;
import com.myadvisor.myadvisor.repository.AppointmentRepository;
import com.myadvisor.myadvisor.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    public Message sendMessage(Long senderId, Long receiverId, Long appointmentId, String content) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        Message message = new Message(senderId, receiverId, appointment, content, LocalDateTime.now());
        appointment.getMessages().add(message);

        return message;
    }

    public List<Message> getMessagesByAppointmentId(Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        return appointment.getMessages();
    }
}

