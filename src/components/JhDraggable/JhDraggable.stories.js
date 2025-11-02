import JhDraggable from './JhDraggable.vue';

export default {
  title: '基础组件/JhDraggable - 拖拽排序',
  component: JhDraggable,
  tags: ['autodocs'],
  argTypes: {
    components: {
      control: 'object',
      description: '组件库列表',
    },
    value: {
      control: 'object',
      description: '设计区域的元素列表',
    },
    showComponentLibrary: {
      control: 'boolean',
      description: '是否显示左侧组件库',
    },
    componentLibraryTitle: {
      control: 'text',
      description: '组件库标题',
    },
    groupName: {
      control: 'text',
      description: '拖拽分组名称',
    },
    animation: {
      control: 'number',
      description: '动画时长（毫秒）',
    },
    emptyPlaceholder: {
      control: 'text',
      description: '空状态占位文本',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `

基于 Vue.Draggable 的拖拽排序组件。

## 使用前提

需要在项目中安装并引入 vuedraggable：

\`\`\`bash
npm install vuedraggable
\`\`\`

或在 HTML 中引入 CDN：

\`\`\`html
<script src="https://cdn.jsdelivr.net/npm/sortable@1.15.0/Sortable.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Vue.Draggable/2.20.0/vuedraggable.umd.min.js"></script>
\`\`\`

## 功能特性

- 支持从组件库拖拽到设计区
- 支持设计区内拖拽排序
- 自动处理 ID 冲突
- 支持自定义样式
- 支持空状态提示
        `,
      },
    },
  },
};

const formComponents = [
  { id: 1, name: '输入框', type: 'input' },
  { id: 2, name: '单选框', type: 'radio' },
  { id: 3, name: '多选框', type: 'checkbox' },
  { id: 4, name: '下拉选择', type: 'select' },
  { id: 5, name: '日期选择', type: 'date' },
  { id: 6, name: '文本域', type: 'textarea' },
];

export const 基础示例 = {
  args: {
    components: formComponents,
    value: [],
    showComponentLibrary: true,
    componentLibraryTitle: '组件',
    groupName: 'form-builder',
    animation: 300,
    emptyPlaceholder: '从左侧拖入或点选组件进行内容设计',
  },
};

export const 预设元素 = {
  args: {
    components: formComponents,
    value: [
      { id: 101, name: '用户名输入框', type: 'input' },
      { id: 102, name: '性别单选框', type: 'radio' },
      { id: 103, name: '兴趣多选框', type: 'checkbox' },
    ],
    showComponentLibrary: true,
    componentLibraryTitle: '表单组件',
    groupName: 'form-builder',
    animation: 300,
    emptyPlaceholder: '从左侧拖入组件',
  },
};

export const 无组件库 = {
  args: {
    components: [],
    value: [
      { id: 1, name: '任务 1', status: 'todo' },
      { id: 2, name: '任务 2', status: 'in-progress' },
      { id: 3, name: '任务 3', status: 'done' },
      { id: 4, name: '任务 4', status: 'todo' },
    ],
    showComponentLibrary: false,
    componentLibraryTitle: '',
    groupName: 'task-list',
    animation: 200,
    emptyPlaceholder: '暂无任务',
  },
};

export const 自定义动画 = {
  args: {
    components: [
      { id: 1, name: '标题', type: 'heading' },
      { id: 2, name: '段落', type: 'paragraph' },
      { id: 3, name: '图片', type: 'image' },
      { id: 4, name: '视频', type: 'video' },
      { id: 5, name: '按钮', type: 'button' },
    ],
    value: [],
    showComponentLibrary: true,
    componentLibraryTitle: '页面元素',
    groupName: 'page-builder',
    animation: 500,
    emptyPlaceholder: '拖拽元素到这里构建页面',
  },
};

export const 卡片组件 = {
  args: {
    components: [
      { id: 1, name: '📊 数据卡片', type: 'data-card' },
      { id: 2, name: '📈 图表卡片', type: 'chart-card' },
      { id: 3, name: '📋 列表卡片', type: 'list-card' },
      { id: 4, name: '📝 表单卡片', type: 'form-card' },
    ],
    value: [
      { id: 100, name: '📊 销售数据', type: 'data-card' },
    ],
    showComponentLibrary: true,
    componentLibraryTitle: '卡片组件',
    groupName: 'dashboard-builder',
    animation: 300,
    emptyPlaceholder: '拖拽卡片组件到这里',
  },
};
