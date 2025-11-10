# Repository Guidelines

## Project Structure & Module Organization
`src/` hosts all deliverable code: Vue 2 components live in `src/components/Jh*/` (one Vue file plus stories, README, and optional assets), shared tokens live in `src/style/` and helpers in `src/utils/`. `src/index.js` exports the npm and CDN surface. `.storybook/` contains the Storybook runtime plus MDX docs, `public/` serves static assets, and `dist/` plus `storybook-static/` are build outputs that stay untracked. Scenario sandboxes belong in `examples/` or `.test/jianghu-project/` when you need to mimic the upstream Jianghu host.

## Build, Test, and Development Commands
- `npm install` - install pinned dependencies (prefer npm; if you use pnpm also update `pnpm-lock.yaml`).
- `npm run storybook` - start Storybook at http://localhost:6006 with hot reload.
- `npm run build-storybook` - produce `storybook-static/` for review or gh-pages.
- `npm run serve-storybook` - wraps `http-server` to preview the static bundle.
- `npm run build` / `npm run build:watch` - webpack builds the distributable `dist/` files.
- `npm run deploy` - runs build plus docs and publishes Storybook via `gh-pages` (requires repo access).

## Coding Style & Naming Conventions
Follow the Vue Options API with 2-space indentation, single quotes in JS, and kebab-case prop/event names. Components and directories stay under the `Jh` prefix (`JhTable`, `JhFormList`). Shared mixins or tokens belong in `src/utils/` or `src/style/`. New stories live next to the component as `<Component>.stories.js` and should use grouped titles such as `Components/JhTable`. Reference Tailwind utility classes via `src/tailwind.css` and keep SCSS blocks scoped.

## Testing Guidelines
Storybook doubles as the living spec, so every feature needs at least one args-based story plus MDX notes when UX changes. During development run `npm run storybook` and smoke the relevant controls; before publishing run `npm run build-storybook` to catch static build failures. Integration flows that rely on Jianghu data should be mirrored inside `.test/jianghu-project/` HTML harnesses so the host team can manually verify them.

## Commit & Pull Request Guidelines
Commits are short and imperative (`jhTable`, `JhList: add filters`). Keep diffs focused and avoid committing `dist/` or `storybook-static/` unless cutting a release. Pull requests should include a concise description of the user impact, the stories touched, linked issues, and screenshots or GIFs for UI shifts. Mention any follow-up tasks if you defer work.

## AI & Automation Notes
When pairing with AI agents, preload `README.md`, `AI_KNOWLEDGE_BASE.md`, and `.cursorrules` so generated diffs stay context aware, and summarize which files you changed at the end of the session.
