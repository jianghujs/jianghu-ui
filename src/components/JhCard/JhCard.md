# JhCard - 高级卡片组件

高级卡片组件，完全参考 [Ant Design ProCard](https://procomponents.ant.design/components/card/) 设计规范。

## 功能特性

- ✅ **标题和提示**: 支持标题、副标题、tooltip 提示信息
- ✅ **额外内容**: 支持右上角额外内容区域
- ✅ **边框控制**: 支持边框和标题分割线
- ✅ **幽灵模式**: 可取消背景色和 padding，适合页面布局
- ✅ **折叠功能**: 支持卡片内容折叠/展开
- ✅ **尺寸控制**: 支持 default 和 small 两种尺寸
- ✅ **加载状态**: 内置 loading 状态展示
- ✅ **操作项**: 底部操作按钮区域，自动分割线
- ✅ **布局模式**: 支持居中布局
- ✅ **分栏布局**: 支持垂直和水平分栏，自动分割线
- ✅ **栅格布局**: 支持 24 栅格系统，支持数字、像素、百分比
- ✅ **间距控制**: 支持 gutter 设置栅格间距
- ✅ **Flex 布局**: 支持 direction 控制 flex 方向
- ✅ **悬浮效果**: 支持鼠标悬浮阴影效果
- ✅ **标签页**: 支持内置标签页功能

## 基本用法

```vue
<template>
  <jh-card
    title="卡片标题"
    tooltip="这是提示信息"
    extra="额外内容"
  >
    <div>卡片内容</div>
  </jh-card>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | string | - |
| subTitle | 副标题 | string | - |
| tooltip | 标题旁边的提示信息 | string | - |
| extra | 右上角额外内容 | string | - |
| bordered | 是否有边框 | boolean | true |
| headerBordered | 标题和内容之间是否有分割线 | boolean | false |
| ghost | 幽灵模式，取消背景色和 padding | boolean | false |
| collapsible | 是否可折叠 | boolean | false |
| defaultCollapsed | 默认是否折叠 | boolean | false |
| size | 尺寸 | 'default' \| 'small' | 'default' |
| loading | 加载状态 | boolean | false |
| actions | 底部操作按钮配置 | Array | [] |
| layout | 布局方式 | 'default' \| 'center' | 'default' |
| direction | Flex 方向 | 'row' \| 'column' | 'row' |
| split | 分栏模式 | '' \| 'vertical' \| 'horizontal' | '' |
| colSpan | 栅格占比，支持数字(0-24)、像素值、百分比 | number \| string | 24 |
| gutter | 栅格间距 | number \| [number, number] | 0 |
| tabs | 标签页配置 | object | null |
| hoverable | 鼠标悬浮时是否有阴影效果 | boolean | false |
| bodyStyle | 自定义内容区样式 | object | {} |
| headStyle | 自定义头部样式 | object | {} |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| collapse | 折叠状态改变时触发 | (collapsed: boolean) |
| tab-change | 标签页切换时触发 | (key: string \| number) |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 卡片内容 |
| title | 自定义标题 |
| extra | 自定义右上角内容 |

## 使用示例

### 基础卡片

```vue
<jh-card
  title="默认尺寸"
  tooltip="这是提示"
  extra="extra"
>
  <div>Card content</div>
</jh-card>
```

### 小尺寸卡片

```vue
<jh-card
  title="小尺寸卡片"
  size="small"
>
  <div>Card content</div>
</jh-card>
```

### 带分割线的标题

```vue
<jh-card
  title="标题"
  header-bordered
>
  <div>Card content</div>
</jh-card>
```

### 可折叠卡片

```vue
<jh-card
  title="可折叠卡片"
  collapsible
>
  <div>Card content</div>
</jh-card>
```

### 加载状态

```vue
<jh-card
  title="加载中"
  loading
>
  <div>Card content</div>
</jh-card>
```

### 操作项

```vue
<jh-card
  title="Actions 操作项"
  :actions="[
    { icon: 'mdi-cog', text: '设置', onClick: () => {} },
    { icon: 'mdi-pencil', text: '编辑', onClick: () => {} },
  ]"
>
  <div>Card content</div>
</jh-card>
```

### 栅格布局

```vue
<jh-card :gutter="8">
  <jh-card :col-span="12" bordered>
    colSpan - 12
  </jh-card>
  <jh-card :col-span="6" bordered>
    colSpan - 6
  </jh-card>
  <jh-card :col-span="6" bordered>
    colSpan - 6
  </jh-card>
</jh-card>
```

### 左右分栏

```vue
<jh-card
  title="左右分栏"
  split="vertical"
  bordered
>
  <jh-card title="左侧" col-span="30%">
    左侧内容
  </jh-card>
  <jh-card title="右侧">
    右侧内容
  </jh-card>
</jh-card>
```

### 上下分栏

```vue
<jh-card
  title="上下分栏"
  split="horizontal"
  bordered
>
  <jh-card title="上部">
    上部内容
  </jh-card>
  <jh-card title="下部">
    下部内容
  </jh-card>
</jh-card>
```

### 幽灵模式

```vue
<jh-card ghost>
  <div>无背景色和 padding</div>
</jh-card>
```

### 居中布局

```vue
<jh-card layout="center" style="min-height: 200px;">
  <div>内容居中</div>
</jh-card>
```

### 悬浮效果

```vue
<jh-card hoverable>
  <div>鼠标悬浮时有阴影</div>
</jh-card>
```

## 设计规范

本组件完全参考 Ant Design ProCard 的设计规范：

1. **布局灵活**: 支持栅格、分栏、嵌套等多种布局方式
2. **样式统一**: 遵循 Ant Design 设计语言
3. **功能完整**: 包含标题、操作项、折叠、加载等常用功能
4. **易于使用**: API 设计简洁，上手容易

## 注意事项

1. 使用分栏布局（split）时，子卡片的圆角会被设置为 0
2. 幽灵模式（ghost）会取消背景色和 padding，适合用于页面布局
3. colSpan 支持多种格式：数字（0-24）、像素值（如 "200px"）、百分比（如 "30%"）
4. gutter 可以是数字或数组，数组格式为 [水平间距, 垂直间距]
5. 嵌套使用时，组件会自动切换为 flex 弹性盒布局

## 相关链接

- [Ant Design ProCard](https://procomponents.ant.design/components/card/)
- [Vuetify Card](https://vuetifyjs.com/en/components/cards/)
