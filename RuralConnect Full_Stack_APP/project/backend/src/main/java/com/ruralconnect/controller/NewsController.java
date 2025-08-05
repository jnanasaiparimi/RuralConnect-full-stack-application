package com.ruralconnect.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class NewsController {

    @GetMapping("/news")
    public ResponseEntity<List<Map<String, Object>>> getNews() {
        List<Map<String, Object>> news = List.of(
            Map.of(
                "id", 1,
                "title", "New Government Scheme for Rural Development Launched",
                "summary", "The government has announced a new initiative to boost rural infrastructure and connectivity, providing better access to essential services.",
                "date", "2025-01-15",
                "category", "Government"
            ),
            Map.of(
                "id", 2,
                "title", "Organic Farming Training Programs Now Available",
                "summary", "Free training sessions on sustainable and organic farming practices for local farmers to improve crop yield and reduce environmental impact.",
                "date", "2025-01-14",
                "category", "Agriculture"
            ),
            Map.of(
                "id", 3,
                "title", "Mobile Health Clinics Expanding to Remote Villages",
                "summary", "Healthcare accessibility improved with new mobile clinic services reaching remote areas, providing basic medical care and health screenings.",
                "date", "2025-01-13",
                "category", "Healthcare"
            ),
            Map.of(
                "id", 4,
                "title", "Digital Payment Systems Gaining Popularity in Rural Areas",
                "summary", "Rural communities are increasingly adopting digital payment methods, making transactions easier and more secure for local businesses.",
                "date", "2025-01-12",
                "category", "Technology"
            ),
            Map.of(
                "id", 5,
                "title", "New Water Supply Projects Approved for 50 Villages",
                "summary", "Government approves new water supply infrastructure projects to ensure clean drinking water access for rural communities.",
                "date", "2025-01-11",
                "category", "Infrastructure"
            )
        );

        return ResponseEntity.ok(news);
    }
}