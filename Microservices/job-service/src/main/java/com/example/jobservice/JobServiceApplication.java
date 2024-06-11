package com.example.jobservice;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.IOException;
import java.io.InputStream;

@SpringBootApplication
public class JobServiceApplication {

	public static void main(String[] args) throws IOException {
		//FileInputStream serviceAccount = new FileInputStream("src/main/resources/serviceAccountKey.json");
		InputStream serviceAccount = JobServiceApplication.class.getClassLoader().getResourceAsStream("serviceAccountKey.json");
		if (serviceAccount == null) {
			throw new IllegalArgumentException("File serviceAccountKey.json not found in classpath");
		}
		FirebaseOptions options = new FirebaseOptions.Builder()
				.setCredentials(GoogleCredentials.fromStream(serviceAccount))
				.build();
		FirebaseApp.initializeApp(options);
		SpringApplication.run(JobServiceApplication.class, args);
	}
	@Bean
	public WebClient webClient() {
		return WebClient.builder().build();
	}
}
