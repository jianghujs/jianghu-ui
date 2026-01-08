# JhDrawerForm - 抽屉表单组件

JhDrawerForm 结合 JhForm 与抽屉交互，提供一站式的复杂表单容器，适用于创建、编辑、批量配置等场景。

## 功能特性

- 🧱 **抽屉展示**：继承 JhDrawer 交互，支持左右滑出、头部按钮、浮动关闭
- 🧩 **JSON 配置渲染**：内置 JhForm，可通过字段配置快速生成表单
- 🔁 **自动重置**：抽屉打开时自动重置表单与校验状态
- 🧯 **表单方法透出**：提供 `getFormData`、`validate` 等方法，方便父组件调用
- 🎛️ **插槽灵活**：支持 `field-xxx` 自定义字段、`actions` 重写按钮区

## 基础用法

```vue
<template>
  <jh-drawer-form
    v-model="drawerVisible"
    title="编辑商品"
    :fields="formFields"
    :initial-data="formData"
    @confirm="submit"
  />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | v-model，抽屉显隐 | boolean | false |
| title | 抽屉标题 | string | `表单` |
| position | 抽屉位置 `left/right` | string | `right` |
| width | 抽屉宽度 | string | `90%` |
| showConfirmButton | 是否显示确认按钮 | boolean | true |
| confirmText | 确认按钮文本 | string | `确认` |
| cancelText | 取消按钮文本 | string | `取消` |
| formRef | 内部 JhForm 的 ref 名称 | string | `drawerForm` |
| validateBeforeConfirm | 点击确认时是否先校验 | boolean | true |
| fields | JhForm 字段配置数组 | Array | [] |
| initialData | 初始表单数据 | Object | `{}` |
| rowClass | 自定义行 class | string | `mt-0` |
| validationRules | 通用验证规则 | Object | 预置常用规则 |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| input | `v-model` 更新事件 | (visible: boolean) |
| close | 抽屉关闭时触发 | - |
| confirm | 校验通过后触发 | (formData: object) |
| cancel | 点击取消/浮动按钮时触发 | - |
| field-change | JhForm 字段变化时触发 | ({ key, value, formData }) |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 覆盖整个内容区域，自行渲染 | 
| actions | 自定义头部按钮区 |
| field-`key` | 针对某个字段自定义渲染，`key` 为字段 `key` 值 |

## 常用技巧

- 通过 `this.$refs.drawerForm.getFormData()` 可在外层随时读取当前表单
- 如果需要在关闭后保留数据，可在外部监听 `close` 再决定是否重置
- 表单字段中可结合 `type: 'slot'` 与 `field-xxx` 插槽编写自定义组件
