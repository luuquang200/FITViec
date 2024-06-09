package com.example.applicationservice.domain.service;

import com.example.applicationservice.constant.ApplicationStatus;
import com.example.applicationservice.domain.ApplicationService;
import com.example.applicationservice.domain.repository.ApplicationRepository;
import com.example.applicationservice.dto.CreateApplicationDto;
import com.example.applicationservice.infrastructure.dao.Application;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DomainApplicationService implements ApplicationService {
  private final ApplicationRepository repository;

  @Override
  public String updateStatus(String applicationId, String newStatus) {
    Application application = this.repository.findById(applicationId).orElse(null);
    if (application != null) {
      application.setApplicationStatus(newStatus);
      this.repository.save(application);
      return "Update Successfully";
    } else {
      return "Update Fail";
    }
  }
  @Override
  public Application createApplication(CreateApplicationDto data) {
    Application application = new Application();
    application.setApplicationId(UUID.randomUUID().toString());
    this.copyData(data, application);
    return this.repository.save(application);
  }
  @Override
  public Application getApplicationById(String applicationId) {
    return this.repository.findById(applicationId).orElse(null);
  }
  @Override
  public List<Application> getApplicationsByJob(String jobId) {
    return this.repository.findAllByJobId(jobId);
  }
  @Override
  public List<Application> getApplicationsByEmployer(String employerId) {
    return this.repository.findAllByEmployerId(employerId);
  }

  private void copyData(CreateApplicationDto data, Application application) {
    application.setEmployerId(data.employerId);
    application.setJobId(data.jobId);
    application.setJobSeekerId(data.jobSeekerId);
    application.setApplicationStatus(ApplicationStatus.IN_REVIEW);
    application.setApplicationName(data.applicationName);
    application.setCvLink(data.cvLink);
    application.setCoverLetter(data.coverLetter);
    application.setApplyAt(this.createApplyTime());
  }
  private String createApplyTime() {
    LocalDateTime now = LocalDateTime.now();
    return now.toString();
  }
}
