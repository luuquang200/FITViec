# Use an official Maven image to build the application
FROM maven:3.8.5-openjdk-17 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the pom.xml file and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the entire project and build the application
COPY src ./src
RUN mvn package -DskipTests

# Use an official OpenJDK runtime as a parent image
FROM openjdk:17

# Set the working directory in the container
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/target/application-service-0.0.1-SNAPSHOT.jar /app/application-service-0.0.1-SNAPSHOT.jar

# Expose port 1200
EXPOSE 1200

# Run the JAR file
ENTRYPOINT ["java", "-jar", "application-service-0.0.1-SNAPSHOT.jar"]
