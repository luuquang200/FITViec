package org.example.jobsearchservice.repository;

import org.example.jobsearchservice.repository.model.Job;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface JobRepository extends ElasticsearchRepository<Job, String> {
}
