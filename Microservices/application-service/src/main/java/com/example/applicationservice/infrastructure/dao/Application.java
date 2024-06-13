package com.example.applicationservice.infrastructure.dao;

import com.example.applicationservice.constant.ApplicationStatus;
import com.example.applicationservice.infrastructure.entity.JobInfo;
import com.example.applicationservice.infrastructure.value_object.ContactInfo;
import com.example.applicationservice.dto.CreateApplicationDto;
import com.example.applicationservice.infrastructure.converter.ContactInfoConverter;
import com.example.applicationservice.infrastructure.converter.JobInfoConverter;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Application {
  @Id
  String applicationId;
  String employerId;
  String jobId;
  String jobSeekerId;
  String applicationStatus;
  String applicationName;
  String cvLink;
  String coverLetter;
  String applyAt;
  @Convert(converter = JobInfoConverter.class)
  JobInfo jobInfo;
  @Convert(converter = ContactInfoConverter.class)
  ContactInfo contactInfo;

  public void createApplication(CreateApplicationDto data, JobInfo jobInfo, ContactInfo contactInfo) {
    this.setApplicationId(UUID.randomUUID().toString());
    this.setEmployerId(data.employerId);
    this.setJobId(data.jobId);
    this.setJobSeekerId(data.jobSeekerId);
    this.setApplicationStatus(ApplicationStatus.IN_REVIEW);
    this.setApplicationName(data.applicationName);
    this.setCvLink(data.cvLink);
    this.setCoverLetter(data.coverLetter);
    this.setApplyAt(this.createApplyTime());
    this.setJobInfo(jobInfo);
    this.setContactInfo(contactInfo);
  }
  private String createApplyTime() {
    LocalDateTime now = LocalDateTime.now();
    return now.toString();
  }
  private String changeApplyTimeFormat(String stringTime) {
    LocalDateTime timeValue = LocalDateTime.parse(stringTime);
    ZonedDateTime zonedDateTime = timeValue.atZone(ZoneId.of("Asia/Ho_Chi_Minh"));
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy HH:mm");
    return zonedDateTime.format(formatter);
  }
  public void formatData() {
    this.setApplyAt(this.changeApplyTimeFormat(this.getApplyAt()));
  }
}
