package com.example.applicationservice.application;

import com.example.applicationservice.config.firebase.UserInfo;
import com.example.applicationservice.constant.ApplicationStatus;
import com.example.applicationservice.constant.Roles;
import com.example.applicationservice.domain.ApplicationService;
import com.example.applicationservice.dto.CreateApplicationDto;
import com.example.applicationservice.infrastructure.dao.Application;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/application")
@RequiredArgsConstructor
public class ApplicationController {
  private final ApplicationService service;

  @GetMapping("")
  public String service(HttpServletRequest request) {
    UserInfo user = (UserInfo) request.getAttribute("userInfo");
    return "Hello application service " + user.getFullName();
  }
  @PostMapping("/create")
  public ResponseEntity<Application> CreateApplication(HttpServletRequest request, @RequestBody CreateApplicationDto data) {
    UserInfo user = (UserInfo) request.getAttribute("userInfo");
    if (user.getRole().equalsIgnoreCase(Roles.USER)) {
      return ResponseEntity.ok(this.service.createApplication((String) request.getAttribute("accessToken"), user, data));
    } else {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }
  }
  @PostMapping("/accept/{application-id}")
  public ResponseEntity<String> AcceptApplication(HttpServletRequest request, @PathVariable("application-id") String applicationId) {
    UserInfo user = (UserInfo) request.getAttribute("userInfo");
    if (user.getRole().equalsIgnoreCase(Roles.EMPLOYER)) {
      return ResponseEntity.ok(this.service.updateStatus(applicationId, ApplicationStatus.ACCEPTED));
    } else {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }
  }
  @PostMapping("/reject/{application-id}")
  public ResponseEntity<String> RejectApplication(HttpServletRequest request, @PathVariable("application-id") String applicationId) {
    UserInfo user = (UserInfo) request.getAttribute("userInfo");
    if (user.getRole().equalsIgnoreCase(Roles.EMPLOYER)) {
      return ResponseEntity.ok(this.service.updateStatus(applicationId, ApplicationStatus.REJECTED));
    } else {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }
  }
  @GetMapping("/{application-id}")
  public ResponseEntity<Application> GetApplication(
      HttpServletRequest request, @PathVariable("application-id") String applicationId) {
    UserInfo user = (UserInfo) request.getAttribute("userInfo");
    if (user.getRole().equalsIgnoreCase(Roles.EMPLOYER)) {
      return ResponseEntity.ok(this.service.getApplicationById(applicationId));
    } else {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }
  }
  @GetMapping("/by-job/{job-id}")
  public ResponseEntity<List<Application>> GetApplicationsByJob(
      HttpServletRequest request, @PathVariable("job-id") String jobId) {
    UserInfo user = (UserInfo) request.getAttribute("userInfo");
    if (user.getRole().equalsIgnoreCase(Roles.EMPLOYER)) {
      return ResponseEntity.ok(this.service.getApplicationsByJob(jobId));
    } else {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }
  }
  @GetMapping("/by-employer/{employer-id}")
  public ResponseEntity<List<Application>> GetApplicationByEmployer(
      HttpServletRequest request, @PathVariable("employer-id") String employerId) {
    UserInfo user = (UserInfo) request.getAttribute("userInfo");
    if (user.getRole().equalsIgnoreCase(Roles.EMPLOYER)) {
      return ResponseEntity.ok(this.service.getApplicationsByEmployer(employerId));
    } else {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }
  }
}
