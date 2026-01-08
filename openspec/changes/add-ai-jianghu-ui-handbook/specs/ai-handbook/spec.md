## ADDED Requirements

### Requirement: AI 手册需输出结构化元信息与运行方式
文档 MUST 位于 `docs/jianghu_ui_ai_handbook.md`，并在开头提供固定顺序的元信息（标题、适用版本、最近更新时间、依赖/引用列表），随后用独立章节详述 CDN 与工程化两种运行方式及本地 Storybook 验证流程。

#### Scenario: AI 检索 jianghu-ui 快速开始
- **GIVEN** 需要把 jianghu-ui 接入一个新项目
- **WHEN** AI 读取 `docs/jianghu_ui_ai_handbook.md` 的元信息与运行方式章节
- **THEN** 可以直接获得依赖栈、CDN/本地命令、Storybook 入口以及需要锁定版本的注意事项

### Requirement: 手册必须解释核心概念与 doUiAction 数据流
文档 MUST 用清晰标题讲解 Jh 组件分层、命名规范、`doUiAction` 调用链、`window.jianghuAxios`/`window.vtoast` 约定，并用表格列出常用前缀（prepare/get/do/ui/confirm/validate）及其职责。

#### Scenario: AI 需要编排 doUiAction
- **GIVEN** AI 读取核心概念章节
- **WHEN** 需要生成含 `doUiAction` 的交互代码
- **THEN** 能根据表格得知命名规则、调用顺序以及请求/提示工具的使用边界

### Requirement: 提供组件速查矩阵
文档 MUST 覆盖至少 8 个高频 `jh-*` 组件（JhLayout、JhPageContainer、JhTable、JhForm、JhDrawer、JhModalForm、JhConfirmDialog、JhDescriptions），并以表格形式列出“适用场景、关键 props/slots、核心事件、最小示例片段”。

#### Scenario: AI 需要选择组件
- **GIVEN** AI 在手册中查找组件矩阵
- **WHEN** 想要知道某个页面需要用哪个 `jh-*` 组件以及如何绑定 props
- **THEN** 可以从表格直接复制示例或了解事件名称，而无需翻源码

### Requirement: 提供端到端页面模板与调试清单
手册 MUST 包含至少一个“列表 + 抽屉编辑 + 表单 + doUiAction”模板（完整 `<template>`、`<script>`、`request` 返回结构、错误处理提示）以及一个覆盖依赖加载、Promise 结构、样式/验证问题的调试 Checklist。

#### Scenario: AI 需要生成典型页面
- **GIVEN** 业务要构建查询+抽屉编辑场景
- **WHEN** AI 查阅模板与 Checklist
- **THEN** 能复用示例代码并按 Checklist 自检（如确认 `request` 返回 `{ data,total,success }`、抽屉关闭逻辑、依赖引入顺序）
