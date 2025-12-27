# 🔐 Random Password Generator

A modern, responsive, and secure Random Password Generator built using **React + Vite** with **TailwindCSS** for fast UI styling.  
This tool helps users generate strong and customizable passwords with real-time strength indication and theme support (Dark / Light Mode).

---

## 🚀 Features

- Generates secure random passwords using `crypto.getRandomValues`
- Customizable character settings:
  - ✔ Uppercase letters (A–Z)
  - ✔ Lowercase letters (a–z)
  - ✔ Numbers (0–9)
  - ✔ Symbols (!@#$…)
- Adjustable password length (1–50 characters)
- Password strength meter (length-based)
- One-click copy button with success feedback
- Automatic password regeneration on option change
- Theme toggle with localStorage persistence
- Fully responsive UI (Desktop + Mobile)
- Clean, modern UI design with TailwindCSS
- GitHub profile link included

---

## 🧱 Tech Stack

| Category     | Technology     |
| ------------ | -------------- |
| UI Framework | React (Hooks)  |
| Styling      | TailwindCSS    |
| Build Tool   | Vite           |
| Icons        | Lucide-React   |
| Security     | Web Crypto API |

---

## 🔧 How It Works

### 1️⃣ Random Password Generation

- A **character pool** is created depending on selected toggles
- `crypto.getRandomValues()` generates cryptographically secure random indices
- Result is stored in React `useState`

### 2️⃣ Prevent Weak Configurations

- At least **one** toggle must remain active

### 3️⃣ Strength Calculation

- Based on password length
- Label + visual color badge updates in real time

### 4️⃣ Theme Persistence

- Stored in localStorage (`gp-theme-v4`)
- Applies Tailwind classes dynamically

---

## 🖥️ Screens UI Overview

### ✔ Output Section (Left)

- Strength indicator badge
- Generated password preview
- Copy button with ✔ Check icon when copied
- Refresh button for new password

### ✔ Controls Section (Right)

- Length slider
- Four toggle buttons: ABC / abc / 123 / #$&
- Smooth animations + Hover styles

---

## 📦 Installation & Setup

```bash
# Clone the repo
git clone https://github.com/<your-github-username>/<repo-name>

# Go to project folder
cd <repo-name>

# Install dependencies
npm install

# Run development server
npm run dev
```
