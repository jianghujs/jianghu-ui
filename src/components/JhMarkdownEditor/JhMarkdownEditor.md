# JhMarkdownEditor - Markdown 编辑器

JhMarkdownEditor 基于 Editor.md 封装，提供全功能 Markdown 编辑、预览与 SEO HTML 输出能力。

## 功能特性

- ✍️ **所写即所得**：支持 watch/preview 模式，实时查看渲染结果
- 🧰 **工具栏可配置**：`toolbarIcons` 控制显示的按钮，满足精简或全量需求
- 📏 **尺寸可调**：通过 `height/width` 自由适配弹窗、页面等不同场景
- 🔒 **只读模式**：`readonly` 用于详情页展示，禁用编辑能力
- 📤 **内容输出**：`content-for-seo` 事件提供编译后的 HTML，可用于摘要

## 基础用法

```vue
<template>
  <jh-markdown-editor
    v-model="content"
    height="520px"
    placeholder="请输入文章内容"
    @content-for-seo="storeHtml"
  />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 双向绑定的 Markdown 文本 | string | `''` |
| placeholder | 输入提示 | string | `请输入内容...` |
| height | 编辑器高度 | string | `calc(100vh - 400px)` |
| width | 编辑器宽度百分比 | number | 100 |
| editorPath | Editor.md 静态资源路径 | string | `/public/plugins/editor.md/lib/` |
| toolbarIcons | 工具栏图标数组 | string[] | 预置常用图标 |
| readonly | 是否只读 | boolean | false |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| input | `v-model` 更新 | (value: string) |
| change | markdown 内容变化 | (value: string) |
| content-for-seo | 返回编译后的 HTML 片段 | (html: string) |

### Slots

组件无插槽。

## 使用建议

- 需在页面提前加载 Editor.md 依赖 (`window.editormd`)，否则组件会给出告警
- 如果需要插入模板内容，可通过 `ref` 调用 `insertValue`
- watch `value` 时注意避免循环：组件内部已通过 `isMDChange` 做了同步保护
