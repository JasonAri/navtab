# NavTab — Agent Instructions

## Project overview

NavTab is a simple browser new-tab page. The main feature is a Bing search bar. Built with Next.js, TypeScript, and Tailwind CSS.

## Stack

- **Framework:** Next.js 16.1 (App Router)
- **Runtime:** React 19.2
- **Language:** TypeScript 5 (strict mode)
- **Styling:** Tailwind CSS 4 with `tw-animate-css`
- **Package manager:** pnpm
- **Lint/format:** ESLint 9 + Prettier 3 + commitlint
- **Git hooks:** husky + lint-staged (lint + format on staged files)

## Directory structure

```
app/
  layout.tsx           # Root layout — Geist fonts, metadata ("NavTab")
  globals.css          # Tailwind imports + CSS variables
  (root)/
    layout.tsx         # Page layout — full-screen bg image wrapper
    page.tsx           # Home page — SearchBar + commented-out Dock
  not-found.tsx        # 404 page — Empty component with "Back" button
components/
  SearchBar/index.tsx  # Client component — Bing search with Enter key redirect
  ui/
    button.tsx         # shadcn/ui Button (Slot-based, cva variants)
    input.tsx          # shadcn/ui Input
    empty.tsx          # Empty state component (header/title/description/content)
lib/
  utils.ts             # `cn()` — clsx + tailwind-merge helper
public/
  bg.jpg, icon-bing.png, navtab.svg
```

## Conventions

- Use `@/` path alias (maps to project root).
- Client components need `'use client'` directive at the top.
- Class merging: always use `cn()` from `@/lib/utils`, never inline string concatenation.
- UI primitives live in `components/ui/` and follow shadcn/ui patterns (cva variants, forward refs via Slot).
- Feature components go in `components/<Name>/index.tsx`.
- Page components use `const Page: NextPage = async () => {}` pattern (even for client pages — the `async` is convention here).
- Search redirect uses `window.location.href` to Bing with `?q=<query>&form=QBRE`.
- Commands: `pnpm dev` (dev server), `pnpm build` (production build), `pnpm lint` (ESLint).

## Architecture notes

- The (root) route group keeps the home page at `/` while allowing separate layout from the root layout.
- The root layout provides fonts and global metadata; the (root) layout provides the background image and full-screen structure.
- A Dock component is commented out — planned for future use.
- Icons come from `lucide-react`.
