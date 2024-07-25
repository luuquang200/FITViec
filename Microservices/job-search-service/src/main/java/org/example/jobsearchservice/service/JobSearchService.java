package org.example.jobsearchservice.service;

import org.example.jobsearchservice.dto.EventData;
import org.example.jobsearchservice.dto.SearchRequest;
import org.example.jobsearchservice.dto.UpdateResponse;
import org.example.jobsearchservice.repository.model.Job;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;

public interface JobSearchService {
  Job Insert(EventData job) throws ParseException;
  UpdateResponse Update(EventData job) throws ParseException;
  UpdateResponse Delete(String jobId);
  List<Job> Search(SearchRequest request) throws IOException;
  List<Job> GetJobsByOneField(String fieldName, String value) throws IOException;
  Job GetJobById(String jobId);
  List<Job> GetAll() throws IOException;
}
