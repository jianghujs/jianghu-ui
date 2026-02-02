# JhModal - 通用模态框

JhModal 基于 Vuetify `v-dialog`，提供标题、内容、操作区的统一模态框样式，适用于查看详情、信息提示、二次确认等场景。

## 功能特性

- 📦 **标准布局**：包含标题区、内容区、底部操作区，并支持粘性头部
- 🧲 **受控显示**：`v-model` 控制显隐，自动派发 open/close
- 🧩 **操作插槽**：`actions` 插槽可完全替换底部按钮
- 🖥️ **全屏/宽度**：通过 `fullscreen` 与 `width` 适配桌面或移动端
- 🔒 **安全交互**：`persistent` 控制遮罩点击行为，避免误关闭

## 基础用法

```vue
<template>
  <jh-modal
    v-model="visible"
    title="订单详情"
    width="720"
    :persistent="false"
    @confirm="handleSave"
  >
    <order-detail />
  </jh-modal>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | `v-model`，模态框显隐 | boolean | false |
| title | 标题文本 | string | `弹窗` |
| width | 最大宽度(px) | number \| string | 600 |
| fullscreen | 是否全屏展示 | boolean | false |
| persistent | 是否禁止点击遮罩关闭 | boolean | true |
| closable | 是否显示右上角关闭按钮 | boolean | true |
| showActions | 是否显示底部按钮区 | boolean | true |
| showConfirmButton | 是否显示确认按钮 | boolean | true |
| showCancelButton | 是否显示取消按钮 | boolean | true |
| confirmText | 确认按钮文本 | string | `确认` |
| cancelText | 取消按钮文本 | string | `取消` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| input | `v-model` 更新事件 | (visible: boolean) |
| open | 弹窗打开时触发 | - |
| close | 弹窗关闭后触发 | - |
| confirm | 点击确认按钮 | - |
| cancel | 点击取消/关闭按钮 | - |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 弹窗主体内容 |
| actions | 覆盖底部按钮区 |

## 使用建议

- 表单类模态框可以关闭 `persistent` 以允许点击遮罩取消
- 需要长列表滚动时，可在插槽内包裹自定义滚动容器
- 若不需要按钮区，直接将 `showActions` 设为 false，并自行提供底部内容
