package com.example.applicationservice.infrastructure.converter;

import com.example.applicationservice.infrastructure.value_object.ContactInfo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class ContactInfoConverter implements AttributeConverter<ContactInfo, String> {
  private static final ObjectMapper objectMapper = new ObjectMapper();

  @Override
  public String convertToDatabaseColumn(ContactInfo contactInfo) {
    try {
      return objectMapper.writeValueAsString(contactInfo);
    } catch (JsonProcessingException e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public ContactInfo convertToEntityAttribute(String dbData) {
    try {
      return objectMapper.readValue(dbData, ContactInfo.class);
    } catch (JsonProcessingException e) {
      throw new RuntimeException(e);
    }
  }
}
