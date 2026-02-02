# JhJsonEditor - JSON 可视化编辑器

JhJsonEditor 封装 JSONEditor 库，支持 Tree、Code 等多种视图，适用于复杂配置、数据调试场景。

## 功能特性

- 🌲 **多模式切换**：支持 tree、code、form、text、view 等模式
- 🪄 **格式化能力**：输入字符串会自动尝试 `JSON.parse` 并在编辑器中格式化展示
- 📂 **展开控制**：`expandedOnStart` 搭配 tree/view 模式自动展开节点
- 🚨 **错误提示**：实时捕获解析错误并通过 `has-error` 通知外部
- 📏 **高度自定义**：`height` 属性可根据所在页面灵活设置

## 基础用法

```vue
<template>
  <jh-json-editor
    v-model="jsonValue"
    mode="tree"
    :expanded-on-start="true"
    height="600px"
    @has-error="handleError"
  />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 双向绑定的 JSON 数据（对象或字符串） | string \| number \| object \| array | `{}` |
| expandedOnStart | 是否在 tree/view 模式自动展开全部节点 | boolean | false |
| mode | 默认模式 | string | `code` |
| modes | 可切换的模式数组 | string[] | `[tree, code, form, text, view]` |
| height | 编辑器容器高度 | string | `calc(100vh - 240px)` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| input | `v-model` 更新事件 | (value: any) |
| has-error | JSON 解析错误状态 | (hasError: boolean) |

### Slots

组件无插槽。

## 使用建议

- 在页面中引入 JSONEditor 静态资源（JS/CSS），否则组件会提示未加载
- 如果需要强制输出字符串，可在外部 watch `value` 并手动 `JSON.stringify`
- 当编辑大数据时建议设置合适的高度并启用 `expandedOnStart=false` 以提升性能
