# JhQueryFilter - 查询过滤器

JhQueryFilter 用于在列表/报表场景中快速搭建多字段筛选区域，内置折叠、查询/重置按钮及字段联动逻辑。

## 功能特性

- 🧱 **配置化字段**：复用 JhFormFields，支持 JSON 配置与自定义插槽
- 🔁 **折叠/展开**：根据 `defaultVisibleCount` 决定初始展示字段，支持展开全部
- ⚡ **一键查询/重置**：内置按钮区，可插槽重写，也可在字段上配置 `realtime`
- 🎯 **响应式布局**：`colSpan` 控制 xs/sm/md/lg 列宽，自动适配
- 🧽 **数据清洗**：查询前自动过滤空值，并抛出 `search` 事件

## 基础用法

```vue
<template>
  <jh-query-filter
    :fields="fields"
    :initial-values="query"
    :default-visible-count="4"
    @search="handleSearch"
    @reset="handleReset"
  />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| fields | 查询字段配置 | Array | [] |
| initialValues | 初始查询数据 | Object | `{}` |
| collapsible | 是否开启折叠 | boolean | true |
| defaultCollapsed | 默认是否折叠 | boolean | true |
| defaultVisibleCount | 折叠时展示的字段数 | number | 3 |
| colSpan | 各断点的列宽设置 | Object | `{ xs:24, sm:12, md:6, lg:4 }` |
| showLabels | 是否显示字段标签 | boolean | true |
| dense | 输入框是否紧凑 | boolean | true |
| filled | 输入框是否 filled | boolean | true |
| outlined | 输入框是否 outlined | boolean | false |
| singleLine | 标签是否单行显示 | boolean | true |
| searchText | 查询按钮文案 | string | `查询` |
| resetText | 重置按钮文案 | string | `重置` |
| expandText | 折叠状态下按钮文案 | string | `展开` |
| collapseText | 展开状态下按钮文案 | string | `收起` |
| buttonSize | 按钮尺寸 `small/default/large` | string | `small` |
| buttonAlign | 按钮对齐方式 | string | `left` |
| loading | 外部 loading 状态 | boolean | false |
| labelClass | 标签 class | string | `jh-input-label` |
| inputClass | 输入框 class | string | `jh-v-input` |
| rowClass | 整体行 class | string | `ma-0` |
| buttonClass | 按钮容器 class | string | `gap-2` |
| buttonColumnClass | 操作列 class | string | `''` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| search | 点击查询或重置后触发，返回过滤后的数据 | (query: object) |
| reset | 点击重置后触发 | - |
| field-change | 字段值变化时触发 | ({ key, value, formData }) |
| collapse-change | 折叠状态切换时触发 | (collapsed: boolean) |

### Slots

| 名称 | 说明 |
| --- | --- |
| field-`key` | 自定义某个字段的渲染 |
| buttons | 自定义操作区，参数 `{ formData, search, reset }` |

## 使用建议

- 想要实时查询的字段可配置 `realtime: true`，组件会在 `field-change` 内自动触发查询
- 对于日期范围等复杂字段，可将 `type` 设置为 `slot` 并配合插槽自定义
- 若需要和表格联动，可在 `@search` 中直接触发 `loadTableData(query)`
