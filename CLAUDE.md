# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Learning Notes

This project is excellent for learning modern web development concepts:

**Key Learning Areas:**
- **Virtual File Systems**: How to create in-memory file structures without touching the actual filesystem
- **AI Integration**: How to integrate LLMs into web applications using structured tools
- **Real-time Compilation**: How to compile and execute React components dynamically in the browser
- **Authentication Patterns**: JWT-based auth with session management
- **Database Design**: Simple but effective schema design for user-generated content
- **Component Architecture**: How to structure a complex React application with multiple contexts

**Beginner-Friendly Entry Points:**
1. Start by examining `src/lib/file-system.ts` - it's a complete file system implementation in JavaScript
2. Look at `src/app/api/chat/route.ts` - shows how to build AI-powered APIs
3. Study `src/components/preview/PreviewFrame.tsx` - demonstrates dynamic React compilation
4. Review the authentication flow in `src/lib/auth.ts` and `src/actions/`

**Code Comments**: This codebase now includes extensive comments explaining complex concepts, making it ideal for learning modern React, Next.js, and AI integration patterns.

## Development Commands

- `npm run setup` - Install dependencies, generate Prisma client, and run database migrations (required for first-time setup)
- `npm run dev` - Start development server with Turbopack at http://localhost:3000
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests using Vitest
- `npm run db:reset` - Reset database and run migrations (WARNING: destroys all data)

## Application Architecture

UIGen is an AI-powered React component generator with live preview capabilities. The application features:

### Core Architecture
- **Next.js 15** with App Router and React 19
- **Virtual File System** (`src/lib/file-system.ts`) - All generated components exist in memory, no files written to disk
- **AI Integration** - Uses Anthropic Claude via Vercel AI SDK for component generation
- **Real-time Preview** - Live preview of generated components using Babel standalone compilation
- **Persistent Storage** - Uses Prisma with SQLite for user accounts and project persistence

### Key Components Structure

**Main Application Flow:**
- `src/app/page.tsx` - Home page that redirects authenticated users to their latest project or shows anonymous interface
- `src/app/[projectId]/page.tsx` - Individual project workspace
- `src/app/main-content.tsx` - Main application interface with chat and preview panels

**Core Systems:**
- `src/lib/file-system.ts` - Virtual file system implementation with full CRUD operations
- `src/app/api/chat/route.ts` - AI chat endpoint with tool integration
- `src/lib/tools/` - AI tools for file management and string replacement
- `src/lib/transform/jsx-transformer.ts` - Babel-based JSX compilation for live preview

**UI Components:**
- `src/components/chat/` - Chat interface components (MessageList, MessageInput, etc.)
- `src/components/preview/PreviewFrame.tsx` - Live preview component with error handling
- `src/components/editor/` - Code editor and file tree components
- `src/components/auth/` - Authentication forms and dialogs

### Database Schema
- **User**: Authentication with email/password using bcrypt
- **Project**: Stores generated components data and chat messages as JSON

### AI System Behavior
The AI system generates React components following these rules:
- All projects must have a root `/App.jsx` file as the default export
- Uses Tailwind CSS for styling (never hardcoded styles)
- Uses `@/` import alias for non-library files
- Operates on virtual file system root (`/`)
- No HTML files are created - App.jsx is the entry point

### Testing
- Uses **Vitest** with jsdom environment
- Test files located alongside source files in `__tests__` directories
- Tests cover file system operations, chat functionality, and UI components

### File System Context
The virtual file system supports:
- Full CRUD operations (create, read, update, delete files/directories)
- Path normalization and validation
- Recursive operations for directories
- Text editor commands (view, replace, insert)
- Serialization for persistence

### Authentication & Projects
- Anonymous users can use the app with temporary state
- Registered users get persistent project storage
- Projects store chat messages and virtual file system state
- Auto-redirect to most recent project for authenticated users