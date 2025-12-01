## ADDED Requirements
### Requirement: Grid 布局开关
JhForm MUST 在 `grid=true` 或 `layout="grid"` 时使用 24 栏语义对字段进行自动排布，并将结果映射到 Vuetify 的列宽（默认 3 列一行），以对齐 ProForm 的 Grid 体验。

#### Scenario: 启用 grid 自动换行
- **GIVEN** `grid` 设为 `true` 且传入 5 个 `colSpan=8` 的字段
- **WHEN** JhForm 渲染 v-row
- **THEN** 每行最多展示 3 个字段（8+8+8=24），第 4 个字段自动换到下一行
- **AND** 默认列宽来源于 `colProps.span`（缺省 8）

#### Scenario: Submitter 占满尾行
- **GIVEN** `grid` 模式并且开启 submitter 默认按钮
- **WHEN** 渲染底部操作区
- **THEN** 操作区独占一行并左对齐栅格，与字段列宽保持对齐

### Requirement: 行列属性透传
表单级 `rowProps`、`colProps` 和字段级 `colSpan/colProps` MUST 参与最终栅格计算，允许业务覆盖不同断点的列宽，并在 inline/horizontal 布局中保持兼容。

#### Scenario: 字段覆盖列宽
- **GIVEN** 表单 `colProps` 配置 `span=6`，某字段声明 `colSpan=12`
- **WHEN** 渲染该字段
- **THEN** 该字段在 md 断点占用一半行宽，其他字段仍遵循 `colProps.span`
- **AND** 如果字段同时提供 `colProps={ md:4, lg:3 }`，应优先使用它指定的断点值

#### Scenario: 行属性透传
- **GIVEN** 传入 `rowProps={ dense: true, align: 'center' }`
- **WHEN** grid 模式渲染 `v-row`
- **THEN** 这些属性被应用到外层 `v-row`，从而控制 gutter/对齐方式