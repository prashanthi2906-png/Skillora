# Skillora

Skillora is a modern platform designed for collaborative skill development, learning tracking, and knowledge sharing.

---

## 🛠️ Technology Stack

- **Frontend**: [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vite.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [Java](https://www.oracle.com/java/) with [Spring Boot](https://spring.io/projects/spring-boot)
- **Database**: [PostgreSQL](https://www.postgresql.org/)

---

## 📁 Repository Structure (Planned)

```text
Skillora/
├── frontend/          # React + TypeScript + Vite + Tailwind CSS application
├── backend/           # Spring Boot REST API application
├── .gitignore         # Multi-stack gitignore (Frontend, Backend, IDE, OS)
└── README.md          # Project documentation and branching guidelines
```

---

## 🌿 Team Branching & Collaboration Guidelines

To maintain code quality and stability across the team, we follow a feature-branch workflow.

### 1. Branch Strategy

- **`main`**: The primary stable branch. Code in `main` is always tested, verified, and deployable. **Direct pushes to `main` are restricted.**
- **`feature/<feature-name>`**: Used for developing new features (e.g., `feature/user-auth`, `feature/course-catalog`).
- **`bugfix/<issue-name>`**: Used for fixing defects or resolving issues (e.g., `bugfix/login-validation`).
- **`chore/<task-name>`**: Used for maintenance, dependency updates, or repository configuration (e.g., `chore/project-setup`).

### 2. Workflow Rules

1. **Pull Latest Changes**:
   Always ensure your local `main` is up to date before creating a new branch:
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/<feature-name>
   ```

3. **Commit Guidelines**:
   Write clear, descriptive commit messages adhering to conventional commit formatting:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation updates
   - `style:` for styling or formatting changes
   - `refactor:` for code refactoring without behavior changes
   - `chore:` for tooling, dependencies, or repository configurations

4. **Pull Requests (PRs)**:
   - Push your feature branch to GitHub (`git push -u origin feature/<feature-name>`).
   - Open a Pull Request targeting `main`.
   - Provide a description of the changes and any testing performed.
   - Require code review and approvals prior to merging.
   - Delete feature branches post-merge to keep the repository clean.

---

## 🚀 Repository Setup

### Prerequisites

- **Node.js** (v18+ recommended) & **npm** / **pnpm**
- **Java Development Kit (JDK)** (version 17 or 21 LTS)
- **PostgreSQL** (version 15+)
- **Git**

