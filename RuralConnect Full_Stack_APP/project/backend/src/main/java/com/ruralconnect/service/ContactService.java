package com.ruralconnect.service;

import com.ruralconnect.model.ContactMessage;
import com.ruralconnect.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    @Autowired
    private JavaMailSender mailSender;

    public ContactMessage saveContactMessage(ContactMessage contactMessage) {
        ContactMessage savedMessage = contactMessageRepository.save(contactMessage);
        
        // Send email notification
        sendEmailNotification(savedMessage);
        
        return savedMessage;
    }

    public List<ContactMessage> getAllMessages() {
        return contactMessageRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<ContactMessage> getUnreadMessages() {
        return contactMessageRepository.findByIsReadOrderByCreatedAtDesc(false);
    }

    public ContactMessage markAsRead(Long id) {
        ContactMessage message = contactMessageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Message not found"));
        message.setIsRead(true);
        return contactMessageRepository.save(message);
    }

    private void sendEmailNotification(ContactMessage contactMessage) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo("jnanasai18@gmail.com");
            message.setSubject("New Contact Message from RuralConnect - " + contactMessage.getSubject());
            message.setText(String.format(
                "New contact message received:\n\n" +
                "Name: %s\n" +
                "Email: %s\n" +
                "Phone: %s\n" +
                "Subject: %s\n\n" +
                "Message:\n%s\n\n" +
                "Sent at: %s",
                contactMessage.getName(),
                contactMessage.getEmail(),
                contactMessage.getPhone() != null ? contactMessage.getPhone() : "Not provided",
                contactMessage.getSubject(),
                contactMessage.getMessage(),
                contactMessage.getCreatedAt()
            ));
            
            mailSender.send(message);
        } catch (Exception e) {
            // Log error but don't fail the entire operation
            System.err.println("Failed to send email notification: " + e.getMessage());
        }
    }
}