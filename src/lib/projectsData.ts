import type { Project } from "./types";
import QuizMaster from "../assets/QuizMaster.png";

export const projects: Project[] = [
  {
    name: "Quiz Master",
    description:
      "a quiz platform, Explore quizzes in various genres such as Geography, Computer Science, History, and Sports.",
    features: [
      "Authentication.",
      "Dark/Light Mode.",
      "Difficulty Decision based on points in each genre.",
      "Responsive Design.",
    ],
    image: QuizMaster.src,
    technologies: "react,nextjs,tailwindcss,firebase",
    link: "https://quizmasterr.vercel.app",
    sourceCode: "https://github.com/AmrTamer23/quizMaster",
  },
];
