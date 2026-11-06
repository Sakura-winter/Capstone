package com.skillsync.service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ResumeParserService {

    private static final List<String> COMMON_SKILLS = Arrays.asList(
            "Java", "Spring Boot", "Python", "Machine Learning", "Deep Learning",
            "NLP", "Natural Language Processing", "SQL", "PostgreSQL", "MySQL",
            "Docker", "Kubernetes", "Git", "REST API", "Microservices",
            "Android", "Kotlin", "React", "Angular", "JavaScript", "TypeScript",
            "C++", "C#", "AWS", "Azure", "GCP", "PyTorch", "TensorFlow",
            "Pandas", "NumPy", "Data Analysis", "Project Management", "Agile",
            "Scrum", "CI/CD", "HTML", "CSS", "Linux", "DevOps", "Hibernate"
    );

    public String extractText(MultipartFile file) {
        String filename = file.getOriginalFilename() != null ? file.getOriginalFilename().toLowerCase() : "";
        try {
            if (filename.endsWith(".pdf")) {
                try (InputStream is = file.getInputStream();
                     PDDocument document = PDDocument.load(is)) {
                    PDFTextStripper stripper = new PDFTextStripper();
                    return stripper.getText(document);
                }
            } else if (filename.endsWith(".docx")) {
                try (InputStream is = file.getInputStream();
                     org.apache.poi.xwpf.usermodel.XWPFDocument docx = new org.apache.poi.xwpf.usermodel.XWPFDocument(is);
                     org.apache.poi.xwpf.extractor.XWPFWordExtractor extractor = new org.apache.poi.xwpf.extractor.XWPFWordExtractor(docx)) {
                    return extractor.getText();
                }
            } else {
                // Read as plain text or UTF-8 string
                return new String(file.getBytes());
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to extract text from file: " + e.getMessage(), e);
        }
    }

    /**
     * Pre-Processing Phase: PII Anonymization & Demographic entity scrubbing
     * Compliant with ISO/IEC 42001 and IndiaAI Safety Framework
     */
    public String anonymizePII(String text) {
        if (text == null) return "";

        // Scrub Email addresses
        String sanitized = text.replaceAll("(?i)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}", "[REDACTED_EMAIL]");

        // Scrub Phone Numbers (10 digits with optional +91, dashes, spaces)
        sanitized = sanitized.replaceAll("(\\+?\\d{1,3}[- ]?)?\\b\\d{10}\\b", "[REDACTED_PHONE]");

        // Scrub typical social/URL links (LinkedIn, GitHub)
        sanitized = sanitized.replaceAll("(?i)https?://[\\w./%-]+", "[REDACTED_URL]");

        // Scrub specific gender indicators
        sanitized = sanitized.replaceAll("(?i)\\b(male|female|he/him|she/her|mr\\.|mrs\\.|ms\\.)\\b", "[REDACTED_DEMOGRAPHIC]");

        // Scrub common college tier markers / names
        sanitized = sanitized.replaceAll("(?i)\\b(IIT|NIT|BITS|IIIT|Tier-1|Tier-2|Tier-3|Polytechnic|ITI)\\b", "[REDACTED_INSTITUTE]");

        return sanitized;
    }

    /**
     * Skill Entity Extraction
     */
    public Set<String> extractSkills(String text) {
        Set<String> detectedSkills = new TreeSet<>(String.CASE_INSENSITIVE_ORDER);
        if (text == null || text.isBlank()) return detectedSkills;

        String lowerText = text.toLowerCase();
        for (String skill : COMMON_SKILLS) {
            // Match skill bounded by non-word characters
            Pattern pattern = Pattern.compile("\\b" + Pattern.quote(skill.toLowerCase()) + "\\b");
            if (pattern.matcher(lowerText).find()) {
                detectedSkills.add(skill);
            }
        }
        return detectedSkills;
    }

    /**
     * Estimate Years of Experience from resume text
     */
    public Double estimateExperienceYears(String text) {
        if (text == null) return 0.0;
        Pattern pattern = Pattern.compile("(\\d+(\\.\\d+)?)\\+?\\s*(years?|yrs?)\\s*(of)?\\s*(experience|exp)?", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(text);
        double maxExp = 0.0;
        while (matcher.find()) {
            try {
                double val = Double.parseDouble(matcher.group(1));
                if (val > maxExp && val < 50) {
                    maxExp = val;
                }
            } catch (Exception ignored) {}
        }
        return maxExp;
    }
}

