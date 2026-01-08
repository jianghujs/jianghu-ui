# JhWaterMark 水印

水印组件，参考 Ant Design WaterMark 设计规范。给页面的某个区域加上水印，适用于防止信息盗用。

## 何时使用

- 页面需要添加水印标识版权时
- 适用于防止信息盗用的场景
- 保护敏感数据和机密文档

## 基本用法

```vue
<template>
  <jh-water-mark content="江湖 JiangHu">
    <div style="height: 400px;">
      <!-- 你的内容 -->
    </div>
  </jh-water-mark>
</template>
```

## 多行文本

```vue
<template>
  <jh-water-mark :content="['江湖 JiangHu', 'Watermark Demo']">
    <div style="height: 400px;">
      <!-- 你的内容 -->
    </div>
  </jh-water-mark>
</template>
```

## 图片水印

```vue
<template>
  <jh-water-mark
    :width="130"
    :height="30"
    image="https://example.com/logo.png"
  >
    <div style="height: 400px;">
      <!-- 你的内容 -->
    </div>
  </jh-water-mark>
</template>
```

## 自定义配置

```vue
<template>
  <jh-water-mark
    content="江湖 JiangHu"
    :width="150"
    :height="80"
    :rotate="-30"
    :gap-x="100"
    :gap-y="100"
    :font="{
      color: 'rgba(0, 0, 0, 0.25)',
      fontSize: 20,
      fontWeight: 'bold'
    }"
  >
    <div style="height: 400px;">
      <!-- 你的内容 -->
    </div>
  </jh-water-mark>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 水印文字内容，支持字符串数组实现多行文本 | `string \| string[]` | `''` |
| image | 图片源，建议导出 2 倍或 3 倍图，优先级高于文字 | `string` | `''` |
| width | 水印整体宽度 | `number` | `120` |
| height | 水印整体高度 | `number` | `64` |
| rotate | 水印旋转角度 | `number` | `-22` |
| gapX | 水印之间的水平间距 | `number` | `212` |
| gapY | 水印之间的垂直间距 | `number` | `222` |
| offsetX | 水印在 canvas 画布上绘制的水平偏移量，正常情况下，水印绘制在中间位置，即 offsetX = gapX / 2 | `number` | `gapX / 2` |
| offsetY | 水印在 canvas 画布上绘制的垂直偏移量，正常情况下，水印绘制在中间位置，即 offsetY = gapY / 2 | `number` | `gapY / 2` |
| font | 字体配置，详见下方 Font 配置 | `object` | 见下方 |
| zIndex | 水印层的 z-index | `number` | `9` |
| getContainer | 追加的水印元素的根节点 | `() => HTMLElement` | `undefined` |

### Font 配置

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| color | 字体颜色 | `string` | `'rgba(0, 0, 0, 0.15)'` |
| fontSize | 字体大小 | `number` | `16` |
| fontWeight | 字体粗细 | `string \| number` | `'normal'` |
| fontFamily | 字体类型 | `string` | `'sans-serif'` |
| fontStyle | 字体样式 | `'none' \| 'normal' \| 'italic' \| 'oblique'` | `'normal'` |
| textAlign | 文字对齐 | `string` | `'center'` |

## 特性

### 防删除保护

水印组件内置了防删除和防修改机制，使用 `MutationObserver` 监听 DOM 变化：

- 即使通过开发者工具删除水印元素，也会自动恢复
- 即使修改水印元素的样式，也会自动恢复
- 保证水印始终存在，有效防止信息泄露

### Canvas 渲染

使用 Canvas 绘制水印，具有以下优势：

- 性能优秀，不影响页面渲染
- 支持文字和图片两种水印类型
- 支持自定义旋转角度和间距
- 生成 base64 图片作为背景，浏览器兼容性好

### 响应式

水印会自动填充整个容器区域，适应不同尺寸的容器。

## 使用场景

### 文档保护

```vue
<template>
  <jh-water-mark content="机密文档">
    <div class="document">
      <h3>机密文档</h3>
      <p>文档内容...</p>
    </div>
  </jh-water-mark>
</template>
```

### 数据表格

```vue
<template>
  <jh-water-mark content="内部数据" :font="{ color: 'rgba(0, 0, 0, 0.1)' }">
    <v-data-table :items="items" :headers="headers" />
  </jh-water-mark>
</template>
```

### 图片预览

```vue
<template>
  <jh-water-mark :content="['设计稿', '仅供预览']">
    <img src="design.png" style="width: 100%;" />
  </jh-water-mark>
</template>
```

## 注意事项

1. **图片水印**：建议使用 2 倍或 3 倍图以保证清晰度
2. **颜色选择**：建议使用半透明颜色，避免影响内容阅读
3. **尺寸调整**：较大的字体需要相应增加 width 和 height
4. **性能考虑**：水印使用 Canvas 渲染，性能优秀，但在极大容器中可能需要注意
5. **跨域图片**：使用图片水印时，如果图片跨域，需要服务器配置 CORS

## 设计规范

本组件完全参考 Ant Design WaterMark 设计规范：

- 默认旋转角度：-22°
- 默认水平间距：212px
- 默认垂直间距：222px
- 默认字体颜色：rgba(0, 0, 0, 0.15)
- 默认字体大小：16px
- 水印层级：z-index: 9

## 浏览器兼容性

- 现代浏览器（Chrome、Firefox、Safari、Edge）
- IE 11+（需要 MutationObserver polyfill）

## 相关链接

- [Ant Design WaterMark](https://ant.design/components/watermark/)
- [Ant Design ProComponents](https://procomponents.ant.design/)
