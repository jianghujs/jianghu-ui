# Change: 输出 AI 可读的 jianghu-ui 使用手册

## Why
- 现有 README、Storybook、`doc/jianghu-ui/*.md` 面向人工阅读，段落散乱且缺少元信息，不利于 AI 检索关键信息，导致自动化助手往往无法快速得知「jh-*」组件组合方式。
- AIGC 任务强调“先写文档再开发”，但没有一份面向 AI 的江湖 UI 使用基线会造成页面搭建策略不统一，常出现未包裹 `<v-app>`、未使用 `doUiAction`、遗漏 `request` 返回结构等问题。
- 为新增同学/AI 做知识库，需要将核心规范、常用组件、页面骨架、数据流最佳实践整理为结构化条目，避免反复查询源码或零散文件。

## What Changes
- 新建 `docs/jianghu_ui_ai_handbook.md`（snake_case 命名），提供可机器解析的元信息（标题、适用版本、最近更新、关联文档列表）以及统一目录，便于知识库索引。
- 归纳「运行方式」双路径（CDN vs. 工程化），明确依赖链、`window.jianghuAxios`/`window.vtoast` 约定、`npm run storybook` 验证流程，并附示例命令或 HTML 片段。
- 建立「核心概念 + doUiAction 流程」章节，描述页面搭建心智、命名约定、`jh-*` 组件分层（布局/数据展示/表单/弹窗），给出数据流/事件链表格。
- 输出「组件速查矩阵」：至少涵盖 JhLayout、JhPageContainer、JhTable、JhForm、JhDrawer、JhModalForm、JhConfirmDialog、JhDescriptions，按“场景/关键 props/触发事件/典型片段”整理，方便 AI 复制。
- 补充「页面模板与示例」章节：用步骤式描述列表+抽屉+表单的典型页面，包含 `<template>/<script>` 示例、`request` 返回结构、校验/异常处理 Checklist。
- 给出「常见问题与调试 Checklist」：围绕依赖加载、`request` Promise、`doUiAction` 规范、样式覆盖、Storybook 验证等场景，说明排查步骤和参考链接。
- 在文末记录维护策略（触发条件、责任人、对齐资源），并标注和 `doc/jianghu-ui/jianghu-ui-prompts.md`、Storybook、`.codex/prompts` 的关联，保证后续可持续更新。

## Impact
- 新增文档：`docs/jianghu_ui_ai_handbook.md`
- 新增规范能力：`specs/ai-handbook`
- 需要审校并链接 README、`doc/jianghu-ui/jianghu-ui-prompts.md`、Storybook，确保信息一致
