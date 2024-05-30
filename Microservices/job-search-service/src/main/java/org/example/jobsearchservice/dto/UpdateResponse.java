package org.example.jobsearchservice.dto;

import lombok.AllArgsConstructor;
import org.example.jobsearchservice.repository.model.Job;

@AllArgsConstructor
public class UpdateResponse {
  public String status;
  public String message;
  public Job job;
}
