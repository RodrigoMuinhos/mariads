package com.isismariana.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class TattooBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(TattooBackendApplication.class, args);
    }
}