package com.skillsync.service;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SemanticMatcherService {

    // Weights from framework: a + b + g = 1.0
    private static final double ALPHA = 0.50; // Semantic vector alignment weight
    private static final double BETA = 0.35;  // Skill taxonomy overlap weight
    private static final double GAMMA = 0.15; // Experience recency weight

    /**
     * Contextual Cosine Similarity in vector/term space Sim(vc, vj)
     */
    public double computeCosineSimilarity(String text1, String text2) {
        if (text1 == null || text2 == null || text1.isBlank() || text2.isBlank()) {
            return 0.0;
        }

        Map<String, Integer> freq1 = getTermFrequencies(text1);
        Map<String, Integer> freq2 = getTermFrequencies(text2);

        Set<String> allTerms = new HashSet<>();
        allTerms.addAll(freq1.keySet());
        allTerms.addAll(freq2.keySet());

        double dotProduct = 0.0;
        double norm1 = 0.0;
        double norm2 = 0.0;

        for (String term : allTerms) {
            int c1 = freq1.getOrDefault(term, 0);
            int c2 = freq2.getOrDefault(term, 0);
            dotProduct += c1 * c2;
            norm1 += c1 * c1;
            norm2 += c2 * c2;
        }

        if (norm1 == 0 || norm2 == 0) return 0.0;
        return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
    }

    /**
     * Skill Overlap: Overlap(Kc, Kj)
     */
    public double computeSkillOverlap(Set<String> candidateSkills, Set<String> jobSkills) {
        if (jobSkills == null || jobSkills.isEmpty()) return 1.0;
        if (candidateSkills == null || candidateSkills.isEmpty()) return 0.0;

        long matched = candidateSkills.stream()
                .filter(cs -> jobSkills.stream().anyMatch(js -> js.equalsIgnoreCase(cs)))
                .count();

        return (double) matched / jobSkills.size();
    }

    /**
     * Recency & Experience Score: Recency(Ec)
     */
    public double computeRecencyScore(Double candidateYears, Double requiredYears) {
        if (requiredYears == null || requiredYears <= 0) return 1.0;
        if (candidateYears == null || candidateYears <= 0) return 0.2;

        double ratio = candidateYears / requiredYears;
        return Math.min(1.0, ratio);
    }

    /**
     * Total Composite Match Score:
     * Smatch = a * Sim(vc, vj) + b * Overlap(Kc, Kj) + g * Recency(Ec)
     */
    public double computeCompositeMatch(double sim, double overlap, double recency) {
        double score = (ALPHA * sim) + (BETA * overlap) + (GAMMA * recency);
        return Math.round(score * 1000.0) / 1000.0; // Round to 3 decimal places
    }

    /**
     * Contextual Skill Gap Index (SGI)
     * SGI = 1 - (sum(wk * u) / sum(wk))
     */
    public double computeSkillGapIndex(Set<String> candidateSkills, Set<String> requiredSkills) {
        if (requiredSkills == null || requiredSkills.isEmpty()) return 0.0;

        int totalWeight = requiredSkills.size();
        int possessed = 0;

        for (String req : requiredSkills) {
            if (candidateSkills.stream().anyMatch(cs -> cs.equalsIgnoreCase(req))) {
                possessed += 1;
            }
        }

        double competencyRatio = (double) possessed / totalWeight;
        return Math.round((1.0 - competencyRatio) * 1000.0) / 1000.0;
    }

    private Map<String, Integer> getTermFrequencies(String text) {
        Map<String, Integer> freq = new HashMap<>();
        String[] tokens = text.toLowerCase().replaceAll("[^a-zA-Z0-9 ]", " ").split("\\s+");
        for (String t : tokens) {
            if (t.length() > 2) { // Filter single-character noise
                freq.put(t, freq.getOrDefault(t, 0) + 1);
            }
        }
        return freq;
    }
}

