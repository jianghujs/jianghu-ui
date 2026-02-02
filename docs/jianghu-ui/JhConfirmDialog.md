# JhConfirmDialog - 确认对话框组件

JhConfirmDialog 基于 Vuetify `v-dialog` 实现，提供统一的确认/取消交互体验，支持异步校验、loading 状态和完全自定义内容，适用于删除、提交、状态切换等需要最终确认的场景。

## 功能特性

- ✅ **标题与内容自定义**：支持传入纯文本、HTML 或通过插槽渲染自定义结构
- ✅ **确认/取消按钮可配置**：文字、颜色、显隐均可通过 props 控制
- ✅ **异步拦截**：`beforeConfirm`、`beforeCancel` 支持返回 `false` 阻断关闭，方便做表单校验
- ✅ **loading 态**：配合 `loading` 属性即可在确认阶段展示加载动画
- ✅ **行为事件齐全**：支持 confirm/cancel/click-outside 等事件，方便接入埋点

## 基础用法

```vue
<template>
  <jh-confirm-dialog
    v-model="visible"
    title="删除确认"
    content="确定要删除这条记录吗？此操作不可恢复。"
    :before-confirm="handleBeforeConfirm"
    :loading="submitting"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | v-model，控制对话框显示 | boolean | false |
| title | 标题文本 | string | `提示` |
| content | 内容文本（可包含 HTML） | string | `''` |
| contentClass | 内容区域 class | string | `pa-6 text-pre-line` |
| maxWidth | 最大宽度 | number \| string | 420 |
| showCancelButton | 是否展示取消按钮 | boolean | true |
| confirmButtonText | 确认按钮文案 | string | `确定` |
| cancelButtonText | 取消按钮文案 | string | `取消` |
| confirmButtonColor | 确认按钮颜色 | string | `primary` |
| cancelButtonColor | 取消按钮颜色 | string | `default` |
| persistent | 是否禁止点击遮罩关闭 | boolean | false |
| loading | 确认按钮 loading 状态 | boolean | false |
| beforeConfirm | 确认前钩子，返回 false 阻断关闭 | Function | null |
| beforeCancel | 取消前钩子，返回 false 阻断关闭 | Function | null |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| input | `v-model` 双向绑定事件 | (visible: boolean) |
| confirm | 点击确认后触发 | - |
| cancel | 点击取消或遮罩关闭时触发 | - |
| click-outside | 点击遮罩区域触发 | - |

### Slots

| 名称 | 说明 |
| --- | --- |
| title | 自定义标题内容 |
| default | 自定义内容区域 |

## 使用建议

- 需要异步确认时让 `beforeConfirm` 返回 `false`，待操作成功后再手动关闭
- 在危险操作上将 `persistent` 设为 `true`，避免误触关闭
- 自定义内容时可通过插槽输出复杂表单、列表或高亮提示
