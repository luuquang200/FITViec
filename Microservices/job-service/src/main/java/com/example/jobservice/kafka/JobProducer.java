package com.example.jobservice.kafka;

import com.example.jobservice.dto.JobEvent;
import org.apache.kafka.clients.admin.NewTopic;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;

@Service
public class JobProducer {
    private static final Logger LOGGER = LoggerFactory.getLogger(JobProducer.class);
    private final NewTopic topic;
    private final KafkaTemplate<String, JobEvent> kafkaTemplate;

    public JobProducer(NewTopic topic, KafkaTemplate<String, JobEvent> kafkaTemplate) {
        this.topic = topic;
        this.kafkaTemplate = kafkaTemplate;
    }
    public void sendJobEvent(JobEvent jobEvent) {
        LOGGER.info(String.format("Sending job event => %s", jobEvent.toString()));
        Message<JobEvent> message = MessageBuilder.withPayload(jobEvent).setHeader(KafkaHeaders.TOPIC, topic.name()).build();
        kafkaTemplate.send(message);
    }
}
