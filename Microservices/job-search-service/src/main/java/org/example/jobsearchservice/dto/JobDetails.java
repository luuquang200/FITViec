package org.example.jobsearchservice.dto;

import lombok.AllArgsConstructor;
import org.example.jobsearchservice.repository.model.Job;

@AllArgsConstructor
public class JobDetails {
  public Job job;
  public EmployerInfo employerInfo;
}
