package org.example.jobsearchservice;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.FileInputStream;
import java.io.IOException;

@SpringBootApplication
@EnableElasticsearchRepositories
public class JobSearchServiceApplication {

  public static void main(String[] args) throws IOException {
    FileInputStream serviceAccount = new FileInputStream("src/main/resources/serviceAccountKey.json");
    FirebaseOptions options = new FirebaseOptions.Builder()
        .setCredentials(GoogleCredentials.fromStream(serviceAccount))
        .build();
    FirebaseApp.initializeApp(options);
    SpringApplication.run(JobSearchServiceApplication.class, args);
  }
  @Bean
  public WebClient webClient() {
    return WebClient.builder().build();
  }
}
