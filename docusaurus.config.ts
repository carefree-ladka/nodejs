import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Node.js + Express Academy",
  tagline:
    "From JavaScript basics to a deployed Express API — a complete, hands-on roadmap",
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://carefree-ladka.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served.
  // For GitHub project pages it is '/<projectName>/'.
  baseUrl: "/nodejs/",
  trailingSlash: false,

  // GitHub pages deployment config.
  organizationName: "carefree-ladka", // GitHub org/user
  projectName: "nodejs", // repo name
  deploymentBranch: "gh-pages",

  onBrokenLinks: "throw",

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "/", // Serve the docs at the site's root
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/carefree-ladka/nodejs/tree/main/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/docusaurus-social-card.jpg",
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Node.js + Express Academy",
      logo: {
        alt: "Node.js + Express Academy Logo",
        src: "img/nodejs-logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "courseSidebar",
          position: "left",
          label: "Curriculum",
        },
        {
          href: "https://nodejs.org/en/docs",
          label: "Node Docs",
          position: "right",
        },
        {
          href: "https://expressjs.com/",
          label: "Express Docs",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      logo: {
        alt: "Node.js + Express Academy",
        src: "img/nodejs-logo.svg",
        width: 44,
        height: 48,
      },
      links: [
        {
          title: "Curriculum",
          items: [
            { label: "Start here", to: "/" },
            {
              label: "Phase 0 — JavaScript",
              to: "/phase-00-javascript/overview",
            },
            { label: "Phase 3 — Express", to: "/phase-03-express/overview" },
            {
              label: "Phase 9 — Generative AI",
              to: "/phase-ai-engineering/overview",
            },
            {
              label: "Phase 10 — Deployment",
              to: "/phase-09-deployment/overview",
            },
            {
              label: "Portfolio Projects",
              to: "/portfolio-projects/overview",
            },
          ],
        },
        {
          title: "Official Docs",
          items: [
            { label: "Node.js", href: "https://nodejs.org/en/docs" },
            { label: "Express", href: "https://expressjs.com/" },
            {
              label: "MDN JavaScript",
              href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
            },
          ],
        },
        {
          title: "Tools",
          items: [
            { label: "Prisma", href: "https://www.prisma.io/docs" },
            { label: "Mongoose", href: "https://mongoosejs.com/docs/" },
            { label: "Jest", href: "https://jestjs.io/" },
            { label: "Docker", href: "https://docs.docker.com/" },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Node.js + Express Academy. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["bash", "json", "sql", "docker"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
