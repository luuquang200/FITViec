package com.example.applicationservice.domain.service;

import com.example.applicationservice.config.firebase.UserInfo;
import com.example.applicationservice.domain.ApplicationService;
import com.example.applicationservice.domain.client.JobServiceClient;
import com.example.applicationservice.infrastructure.entity.JobInfo;
import com.example.applicationservice.infrastructure.repository.ApplicationRepository;
import com.example.applicationservice.infrastructure.value_object.ContactInfo;
import com.example.applicationservice.dto.CreateApplicationDto;
import com.example.applicationservice.infrastructure.dao.Application;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DomainApplicationService implements ApplicationService {
  private final ApplicationRepository repository;
  private final JobServiceClient jobServiceClient;

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
  public Application createApplication(String accessToken, UserInfo user, CreateApplicationDto data) {
    ContactInfo contactInfo = new ContactInfo(user.getEmail());
    JobInfo jobInfo = this.jobServiceClient.getJobInfo(accessToken, data.jobId);
    System.out.println(jobInfo.getJobTitle());
    Application application = new Application();
    application.createApplication(data, jobInfo, contactInfo);
    return this.repository.save(application);
  }
  @Override
  public Application getApplicationById(String applicationId) {
    Application application = this.repository.findById(applicationId).orElse(null);
    if (application != null) {
      application.formatData();
      return application;
    }
    return null;
  }
  @Override
  public List<Application> getApplicationsByJob(String jobId) {
    return this.repository.findAllByJobId(jobId);
  }
  @Override
  public List<Application> getApplicationsByEmployer(String employerId) {
    return this.repository.findAllByEmployerId(employerId);
  }
  @Override
  public void updateJobInfo(String jobId, JobInfo newInfo) {
    List<Application> lsApp = this.repository.findAllByJobId(jobId);
    if (!lsApp.isEmpty()) {
      for (Application app : lsApp) {
        app.updateJobInfo(newInfo);
        this.repository.save(app);
      }
    }
  }
  @Override
  @Transactional
  public void deleteApplicationsByJob(String jobId) {
    this.repository.deleteAllByJobId(jobId);
  }
}
