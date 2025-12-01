# 设计说明 - JhForm Grid 布局

## 1. 24 栏到 Vuetify 映射
- 约定 `colSpan` 代表 24 栏单位（与 ProForm 一致）。
- 计算公式：`vuetifyCols = Math.max(1, Math.min(12, Math.round(colSpan / 24 * 12)))`。
- 若字段未显式声明 `colSpan`，使用 `colProps.span`；若仍为空，取默认 8（≈3 列）。

## 2. row/col 透传策略
- 新增 `rowProps`，合并进顶层 `<v-row>`（支持 `dense`, `align`, `justify`, `no-gutters` 等）。
- `colProps` 为对象，除 `span` 外可覆盖 Vuetify 的 `cols`, `sm`, `md`, `lg`, `xl`；字段可通过 `field.colProps` 或 `field.cols` 进一步覆盖。
- inline/horizontal 布局不走 grid 逻辑，直接复用旧实现。

## 3. Submitter 占行规则
- 当 grid 启用且存在默认 submitter（或 actions 插槽），底部容器应渲染一个 `v-col`，其列宽为 12（即整行）。
- 在 row 中最后渲染 submitter `v-col`，保证与字段保持统一 gutter。

## 4. 回归与文档
- Storybook 新增“Grid 自动布局”示例，包含：不同 `colSpan`、`rowProps`、`colProps`（md/lg）覆盖、底部操作区对齐。
- `.codex/prompts/jianghu-ui/component/JhForm.md` 增补 Grid 用法章节，与代码保持一致。
