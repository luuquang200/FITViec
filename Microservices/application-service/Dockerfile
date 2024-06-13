# Use an official OpenJDK runtime as a parent image
FROM openjdk:17
# Set the working directory in the container
WORKDIR /app

# Copy the project's jar file to the container
ADD target/application-service-0.0.1-SNAPSHOT.jar application-service-0.0.1-SNAPSHOT.jar
COPY target/application-service-0.0.1-SNAPSHOT.jar /app/application-service-0.0.1-SNAPSHOT.jar

# Run the jar file
ENTRYPOINT ["java", "-jar", "application-service-0.0.1-SNAPSHOT.jar"]