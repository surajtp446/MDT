# MDT — Mysore Drier Tech

Production website for Mysore Drier Tech (Tumkur, Karnataka) — manufacturer of
paddy driers, parboiling units, grain silos and complete grain processing plants.

This is a **self-contained static site**: the entire application (all pages, the
rice-grain scroll animation, styles and scripts) is built into a single
`index.html`. No build step, no dependencies, no configuration.

## Deploy on Vercel (via GitHub)

1. Upload `index.html` to the root of your GitHub repo.
2. In Vercel, import the repo (or redeploy the connected one).
3. If asked, set **Framework Preset = Other** and leave the Build Command empty.
   (There is no package.json, so Vercel just serves the file as-is.)
4. Deploy. Done.

## Deploy on Vercel (no GitHub)

Go to vercel.com/new and drag `index.html` (or this folder) onto the page.

## View locally

Double-click `index.html` — it opens directly in any browser.

## Editing later

This file is a compiled build. To change content or styling, edit the original
Vite source project and rebuild (`npm run build`) to regenerate this `index.html`.
