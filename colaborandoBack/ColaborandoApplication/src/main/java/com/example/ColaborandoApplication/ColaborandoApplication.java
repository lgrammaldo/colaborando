package com.example.ColaborandoApplication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class ColaborandoApplication {

	public static void main(String[] args) {
		SpringApplication.run(ColaborandoApplication.class, args);
	}
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/colaborando/**")
				.allowedOrigins("http://colaborando.ddns.net", "http://localhost:3000")
				.allowedMethods("*")
				.allowedHeaders("*");
			}
		};
	}

}
