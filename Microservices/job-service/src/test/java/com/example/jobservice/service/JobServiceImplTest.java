package com.example.jobservice.service;

import com.example.jobservice.repository.JobRepository;
import com.example.jobservice.repository.dao.Job;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.Mockito.*;
import org.mockito.Mock.*;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)

class JobServiceImplTest {
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
}