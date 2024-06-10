package com.example.jobservice.repository.dao;

import com.example.jobservice.listener.JobListener;
import com.example.jobservice.repository.EmployerInfoConverter;
import jakarta.persistence.*;
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
  String jobStatus;
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
  @Convert(converter = EmployerInfoConverter.class)
  EmployerInfo employerInfo;
}
