# FoundIT — Campus Lost & Found

FoundIT is a campus-based Lost & Found Android application designed to help college and university students report, search, match, and recover lost belongings.

> Find what you've lost. Return what you've found.

## About

This repository contains the static promotional and download website for the FoundIT Android application.

It is a landing page for introducing the app, showing its interface, and providing access to the Android APK download.

This website is not the actual Lost & Found application and does not include the app's backend, authentication, or database.

## Features

- Responsive landing page
- FoundIT application introduction
- App feature showcase
- Android UI previews
- Lost vs Found explanation
- How It Works section
- HCI/UX design principles
- APK download section
- Installation guide
- FAQ
- GitHub link
- Mobile, tablet, and desktop responsive design

## Design

The website uses a visual direction that combines:

- Retro 8-bit inspiration
- Modern brutalist design
- Campus and student-focused presentation
- High contrast composition
- Thick borders
- Hard offset shadows
- Pixel-inspired details
- Responsive mobile-first layout
- Accessible typography and touch targets

This design was created as part of a BSIT HCI / UI Design project.

## Tech Stack

- React
- Vite
- Tailwind CSS
- JavaScript / JSX

## Getting Started

### Requirements

- Node.js
- npm

### Installation

```bash
git clone <repository-url>
cd FoundIT-Landing-Page
npm install
```

### Run Locally

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview the Production Build

```bash
npm run preview
```

## Configuration

The APK download link and GitHub link are centralized in `src/config.js`.

- `APK_DOWNLOAD_URL` controls the APK download button
- `GITHUB_URL` controls the GitHub link
- `APP_VERSION` controls the version text shown on the page

Replace the placeholder values in that file before deployment.

## Project Structure

```text
src/
├── components/
├── sections/
├── assets/
├── App.jsx
├── main.jsx
└── index.css
```

## Notes

- This repository is a static website only.
- It does not include a backend or database.
- It is intended for promotional use and APK distribution for the Android app.
