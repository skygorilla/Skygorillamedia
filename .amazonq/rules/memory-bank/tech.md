# Technology Stack

## Core Technologies
- **Framework**: Next.js 15.3.3 with App Router
- **Runtime**: React 18.3.1 with React DOM
- **Language**: TypeScript 5 with strict configuration
- **Styling**: Tailwind CSS 3.4.1 with custom animations
- **AI**: Google Genkit 1.20.0 for AI integration

## UI Component System
- **Base Components**: Radix UI primitives
- **Icons**: Lucide React 0.475.0
- **Charts**: Recharts 2.15.1
- **Carousel**: Embla Carousel React 8.6.0
- **Forms**: React Hook Form 7.54.2 with Hookform Resolvers
- **Validation**: Zod 3.24.2
- **Date Handling**: Date-fns 3.6.0

## Development Tools
- **Linting**: ESLint 9.38.0 with Next.js config
- **Build**: Turbopack (Next.js built-in)
- **Package Management**: npm with package-lock.json
- **Environment**: dotenv 16.5.0
- **Patching**: patch-package 8.0.0

## Utility Libraries
- **Class Management**: clsx 2.1.1, class-variance-authority 0.7.1
- **CSS Utilities**: tailwind-merge 3.0.1, tailwindcss-animate 1.0.7
- **Error Handling**: react-error-boundary 6.0.0
- **Firebase**: Firebase 11.9.1

## Development Commands
```bash
# Development server with Turbopack
npm run dev

# AI development with Genkit
npm run genkit:dev
npm run genkit:watch

# Production build
npm run build

# Type checking
npm run typecheck

# Linting
npm run lint
```

## Configuration Files
- **TypeScript**: `tsconfig.json` with strict settings
- **Tailwind**: `tailwind.config.ts` with custom tokens
- **Next.js**: `next.config.ts` for build configuration
- **ESLint**: `.eslintrc.json` for code quality
- **PostCSS**: `postcss.config.mjs` for CSS processing