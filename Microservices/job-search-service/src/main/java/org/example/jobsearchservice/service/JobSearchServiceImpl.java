package org.example.jobsearchservice.service;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.query_dsl.*;
import co.elastic.clients.elasticsearch.core.SearchRequest;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import lombok.AllArgsConstructor;
import org.example.jobsearchservice.dto.UpdateResponse;
import org.example.jobsearchservice.repository.JobRepository;
import org.example.jobsearchservice.repository.model.Job;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
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
  public Job Insert(Job job) throws ParseException {
    System.out.println(job.getJobId());
    job.setPostedAt(this.ChangeDateFormatBeforeInserting(job.getPostedAt()));
    job.setClosingAt(this.ChangeDateFormatBeforeInserting(job.getClosingAt()));
    return this.repository.save(job);
  }
  @Override
  public UpdateResponse Update(Job data) throws ParseException {
    Job job = this.repository.findById(data.getJobId()).orElse(null);
    if (job == null) {
      return new UpdateResponse(HttpStatus.NOT_FOUND.toString(), "Job not found", null);
    } else {
      this.CopyData(data, job);
      job.setPostedAt(this.ChangeDateFormatBeforeInserting(job.getPostedAt()));
      job.setClosingAt(this.ChangeDateFormatBeforeInserting(job.getClosingAt()));
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
  public List<Job> Search(org.example.jobsearchservice.dto.SearchRequest request) throws IOException {
    List<String> fields = this.GetListFieldsForSearching();
    Query multiMatchQuery = new MultiMatchQuery.Builder().query(request.query).fields(fields).build()._toQuery();
    Query filterLocation = this.GetQueryForJobLocation(request.jobLocation);
    BoolQuery boolQuery = QueryBuilders.bool().must(multiMatchQuery, filterLocation).build();
    Supplier<Query> supplier = () -> Query.of(_q -> _q.bool(boolQuery));
    SearchRequest searchRequest = SearchRequest.of(s -> s.index(indexName).query(supplier.get()));
    SearchResponse<Job> searchResponse = this.elasticsearchClient.search(searchRequest, Job.class);
    List<Hit<Job>> hits = searchResponse.hits().hits();
    List<Job> jobs = new ArrayList<>();
    for (Hit<Job> object: hits) {
      jobs.add(object.source());
    }
    return jobs;
  }

  private Query GetQueryForJobLocation(String jobLocation) {
    switch (jobLocation.toLowerCase(Locale.ROOT)) {
      case "":
        return new MatchAllQuery.Builder().build()._toQuery();
      case "ho chi minh", "ha noi", "da nang":
        return new MatchQuery.Builder().query(jobLocation).field("jobLocation").build()._toQuery();
      case "others":
        Query qHcm = new MatchQuery.Builder().query("ho chi minh").field("jobLocation").build()._toQuery();
        Query qHn = new MatchQuery.Builder().query("ha noi").field("jobLocation").build()._toQuery();
        Query qDn = new MatchQuery.Builder().query("da nang").field("jobLocation").build()._toQuery();
        return new BoolQuery.Builder().mustNot(qHcm, qHn, qDn).build()._toQuery();
    };
    return null;
  }
  private void CopyData(Job data, Job job) {
    job.setJobId(data.getJobId());
    job.setEmployerId(data.getEmployerId());
    job.setJobTitle(data.getJobTitle());
    job.setJobDescription(data.getJobDescription());
    job.setJobLocation(data.getJobLocation());
    job.setJobType(data.getJobType());
    job.setJobCategory(data.getJobCategory());
    job.setJobSalary(data.getJobSalary());
    job.setPostedAt(data.getPostedAt());
    job.setClosingAt(data.getClosingAt());
  }
  private List<String> GetListFieldsForSearching() {
    List<String> fields = new ArrayList<>();
    fields.add("jobTitle");
    fields.add("jobType");
    fields.add("jobCategory");
    return fields;
  }

  private String ChangeDateFormatBeforeInserting(String date) throws ParseException {
    SimpleDateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd");
    SimpleDateFormat outputFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    return outputFormat.format(inputFormat.parse(date));
  }
}
