import {
  CareerMatchResult,
  CareerRequirement,
  LearningResource,
  RoadmapItem,
  RoadmapItemStatus,
  RoadmapPriority,
  StudentProfile,
} from '../types';

/**
 * Curated catalog of authoritative official documentation and verified guides.
 * Valid, direct URLs only.
 */
export const TRUSTED_LEARNING_RESOURCES: Record<string, LearningResource[]> = {
  Docker: [
    {
      title: 'Docker Official Get Started Guide',
      url: 'https://docs.docker.com/get-started/',
      type: 'Documentation',
    },
    {
      title: 'Docker Compose & Multi-Container Workflows',
      url: 'https://docs.docker.com/compose/',
      type: 'Guide',
    },
  ],
  Kubernetes: [
    {
      title: 'Kubernetes Official Tutorials',
      url: 'https://kubernetes.io/docs/tutorials/',
      type: 'Documentation',
    },
    {
      title: 'Kubernetes Core Concepts & Architecture',
      url: 'https://kubernetes.io/docs/concepts/',
      type: 'Guide',
    },
  ],
  PostgreSQL: [
    {
      title: 'PostgreSQL Official Documentation',
      url: 'https://www.postgresql.org/docs/',
      type: 'Documentation',
    },
    {
      title: 'PostgreSQL Tutorial on MDN',
      url: 'https://developer.mozilla.org/en-US/docs/Glossary/SQL',
      type: 'Tutorial',
    },
  ],
  React: [
    {
      title: 'React Official Documentation (react.dev)',
      url: 'https://react.dev/learn',
      type: 'Documentation',
    },
  ],
  'Tailwind CSS': [
    {
      title: 'Tailwind CSS Official Documentation',
      url: 'https://tailwindcss.com/docs',
      type: 'Documentation',
    },
  ],
  Vite: [
    {
      title: 'Vite Getting Started & Guide',
      url: 'https://vitejs.dev/guide/',
      type: 'Documentation',
    },
  ],
  'Node.js': [
    {
      title: 'Node.js Official Documentation',
      url: 'https://nodejs.org/en/docs',
      type: 'Documentation',
    },
  ],
  'Spring Boot': [
    {
      title: 'Spring Boot Official Quickstart & Guides',
      url: 'https://spring.io/guides',
      type: 'Guide',
    },
  ],
  'Git & GitHub': [
    {
      title: 'GitHub Getting Started Documentation',
      url: 'https://docs.github.com/en/get-started',
      type: 'Documentation',
    },
  ],
  'REST APIs': [
    {
      title: 'MDN Web Docs: REST Architecture Guide',
      url: 'https://developer.mozilla.org/en-US/docs/Glossary/REST',
      type: 'Guide',
    },
  ],
  GraphQL: [
    {
      title: 'GraphQL Official Introduction & Tutorial',
      url: 'https://graphql.org/learn/',
      type: 'Documentation',
    },
  ],
  AWS: [
    {
      title: 'AWS Getting Started Resource Center',
      url: 'https://aws.amazon.com/getting-started/',
      type: 'Documentation',
    },
  ],
  Redis: [
    {
      title: 'Redis Official Documentation & Data Types',
      url: 'https://redis.io/docs/',
      type: 'Documentation',
    },
  ],
  MongoDB: [
    {
      title: 'MongoDB Manual & CRUD Tutorials',
      url: 'https://www.mongodb.com/docs/manual/',
      type: 'Documentation',
    },
  ],
  'CI/CD Pipelines': [
    {
      title: 'GitHub Actions Continuous Integration Guide',
      url: 'https://docs.github.com/en/actions',
      type: 'Guide',
    },
  ],
  Linux: [
    {
      title: 'Ubuntu Linux Command Line Tutorials',
      url: 'https://ubuntu.com/tutorials',
      type: 'Tutorial',
    },
  ],
  Microservices: [
    {
      title: 'Microservices Pattern Catalog & Architecture',
      url: 'https://microservices.io/',
      type: 'Guide',
    },
  ],
  'Jest / Unit Testing': [
    {
      title: 'Jest Official Getting Started Documentation',
      url: 'https://jestjs.io/docs/getting-started',
      type: 'Documentation',
    },
  ],
  TypeScript: [
    {
      title: 'TypeScript Official Handbook & Types Guide',
      url: 'https://www.typescriptlang.org/docs/',
      type: 'Documentation',
    },
  ],
  JavaScript: [
    {
      title: 'MDN Web Docs: JavaScript Guide',
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      type: 'Documentation',
    },
  ],
  Python: [
    {
      title: 'Python Official Tutorial (docs.python.org)',
      url: 'https://docs.python.org/3/tutorial/',
      type: 'Documentation',
    },
  ],
  Java: [
    {
      title: 'Official Java Developer Learning Path',
      url: 'https://dev.java/learn/',
      type: 'Documentation',
    },
  ],
  SQL: [
    {
      title: 'MDN SQL Reference & Database Guide',
      url: 'https://developer.mozilla.org/en-US/docs/Glossary/SQL',
      type: 'Documentation',
    },
  ],
  'C++': [
    {
      title: 'Standard C++ Reference & Language Guide',
      url: 'https://en.cppreference.com/w/',
      type: 'Documentation',
    },
  ],
  Go: [
    {
      title: 'Go Language Official Documentation',
      url: 'https://go.dev/doc/',
      type: 'Documentation',
    },
  ],
  Rust: [
    {
      title: 'The Rust Programming Language Book',
      url: 'https://doc.rust-lang.org/book/',
      type: 'Documentation',
    },
  ],
};

interface SkillContext {
  title: string;
  description: string;
  whyItMatters: string;
  estimatedDuration: string;
  defaultPriority: RoadmapPriority;
}

/**
 * Pedagogical metadata detailing why each competency matters for modern careers.
 */
const SKILL_METADATA: Record<string, SkillContext> = {
  Docker: {
    title: 'Containerization & Environment Isolation with Docker',
    description:
      'Master building lightweight container images, multi-stage Dockerfiles, networking, and docker-compose for reproducible environments.',
    whyItMatters:
      'Containerization eliminates environment discrepancies between development and production, forming the foundation of cloud-native infrastructure.',
    estimatedDuration: '2-3 weeks',
    defaultPriority: 'High',
  },
  Kubernetes: {
    title: 'Container Orchestration & Cluster Management with Kubernetes',
    description:
      'Understand Pods, Deployments, Services, ConfigMaps, and Ingress controllers to deploy and scale resilient microservices.',
    whyItMatters:
      'Kubernetes is the industry standard for automating container deployment, autoscaling, and self-healing in distributed engineering teams.',
    estimatedDuration: '3-4 weeks',
    defaultPriority: 'High',
  },
  PostgreSQL: {
    title: 'Relational Database Schema Design & Optimization with PostgreSQL',
    description:
      'Design normalized relational schemas, write complex joins, leverage indexes, transactions, and optimize query execution plans.',
    whyItMatters:
      'Relational data integrity and ACID compliance are fundamental requirements for production applications handling user records, transactions, and state.',
    estimatedDuration: '2-3 weeks',
    defaultPriority: 'High',
  },
  'Spring Boot': {
    title: 'Enterprise Backend Microservices with Spring Boot',
    description:
      'Build robust REST APIs using dependency injection, Spring Data JPA, security filters, validation, and production health actuators.',
    whyItMatters:
      'Spring Boot powers enterprise backend architectures worldwide, offering battle-tested stability and high throughput.',
    estimatedDuration: '3-4 weeks',
    defaultPriority: 'High',
  },
  React: {
    title: 'Component Architecture & State Workflows with React',
    description:
      'Design modular functional components, custom hooks, performant rendering, and state management patterns.',
    whyItMatters:
      'Modern web interfaces rely heavily on reactive component models to provide fluid, high-performance user experiences.',
    estimatedDuration: '2-3 weeks',
    defaultPriority: 'High',
  },
  'Node.js': {
    title: 'Asynchronous Server-Side Runtimes with Node.js',
    description:
      'Leverage the event loop, streams, Express or Fastify frameworks, middleware patterns, and non-blocking I/O.',
    whyItMatters:
      'Node.js enables unified JavaScript/TypeScript across both frontend and backend, ideal for real-time APIs and microservices.',
    estimatedDuration: '2-3 weeks',
    defaultPriority: 'High',
  },
  AWS: {
    title: 'Cloud Infrastructure & Managed Cloud Services on AWS',
    description:
      'Provision secure VPCs, compute instances (EC2), serverless functions (Lambda), object storage (S3), and IAM policies.',
    whyItMatters:
      'Cloud proficiency is essential for modern engineers to deploy, scale, and monitor distributed applications globally.',
    estimatedDuration: '3-4 weeks',
    defaultPriority: 'High',
  },
  'CI/CD Pipelines': {
    title: 'Continuous Integration & Delivery Pipelines with GitHub Actions',
    description:
      'Configure automated testing workflows, linting checks, build artifact creation, and automated deployment pipelines.',
    whyItMatters:
      'Automated CI/CD guarantees fast feedback loops, early regression detection, and dependable releases.',
    estimatedDuration: '1-2 weeks',
    defaultPriority: 'High',
  },
  Redis: {
    title: 'High-Performance In-Memory Caching & Session Storage with Redis',
    description:
      'Implement cache-aside patterns, key expiration, pub/sub messaging, and distributed locking mechanisms.',
    whyItMatters:
      'Caching dramatically lowers database query latency and enables high-scale read throughput.',
    estimatedDuration: '1-2 weeks',
    defaultPriority: 'Medium',
  },
  MongoDB: {
    title: 'Document-Oriented NoSQL Datastores with MongoDB',
    description:
      'Model semi-structured documents, use aggregation pipelines, build compound indexes, and handle schema evolution.',
    whyItMatters:
      'NoSQL datastores provide flexible data modeling for dynamic content, event logs, and rapid product prototyping.',
    estimatedDuration: '1-2 weeks',
    defaultPriority: 'Medium',
  },
  Linux: {
    title: 'Linux Operating System Administration & Shell Scripting',
    description:
      'Navigate directory hierarchies, manage process lifecycles, configure file permissions, and write automated Bash scripts.',
    whyItMatters:
      'Almost all serverless, cloud, and containerized workloads run on Linux distributions.',
    estimatedDuration: '2 weeks',
    defaultPriority: 'High',
  },
  Microservices: {
    title: 'Distributed Microservices Architecture & Fault Tolerance',
    description:
      'Implement service discovery, API gateways, circuit breaker patterns, distributed tracing, and idempotent communication.',
    whyItMatters:
      'Large systems depend on modular, independently deployable services to scale engineering teams and system availability.',
    estimatedDuration: '3 weeks',
    defaultPriority: 'High',
  },
  'REST APIs': {
    title: 'RESTful API Engineering, Versioning & Security',
    description:
      'Master HTTP semantics, resource hierarchies, JSON payload structures, error status codes, authentication, and rate limiting.',
    whyItMatters:
      'RESTful APIs are the ubiquitous communication medium between client applications and server systems.',
    estimatedDuration: '1-2 weeks',
    defaultPriority: 'High',
  },
  GraphQL: {
    title: 'Declarative API Querying & Schema Definition with GraphQL',
    description:
      'Build schema definitions, resolvers, mutation workflows, and avoid over-fetching and under-fetching network queries.',
    whyItMatters:
      'GraphQL enables frontends to query precisely the data required in a single request, improving mobile and client latency.',
    estimatedDuration: '1-2 weeks',
    defaultPriority: 'Medium',
  },
  'Jest / Unit Testing': {
    title: 'Automated Test Suites, Mocking & Regression Prevention with Jest',
    description:
      'Write unit tests, integration assertions, mock external dependencies, and enforce code coverage standards.',
    whyItMatters:
      'A robust test suite gives engineers confidence to refactor code without introducing silent bugs into production.',
    estimatedDuration: '1-2 weeks',
    defaultPriority: 'High',
  },
  'Tailwind CSS': {
    title: 'Utility-First Responsive Design Systems with Tailwind CSS',
    description:
      'Implement mobile-first responsive breakpoints, dark mode themes, reusable design tokens, and clean layout patterns.',
    whyItMatters:
      'Tailwind speeds up UI development while ensuring consistent spacing, typography, and color tokens.',
    estimatedDuration: '1 week',
    defaultPriority: 'Medium',
  },
  Vite: {
    title: 'Modern Frontend Tooling & Bundle Optimization with Vite',
    description:
      'Understand ES module dev servers, fast hot module replacement (HMR), build optimizations, and asset handling.',
    whyItMatters:
      'Vite drastically improves developer iteration speed with instantaneous build reloads.',
    estimatedDuration: '1 week',
    defaultPriority: 'Low',
  },
  'Git & GitHub': {
    title: 'Version Control, Collaborative Branching & Code Reviews',
    description:
      'Practice Git branching strategies, pull requests, resolving merge conflicts, rebasing, and conventional commits.',
    whyItMatters:
      'Collaborative version control is non-negotiable for professional software development teams.',
    estimatedDuration: '1 week',
    defaultPriority: 'High',
  },
};

/**
 * Returns learning resources for a given skill. If an official entry is not listed,
 * returns a structured search suggestion rather than fabricating a URL.
 */
export function getResourcesForSkill(skillName: string): LearningResource[] {
  const normalized = skillName.trim();
  const directMatch = TRUSTED_LEARNING_RESOURCES[normalized];
  if (directMatch && directMatch.length > 0) {
    return directMatch;
  }

  // Case-insensitive lookup
  const entry = Object.entries(TRUSTED_LEARNING_RESOURCES).find(
    ([k]) => k.toLowerCase() === normalized.toLowerCase()
  );
  if (entry) {
    return entry[1];
  }

  // Search recommendation fallback
  return [
    {
      title: `Search Official ${normalized} Documentation`,
      searchQuery: `${normalized} official documentation tutorials`,
      type: 'Search',
    },
  ];
}

/**
 * Builds personalized capstone project details aligned with the selected career.
 */
function getProjectForCareer(
  career: CareerRequirement,
  missingSkills: string[],
  studentLanguages: string[]
): { title: string; description: string; whyItMatters: string; duration: string } {
  const primaryLang = studentLanguages[0] || 'Modern Language Stack';

  switch (career.id) {
    case 'full-stack-dev':
      return {
        title: 'Full-Stack Web Application with Authenticated APIs & Relational Database',
        description: `Build an end-to-end web platform featuring responsive UI, robust authentication, RESTful APIs, and persistent PostgreSQL storage. Target closing gaps in ${
          missingSkills.slice(0, 2).join(' & ') || 'deployment'
        }.`,
        whyItMatters:
          'Demonstrates end-to-end competence connecting responsive frontends to secure, data-backed backend services.',
        duration: '3-4 weeks',
      };
    case 'backend-engineer':
      return {
        title: 'High-Throughput Microservice Architecture with Containerized Database',
        description: `Design a scalable backend microservice featuring relational schema persistence, Redis caching, structured logging, and containerized deployment via Docker.`,
        whyItMatters:
          'Proves your ability to architect server-side resilience, optimized database queries, and decoupled microservices.',
        duration: '3-4 weeks',
      };
    case 'frontend-specialist':
      return {
        title: 'Responsive Component Design System & State Management Suite',
        description: `Create an accessible, fluid web application implementing a custom design token system, stateful dashboards, and comprehensive Jest unit testing.`,
        whyItMatters:
          'Hiring teams evaluate frontend candidates on component modularity, accessibility, and clean reactive state management.',
        duration: '3-4 weeks',
      };
    case 'cloud-devops-engineer':
      return {
        title: 'Automated GitOps Infrastructure & CI/CD Pipeline Deployment',
        description: `Set up a complete automated pipeline: Docker containerization, GitHub Actions CI/CD validation, and Kubernetes cluster orchestration on cloud infrastructure.`,
        whyItMatters:
          'Provides concrete proof of automating reliable release cycles and managing resilient cloud infrastructure.',
        duration: '3-4 weeks',
      };
    case 'data-engineer':
      return {
        title: 'Automated Data Ingestion & Transformation Pipeline',
        description: `Develop a reliable ETL pipeline ingesting high-volume data streams, transforming records, and persisting clean analytical datasets into PostgreSQL.`,
        whyItMatters:
          'Demonstrates data engineering competence in pipeline reliability, schema migration, and analytical querying.',
        duration: '3-4 weeks',
      };
    default:
      return {
        title: `Comprehensive Capstone Project for ${career.title}`,
        description: `Synthesize your competencies in ${primaryLang} and ${
          missingSkills.slice(0, 2).join(', ') || 'core tools'
        } into a production-grade portfolio showcase.`,
        whyItMatters:
          'A cohesive practical project is the most convincing asset during technical portfolio reviews and hiring interviews.',
        duration: '3-4 weeks',
      };
  }
}

/**
 * Builds a deterministic, personalized learning roadmap structured into 4 stages:
 * Foundations, Core Skills, Practical Projects, and Career Preparation.
 *
 * Guarantees:
 * - Preserves saved statuses for relevant items (does not reset them on recalculation).
 * - Newly recommended items default to 'Not Started' (never silently completed).
 * - Avoids duplicate skills across stages.
 */
export function generatePersonalizedRoadmap(
  profile: StudentProfile,
  match: CareerMatchResult,
  savedStatuses: Record<string, RoadmapItemStatus> = {}
): RoadmapItem[] {
  const career = match.career;
  const missingSkills = match.missingSkills || [];
  const studentLanguages = (profile.languages || []).map((l) => l.name);
  const studentLanguagesLower = new Set(studentLanguages.map((l) => l.toLowerCase()));

  const roadmapItems: RoadmapItem[] = [];
  const addedSkillSlugs = new Set<string>();

  const getOrAssignStatus = (itemId: string): RoadmapItemStatus => {
    return savedStatuses[itemId] || 'Not Started';
  };

  // -------------------------------------------------------------
  // STAGE 1: Foundations
  // -------------------------------------------------------------
  const missingReqLanguages = (career.requiredLanguages || []).filter(
    (lang) => !studentLanguagesLower.has(lang.toLowerCase())
  );

  if (missingReqLanguages.length > 0) {
    missingReqLanguages.forEach((lang) => {
      const slug = `foundations-${lang.toLowerCase()}`;
      if (addedSkillSlugs.has(slug)) return;
      addedSkillSlugs.add(slug);

      const itemId = `${career.id}_foundations_${lang.toLowerCase()}`;
      roadmapItems.push({
        id: itemId,
        skill: lang,
        title: `Foundations of ${lang} for ${career.title}`,
        stage: 'Foundations',
        category: 'Foundation',
        description: `Establish core fluency in ${lang}: syntax, data structures, control flow, and memory/type models required for ${career.title}.`,
        whyItMatters: `${lang} is an explicit core language requirement for ${career.title}. Mastering syntax and conventions is essential before building framework services.`,
        priority: 'High',
        estimatedDuration: '2-3 weeks',
        estimatedWeeks: 2,
        skillsCovered: [lang],
        status: getOrAssignStatus(itemId),
        resources: getResourcesForSkill(lang),
      });
    });
  } else {
    // If student already has the required languages, reinforce primary language architecture
    const topLang = studentLanguages[0] || 'Language Fundamentals';
    const slug = `foundations-${topLang.toLowerCase()}`;
    addedSkillSlugs.add(slug);
    const itemId = `${career.id}_foundations_${topLang.toLowerCase()}`;

    roadmapItems.push({
      id: itemId,
      skill: topLang,
      title: `Clean Architecture & Design Patterns in ${topLang}`,
      stage: 'Foundations',
      category: 'Foundation',
      description: `Refine your existing ${topLang} foundations with modular architecture, error handling conventions, and design patterns.`,
      whyItMatters: `Strong language design foundations distinguish junior developers from job-ready engineers.`,
      priority: 'High',
      estimatedDuration: '1-2 weeks',
      estimatedWeeks: 2,
      skillsCovered: [topLang, 'Design Patterns'],
      status: getOrAssignStatus(itemId),
      resources: getResourcesForSkill(topLang),
    });
  }

  // -------------------------------------------------------------
  // STAGE 2: Core Skills (Targeting Actual Missing Gaps)
  // -------------------------------------------------------------
  // Prioritize required missing skills first, then recommended missing skills
  const requiredMissing = missingSkills.filter((skill) =>
    (career.requiredSkills || []).some((req) => req.toLowerCase() === skill.toLowerCase())
  );

  const recommendedMissing = missingSkills.filter(
    (skill) =>
      !requiredMissing.some((req) => req.toLowerCase() === skill.toLowerCase()) &&
      (career.recommendedSkills || []).some((rec) => rec.toLowerCase() === skill.toLowerCase())
  );

  const remainingMissing = missingSkills.filter(
    (s) =>
      !requiredMissing.some((req) => req.toLowerCase() === s.toLowerCase()) &&
      !recommendedMissing.some((rec) => rec.toLowerCase() === s.toLowerCase())
  );

  const prioritizedGaps = [...requiredMissing, ...recommendedMissing, ...remainingMissing];

  if (prioritizedGaps.length > 0) {
    prioritizedGaps.forEach((skill) => {
      const slug = skill.toLowerCase().trim();
      if (addedSkillSlugs.has(slug)) return;
      addedSkillSlugs.add(slug);

      const meta = SKILL_METADATA[skill] || {
        title: `Core Competency in ${skill}`,
        description: `Master fundamental principles, hands-on implementation patterns, and best practices for ${skill}.`,
        whyItMatters: `Directly required to close your skill gap for ${career.title} and reach industry production readiness.`,
        estimatedDuration: '2-3 weeks',
        defaultPriority: (career.requiredSkills || []).some(
          (req) => req.toLowerCase() === skill.toLowerCase()
        )
          ? 'High'
          : 'Medium',
      };

      const isRequired = (career.requiredSkills || []).some(
        (req) => req.toLowerCase() === skill.toLowerCase()
      );
      const priority: RoadmapPriority = isRequired ? 'High' : meta.defaultPriority;
      const itemId = `${career.id}_skill_${slug.replace(/[^a-z0-9]/g, '-')}`;

      roadmapItems.push({
        id: itemId,
        skill,
        title: meta.title,
        stage: 'Core Skills',
        category: 'Core',
        description: meta.description,
        whyItMatters: meta.whyItMatters,
        priority,
        estimatedDuration: meta.estimatedDuration,
        estimatedWeeks: 3,
        skillsCovered: [skill],
        status: getOrAssignStatus(itemId),
        resources: getResourcesForSkill(skill),
      });
    });
  } else {
    // If student has already closed all declared skills, add an Advanced Mastery Core milestone
    const advancedTopic = career.requiredSkills[0] || 'Advanced Engineering';
    const slug = `advanced-${advancedTopic.toLowerCase()}`;
    addedSkillSlugs.add(slug);
    const itemId = `${career.id}_advanced_${slug.replace(/[^a-z0-9]/g, '-')}`;

    roadmapItems.push({
      id: itemId,
      skill: advancedTopic,
      title: `Advanced Production Optimization in ${advancedTopic}`,
      stage: 'Core Skills',
      category: 'Core',
      description: `Deepen your mastery of ${advancedTopic}: concurrency profiling, memory leak prevention, and high-throughput tuning.`,
      whyItMatters: `You have met the baseline requirements for ${career.title}; deepening advanced topics elevates your interview competitiveness.`,
      priority: 'High',
      estimatedDuration: '2 weeks',
      estimatedWeeks: 2,
      skillsCovered: [advancedTopic, 'Performance Optimization'],
      status: getOrAssignStatus(itemId),
      resources: getResourcesForSkill(advancedTopic),
    });
  }

  // -------------------------------------------------------------
  // STAGE 3: Practical Projects
  // -------------------------------------------------------------
  const projectInfo = getProjectForCareer(career, missingSkills, studentLanguages);
  const projectItemId = `${career.id}_capstone_project`;

  roadmapItems.push({
    id: projectItemId,
    skill: career.title,
    title: projectInfo.title,
    stage: 'Practical Projects',
    category: 'Project',
    description: projectInfo.description,
    whyItMatters: projectInfo.whyItMatters,
    priority: 'High',
    estimatedDuration: projectInfo.duration,
    estimatedWeeks: 4,
    skillsCovered: [career.title, ...missingSkills.slice(0, 2)],
    status: getOrAssignStatus(projectItemId),
    resources: [
      {
        title: `GitHub Portfolio Deployment Guide`,
        url: 'https://docs.github.com/en/get-started',
        type: 'Guide',
      },
    ],
  });

  // -------------------------------------------------------------
  // STAGE 4: Career Preparation
  // -------------------------------------------------------------
  const prepItemId = `${career.id}_career_prep`;

  roadmapItems.push({
    id: prepItemId,
    skill: 'System Design & Code Review',
    title: 'System Design, Architecture Walkthroughs & Interview Readiness',
    stage: 'Career Preparation',
    category: 'Advanced',
    description: `Practice whiteboarding architecture diagrams, explaining trade-offs (latency vs consistency), conducting code reviews, and answering scenario-based interview questions for ${career.title}.`,
    whyItMatters:
      'Technical interviewers look for clear articulation of architectural trade-offs and methodical problem-solving.',
    priority: 'Medium',
    estimatedDuration: '1-2 weeks',
    estimatedWeeks: 2,
    skillsCovered: ['System Design', 'Code Review', 'Technical Communication'],
    status: getOrAssignStatus(prepItemId),
    resources: [
      {
        title: 'Microservices Pattern Language & Architecture Guide',
        url: 'https://microservices.io/',
        type: 'Guide',
      },
    ],
  });

  return roadmapItems;
}
