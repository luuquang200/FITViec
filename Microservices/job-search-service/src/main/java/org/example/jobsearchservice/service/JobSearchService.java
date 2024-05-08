package org.example.jobsearchservice.service;

import org.example.jobsearchservice.dto.SearchRequest;
import org.example.jobsearchservice.dto.UpdateResponse;
import org.example.jobsearchservice.repository.model.Job;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;

public interface JobSearchService {
  Job Insert(Job job) throws ParseException;
  UpdateResponse Update(Job job) throws ParseException;
  UpdateResponse Delete(String jobId);
  List<Job> Search(SearchRequest request) throws IOException;
}
