package com.example.applicationservice.domain;

import com.example.applicationservice.dto.CreateApplicationDto;
import com.example.applicationservice.infrastructure.dao.Application;

import java.util.List;

public interface ApplicationService {
  String updateStatus(String applicationId, String newStatus);
  Application createApplication(CreateApplicationDto data);
  Application getApplicationById(String applicationId);
  List<Application> getApplicationsByJob(String jobId);
  List<Application> getApplicationsByEmployer(String employerId);
}
