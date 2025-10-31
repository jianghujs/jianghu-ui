import JhTable from './JhTable.vue';

// 示例数据
const sampleHeaders = [
  { text: 'ID', value: 'id' },
  { text: '用户名', value: 'username' },
  { text: '邮箱', value: 'email' },
  { text: '状态', value: 'status' },
  { text: '创建时间', value: 'createdAt' },
  { text: '操作', value: 'action', width: '150px', sortable: false },
];

const sampleItems = [
  { id: 1, username: '张三', email: 'zhangsan@example.com', status: '启用', createdAt: '2024-01-01' },
  { id: 2, username: '李四', email: 'lisi@example.com', status: '启用', createdAt: '2024-01-02' },
  { id: 3, username: '王五', email: 'wangwu@example.com', status: '禁用', createdAt: '2024-01-03' },
  { id: 4, username: '赵六', email: 'zhaoliu@example.com', status: '启用', createdAt: '2024-01-04' },
  { id: 5, username: '钱七', email: 'qianqi@example.com', status: '启用', createdAt: '2024-01-05' },
];

export default {
  title: '基础组件/JhTable',
  component: JhTable,
  tags: ['autodocs'],
  argTypes: {
    headers: {
      control: 'object',
      description: '表格表头配置',
    },
    items: {
      control: 'object',
      description: '表格数据',
    },
    loading: {
      control: 'boolean',
      description: '加载状态',
    },
    showSearch: {
      control: 'boolean',
      description: '是否显示搜索框',
    },
    showCreateButton: {
      control: 'boolean',
      description: '是否显示新增按钮',
    },
    showUpdateAction: {
      control: 'boolean',
      description: '是否显示详情操作',
    },
    showDeleteAction: {
      control: 'boolean',
      description: '是否显示删除操作',
    },
    dense: {
      control: 'boolean',
      description: '紧凑模式',
    },
    showSelect: {
      control: 'boolean',
      description: '是否显示选择框',
    },
    singleSelect: {
      control: 'boolean',
      description: '是否单选',
    },
    fixedHeader: {
      control: 'boolean',
      description: '是否固定表头',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
# JhTable - 江湖表格组件

数据表格组件，基于 Vuetify 的 v-data-table 封装。

## 功能特性

- 数据展示和排序
- 内置搜索筛选
- 工具栏（新增按钮、搜索框）
- 操作列（详情、删除）
- 自定义列插槽
- 响应式布局（PC/移动端）
- 分页功能
- 加载状态
- 选择行功能

## 使用场景

适用于各种数据列表展示，如：
- 用户管理列表
- 订单列表
- 商品列表
- 文章列表

## 事件

- \`create-click\`: 点击新增按钮时触发
- \`update-click\`: 点击详情按钮时触发，参数为行数据
- \`delete-click\`: 点击删除按钮时触发，参数为行数据
- \`row-click\`: 点击行时触发，参数为行数据和事件对象
- \`update:searchInput\`: 搜索内容变化时触发

## 插槽

- \`toolbar-actions\`: 自定义工具栏操作按钮
- \`toolbar-extra\`: 工具栏额外内容
- \`item.{column}\`: 自定义列内容
- \`item.action\`: 自定义操作列
        `,
      },
    },
  },
};

// 默认故事
export const Default = {
  args: {
    headers: sampleHeaders,
    items: sampleItems,
    loading: false,
    showSearch: true,
    showCreateButton: true,
    showUpdateAction: true,
    showDeleteAction: true,
    dense: false,
    showSelect: false,
    singleSelect: false,
    fixedHeader: true,
  },
  render: (args) => ({
    components: { JhTable },
    data() {
      return {
        args,
      };
    },
    template: `
      <div>
        <jh-table
          v-bind="args"
          @create-click="handleCreate"
          @update-click="handleUpdate"
          @delete-click="handleDelete"
          @row-click="handleRowClick"
        />
      </div>
    `,
    methods: {
      handleCreate() {
        console.log('Create clicked');
        alert('点击了新增按钮');
      },
      handleUpdate(item) {
        console.log('Update clicked:', item);
        alert('详情：' + item.username);
      },
      handleDelete(item) {
        console.log('Delete clicked:', item);
        alert('删除：' + item.username);
      },
      handleRowClick(item) {
        console.log('Row clicked:', item);
      },
    },
  }),
};

// 加载状态
export const Loading = {
  args: {
    ...Default.args,
    loading: true,
  },
  render: Default.render,
};

// 紧凑模式
export const Dense = {
  args: {
    ...Default.args,
    dense: true,
  },
  render: Default.render,
};

// 带选择框
export const WithSelect = {
  args: {
    ...Default.args,
    showSelect: true,
  },
  render: Default.render,
};

// 单选模式
export const SingleSelect = {
  args: {
    ...Default.args,
    showSelect: true,
    singleSelect: true,
  },
  render: Default.render,
};

// 自定义列
export const CustomColumn = {
  args: {
    ...Default.args,
  },
  render: (args) => ({
    components: { JhTable },
    data() {
      return {
        args,
      };
    },
    template: `
      <div>
        <jh-table
          v-bind="args"
          @create-click="handleCreate"
          @update-click="handleUpdate"
          @delete-click="handleDelete"
        >
          <template v-slot:item.status="{ item }">
            <v-chip
              :color="item.status === '启用' ? 'success' : 'error'"
              small
              label
            >
              {{ item.status }}
            </v-chip>
          </template>
        </jh-table>
      </div>
    `,
    methods: {
      handleCreate() {
        alert('点击了新增按钮');
      },
      handleUpdate(item) {
        alert('详情：' + item.username);
      },
      handleDelete(item) {
        alert('删除：' + item.username);
      },
    },
  }),
};

// 自定义工具栏
export const CustomToolbar = {
  args: {
    ...Default.args,
    showCreateButton: false,
  },
  render: (args) => ({
    components: { JhTable },
    data() {
      return {
        args,
      };
    },
    template: `
      <div>
        <jh-table
          v-bind="args"
          @update-click="handleUpdate"
          @delete-click="handleDelete"
        >
          <template v-slot:toolbar-actions>
            <v-btn color="primary" small class="mr-2" @click="handleImport">
              导入
            </v-btn>
            <v-btn color="success" small @click="handleExport">
              导出
            </v-btn>
          </template>
        </jh-table>
      </div>
    `,
    methods: {
      handleImport() {
        alert('导入');
      },
      handleExport() {
        alert('导出');
      },
      handleUpdate(item) {
        alert('详情：' + item.username);
      },
      handleDelete(item) {
        alert('删除：' + item.username);
      },
    },
  }),
};

// 自定义操作列
export const CustomAction = {
  args: {
    ...Default.args,
  },
  render: (args) => ({
    components: { JhTable },
    data() {
      return {
        args,
      };
    },
    template: `
      <div>
        <jh-table
          v-bind="args"
          @create-click="handleCreate"
        >
          <template v-slot:item.action="{ item }">
            <v-btn color="primary" x-small text @click="handleView(item)">
              查看
            </v-btn>
            <v-btn color="success" x-small text @click="handleEdit(item)">
              编辑
            </v-btn>
            <v-btn color="warning" x-small text @click="handleCopy(item)">
              复制
            </v-btn>
            <v-btn color="error" x-small text @click="handleDelete(item)">
              删除
            </v-btn>
          </template>
        </jh-table>
      </div>
    `,
    methods: {
      handleCreate() {
        alert('新增');
      },
      handleView(item) {
        alert('查看：' + item.username);
      },
      handleEdit(item) {
        alert('编辑：' + item.username);
      },
      handleCopy(item) {
        alert('复制：' + item.username);
      },
      handleDelete(item) {
        alert('删除：' + item.username);
      },
    },
  }),
};

// 无数据
export const Empty = {
  args: {
    ...Default.args,
    items: [],
  },
  render: Default.render,
};

// 隐藏搜索框
export const WithoutSearch = {
  args: {
    ...Default.args,
    showSearch: false,
  },
  render: Default.render,
};

// 隐藏操作列
export const WithoutActions = {
  args: {
    ...Default.args,
    showUpdateAction: false,
    showDeleteAction: false,
  },
  render: Default.render,
};
