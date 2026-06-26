# Nithish Kumar – Engineering Portfolio
A high-performance, animation-rich web portfolio bridging Artificial Intelligence and Full-Stack Software Engineering.
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![ISC License](https://img.shields.io/badge/license-ISC-blue.svg?style=for-the-badge)
> [!NOTE]
> Insert UI screenshot / Demo GIF here
## 📖 Overview
This repository houses the personal portfolio and technical blog of Nithish Kumar, deliberately engineered to showcase a duality of expertise across Data Science Engineering and Software Architecture. It serves as an interactive resume, project showcase, and thought leadership platform all built upon a modern, highly optimized frontend stack.
The primary technical achievement lies in its fluid, hardware-accelerated user experience. By tightly coupling React 19 concurrent features with Framer Motion micro-interactions—while strictly managing layout shifts via custom hooks and smooth scrolling integrations (Lenis)—the application delivers a premium, app-like feel on the web.
## ✨ Key Features
- **Hardware-Accelerated Motion:** Seamless page transitions and scroll-driven interactions orchestrated through Framer Motion and custom CSS animations.
- **Dynamic Content Routing:** Fully integrated blogging engine with standalone route layouts, leveraging `react-router-dom` and custom transition hooks.
- **Performance-First Asset Delivery:** Configured for programmatic Cloudinary image fetch proxies to dynamically optimize and serve assets in WebP/AVIF formats.
- **Component-Driven Architecture:** Highly modular UI components with separated concerns for logic (`hooks`), layouts (`pages`), and atomic design (`components/ui`).
- **Smooth Scroll Interpolation:** Integrated Lenis smooth scrolling with native `requestAnimationFrame` to eliminate native scroll stutter across all modern browsers.
## 🛠️ Tech Stack
| Layer | Technology | Purpose in Project |
| --- | --- | --- |
| **Frontend Framework** | React 19 (Vite) | Core view layer and concurrent rendering engine. |
| **Styling & Layout** | Tailwind CSS v4 | Utility-first styling for rapid, responsive UI construction. |
| **Animation & Motion** | Framer Motion | Complex orchestrations, micro-interactions, and visual feedback. |
| **Routing** | React Router v7 | Client-side navigation and dynamic blog route matching. |
| **Smooth Scrolling** | Lenis | Scroll interpolation and frame-perfect kinetic scroll mapping. |
| **Icons & Visuals** | Lucide React & tsParticles | Scalable vector icons and interactive background particle matrices. |
## 🚀 Getting Started
**Prerequisites:**
- Node.js v18.0.0 or higher
- npm v9+ or equivalent package manager
**Local Installation:**
```bash
# Clone the repository
git clone https://github.com/NithishKumar0990/Web--App--Development.git
# Navigate to the workspace
cd Web--App--Development/PORT
# Install dependencies
npm install
```
**Environment Configuration:**
Create a `.env` file in the root of the project to configure external connections.
| Environment Variable | Data Type | Example Value | Description |
| --- | --- | --- | --- |
| `VITE_API_URL` | String | `http://127.0.0.1:8000` | Target Laravel API base URL (leave empty in dev for Vite proxy routing). |
## 💻 Usage & Scripts
The project utilizes Vite as its build tool and development server. 
- `npm run dev`: Spins up the local development server with Hot Module Replacement (HMR). Typically hits `http://localhost:5173` by default.
- `npm run build`: Compiles the TypeScript source code and generates a highly optimized production bundle into the `dist/` directory.
- `npm run preview`: Boots a local static web server to preview the production build generated in `dist/`.
## 📂 Project Anatomy
```text
PORT/
├── public/                 # Static assets and icons
├── src/                    # Core application source code
│   ├── components/         # Reusable atomic UI elements
│   ├── config/             # Global application configuration
│   ├── hooks/              # Custom React lifecycle hooks
│   ├── pages/              # Top-level route components
│   └── utils/              # Helper functions and APIs
├── package.json            # Identity and dependency manifest
└── vite.config.ts          # Bundler and proxy configuration
```
## 🤝 Contributing & License
Contributions, issues, and feature requests are welcome to expand the capabilities of this portfolio architecture. This project is open-sourced under the ISC License.
