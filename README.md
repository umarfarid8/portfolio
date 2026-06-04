# 🚀 Umar Farid — Developer Portfolio

<div align="center">

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite)
![.NET](https://img.shields.io/badge/.NET-9-512BD4?style=for-the-badge&logo=dotnet)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss)
![Three.js](https://img.shields.io/badge/Three.js-3D-black?style=for-the-badge&logo=threedotjs)

**A full-stack, futuristic 3D portfolio website built with React, Three.js & ASP.NET Core**

[🌐 Live Demo](https://your-netlify-url.netlify.app) &nbsp;·&nbsp;
[📬 Contact](mailto:umarfarid034@gmail.com) &nbsp;·&nbsp;
[💼 LinkedIn](https://linkedin.com/in/umar-farid-dev)

</div>

---

## ✨ Features

- 🌌 **3D Interactive Canvas** — Three.js powered starfield, rotating cube & Earth globe
- 🌙 **Dark / Light Mode** — Smooth theme toggle with CSS variables, persisted in `localStorage`
- 🖱️ **Custom Cursor** — GPU-accelerated glowing dot cursor with zero lag
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop
- 🎞️ **Smooth Animations** — Framer Motion entry animations on every section
- 📬 **Working Contact Form** — Sends real emails via Gmail SMTP (MailKit backend)
- 🔒 **Input Validation** — Both client-side and server-side form validation
- ⚡ **Blazing Fast** — Vite build, lazy-loaded canvases, optimised assets
- 🎨 **Glassmorphism UI** — Frosted glass cards with violet/cyan gradient accents

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 18** | UI framework |
| **Vite 8** | Build tool & dev server |
| **Tailwind CSS v4** | Utility-first styling |
| **Three.js** | 3D canvas (Stars, Cube, Earth) |
| **Framer Motion** | Scroll & entry animations |
| **React Parallax Tilt** | 3D tilt effect on cards |
| **Axios** | HTTP client for contact form |
| **React Toastify** | Toast notifications |

### Backend
| Technology | Purpose |
|---|---|
| **ASP.NET Core 9** | REST API |
| **MailKit** | Gmail SMTP email sending |
| **Swashbuckle** | Swagger / OpenAPI docs |

---

## 📁 Project Structure

```
umar-portfolio/
├── frontend/                   # React + Vite app
│   ├── public/
│   │   ├── favicon.svg         # Custom UF gradient favicon
│   │   └── _redirects          # Netlify SPA redirect rule
│   ├── src/
│   │   ├── canvas/             # Three.js components
│   │   │   ├── Stars.jsx       # Animated starfield background
│   │   │   ├── Cube.jsx        # Interactive 3D cube
│   │   │   └── Earth.jsx       # Rotating 3D Earth globe
│   │   ├── components/         # Page sections
│   │   │   ├── Navbar.jsx      # Sticky nav + theme toggle
│   │   │   ├── Hero.jsx        # Landing with typewriter effect
│   │   │   ├── About.jsx       # Bio + education card
│   │   │   ├── Skills.jsx      # Tech stack grid
│   │   │   ├── Experience.jsx  # Work timeline
│   │   │   ├── Projects.jsx    # Project cards with tilt
│   │   │   ├── Certifications.jsx
│   │   │   ├── Contact.jsx     # Form + Earth globe
│   │   │   └── Footer.jsx
│   │   ├── constants/
│   │   │   └── index.js        # All site content (CV data)
│   │   ├── App.jsx             # Root + ThemeContext + Cursor
│   │   └── index.css           # CSS variables, global styles
│   ├── index.html
│   └── vite.config.js
│
├── backend/                    # ASP.NET Core Web API
│   └── PortfolioAPI/
│       ├── Controllers/
│       │   └── ContactController.cs
│       ├── Models/
│       │   └── EmailSettings.cs
│       ├── Services/
│       │   ├── IEmailService.cs
│       │   └── SmtpEmailService.cs
│       ├── Program.cs
│       └── appsettings.json    # ⚠️ Add your Gmail App Password here
│
├── netlify.toml                # Netlify build config
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [.NET 9 SDK](https://dotnet.microsoft.com/download)
- A Gmail account with **2-Step Verification** enabled

---

### 1. Clone the Repository

```bash
git clone https://github.com/umarfarid8/portfolio.git
cd portfolio
```

---

### 2. Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at → **http://localhost:5173**

---

### 3. Configure the Backend (Email)

Open `backend/PortfolioAPI/appsettings.json` and fill in your Gmail App Password:

```json
{
  "EmailSettings": {
    "SmtpHost": "smtp.gmail.com",
    "SmtpPort": 587,
    "SenderEmail": "umarfarid034@gmail.com",
    "SenderName": "Umar Farid Portfolio",
    "RecipientEmail": "umarfarid034@gmail.com",
    "AppPassword": "YOUR_16_CHAR_APP_PASSWORD"
  }
}
```

> **How to get a Gmail App Password:**
> 1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
> 2. Enable 2-Step Verification first (required)
> 3. Create a new App Password → copy the 16-character code

---

### 4. Run the Backend

```bash
cd backend/PortfolioAPI
dotnet run --launch-profile http
```

Backend API runs at → **http://localhost:5000**  
Swagger UI at → **http://localhost:5000/swagger**

---

## 🌐 Deployment

### Frontend → Netlify

The `netlify.toml` file is already configured:

```toml
[build]
  base    = "frontend"
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from   = "/*"
  to     = "/index.html"
  status = 200
```

**Steps:**
1. Push to GitHub
2. Connect repo to [Netlify](https://netlify.com)
3. Netlify auto-detects `netlify.toml` — just click **Deploy**

### Backend → Render / Azure / Railway

1. Create a new **Web Service** on [Render](https://render.com)
2. Set **Build Command:** `dotnet publish -c Release -o ./publish`
3. Set **Start Command:** `dotnet PortfolioAPI.dll`
4. Add environment variables for `EmailSettings`
5. Update the API URL in `frontend/src/components/Contact.jsx`

---

## 📸 Sections Overview

| Section | Description |
|---|---|
| **Hero** | Full-screen 3D starfield with typewriter role animation |
| **About** | Personal bio, education card (COMSATS University, CGPA 3.31) |
| **Skills** | Icon grid categorised by Frontend, Backend, Tools, DB |
| **Experience** | Timeline of work experience with animated cards |
| **Projects** | Tilt cards for featured projects with GitHub links |
| **Certifications** | Gold-bordered certification cards with shimmer animation |
| **Contact** | Contact form with 3D Earth + Gmail SMTP integration |

---

## ⚙️ Environment Variables

> ⚠️ Never commit real credentials to GitHub. Use environment variables in production.

| Variable | Description |
|---|---|
| `EmailSettings__AppPassword` | Gmail App Password (16 chars) |
| `EmailSettings__SenderEmail` | Your Gmail address |
| `EmailSettings__RecipientEmail` | Where contact emails are received |

---

## 🎨 Design System

| Token | Value |
|---|---|
| **Primary Accent** | `#915EFF` (Electric Violet) |
| **Secondary Accent** | `#00FFFF` (Cyan) |
| **Dark Background** | `#050816` (Deep Space) |
| **Light Background** | `#f4f5ff` (Soft Indigo White) |
| **Font** | Poppins + Inter (Google Fonts) |

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Made with ❤️ by **Umar Farid**

[umarfarid034@gmail.com](mailto:umarfarid034@gmail.com) &nbsp;·&nbsp; Sahiwal, Pakistan

</div>
