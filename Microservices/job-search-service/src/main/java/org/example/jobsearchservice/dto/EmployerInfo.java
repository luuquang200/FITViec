package org.example.jobsearchservice.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class EmployerInfo {
  public String name;
  public String description;
  public String avatar;
  public String companyType;
  public String companySize;
  public String country;
  public String workingDays;
  public String overtimePolicy;
}
