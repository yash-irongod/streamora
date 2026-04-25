# Contributing to Streamora

Thank you for your interest in contributing to Streamora! This document provides guidelines for contributing to the project.

## Getting Started

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create a branch** for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Set up environment** — copy `.env.example` to `.env` and add your TMDb API key

## Development

```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run lint       # Run ESLint
npm run preview    # Preview production build
```

## Code Style

- Use **ES6+ JavaScript** with functional React components
- Use **hooks** for state and side effects
- Keep components **small and focused** — one responsibility per file
- Follow the existing **CSS custom property** design system for styling
- Use **meaningful names** for variables, functions, and components

## Commit Messages

Use clear, descriptive commit messages:

```
feat: add genre filter to browse page
fix: resolve detail page loading state
style: improve card hover animation
refactor: extract search logic into custom hook
docs: update API reference in README
```

## Pull Request Process

1. Ensure your code **builds without errors** (`npm run build`)
2. Update documentation if you've changed functionality
3. Write a clear PR description explaining **what** and **why**
4. Reference any related issues

## Project Structure

See the [README](./README.md#architecture) for the full project architecture.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).
