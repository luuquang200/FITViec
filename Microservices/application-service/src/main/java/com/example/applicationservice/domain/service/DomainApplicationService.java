package com.example.applicationservice.domain.service;

import com.example.applicationservice.config.firebase.UserInfo;
import com.example.applicationservice.domain.ApplicationService;
import com.example.applicationservice.domain.client.JobServiceClient;
import com.example.applicationservice.domain.entity.JobInfo;
import com.example.applicationservice.domain.repository.ApplicationRepository;
import com.example.applicationservice.domain.value_object.ContactInfo;
import com.example.applicationservice.dto.CreateApplicationDto;
import com.example.applicationservice.infrastructure.dao.Application;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}
