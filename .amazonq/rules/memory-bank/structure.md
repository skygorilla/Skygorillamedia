# Project Structure

## Directory Organization

### Core Application (`/src`)
- **`/app`**: Next.js App Router structure with pages and layouts
  - `/devtools`: Development and debugging interfaces
  - `/lib`: Application-specific utilities and configurations
  - `/pitch`: Presentation/demo pages
- **`/components`**: Reusable UI components
  - `/layout`: Layout-specific components (headers, sidebars)
  - `/ui`: Base UI components (buttons, forms, charts)
- **`/hooks`**: Custom React hooks for state management and utilities
- **`/lib`**: Shared utilities and helper functions
- **`/types`**: TypeScript type definitions
- **`/utils`**: Utility functions for various application features

### AI Integration (`/src/ai`)
- **`dev.ts`**: Development AI configuration
- **`genkit.ts`**: Google Genkit AI setup and flows

### Configuration & Tooling
- **`.amazonq/`**: Amazon Q rules and policies
- **`.github/`**: GitHub workflows and CI/CD
- **`.idx/`**: IDX development environment configuration
- **`docs/`**: Project documentation and blueprints

## Core Components
- **Navigation System**: Dynamic morphing navigation with scroll-based transitions
- **UI Component Library**: Radix UI-based components with custom styling
- **Monitoring System**: Real-time error detection and performance monitoring
- **AI Integration**: Google Genkit for enhanced functionality
- **Development Tools**: Built-in debugging and diagnostic utilities

## Architectural Patterns
- **App Router**: Next.js 15 App Router for file-based routing
- **Component Composition**: Radix UI primitives with custom implementations
- **Hook-based Logic**: Custom hooks for complex state management
- **Utility-first CSS**: Tailwind CSS with custom design tokens
- **Type Safety**: Strict TypeScript configuration throughout
- **Modular Architecture**: Clear separation of concerns across directories