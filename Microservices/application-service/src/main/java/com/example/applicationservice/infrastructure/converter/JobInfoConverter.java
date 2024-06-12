package com.example.applicationservice.infrastructure.converter;

import com.example.applicationservice.domain.entity.JobInfo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class JobInfoConverter implements AttributeConverter<JobInfo, String> {
  private static final ObjectMapper objectMapper = new ObjectMapper();

  @Override
  public String convertToDatabaseColumn(JobInfo jobInfo) {
    try {
      return objectMapper.writeValueAsString(jobInfo);
    } catch (JsonProcessingException e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public JobInfo convertToEntityAttribute(String dbData) {
    try {
      return objectMapper.readValue(dbData, JobInfo.class);
    } catch (JsonProcessingException e) {
      throw new RuntimeException(e);
    }
  }
}
