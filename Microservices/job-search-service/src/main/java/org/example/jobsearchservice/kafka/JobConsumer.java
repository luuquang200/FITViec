package org.example.jobsearchservice.kafka;

import lombok.AllArgsConstructor;
import org.example.jobsearchservice.dto.JobEvent;
import org.example.jobsearchservice.service.JobSearchService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.text.ParseException;

@Service
@AllArgsConstructor
public class JobConsumer {
    private static final Logger LOGGER = LoggerFactory.getLogger(JobConsumer.class);
    private final JobSearchService service;

    @KafkaListener(topics = "${spring.kafka.topic.name}", groupId = "${spring.kafka.consumer.group-id}")
    public void consume(JobEvent jobEvent) throws ParseException {
        LOGGER.info(String.format("Received job event => %s", jobEvent.toString()));
        System.out.println(jobEvent.getAction());
        switch (jobEvent.getAction().toLowerCase()) {
            case "insert":
                this.service.Insert(jobEvent.getJob());
                break;
            case "update":
                this.service.Update(jobEvent.getJob());
                break;
            case "delete":
                this.service.Delete(jobEvent.getJob().getJobId());
                break;
            default: //Do nothing
        }
    }
}
