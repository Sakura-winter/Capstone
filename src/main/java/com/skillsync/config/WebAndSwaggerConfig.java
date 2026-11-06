package com.skillsync.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebAndSwaggerConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Allow Android apps, web clients, or any local testbed to make HTTP calls without CORS blocks
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                .allowedHeaders("*");
    }

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("SkillSync AI - Backend REST API (SIH26134)")
                        .version("1.0.0")
                        .description("Audited Resume-Job Matcher, Algorithmic Bias Audit, and Dynamic Curriculum Realignment Platform REST API for Android & Web clients.")
                        .contact(new Contact().name("SkillSync AI Core Team"))
                        .license(new License().name("Apache 2.0")));
    }
}

