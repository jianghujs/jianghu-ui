import JhProTable from './JhProTable.vue';

// 中文姓名库
const surnames = ['王', '李', '张', '刘', '陈', '杨', '黄', '赵', '周', '吴', '徐', '孙', '马', '朱', '胡', '郭', '何', '林'];
const givenNames = ['伟', '芳', '娜', '敏', '静', '丽', '强', '磊', '军', '洋', '勇', '艳', '杰', '涛', '明', '超', '秀英', '建华'];

// 部门列表
const departments = ['技术部', '市场部', '销售部', '人事部', '财务部', '运营部', '产品部', '设计部'];

// 城市列表
const cities = ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '西安', '南京', '重庆'];

// 生成随机中文姓名
const generateChineseName = () => {
  const surname = surnames[Math.floor(Math.random() * surnames.length)];
  const givenName = givenNames[Math.floor(Math.random() * givenNames.length)];
  return surname + givenName;
};

// 生成员工模拟数据
const generateEmployeeData = (count = 20) => {
  const statuses = ['在职', '离职', '待入职'];
  const statusValues = ['active', 'inactive', 'pending'];

  return Array.from({ length: count }, (_, i) => ({
    id: 1000 + i + 1,
    name: generateChineseName(),
    email: `user${i + 1}@company.com`,
    phone: `138${String(Math.floor(Math.random() * 100000000)).padStart(8, '0')}`,
    age: 22 + Math.floor(Math.random() * 38),
    department: departments[Math.floor(Math.random() * departments.length)],
    position: ['工程师', '高级工程师', '技术专家', '经理', '主管', '专员'][Math.floor(Math.random() * 6)],
    status: statusValues[Math.floor(Math.random() * statusValues.length)],
    statusText: statuses[Math.floor(Math.random() * statuses.length)],
    salary: 8000 + Math.floor(Math.random() * 22000),
    entryDate: new Date(Date.now() - Math.random() * 1825 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    city: cities[Math.floor(Math.random() * cities.length)],
  }));
};

// 生成订单模拟数据
const generateOrderData = (count = 20) => {
  const statusList = [
    { value: 'pending', text: '待支付', color: 'warning' },
    { value: 'paid', text: '已支付', color: 'success' },
    { value: 'shipped', text: '已发货', color: 'info' },
    { value: 'completed', text: '已完成', color: 'success' },
    { value: 'cancelled', text: '已取消', color: 'error' },
  ];

  const products = ['iPhone 14 Pro', '华为 Mate 50', '小米13', 'MacBook Pro', '戴尔显示器', '罗技鼠标', '机械键盘'];

  return Array.from({ length: count }, (_, i) => {
    const status = statusList[Math.floor(Math.random() * statusList.length)];
    const quantity = 1 + Math.floor(Math.random() * 5);
    const unitPrice = 100 + Math.floor(Math.random() * 9900);

    return {
      id: `ORD${String(10000 + i + 1)}`,
      orderNo: `2024${String(Math.floor(Math.random() * 1000000)).padStart(8, '0')}`,
      customer: generateChineseName(),
      product: products[Math.floor(Math.random() * products.length)],
      quantity,
      unitPrice,
      totalAmount: quantity * unitPrice,
      status: status.value,
      statusText: status.text,
      statusColor: status.color,
      createTime: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().replace('T', ' ').substring(0, 19),
      payTime: status.value !== 'pending' ? new Date(Date.now() - Math.random() * 80 * 24 * 60 * 60 * 1000).toISOString().replace('T', ' ').substring(0, 19) : '-',
    };
  });
};

// 生成项目模拟数据
const generateProjectData = (count = 20) => {
  const types = ['Web开发', '移动应用', '数据分析', '人工智能', '企业系统', '电商平台'];
  const priorities = [
    { value: 'high', text: '高', color: 'error' },
    { value: 'medium', text: '中', color: 'warning' },
    { value: 'low', text: '低', color: 'success' },
  ];
  const statusList = [
    { value: 'planning', text: '规划中' },
    { value: 'developing', text: '开发中' },
    { value: 'testing', text: '测试中' },
    { value: 'completed', text: '已完成' },
  ];

  return Array.from({ length: count }, (_, i) => {
    const priority = priorities[Math.floor(Math.random() * priorities.length)];
    const status = statusList[Math.floor(Math.random() * statusList.length)];

    return {
      id: `PRJ${String(1000 + i + 1)}`,
      name: `${cities[Math.floor(Math.random() * cities.length)]}${types[Math.floor(Math.random() * types.length)]}项目`,
      type: types[Math.floor(Math.random() * types.length)],
      owner: generateChineseName(),
      priority: priority.value,
      priorityText: priority.text,
      priorityColor: priority.color,
      status: status.value,
      statusText: status.text,
      progress: Math.floor(Math.random() * 100),
      budget: 50000 + Math.floor(Math.random() * 950000),
      startDate: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      endDate: new Date(Date.now() + Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      teamSize: 3 + Math.floor(Math.random() * 15),
    };
  });
};

export default {
  title: '数据展示/JhProTable',
  component: JhProTable,
  tags: ['autodocs'],
};

// 1. 基础表格
export const 基础表格 = {
  render: (args) => ({
    components: { JhProTable },
    data() {
      return {
        args,
        columns: [
          {
            key: 'id',
            title: '员工ID',
            dataIndex: 'id',
            width: 100,
            sortable: true,
          },
          {
            key: 'name',
            title: '姓名',
            dataIndex: 'name',
            width: 120,
          },
          {
            key: 'department',
            title: '部门',
            dataIndex: 'department',
            width: 120,
          },
          {
            key: 'position',
            title: '职位',
            dataIndex: 'position',
            width: 140,
          },
          {
            key: 'email',
            title: '邮箱',
            dataIndex: 'email',
            width: 200,
          },
          {
            key: 'phone',
            title: '手机号',
            dataIndex: 'phone',
            width: 140,
          },
        ],
        dataSource: generateEmployeeData(20),
      };
    },
    template: `
      <jh-pro-table
        v-bind="args"
        :columns="columns"
        :data-source="dataSource"
      />
    `,
  }),
  args: {
    toolbar: false,
  },
};

// 2. 带工具栏的表格
export const 工具栏表格 = {
  render: (args) => ({
    components: { JhProTable },
    data() {
      return {
        args,
        columns: [
          { key: 'id', title: '员工ID', dataIndex: 'id', width: 100 },
          { key: 'name', title: '姓名', dataIndex: 'name', width: 120 },
          { key: 'department', title: '部门', dataIndex: 'department', width: 120 },
          { key: 'position', title: '职位', dataIndex: 'position', width: 140 },
          { key: 'phone', title: '手机号', dataIndex: 'phone', width: 140 },
          { key: 'entryDate', title: '入职日期', dataIndex: 'entryDate', width: 120 },
        ],
        dataSource: generateEmployeeData(50),
      };
    },
    template: `
      <jh-pro-table
        v-bind="args"
        :columns="columns"
        :data-source="dataSource"
      >
        <template #toolbar-actions>
          <v-btn color="primary" @click="handleAdd">
            <v-icon left>mdi-plus</v-icon>
            新增员工
          </v-btn>
          <v-btn outlined @click="handleImport">
            <v-icon left>mdi-upload</v-icon>
            导入
          </v-btn>
          <v-btn outlined @click="handleExport">
            <v-icon left>mdi-download</v-icon>
            导出
          </v-btn>
        </template>
      </jh-pro-table>
    `,
    methods: {
      handleAdd() {
        alert('新增员工');
      },
      handleImport() {
        alert('导入员工数据');
      },
      handleExport() {
        alert('导出员工数据');
      },
    },
  }),
  args: {
    toolbar: {
      search: true,
      refresh: true,
      setting: true,
      density: true,
      fullscreen: true,
    },
  },
};

// 3. 带查询表单的表格
export const 查询表单表格 = {
  render: (args) => ({
    components: { JhProTable },
    data() {
      return {
        args,
        columns: [
          { key: 'id', title: '员工ID', dataIndex: 'id', width: 100 },
          { key: 'name', title: '姓名', dataIndex: 'name', width: 120 },
          { key: 'department', title: '部门', dataIndex: 'department', width: 120 },
          { key: 'position', title: '职位', dataIndex: 'position', width: 140 },
          { key: 'statusText', title: '状态', dataIndex: 'statusText', width: 100 },
          { key: 'entryDate', title: '入职日期', dataIndex: 'entryDate', width: 120 },
        ],
        dataSource: generateEmployeeData(30),
        searchConfig: {
          fields: [
            {
              key: 'name',
              label: '姓名',
              type: 'text',
              placeholder: '请输入员工姓名',
            },
            {
              key: 'department',
              label: '部门',
              type: 'select',
              options: [
                { text: '全部', value: '' },
                { text: '技术部', value: '技术部' },
                { text: '市场部', value: '市场部' },
                { text: '销售部', value: '销售部' },
                { text: '人事部', value: '人事部' },
                { text: '财务部', value: '财务部' },
              ],
            },
            {
              key: 'status',
              label: '状态',
              type: 'select',
              options: [
                { text: '全部', value: '' },
                { text: '在职', value: 'active' },
                { text: '离职', value: 'inactive' },
                { text: '待入职', value: 'pending' },
              ],
            },
            {
              key: 'entryDate',
              label: '入职日期',
              type: 'date',
            },
          ],
        },
      };
    },
    template: `
      <jh-pro-table
        v-bind="args"
        :columns="columns"
        :data-source="dataSource"
        :search-config="searchConfig"
        @search="handleSearch"
        @reset="handleReset"
      />
    `,
    methods: {
      handleSearch(values) {
        console.log('查询参数:', values);
      },
      handleReset() {
        console.log('重置查询');
      },
    },
  }),
  args: {},
};

// 4. 带操作列的表格
export const 操作列表格 = {
  render: (args) => ({
    components: { JhProTable },
    data() {
      return {
        args,
        columns: [
          { key: 'id', title: '员工ID', dataIndex: 'id', width: 100 },
          { key: 'name', title: '姓名', dataIndex: 'name', width: 120 },
          { key: 'department', title: '部门', dataIndex: 'department', width: 120 },
          { key: 'position', title: '职位', dataIndex: 'position', width: 140 },
          { key: 'statusText', title: '状态', dataIndex: 'statusText', width: 100 },
        ],
        dataSource: generateEmployeeData(15),
        actionColumn: {
          title: '操作',
          width: 220,
          buttons: [
            {
              text: '编辑',
              color: 'primary',
              onClick: (row) => this.handleEdit(row),
            },
            {
              text: '删除',
              color: 'error',
              confirm: '确认删除该员工记录？此操作不可恢复。',
              onClick: (row) => this.handleDelete(row),
            },
            {
              text: '详情',
              onClick: (row) => this.handleView(row),
            },
          ],
        },
      };
    },
    template: `
      <jh-pro-table
        v-bind="args"
        :columns="columns"
        :data-source="dataSource"
        :action-column="actionColumn"
      />
    `,
    methods: {
      handleEdit(row) {
        console.log('编辑:', row);
        alert(`编辑员工: ${row.name}`);
      },
      handleDelete(row) {
        console.log('删除:', row);
        alert(`已删除员工: ${row.name}`);
      },
      handleView(row) {
        console.log('查看:', row);
        alert(`查看员工详情: ${row.name}\n部门: ${row.department}\n职位: ${row.position}`);
      },
    },
  }),
  args: {},
};

// 5. 自定义列渲染 - 订单管理
export const 自定义列渲染 = {
  render: (args) => ({
    components: { JhProTable },
    data() {
      return {
        args,
        columns: [
          { key: 'orderNo', title: '订单号', dataIndex: 'orderNo', width: 180 },
          { key: 'customer', title: '客户', dataIndex: 'customer', width: 120 },
          { key: 'product', title: '商品', dataIndex: 'product', width: 200 },
          { key: 'quantity', title: '数量', dataIndex: 'quantity', width: 80 },
          { key: 'totalAmount', title: '总金额', dataIndex: 'totalAmount', width: 120 },
          { key: 'statusText', title: '状态', dataIndex: 'statusText', width: 120 },
          { key: 'createTime', title: '下单时间', dataIndex: 'createTime', width: 180 },
        ],
        dataSource: generateOrderData(30),
      };
    },
    template: `
      <jh-pro-table
        v-bind="args"
        :columns="columns"
        :data-source="dataSource"
      >
        <template #column-totalAmount="{ value }">
          <span style="color: #f5222d; font-weight: bold;">¥{{ value.toLocaleString() }}</span>
        </template>

        <template #column-statusText="{ row }">
          <v-chip
            :color="row.statusColor"
            small
            dark
          >
            {{ row.statusText }}
          </v-chip>
        </template>
      </jh-pro-table>
    `,
  }),
  args: {},
};

// 6. 批量操作表格
export const 批量操作表格 = {
  render: (args) => ({
    components: { JhProTable },
    data() {
      return {
        args,
        columns: [
          { key: 'orderNo', title: '订单号', dataIndex: 'orderNo', width: 180 },
          { key: 'customer', title: '客户', dataIndex: 'customer', width: 120 },
          { key: 'product', title: '商品', dataIndex: 'product', width: 200 },
          { key: 'totalAmount', title: '总金额', dataIndex: 'totalAmount', width: 120 },
          { key: 'statusText', title: '状态', dataIndex: 'statusText', width: 120 },
          { key: 'createTime', title: '下单时间', dataIndex: 'createTime', width: 160 },
        ],
        dataSource: generateOrderData(50),
        rowSelection: {
          type: 'checkbox',
        },
      };
    },
    template: `
      <jh-pro-table
        ref="tableRef"
        v-bind="args"
        :columns="columns"
        :data-source="dataSource"
        :row-selection="rowSelection"
        @selection-change="handleSelectionChange"
      >
        <template #toolbar-actions>
          <v-btn color="primary" small>
            <v-icon left small>mdi-plus</v-icon>
            新建订单
          </v-btn>
        </template>

        <template #column-totalAmount="{ value }">
          <span style="color: #f5222d; font-weight: bold;">¥{{ value.toLocaleString() }}</span>
        </template>

        <template #column-statusText="{ row }">
          <v-chip
            :color="row.statusColor"
            small
            dark
          >
            {{ row.statusText }}
          </v-chip>
        </template>

        <template #batch-actions="{ selectedRows }">
          <v-btn
            text
            small
            color="error"
            @click="handleBatchCancel(selectedRows)"
          >
            批量取消
          </v-btn>
          <v-btn
            text
            small
            color="primary"
            @click="handleBatchExport(selectedRows)"
          >
            批量导出
          </v-btn>
          <v-btn
            text
            small
            color="success"
            @click="handleBatchShip(selectedRows)"
          >
            批量发货
          </v-btn>
        </template>
      </jh-pro-table>
    `,
    methods: {
      handleSelectionChange({ selectedRowKeys, selectedRows }) {
        console.log('选中的订单:', selectedRows);
      },
      handleBatchCancel(rows) {
        alert(`批量取消 ${rows.length} 个订单`);
      },
      handleBatchExport(rows) {
        alert(`导出 ${rows.length} 个订单数据`);
      },
      handleBatchShip(rows) {
        alert(`批量发货 ${rows.length} 个订单`);
      },
    },
  }),
  args: {
    toolbar: {
      search: true,
      refresh: true,
      setting: true,
    },
  },
};

// 7. 服务端分页表格
export const 服务端分页 = {
  render: (args) => ({
    components: { JhProTable },
    data() {
      return {
        args,
        columns: [
          { key: 'id', title: '员工ID', dataIndex: 'id', width: 100, sortable: true },
          { key: 'name', title: '姓名', dataIndex: 'name', width: 120 },
          { key: 'department', title: '部门', dataIndex: 'department', width: 120 },
          { key: 'position', title: '职位', dataIndex: 'position', width: 140 },
          { key: 'phone', title: '手机号', dataIndex: 'phone', width: 140 },
          { key: 'entryDate', title: '入职日期', dataIndex: 'entryDate', width: 120, sortable: true },
        ],
        // 模拟所有数据
        allData: generateEmployeeData(200),
      };
    },
    template: `
      <div>
        <v-alert type="info" dense text class="mb-4">
          这是一个服务端分页示例，模拟了200条员工数据。尝试搜索、排序和翻页，数据将通过 request 函数动态加载。
        </v-alert>
        <jh-pro-table
          v-bind="args"
          :columns="columns"
          :request="fetchTableData"
        />
      </div>
    `,
    methods: {
      async fetchTableData(params) {
        console.log('API 请求参数:', params);

        // 模拟 API 请求延迟
        await new Promise(resolve => setTimeout(resolve, 800));

        const { page, pageSize, sorter, search } = params;

        // 过滤数据
        let filteredData = [...this.allData];

        if (search) {
          const keyword = search.toLowerCase();
          filteredData = filteredData.filter(item =>
            item.name.includes(search) ||
            item.department.includes(search) ||
            item.phone.includes(search)
          );
        }

        // 排序
        if (sorter && sorter.field) {
          filteredData.sort((a, b) => {
            const aVal = a[sorter.field];
            const bVal = b[sorter.field];
            if (sorter.order === 'asc') {
              return aVal > bVal ? 1 : -1;
            } else {
              return aVal < bVal ? 1 : -1;
            }
          });
        }

        // 分页
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const pageData = filteredData.slice(start, end);

        return {
          success: true,
          data: pageData,
          total: filteredData.length,
        };
      },
    },
  }),
  args: {
    toolbar: {
      search: true,
      refresh: true,
      setting: true,
    },
  },
};

// 8. 项目管理完整示例
export const 项目管理示例 = {
  render: (args) => ({
    components: { JhProTable },
    data() {
      return {
        args,
        columns: [
          { key: 'id', title: '项目ID', dataIndex: 'id', width: 120 },
          { key: 'name', title: '项目名称', dataIndex: 'name', width: 220 },
          { key: 'type', title: '项目类型', dataIndex: 'type', width: 120 },
          { key: 'owner', title: '负责人', dataIndex: 'owner', width: 100 },
          { key: 'priorityText', title: '优先级', dataIndex: 'priorityText', width: 100 },
          { key: 'statusText', title: '状态', dataIndex: 'statusText', width: 100 },
          { key: 'progress', title: '进度', dataIndex: 'progress', width: 120 },
          { key: 'budget', title: '预算(元)', dataIndex: 'budget', width: 130 },
          { key: 'teamSize', title: '团队人数', dataIndex: 'teamSize', width: 100 },
          { key: 'startDate', title: '开始日期', dataIndex: 'startDate', width: 120 },
        ],
        searchConfig: {
          fields: [
            { key: 'name', label: '项目名称', type: 'text', placeholder: '请输入项目名称' },
            {
              key: 'type',
              label: '项目类型',
              type: 'select',
              options: [
                { text: '全部', value: '' },
                { text: 'Web开发', value: 'Web开发' },
                { text: '移动应用', value: '移动应用' },
                { text: '数据分析', value: '数据分析' },
                { text: '人工智能', value: '人工智能' },
              ],
            },
            {
              key: 'priority',
              label: '优先级',
              type: 'select',
              options: [
                { text: '全部', value: '' },
                { text: '高', value: 'high' },
                { text: '中', value: 'medium' },
                { text: '低', value: 'low' },
              ],
            },
          ],
        },
        actionColumn: {
          title: '操作',
          width: 220,
          buttons: [
            {
              text: '查看',
              color: 'primary',
              onClick: (row) => this.handleView(row),
            },
            {
              text: '编辑',
              onClick: (row) => this.handleEdit(row),
            },
            {
              text: '删除',
              color: 'error',
              confirm: '确认删除该项目？删除后将无法恢复。',
              onClick: (row) => this.handleDelete(row),
            },
          ],
        },
        rowSelection: {
          type: 'checkbox',
        },
        allData: generateProjectData(100),
      };
    },
    template: `
      <div>
        <v-alert type="success" dense text class="mb-4">
          这是一个完整的项目管理表格示例，包含：查询表单、工具栏、自定义列渲染、操作列、批量操作和服务端分页。
        </v-alert>
        <jh-pro-table
          ref="tableRef"
          v-bind="args"
          :columns="columns"
          :search-config="searchConfig"
          :action-column="actionColumn"
          :row-selection="rowSelection"
          :request="fetchTableData"
          @row-click="handleRowClick"
        >
          <template #toolbar-actions>
            <v-btn color="primary" @click="handleAdd">
              <v-icon left>mdi-plus</v-icon>
              新建项目
            </v-btn>
            <v-btn outlined @click="handleTemplate">
              <v-icon left>mdi-file-document-outline</v-icon>
              项目模板
            </v-btn>
          </template>

          <template #column-priorityText="{ row }">
            <v-chip
              :color="row.priorityColor"
              small
              dark
            >
              {{ row.priorityText }}
            </v-chip>
          </template>

          <template #column-statusText="{ row }">
            <v-chip
              :color="getStatusColor(row.status)"
              small
              outlined
            >
              {{ row.statusText }}
            </v-chip>
          </template>

          <template #column-progress="{ value }">
            <div style="display: flex; align-items: center; gap: 8px;">
              <v-progress-linear
                :value="value"
                height="8"
                rounded
                :color="value === 100 ? 'success' : 'primary'"
              />
              <span style="font-size: 12px; width: 45px;">{{ value }}%</span>
            </div>
          </template>

          <template #column-budget="{ value }">
            <span style="color: #1890ff; font-weight: 500;">¥{{ value.toLocaleString() }}</span>
          </template>

          <template #batch-actions="{ selectedRows }">
            <v-btn text small color="success" @click="handleBatchArchive(selectedRows)">
              批量归档
            </v-btn>
            <v-btn text small color="error" @click="handleBatchDelete(selectedRows)">
              批量删除
            </v-btn>
            <v-btn text small color="primary" @click="handleBatchExport(selectedRows)">
              批量导出
            </v-btn>
          </template>
        </jh-pro-table>
      </div>
    `,
    methods: {
      async fetchTableData(params) {
        console.log('API 请求参数:', params);
        await new Promise(resolve => setTimeout(resolve, 600));

        const { page, pageSize, filters } = params;
        let filteredData = [...this.allData];

        if (filters.name) {
          filteredData = filteredData.filter(item =>
            item.name.includes(filters.name)
          );
        }

        if (filters.type) {
          filteredData = filteredData.filter(item =>
            item.type === filters.type
          );
        }

        if (filters.priority) {
          filteredData = filteredData.filter(item =>
            item.priority === filters.priority
          );
        }

        const start = (page - 1) * pageSize;
        const pageData = filteredData.slice(start, start + pageSize);

        return {
          success: true,
          data: pageData,
          total: filteredData.length,
        };
      },
      getStatusColor(status) {
        const colors = {
          planning: 'info',
          developing: 'primary',
          testing: 'warning',
          completed: 'success',
        };
        return colors[status] || 'default';
      },
      handleAdd() {
        alert('新建项目');
      },
      handleTemplate() {
        alert('选择项目模板');
      },
      handleView(row) {
        alert(`查看项目详情:\n项目: ${row.name}\n负责人: ${row.owner}\n进度: ${row.progress}%`);
      },
      handleEdit(row) {
        alert(`编辑项目: ${row.name}`);
      },
      handleDelete(row) {
        alert(`已删除项目: ${row.name}`);
      },
      handleRowClick(row) {
        console.log('点击项目:', row);
      },
      handleBatchArchive(rows) {
        alert(`批量归档 ${rows.length} 个项目`);
      },
      handleBatchDelete(rows) {
        alert(`批量删除 ${rows.length} 个项目`);
      },
      handleBatchExport(rows) {
        alert(`导出 ${rows.length} 个项目数据`);
      },
    },
  }),
  args: {
    toolbar: {
      search: true,
      refresh: true,
      setting: true,
      density: true,
    },
  },
};
