# JhMask - 遮罩层组件

JhMask 基于 Vuetify `v-overlay` 封装，可用于页面 loading、全屏提示或阻断操作等场景。

## 功能特性

- 🌗 **背景可配**：颜色、透明度、zIndex 均可通过 props 设置
- ⏱️ **自动超时**：`timeout` 到期自动关闭并触发事件
- 🔁 **loading 集成**：内置进度环，也可通过插槽放置自定义内容
- 🖱️ **点击交互**：`closeOnClick` 允许点击遮罩直接关闭
- 🔒 **受控显示**：`v-model` 与父组件保持同步

## 基础用法

```vue
<template>
  <jh-mask
    v-model="maskVisible"
    :show-loading="true"
    loading-color="success"
    :timeout="10000"
    @timeout="handleTimeout"
  />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | `v-model`，控制是否显示 | boolean | false |
| color | 背景色 | string | `#e3e3e3` |
| opacity | 透明度 0-1 | number \| string | 0.8 |
| zIndex | 遮罩层层级 | number \| string | 300 |
| showLoading | 是否显示内置 loading | boolean | false |
| loadingSize | loading 直径 | number \| string | 64 |
| loadingWidth | loading 线宽 | number \| string | 7 |
| loadingColor | loading 颜色 | string | `primary` |
| closeOnClick | 点击遮罩是否关闭 | boolean | false |
| timeout | 自动关闭时间（ms），0 表示不自动关闭 | number | 0 |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| input | `v-model` 更新事件 | (visible: boolean) |
| click | 在 `closeOnClick`=true 且被点击时触发 | - |
| timeout | 达到超时时间自动触发 | - |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义遮罩内容，可放置提示文案或自定义 loading |

## 使用建议

- 需要阻断用户操作时建议 `closeOnClick=false` 并增加提示文案
- 当与异步任务绑定时，可在任务完成后手动将 `value` 设为 false 以取消遮罩
- 通过插槽配合 `JhToast` 等组件可以快速实现“处理中”提示
