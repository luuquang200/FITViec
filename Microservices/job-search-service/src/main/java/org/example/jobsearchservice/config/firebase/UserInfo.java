package org.example.jobsearchservice.config.firebase;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserInfo {
  private String userId;
  private String fullName;
  private String email;
  private String role;
}
