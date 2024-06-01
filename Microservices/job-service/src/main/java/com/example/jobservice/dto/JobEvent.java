package com.example.jobservice.dto;

import com.example.jobservice.repository.dao.Job;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobEvent {
  private String action;
  private Job job;
}
