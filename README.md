
# WeWantWaste - React Coding Challenge

## 🚀 Challenge Goal

Redesign the **"Choose Your Skip Size"** page from [WeWantWaste.co.uk](https://wewantwaste.co.uk) after selecting garden waste. The goal is to improve the UI/UX while preserving full functionality.

---

## ✅ Key Features

- 🌐 **Fully responsive** layout for mobile and desktop
- 🌗 **Light/Dark mode toggle** with custom theming
- 📦 **Dynamic rendering of skip data** from:
  ```
  https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft
  ```
- 📋 Interactive skip selection with summary drawer
- 🛒 Context-aware UI that adapts to user interaction
- 🔁 **Loading and Error states** with fallback UI

---

## 🧱 Tech Stack

- **React 19 + TypeScript**
- **Vite** (build tool)
- **Material UI (MUI)** – Components and layout
- **Emotion** – MUI's styling engine
- **React Feather** – Lightweight icon set
- **Axios** – For API requests in `useFetch` hook

---

## 🧠 My Approach

I focused on delivering a modern UI with enhanced interactivity, visual clarity, and smooth responsiveness.

### 🔁 Layout Structure
- Created a **3-part layout**:
  - **Navbar**: Contains logo and theme toggle
  - **Sidebar Stepper**:
    - **Vertical on desktop**
    - **Horizontal & scrollable on mobile**
  - **Main content** scrolls independently

- Used **flex layout** extensively for building responsive and adaptive containers instead of relying on grid

### 🧩 Card Design
- Displayed **clean skip images**, keeping labels and metadata below
- Used **badges** and **icons** to present:
  - Hire period
  - Skip size
  - Road placement
  - Waste type
- Ensured the **price stands out clearly** in each card

### 🛒 Skip Selection Feedback
- When a skip is selected:
  - A **summary card** slides up from the bottom-right
  - Shows skip info and CTA buttons
  - Includes a **hide button**
- When hidden, a **circular eye icon** toggles the summary visibility

### 🚨 Error & Loading Handling
- Used `useFetch` custom hook with **Axios**
- While fetching data:
  - A **loading spinner** or fallback message is shown
- On error:
  - A **graceful error message** is rendered with option to retry

### 🎨 Custom Theming
Implemented dark/light theming via `ThemeContext` and MUI's theme provider. The theme includes:

#### Light Mode

```ts
primary: {
  main: "#0045a5",       
  contrastText: "#ffffff"
},
secondary: {
  main: "#ffcc00",       
},
background: {
  default: "#f9f9f9",
  paper: "#ffffff"
},
text: {
  primary: "#212121",
  secondary: "#666666"
}
```

#### Dark Mode

```ts
background: {
  default: "#121212",
  paper: "#1e1e1e"
},
text: {
  primary: "#ffffff",
  secondary: "#aaaaaa"
}
```

---

## 🧪 How to Run Locally

```bash
git clone https://github.com/gasmighassen/remwaste-react-challenge
cd remwaste-react-challenge
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---


## 📬 Submission

This project was submitted as part of the React front-end challenge from **WeWantWaste**.

Built by: **Belgacem Ghassen Gasmi**
