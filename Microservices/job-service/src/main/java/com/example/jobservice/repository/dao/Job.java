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
  String jobSalary;
  String jobTitle;
  String jobLocation;
  String jobType;
  String postedAt;
  String jobSkills;
  String jobTopReasons;
  String jobDescription;
  String jobResponsibility;
  String jobRequirement;
  String jobBenefit;
}
