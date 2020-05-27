package com.Cervify.Apicervify;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.Cervify")
public class ApicervifyApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApicervifyApplication.class, args);
	}

}
