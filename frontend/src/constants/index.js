// ===================================================================
// Portfolio Constants — Real data from Umar Farid's CV
// ===================================================================

// ── NAVIGATION ─────────────────────────────────────────────────────
export const navLinks = [
  { id: "about",          label: "About"      },
  { id: "skills",         label: "Skills"     },
  { id: "experience",     label: "Experience" },
  { id: "projects",       label: "Projects"   },
  { id: "certifications", label: "Certs"      },
  { id: "contact",        label: "Contact"    },
];

// ── TYPEWRITER PHRASES ─────────────────────────────────────────────
export const typewriterPhrases = [
  "Software Developer",
  ".NET Developer",
  "Full Stack Developer",
  "React.js Developer",
  "Open to Work 🟢",
];

// ── HERO STATS ─────────────────────────────────────────────────────
export const heroStats = [
  { value: "3.31", suffix: "/4.0", label: "CGPA at COMSATS" },
  { value: "4",    suffix: "+",    label: "Certifications"  },
  { value: "∞",    suffix: "",     label: "Open to Work ✅"  },
];

// ── BIO / OBJECTIVE ────────────────────────────────────────────────
export const bio = `Computer Science graduate from COMSATS University Islamabad with hands-on experience building full-stack web applications using ASP.NET Core, C#, Entity Framework Core, and React.js. Completed the .NET Full Stack Foundation certification and actively developing two production-level projects. Seeking a .NET internship or junior developer role to contribute to real-world projects, apply strong OOP and REST API skills, and grow within an experienced engineering team.`;

// ── EDUCATION ──────────────────────────────────────────────────────
export const education = {
  degree:      "Bachelor of Science — Computer Science",
  university:  "COMSATS University Islamabad, Sahiwal Campus",
  period:      "2022 – 2026",
  cgpa:        "3.31 / 4.00",
  coursework:  [
    "Object-Oriented Programming",
    "Data Structures & Algorithms",
    "Database Systems",
    "Web Engineering",
    "Software Engineering",
    "Operating Systems",
  ],
};

// ── SKILLS ─────────────────────────────────────────────────────────
export const skillCategories = [
  {
    category: "Back-End & Core",
    color: "#915EFF",
    skills: [
      { name: "ASP.NET Core",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg"          },
      { name: "C#",                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg"                   },
      { name: "Entity Framework",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg"          },
      { name: "REST APIs",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg"                },
      { name: "LINQ & OOP",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg"                   },
    ],
  },
  {
    category: "Front-End",
    color: "#00FFFF",
    skills: [
      { name: "React.js",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"           },
      { name: "JavaScript",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "HTML5",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"           },
      { name: "CSS3",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"             },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    ],
  },
  {
    category: "Databases",
    color: "#FF6B6B",
    skills: [
      { name: "SQL Server",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" },
      { name: "Firebase",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg"                    },
      { name: "MongoDB",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"                   },
    ],
  },
  {
    category: "Tools & Workflow",
    color: "#FFD700",
    skills: [
      { name: "Git",          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"                },
      { name: "GitHub",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"          },
      { name: "Visual Studio",icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg"},
      { name: "VS Code",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"         },
      { name: "Swagger",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swagger/swagger-original.svg"       },
    ],
  },
];

// ── EXPERIENCE ─────────────────────────────────────────────────────
export const experiences = [
  {
    role:    "Software Developer Intern",
    company: "Noorwave, Sahiwal — Onsite",
    period:  "Jan 2026 – June 2026",
    icon:    "💼",
    color:   "#915EFF",
    bullets: [
      "Served as a Software Developer Intern collaborating on web and desktop solutions.",
      "Worked on a demo project called \"Expense Manager\" developed in React to boost learning and proficiency across the required development platforms.",
      "Worked on a demo project called \"School Management System\" developed in WPF to get hands-on experience in desktop-based software development.",
    ],
  },
  {
    role:    "Final Year Project — Home Service Provider",
    company: "COMSATS University Islamabad",
    period:  "2025 – 2026",
    icon:    "⚡",
    color:   "#00FFFF",
    bullets: [
      "Developed a full-stack service marketplace connecting customers with verified local service providers through intelligent AI-powered matching.",
      "Built a decoupled architecture using React.js, ASP.NET Core Web API, Entity Framework Core, and SQL Server.",
      "Integrated OpenAI API to analyze customer requirements, provider profiles, ratings, and reviews for intelligent service provider recommendations.",
    ],
  },
];

// ── PROJECTS ───────────────────────────────────────────────────────
export const projects = [
  {
    name:        "Home Service Provider",
    subtitle:    "AI-Powered Service Marketplace",
    description:
      "A full-stack service marketplace connecting customers with verified local service providers through intelligent AI-powered matching. Built with a decoupled architecture using React.js, ASP.NET Core Web API, Entity Framework Core, and SQL Server. Integrated OpenAI API to analyze customer requirements, provider profiles, ratings, and reviews for intelligent provider recommendations.",
    tech:   ["React.js", "ASP.NET Core", "Entity Framework Core", "SQL Server", "OpenAI API"],
    github: "https://github.com/umarfaridse",
    demo:   "#",
    role:   "Full Stack Developer",
    border: "rgba(0, 255, 255, 0.6)",
  },
  {
    name:        "Expense Manager",
    subtitle:    "React Web Application",
    description:
      "Demo financial management project developed in React to boost learning, proficiency, and hands-on frontend web application architecture. Features interactive expense tracking, real-time calculation, category breakdowns, and responsive UI components.",
    tech:   ["React.js", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
    github: "https://github.com/umarfaridse",
    demo:   "#",
    role:   "Frontend Developer",
    border: "rgba(145, 94, 255, 0.6)",
  },
  {
    name:        "School Management System",
    subtitle:    "Desktop WPF Application",
    description:
      "Demo desktop administration system built in WPF to get hands-on experience in desktop-based software development, OOP principles, data storage, and school administrative lifecycle workflows.",
    tech:   [".NET", "C#", "WPF", "XAML", "Entity Framework Core", "SQL Server"],
    github: "https://github.com/umarfaridse",
    demo:   "#",
    role:   "Desktop App Developer",
    border: "rgba(255, 107, 107, 0.6)",
  },
];

// ── CERTIFICATIONS ─────────────────────────────────────────────────
export const certifications = [
  {
    name:   ".NET Full Stack Foundation",
    issuer: "Board Infinity",
    date:   "Aug 2025",
    logo:   "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg",
    color:  "#915EFF",
    link:   "#",
  },
  {
    name:   "Frontend Development using React",
    issuer: "Board Infinity",
    date:   "2025",
    logo:   "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color:  "#00FFFF",
    link:   "#",
  },
  {
    name:   "Getting Started with Data Analytics on AWS",
    issuer: "Amazon Web Services",
    date:   "Jul 2025",
    logo:   "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    color:  "#FF9900",
    link:   "#",
  },
  {
    name:   "Backend Development: Node.js, Express, MongoDB & REST APIs",
    issuer: "Board Infinity",
    date:   "2025",
    logo:   "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color:  "#FFD700",
    link:   "#",
  },
];

// ── CONTACT INFO ───────────────────────────────────────────────────
export const contactInfo = [
  {
    icon:  "📧",
    label: "Email",
    value: "umarfarid034@gmail.com",
    link:  "mailto:umarfarid034@gmail.com",
  },
  {
    icon:  "📱",
    label: "Phone",
    value: "+92 302 7896793",
    link:  "tel:+923027896793",
  },
  {
    icon:  "📍",
    label: "Location",
    value: "Sahiwal, Punjab, Pakistan",
    link:  null,
  },
  {
    icon:  "💼",
    label: "LinkedIn",
    value: "linkedin.com/in/umar-farid-dev",
    link:  "https://linkedin.com/in/umar-farid-dev",
  },
  {
    icon:  "🐙",
    label: "GitHub",
    value: "github.com/umarfaridse",
    link:  "https://github.com/umarfaridse",
  },
];
