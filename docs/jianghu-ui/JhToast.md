# JhToast - 全局提示组件

JhToast 基于 `v-snackbar` 封装，提供成功/错误/警告/信息/加载等多种提示效果，可用于全局消息通知。

## 功能特性

- ⚡ **多状态**：内置 success、error、warning、info、loading 五种风格
- 📍 **自由定位**：通过 `position` 控制四角/上下等位置
- 🧭 **按钮扩展**：可同时显示关闭按钮和自定义操作按钮
- ⏱️ **超时控制**：不同类型可以设置不同的超时时间，loading 默认不自动关闭
- ✨ **图标自定义**：可传入 icon/iconColor，也可完全隐藏

## 基础用法

```vue
<template>
  <jh-toast
    v-model="toast.visible"
    :message="toast.message"
    :type="toast.type"
    position="bottom-right"
    action-text="撤销"
    @action="undo"
  />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | `v-model`，控制显隐 | boolean | false |
| message | 提示文案 | string | `''` |
| type | 提示类型 `success/error/warning/info/loading` | string | `success` |
| position | 显示位置 | string | `top` |
| timeout | 自动关闭时间（ms），-1 表示常驻 | number | 3000 |
| color | 自定义背景色 | string | `''` |
| icon | 自定义图标 | string | `''` |
| iconColor | 图标颜色 | string | `white` |
| showCloseButton | 是否显示关闭按钮 | boolean | true |
| closeButtonText | 关闭按钮文案 | string | `关闭` |
| closeButtonColor | 关闭按钮颜色 | string | `white` |
| actionText | 操作按钮文本 | string | `''` |
| actionButtonColor | 操作按钮颜色 | string | `white` |
| vertical | 是否垂直布局 | boolean | false |
| elevation | 阴影高度 | number \| string | 24 |
| maxLength | 文案裁剪长度 | number | 100 |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| input | `v-model` 更新 | (visible: boolean) |
| close | Toast 消失时触发 | - |
| action | 点击操作按钮时触发 | - |

### Slots

组件不提供插槽。

## 使用建议

- 业务中可封装 store 或 composable，集中管理 `message/type/visible`
- 加载状态时 `timeout` 会自动变为 `-1`，需手动关闭
- 若需多实例并存，可在父组件中渲染多个 JhToast 或改用队列
