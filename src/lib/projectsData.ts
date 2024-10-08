export const projects: Project[] = [
  {
    name: "dbrandria",
    domain: ".com",
    description:
      "During my time at Brandria, I was tasked with creating a new website for the company and migrating from their old WordPress site. I was responsible for implementing the requested design in the most optimized way possible and utilizing WordPress as a headless CMS, Also I was responsible for deploying the website on the server.",
    features: [
      "CI/CD using Github Actions.",
      "Dark/Light Mode.",
      "Internationalization.",
      "Responsive Design.",
      "Animations using Framer Motion.",
    ],
    technologies: [
      "ts",
      "tailwindcss",
      "react",
      "nextjs",
      "wordpress",
      "bash",
      "docker",
      "nginx",
      "github",
    ],
    link: "https://dbrandria.com",
    sourceCode: null,
    image: "https://i.ibb.co/zxjFMBc/Brandria.jpg",
  },

  {
    name: "Streakify",
    domain: ".netlify.app",
    description:
      "Streakify is a dynamic habit-tracking application designed to help users stay consistent with their routines.",
    fullDescription:
      "Designed to make habit-building easy and engaging. Users can effortlessly create custom habits, track their consistency, and gain insights through visual data representations. ",
    features: [
      "User authentication and management.",
      "Habit creation and tracking.",
      "Progress visualization.",
      "Responsive Design.",
    ],
    image: "https://i.ibb.co/sgSdh9W/Streakify.png",
    technologies: [
      "ts",
      "tailwindcss",
      "vue",
      "nuxtjs",
      "supabase",
      "postgres",
    ],
    link: "https://streakify23.netlify.app/",
    sourceCode: "https://github.com/AmrTamer23/streakify",
  },

  {
    name: "resetmycss",
    domain: "",
    description:
      "Ever find yourself manually copying CSS reset snippets into each new project? Save time and skip the repetitive setup with resetmycss!",
    fullDescription:
      "No more missed snippets, no more manual copy-pasting. Focus on building, and let resetmycss handle the rest.",
    features: [
      "Easily install and use.",
      "Efficient CSS reset.",
      "Cross-platform support (Windows, macOS, Linux).",
    ],
    image: "https://i.ibb.co/pKVScPR/resetmycss.png",
    technologies: ["js", "nodejs", "go"],
    link: "https://www.npmjs.com/package/resetmycss",
    sourceCode: "https://github.com/AmrTamer23/resetmycss",
  },
  {
    name: "Salamy",
    domain: ".space",
    description:
      "A website for mental health and wellness, where you can find articles and get mental health help.",
    fullDescription:
      "Started and maintained Salamy's Frontend, Dealt with Strapi's query builder mechanism, Kept Enhancing the website's performance, UI/UX and SEO.",
    features: [
      "Articles about mental health and wellness.",
      "Look for nearest mental health centers.",
      "Download, share, print articles.",
      "Responsive Design.",
    ],
    image:
      "https://res.cloudinary.com/dbiacrzqd/image/upload/f_auto,q_auto/kbhbgp2gupe3pnfncslq",
    technologies: ["ts", "tailwindcss", "react", "nextjs"],
    link: "https://salamy.space",
    sourceCode: null,
  },
  // {
  //   name: "Quiz Master",
  //   domain: ".vercel.app",
  //   description:
  //     "A quiz platform, Explore quizzes in various genres such as Geography, Computer Science, History, and Sports.",
  //   features: [
  //     "Authentication.",
  //     "Dark/Light Mode.",
  //     "Difficulty Decision based on points in each genre.",
  //     "Responsive Design.",
  //   ],
  //   image:
  //     "https://res.cloudinary.com/dbiacrzqd/image/upload/f_auto,q_auto/c8wrcoa2pvy8idrcafwv",
  //   technologies: ["ts", "tailwindcss", "react", "nextjs", "firebase"],
  //   link: "https://quizmasterr.vercel.app",
  //   sourceCode: "https://github.com/AmrTamer23/quizMaster",
  // },
];
