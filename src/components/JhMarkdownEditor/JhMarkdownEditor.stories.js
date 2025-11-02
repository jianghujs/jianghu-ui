import JhMarkdownEditor from './JhMarkdownEditor.vue';

export default {
  title: '基础组件/JhMarkdownEditor - Markdown编辑器',
  component: JhMarkdownEditor,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Markdown 内容',
    },
    placeholder: {
      control: 'text',
      description: '占位符文本',
    },
    height: {
      control: 'text',
      description: '编辑器高度',
    },
    width: {
      control: 'number',
      description: '编辑器宽度百分比',
    },
    editorPath: {
      control: 'text',
      description: 'Editor.md 库文件路径',
    },
    readonly: {
      control: 'boolean',
      description: '是否只读模式',
    },
    // 定义事件处理器
    onInput: { action: 'input' },
    onChange: { action: 'change' },
    onContentForSeo: { action: 'content-for-seo' },
  },
  parameters: {
    docs: {
      description: {
        component: `

基于 Editor.md 的 Markdown 编辑器组件。

## 使用前提

需要在 HTML 中引入 Editor.md 库：

\`\`\`html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/editor.md@1.5.0/css/editormd.min.css">
<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/editor.md@1.5.0/editormd.min.js"></script>
\`\`\`

## 功能特性

- 支持实时预览
- 支持代码高亮
- 支持表格、图片、链接等
- 支持撤销/重做
- 支持全屏编辑
- 支持只读模式

## 事件

- \`@input\` - 内容变化时触发，返回 Markdown 文本
- \`@change\` - 内容变化时触发，返回 Markdown 文本
- \`@content-for-seo\` - 内容变化时触发，返回预览 HTML（用于 SEO）
        `,
      },
    },
  },
};

const sampleMarkdown = `# Markdown 编辑器示例

## 功能特性

这是一个基于 **Editor.md** 的 Markdown 编辑器组件。

### 支持的功能

- **粗体文本**
- *斜体文本*
- ~~删除线~~
- \`行内代码\`

### 代码块

\`\`\`javascript
function hello() {
  console.log('Hello, JianghuJS!');
}
\`\`\`

### 列表

1. 有序列表项 1
2. 有序列表项 2
3. 有序列表项 3

- 无序列表项
- 无序列表项
- 无序列表项

### 引用

> 这是一段引用文本
> 可以跨多行

### 链接和图片

[JianghuJS](https://github.com/jianghujs)

### 表格

| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 数据1 | 数据2 | 数据3 |
| 数据4 | 数据5 | 数据6 |
`;

export const 基础示例 = {
  args: {
    value: sampleMarkdown,
    placeholder: '请输入 Markdown 内容...',
    height: '500px',
    width: 100,
    editorPath: '/public/plugins/editor.md/lib/',
    readonly: false,
  },
};

export const 空内容 = {
  args: {
    value: '',
    placeholder: '开始编写你的文档...',
    height: '400px',
    width: 100,
    editorPath: '/public/plugins/editor.md/lib/',
    readonly: false,
  },
};

export const 只读模式 = {
  args: {
    value: `# 只读模式示例

这是一个只读的 Markdown 文档。

你可以查看内容，但**无法编辑**。

\`\`\`javascript
// 代码示例
const readonly = true;
\`\`\`
`,
    placeholder: '',
    height: '400px',
    width: 100,
    editorPath: '/public/plugins/editor.md/lib/',
    readonly: true,
  },
};

export const 简化工具栏 = {
  args: {
    value: '# 简化工具栏\n\n这个编辑器使用了简化的工具栏。',
    placeholder: '请输入内容...',
    height: '400px',
    width: 100,
    editorPath: '/public/plugins/editor.md/lib/',
    readonly: false,
    toolbarIcons: [
      "undo", "redo", "|",
      "bold", "italic", "|",
      "h1", "h2", "h3", "|",
      "link", "image"
    ],
  },
};

export const 自定义高度 = {
  args: {
    value: '# 自定义高度\n\n这个编辑器的高度是 300px。',
    placeholder: '请输入内容...',
    height: '300px',
    width: 100,
    editorPath: '/public/plugins/editor.md/lib/',
    readonly: false,
  },
};
