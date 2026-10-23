import type { ReactNode } from "react";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  icon: string;
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    icon: "🧭",
    title: "Learn in the Right Order",
    description: (
      <>
        Eleven phases, each building on the last — JavaScript, Node internals,
        HTTP, Express, databases, auth, testing, generative AI, and deployment.
        No skipping ahead and getting lost.
      </>
    ),
  },
  {
    icon: "🛠️",
    title: "Build, Don’t Just Read",
    description: (
      <>
        Every phase ends with a mini-project, plus a four-project portfolio
        track — from a typed CRUD API to a production AI agent you can show off.
      </>
    ),
  },
  {
    icon: "🚀",
    title: "Production from Day One",
    description: (
      <>
        Error handling, validation, security, and logging are treated as core
        skills — not afterthoughts — so what you build is actually shippable.
      </>
    ),
  },
];

function Feature({ icon, title, description }: FeatureItem) {
  return (
    <div className="col col--4">
      <div className="nodeCard">
        <div className={styles.featureIcon} aria-hidden="true">
          {icon}
        </div>
        <Heading as="h3" className={styles.featureTitle}>
          {title}
        </Heading>
        <p className={styles.featureDesc}>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <div className="container">
      <div className="row">
        {FeatureList.map((props, idx) => (
          <Feature key={idx} {...props} />
        ))}
      </div>
    </div>
  );
}
