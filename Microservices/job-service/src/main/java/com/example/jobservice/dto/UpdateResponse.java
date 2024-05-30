package com.example.jobservice.dto;

import com.example.jobservice.repository.dao.Job;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class UpdateResponse {
  public String status;
  public String message;
  public Job job;
}
