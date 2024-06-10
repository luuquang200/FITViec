package org.example.jobsearchservice.repository.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.jobsearchservice.dto.EmployerInfo;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.WriteTypeHint;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(indexName = "job", writeTypeHint = WriteTypeHint.FALSE)
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
  EmployerInfo employerInfo;
}
