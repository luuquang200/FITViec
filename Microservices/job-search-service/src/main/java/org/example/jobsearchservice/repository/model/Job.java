package org.example.jobsearchservice.repository.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
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
  private String jobId;
  private String employerId;
  private String jobTitle;
  private String jobDescription;
  private String jobLocation;
  private String jobType;
  private String jobCategory;
  private String jobSalary;
  private String postedAt;
  private String closingAt;
}
