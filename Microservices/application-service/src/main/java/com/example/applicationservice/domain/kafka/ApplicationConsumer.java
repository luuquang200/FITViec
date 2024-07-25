package com.example.applicationservice.domain.kafka;

import com.example.applicationservice.domain.ApplicationService;
import com.example.applicationservice.dto.JobEvent;
import com.example.applicationservice.infrastructure.entity.JobInfo;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ApplicationConsumer {
  private static final Logger LOGGER = LoggerFactory.getLogger(ApplicationConsumer.class);
  private final ApplicationService service;

  @KafkaListener(topics = "${spring.kafka.topic.name}", groupId = "${spring.kafka.consumer.group-id}")
  public void consumer(JobEvent jobEvent) {
    LOGGER.info(String.format("Received job event => %s", jobEvent.toString()));
    System.out.println(jobEvent.getAction());
    switch (jobEvent.getAction().toLowerCase()) {
      case "insert":
        break;
      case "update":
        JobInfo newInfo = new JobInfo(jobEvent.getJob().getJobId(), jobEvent.getJob().getJobTitle());
        this.service.updateJobInfo(jobEvent.getJob().getJobId(), newInfo);
        break;
      case "delete":
        this.service.deleteApplicationsByJob(jobEvent.getJob().getJobId());
        break;
      default: //Do nothing
    }
  }
}
