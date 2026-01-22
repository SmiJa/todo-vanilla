# 📝 Basic Todo app
A lightweight, high-performance task manager built with modern Vanilla JavaScript.

## 🚀 Features
- **Dynamic DOM Manipulation:** Refactored for performance using the `document.createElement` API.
- **Secure Unique IDs:** Leverages the Web Crypto API (`crypto.randomUUID`) for collision-resistant task identification.
- **Zero Dependencies:** No frameworks, no builders—just pure web standards.

## 🛠️ Tech Stack
- **JavaScript:** Vanilla (ES6+)
- **Web Crypto API:** Used for secure ID generation.
- **FontAwesome:** For intuitive UI icons.

## 📖 How to Run
This is a client-side application. No build step or local server is required.
1. **Download** the repository.
2. Locate `index.html` in the root folder.
3. **Open** the file in any modern web browser.

## 🔄 Recent Refactors & Updates
- ✅ **Enhanced Performance:** Refactored `buildTaskList` to use DOM node insertion instead of `innerHTML` strings, preventing unnecessary re-renders.
- ✅ **Security Update:** Migrated the `newID` function to support the Web Crypto API.
- ✅ **Logic Cleanup:** Optimized the `clearCompleted` function for better array management.