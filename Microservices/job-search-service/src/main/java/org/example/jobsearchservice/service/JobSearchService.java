package org.example.jobsearchservice.service;

import org.example.jobsearchservice.dto.SearchRequest;
import org.example.jobsearchservice.dto.UpdateResponse;
import org.example.jobsearchservice.repository.model.Job;

import java.io.IOException;
import java.util.List;

public interface JobSearchService {
  Job GetOne(String jobId);
  Job Insert(Job job);
  UpdateResponse Update(Job job);
  UpdateResponse Delete(String jobId);
  List<Job> Search(SearchRequest request) throws IOException;
}
