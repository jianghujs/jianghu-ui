1. [ ] **列 schema 能力**
   - [ ] 扩展 `JhTable` 的 `headers`/列定义，新增 `valueType`、`valueEnum`、`valueEnumStatusMap`、`valueFormatter`、`valueProps`、`search`（包含 `transform`, `formItemProps`, `initialValue` 等）配置
   - [ ] 将 `valueType` 映射到默认渲染器（文本/数值/金额/百分比/进度条/标签/日期区间等）与筛选控件，必要时复用 `JhFormFields`
   - [ ] 提供 `autoFilterFromHeaders` 或默认行为，使勾选 `search !== false` 的列自动注入 `JhQueryFilter`
   - [ ] Storybook 新增「列 schema」故事并更新 README

2. [ ] **内联编辑**
   - [ ] 引入 `editable` 配置（`type`, `editableKeys`, `onSave`, `onDelete`, `onCancel`, `recordCreatorProps`, `formProps` 等）
   - [ ] 支持单行/多行/受控编辑模式；结合 `JhFormFields` 完成校验，支持 `request`/`items` 两种数据源
   - [ ] 暴露 `editable-change`、`editable-save`、`editable-cancel` 事件，保证批量操作栏、分页等状态同步
   - [ ] Storybook 与 README 中补充「内联编辑」示例

3. [ ] **拖拽排序**
   - [ ] 依据 `dragSort` 配置启用列或行的拖拽，支持 `dragType: 'row' | 'handle' | 'column'`、`dragSortKey`、`columnDragFixed`
   - [ ] 触发 `drag-sort` 事件并可选持久化至 `columnsState`；与行选择、可编辑模式兼容
   - [ ] 在 Storybook/README 中新增拖拽示例并描述与业务搭配方式

4. [ ] **文档与验证**
   - [ ] 同步更新 `src/components/JhTable/README.md`、`doc/jianghu-ui/...`、`JhTable.stories.js`
   - [ ] 运行 `npm run lint`（若存在）与 `npm run storybook`/`npm run build-storybook` 进行回归
   - [ ] 补充迁移指南，描述如何从现有手写方案迁移至新 API
