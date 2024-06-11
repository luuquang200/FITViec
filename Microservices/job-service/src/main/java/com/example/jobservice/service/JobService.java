package com.example.jobservice.service;

import com.example.jobservice.dto.CUJobDto;
import com.example.jobservice.dto.JobDetails;
import com.example.jobservice.dto.UpdateResponse;
import com.example.jobservice.repository.dao.Job;

import java.util.List;

public interface JobService {
  Job Create(CUJobDto data, String creatorId);
  UpdateResponse Update(String creatorId, String jobId, CUJobDto data);
  UpdateResponse Delete(String creatorId, String jobId);
  UpdateResponse ApproveJob(String jobId);
  UpdateResponse RejectJob(String jobId);
}
