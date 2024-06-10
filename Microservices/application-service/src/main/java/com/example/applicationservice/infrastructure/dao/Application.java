package com.example.applicationservice.infrastructure.dao;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Application {
  @Id
  String applicationId;
  String employerId;
  String jobId;
  String jobSeekerId;
  String applicationStatus;
  String applicationName;
  String cvLink;
  String coverLetter;
  String applyAt;
}
