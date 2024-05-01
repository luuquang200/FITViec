package com.example.jobservice.repository;

import com.example.jobservice.repository.dao.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, String> {
  List<Job> findAllByEmployerId(String employerId);
}
