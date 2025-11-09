import JhTreeSelect from './JhTreeSelect.vue';

// 示例树形数据
const sampleTreeData = [
  {
    id: '1',
    label: '技术部',
    children: [
      {
        id: '1-1',
        label: '前端组',
        children: [
          { id: '1-1-1', label: 'Vue开发组' },
          { id: '1-1-2', label: 'React开发组' },
        ]
      },
      {
        id: '1-2',
        label: '后端组',
        children: [
          { id: '1-2-1', label: 'Java开发组' },
          { id: '1-2-2', label: 'Node.js开发组' },
        ]
      },
      { id: '1-3', label: '测试组' },
    ]
  },
  {
    id: '2',
    label: '产品部',
    children: [
      { id: '2-1', label: '产品设计' },
      { id: '2-2', label: '用户体验' },
    ]
  },
  {
    id: '3',
    label: '运营部',
    children: [
      { id: '3-1', label: '内容运营' },
      { id: '3-2', label: '活动运营' },
      { id: '3-3', label: '用户运营' },
    ]
  },
  {
    id: '4',
    label: '市场部',
    children: [
      { id: '4-1', label: '市场推广' },
      { id: '4-2', label: '品牌营销' },
    ]
  }
];

// 扁平化树形数据（用于全选功能测试）
const flatTreeData = [
  { id: '1', label: '节点1' },
  { id: '2', label: '节点2' },
  { id: '3', label: '节点3' },
  { id: '4', label: '节点4' },
  { id: '5', label: '节点5' },
];

export default {
  title: '基础组件/JhTreeSelect - 树形选择',
  component: JhTreeSelect,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'object',
      description: 'v-model 绑定的已选节点列表',
    },
    visible: {
      control: 'boolean',
      description: '是否显示对话框',
    },
    mode: {
      control: { type: 'select' },
      options: ['multiple', 'single'],
      description: '选择模式：multiple(多选) 或 single(单选)',
    },
    title: {
      control: 'text',
      description: '对话框标题',
    },
    placeholder: {
      control: 'text',
      description: '搜索框占位符',
    },
    maxWidth: {
      control: 'text',
      description: '对话框最大宽度',
    },
    data: {
      control: 'object',
      description: '树形数据数组',
    },
    nodeKey: {
      control: 'text',
      description: '节点唯一标识字段名',
    },
    nodeLabel: {
      control: 'text',
      description: '节点显示文本字段名',
    },
    nodeChildren: {
      control: 'text',
      description: '子节点字段名',
    },
    allowSelectNode: {
      control: 'boolean',
      description: '是否允许选择节点本身',
    },
    showSearch: {
      control: 'boolean',
      description: '是否显示搜索框',
    },
    showSelectAll: {
      control: 'boolean',
      description: '是否显示全选按钮（仅多选模式）',
    },
    loading: {
      control: 'boolean',
      description: '是否显示加载状态',
    },
    onInput: { action: 'input' },
    onConfirm: { action: 'confirm' },
    onCancel: { action: 'cancel' },
    onUpdateVisible: { action: 'update:visible' },
  },
  parameters: {
    docs: {
      description: {
        component: `

通用的树形选择组件，支持单选和多选模式。

## 功能特性

- ✅ 支持单选和多选模式
- ✅ 支持搜索过滤
- ✅ 支持展开/折叠节点
- ✅ 支持选择节点本身（可选）
- ✅ 支持全选功能（多选模式）
- ✅ 响应式设计（移动端适配）
- ✅ 自定义节点字段映射

## 数据结构

\`\`\`javascript
// 树形节点数据结构
{
  id: String,           // 节点唯一标识（可通过 nodeKey 自定义）
  label: String,         // 节点显示文本（可通过 nodeLabel 自定义）
  children: Array,       // 子节点数组（可通过 nodeChildren 自定义）
  [其他自定义字段]
}
\`\`\`

## 使用示例

\`\`\`vue
<jh-tree-select
  v-model="selectedNodes"
  :visible.sync="isDialogShown"
  :data="treeData"
  mode="multiple"
  title="选择节点"
  @confirm="handleConfirm"
/>
\`\`\`

## 事件

- \`@input\` - v-model 更新事件，参数为选中的节点数组
- \`@confirm\` - 确认选择事件，参数为选中的节点数组
- \`@cancel\` - 取消选择事件
- \`@update:visible\` - 显示状态更新事件
        `,
      },
    },
  },
};

// 基础示例 - 多选模式
export const 多选模式 = {
  args: {
    value: [],
    visible: true,
    mode: 'multiple',
    title: '选择节点（多选）',
    placeholder: '搜索节点',
    maxWidth: '1000px',
    data: sampleTreeData,
    nodeKey: 'id',
    nodeLabel: 'label',
    nodeChildren: 'children',
    allowSelectNode: false,
    showSearch: true,
    showSelectAll: true,
    loading: false,
  },
  render: (args) => ({
    components: { JhTreeSelect },
    data() {
      return {
        selectedNodes: args.value || [],
        isDialogShown: args.visible,
        args
      };
    },
    watch: {
      'args.visible'(val) {
        this.isDialogShown = val;
      }
    },
    template: `
      <div>
        <v-btn color="primary" @click="isDialogShown = true">打开树形选择</v-btn>
        <jh-tree-select
          v-model="selectedNodes"
          :visible.sync="isDialogShown"
          :mode="args.mode"
          :title="args.title"
          :placeholder="args.placeholder"
          :max-width="args.maxWidth"
          :data="args.data"
          :node-key="args.nodeKey"
          :node-label="args.nodeLabel"
          :node-children="args.nodeChildren"
          :allow-select-node="args.allowSelectNode"
          :show-search="args.showSearch"
          :show-select-all="args.showSelectAll"
          :loading="args.loading"
          @confirm="handleConfirm"
          @cancel="handleCancel"
        />
        <v-container class="mt-4">
          <v-card>
            <v-card-title>已选节点</v-card-title>
            <v-card-text>
              <div v-if="selectedNodes.length === 0" class="grey--text">
                暂无选中节点
              </div>
              <v-chip
                v-for="node in selectedNodes"
                :key="node.id"
                class="ma-1"
                small
              >
                {{ node.label }}
              </v-chip>
            </v-card-text>
          </v-card>
        </v-container>
      </div>
    `,
    methods: {
      handleConfirm(nodes) {
        console.log('确认选择:', nodes);
        this.selectedNodes = nodes;
      },
      handleCancel() {
        console.log('取消选择');
      }
    }
  }),
};

// 单选模式
export const 单选模式 = {
  args: {
    ...多选模式.args,
    mode: 'single',
    title: '选择节点（单选）',
    showSelectAll: false,
  },
  render: 多选模式.render,
};

// 允许选择节点本身
export const 允许选择节点 = {
  args: {
    ...多选模式.args,
    allowSelectNode: true,
    title: '选择节点（可选择节点本身）',
  },
  render: 多选模式.render,
};

// 无搜索框
export const 无搜索框 = {
  args: {
    ...多选模式.args,
    showSearch: false,
    title: '选择节点（无搜索）',
  },
  render: 多选模式.render,
};

// 无全选按钮
export const 无全选按钮 = {
  args: {
    ...多选模式.args,
    showSelectAll: false,
    title: '选择节点（无全选）',
  },
  render: 多选模式.render,
};

// 扁平化数据
export const 扁平化数据 = {
  args: {
    ...多选模式.args,
    data: flatTreeData,
    title: '选择节点（扁平化数据）',
  },
  render: 多选模式.render,
};

// 加载状态
export const 加载状态 = {
  args: {
    ...多选模式.args,
    loading: true,
    title: '选择节点（加载中）',
  },
  render: 多选模式.render,
};

// 自定义字段映射
export const 自定义字段映射 = {
  args: {
    ...多选模式.args,
    data: [
      {
        code: 'A',
        name: '部门A',
        items: [
          { code: 'A-1', name: '小组A1' },
          { code: 'A-2', name: '小组A2' },
        ]
      },
      {
        code: 'B',
        name: '部门B',
        items: [
          { code: 'B-1', name: '小组B1' },
        ]
      }
    ],
    nodeKey: 'code',
    nodeLabel: 'name',
    nodeChildren: 'items',
    title: '选择节点（自定义字段）',
  },
  render: 多选模式.render,
};

// 大型树形数据
export const 大型树形数据 = {
  args: {
    ...多选模式.args,
    data: (() => {
      const generateTree = (depth, breadth, prefix = '') => {
        if (depth === 0) return null;
        const nodes = [];
        for (let i = 1; i <= breadth; i++) {
          const id = prefix ? `${prefix}-${i}` : `${i}`;
          const node = {
            id,
            label: `节点${id}`,
            children: []
          };
          if (depth > 1) {
            const children = generateTree(depth - 1, breadth, id);
            if (children) node.children = children;
          }
          nodes.push(node);
        }
        return nodes;
      };
      return generateTree(4, 3);
    })(),
    title: '选择节点（大型树形数据）',
  },
  render: 多选模式.render,
};


