package com.myadvisor.myadvisor.controller;

import com.myadvisor.myadvisor.model.Message;
import com.myadvisor.myadvisor.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @PostMapping
    public ResponseEntity<Message> sendMessage(
            @RequestParam Long senderId,
            @RequestParam Long receiverId,
            @RequestParam Long appointmentId,
            @RequestBody String content) {
        Message message = messageService.sendMessage(senderId, receiverId, appointmentId, content);
        return ResponseEntity.ok(message);
    }

    @GetMapping("/appointment/{appointmentId}")
    public ResponseEntity<List<Message>> getMessagesByAppointmentId(@PathVariable Long appointmentId) {
        List<Message> messages = messageService.getMessagesByAppointmentId(appointmentId);
        return ResponseEntity.ok(messages);
    }
}

