package com.example.jobservice.listener;

import com.example.jobservice.dto.JobEvent;
import com.example.jobservice.kafka.JobProducer;
import com.example.jobservice.repository.dao.Job;
import jakarta.persistence.PostPersist;
import jakarta.persistence.PostRemove;
import jakarta.persistence.PostUpdate;
import lombok.AllArgsConstructor;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;

@AllArgsConstructor
public class JobListener {
  private static final Log log = LogFactory.getLog(JobListener.class);
  private JobProducer producer;

    private static class JobEventAction {
    public static String INSERT = "insert";
    public static String UPDATE = "update";
    public static String DELETE = "delete";
  }

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
    this.RemoveJobFromElastic(job);
  }

  private void InsertJobIntoElastic(Job job) {
    JobEvent jobEvent = new JobEvent();
    jobEvent.setAction(JobEventAction.INSERT);
    jobEvent.setJob(job);
    this.producer.sendJobEvent(jobEvent);
  }
  private void UpdateJobIntoElastic(Job job) {
    JobEvent jobEvent = new JobEvent();
    jobEvent.setAction(JobEventAction.UPDATE);
    jobEvent.setJob(job);
    this.producer.sendJobEvent(jobEvent);
  }
  private void RemoveJobFromElastic(Job job) {
    JobEvent jobEvent = new JobEvent();
    jobEvent.setAction(JobEventAction.DELETE);
    jobEvent.setJob(job);
    this.producer.sendJobEvent(jobEvent);
  }
}
