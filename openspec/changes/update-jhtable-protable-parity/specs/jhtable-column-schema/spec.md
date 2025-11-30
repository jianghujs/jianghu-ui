## ADDED Requirements

### Requirement: Schema-Based Column Rendering
JhTable MUST支持在 `headers` 中声明 `valueType`、`valueEnum`、`valueFormatter` 等语义字段，通过统一渲染逻辑输出与 ProComponents Table 一致的状态/数字/时间表现。

#### Scenario: render status with valueEnum
- **GIVEN** 某列在 `headers` 中配置 `valueType: 'status'` 且提供 `valueEnum = { pending: { text: '待审核', status: 'warning' } }`
- **WHEN** 表格渲染该列
- **THEN** JhTable MUST以默认的状态组件（如 `v-chip`）展示 `待审核`，并继承 `warning` 色彩
- **AND** 如果同一列配置了 `valueFormatter`，组件 MUST使用返回值覆盖默认展示

#### Scenario: default renderer fallback
- **GIVEN** 列仅配置 `valueType: 'money'`
- **WHEN** 表格渲染该列
- **THEN** JhTable MUST自动格式化数值（千分位 + 货币符号），并在 `valueProps` 允许覆写精度/符号

### Requirement: Column-Driven Search Form
JhTable MUST能够根据列 schema 自动生成筛选表单项，并与现有 `JhQueryFilter` 打通，实现「列配置即搜索配置」。

#### Scenario: auto build select filter from valueEnum
- **GIVEN** 列包含 `valueEnum` 且 `search !== false`
- **WHEN** 启用自动筛选（默认行为）
- **THEN** JhTable MUST在筛选区渲染一个以 valueEnum 为选项的下拉框，并把用户选择的值通过 `transform`/`valueEnumKey` 同步到 `request` 的 `filters`

#### Scenario: respect manual filter definitions
- **GIVEN** 用户手动传入 `filterFields` 中同名 `field`
- **WHEN** 自动生成逻辑检测到重复键
- **THEN** JhTable MUST保留用户定义的控件，并跳过自动生成，确保可完全自定义筛选 UI
