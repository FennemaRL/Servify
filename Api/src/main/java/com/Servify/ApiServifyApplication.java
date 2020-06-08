package com.Servify;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.Servify")
public class ApiServifyApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiServifyApplication.class, args);
	}

}
