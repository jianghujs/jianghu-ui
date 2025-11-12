# Repository Guidelines

## Project Structure & Module Organization
Source lives in `src/`, with Vue single-file components grouped under `src/components/Jh*` (each folder keeps the `.vue` file plus `*.stories.js`). Utilities sit in `src/utils`, and Storybook MDX docs (e.g., `Introduction.stories.mdx`) stay at the root of `src`. Storybook config is in `.storybook/`. Build artifacts drop to `dist/` (library) and `storybook-static/` (docs); do not hand-edit them. Long-form docs, playground snippets, and public assets stay in `doc/`, `examples/`, and `public/`.

## Build, Test, and Development Commands
Run `npm install` to pull Vue 2, Vuetify 2, and Storybook. `npm run storybook` serves the interactive docs on `http://localhost:6006`. `npm run build-storybook` creates the static `storybook-static/` publish folder. `npm run build` compiles the distributable bundle via `webpack.config.js`, while `npm run build:watch` keeps it live during local work. `npm run serve-storybook` previews the static site, and `npm run deploy` (build + gh-pages) is for maintainers after review.

## Coding Style & Naming Conventions
Stick to 2-space indentation in Vue SFCs and JS files. Components use PascalCase directories/files (`JhCard/JhCard.vue`), export a matching name, and declare props/methods in camelCase. Emit names and custom events stay kebab-case to match Vue 2 templates. Keep Storybook stories colocated as `Component.stories.js` using CSF with minimal controls. No enforced linter exists, so mirror the surrounding style and avoid sweeping formatting-only changes.

## Testing Guidelines
Visual verification runs through Storybook; each feature or regression fix should include a new or updated story/MDX note that captures edge states (loading, error, RTL). Before a PR, run `npm run storybook` for interactive QA and `npm run build-storybook` to verify static output. If you add non-visual utilities, drop lightweight Jest-style tests under `src/__tests__/` (create as needed) and link scenarios from your stories.

## Commit & Pull Request Guidelines
History favors short, imperative commits that name the component (`jhTable`, `JhStepsForm`). Do the same: `<component|feature>: <brief intent>` in English or Chinese, but stay consistent within a PR. For pull requests provide: (1) change summary and user impact, (2) linked issue, (3) screenshots/GIFs for UI work, and (4) commands executed (`npm run storybook`, `npm run build`). Keep PRs component-scoped and call out breaking props or slot changes explicitly.
