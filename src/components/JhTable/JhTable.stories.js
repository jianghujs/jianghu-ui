import JhTable from './JhTable.vue';

// 示例数据
const sampleHeaders = [
  { text: 'ID', value: 'id', width: 80, sortable: true },
  { text: '用户名', value: 'username', copyable: true },
  { text: '邮箱', value: 'email', ellipsis: true, copyable: true },
  { text: '手机号', value: 'phone' },
  { text: '状态', value: 'status' },
  { text: '创建时间', value: 'createdAt', sortable: true },
  { text: '操作', value: 'action', width: '200px', sortable: false },
];

const sampleItems = [
  { id: 1, username: '张三', email: 'zhangsan@example.com', phone: '13800138001', status: '启用', createdAt: '2024-01-01 10:20:30' },
  { id: 2, username: '李四', email: 'lisi@example.com', phone: '13800138002', status: '启用', createdAt: '2024-01-02 11:30:40' },
  { id: 3, username: '王五', email: 'wangwu@example.com', phone: '13800138003', status: '禁用', createdAt: '2024-01-03 12:40:50' },
  { id: 4, username: '赵六', email: 'zhaoliu@example.com', phone: '13800138004', status: '启用', createdAt: '2024-01-04 13:50:00' },
  { id: 5, username: '钱七', email: 'qianqi@example.com', phone: '13800138005', status: '启用', createdAt: '2024-01-05 14:00:10' },
  { id: 6, username: '孙八', email: 'sunba@example.com', phone: '13800138006', status: '禁用', createdAt: '2024-01-06 15:10:20' },
  { id: 7, username: '周九', email: 'zhoujiu@example.com', phone: '13800138007', status: '启用', createdAt: '2024-01-07 16:20:30' },
  { id: 8, username: '吴十', email: 'wushi@example.com', phone: '13800138008', status: '启用', createdAt: '2024-01-08 17:30:40' },
];

// 生成大量数据用于测试服务端分页
const generateMockData = (count = 100) => {
  const statuses = ['启用', '禁用', '待审核'];
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    username: `用户${i + 1}`,
    email: `user${i + 1}@example.com`,
    phone: `138${String(i).padStart(8, '0')}`,
    status: statuses[i % 3],
    createdAt: new Date(2024, 0, (i % 28) + 1).toLocaleString('zh-CN'),
  }));
};

const allMockData = generateMockData(100);

export default {
  title: '数据展示/JhTable',
  component: JhTable,
  tags: ['autodocs'],
  argTypes: {
    headers: {
      control: 'object',
      description: '表格表头配置，支持 copyable、ellipsis 等增强功能',
    },
    items: {
      control: 'object',
      description: '表格数据（客户端分页）',
    },
    request: {
      control: false,
      description: '数据请求函数（服务端分页），返回 { data, total, success }',
    },
    toolbar: {
      control: 'object',
      description: '工具栏配置 { search, refresh, setting, density, fullscreen }',
    },
    actionColumn: {
      control: 'object',
      description: '操作列配置 { title, width, fixed, buttons }',
    },
    loading: {
      control: 'boolean',
      description: '加载状态',
    },
    showSelect: {
      control: 'boolean',
      description: '是否显示选择框',
    },
    size: {
      control: 'select',
      options: ['default', 'medium', 'compact'],
      description: '表格密度',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
# JhTable - 江湖高级表格组件

增强版数据表格组件，参考 Ant Design Pro 的 ProTable 设计，提供丰富的功能。

## 新增功能特性（Pro 版）

### 1. 工具栏功能
- **搜索框**：全局快速搜索
- **刷新按钮**：重新加载数据
- **列设置**：显示/隐藏列，实时生效
- **密度切换**：默认/中等/紧凑三种密度
- **全屏切换**：全屏显示表格（可选）

### 2. 列增强功能
- **copyable**：显示复制按钮，一键复制单元格内容
- **ellipsis**：超长文本自动省略，鼠标悬停显示完整内容
- **tooltip**：鼠标悬停提示
- **自定义插槽**：完全自定义列渲染

### 3. 操作列配置化
\`\`\`javascript
actionColumn: {
  title: '操作',
  width: 180,
  fixed: 'right',
  buttons: [
    {
      text: '编辑',
      type: 'link', // link / icon / button
      icon: 'mdi-pencil',
      color: 'primary',
      tooltip: '编辑记录',
      onClick: (row) => { console.log('编辑', row) },
      visible: (row) => row.status !== '禁用',
      confirm: '确认编辑？'
    },
    {
      text: '删除',
      type: 'link',
      icon: 'mdi-delete',
      color: 'error',
      onClick: (row) => { console.log('删除', row) },
      confirm: '确认删除？'
    }
  ]
}
\`\`\`

### 4. 服务端分页
通过 \`request\` prop 支持服务端分页：
\`\`\`javascript
async fetchData(params) {
  // params: { page, pageSize, search, sorter, filters }
  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(params),
  });
  return {
    data: response.list,
    total: response.total,
    success: true,
  };
}
\`\`\`

### 5. 行选择增强
- 支持单选/多选
- \`selection-change\` 事件返回 \`{ selectedRowKeys, selectedRows }\`
- 提供 \`getSelectedRows()\` 和 \`clearSelection()\` 方法

### 6. 响应式密度
三种密度自动适配：
- **default**: 48px 行高
- **medium**: 40px 行高
- **compact**: 32px 行高

## 方法

- \`reload()\`: 重新加载数据（服务端分页）
- \`reset()\`: 重置到第一页
- \`clearSelection()\`: 清空选择
- \`getSelectedRows()\`: 获取选中的行

## 事件

- \`create-click\`: 点击新增按钮
- \`update-click\`: 点击详情按钮（item）
- \`delete-click\`: 点击删除按钮（item）
- \`row-click\`: 点击行（item, event）
- \`selection-change\`: 选择改变 ({ selectedRowKeys, selectedRows })
- \`refresh\`: 点击刷新按钮
- \`copy-success\`: 复制成功（text）
- \`request-error\`: 请求失败（error）
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
    showSelect: false,
    size: 'default',
  },
  render: (args) => ({
    components: { JhTable },
    data() {
      return { args };
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
        alert('点击了新增按钮');
      },
      handleUpdate(item) {
        alert('详情：' + item.username);
      },
      handleDelete(item) {
        if (confirm('确认删除 ' + item.username + '？')) {
          console.log('删除', item);
        }
      },
      handleRowClick(item) {
        console.log('行点击:', item);
      },
    },
  }),
};

// 完整工具栏
export const WithFullToolbar = {
  args: {
    ...Default.args,
    toolbar: {
      search: true,
      refresh: true,
      setting: true,
      density: true,
      fullscreen: true,
    },
  },
  render: Default.render,
};

// 列增强功能（复制、省略号）
export const ColumnEnhancements = {
  args: {
    ...Default.args,
    headers: [
      { text: 'ID', value: 'id', width: 80 },
      { text: '用户名', value: 'username', copyable: true },
      { text: '邮箱', value: 'email', ellipsis: true, copyable: true },
      {
        text: '描述',
        value: 'description',
        ellipsis: true,
      },
      { text: '操作', value: 'action', width: '150px', sortable: false },
    ],
    items: [
      {
        id: 1,
        username: '张三',
        email: 'zhangsan@verylongemailaddress.example.com',
        description: '这是一段很长很长很长很长很长很长很长很长的描述文字，用于测试省略号功能是否正常工作'
      },
      {
        id: 2,
        username: '李四',
        email: 'lisi@example.com',
        description: '普通描述'
      },
    ],
  },
  render: (args) => ({
    components: { JhTable },
    data() {
      return { args };
    },
    template: `
      <div>
        <jh-table
          v-bind="args"
          @copy-success="handleCopySuccess"
        />
      </div>
    `,
    methods: {
      handleCopySuccess(text) {
        console.log('已复制:', text);
        alert('已复制到剪贴板: ' + text);
      },
    },
  }),
};

// 配置化操作列
export const ConfigurableActions = {
  args: {
    ...Default.args,
    actionColumn: {
      title: '操作',
      width: 200,
      fixed: 'right',
      buttons: [
        {
          text: '查看',
          type: 'link',
          icon: 'mdi-eye',
          color: 'primary',
          tooltip: '查看详情',
          onClick: (row) => {
            alert('查看: ' + row.username);
          },
        },
        {
          text: '编辑',
          type: 'link',
          icon: 'mdi-pencil',
          color: 'success',
          tooltip: '编辑记录',
          onClick: (row) => {
            alert('编辑: ' + row.username);
          },
          visible: (row) => row.status !== '禁用',
        },
        {
          text: '删除',
          type: 'link',
          icon: 'mdi-delete',
          color: 'error',
          tooltip: '删除记录',
          confirm: '确认删除该记录？',
          onClick: (row) => {
            console.log('删除:', row);
            alert('已删除: ' + row.username);
          },
        },
      ],
    },
  },
  render: Default.render,
};

// 服务端分页
export const ServerSidePagination = {
  args: {
    headers: sampleHeaders,
    items: [], // 由 request 函数加载
    itemsPerPage: 10,
    pagination: {
      current: 1,
      pageSize: 10,
    },
  },
  render: (args) => ({
    components: { JhTable },
    data() {
      return {
        args: {
          ...args,
          request: this.fetchData,
        },
      };
    },
    template: `
      <div>
        <div class="mb-4 pa-4 blue lighten-5 rounded">
          <strong>服务端分页示例</strong>
          <p class="mb-0 mt-2">模拟异步加载数据，支持分页、搜索。打开控制台查看请求参数。</p>
        </div>
        <jh-table
          v-bind="args"
          @refresh="handleRefresh"
        />
      </div>
    `,
    methods: {
      async fetchData(params) {
        console.log('请求参数:', params);

        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 500));

        // 计算分页
        const { page, pageSize, search } = params;
        let filteredData = [...allMockData];

        // 搜索过滤
        if (search) {
          filteredData = filteredData.filter(item =>
            Object.values(item).some(val =>
              String(val).toLowerCase().includes(search.toLowerCase())
            )
          );
        }

        const total = filteredData.length;
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const data = filteredData.slice(start, end);

        return {
          data,
          total,
          success: true,
        };
      },
      handleRefresh() {
        console.log('刷新表格');
      },
    },
  }),
};

// 行选择
export const WithRowSelection = {
  args: {
    ...Default.args,
    showSelect: true,
  },
  render: (args) => ({
    components: { JhTable },
    data() {
      return {
        args,
        selectedRows: [],
      };
    },
    template: `
      <div>
        <div class="mb-4 pa-4 green lighten-5 rounded">
          <strong>已选择 {{ selectedRows.length }} 行</strong>
          <div v-if="selectedRows.length > 0" class="mt-2">
            <v-chip
              v-for="row in selectedRows"
              :key="row.id"
              small
              class="mr-2"
            >
              {{ row.username }}
            </v-chip>
          </div>
        </div>
        <jh-table
          ref="tableRef"
          v-bind="args"
          @selection-change="handleSelectionChange"
        />
        <div class="mt-4">
          <v-btn small @click="clearSelection">清空选择</v-btn>
          <v-btn small class="ml-2" @click="getSelected">获取选中</v-btn>
        </div>
      </div>
    `,
    methods: {
      handleSelectionChange({ selectedRows }) {
        this.selectedRows = selectedRows;
        console.log('选中的行:', selectedRows);
      },
      clearSelection() {
        this.$refs.tableRef.clearSelection();
      },
      getSelected() {
        const rows = this.$refs.tableRef.getSelectedRows();
        alert('选中 ' + rows.length + ' 行');
      },
    },
  }),
};

// 密度切换
export const DensityVariants = {
  render: () => ({
    components: { JhTable },
    data() {
      return {
        headers: sampleHeaders,
        items: sampleItems.slice(0, 3),
      };
    },
    template: `
      <div>
        <h3 class="mb-4">默认密度 (default)</h3>
        <jh-table
          :headers="headers"
          :items="items"
          size="default"
          :toolbar="false"
          class="mb-8"
        />

        <h3 class="mb-4">中等密度 (medium)</h3>
        <jh-table
          :headers="headers"
          :items="items"
          size="medium"
          :toolbar="false"
          class="mb-8"
        />

        <h3 class="mb-4">紧凑密度 (compact)</h3>
        <jh-table
          :headers="headers"
          :items="items"
          size="compact"
          :toolbar="false"
        />
      </div>
    `,
  }),
};

// 自定义列渲染
export const CustomColumnRender = {
  args: {
    ...Default.args,
  },
  render: (args) => ({
    components: { JhTable },
    data() {
      return { args };
    },
    template: `
      <div>
        <jh-table v-bind="args">
          <!-- 自定义状态列 -->
          <template v-slot:item.status="{ item }">
            <v-chip
              :color="item.status === '启用' ? 'success' : 'error'"
              small
              label
            >
              <v-icon left x-small>
                {{ item.status === '启用' ? 'mdi-check-circle' : 'mdi-close-circle' }}
              </v-icon>
              {{ item.status }}
            </v-chip>
          </template>
        </jh-table>
      </div>
    `,
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

// 空数据
export const Empty = {
  args: {
    ...Default.args,
    items: [],
  },
  render: Default.render,
};

// 隐藏工具栏
export const WithoutToolbar = {
  args: {
    ...Default.args,
    toolbar: false,
  },
  render: Default.render,
};

// 简化工具栏
export const MinimalToolbar = {
  args: {
    ...Default.args,
    toolbar: {
      search: true,
      refresh: true,
      setting: false,
      density: false,
      fullscreen: false,
    },
  },
  render: Default.render,
};

// 集成高级筛选栏
export const WithAdvancedFilter = {
  args: {
    headers: sampleHeaders,
    items: [],
    itemsPerPage: 10,
    showFilter: true,
    filterFields: [
      {
        key: 'keyword',
        label: '关键词',
        type: 'text',
        placeholder: '请输入用户名/邮箱',
      },
      {
        key: 'status',
        label: '状态',
        type: 'select',
        placeholder: '请选择状态',
        options: [
          { text: '全部', value: '' },
          { text: '启用', value: 'active' },
          { text: '禁用', value: 'inactive' },
        ],
      },
      {
        key: 'department',
        label: '部门',
        type: 'select',
        placeholder: '请选择部门',
        options: [
          { text: '全部', value: '' },
          { text: '技术部', value: 'tech' },
          { text: '产品部', value: 'product' },
          { text: '设计部', value: 'design' },
        ],
      },
      {
        key: 'dateRange',
        label: '创建时间',
        type: 'daterange',
        placeholder: '请选择日期范围',
      },
    ],
    filterCollapsible: true,
    filterDefaultCollapsed: true,
    filterDefaultVisibleCount: 3,
  },
  render: (args) => ({
    components: { JhTable },
    data() {
      return {
        args: {
          ...args,
          request: this.fetchData,
        },
        currentFilters: {},
      };
    },
    template: `
      <div>
        <div class="mb-4 pa-4 blue lighten-5 rounded">
          <strong>高级筛选栏集成示例</strong>
          <p class="mb-0 mt-2">展示了 JhTable 集成 JhQueryFilter 作为高级筛选栏的完整功能</p>
          <div v-if="Object.keys(currentFilters).length > 0" class="mt-2">
            <strong>当前筛选条件：</strong>
            <pre class="mt-1">{{ JSON.stringify(currentFilters, null, 2) }}</pre>
          </div>
        </div>
        <jh-table
          v-bind="args"
          @filter-search="handleFilterSearch"
          @filter-reset="handleFilterReset"
        />
      </div>
    `,
    methods: {
      async fetchData(params) {
        console.log('请求参数:', params);

        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 500));

        // 计算分页
        const { page, pageSize, filters } = params;
        let filteredData = [...allMockData];

        // 应用筛选条件
        if (filters && Object.keys(filters).length > 0) {
          if (filters.keyword) {
            filteredData = filteredData.filter(item =>
              item.username.includes(filters.keyword) ||
              item.email.includes(filters.keyword)
            );
          }
          if (filters.status) {
            const statusMap = {
              'active': '启用',
              'inactive': '禁用'
            };
            filteredData = filteredData.filter(item =>
              item.status === statusMap[filters.status]
            );
          }
          if (filters.department) {
            // 模拟部门筛选
            const deptMap = {
              'tech': [1, 2, 5, 6],
              'product': [3, 7],
              'design': [4, 8]
            };
            if (deptMap[filters.department]) {
              filteredData = filteredData.filter(item =>
                deptMap[filters.department].includes(item.id)
              );
            }
          }
          if (filters.dateRange && Array.isArray(filters.dateRange) && filters.dateRange.length === 2) {
            // 模拟日期范围筛选
            filteredData = filteredData.filter(item => {
              const itemDate = new Date(item.createdAt);
              const startDate = new Date(filters.dateRange[0]);
              const endDate = new Date(filters.dateRange[1]);
              return itemDate >= startDate && itemDate <= endDate;
            });
          }
        }

        const total = filteredData.length;
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const data = filteredData.slice(start, end);

        return {
          data,
          total,
          success: true,
        };
      },
      handleFilterSearch(filters) {
        this.currentFilters = filters;
        console.log('筛选查询:', filters);
      },
      handleFilterReset() {
        this.currentFilters = {};
        console.log('重置筛选');
      },
    },
  }),
};

// 自定义工具栏按钮
export const CustomToolbarButtons = {
  args: {
    ...Default.args,
    showCreateButton: false,
  },
  render: (args) => ({
    components: { JhTable },
    data() {
      return { args };
    },
    template: `
      <div>
        <jh-table v-bind="args">
          <template v-slot:toolbar-actions>
            <v-btn color="primary" small class="mr-2" @click="handleImport">
              <v-icon left small>mdi-upload</v-icon>
              导入
            </v-btn>
            <v-btn color="success" small @click="handleExport">
              <v-icon left small>mdi-download</v-icon>
              导出
            </v-btn>
          </template>
        </jh-table>
      </div>
    `,
    methods: {
      handleImport() {
        alert('导入数据');
      },
      handleExport() {
        alert('导出数据');
      },
    },
  }),
};

// 完整示例：带高级筛选的 CRUD 页面
export const CompleteCRUDWithFilter = {
  render: () => ({
    components: { JhTable },
    data() {
      return {
        headers: [
          { text: 'ID', value: 'id', width: 80 },
          { text: '用户名', value: 'username', copyable: true },
          { text: '邮箱', value: 'email', ellipsis: true, copyable: true },
          { text: '手机号', value: 'phone' },
          { text: '状态', value: 'status' },
          { text: '创建时间', value: 'createdAt', sortable: true },
          { text: '操作', value: 'action', width: '200px', sortable: false },
        ],
        filterFields: [
          {
            key: 'keyword',
            label: '关键词',
            type: 'text',
            placeholder: '请输入用户名/邮箱/手机号',
          },
          {
            key: 'status',
            label: '状态',
            type: 'select',
            placeholder: '请选择状态',
            options: [
              { text: '全部', value: '' },
              { text: '启用', value: 'active' },
              { text: '禁用', value: 'inactive' },
              { text: '待审核', value: 'pending' },
            ],
          },
          {
            key: 'department',
            label: '部门',
            type: 'select',
            placeholder: '请选择部门',
            options: [
              { text: '全部', value: '' },
              { text: '技术部', value: 'tech' },
              { text: '产品部', value: 'product' },
              { text: '设计部', value: 'design' },
              { text: '运营部', value: 'operation' },
            ],
          },
          {
            key: 'role',
            label: '角色',
            type: 'select',
            placeholder: '请选择角色',
            options: [
              { text: '全部', value: '' },
              { text: '管理员', value: 'admin' },
              { text: '普通用户', value: 'user' },
              { text: '访客', value: 'guest' },
            ],
          },
          {
            key: 'dateRange',
            label: '创建时间',
            type: 'daterange',
            placeholder: '请选择日期范围',
          },
        ],
        items: [],
        loading: false,
        selectedRows: [],
        currentFilters: {},
        actionColumn: {
          buttons: [
            {
              text: '查看',
              type: 'link',
              icon: 'mdi-eye',
              color: 'primary',
              onClick: (row) => {
                alert('查看详情: ' + row.username);
              },
            },
            {
              text: '编辑',
              type: 'link',
              icon: 'mdi-pencil',
              color: 'success',
              onClick: (row) => {
                alert('编辑: ' + row.username);
              },
              visible: (row) => row.status !== '禁用',
            },
            {
              text: '删除',
              type: 'link',
              icon: 'mdi-delete',
              color: 'error',
              confirm: '确认删除该用户？',
              onClick: (row) => {
                this.handleDelete(row);
              },
            },
          ],
        },
      };
    },
    mounted() {
      this.loadData();
    },
    template: `
      <div>
        <!-- 筛选条件展示 -->
        <v-alert
          v-if="Object.keys(currentFilters).length > 0"
          type="info"
          dense
          text
          class="mb-4"
        >
          <div class="d-flex align-center">
            <span><strong>当前筛选:</strong> {{ formatFilters(currentFilters) }}</span>
            <v-spacer></v-spacer>
            <v-btn small text color="primary" @click="clearFilters">
              清除筛选
            </v-btn>
          </div>
        </v-alert>

        <!-- 批量操作栏 -->
        <v-alert
          v-if="selectedRows.length > 0"
          type="success"
          dense
          text
          class="mb-4"
        >
          <div class="d-flex align-center">
            <span>已选择 <strong>{{ selectedRows.length }}</strong> 项</span>
            <v-spacer></v-spacer>
            <v-btn small text color="error" @click="handleBatchDelete">
              批量删除
            </v-btn>
            <v-btn small text @click="clearSelection">
              取消选择
            </v-btn>
          </div>
        </v-alert>

        <!-- 表格 -->
        <jh-table
          ref="tableRef"
          :headers="headers"
          :items="items"
          :loading="loading"
          :action-column="actionColumn"
          :show-select="true"
          :show-filter="true"
          :filter-fields="filterFields"
          :filter-collapsible="true"
          :filter-default-collapsed="true"
          :filter-default-visible-count="3"
          @create-click="handleCreate"
          @selection-change="handleSelectionChange"
          @refresh="loadData"
          @filter-search="handleFilterSearch"
          @filter-reset="handleFilterReset"
        >
          <!-- 自定义状态列 -->
          <template v-slot:item.status="{ item }">
            <v-chip
              :color="getStatusColor(item.status)"
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
      async loadData() {
        this.loading = true;
        await new Promise(resolve => setTimeout(resolve, 500));
        this.items = sampleItems;
        this.loading = false;
      },
      handleCreate() {
        alert('打开新增表单');
      },
      handleDelete(row) {
        console.log('删除:', row);
        this.items = this.items.filter(item => item.id !== row.id);
      },
      handleBatchDelete() {
        if (confirm('确认删除选中的 ' + this.selectedRows.length + ' 项？')) {
          const ids = this.selectedRows.map(row => row.id);
          this.items = this.items.filter(item => !ids.includes(item.id));
          this.clearSelection();
        }
      },
      handleSelectionChange({ selectedRows }) {
        this.selectedRows = selectedRows;
      },
      clearSelection() {
        this.$refs.tableRef.clearSelection();
      },
      handleFilterSearch(filters) {
        this.currentFilters = filters;
        console.log('筛选查询:', filters);
        // 这里应该调用 API 进行筛选查询
        // this.loadData();
      },
      handleFilterReset() {
        this.currentFilters = {};
        console.log('重置筛选');
        this.loadData();
      },
      clearFilters() {
        this.currentFilters = {};
        this.$refs.tableRef.$refs.queryFilterRef?.handleReset();
      },
      formatFilters(filters) {
        const parts = [];
        if (filters.keyword) parts.push('关键词: ' + filters.keyword);
        if (filters.status) {
          const statusMap = { 'active': '启用', 'inactive': '禁用', 'pending': '待审核' };
          parts.push('状态: ' + statusMap[filters.status]);
        }
        if (filters.department) {
          const deptMap = { 'tech': '技术部', 'product': '产品部', 'design': '设计部', 'operation': '运营部' };
          parts.push('部门: ' + deptMap[filters.department]);
        }
        if (filters.role) {
          const roleMap = { 'admin': '管理员', 'user': '普通用户', 'guest': '访客' };
          parts.push('角色: ' + roleMap[filters.role]);
        }
        if (filters.dateRange && Array.isArray(filters.dateRange)) {
          parts.push('创建时间: ' + filters.dateRange.join(' ~ '));
        }
        return parts.join(', ');
      },
      getStatusColor(status) {
        const colorMap = {
          '启用': 'success',
          '禁用': 'error',
          '待审核': 'warning'
        };
        return colorMap[status] || 'default';
      },
    },
  }),
};

// 完整示例：CRUD 页面
export const CompleteCRUDExample = {
  render: () => ({
    components: { JhTable },
    data() {
      return {
        headers: [
          { text: 'ID', value: 'id', width: 80 },
          { text: '用户名', value: 'username', copyable: true },
          { text: '邮箱', value: 'email', ellipsis: true, copyable: true },
          { text: '手机号', value: 'phone' },
          { text: '状态', value: 'status' },
          { text: '创建时间', value: 'createdAt', sortable: true },
          { text: '操作', value: 'action', width: '200px', sortable: false },
        ],
        items: [],
        loading: false,
        selectedRows: [],
        actionColumn: {
          buttons: [
            {
              text: '查看',
              type: 'link',
              icon: 'mdi-eye',
              color: 'primary',
              onClick: (row) => {
                alert('查看详情: ' + row.username);
              },
            },
            {
              text: '编辑',
              type: 'link',
              icon: 'mdi-pencil',
              color: 'success',
              onClick: (row) => {
                alert('编辑: ' + row.username);
              },
              visible: (row) => row.status !== '禁用',
            },
            {
              text: '删除',
              type: 'link',
              icon: 'mdi-delete',
              color: 'error',
              confirm: '确认删除该用户？',
              onClick: (row) => {
                this.handleDelete(row);
              },
            },
          ],
        },
      };
    },
    mounted() {
      this.loadData();
    },
    template: `
      <div>
        <!-- 批量操作栏 -->
        <v-alert
          v-if="selectedRows.length > 0"
          type="info"
          dense
          text
          class="mb-4"
        >
          <div class="d-flex align-center">
            <span>已选择 <strong>{{ selectedRows.length }}</strong> 项</span>
            <v-spacer></v-spacer>
            <v-btn small text color="error" @click="handleBatchDelete">
              批量删除
            </v-btn>
            <v-btn small text @click="clearSelection">
              取消选择
            </v-btn>
          </div>
        </v-alert>

        <!-- 表格 -->
        <jh-table
          ref="tableRef"
          :headers="headers"
          :items="items"
          :loading="loading"
          :action-column="actionColumn"
          :show-select="true"
          @create-click="handleCreate"
          @selection-change="handleSelectionChange"
          @refresh="loadData"
        >
          <!-- 自定义状态列 -->
          <template v-slot:item.status="{ item }">
            <v-chip
              :color="item.status === '启用' ? 'success' : item.status === '禁用' ? 'error' : 'warning'"
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
      async loadData() {
        this.loading = true;
        await new Promise(resolve => setTimeout(resolve, 500));
        this.items = sampleItems;
        this.loading = false;
      },
      handleCreate() {
        alert('打开新增表单');
      },
      handleDelete(row) {
        console.log('删除:', row);
        this.items = this.items.filter(item => item.id !== row.id);
      },
      handleBatchDelete() {
        if (confirm('确认删除选中的 ' + this.selectedRows.length + ' 项？')) {
          const ids = this.selectedRows.map(row => row.id);
          this.items = this.items.filter(item => !ids.includes(item.id));
          this.clearSelection();
        }
      },
      handleSelectionChange({ selectedRows }) {
        this.selectedRows = selectedRows;
      },
      clearSelection() {
        this.$refs.tableRef.clearSelection();
      },
    },
  }),
};
