# Project Context

## Purpose
- JianghuJS UI 是面向江湖业务系统的 Vue 2 + Vuetify 组件库，目标是输出一套带有统一视觉和交互规范的「jh-*」组件，支撑后台、运营、低代码页面的快速搭建。
- 组件库需要支持「开箱即用」和 CDN 引入，Storybook 作为权威交互文档，方便产品、设计和工程协作，并可用 `gh-pages` 发布静态站点。
- 兼顾「教学示例 + 实战组件」，同时输出开发规范（文件放 docs/，snake_case 命名）以利于 AI / 新同学快速上手。

## Tech Stack
- **Vue 2.7 + Options API**：核心运行时，组件全部以单文件组件（SFC）组织。
- **Vuetify 2.x & Material Design**：作为视觉基座，复用响应式栅格、主题和基础交互。
- **Storybook 7（@storybook/vue-webpack5）**：组件开发、调试与文档平台，支持 MDX 叙述。
- **Webpack 5 + Babel + PostCSS/Tailwind**：负责打包 CDN 产物与主题样式，Babel preset-env 兼容现代浏览器。
- **辅助依赖**：`@mdi/font` 图标、`gh-pages` 部署、`http-server` 预览、`vue-loader` 处理 SFC。

## Project Conventions

### Code Style
- 组件命名统一 `JhFoo`，对外暴露 `jh-foo` 标签，props / emits 采用小驼峰并提供中文注释描述业务含义。
- 所有文档、注释、输出均使用中文，新增文档统一放在 `docs/` 且文件名为 `snake_case`。
- 单文件组件按照 `template` → `script` → `style` 排序，样式默认 scoped，尽量沿用 Vuetify 变量与主题色，避免硬编码。
- 复杂交互遵循江湖前端 `doUiAction` 方法链思想：方法单一职责、命名见名知意（prepare/get/do/ui/confirm/validate 等前缀）。

### Architecture Patterns
- 目录按组件拆分：`src/components/JhComponent/{JhComponent.vue,index.js,stories.js}`，每个组件自带 Storybook 示例与 README，聚合出口位于 `src/index.js`。
- 多步骤业务（如表单、抽屉、查询面板）通过组合基础组件、复用 `jh-*` 结构，优先抽出子组件提升可读性。
- 公共样式与变量集中在 `src/style`，工具函数放 `src/utils`，保持关注点分离和可测试性。
- 构建流程：`npm run build` 生成 `dist/jianghu-ui.{js,css}`，`npm run build-storybook` 生成文档站点，最终通过 `npm run deploy` 发布至 GitHub Pages。

### Testing Strategy
- 以 Storybook 文档页作为可执行规范：新组件必须提供最小示例、交互示例和 MDX 说明，PR 前至少在本地 `npm run storybook` 进行可视回归。
- 构建/发版需执行 `npm run build && npm run build-storybook`，确保 CDN 产物可用且静态文档无报错。
- 复杂逻辑组件推荐补充 `stories.js` 中的 Controls/Tests（Chromatic、互动测试）并在需要时增加 `utils` 层单元测试（Jest/VTU，可按需接入）。
- 手动测试重点：表单校验链路（validate → confirm → do）、大数据表格性能、Drawer/Dialog 响应式。

### Git Workflow
- 默认 `main` 存放发布版本，日常开发以 `feature/<topic>` / `fix/<bug>` 分支迭代；流程：`git checkout -b feature/...` → 开发 → `npm test/build` → `git commit` → `git push origin feature/...` → PR。
- 提交信息指明模块（如 `feat(jh-table): 支持服务端分页`），变更前需更新相关文档并在 PR 描述中列出 Storybook 截图或重现步骤。
- 发版通过 `npm version <type>`（可选）+ `npm run deploy` 更新 CDN 产物，必要时在 README/CHANGELOG 中记录。

## Domain Context
- 服务对象为江湖后台、运营、低代码业务：核心场景是表格查询、批量操作、表单提交流程、抽屉/弹窗流程等，需要配合常见的 `constantObj` 数据字典、`window.jianghuAxios` 请求封装、`window.vtoast` 等全局工具。
- 组件需兼容江湖约定（如 `doUiAction`、`confirmXXXDialog`、`window.confirmDialog`），并预留插槽/props 方便业务方接入权限、国际化、服务端分页等。
- 设计语言贴合 Material Design，但颜色、密度要遵循江湖主题（沉稳主色，避免过度装饰）。

## Important Constraints
- 所有输出（代码、文档、注释、沟通）必须使用中文；新增文档放 `docs/`，数据库/脚本等按 `snake_case` 命名。
- 引入的 UI 视图尽量复用现有 `jh-*` 组件，禁止随意使用未经规范的第三方组件；若必须引用需在文档说明原因。
- 变更前请先阅读 `.codex/prompts/jianghu-*` 规范；功能开发不得留 TODO/MVP 占位，需要完整实现并覆盖异常/边界处理。
- 构建产物发布至 `https://jianghujs.github.io/jianghu-ui/cdn/<version>/`，生产使用需锁定版本，`cdn/latest` 仅供验证。

## External Dependencies
- 第三方服务：GitHub Pages（托管 Storybook 与 CDN）、JSDelivr/UNPKG（可能的镜像）。
- API / 运行时：依赖浏览器加载 `Vue 2.7`、`Vuetify 2.x`、`@mdi/font`、`Roboto` 字体；业务中可通过 `window.jianghuAxios` 调后端。
- 工具链：`gh-pages` CLI 发布，`http-server` 预览静态 Storybook，Tailwind 用于 Storybook 展示样式但不会打入核心产物。
