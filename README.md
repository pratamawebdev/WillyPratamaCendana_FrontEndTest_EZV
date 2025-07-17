# EZV Todo App 📝

A modern, clean, and fast Todo application built with:

- **Next.js 15 (App Router)**
- **React 19**
- **Tailwind CSS 4**
- **Redux Toolkit + RTK Query**
- **React Hook Form + Zod**
- **Radix UI + shadcn/ui components**
- **TypeScript**

---

## 🚀 Features

- ✅ Add, and manage todos
- ✅ Pagination with `TanStack Table`
- ✅ Modal form using Radix Dialog
- ✅ Form validation using `zod`
- ✅ Toast notification with `sonner`
- ✅ SSR initial data hydration
- ✅ Redux with auto caching and revalidation (RTK Query)

---

## 🧠 Stack & Libraries

| Tech              | Description                        |
| ----------------- | ---------------------------------- |
| Next.js 15        | App Router, SSR, ISR, API routes   |
| React 19          | Concurrent rendering, stable hooks |
| Tailwind CSS 4    | Utility-first styling              |
| Redux Toolkit     | Global state & API slice (RTKQ)    |
| Zod + RHF         | Schema validation for forms        |
| Radix UI + shadcn | Accessible UI components           |
| Axios             | HTTP client                        |

---

## 📦 Installation

````bash
# 1. Clone this repo
git clone https://github.com/pratamawebdev/WillyPratamaCendana_FrontEndTest_EZV.git
cd ezv-todo-app

# 2. Install dependencies
pnpm install
# or
npm install
# or
yarn

# 3. Environment Setup
Before running the project, make sure you have a .env.local file in the root directory.

# 4. Development
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
````

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
