package com.example.jobservice.service;

import com.example.jobservice.dto.CUJobDto;
import com.example.jobservice.dto.UpdateResponse;
import com.example.jobservice.repository.JobRepository;
import com.example.jobservice.repository.dao.Job;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.Mockito.*;
import org.mockito.Mock.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)

class JobServiceImplTest {
  @Test
  void create() {
    JobRepository repository = Mockito.mock(JobRepository.class);
    CUJobDto data = new CUJobDto();
    data.employerId = "employerId";
    data.jobTitle = "Job Title";
    data.jobDescription = "Job Description";
    data.jobLocation = "Job Location";
    data.jobType = "Job Type";
    data.jobCategory = "Job Category";
    data.jobSalary = "Job Salary";
    data.postedAt = "Posted At";
    data.closingAt = "Closing At";

    Job job = new Job(
        "1",
        data.employerId,
        data.jobTitle,
        data.jobDescription,
        data.jobLocation,
        data.jobType,
        data.jobCategory,
        data.jobSalary,
        data.postedAt,
        data.closingAt);
    Mockito.when(repository.save(Mockito.any(Job.class))).thenReturn(job);
    JobServiceImpl jobService = new JobServiceImpl(repository);
    Job result = jobService.Create(data);

    assertEquals("1", result.getJobId());
    assertEquals(data.jobTitle, result.getJobTitle());
    assertEquals(data.jobDescription, result.getJobDescription());
    assertEquals(data.jobLocation, result.getJobLocation());
    assertEquals(data.jobType, result.getJobType());
    assertEquals(data.jobCategory, result.getJobCategory());
    assertEquals(data.jobSalary, result.getJobSalary());
    assertEquals(data.postedAt, result.getPostedAt());
    assertEquals(data.closingAt, result.getClosingAt());
  }

  @Test
  void getOne() {
    JobRepository repository = Mockito.mock(JobRepository.class);
    Job job = new Job(
        "1",
        "employerId",
        "Job Title",
        "Job Description",
        "Job Location",
        "Job Type",
        "Job Category",
        "Job Salary",
        "Posted At",
        "Closing At");
    Mockito.when(repository.findById("1")).thenReturn(Optional.of(job));
    JobServiceImpl jobService = new JobServiceImpl(repository);
    Job result = jobService.GetOne("1");

    assertEquals("1", result.getJobId());
    assertEquals("employerId", result.getEmployerId());
    assertEquals("Job Title", result.getJobTitle());
    assertEquals("Job Description", result.getJobDescription());
    assertEquals("Job Location", result.getJobLocation());
    assertEquals("Job Type", result.getJobType());
    assertEquals("Job Category", result.getJobCategory());
    assertEquals("Job Salary", result.getJobSalary());
    assertEquals("Posted At", result.getPostedAt());
    assertEquals("Closing At", result.getClosingAt());

    Mockito.verify(repository, Mockito.times(1)).findById("1");
  }

  @Test
  void update() {
    JobRepository repository = Mockito.mock(JobRepository.class);
    Job job = new Job(
        "1",
        "employerId",
        "Job Title",
        "Job Description",
        "Job Location",
        "Job Type",
        "Job Category",
        "Job Salary",
        "Posted At",
        "Closing At");
    Mockito.when(repository.findById("1")).thenReturn(Optional.of(job));

    CUJobDto data = new CUJobDto();
    data.employerId = "employerId";
    data.jobTitle = "Job Title";
    data.jobDescription = "Job Description (changed)";
    data.jobLocation = "Job Location";
    data.jobType = "Job Type";
    data.jobCategory = "Job Category";
    data.jobSalary = "Job Salary";
    data.postedAt = "Posted At";
    data.closingAt = "Closing At";

    Job uJob = new Job(
        job.getJobId(),
        data.employerId,
        data.jobTitle,
        data.jobDescription,
        data.jobLocation,
        data.jobType,
        data.jobCategory,
        data.jobSalary,
        data.postedAt,
        data.closingAt
    );
    Mockito.when(repository.save(Mockito.any(Job.class))).thenReturn(uJob);
    JobServiceImpl jobService = new JobServiceImpl(repository);
    UpdateResponse result = jobService.Update("employerId", "1", data);

    assertEquals(result.job.getJobId(), uJob.getJobId());
    assertEquals(result.job.getEmployerId(), uJob.getEmployerId());
    assertEquals(result.job.getJobTitle(), uJob.getJobTitle());
    assertEquals(result.job.getJobDescription(), uJob.getJobDescription());
    assertEquals(result.job.getJobLocation(), uJob.getJobLocation());
    assertEquals(result.job.getJobType(), uJob.getJobType());
    assertEquals(result.job.getJobSalary(), uJob.getJobSalary());
    assertEquals(result.job.getPostedAt(), uJob.getPostedAt());
    assertEquals(result.job.getClosingAt(), uJob.getClosingAt());
  }

  @Test
  void delete() {
    JobRepository repository = Mockito.mock(JobRepository.class);
    Job job = new Job(
        "1",
        "employerId",
        "Job Title",
        "Job Description",
        "Job Location",
        "Job Type",
        "Job Category",
        "Job Salary",
        "Posted At",
        "Closing At");
    Mockito.when(repository.findById("1")).thenReturn(Optional.of(job));
    JobServiceImpl jobService = new JobServiceImpl(repository);

    UpdateResponse result = jobService.Delete("employerId", "1");
    assertEquals(HttpStatus.OK.toString(), result.status);
    assertEquals("OK", result.message);
    assertEquals(job, result.job);
    Mockito.verify(repository).delete(job);
  }
}