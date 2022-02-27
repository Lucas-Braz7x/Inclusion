package com.api.inclusion;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class ApiInclusionApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiInclusionApplication.class, args);
	}

}
