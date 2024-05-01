package com.example.jobservice.service;

import com.example.jobservice.dto.CUJobDto;
import com.example.jobservice.repository.JobRepository;
import com.example.jobservice.repository.dao.Job;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class JobServiceImpl {
  private final JobRepository repository;

  public void Create(CUJobDto data) {
    Job newJob = this.CloneData(data);
    newJob.setJobId(this.CreateJobId());
    this.repository.save(newJob);
  }
  public Job GetOne(String jobId) {
    return this.repository.findById(jobId).orElse(null);
  }
  public void Update(CUJobDto data) {

  }

  private String CreateJobId() {
    return UUID.randomUUID().toString();
  }
  private Job CloneData(CUJobDto data) {
    Job cloneJob = new Job();
    cloneJob.setJobId("");
    cloneJob.setEmployerId(data.employerId);
    cloneJob.setJobTitle(data.jobTitle);
    cloneJob.setJobDescription(data.jobDescription);
    cloneJob.setJobLocation(data.jobLocation);
    cloneJob.setJobType(data.jobType);
    cloneJob.setJobCategory(data.jobCategory);
    cloneJob.setJobSalary(data.jobSalary);
    cloneJob.setPostedAt(data.postedAt);
    cloneJob.setClosingAt(data.closingAt);
    return cloneJob;
  }
}
