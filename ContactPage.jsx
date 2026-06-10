@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #F6F3EC;
  color: #1A1712;
  font-family: 'Poppins', sans-serif;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

/* Subtle, quiet scrollbar */
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: #F6F3EC;
}
::-webkit-scrollbar-thumb {
  background: rgba(26, 23, 18, 0.18);
  border: 3px solid #F6F3EC;
  border-radius: 6px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(26, 23, 18, 0.3);
}

::selection {
  background: rgba(200, 149, 44, 0.28);
  color: #1A1712;
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}

/* Visible keyboard focus */
a:focus-visible,
button:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: 2px solid #9A6A14;
  outline-offset: 2px;
}
