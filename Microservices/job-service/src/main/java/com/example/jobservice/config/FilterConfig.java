package com.example.jobservice.config;

import com.example.jobservice.config.firebase.FirebaseAuthenticationFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {
  @Bean
  public FilterRegistrationBean<FirebaseAuthenticationFilter> firebaseAuthenticationFilter() {
    FilterRegistrationBean<FirebaseAuthenticationFilter> registrationBean = new FilterRegistrationBean<>();
    registrationBean.setFilter(new FirebaseAuthenticationFilter());
    registrationBean.addUrlPatterns("/job/*");
    return registrationBean;
  }
}
