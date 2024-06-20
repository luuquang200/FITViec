package com.example.jobservice;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@SpringBootApplication
public class JobServiceApplication {
	private static final String SERVICE_ACCOUNT_JSON = "{"
			+ "\"type\": \"service_account\","
			+ "\"project_id\": \"fit-viec\","
			+ "\"private_key_id\": \"85032ad07af88ab84467df8004f5e5a38db609f1\","
			+ "\"private_key\": \"-----BEGIN PRIVATE KEY-----\\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCaJP2eaYfgemcx\\nXLCCaO5cWWnJb2/PnykWV8pmMNj2yFQcqJ+1Lb/0I/AAJgl0dhgzzxLfWYTEC6he\\n8WuIGR3FdNz/bM97rIenAMl8os9EA14uoQ2geBdbJsmJXux/PbXmUntD/YabjB+X\\nqHrnKkvvUTbNcumuWvVGoucMgcPnw+VEUTzdGD4g2WoaGH/UUuEksfzHML61/Pl9\\n3aWjh/yx1u9BLpu85IAJqiRRDtjRh32Lphec+ERIbLFtxEcCYBaINDWqu16bvGTH\\nypWPeCN7JlpD0Fm32PFiiJ09zDU7aQ8t4TEe3A4kofEYtvdngDnE02KNbREHF3LD\\n17GPQc9XAgMBAAECggEAOFM294kxVOX1SjTH7MdB/i3P+YLGVRQgE+F9fGzyAu89\\nyQEW5sHyZ9gv7SX5A3zZqCjNCR8xY9+spRDLjb47wjjLPmx4voTTRsODXI8zdHNU\\nmW5RR+dKBY09THyKp44ZpzFRiI0eAD2qF6VBT7IFcEv5XgZU/FiRUr/Y9JmAR/Ib\\n6BNs/zYFzXrY9/js0lcDGveOXfkbYgsVH4Iz7JBICWzqrNWu7tfFvQid+vC8JNaR\\nTrl+CZ/YmkgoYCxtKJFIv+PY2F4HKbpSJqwB2dDoshL2L+wKNOkLZQ64m/a3NtSc\\nSM7R8yjDe6HnYWwwPxPE7KOfPV1uOqtnWPizujm0TQKBgQDX+gHSV2IjEoNLQFQn\\nEWbEVGiCZlHPOIyIGwGTylcAONUgF6bgsqvXAHzk1uxzOf6vWAYwdIpsylOcoxDc\\n1ywymmoo1ibrBtGwny6qvQ0PSl46YJ7qIHfcIcQXZvXCwQUvbuHte9qm+0004ddr\\n6fBzmrToSB86S4o2QCvghAROawKBgQC2taab1YSJKHzuaR3JiITc/+S4gjf+8Nwu\\nSgHT5DBwoOncyLTh7hf2wos1QF5NkLTfp8eODhsm3AdW4oU4LqElBila0T72e+b6\\nxDjxdP7BpyEuOrtERpjgYQCVRLDGBpN0RkdStb4r9gfYzSiX8mdZgajNhmTafTYU\\niO4dONQlxQKBgD2aRMy/OfGxBRwAtEAUeZCEVu7iynDlu0fTFCcYbqpUi43E0UeE\\nDvmbXQRUvUq8fwV6gQFvLFCNgT3LUTL8eNHSM3eEZcNhxYuwS7pNhB0ZZDkYeBtl\\nuWpjgy/9oRm0voriALUhP6OjSElOJYjVSE1hEjqy351cEIca1KkMXsITAoGAV7cX\\nmILGUS6945tVcJZ46rxzKt1hUqSBoDtpazeGxduKyrMUm865dH7rZBJV87kADMu4\\nsws0n9BMObsgJ9vDA0pU+kOwjZboSgWALPN1BrVc6ZvKobme1UHcjMzgbQFlMxI2\\nVY/pD6PbGotL7L60PTVRO/JEYtxv5SXj4uWQe90CgYAjKJJH5VApOJVYuI+DFBAu\\nemzaLEpQ1UaJntI6O2GBRoUOqM7eON7tBW5wbRwKilB8TYSCuf0LsfI+AXXXER0n\\nJ6z0BaMBD93+7Fjerlka51TGrRazBwQ021kflvm9PnlTZs/oX6rRsDKeE11Rw13g\\n+DoZE/htG9F5+CdXw3BYOQ==\\n-----END PRIVATE KEY-----\\n\","
			+ "\"client_email\": \"firebase-adminsdk-r2ed9@fit-viec.iam.gserviceaccount.com\","
			+ "\"client_id\": \"112251169538846308169\","
			+ "\"auth_uri\": \"https://accounts.google.com/o/oauth2/auth\","
			+ "\"token_uri\": \"https://oauth2.googleapis.com/token\","
			+ "\"auth_provider_x509_cert_url\": \"https://www.googleapis.com/oauth2/v1/certs\","
			+ "\"client_x509_cert_url\": \"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-r2ed9%40fit-viec.iam.gserviceaccount.com\","
			+ "\"universe_domain\": \"googleapis.com\""
			+ "}";

	public static void main(String[] args) throws IOException {
		InputStream serviceAccount = new ByteArrayInputStream(SERVICE_ACCOUNT_JSON.getBytes(StandardCharsets.UTF_8));
		FirebaseOptions options = new FirebaseOptions.Builder()
				.setCredentials(GoogleCredentials.fromStream(serviceAccount))
				.build();
		FirebaseApp.initializeApp(options);
		SpringApplication.run(JobServiceApplication.class, args);
	}
	@Bean
	public WebClient webClient() {
		return WebClient.builder().build();
	}
}
