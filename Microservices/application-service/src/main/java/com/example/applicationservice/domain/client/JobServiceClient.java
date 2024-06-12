package com.example.applicationservice.domain.client;

import com.example.applicationservice.domain.entity.JobInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class JobServiceClient {
  @Value("${job-service.url}")
  private String jobUrl;
  private final WebClient webClient;

  @Autowired
  public JobServiceClient(WebClient webClient) {
    this.webClient = webClient;
  }

  public JobInfo getJobInfo(String accessToken, String jobId) {
    String URI = this.jobUrl + "/job/get-info/" + jobId;
    return this.webClient.get()
        .uri(URI).header("Authorization", accessToken)
        .retrieve().bodyToMono(JobInfo.class).block();
  }
}
