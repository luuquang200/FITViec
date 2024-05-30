package org.example.jobsearchservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.jobsearchservice.repository.model.Job;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobEvent {
    private String action;
    private Job job;
}
