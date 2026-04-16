export interface Course {
  id: string;
  title: string;
  instructor: string;
  platform: string;
  description: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  url: string;
  icon: string;
  tags: string[];
  isFree: boolean;
  progress?: number;
  rating: number;
  enrolled?: boolean;
}

export const courseList: Course[] = [
  {
    id: "c1",
    title: "The Complete Web Developer Bootcamp",
    instructor: "Colt Steele",
    platform: "Udemy",
    description: "Learn web development from scratch. HTML, CSS, JavaScript, React, Node, MongoDB, and more.",
    category: "Web Development",
    level: "Beginner",
    duration: "63 hours",
    url: "https://www.udemy.com/course/the-web-developer-bootcamp/",
    icon: "🌐",
    tags: ["html", "css", "javascript", "react", "node"],
    isFree: false,
    progress: 45,
    rating: 4.7,
    enrolled: true,
  },
  {
    id: "c2",
    title: "CS50's Introduction to Computer Science",
    instructor: "David J. Malan",
    platform: "edX / Harvard",
    description: "Harvard's legendary intro to CS covering C, Python, SQL, JavaScript, and more.",
    category: "Computer Science",
    level: "Beginner",
    duration: "12 weeks",
    url: "https://cs50.harvard.edu/x/",
    icon: "🎓",
    tags: ["cs", "python", "c", "algorithms"],
    isFree: true,
    progress: 20,
    rating: 4.9,
    enrolled: true,
  },
  {
    id: "c3",
    title: "Machine Learning Specialization",
    instructor: "Andrew Ng",
    platform: "Coursera",
    description: "Learn foundational ML concepts including supervised/unsupervised learning, neural networks.",
    category: "Machine Learning",
    level: "Intermediate",
    duration: "3 months",
    url: "https://www.coursera.org/specializations/machine-learning-introduction",
    icon: "🤖",
    tags: ["ml", "ai", "python", "tensorflow"],
    isFree: false,
    progress: 0,
    rating: 4.9,
    enrolled: false,
  },
  {
    id: "c4",
    title: "React - The Complete Guide",
    instructor: "Maximilian Schwarzmüller",
    platform: "Udemy",
    description: "Dive in and learn React.js from scratch! Learn React, Hooks, Redux, React Router, Next.js.",
    category: "Web Development",
    level: "Intermediate",
    duration: "68 hours",
    url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
    icon: "⚛️",
    tags: ["react", "redux", "hooks", "javascript"],
    isFree: false,
    progress: 70,
    rating: 4.6,
    enrolled: true,
  },
  {
    id: "c5",
    title: "Python for Everybody Specialization",
    instructor: "Dr. Charles Severance",
    platform: "Coursera",
    description: "Learn to program and analyze data with Python. Develop programs to gather, clean, analyze and visualize data.",
    category: "Programming",
    level: "Beginner",
    duration: "8 months",
    url: "https://www.coursera.org/specializations/python",
    icon: "🐍",
    tags: ["python", "data", "programming"],
    isFree: false,
    progress: 100,
    rating: 4.8,
    enrolled: true,
  },
  {
    id: "c6",
    title: "Docker & Kubernetes: The Practical Guide",
    instructor: "Maximilian Schwarzmüller",
    platform: "Udemy",
    description: "Learn Docker, Docker Compose, Multi-Container Projects, Deployment and all about Kubernetes.",
    category: "DevOps",
    level: "Advanced",
    duration: "23 hours",
    url: "https://www.udemy.com/course/docker-kubernetes-the-practical-guide/",
    icon: "🐳",
    tags: ["docker", "kubernetes", "devops", "containers"],
    isFree: false,
    progress: 0,
    rating: 4.7,
    enrolled: false,
  },
];
