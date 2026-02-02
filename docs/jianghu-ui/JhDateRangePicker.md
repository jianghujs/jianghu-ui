# JhDateRangePicker - 日期范围选择器

JhDateRangePicker 集成快捷日期面板与 `v-date-picker`，可通过一个输入框完成常见时间段选择，适用于报表、统计筛选等场景。

## 功能特性

- 📆 **快捷选择**：内置最近 7/30/90 天、本月、上月、最近一年等常用区间
- 🧭 **所见即所得**：左侧快捷列表 + 右侧日历联动，选择即高亮
- 🧹 **一键清除**：输入框支持 `clearable`，可快速清空区间
- 🧱 **受控组件**：通过 `v-model` 保持外部状态同步，支持 `input/change` 事件
- 🎨 **风格统一**：继承 Vuetify 文本框交互，可配置 `filled/dense/outlined` 等外观

## 基础用法

```vue
<template>
  <jh-date-range-picker
    v-model="dateRange"
    prefix="时间："
    :filled="false"
    outlined
    @change="reload"
  />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | v-model 绑定的日期数组，长度为 2 | string[] | [] |
| prefix | 输入框前缀文本 | string | `''` |
| filled | 是否使用 filled 风格 | boolean | true |
| dense | 是否紧凑 | boolean | true |
| outlined | 是否使用 outlined 风格 | boolean | false |
| hideDetails | 是否隐藏 `v-text-field` 底部提示 | boolean | true |
| clearable | 是否展示清空图标 | boolean | true |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| input | `v-model` 值变化 | (value: string[]) |
| change | 用户确认或清空时触发 | (value: string[]) |

### Slots

当前组件不提供插槽。

## 使用建议

- 如果需要自定义默认区间，可在父组件中传入初始 `value` 或监听 `menu` 打开后赋值
- 组件默认返回 `YYYY-MM-DD` 字符串，如需传时间戳可在外层自行转换
- 结合 `JhQueryFilter` 等查询组件可以统一触发搜索逻辑
