package com.example.jobservice.service;

import com.example.jobservice.constant.JobStatus;
import com.example.jobservice.dto.CUJobDto;
import com.example.jobservice.dto.UpdateResponse;
import com.example.jobservice.repository.JobRepository;
import com.example.jobservice.repository.dao.Job;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
    newJob.setJobStatus(JobStatus.PENDING);
    return this.repository.save(newJob);
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
  public UpdateResponse ApproveJob(String jobId) {
    Job job = this.repository.findById(jobId).orElse(null);
    if (job != null) {
      job.setJobStatus(JobStatus.APPROVED);
      this.repository.save(job);
      return new UpdateResponse(HttpStatus.OK.toString(), "Approved", job);
    } else {
      return new UpdateResponse(HttpStatus.NOT_FOUND.toString(), "Job not found", null);
    }
  }
  @Override
  public UpdateResponse RejectJob(String jobId) {
    Job job = this.repository.findById(jobId).orElse(null);
    if (job != null) {
      job.setJobStatus(JobStatus.REJECTED);
      this.repository.save(job);
      return new UpdateResponse(HttpStatus.OK.toString(), "Rejected", job);
    } else {
      return new UpdateResponse(HttpStatus.NOT_FOUND.toString(), "Job not found", null);
    }
  }

  private String CreateJobId() {
    return UUID.randomUUID().toString();
  }
  private void CopyData(CUJobDto data, Job job) {
    job.setEmployerId(data.employerId);
    job.setJobSalary(data.jobSalary);
    job.setJobTitle(data.jobTitle);
    job.setJobLocation(data.jobLocation);
    job.setJobType(data.jobType);
    job.setPostedAt(this.CreatePostedDate());
    job.setJobSkills(data.jobSkills);
    job.setJobTopReasons(data.jobTopReasons);
    job.setJobDescription(data.jobDescription);
    job.setJobResponsibility(data.jobResponsibility);
    job.setJobRequirement(data.jobRequirement);
    job.setJobBenefit(data.jobBenefit);
    job.setEmployerInfo(data.employerInfo);
  }
  private String CreatePostedDate() {
    LocalDateTime now = LocalDateTime.now();
    return now.toString();
  }
}
