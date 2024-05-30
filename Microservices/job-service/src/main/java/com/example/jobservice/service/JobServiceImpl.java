package com.example.jobservice.service;

import com.example.jobservice.dto.CUJobDto;
import com.example.jobservice.dto.UpdateResponse;
import com.example.jobservice.repository.JobRepository;
import com.example.jobservice.repository.dao.Job;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {
  private final JobRepository repository;

  @Override
  public Job Create(CUJobDto data) {
    Job newJob = new Job();
    this.CopyData(data, newJob);
    newJob.setJobId(this.CreateJobId());
    return this.repository.save(newJob);
  }
  @Override
  public Job GetOne(String jobId) {
    return this.repository.findById(jobId).orElse(null);
  }
  @Override
  public UpdateResponse Update(String employerId, String jobId, CUJobDto data) {
    Job job = this.repository.findById(jobId).orElse(null);
    if (job == null) {
      return new UpdateResponse(HttpStatus.NOT_FOUND.toString(), "Job not found", null);
    } else if (job.getEmployerId().equals(employerId)) {
      this.CopyData(data, job);
      this.repository.save(job);
      return new UpdateResponse(HttpStatus.OK.toString(), "OK", job);
    } else {
      return new UpdateResponse(HttpStatus.FORBIDDEN.toString(), "Forbidden", null);
    }
  }
  @Override
  public UpdateResponse Delete(String employerId, String jobId) {
    Job job = this.repository.findById(jobId).orElse(null);
    if (job == null) {
      return new UpdateResponse(HttpStatus.NOT_FOUND.toString(), "Job not found", null);
    } else if (job.getEmployerId().equals(employerId)) {
      this.repository.delete(job);
      return new UpdateResponse(HttpStatus.OK.toString(), "OK", job);
    } else {
      return new UpdateResponse(HttpStatus.FORBIDDEN.toString(), "Forbidden", null);
    }
  }
  @Override
  public List<Job> GetJobsByEmployer(String employerId) {
    return this.repository.findAllByEmployerId(employerId);
  }

  private String CreateJobId() {
    return UUID.randomUUID().toString();
  }
  private void CopyData(CUJobDto data, Job job) {
    job.setEmployerId(data.employerId);
    job.setJobTitle(data.jobTitle);
    job.setJobDescription(data.jobDescription);
    job.setJobLocation(data.jobLocation);
    job.setJobType(data.jobType);
    job.setJobCategory(data.jobCategory);
    job.setJobSalary(data.jobSalary);
    job.setPostedAt(data.postedAt);
    job.setClosingAt(data.closingAt);
  }
}
