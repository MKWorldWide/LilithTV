# Contributing to LilithTV

Thank you for your interest in contributing to LilithTV! We appreciate your time and effort in making this project better.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)
- [Feature Requests](#feature-requests)
- [License](#license)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
   ```bash
   git clone https://github.com/your-username/LilithTV.git
   cd LilithTV
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

1. Make your changes
2. Run the linter and tests:
   ```bash
   npm run lint
   npm test
   ```
3. Commit your changes following the [commit guidelines](#commit-guidelines)
4. Push to your fork and submit a pull request

## Code Style

- We use [Prettier](https://prettier.io/) for code formatting
- We use [ESLint](https://eslint.org/) for code quality
- Run `npm run lint` to check for linting errors
- Run `npm run format` to automatically fix formatting issues

## Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for our commit messages:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries

### Examples

```
feat: add user authentication

description of the feature being added

Closes #123
```

```
fix: resolve issue with login form

- Fixed validation error in email field
- Added error message for invalid credentials

Fixes #456
```

## Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a build
2. Update the README.md with details of changes if needed
3. Increase the version number in `package.json` following [Semantic Versioning](https://semver.org/)
4. The PR must pass all CI checks before it can be merged
5. You may merge the PR once you have the sign-off of at least one other developer

## Reporting Issues

When reporting issues, please include the following information:

1. A clear and descriptive title
2. Steps to reproduce the issue
3. Expected behavior
4. Actual behavior
5. Screenshots if applicable
6. Browser/OS version if relevant

## Feature Requests

We welcome feature requests! Please open an issue with:

1. A clear and descriptive title
2. A description of the problem you're trying to solve
3. Any alternative solutions you've considered
4. Additional context or screenshots

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
