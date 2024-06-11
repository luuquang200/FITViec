package com.example.jobservice.dto;

import com.example.jobservice.repository.dao.EmployerInfo;
import com.example.jobservice.repository.dao.Job;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class JobDetails {
  public Job job;
  public EmployerInfo employerInfo;
}
