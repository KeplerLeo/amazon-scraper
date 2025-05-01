# AMAZON-SCRAPER

A full-stack tool to scrape and display Amazon product data with **Bun backend** and **Vite frontend**.

## 🧩 Project Structure

amazon-scraper/

├── backend/ # Bun server

│ ├── src/

│ │ ├── index.ts # API server

│ │ ├── scraper.ts # Scraping logic

│ │ └── types.ts # Type definitions

│ ├── Dockerfile

│ └── package.json

│

├── frontend/ # Vite app

│ ├── src/

│ │ ├── main.js # Frontend logic

│ │ └── style.css # Styling

│ ├── index.html

│ └── vite.config.js

│

├── .dockerignore

├── .gitignore

└── docker-compose.yml # Full-stack container setup


## 🚀 Quick Start

### Prerequisites
- [Bun](https://bun.sh/) (v1.0+)
- [Node.js](https://nodejs.org/) (v18+)
- [Docker](https://www.docker.com/) (optional)

### Option 1: Manual Setup (Recommended)
```bash
# Clone repo
git clone git@github.com:KeplerLeo/amazon-scraper.git
cd amazon-scraper

# Backend
cd backend
bun install
bun run dev  # http://localhost:3000

# Frontend (new terminal)
cd ../frontend
npm install
npm run dev  # http://localhost:4173
```

### Option 2: Docker (Easiest, but amazon can block requests)
```bash
docker-compose up --build
```
Frontend: http://localhost:4173
Backend API: http://localhost:3000
