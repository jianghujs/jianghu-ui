import JhJsonEditor from './JhJsonEditor.vue';

export default {
  title: '基础组件/JhJsonEditor - JSON编辑器',
  component: JhJsonEditor,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'object',
      description: 'JSON 数据值，可以是字符串、对象或数组',
    },
    mode: {
      control: 'select',
      options: ['tree', 'code', 'form', 'text', 'view'],
      description: '编辑器模式',
    },
    modes: {
      control: 'object',
      description: '可用的编辑器模式列表',
    },
    expandedOnStart: {
      control: 'boolean',
      description: '是否在启动时展开所有节点',
    },
    height: {
      control: 'text',
      description: '编辑器高度',
    },
    // 定义事件处理器
    onInput: { action: 'input' },
    onHasError: { action: 'has-error' },
  },
  parameters: {
    docs: {
      description: {
        component: `

基于 JSONEditor 的可视化 JSON 编辑器组件。

## 使用前提

需要在 HTML 中引入 JSONEditor 库：

\`\`\`html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jsoneditor@9.10.0/dist/jsoneditor.min.css">
<script src="https://cdn.jsdelivr.net/npm/jsoneditor@9.10.0/dist/jsoneditor.min.js"></script>
\`\`\`

## 功能特性

- 支持多种编辑模式：树形、代码、表单、文本、预览
- 实时验证 JSON 格式
- 支持展开/折叠节点
- 支持搜索和过滤
- 自定义主题色

## 事件

- \`@input\` - 内容变化时触发，返回更新后的 JSON 值
- \`@has-error\` - JSON 格式验证状态变化时触发，返回布尔值
        `,
      },
    },
  },
};

export const 基础示例 = {
  args: {
    value: {
      name: 'JianghuJS',
      version: '1.0.0',
      features: ['Vue 2', 'Vuetify 2', 'Storybook'],
      config: {
        theme: 'light',
        language: 'zh-CN',
      },
    },
    mode: 'code',
    modes: ['tree', 'code', 'form', 'text', 'view'],
    expandedOnStart: false,
    height: '400px',
  },
};

export const 代码模式 = {
  args: {
    value: {
      users: [
        { id: 1, name: '张三', age: 25 },
        { id: 2, name: '李四', age: 30 },
      ],
      total: 2,
    },
    mode: 'code',
    modes: ['tree', 'code', 'form', 'text', 'view'],
    expandedOnStart: false,
    height: '400px',
  },
};

export const 预览模式 = {
  args: {
    value: {
      title: '只读预览模式',
      description: '此模式下不可编辑',
      data: {
        readonly: true,
      },
    },
    mode: 'view',
    modes: ['view'],
    expandedOnStart: true,
    height: '400px',
  },
};

export const 字符串值 = {
  args: {
    value: '{"message": "从字符串解析的 JSON", "timestamp": "2025-01-19"}',
    mode: 'code',
    modes: ['tree', 'code', 'form', 'text', 'view'],
    expandedOnStart: true,
    height: '400px',
  },
};

export const 数组值 = {
  args: {
    value: [
      { id: 1, name: '组件1', type: 'input' },
      { id: 2, name: '组件2', type: 'select' },
      { id: 3, name: '组件3', type: 'checkbox' },
    ],
    mode: 'code',
    modes: ['tree', 'code', 'form', 'text', 'view'],
    expandedOnStart: true,
    height: '400px',
  },
};

export const 初始展开 = {
  args: {
    value: {
      level1: {
        level2: {
          level3: {
            data: 'nested value',
          },
        },
      },
    },
    mode: 'code',
    modes: ['tree', 'code', 'form', 'text', 'view'],
    expandedOnStart: true,
    height: '400px',
  },
};
