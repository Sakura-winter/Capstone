package com.skillsync.config;

import com.skillsync.model.Candidate;
import com.skillsync.model.CurriculumRecommendation;
import com.skillsync.model.JobPosting;
import com.skillsync.repository.CandidateRepository;
import com.skillsync.repository.CurriculumRecommendationRepository;
import com.skillsync.repository.JobPostingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final CandidateRepository candidateRepo;
    private final JobPostingRepository jobRepo;
    private final CurriculumRecommendationRepository curriculumRepo;

    @Override
    public void run(String... args) {
        if (jobRepo.count() > 0) return;

        // 1. Initial Job Postings (Aligned with Maharashtra industrial ecosystem)
        JobPosting job1 = JobPosting.builder()
                .title("Full Stack Java & Cloud Engineer")
                .organization("Maharashtra Industrial Development Corporation (MIDC) Partner")
                .department("Software Engineering")
                .district("Pune")
                .requiredExperienceYears(2.0)
                .description("We are looking for an engineer proficient in Java, Spring Boot, REST API, Microservices, SQL, and Docker to build scalable applications.")
                .requiredSkills(new HashSet<>(Arrays.asList("Java", "Spring Boot", "REST API", "SQL", "Docker", "Microservices")))
                .build();

        JobPosting job2 = JobPosting.builder()
                .title("Android & Mobile Application Developer")
                .organization("SkillSync Digital Ecosystem")
                .department("Mobile Products")
                .district("Nagpur")
                .requiredExperienceYears(1.5)
                .description("Seeking Android developer with Kotlin, Java, REST API, Git, and Android SDK experience to develop citizen-facing public service mobile apps.")
                .requiredSkills(new HashSet<>(Arrays.asList("Android", "Kotlin", "Java", "REST API", "Git")))
                .build();

        jobRepo.save(job1);
        jobRepo.save(job2);

        // 2. Initial Sample Candidates (diverse demographics to demonstrate bias audit & debiasing)
        Candidate c1 = Candidate.builder()
                .fullName("Aarav Sharma")
                .email("aarav.sharma@example.com")
                .district("Pune")
                .gender("Male")
                .institutionTier("Tier-1")
                .totalYearsExperience(2.5)
                .rawResumeText("Software engineer with 2.5 years experience in Java, Spring Boot, Microservices, and SQL.")
                .anonymizedResumeText("Software engineer with 2.5 years experience in Java, Spring Boot, Microservices, and SQL.")
                .extractedSkills(new HashSet<>(Arrays.asList("Java", "Spring Boot", "Microservices", "SQL")))
                .build();

        Candidate c2 = Candidate.builder()
                .fullName("Pooja Deshmukh")
                .email("pooja.deshmukh@example.com")
                .district("Aurangabad")
                .gender("Female")
                .institutionTier("Tier-3")
                .totalYearsExperience(2.0)
                .rawResumeText("Passionate developer from rural district with 2 years practical experience in Java, Spring Boot, REST API, Git, and SQL.")
                .anonymizedResumeText("Passionate developer from rural district with 2 years practical experience in Java, Spring Boot, REST API, Git, and SQL.")
                .extractedSkills(new HashSet<>(Arrays.asList("Java", "Spring Boot", "REST API", "Git", "SQL")))
                .build();

        Candidate c3 = Candidate.builder()
                .fullName("Rohan Patil")
                .email("rohan.patil@example.com")
                .district("Kolhapur")
                .gender("Male")
                .institutionTier("Tier-3")
                .totalYearsExperience(1.0)
                .rawResumeText("Graduate from local ITI/Polytechnic with skills in Python, HTML, CSS.")
                .anonymizedResumeText("Graduate from local ITI/Polytechnic with skills in Python, HTML, CSS.")
                .extractedSkills(new HashSet<>(Arrays.asList("Python", "HTML", "CSS")))
                .build();

        Candidate c4 = Candidate.builder()
                .fullName("Snehal Kulkarni")
                .email("snehal.k@example.com")
                .district("Nashik")
                .gender("Female")
                .institutionTier("Tier-2")
                .totalYearsExperience(1.5)
                .rawResumeText("Mobile app enthusiast with Android, Kotlin, Java, and REST API development experience.")
                .anonymizedResumeText("Mobile app enthusiast with Android, Kotlin, Java, and REST API development experience.")
                .extractedSkills(new HashSet<>(Arrays.asList("Android", "Kotlin", "Java", "REST API")))
                .build();

        candidateRepo.saveAll(Arrays.asList(c1, c2, c3, c4));

        // 3. Certified Learning Modules on State/National Learning Portals (Mahaswayam / iGOT Karmayogi)
        curriculumRepo.save(CurriculumRecommendation.builder()
                .targetSkill("Docker")
                .moduleTitle("Containerization with Docker & Podman")
                .recommendedPortal("Mahaswayam")
                .moduleUrl("https://mahaswayam.gov.in/courses/docker")
                .domainArea("Cloud & DevOps")
                .estimatedHours(16)
                .build());

        curriculumRepo.save(CurriculumRecommendation.builder()
                .targetSkill("Microservices")
                .moduleTitle("Microservices Architecture with Spring Cloud")
                .recommendedPortal("iGOT Karmayogi")
                .moduleUrl("https://igotkarmayogi.gov.in/learn/microservices")
                .domainArea("Enterprise Architecture")
                .estimatedHours(24)
                .build());

        curriculumRepo.save(CurriculumRecommendation.builder()
                .targetSkill("Kotlin")
                .moduleTitle("Modern Android Development with Kotlin")
                .recommendedPortal("Swayam / NPTEL")
                .moduleUrl("https://swayam.gov.in/course/kotlin-android")
                .domainArea("Mobile Computing")
                .estimatedHours(30)
                .build());
    }
}

