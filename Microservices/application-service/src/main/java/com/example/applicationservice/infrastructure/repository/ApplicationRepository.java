package com.example.applicationservice.infrastructure.repository;

import com.example.applicationservice.infrastructure.dao.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, String> {
  List<Application> findAllByJobId(String jobId);
  List<Application> findAllByEmployerId(String employerId);
  void deleteAllByJobId(String jobId);
}
