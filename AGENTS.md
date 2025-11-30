<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

# 江湖JS规范文档引用

本文档包含江湖JS开发规范的引用链接，供各个提示词文件共享使用。

## 规范文档

- **全局规范**: [jianghu-global.md](.codex/prompts/jianghu-rules/jianghu-global.md)
- **前端开发规范**: [jianghu-frontend.md](.codex/prompts/jianghu-rules/jianghu-frontend.md)  
- **后端开发规范**: [jianghu-backend.md](.codex/prompts/jianghu-rules/jianghu-backend.md)
- **数据结构规范**: [jianghu-data-structure.md](.codex/prompts/jianghu-rules/jianghu-data-structure.md)
- **计划规范**: [jianghu-plan.md](.codex/prompts/jianghu-rules/jianghu-plan.md)
- **InitJson规范**: [jianghu-init-json.md](.codex/prompts/jianghu-rules/jianghu-init-json.md)
- **jianghu-ui规范**: [jianghu-ui.md](.codex/prompts/jianghu-ui/README.md)

## 注意事项

- 执行操作前先写文档，所有文档放进根目录下的docs目录中
- 生成的所有文件都要为 xxx_xxx.xx 的格式，如attendance_tables.sql，sql就要放在根目录下的sql目录中，md文件要放在根目录下的docs目录中
- 要根据规范文档进行开发，不能脱离规范文档进行开发，如设计数据库时，要根据数据结构规范进行设计，如实现前端页面时，要根据UI组件规范进行实现
- 页面开发优化使用带jh-*的组件来开发，如jh-table，jh-table，可以在jianghu-ui里找到相关组件的文档，如jh-table的文档可以在[这里](.codex/prompts/jianghu-ui/jh-table.md)找到