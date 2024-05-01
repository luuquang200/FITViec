package com.example.jobservice.service;

import com.example.jobservice.dto.CUJobDto;
import com.example.jobservice.dto.UpdateResponse;
import com.example.jobservice.repository.dao.Job;

import java.util.List;

public interface JobService {
  Job Create(CUJobDto data);
  Job GetOne(String jobId);
  UpdateResponse Update(String employerId, String jobId, CUJobDto data);
  UpdateResponse Delete(String employerId, String jobId);
  List<Job> GetJobsByEmployer(String employerId);
}
