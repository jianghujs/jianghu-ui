# 方案：补齐 JhTable 与 ProComponents Table 的关键特性

## 背景
- `JhTable` 已提供 headerTitle、列状态（`columnsState`）、批量操作提示、轮询、防抖、工具栏、`JhQueryFilter` 等能力（参考 `src/components/JhTable/JhTable.md`），可覆盖江湖平台常见的 CRUD 列表场景。
- 但对照参考实现 [Ant Design ProComponents Table](https://procomponents.ant.design/components/table)，仍缺少若干高级能力：列配置缺乏 `valueType/valueEnum` 等 schema 语义、表格无法内联编辑、也没有内置的拖拽排序。上述能力在平台中已有落地需求（如动态签批表、配置项拖拽、列表的一键修订），目前只能通过额外封装或手写代码解决，体验割裂。

## 目标
1. **列 schema 语义对齐**：扩展 `headers` 配置，支持 `valueType/valueEnum`、`valueFormatter`、`search` 等语义，自动驱动展示与筛选，降低重复模板代码。
2. **内联编辑能力**：提供 ProTable 风格的 `editable` 配置（`editableKeys`、`onSave`、`recordCreatorProps` 等），让业务页可直接在表格中编辑与新增行，并复用现有 `JhFormFields` 验证。
3. **拖拽排序能力**：支持列/行拖动（`dragSortKey`、`dragType`），可持久化顺序并触发 `drag-sort` 事件，用于配置类场景。

## 范围与交付
- 交付新的 schema、editable、drag-sort 相关 API 与文档示例，保持向后兼容。
- Storybook 中新增对应 demo，用于验证 UI/交互。
- 文档更新：`src/components/JhTable/JhTable.md`、`doc/jianghu-ui/…` 的 JhTable 章节。
- 发布前执行 `npm run storybook` 与 `npm run build`.

## 非目标
- 不改动现有分页、请求协议（`request({ pageSize, current, sorter, filters })`）。
- 不实现虚拟滚动/大数据行渲染（另行立项）。
- 不强制替换业务端已有的手写 editable/拖拽实现，但提供迁移指南。

## 成功指标
- 配置型列表可通过 `headers` + `editable` + `dragSort` API 满足 90% 常见需求，无需二次封装。
- 新增示例涵盖「列 schema 渲染」「内联编辑」「拖拽排序」三类场景，CI 中 Storybook 构建通过。
- 文档中明确与 ProComponents Table 的对应关系，便于 AI 助手与新人搜索。
