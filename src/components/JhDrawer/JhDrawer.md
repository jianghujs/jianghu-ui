# JhDrawer - 抽屉面板组件

JhDrawer 提供左右滑出的信息面板，包含统一的头部、操作按钮和默认内容区域，适合在列表页展示详情、表单或设置。

## 功能特性

- 📐 **左右滑出**：通过 `position` 快速切换左/右抽屉
- 🎯 **受控显示**：`v-model` 控制开关，自动派发 open/close 事件
- 🧩 **插槽扩展**：`actions` 插槽可自定义按钮组，默认提供确定/取消
- 📏 **自定义尺寸**：支持百分比或像素宽度，满足不同布局
- 🔔 **快捷操作**：内置浮动关闭按钮，移动端也可轻松关闭

## 基础用法

```vue
<template>
  <jh-drawer
    v-model="visible"
    title="高级筛选"
    width="480px"
    @confirm="submit"
    @cancel="close"
  >
    <filter-form />
  </jh-drawer>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | v-model，抽屉显隐 | boolean | false |
| title | 标题文本 | string | `抽屉` |
| position | 抽屉位置 `left/right` | string | `right` |
| width | 抽屉宽度，支持百分比或像素 | string | `90%` |
| showConfirmButton | 是否显示确认按钮 | boolean | true |
| showCancelButton | 是否显示取消按钮 | boolean | true |
| showCloseButton | 是否显示浮动关闭按钮 | boolean | true |
| confirmText | 确认按钮文本 | string | `确认` |
| cancelText | 取消按钮文本 | string | `取消` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| input | `v-model` 绑定事件 | (visible: boolean) |
| open | 抽屉打开时触发 | - |
| close | 抽屉关闭后触发 | - |
| confirm | 点击确认按钮触发 | - |
| cancel | 点击取消按钮或浮动关闭触发 | - |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 主体内容区域 |
| actions | 头部按钮区域，覆盖默认确认/取消按钮 |

## 使用建议

- 当抽屉内容需要滚动时，可自行在插槽内部包裹滚动容器
- 通过监听 `confirm/cancel` 事件，在外部控制提交或关闭逻辑
- 配合 `JhDrawerForm` 可以快速构建配置中心、复杂筛选面板
