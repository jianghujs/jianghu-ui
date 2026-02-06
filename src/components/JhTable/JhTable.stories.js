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
const schemaMockData = Array.from({ length: 50 }, (_, index) => {
  const statusPool = ['pending', 'approved', 'rejected'];
  return {
    id: 1000 + index,
    username: `审批单-${index + 1}`,
    status: statusPool[index % statusPool.length],
    amount: 120000 + index * 413,
    progress: (index * 7) % 100,
    updatedAt: new Date(2024, 0, (index % 28) + 1, 12, index % 60).toISOString(),
    payload: {
      region: index % 2 === 0 ? '华北' : '华南',
      owner: `owner-${index + 1}`,
    },
  };
});

export default {
  title: '数据展示/JhTable - 高级表格',
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
    headerTitle: {
      control: 'text',
      description: '表格标题',
    },
    tooltip: {
      control: 'text',
      description: '标题提示信息',
    },
    cardBordered: {
      control: 'boolean',
      description: '是否显示卡片边框',
    },
    ghost: {
      control: 'boolean',
      description: '幽灵模式（无边框无背景）',
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
    rowKey: {
      control: 'text',
      description: '行唯一标识字段，默认为 "id"',
    },
    itemKey: {
      control: 'text',
      description: 'rowKey 的别名，与 v-data-table API 保持一致',
    },
    size: {
      control: 'select',
      options: ['default', 'medium', 'compact'],
      description: '表格密度',
    },
    polling: {
      control: 'number',
      description: '轮询间隔（毫秒），0 表示不轮询',
    },
    debounceTime: {
      control: 'number',
      description: '搜索防抖时间（毫秒）',
    },
    dataTableProps: {
      control: 'object',
      description: '透传给 v-data-table 的原生属性 (例如 height、disable-pagination)',
    },
    sortBy: {
      control: 'object',
      description: '受控排序字段（字符串或数组）',
    },
    sortDesc: {
      control: 'object',
      description: '受控排序方向（布尔或数组）',
    },
    multiSort: {
      control: 'boolean',
      description: '是否允许多列排序',
    },
    mustSort: {
      control: 'boolean',
      description: '是否必须始终存在排序字段',
    },
    columnsState: {
      control: 'object',
      description: '列状态配置 { persistenceKey, defaultVisible, value }',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `

增强版数据表格组件，深度继承 Vuetify 2 的 v-data-table，并提供 Pro 级功能。

## 核心特性

### 1. 深度继承
- **API 兼容**：支持 v-data-table 的所有 Props（如 \`show-expand\`、\`group-by\`、\`item-class\` 等）。
- **插槽透传**：支持所有原生插槽（如 \`top\`、\`footer\`、\`expanded-item\` 等）以及自定义列插槽 \`item.<value>\`。
- **事件透传**：支持所有原生事件（如 \`click:row\`、\`current-items\` 等）。
- **实例访问**：通过 \`getVDataTable()\` 获取底层 v-data-table 实例。

### 2. 工具栏与高级筛选
- **集成搜索**：工具栏内置全局搜索。
- **列设置**：支持运行时列显示/隐藏切换。
- **密度切换**：支持 default/medium/compact 三种视觉密度。
- **高级筛选**：可集成 JhQueryFilter 实现复杂的组合查询。

### 3. 列与单元格增强
- **Schema 渲染**：支持 \`valueType\` (status, progress, money, date, json 等) 自动化渲染。
- **交互功能**：支持 \`copyable\` (一键复制) 和 \`ellipsis\` (超长省略)。
- **操作列配置**：支持配置化的按钮列表，内置权限控制和二次确认。

### 4. 数据流控制
- **服务端分页**：通过 \`request\` 自动处理请求、分页、排序。
- **状态持久化**：支持列显示状态持久化。

## 方法

- \`getVDataTable()\`: 获取底层 v-data-table 实例
- \`reload()\`: 重新加载数据（服务端分页）
- \`reset()\`: 重置到第一页
- \`clearSelection()\`: 清空选择
- \`getSelectedRows()\`: 获取选中的行

## 事件 (除 v-data-table 原生事件外)

- \`create-click\`: 点击新增按钮
- \`update-click\`: 点击详情按钮（针对 actionColumn 默认按钮）
- \`delete-click\`: 点击删除按钮（针对 actionColumn 默认按钮）
- \`selection-change\`: 选择改变 ({ selectedRowKeys, selectedRows })
- \`columns-state-change\`: 列状态改变 (snapshot)
- \`filter-search\`: 高级筛选查询
- \`filter-reset\`: 高级筛选重置
- \`sort-change\`: 排序改变
- \`copy-success\`: 复制成功 (text)
- \`request-error\`: 请求失败 (error)
        `,
      },
    },
  },
};


// 基础示例
export const 基础示例 = {
  args: {
    headers: sampleHeaders,
    items: sampleItems,
    loading: false,
    showSearch: true,
    showCreateButton: true,
    showUpdateAction: true,
    showDeleteAction: true,
    showSelect: false,
    size: 'compact',
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

export const 值类型示例 = {
  render: () => ({
    components: { JhTable },
    data() {
      return {
        headers: [
          { text: '序号', value: 'index', valueType: 'index', width: 80 },
          {
            text: '状态',
            value: 'status',
            valueType: 'status',
            valueEnumStatusMap: {
              warning: { color: 'orange darken-2' },
              error: { color: 'red darken-1' },
            },
            valueEnum: {
              pending: { text: '待审核', status: 'warning', value: 'PENDING', icon: 'mdi-clock-outline' },
              approved: { text: '已通过', status: 'success', value: 'APPROVED' },
              rejected: { text: '已拒绝', status: 'error', value: 'REJECTED' },
            },
            search: {
              valueType: 'select',
              initialValue: 'PENDING',
              valueEnumKey: 'value',
            },
          },
          {
            text: '账单金额',
            value: 'amount',
            valueType: 'money',
            copyable: true,
            valueProps: { currencySymbol: '¥', precision: 2 },
            valueFormatter: (value) => `${(value / 10000).toFixed(2)} 万`,
            search: { valueType: 'digit', placeholder: '请输入最小金额' },
          },
          {
            text: '完成进度',
            value: 'progress',
            valueType: 'progress',
            valueProps: { color: 'success', height: 6, showValue: true },
          },
          {
            text: '更新时间',
            value: 'updatedAt',
            valueType: 'dateTime',
            search: {
              valueType: 'dateRange',
              transform: (value) => {
                if (!value || value.length < 2) return {};
                return {
                  startDate: value[0],
                  endDate: value[1],
                };
              },
            },
          },
          {
            text: '附加信息',
            value: 'payload',
            valueType: 'json',
            ellipsis: true,
            copyable: true,
          },
          { text: '操作', value: 'action', sortable: false, width: 160 },
        ],
      };
    },
    methods: {
      async fetchSchemaTable(params) {
        await new Promise(resolve => setTimeout(resolve, 400));
        let list = [...schemaMockData];

        if (params.filters?.status) {
          const targetStatus = String(params.filters.status).toLowerCase();
          list = list.filter(row => row.status === targetStatus);
        }
        if (params.filters?.startDate && params.filters?.endDate) {
          const start = new Date(params.filters.startDate).getTime();
          const end = new Date(params.filters.endDate).getTime();
          list = list.filter(row => {
            const time = new Date(row.updatedAt).getTime();
            return time >= start && time <= end;
          });
        }
        if (params.filters?.amount) {
          list = list.filter(row => row.amount >= Number(params.filters.amount));
        }

        const total = list.length;
        const startIndex = (params.page - 1) * params.pageSize;
        const endIndex = startIndex + params.pageSize;

        return {
          data: list.slice(startIndex, endIndex),
          total,
          success: true,
        };
      },
    },
    template: `
      <jh-table
        header-title="列 Schema 渲染 & 自动筛选"
        tooltip="valueType / valueEnum / search transform"
        :headers="headers"
        :request="fetchSchemaTable"
        show-filter
        :toolbar="{ search: true, refresh: true, setting: true, density: true }"
        :pagination="{ current: 1, pageSize: 10 }"
      />
    `,
  }),
};

// 完整工具栏
export const 完整工具栏 = {
  args: {
    ...基础示例.args,
    toolbar: {
      search: true,
      refresh: true,
      setting: true,
      density: true,
      fullscreen: true,
    },
  },
  render: 基础示例.render,
};

// 列增强功能
export const 列增强功能 = {
  args: {
    ...基础示例.args,
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
export const 配置化操作列 = {
  args: {
    ...基础示例.args,
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
  render: 基础示例.render,
};

// 服务端分页
export const 服务端分页 = {
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

        const sorter = params.sorter || {};
        if (Array.isArray(sorter.sortBy) && sorter.sortBy.length > 0) {
          filteredData.sort((a, b) => {
            for (let i = 0; i < sorter.sortBy.length; i += 1) {
              const key = sorter.sortBy[i];
              const desc = sorter.sortDesc?.[i];
              if (a[key] === b[key]) continue;
              if (a[key] > b[key]) return desc ? -1 : 1;
              if (a[key] < b[key]) return desc ? 1 : -1;
            }
            return 0;
          });
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

// 原生属性透传 + 列状态持久化
export const 增强特性 = {
  render: () => ({
    components: { JhTable },
    data() {
      return {
        headers: sampleHeaders,
        columnsState: null,
        toolbar: {
          search: true,
          refresh: true,
          setting: true,
          density: true,
          fullscreen: true,
        },
        filterFields: [
          { key: 'username', label: '用户名', type: 'text' },
          {
            key: 'status',
            label: '状态',
            type: 'select',
            options: [
              { label: '启用', value: '启用' },
              { label: '禁用', value: '禁用' },
              { label: '待审核', value: '待审核' },
            ],
          },
        ],
      };
    },
    template: `
      <div>
        <div class="mb-4 pa-4 purple lighten-5 rounded">
          <strong>列状态持久化 + 多列排序 + v-data-table 属性透传</strong>
          <p class="mb-0 mt-2">隐藏列 / 切换排序 / 设置高度，刷新页面后仍旧保持。</p>
        </div>
        <jh-table
          ref="advancedTable"
          :headers="headers"
          :request="fetchData"
          :toolbar="toolbar"
          :columns-state="{
            persistenceKey: 'storybook-jh-table-columns',
            value: columnsState
          }"
          :show-filter="true"
          :filter-fields="filterFields"
          multi-sort
          must-sort
          :sort-by="['createdAt']"
          :sort-desc="[true]"
          hide-default-footer
          :data-table-props="{ height: '420px', fixedHeader: true }"
          @columns-state-change="handleColumnStateChange"
          @sort-change="handleSortChange"
          @filter-search="handleFilterChange"
        >
          <template #toolbar-extra>
            <v-btn small outlined color="primary" @click="triggerManualReload">
              <v-icon left x-small>mdi-refresh</v-icon>
              重新拉取
            </v-btn>
          </template>
        </jh-table>
      </div>
    `,
    methods: {
      async fetchData(params) {
        console.log('增强特性请求参数:', params);
        await new Promise(resolve => setTimeout(resolve, 400));
        let filtered = [...allMockData];

        if (params.search) {
          filtered = filtered.filter(item =>
            Object.values(item).some(val =>
              String(val).toLowerCase().includes(params.search.toLowerCase())
            )
          );
        }

        if (params.filters && params.filters.status) {
          filtered = filtered.filter(item => item.status === params.filters.status);
        }

        const sorter = params.sorter || {};
        if (Array.isArray(sorter.sortBy) && sorter.sortBy.length > 0) {
          filtered.sort((a, b) => {
            for (let i = 0; i < sorter.sortBy.length; i += 1) {
              const key = sorter.sortBy[i];
              const desc = sorter.sortDesc?.[i];
              if (a[key] === b[key]) continue;
              if (a[key] > b[key]) return desc ? -1 : 1;
              if (a[key] < b[key]) return desc ? 1 : -1;
            }
            return 0;
          });
        }

        const page = params.page || 1;
        const pageSize = params.pageSize || 10;
        const total = filtered.length;
        const start = (page - 1) * pageSize;
        const end = start + pageSize;

        return {
          data: filtered.slice(start, end),
          total,
          success: true,
        };
      },
      handleColumnStateChange(val) {
        this.columnsState = val;
      },
      handleSortChange(payload) {
        console.log('排序变化:', payload);
      },
      handleFilterChange(filters) {
        console.log('筛选条件:', filters);
      },
      triggerManualReload() {
        this.$refs.advancedTable?.reload?.();
      },
    },
  }),
};

// 行选择
export const 行选择 = {
  args: {
    ...基础示例.args,
    rowSelection: {
      type: 'checkbox',
      defaultSelectedRowKeys: [1],
    },
  },
  render: (args) => ({
    components: { JhTable },
    data() {
      return {
        args: {
          ...args,
          rowSelection: {
            ...(args.rowSelection || {}),
          },
        },
        selectedRows: [],
      };
    },
    created() {
      if (this.args.rowSelection) {
        this.args.rowSelection.onChange = this.handleRowSelectionOnChange;
      }
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
      handleRowSelectionOnChange(keys, rows) {
        console.log('rowSelection.onChange:', keys, rows);
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
export const 密度切换 = {
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
export const 自定义列渲染 = {
  args: {
    ...基础示例.args,
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
          <template v-slot:item.status="{ item, index }">
            <v-chip
              :color="item.status === '启用' ? 'success' : 'error'"
              small
              label
            >
              <v-badge
                v-if="index === 0"
                dot
                inline
                color="red"
                class="mr-1"
              ></v-badge>
              {{ item.status }} (索引: {{ index }})
            </v-chip>
          </template>
        </jh-table>
      </div>
    `,
  }),
};

// 加载状态
export const 加载状态 = {
  args: {
    ...基础示例.args,
    loading: true,
  },
  render: 基础示例.render,
};

// 空数据
export const 空数据 = {
  args: {
    ...基础示例.args,
    items: [],
  },
  render: 基础示例.render,
};

// 隐藏工具栏
export const 隐藏工具栏 = {
  args: {
    ...基础示例.args,
    toolbar: false,
  },
  render: 基础示例.render,
};

// 简化工具栏
export const 简化工具栏 = {
  args: {
    ...基础示例.args,
    toolbar: {
      search: true,
      refresh: true,
      setting: false,
      density: false,
      fullscreen: false,
    },
  },
  render: 基础示例.render,
};

// 集成高级筛选
export const 集成高级筛选 = {
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

// 自定义工具栏
export const 自定义工具栏 = {
  args: {
    ...基础示例.args,
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

// 完整CRUD示例
export const 完整CRUD示例 = {
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


// 受控服务端分页 (完全由父组件控制)
export const 受控服务端分页 = {
  render: () => ({
    components: { JhTable },
    data() {
      return {
        headers: sampleHeaders,
        items: [],
        loading: false,
        page: 1,
        itemsPerPage: 10,
        serverItemsLength: 0,
      };
    },
    mounted() {
      this.loadData();
    },
    watch: {
      page() {
        console.log('Page changed to:', this.page);
        this.loadData();
      },
      itemsPerPage() {
        console.log('Items per page changed to:', this.itemsPerPage);
        // 通常改变每页大小时建议重置到第一页，但这里取决于业务逻辑
        // 注意：v-data-table 可能会自动触发 update:page 为 1
        this.loadData();
      },
    },
    methods: {
      async loadData() {
        this.loading = true;
        console.log(`Loading data: page=${this.page}, size=${this.itemsPerPage}`);
        
        // 模拟 API 延迟
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const total = allMockData.length;
        const start = (this.page - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        
        this.items = allMockData.slice(start, end);
        this.serverItemsLength = total;
        this.loading = false;
      },
    },
    template: `
      <div>
        <div class="mb-4 pa-4 orange lighten-5 rounded">
          <strong>受控服务端分页示例 (无 request 函数)</strong>
          <p class="mb-0 mt-2">完全由父组件控制 page 和 itemsPerPage，模拟传统的 v-data-table 服务端分页用法。</p>
          <div class="mt-2">
            Page: {{ page }} | ItemsPerPage: {{ itemsPerPage }} | Total: {{ serverItemsLength }}
          </div>
        </div>
        <jh-table
          :headers="headers"
          :items="items"
          :loading="loading"
          :page.sync="page"
          :items-per-page.sync="itemsPerPage"
          :server-items-length="serverItemsLength"
          :footer-props="{
            'items-per-page-options': [5, 10, 20]
          }"
        />
      </div>
    `,
  }),
};

// 原生插槽透传
export const 原生插槽透传 = {
  render: () => ({
    components: { JhTable },
    data() {
      return {
        headers: sampleHeaders,
        items: sampleItems.slice(0, 5),
      };
    },
    template: `
      <jh-table :headers="headers" :items="items" header-title="原生插槽透传示例">
        <!-- 顶部插槽 -->
        <template v-slot:top>
          <v-toolbar flat color="blue lighten-4">
            <v-toolbar-title>这是 v-data-table 的 top 插槽</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark class="mb-2">自定义按钮</v-btn>
          </v-toolbar>
        </template>

        <!-- 底部插槽 -->
        <template v-slot:footer>
          <div class="pa-4 text-center grey lighten-3">
            这是 v-data-table 的 footer 插槽，可以放置汇总信息等
          </div>
        </template>

        <!-- 自定义表头插槽 (原生方式) -->
        <template v-slot:header.username="{ header }">
          <span class="orange--text font-weight-bold italic">{{ header.text }} (自定义)</span>
        </template>
      </jh-table>
    `,
  }),
};

// 原生实例访问
export const 原生实例访问 = {
  render: () => ({
    components: { JhTable },
    data() {
      return {
        headers: sampleHeaders,
        items: sampleItems,
      };
    },
    template: `
      <div>
        <div class="mb-4">
          <v-btn @click="callNativeSelectAll" color="primary">通过 Ref 调用原生全选 (selectAll)</v-btn>
          <v-btn @click="checkNativeInstance" color="secondary" class="ml-2">检查原生实例</v-btn>
        </div>
        <jh-table
          ref="jhTableRef"
          :headers="headers"
          :items="items"
          show-select
          header-title="原生实例访问示例"
        />
      </div>
    `,
    methods: {
      callNativeSelectAll() {
        const vDataTable = this.$refs.jhTableRef.getVDataTable();
        if (vDataTable) {
          // 注意：Vuetify 2.x 的 selectAll 可能需要特定参数或通过内部 toggle 实现
          // 这里演示获取实例并操作
          vDataTable.toggleSelectAll(true);
          alert('已通过 getVDataTable().toggleSelectAll(true) 触发全选');
        }
      },
      checkNativeInstance() {
        const vDataTable = this.$refs.jhTableRef.getVDataTable();
        console.log('原生 v-data-table 实例:', vDataTable);
        alert('实例已打印到控制台，构造函数名：' + vDataTable.$options.name);
      }
    }
  }),
};


