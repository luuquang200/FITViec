package com.example.jobservice.controller;

import com.example.jobservice.config.firebase.UserInfo;
import com.example.jobservice.constant.Roles;
import com.example.jobservice.dto.CUJobDto;
import com.example.jobservice.dto.UpdateResponse;
import com.example.jobservice.repository.dao.Job;
import com.example.jobservice.service.JobService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/job")
@RequiredArgsConstructor
public class JobController {
  private final JobService service;

  @GetMapping("")
  public String service(HttpServletRequest request) {
    UserInfo user = (UserInfo) request.getAttribute("userInfo");
    return "Hello job service " + user.getFullName();
  }
  @PostMapping("/create")
  public ResponseEntity<Job> CreateJob(HttpServletRequest request, @RequestBody CUJobDto data) {
    UserInfo user = (UserInfo) request.getAttribute("userInfo");
    if (user.getRole().equalsIgnoreCase(Roles.EMPLOYER)) {
      return ResponseEntity.ok(this.service.Create(data, user.getUserId()));
    } else {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }
  }
  @PostMapping("/update/{job-id}")
  public ResponseEntity<UpdateResponse> UpdateJob(
      HttpServletRequest request, @PathVariable("job-id") String jobId,
      @RequestBody CUJobDto data
  ) {
    UserInfo user = (UserInfo) request.getAttribute("userInfo");
    if (user.getRole().equalsIgnoreCase(Roles.EMPLOYER)) {
      return ResponseEntity.ok(this.service.Update(user.getUserId(), jobId, data));
    } else {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }
  }
  @DeleteMapping("/delete/{job-id}")
  public ResponseEntity<UpdateResponse> DeleteJob(HttpServletRequest request, @PathVariable("job-id") String jobId) {
    UserInfo user = (UserInfo) request.getAttribute("userInfo");
    if (user.getRole().equalsIgnoreCase(Roles.EMPLOYER)) {
      return ResponseEntity.ok(this.service.Delete(user.getUserId(), jobId));
    } else {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }
  }
  @PostMapping("/approve/{job-id}")
  public ResponseEntity<UpdateResponse> ApproveJob(HttpServletRequest request, @PathVariable("job-id") String jobId) {
    UserInfo user = (UserInfo) request.getAttribute("userInfo");
    if (user.getRole().equalsIgnoreCase(Roles.ADMIN)) {
      return ResponseEntity.ok(this.service.ApproveJob(jobId));
    } else {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }
  }
  @PostMapping("reject/{job-id}")
  public ResponseEntity<UpdateResponse> RejectJob(HttpServletRequest request, @PathVariable("job-id") String jobId) {
    UserInfo user = (UserInfo) request.getAttribute("userInfo");
    if (user.getRole().equalsIgnoreCase(Roles.ADMIN)) {
      return ResponseEntity.ok(this.service.RejectJob(jobId));
    } else {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }
  }
}
