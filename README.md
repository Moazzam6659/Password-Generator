# 🔐 Random Password Generator (React + TailwindCSS)

This project demonstrates strong skills in **React**, **secure password generation**, **state management**, and **responsive UI/UX with Tailwind CSS**.

Below is a complete explanation you can use in interviews or project documentation.

---

## 📌 How to Explain This Project in an Interview

This project is designed to show clear understanding of **React hooks**, **browser APIs**, and **modern UI design patterns**.

---

### 🧱 1️⃣ The Core Architecture

I followed a **component-based architecture** with clean state separation.  
The app uses:

- `useState` → Stores password, length, toggles, theme, and copy status
- `useMemo` → Optimizes derived computations like strength + display text
- `useCallback` → Memoizes password generation to prevent re-creation
- `useEffect` → Syncs theme and auto-generates password on changes

Even with a small UI, using proper hooks ensures scalability.

---

### ⚙️ 2️⃣ Step-by-Step Development Process

#### **Phase 1: Defining Constants**

- Sets of characters (`UPPERCASE`, `LOWERCASE`, `NUMBERS`, `SYMBOLS`)
- Central `THEME_COLORS` object to manage Dark/Light UI styling

All constants are stored **outside React component** for performance.

#### **Phase 2: State Management**

| State                          | What It Controls                             |
| ------------------------------ | -------------------------------------------- |
| `password`                     | Generated string                             |
| `length`                       | Slider value (1–50)                          |
| Toggles (`useUppercase`, etc.) | Which character groups are included          |
| `isDarkMode`                   | Theme selection (persisted via localStorage) |
| `isCopied`                     | Clipboard copy feedback status               |

At least **one toggle must always remain active** — prevents empty pool errors.

#### **Phase 3: Secure Random Generator**

- Uses **Web Crypto API (`window.crypto`)** for cryptographically safe randomness
- Builds a character pool based on user selections
- Generates password using modulo on random values

Memoized using `useCallback` for performance.

#### **Phase 4: Side-Effects & Auto-Update**

- Re-generates password every time settings change
- Syncs theme style on page load + toggle using `localStorage`
- Applies global `<body>` class for Tailwind theme UI

#### **Phase 5: UI/UX with TailwindCSS**

- Fully responsive across devices
- Modern slider & toggle buttons
- Strength indicator visualized using dynamic background/text classes
- Clean minimal look using custom Google Fonts

---

### 🧪 3️⃣ Added User Experience Features

| Feature                  | Explanation                                           |
| ------------------------ | ----------------------------------------------------- |
| Copy to Clipboard        | `navigator.clipboard.writeText()` + success animation |
| Smart Display            | Long passwords shortened with ellipsis                |
| Real-time Strength Meter | Based on password length                              |
| Theme Persistence        | Stores user preference locally (`gp-theme-v4`)        |

These ensure the app is **professional and reliable**.

---

### 🎯 4️⃣ Key Interview Talking Points

You can proudly mention:

- ✔ “I used cryptographically secure randomness instead of `Math.random()`.”
- ✔ “The app prevents invalid states — at least one toggle stays on.”
- ✔ “Theme is persisted using `localStorage` for better UX.”
- ✔ “I optimized reactivity using `useCallback` and `useMemo`.”
- ✔ “TailwindCSS helped maintain clean, scalable styles.”

---

## 🚀 Tech Used

- **React** (Hooks)
- **Vite**
- **TailwindCSS**
- **lucide-react Icons**
- **Web Crypto API**
- **localStorage for persistence**

---

## 📎 How to Run the Project

```sh
npm install
npm run dev
```
