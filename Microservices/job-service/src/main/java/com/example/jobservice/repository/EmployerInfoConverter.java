package com.example.jobservice.repository;

import com.example.jobservice.repository.dao.EmployerInfo;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class EmployerInfoConverter implements AttributeConverter<EmployerInfo, String> {
  private static final ObjectMapper objectMapper = new ObjectMapper();

  @Override
  public String convertToDatabaseColumn(EmployerInfo employerInfo) {
    try {
      return objectMapper.writeValueAsString(employerInfo);
    } catch (com.fasterxml.jackson.core.JsonProcessingException e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public EmployerInfo convertToEntityAttribute(String dbData) {
    try {
      return objectMapper.readValue(dbData, EmployerInfo.class);
    } catch (com.fasterxml.jackson.core.JsonProcessingException e) {
      throw new IllegalArgumentException("Error converting JSON to EmployerInfo", e);
    }
  }
}
