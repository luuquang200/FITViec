package org.example.jobsearchservice.controller;

import lombok.RequiredArgsConstructor;
import org.example.jobsearchservice.constant.FilterBy;
import org.example.jobsearchservice.dto.GetDataRequest;
import org.example.jobsearchservice.dto.SearchRequest;
import org.example.jobsearchservice.repository.model.Job;
import org.example.jobsearchservice.service.JobSearchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/job-elastic")
@RequiredArgsConstructor
public class JobController {
  private final JobSearchService service;

  @GetMapping("")
  public String service() {
    return "Hello job-search service";
  }
  @GetMapping("/search")
  public ResponseEntity<List<Job>> SearchJob(@RequestBody SearchRequest request) throws IOException {
    System.out.println(request.query);
    return ResponseEntity.ok(this.service.Search(request));
  }
  @GetMapping("/job-by-id/{job-id}")
  public ResponseEntity<Job> GetJobById(@PathVariable("job-id") String jobId) {
    System.out.println(jobId);
    return ResponseEntity.ok(this.service.GetJobById(jobId));
  }
  @GetMapping("/jobs-by-employer-id/{employer-id}")
  public ResponseEntity<List<Job>> GetJobsByEmployerId(@PathVariable("employer-id") String employerId) throws IOException {
    System.out.println(employerId);
    return ResponseEntity.ok(this.service.GetJobsByOneField(FilterBy.COPANY_ID, employerId));
  }
  @GetMapping("/jobs-by-skill")
  public ResponseEntity<List<Job>> GetJobsBySkill(@RequestBody GetDataRequest skillName) throws IOException {
    System.out.println(skillName.value);
    return ResponseEntity.ok(this.service.GetJobsByOneField(FilterBy.JOB_SKILLS, skillName.value));
  }
  @GetMapping("/jobs-by-title")
  public ResponseEntity<List<Job>> GetJobsByTitle(@RequestBody GetDataRequest jobTitle) throws IOException {
    System.out.println(jobTitle.value);
    return ResponseEntity.ok(this.service.GetJobsByOneField(FilterBy.JOB_TITLE, jobTitle.value));
  }
  @GetMapping("/jobs-by-company")
  public ResponseEntity<List<Job>> GetJobsByCompany(@RequestBody GetDataRequest companyName) throws IOException {
    System.out.println(companyName.value);
    return ResponseEntity.ok(this.service.GetJobsByOneField(FilterBy.COMPANY, companyName.value));
  }
  @GetMapping("/jobs-by-location")
  public ResponseEntity<List<Job>> GetJobsByLocation(@RequestBody GetDataRequest jobLocation) throws IOException {
    System.out.println(jobLocation.value);
    return ResponseEntity.ok(this.service.GetJobsByOneField(FilterBy.LOCATION, jobLocation.value));
  }
}
