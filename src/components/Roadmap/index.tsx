import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type Phase = {
  badge: string;
  title: string;
  description: string;
  to: string;
  variant?: 'default' | 'ai' | 'projects';
};

const PHASES: Phase[] = [
  {
    badge: '0',
    title: 'JavaScript Foundations',
    description: 'Syntax, functions, async/await, modules, prototypes — the prerequisite for everything.',
    to: '/phase-00-javascript/overview',
  },
  {
    badge: '1',
    title: 'Node.js Fundamentals',
    description: 'The event loop, modules, core built-ins, streams, concurrency, and npm.',
    to: '/phase-01-node-fundamentals/overview',
  },
  {
    badge: '2',
    title: 'HTTP & Web',
    description: 'Methods, status codes, REST design, CORS, cookies, and caching.',
    to: '/phase-02-http-web/overview',
  },
  {
    badge: '3',
    title: 'Express Fundamentals',
    description: 'Routing, middleware, req/res, plus TypeScript and Express vs Fastify.',
    to: '/phase-03-express/overview',
  },
  {
    badge: '4',
    title: 'Structure & Best Practices',
    description: 'Layered architecture, config, centralized errors, validation, logging.',
    to: '/phase-04-structure/overview',
  },
  {
    badge: '5',
    title: 'Databases',
    description: 'PostgreSQL + Prisma or MongoDB + Mongoose, transactions, indexes.',
    to: '/phase-05-databases/overview',
  },
  {
    badge: '6',
    title: 'Auth & Security',
    description: 'Password hashing, JWT vs sessions, RBAC, and the security essentials.',
    to: '/phase-06-auth-security/overview',
  },
  {
    badge: '7',
    title: 'Testing',
    description: 'Unit and integration tests for Express APIs with Jest/Vitest + supertest.',
    to: '/phase-07-testing/overview',
  },
  {
    badge: '8',
    title: 'Advanced Topics',
    description: 'Pagination, uploads, caching, background jobs, WebSockets, SSE, docs.',
    to: '/phase-08-advanced/overview',
  },
  {
    badge: '9',
    title: 'Generative AI Engineering',
    description: 'LLM APIs, RAG with embeddings, safe tool calling & agents, production AI.',
    to: '/phase-ai-engineering/overview',
    variant: 'ai',
  },
  {
    badge: '10',
    title: 'DevOps & Deployment',
    description: 'Git, Linux, Docker, CI/CD, hosting, and production hardening.',
    to: '/phase-09-deployment/overview',
  },
  {
    badge: '★',
    title: 'Portfolio Projects',
    description: 'Four shippable projects, from a typed CRUD API to a production AI agent.',
    to: '/portfolio-projects/overview',
    variant: 'projects',
  },
];

function PhaseCard({phase}: {phase: Phase}) {
  const badgeClass = clsx(styles.badge, {
    [styles.badgeAi]: phase.variant === 'ai',
    [styles.badgeProjects]: phase.variant === 'projects',
  });
  return (
    <Link to={phase.to} className="nodeCardLink">
      <div className="nodeCard">
        <span className={badgeClass}>{phase.badge}</span>
        <div className={styles.cardTitle}>{phase.title}</div>
        <p className={styles.cardDesc}>{phase.description}</p>
        <span className={styles.cardArrow}>Explore →</span>
      </div>
    </Link>
  );
}

export default function Roadmap(): ReactNode {
  return (
    <div className="container">
      <Heading as="h2" className="sectionHeading">
        The Complete Roadmap
      </Heading>
      <p className="sectionSub">
        Eleven phases plus a portfolio track. Each one builds on the last — start
        at the top and work down.
      </p>
      <div className={styles.grid}>
        {PHASES.map((phase) => (
          <PhaseCard key={phase.title} phase={phase} />
        ))}
      </div>
    </div>
  );
}
