package com.example.applicationservice.application;

import com.example.applicationservice.constant.ApplicationStatus;
import com.example.applicationservice.domain.ApplicationService;
import com.example.applicationservice.dto.CreateApplicationDto;
import com.example.applicationservice.infrastructure.dao.Application;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/application")
@RequiredArgsConstructor
public class ApplicationController {
  private final ApplicationService service;

  @GetMapping("")
  public String service() {
    return "Hello application service";
  }
  @PostMapping("/create")
  public ResponseEntity<Application> CreateApplication(@RequestBody CreateApplicationDto data) {
    return ResponseEntity.ok(this.service.createApplication(data));
  }
  @PostMapping("/accept/{application-id}")
  public String AcceptApplication(@PathVariable("application-id") String applicationId) {
    return this.service.updateStatus(applicationId, ApplicationStatus.ACCEPTED);
  }
  @PostMapping("/reject/{application-id}")
  public String RejectApplication(@PathVariable("application-id") String applicationId) {
    return this.service.updateStatus(applicationId, ApplicationStatus.REJECTED);
  }
  @GetMapping("/{application-id}")
  public ResponseEntity<Application> GetApplication(@PathVariable("application-id") String applicationId) {
    return ResponseEntity.ok(this.service.getApplicationById(applicationId));
  }
  @GetMapping("/by-job/{job-id}")
  public ResponseEntity<List<Application>> GetApplicationsByJob(@PathVariable("job-id") String jobId) {
    return ResponseEntity.ok(this.service.getApplicationsByJob(jobId));
  }
  @GetMapping("/by-employer/{employer-id}")
  public ResponseEntity<List<Application>> GetApplicationByEmployer(@PathVariable("employer-id") String employerId) {
    return ResponseEntity.ok(this.service.getApplicationsByEmployer(employerId));
  }
}
