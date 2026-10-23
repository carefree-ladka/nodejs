import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Roadmap from "@site/src/components/Roadmap";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const logo = useBaseUrl("/img/nodejs-logo.svg");
  return (
    <header className={styles.heroBanner}>
      <div className={clsx("container", styles.heroInner)}>
        <div className={styles.heroText}>
          <Heading as="h1" className={styles.heroTitle}>
            {siteConfig.title}
          </Heading>
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link className="button button--lg button--secondary" to="/intro">
              Start the Roadmap →
            </Link>
            <Link
              className="button button--lg button--outline button--secondary"
              to="/phase-03-express/overview"
            >
              Jump to Express
            </Link>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>11</span>
              <span className={styles.heroStatLabel}>phases</span>
            </div>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>4</span>
              <span className={styles.heroStatLabel}>portfolio projects</span>
            </div>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>0→🚀</span>
              <span className={styles.heroStatLabel}>basics to deploy</span>
            </div>
          </div>
        </div>
        <div className={styles.heroArt}>
          <img src={logo} alt="Node.js logo" className={styles.heroLogo} />
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="A complete, hands-on roadmap to learn Node.js and Express — from JavaScript fundamentals to a production deployment."
    >
      <HomepageHeader />
      <main>
        <section className={styles.section}>
          <HomepageFeatures />
        </section>
        <section className={clsx(styles.section, styles.sectionAlt)}>
          <Roadmap />
        </section>
      </main>
    </Layout>
  );
}
