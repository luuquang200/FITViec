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
			+ "\"private_key_id\": \"00ef3976d5d1cc9c91d425aa14788a9d0af124f8\","
			+ "\"private_key\": \"-----BEGIN PRIVATE KEY-----\\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC43c+bDuwPPCcN\\nrp7yE5q5kzAh8r4GFuvk8jJhC4w45kuO133zYCeJAHJjqr0Q1J1yUBuazem/Vjj4\\nKZ93VD6v3ts2UCrqYz1o/p/P9GN/aAlmUaZn7+ddqgaUmhXO7CExpILmdrgNEiOe\\n9mIobRiD0hclysKcSmdhtHSOR2cLlCIzKe7FE6GngbA2peJDJljYqojVnTWc5z7T\\nNa183f6BQSowdL1+Ujt97KNk+jaKPWyiSZ2KjSmmyHrOoovHvrFNg3XTRWT+mPud\\nwGVmlgGqEnjNXgHGSnvZTHA+kMtECyDdl0DGa6EdoxzrNr6ugnlfivuGINvuV55k\\nelKr/WmdAgMBAAECggEABIGXpWp0M5zeQNWgVztGGr7tPe6aVjCp2F9U/guXg+2N\\nKvKyxcNyw0KpByfqyuW73sT4H0pkp77UzavKENETZBsVEdpbaXI41X3bbGjDIiBp\\nlj5oRYFSDPTviyDEZlJYLssZS7/aFat7Bc1wsBaUseXlnYy3OLMRmQ6ahrtT1jLg\\nEb+0bVWPoZCqEZoA39azz8nqsmAy4yOoMRJLNCEi4W/YHdHmVScaCX9mTsXp7h1B\\n2rM1J6nINGAt7dmFUX2bIBmY2JkU9F6cEqCKsbcCb7KEXtsYgR8Lfy+zJsOqLzjq\\noCuXRarc4ekVJ9d3kuit0Ic9Yog+yYsjXvJh/HV4YQKBgQDlP2OQG4FiYoHOgtT+\\nI/Si8tdY3co1/maszBWtg9bhk0t5UURqrIWpsSsyYJaP3WzTjfPeCiQYNXxZMUnd\\nUdOBVrOgUXrQPwrD6HQ/q//V+WgiS9g9hFsGGyuDhY+L96quPL/fMfsYcbtCjOWv\\nkh455Y+5yX67xlKg2Y69VS7SrQKBgQDOcJDl6E+rLY4+H9AsgA2hTpeTmM/94eFj\\nhMN9yBjRriTgR5bb/EamYEa4ipA/jKeUMtpMYeSP71pYQV7nggec+0NiGHAxAAvI\\ndNvCpynltSjswtR40zHI4CZ6tdROI7yyO9lQOz0V43Aip0qAlorAmud60pEWfroW\\nSaheeozAsQKBgElqb3wrEthrK57zDzsEUMgOdSCkhqmb+03DXf3fhuVewoDrobl3\\n3qZlcqwDerQ/+SYXA85L+Rs3pcb6neke11lIZuYksewXBF+RBgmOD7R61vqEx4+L\\n34qpENph34K3ohWCpv/Xhc5iPdImRThg1wU7mzeoa8m+zZ9tjOTdbs1RAoGACKGE\\nLViNHCcHb2l9Fp8z8q6Kf80/xOmQtsxyL+wRvZJ+UDIuCHx/p60Wx9hjN4T17KhD\\noDXnjG0BZfc1tJAnKVUH+C31YtcRpwvbtEOw6L2uPFfY8kRCLJfShAbeHXY5CWqf\\nJ0+SujuMEKbV4pJosqzHSMdM8ZfSx+PEek69W8ECgYEAphazwt6oo8H/AYF5lk/L\\nv3sFoQgb84y0x12r1Cs17Nt/JjOufFb/agDmeNF0Qe3+zZ3+eJZHFU9S663/TdRQ\\nrKv2MFfUs4gl7trrjMURUB71KqMafQA+QrlS3dBeMHLWgSXegZsutpLlmnbuBQsL\\nZ2CvQ7cMU3IfP1UouJyk0ms=\\n-----END PRIVATE KEY-----\\n\","
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
