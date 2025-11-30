## ADDED Requirements

### Requirement: Schema-Based Column Rendering
JhTable MUST 允许 `headers` schema 通过 `valueType`、`valueEnum`、`valueEnumStatusMap`、`valueFormatter` 与 `valueProps` 定义单元格渲染逻辑，以复刻 ProComponents Table 的语义化展示体验。
#### Scenario: render status with valueEnum
- **GIVEN** 某列配置 `valueType: 'status'`、`valueEnumStatusMap = { warning: { color: 'orange darken-2' } }` 且 `valueEnum = { pending: { text: '待审核', status: 'warning', icon: 'mdi-clock' } }`
- **WHEN** 表格渲染该列
- **THEN** JhTable MUST 以默认状态组件（如 `v-chip`）展示 `待审核`，继承 `warning` 色彩/图标，并允许通过 `valueEnumStatusMap` 覆盖颜色
- **AND** 单元格 hover/tooltip 行为与其它列保持一致
#### Scenario: override renderer with valueFormatter
- **GIVEN** 列配置 `valueType: 'money'` 且 `valueFormatter = (row) => "${row.amount / 100} 万"`
- **WHEN** 表格渲染该列
- **THEN** JhTable MUST 调用 `valueFormatter` 的返回值替换默认货币格式，并在 `valueProps`（如 `precision`、`currencySymbol`）未设置时套用通用格式
#### Scenario: extend renderer via valueProps
- **GIVEN** 列设置 `valueType: 'progress'` 且 `valueProps = { color: 'success', height: 6 }`
- **WHEN** 表格渲染该列
- **THEN** JhTable MUST 将 `valueProps` 透传给默认渲染器（如 `v-progress-linear`），以实现颜色与样式的可配置
#### Scenario: default renderer fallback
- **GIVEN** 列仅配置 `valueType: 'text'` 或未声明 schema 字段
- **WHEN** 表格渲染该列
- **THEN** JhTable MUST 回退到纯文本渲染，并确保 `valueFormatter` 或 `scopedSlots` 可以覆盖默认内容

### Requirement: Column-Driven Search Form
JhTable MUST 能够根据列 `schema` 自动生成筛选表单项，并与 `JhQueryFilter` 打通，支持 `search` 配置中的 `valueType`、`formItemProps`、`transform`、`initialValue`，实现「列配置即搜索配置」。
#### Scenario: auto build select filter from valueEnum
- **GIVEN** 列包含 `valueEnum` 且 `search !== false`（或 `search` 为对象）
- **WHEN** 启用自动筛选（默认行为，或显式 `autoFilterFromHeaders = true`）
- **THEN** JhTable MUST 在筛选区渲染一个以 valueEnum 为选项的数据源控件，并把用户选择的值通过 `transform`/`valueEnumKey` 同步到 `request` 的 `filters`
#### Scenario: respect manual filter definitions
- **GIVEN** 用户手动传入 `filterFields` 中同名字段
- **WHEN** 自动生成逻辑检测到重复
- **THEN** JhTable MUST 保留用户定义的控件，并跳过自动生成，确保可完全自定义筛选 UI
#### Scenario: apply transform and initialValue
- **GIVEN** 列配置 `search = { valueType: 'dateRange', initialValue: ['2024-01-01', '2024-01-31'], transform: (value) => ({ startDate: value[0], endDate: value[1] }) }`
- **WHEN** 表格实例化筛选表单并提交
- **THEN** `JhQueryFilter` MUST 以 `initialValue` 预填日期区间
- **AND** 当用户提交筛选时，JhTable MUST 调用 `transform`，将结果解构注入 `request({ filters })`，以匹配后端期望的 `startDate/endDate`
