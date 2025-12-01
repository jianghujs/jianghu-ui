1. [x] 实现 Grid：根据 `grid/layout="grid"` 重构字段栅格渲染，支持 `rowProps`、`colProps`、`field.colSpan/colProps`，并让 actions 区域占满尾行。
2. [x] Storybook 示例：新增 JhForm Grid 示例，验证多列排布、列宽覆盖与尾部对齐。
3. [x] 文档更新：补充 `.codex/prompts/jianghu-ui/component/JhForm.md` 与 `src/components/JhForm/README.md` 的 Grid 用法说明。
4. [x] 验证：执行 `openspec validate update-jhform-proform-features --strict`，并手动回归 JhForm/JhDrawerForm/JhModalForm 的 grid/非 grid 行为。
