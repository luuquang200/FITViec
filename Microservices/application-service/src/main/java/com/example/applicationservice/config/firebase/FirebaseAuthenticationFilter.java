package com.example.applicationservice.config.firebase;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.cloud.FirestoreClient;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class FirebaseAuthenticationFilter implements Filter {
  private static final String USERS_DOCUMENT = "users";

  @Override
  public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
    HttpServletRequest httpRequest = (HttpServletRequest) servletRequest;
    HttpServletResponse httpResponse = (HttpServletResponse) servletResponse;
    // Handle OPTIONS requests
    if ("OPTIONS".equalsIgnoreCase(httpRequest.getMethod())) {
      httpResponse.setStatus(HttpServletResponse.SC_OK);
      filterChain.doFilter(servletRequest, servletResponse);
    }
    String idToken = httpRequest.getHeader("Authorization");
    if (idToken != null && !idToken.isEmpty()) {
      httpRequest.setAttribute("accessToken", idToken);
      try {
        FirebaseAuth firebaseAuth = FirebaseAuth.getInstance();
        FirebaseToken decodedToken = firebaseAuth.verifyIdToken(idToken);
        Firestore firestore = FirestoreClient.getFirestore();
        UserInfo userInfo = this.getUserInfo(firestore, decodedToken);
        httpRequest.setAttribute("userInfo", userInfo);
        filterChain.doFilter(httpRequest, httpResponse);
      } catch (FirebaseAuthException e) {
        httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      } catch (ExecutionException | InterruptedException e) {
        throw new RuntimeException(e);
      }
    } else {
      httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    }
  }
  private UserInfo getUserInfo(Firestore firestore, FirebaseToken decodedToken) throws ExecutionException, InterruptedException {
    DocumentReference docRef = firestore.collection(USERS_DOCUMENT).document(decodedToken.getUid());
    ApiFuture<DocumentSnapshot> future = docRef.get();
    DocumentSnapshot document = future.get();
    if (document.exists()) {
      String userId = decodedToken.getUid();
      String fullName = document.getString("displayName");
      String email = document.getString("email");
      String role = document.getString("role");
      String avatar = decodedToken.getPicture();
      return new UserInfo(userId, fullName, email, role, avatar);
    }
    return new UserInfo("", "", "", "", "");
  }
}