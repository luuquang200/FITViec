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
  private String name;
  private String description;
  private String avatar;
  private String companyType;
  private String companySize;
  private String country;
  private String workingDays;
  private String overtimePolicy;
}
