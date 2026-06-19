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

The workflow `.github/workflows/deploy.yml` builds and deploys automatically.

Site URL: `https://<username>.github.io/<repository-name>/`

### Custom domain

If using a user/org site (`username.github.io`), set in workflow env:

```yaml
VITE_BASE_PATH: /
```

For project sites, `VITE_BASE_PATH` is set automatically to `/<repo-name>/`.

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
