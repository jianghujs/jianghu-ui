# jhtable-editable Specification

## Purpose
TBD - created by archiving change update-jhtable-protable-parity. Update Purpose after archive.
## Requirements
### Requirement: Inline Editing Mode
JhTable MUST expose一个 `editable` 配置对象，允许切换单行/多行内联编辑，并与 `editableKeys` 和事件勾连。

#### Scenario: controlled editable keys
- **GIVEN** 组件设置 `:editable=\"{ type: 'multiple', editableKeys, onSave }\"`
- **WHEN** 外部更新 `editableKeys`
- **THEN** JhTable MUST只让这些行进入编辑态，并通过 `update:editableKeys`/`editable-change` 反馈用户在 UI 中新增或取消的行

#### Scenario: save hook
- **GIVEN** 用户在编辑态中点击保存
- **WHEN** `editable.onSave` 返回 `Promise.resolve()`
- **THEN** JhTable MUST退出该行的编辑态并更新 `items`/触发 `reload()`；若返回 `Promise.reject` 或 `false`，组件 MUST保持编辑态并展示错误

### Requirement: Record Creation Entry
JhTable MUST允许通过 `editable.recordCreatorProps` 在表头或表尾插入一行“新增”入口，与 ProTable 的 `recordCreatorProps` 行为一致。

#### Scenario: bottom record creator
- **GIVEN** `recordCreatorProps = { position: 'bottom', record: () => ({ status: 'draft' }) }`
- **WHEN** 用户点击“新增一行”
- **THEN** JhTable MUST在表格底部追加一行草稿，自动进入编辑态，并将 `record()` 的返回值作为初始表单数据

### Requirement: Editable Action Customization
JhTable MUST允许通过 `editable.actionRender` 定制默认的「保存/取消/删除」按钮，以适配特殊业务流程。

#### Scenario: custom action render
- **GIVEN** `actionRender` 返回自定义按钮数组
- **WHEN** 渲染操作列时检测到编辑态
- **THEN** JhTable MUST替换默认按钮并传入 `{ save, cancel, delete }` 方法，保证用户自定义按钮能够触发这些操作

