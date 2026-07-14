# syntax=docker/dockerfile:1

FROM maven:3.9.8-eclipse-temurin-21 AS build
WORKDIR /workspace

# Cache de dependências
COPY backend/pom.xml backend/pom.xml
WORKDIR /workspace/backend
RUN mvn -B -DskipTests dependency:go-offline

# Código-fonte
COPY backend/src ./src
RUN mvn -B -DskipTests package

FROM eclipse-temurin:21-jre
WORKDIR /app

COPY --from=build /workspace/backend/target/tattoo-backend-0.0.1-SNAPSHOT.jar /app/app.jar

EXPOSE 8080

CMD ["sh", "-c", "java -Dserver.port=${PORT:-8080} -jar /app/app.jar"]
