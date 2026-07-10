# Neutrino Veda Assignment: Parental Legacy Calculator

A modern React + Vite web application that calculates a personalized **Mother vs Father legacy distribution** using a deterministic pseudo-random algorithm based on the user's date of birth.

The application visualizes the calculated factors using interactive charts, provides saved history management, and supports exporting results.

## 🌐 Live Demo

https://iasadk-neutrinoveda-assignmnet.netlify.app/

---

## ✨ Features

- 📅 Date of birth based calculation engine
- ⚖️ Mother vs Father legacy distribution analysis
- 🎲 Deterministic pseudo-random generation
  - Same input always produces the same output
  - Uses seeded randomness instead of Math.random()
- 📊 Interactive data visualization:
  - Bar chart comparison
  - Overall split pie chart
- 💾 Local history storage
  - Save previous calculations
  - Reload previous results
  - Delete saved records
- 🌗 Light and dark theme support
- 📄 Export functionality:
  - CSV export
  - PDF export
- 📱 Responsive design for desktop and mobile
- 🎨 Custom themed UI with smooth animations

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- TypeScript
- Tailwind CSS

### Libraries

- Recharts - Data visualization
- Day.js - Date handling
- Lucide React - Icons

### Storage

- Browser LocalStorage

---

## 🧠 Calculation Logic

Depends on the same I got on mail.
