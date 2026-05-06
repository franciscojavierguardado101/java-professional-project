# ── Stage 1: Build ────────────────────────────────────────────────────────────
# Use the official Maven image with Java 21 to compile and package the app
FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /app

# Copy pom.xml first — Docker caches this layer so dependencies aren't
# re-downloaded on every build unless pom.xml actually changes
COPY pom.xml .
RUN mvn dependency:go-offline -q

# Copy source code and build the JAR, skipping tests (tests run in CI)
COPY src ./src
RUN mvn package -DskipTests -q

# ── Stage 2: Runtime ──────────────────────────────────────────────────────────
# Use a smaller JRE-only image — no compiler or Maven needed at runtime
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy only the built JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Railway injects PORT automatically — default to 8080 locally
EXPOSE 8080

# Activate the prod Spring profile so application-prod.properties is loaded
ENTRYPOINT ["java", "-Dspring.profiles.active=prod", "-jar", "app.jar"]
