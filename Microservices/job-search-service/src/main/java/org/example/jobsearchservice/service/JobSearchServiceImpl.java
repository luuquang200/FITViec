package org.example.jobsearchservice.service;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.query_dsl.*;
import co.elastic.clients.elasticsearch.core.SearchRequest;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import lombok.AllArgsConstructor;
import org.example.jobsearchservice.constant.FilterBy;
import org.example.jobsearchservice.constant.JobStatus;
import org.example.jobsearchservice.dto.EventData;
import org.example.jobsearchservice.dto.UpdateResponse;
import org.example.jobsearchservice.repository.JobRepository;
import org.example.jobsearchservice.repository.model.Job;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.text.ParseException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.function.Supplier;

@Service
@AllArgsConstructor
public class JobSearchServiceImpl implements JobSearchService {
  private final JobRepository repository;
  private final ElasticsearchClient elasticsearchClient;
  private final String indexName = "job";

  @Override
  public Job Insert(EventData data) {
    System.out.println(data.getJobId());
    Job job = new Job();
    this.CopyData(data, job);
    return this.repository.save(job);
  }
  @Override
  public UpdateResponse Update(EventData data) throws ParseException {
    Job job = this.repository.findById(data.getJobId()).orElse(null);
    if (job == null) {
      return new UpdateResponse(HttpStatus.NOT_FOUND.toString(), "Job not found", null);
    } else {
      this.CopyData(data, job);
      this.repository.save(job);
      return new UpdateResponse(HttpStatus.OK.toString(), "OK", job);
    }
  }
  @Override
  public UpdateResponse Delete(String jobId) {
    Job job = this.repository.findById(jobId).orElse(null);
    if (job == null) {
      return new UpdateResponse(HttpStatus.NOT_FOUND.toString(), "Job not found", null);
    } else {
      this.repository.delete(job);
      return new UpdateResponse(HttpStatus.OK.toString(), "OK", job);
    }
  }
  @Override
  public Job GetJobById(String jobId) {
    Job job = this.repository.findById(jobId).orElse(null);
    if (job != null) {
      job.setPostedAt(this.CacalateJobCreatedDuration(job.getPostedAt()));
    }
    return job;
  }
  @Override
  public List<Job> GetAll() throws IOException {
    MatchAllQuery query = new MatchAllQuery.Builder().build();
    Supplier<Query> supplier = () -> Query.of(_q -> _q.matchAll(query));
    SearchRequest searchRequest = SearchRequest.of(s -> s.index(indexName).query(supplier.get()));
    SearchResponse<Job> searchResponse = this.elasticsearchClient.search(searchRequest, Job.class);
    return this.GetSearchResponseData(searchResponse);
  }

  @Override
  public List<Job> Search(org.example.jobsearchservice.dto.SearchRequest request) throws IOException {
    List<String> fields = this.GetListFieldsForSearching();
    Query multiMatchQuery = new MultiMatchQuery.Builder().query(request.query).fields(fields).build()._toQuery();
    Query filterLocation = this.GetQueryForJobLocation(request.jobLocation);
    Query filterApproved = this.GetQueryForFilterApprovedJobs();
    BoolQuery boolQuery = QueryBuilders.bool().must(multiMatchQuery, filterLocation, filterApproved).build();
    Supplier<Query> supplier = () -> Query.of(_q -> _q.bool(boolQuery));
    SearchRequest searchRequest = SearchRequest.of(s -> s.index(indexName).query(supplier.get()));
    SearchResponse<Job> searchResponse = this.elasticsearchClient.search(searchRequest, Job.class);
    return this.GetSearchResponseData(searchResponse);
  }
  @Override
  public List<Job> GetJobsByOneField(String fieldName, String value) throws IOException {
    Supplier<Query> supplier = this.CreateSupplierQueryForSearch(fieldName, value);
    SearchRequest searchRequest = SearchRequest.of(s -> {
      assert supplier != null;
      return s.index(indexName).query(supplier.get());
    });
    SearchResponse<Job> searchResponse = this.elasticsearchClient.search(searchRequest, Job.class);
    return this.GetSearchResponseData(searchResponse);
  }

  private Supplier<Query> CreateSupplierQueryForSearch(String fieldName, String value) {
    switch (fieldName) {
      case FilterBy.JOB_SKILLS, FilterBy.JOB_TITLE, FilterBy.COMPANY -> {
        Query query = new MatchQuery.Builder().query(value).field(fieldName).build()._toQuery();
        Query filterApproved = this.GetQueryForFilterApprovedJobs();
        BoolQuery boolQuery = QueryBuilders.bool().must(query, filterApproved).build();
        return () -> Query.of(_q -> _q.bool(boolQuery));
      }
      case FilterBy.COPANY_ID -> {
        System.out.println("I'm here");
        MatchQuery query = new MatchQuery.Builder().query(value).field(fieldName).build();
        return () -> Query.of(_q -> _q.match(query));
      }
      case FilterBy.LOCATION -> {
        if (value.equalsIgnoreCase("ho chi minh")
            || value.toLowerCase(Locale.ROOT).equals("ha noi")
            || value.toLowerCase(Locale.ROOT).equals("da nang")) {
          Query query = new MatchQuery.Builder().query(value).field(fieldName).build()._toQuery();
          Query filterApproved = this.GetQueryForFilterApprovedJobs();
          BoolQuery boolQuery = QueryBuilders.bool().must(query, filterApproved).build();
          return () -> Query.of(_q -> _q.bool(boolQuery));
        } else if (value.toLowerCase(Locale.ROOT).equals("others")) {
          Query qHcm = new MatchQuery.Builder().query("ho chi minh").field(FilterBy.LOCATION).build()._toQuery();
          Query qHn = new MatchQuery.Builder().query("ha noi").field(FilterBy.LOCATION).build()._toQuery();
          Query qDn = new MatchQuery.Builder().query("da nang").field(FilterBy.LOCATION).build()._toQuery();
          Query query = new BoolQuery.Builder().mustNot(qHcm, qHn, qDn).build()._toQuery();
          Query filterApproved = this.GetQueryForFilterApprovedJobs();
          BoolQuery boolQuery = QueryBuilders.bool().must(query, filterApproved).build();
          return () -> Query.of(_q -> _q.bool(boolQuery));
        }
      }
    }
    return null;
  }
  private List<Job> GetSearchResponseData(SearchResponse<Job> searchResponse) {
    List<Hit<Job>> hits = searchResponse.hits().hits();
    List<Job> jobs = new ArrayList<>();
    for (Hit<Job> object: hits) {
      assert object.source() != null;
      object.source().setCreatorId("PRIVATE");
      object.source().setPostedAt(this.CacalateJobCreatedDuration(object.source().getPostedAt()));
      jobs.add(object.source());
    }
    return jobs;
  }
  private String CacalateJobCreatedDuration(String stringTime) {
    LocalDateTime timeValue = LocalDateTime.parse(stringTime);
    LocalDateTime now = LocalDateTime.now();
    Duration duration = Duration.between(timeValue, now);
    long minutesDiff = duration.toMinutes();
    if (minutesDiff < 1) {
      return "now";
    } else if (minutesDiff < 60) {
      return minutesDiff + " minutes ago";
    } else if (minutesDiff / 60 < 24) {
      long hoursDiff = minutesDiff / 60;
      return hoursDiff + " hours ago";
    } else {
      long daysDiff = minutesDiff / (60 * 24);
      return daysDiff + " days ago";
    }
  }
  private Query GetQueryForJobLocation(String jobLocation) {
    switch (jobLocation.toLowerCase(Locale.ROOT)) {
      case "all cities", "":
        return new MatchAllQuery.Builder().build()._toQuery();
      case "ho chi minh", "ha noi", "da nang":
        return new MatchQuery.Builder().query(jobLocation).field(FilterBy.LOCATION).build()._toQuery();
      case "others":
        Query qHcm = new MatchQuery.Builder().query("ho chi minh").field(FilterBy.LOCATION).build()._toQuery();
        Query qHn = new MatchQuery.Builder().query("ha noi").field(FilterBy.LOCATION).build()._toQuery();
        Query qDn = new MatchQuery.Builder().query("da nang").field(FilterBy.LOCATION).build()._toQuery();
        return new BoolQuery.Builder().mustNot(qHcm, qHn, qDn).build()._toQuery();
    }
    return null;
  }
  private Query GetQueryForFilterApprovedJobs() {
    return new MatchQuery.Builder().query(JobStatus.APPROVED).field("jobStatus").build()._toQuery();
  }
  private void CopyData(EventData data, Job job) {
    job.setJobId(data.getJobId());
    job.setCreatorId(data.getCreatorId());
    job.setJobStatus(data.getJobStatus());
    job.setEmployerId(data.getEmployerId());
    job.setJobSalary(data.getJobSalary());
    job.setJobTitle(data.getJobTitle());
    job.setJobLocation(data.getJobLocation());
    job.setJobType(data.getJobType());
    job.setPostedAt(data.getPostedAt());
    job.setJobSkills(data.getJobSkills());
    job.setJobTopReasons(data.getJobTopReasons());
    job.setJobDescription(data.getJobDescription());
    job.setJobResponsibility(data.getJobResponsibility());
    job.setJobRequirement(data.getJobRequirement());
    job.setJobBenefit(data.getJobBenefit());
    job.setEmployerInfo(data.getEmployerInfo());
  }
  private List<String> GetListFieldsForSearching() {
    List<String> fields = new ArrayList<>();
    fields.add(FilterBy.JOB_TITLE);
    fields.add(FilterBy.JOB_SKILLS);
    fields.add(FilterBy.COMPANY);
    return fields;
  }
}
