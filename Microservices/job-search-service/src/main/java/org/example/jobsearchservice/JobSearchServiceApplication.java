package org.example.jobsearchservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;
import org.springframework.web.reactive.function.client.WebClient;

@SpringBootApplication
@EnableElasticsearchRepositories
public class JobSearchServiceApplication {

  public static void main(String[] args) {
    SpringApplication.run(JobSearchServiceApplication.class, args);
  }
  @Bean
  public WebClient webClient() {
    return WebClient.builder().build();
  }
}
