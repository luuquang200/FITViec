package org.example.jobsearchservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

@SpringBootApplication
@EnableElasticsearchRepositories
public class JobSearchServiceApplication {

  public static void main(String[] args) {
    SpringApplication.run(JobSearchServiceApplication.class, args);
  }

}
