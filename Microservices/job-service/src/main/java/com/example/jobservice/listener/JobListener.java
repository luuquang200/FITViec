package com.example.jobservice.listener;

import com.example.jobservice.repository.dao.Job;
import jakarta.persistence.PostPersist;
import jakarta.persistence.PostRemove;
import jakarta.persistence.PostUpdate;
import lombok.AllArgsConstructor;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

@AllArgsConstructor
public class JobListener {
  private static final Log log = LogFactory.getLog(JobListener.class);
  private final WebClient webClient;
  private final String JOB_SEARCH_BASE_URL = "http://localhost:1001/job-elastic/";

  @PostPersist
  private void afterInsert(Job job) {
    System.out.println("After insert: " + job.getJobId());
    this.InsertJobIntoElastic(job);
  }
  @PostUpdate
  private void afterUpdate(Job job) {
    System.out.println("After update: " + job.getJobId());
    this.UpdateJobIntoElastic(job);
  }

  @PostRemove
  private void afterRemove(Job job) {
    System.out.println("After remove: " + job.getJobId());
    this.RemoveJobFromElastic(job.getJobId());
  }

  private void InsertJobIntoElastic(Job job) {
    Job result = this.webClient.post().uri(JOB_SEARCH_BASE_URL + "insert")
        .body(BodyInserters.fromValue(job)).retrieve().bodyToMono(Job.class).block();
    System.out.println(result);
  }
  private void UpdateJobIntoElastic(Job job) {
    Job result = this.webClient.post().uri(JOB_SEARCH_BASE_URL + "update")
        .body(BodyInserters.fromValue(job)).retrieve().bodyToMono(Job.class).block();
    System.out.println(result);
  }
  private void RemoveJobFromElastic(String jobId) {
    this.webClient.delete().uri(JOB_SEARCH_BASE_URL + "delete/" + jobId).retrieve().bodyToMono(Job.class).block();
  }
}
