package com.ruralconnect.controller;

import com.ruralconnect.dto.ContactRequest;
import com.ruralconnect.model.ContactMessage;
import com.ruralconnect.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @PostMapping("/contact")
    public ResponseEntity<?> submitContactForm(@Valid @RequestBody ContactRequest contactRequest) {
        try {
            ContactMessage contactMessage = new ContactMessage();
            contactMessage.setName(contactRequest.getName());
            contactMessage.setEmail(contactRequest.getEmail());
            contactMessage.setPhone(contactRequest.getPhone());
            contactMessage.setSubject(contactRequest.getSubject());
            contactMessage.setMessage(contactRequest.getMessage());

            contactService.saveContactMessage(contactMessage);

            return ResponseEntity.ok(Map.of("message", "Message sent successfully! We will get back to you soon."));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Failed to send message: " + e.getMessage()));
        }
    }
}