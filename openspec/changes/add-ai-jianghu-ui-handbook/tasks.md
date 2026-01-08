# Tasks

## 1. 策划
- [x] 盘点 README、Storybook、`doc/jianghu-ui/*.md` 与 `.codex/prompts/jianghu-*`，梳理必须纳入 AI 指南的知识点与引用链接
- [x] 敲定 `docs/jianghu_ui_ai_handbook.md` 结构：元信息、运行方式、核心概念、组件速查、页面模板、FAQ/Checklist

## 2. 实施
- [x] 编写元信息 + 快速开始章节，覆盖 CDN、工程化、本地 Storybook 验证指令
- [x] 输出 doUiAction + 组件分层说明，并制作 JhTable/JhForm/JhDrawer 等组件速查矩阵（props/事件/示例片段）
- [x] 写出至少一个典型“查询 + 抽屉编辑”示例，包含 `<template>/<script>`、`request` 返回结构与错误处理要点
- [x] 收敛常见问题/调试清单，列出依赖加载、Promise 结构、UI 兼容性等排查步骤与参考资料

## 3. 验证
- [x] 对照 README 与 Storybook 验证文档内容准确性，并补充交叉链接
- [x] 运行 `openspec validate add-ai-jianghu-ui-handbook --strict`，确保提案合规
- [x] 评审并确认文档满足 AI 知识库可解析性（统一标题层级、表格结构、代码块标注）
