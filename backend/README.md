# Skillora Backend

This directory will contain the Spring Boot REST API application for Skillora.

## Tech Stack

- **Framework**: Spring Boot 3.x
- **Language**: Java 17 / 21 LTS
- **Build Tool**: Maven (`pom.xml`) / Gradle (`build.gradle`)
- **Database**: PostgreSQL (with Spring Data JPA / Hibernate & Flyway/Liquibase migrations)
- **Security**: Spring Security with JWT

## Planned Structure

```text
backend/
├── src/
│   ├── main/
│   │   ├── java/com/skillora/
│   │   │   ├── config/          # Security, Web, and Database configurations
│   │   │   ├── controller/      # REST API Controllers
│   │   │   ├── dto/             # Data Transfer Objects
│   │   │   ├── model/           # JPA Entities
│   │   │   ├── repository/      # Spring Data Repositories
│   │   │   ├── service/         # Business Logic Layer
│   │   │   └── SkilloraApplication.java
│   │   └── resources/
│   │       ├── application.yml  # Application properties (DB, JWT, port)
│   │       └── db/migration/    # SQL migration scripts
│   └── test/                    # Unit and integration tests
├── pom.xml (or build.gradle)
└── README.md
```

