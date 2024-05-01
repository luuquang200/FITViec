package org.example.jobsearchservice.controller;

import lombok.RequiredArgsConstructor;
import org.example.jobsearchservice.dto.SearchRequest;
import org.example.jobsearchservice.dto.UpdateResponse;
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

  @GetMapping("/{job-id}")
  public ResponseEntity<Job> GetOneJob(@PathVariable("job-id") String jobId) {
    return ResponseEntity.ok(this.service.GetOne(jobId));
  }
  @PostMapping("/insert")
  public ResponseEntity<Job> InsertJob(@RequestBody Job job) {
    return ResponseEntity.ok(this.service.Insert(job));
  }
  @PostMapping("/update")
  public ResponseEntity<UpdateResponse> UpdateJob(@RequestBody Job job) {
    return ResponseEntity.ok(this.service.Update(job));
  }
  @DeleteMapping("/delete/{job-id}")
  public ResponseEntity<UpdateResponse> DeleteJob(@PathVariable("job-id") String jobId) {
    return ResponseEntity.ok(this.service.Delete(jobId));
  }
  @GetMapping("/search")
  public ResponseEntity<List<Job>> SearchJob(@RequestBody SearchRequest request) throws IOException {
    System.out.println(request.query);
    return ResponseEntity.ok(this.service.Search(request));
  }
}
