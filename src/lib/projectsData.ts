import QuizMaster from "../assets/imgs/QuizMaster.png";
import Tasknote from "../assets/imgs/Tasknote.png";

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
    technologies: "ts,tailwindcss,react,nextjs,firebase",
    link: "https://quizmasterr.vercel.app",
    sourceCode: "https://github.com/AmrTamer23/quizMaster",
  },
  {
    name: "Tasknote",
    description:
      "a todo and note-taking app. It's designed to effortlessly merge tasks and notes within a single category, saving you valuable time and helping you stay on top of your goals.",
    features: [
      "Store tasks and notes in the local storage",
      "Add, delete tasks and notes",
      "Combine tasks and notes and put them in different tabs in a relevant category",
      "Responsive Design",
    ],
    image: Tasknote.src,
    technologies: "ts,tailwindcss,react",
    link: "https://tasknote-ten.vercel.app",
    sourceCode: "https://github.com/AmrTamer23/tasknote",
  },
];
