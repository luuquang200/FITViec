package com.example.jobservice.repository.dao;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmployerInfo {
  private String companyName;
  private String companyType;
  private String companySize;
  private String country;
  private String workingDays;
  private String overtimePolicy;
  private String companyOverview;
  private String keySkills;
  private String whyLoveWorkingHere;
  private String logoUrl;
  private String location;
  private String workType;
  private String image;
}
