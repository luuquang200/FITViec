package com.example.jobservice.repository.dao;

import com.example.jobservice.listener.JobListener;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@EntityListeners(JobListener.class)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Job {
  @Id
  String jobId;
  String employerId;
  String jobTitle;
  String jobDescription;
  String jobLocation;
  String jobType;
  String jobCategory;
  String jobSalary;
  String postedAt;
  String closingAt;
}
