package com.example.jobservice.controller;

import com.example.jobservice.dto.CUJobDto;
import com.example.jobservice.dto.JobDetails;
import com.example.jobservice.dto.UpdateResponse;
import com.example.jobservice.repository.dao.Job;
import com.example.jobservice.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/job")
@RequiredArgsConstructor
public class JobController {
  private final JobService service;

  @GetMapping("")
  public String service() {
    return "Hello job service";
  }
  @PostMapping("/create")
  public ResponseEntity<Job> CreateJob(@RequestBody CUJobDto data) {
    return ResponseEntity.ok(this.service.Create(data));
  }
  @PostMapping("/update/{employer-id}/{job-id}")
  public ResponseEntity<UpdateResponse> UpdateJob(
      @PathVariable("employer-id") String employerId, @PathVariable("job-id") String jobId,
      @RequestBody CUJobDto data
  ) {
    return ResponseEntity.ok(this.service.Update(employerId, jobId, data));
  }
  @DeleteMapping("/delete/{employer-id}/{job-id}")
  public ResponseEntity<UpdateResponse> DeleteJob(
      @PathVariable("employer-id") String employerId, @PathVariable("job-id") String jobId
  ) {
    return ResponseEntity.ok(this.service.Delete(employerId, jobId));
  }
}
