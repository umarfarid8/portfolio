// ===================================================================
// Portfolio Constants — Real data from Umar Farid's CV (June 2026)
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
  "Software Engineer",
  ".NET Developer",
  "Full Stack Web Developer",
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
export const bio = `A highly motivated Computer Science graduate from COMSATS University Islamabad with hands-on experience building full-stack web applications using ASP.NET Core, C#, Entity Framework Core, and REST API skills — actively developing production-level projects. Seeking a .NET internship or junior developer role to contribute to real-world projects, apply strong OOP and REST API skills, and grow within an experienced engineering team.`;

// ── EDUCATION ──────────────────────────────────────────────────────
export const education = {
  degree:      "Bachelor of Science — Computer Science",
  university:  "COMSATS University Islamabad, Sahiwal Campus",
  period:      "Feb 2022 – Feb 2026",
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
    category: "Back-End",
    color: "#915EFF",
    skills: [
      { name: "ASP.NET Core",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg"          },
      { name: "C#",                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg"                   },
      { name: "Entity Framework",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg"          },
      { name: "Node.js",           icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"                   },
      { name: "Express.js",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"                },
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
      { name: "MongoDB",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"                   },
      { name: "Firebase",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg"                    },
    ],
  },
  {
    category: "Tools & Concepts",
    color: "#FFD700",
    skills: [
      { name: "Git",          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"                },
      { name: "GitHub",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"          },
      { name: "Visual Studio",icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg"},
      { name: "VS Code",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"         },
      { name: "Postman",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg"       },
    ],
  },
];

// ── EXPERIENCE ─────────────────────────────────────────────────────
export const experiences = [
  {
    role:    "ServiceHub — Service Marketplace Web App",
    company: "Freelance | Self-Employed",
    period:  "Jan 2025 – Present · Remote",
    icon:    "💻",
    color:   "#915EFF",
    bullets: [
      "Built a full-stack web platform connecting users with local service providers — users post a service need and the system suggests matching experts using an ML/AI matching engine.",
      "Developed and delivered full-stack web applications for clients using Git and GitHub, enabling smooth iteration and client handoffs.",
      "Maintained clean, version-controlled codebases using Git and GitHub; managing projects end-to-end from scoping to deployment.",
      "Tech stack: React.js, Node.js, Express.js, MongoDB, Tailwind CSS.",
    ],
  },
  {
    role:    ".NET Developer & Web Developer",
    company: "Freelancer | Self-Employed",
    period:  "Jul 2025 – Present · Remote",
    icon:    "⚡",
    color:   "#00FFFF",
    bullets: [
      "Final Year Project — Role: Full Stack Developer.",
      "Building production-grade .NET web applications with ASP.NET Core MVC, Entity Framework Core, and SQL Server.",
      "Implementing Repository Pattern for clean separation of data-access concerns.",
      "Applying CI/CD concepts, Agile/Scrum methodology, and automated testing (MSTest).",
    ],
  },
];

// ── PROJECTS ───────────────────────────────────────────────────────
export const projects = [
  {
    name:        "ExpenseManager",
    subtitle:    "Multi-User Financial Web Application",
    description:
      "Designed and built a multi-user personal finance platform enabling individuals to securely log and track real-time financial data. Implemented a distributed Repository Pattern to abstract data access from controllers, establishing strict multi-user data isolation by constraining SQL queries via encrypted claims identity tokens.",
    tech:   ["ASP.NET Core", "C#", "MVC", "Entity Framework Core", "SQL Server", "Bootstrap 5", "Razor Views"],
    github: "https://github.com/umarfaridse",
    demo:   "#",
    role:   "Sole Developer (Full Stack)",
    border: "rgba(145, 94, 255, 0.6)",
  },
  {
    name:        "ServiceHub",
    subtitle:    "Service Marketplace Web Application",
    description:
      "Full-stack web platform connecting users with local service providers. Users post a service need and the system suggests matching experts using an ML/AI matching engine. Built with React.js on the frontend and Node.js/Express/MongoDB on the backend.",
    tech:   ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    github: "https://github.com/umarfaridse",
    demo:   "#",
    role:   "Freelance Developer (Full Stack)",
    border: "rgba(0, 255, 255, 0.6)",
  },
  {
    name:        "School Administration & Management Dashboard",
    subtitle:    "Enterprise Desktop Application",
    description:
      "Enterprise-grade desktop management system for school administration. Implemented a distributed Repository Pattern to abstract data access from controllers. Automated lifecycle tracking of Entity Framework Core combined with the raw processing speed of ADO.NET.",
    tech:   [".NET Core", "C#", "WPF", "XAML", "Entity Framework Core", "ADO.NET", "SQL Server"],
    github: "https://github.com/umarfaridse",
    demo:   "#",
    role:   "Sole Developer (Full Stack)",
    border: "rgba(255, 107, 107, 0.6)",
  },
];

// ── CERTIFICATIONS ─────────────────────────────────────────────────
export const certifications = [
  {
    name:   ".NET Full Stack Foundation",
    issuer: "Board Infinity",
    date:   "Aug 2025",
    logo:   "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    color:  "#915EFF",
    link:   "#",
  },
  {
    name:   "Getting Started with Data Analytics on AWS",
    issuer: "Amazon Web Services",
    date:   "2025",
    logo:   "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    color:  "#FF9900",
    link:   "#",
  },
  {
    name:   "Frontend Development: Node.js, Express, MongoDB & REST APIs",
    issuer: "Board Infinity",
    date:   "Jul 2025",
    logo:   "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color:  "#00FFFF",
    link:   "#",
  },
  {
    name:   "Backend Development: Node.js, Express & REST APIs",
    issuer: "Board Infinity",
    date:   "2025",
    logo:   "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
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
    value: "03027896793",
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
