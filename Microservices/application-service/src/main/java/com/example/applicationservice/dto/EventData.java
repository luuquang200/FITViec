package com.example.applicationservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EventData {
  String jobId;
  String creatorId;
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
}
