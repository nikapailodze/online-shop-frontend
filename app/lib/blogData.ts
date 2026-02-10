import type { BlogArticle } from "./blogs";

export type BlogCard = BlogArticle & { imageClass: string };

export const staticArticles: BlogCard[] = [
  {
    id: "1",
    category: "Clinical Research",
    readTime: "10 min",
    title: "Building Resilient Microservices in 2026",
    excerpt:
      "A practical guide to designing fault-tolerant distributed systems that gracefully handle failure and scale under pressure.",
    author: "Marcus Chen",
    date: "Feb 6, 2026",
    imageClass: "cardImageOne",
    tags: ["research", "clinical-guidelines", "case-studies", "metabolism"],
    createdAt: new Date("2026-02-06").getTime(),
    coverImage: "/mainBG.png",
    content:
      "## The Paradigm Shift\nDesigning resilient services now means designing for failure first.\n\n### Key Practices\n- Automated token generation\n- Component suggestion engines\n- Accessibility auditing\n- Cross-platform adaptation\n\nGetting started\nMap your dependencies and identify the highest-risk paths. Then introduce chaos testing to validate recovery behaviors.",
  },
  {
    id: "2",
    category: "Patient Education",
    readTime: "6 min",
    title: "The Psychology of Pricing Strategies",
    excerpt:
      "Understanding the cognitive biases behind pricing decisions and how smart businesses leverage them to win trust.",
    author: "Sarah Kim",
    date: "Feb 4, 2026",
    imageClass: "cardImageTwo",
    tags: ["patient-education", "nutrition", "hormones", "diabetes"],
    createdAt: new Date("2026-02-04").getTime(),
    content:
      "## Pricing is perception\nPrices are anchors. They tell a story before customers read a single word.\n\n### Behavioral levers\n- Anchoring and contrast\n- Loss aversion framing\n- Decoy pricing\n\nStart by testing a single change and measuring downstream conversions.",
  },
  {
    id: "3",
    category: "Endocrinology",
    readTime: "5 min",
    title: "Digital Minimalism in a Connected World",
    excerpt:
      "How intentional technology use can reduce anxiety, improve focus, and create space for what truly matters.",
    author: "James Park",
    date: "Feb 2, 2026",
    imageClass: "cardImageThree",
    tags: ["endocrinology", "thyroid", "pcos", "insulin"],
    createdAt: new Date("2026-02-02").getTime(),
    content:
      "## Quieting the noise\nMinimalism is about choice, not restriction.\n\n### Practical steps\n- Schedule focused blocks\n- Remove non-essential notifications\n- Curate your information diet\n\nThe goal is intentionality, not abstinence.",
  },
];
