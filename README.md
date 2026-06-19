# ARCHEX

Technical Architecture & Delivery Partner — marketing site with interactive project estimator.

## Stack

- React 18 + TypeScript
- Vite 6
- Tailwind CSS 4 (utility classes only)

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

### 1. Create repository

Push this project to GitHub (e.g. `archex-site` or `portfolio-concept`).

### 2. Enable GitHub Pages

Repository **Settings → Pages → Build and deployment → Source: GitHub Actions**.

### 3. Push to `main`

Workflow **Deploy to GitHub Pages** builds `dist/` and publishes via GitHub Actions.

Site URL: `https://prohorweb.github.io/archex/`

## Project structure

```
src/
  brand/
    ArchexHomepage.tsx   # Main page
    ProjectEstimator.tsx
    archex-tokens.ts
    logos.tsx
  styles/
    archex-brand.css
    index.css
    tailwind.css
```
