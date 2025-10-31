import JhQueryFilter from './JhQueryFilter.vue';

export default {
  title: '数据录入/JhQueryFilter',
  component: JhQueryFilter,
  tags: ['autodocs'],
  argTypes: {
    fields: {
      control: 'object',
      description: '查询字段配置数组',
    },
    initialValues: {
      control: 'object',
      description: '初始查询数据',
    },
    collapsible: {
      control: 'boolean',
      description: '是否可折叠',
    },
    defaultCollapsed: {
      control: 'boolean',
      description: '默认是否折叠',
    },
    defaultVisibleCount: {
      control: 'number',
      description: '默认显示字段数量（折叠时）',
    },
    searchText: {
      control: 'text',
      description: '查询按钮文本',
    },
    resetText: {
      control: 'text',
      description: '重置按钮文本',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `

高级查询筛选组件，参考 Ant Design Pro QueryFilter 设计，支持字段配置化查询表单。

## 功能特性

### 1. 字段类型支持
- **text**: 文本输入框
- **number**: 数字输入框
- **select**: 下拉选择框（支持单选/多选）
- **autocomplete**: 自动完成
- **date**: 日期选择器
- **daterange**: 日期范围选择器
- **slot**: 自定义字段插槽

### 2. 折叠/展开
- 默认显示前 3 个字段
- 超过设定数量自动显示展开按钮
- 支持自定义默认显示数量

### 3. 查询操作
- 查询按钮：提交查询，自动过滤空值
- 重置按钮：清空所有字段并触发查询
- 支持回车键快速查询

### 4. 响应式布局
- 自适应不同屏幕尺寸
- 支持自定义列宽配置

## API

### Props

| 参数 | 类型 | 默认值 | 说明 |
|-----|------|--------|------|
| fields | Array | [] | 字段配置数组 |
| initialValues | Object | {} | 初始查询数据 |
| collapsible | Boolean | true | 是否可折叠 |
| defaultCollapsed | Boolean | true | 默认是否折叠 |
| defaultVisibleCount | Number | 3 | 默认显示字段数量 |
| colSpan | Object | {...} | 列宽配置 |
| searchText | String | '查询' | 查询按钮文本 |
| resetText | String | '重置' | 重置按钮文本 |
| expandText | String | '展开' | 展开按钮文本 |
| collapseText | String | '收起' | 收起按钮文本 |

### 字段配置 (Field Config)

\`\`\`javascript
{
  key: 'fieldName',        // 字段名称
  label: '字段标签',        // 字段标签
  type: 'text',            // 字段类型
  placeholder: '请输入',    // 占位符
  defaultValue: '',        // 默认值
  options: [],             // 选项（select/autocomplete）
  cols: 12,                // 列宽（xs）
  sm: 12,                  // 列宽（sm）
  md: 8,                   // 列宽（md）
  lg: 6,                   // 列宽（lg）
  disabled: false,         // 是否禁用
  realtime: false,         // 是否实时查询
}
\`\`\`

### Events

| 事件名 | 参数 | 说明 |
|-------|------|------|
| search | queryData | 查询事件，返回过滤后的查询数据 |
| reset | - | 重置事件 |
| field-change | { key, value, formData } | 字段变化事件 |
| collapse-change | collapsed | 折叠状态变化 |

### Methods

| 方法名 | 参数 | 说明 |
|-------|------|------|
| getFormData | - | 获取表单数据 |
| setFieldsValue | values | 批量设置字段值 |
| setFieldValue | key, value | 设置单个字段值 |

## 使用示例

\`\`\`vue
<template>
  <jh-query-filter
    :fields="queryFields"
    :initial-values="initialValues"
    @search="handleSearch"
    @reset="handleReset"
  />
</template>

<script>
export default {
  data() {
    return {
      queryFields: [
        {
          key: 'keyword',
          label: '关键词',
          type: 'text',
          placeholder: '请输入关键词',
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
          key: 'dateRange',
          label: '日期范围',
          type: 'daterange',
          placeholder: '请选择日期',
        },
      ],
      initialValues: {
        status: '',
      },
    };
  },
  methods: {
    handleSearch(queryData) {
      console.log('查询参数:', queryData);
      // 调用表格刷新等操作
    },
    handleReset() {
      console.log('重置查询');
    },
  },
};
</script>
\`\`\`
        `,
      },
    },
  },
};

// 默认故事 - 基础查询表单
export const Default = {
  args: {
    fields: [
      {
        key: 'keyword',
        label: '关键词',
        type: 'text',
        placeholder: '请输入关键词',
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
        key: 'category',
        label: '分类',
        type: 'select',
        placeholder: '请选择分类',
        options: [
          { text: '全部', value: '' },
          { text: '技术', value: 'tech' },
          { text: '产品', value: 'product' },
          { text: '设计', value: 'design' },
        ],
      },
    ],
    initialValues: {},
    collapsible: true,
    defaultCollapsed: true,
    defaultVisibleCount: 3,
  },
  render: (args) => ({
    components: { JhQueryFilter },
    data() {
      return {
        args,
        queryData: {},
      };
    },
    template: `
      <div>
        <jh-query-filter
          v-bind="args"
          @search="handleSearch"
          @reset="handleReset"
        />
        <v-card class="mt-4" outlined>
          <v-card-text>
            <h4>查询参数：</h4>
            <pre>{{ JSON.stringify(queryData, null, 2) }}</pre>
          </v-card-text>
        </v-card>
      </div>
    `,
    methods: {
      handleSearch(queryData) {
        this.queryData = queryData;
        console.log('查询参数:', queryData);
      },
      handleReset() {
        console.log('重置查询');
      },
    },
  }),
};

// 多字段折叠示例
export const CollapsibleFields = {
  args: {
    fields: [
      {
        key: 'keyword',
        label: '关键词',
        type: 'text',
        placeholder: '请输入关键词',
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
        key: 'category',
        label: '分类',
        type: 'select',
        placeholder: '请选择分类',
        options: [
          { text: '全部', value: '' },
          { text: '技术', value: 'tech' },
          { text: '产品', value: 'product' },
        ],
      },
      {
        key: 'author',
        label: '作者',
        type: 'text',
        placeholder: '请输入作者',
      },
      {
        key: 'priority',
        label: '优先级',
        type: 'select',
        placeholder: '请选择优先级',
        options: [
          { text: '全部', value: '' },
          { text: '高', value: 'high' },
          { text: '中', value: 'medium' },
          { text: '低', value: 'low' },
        ],
      },
      {
        key: 'tags',
        label: '标签',
        type: 'autocomplete',
        placeholder: '请输入标签',
        options: [
          { text: 'Vue', value: 'vue' },
          { text: 'React', value: 'react' },
          { text: 'Angular', value: 'angular' },
        ],
      },
    ],
    initialValues: {},
    collapsible: true,
    defaultCollapsed: true,
    defaultVisibleCount: 3,
  },
  render: Default.render,
};

// 日期范围查询
export const WithDateRange = {
  args: {
    fields: [
      {
        key: 'keyword',
        label: '关键词',
        type: 'text',
        placeholder: '请输入关键词',
      },
      {
        key: 'status',
        label: '状态',
        type: 'select',
        placeholder: '请选择状态',
        options: [
          { text: '全部', value: '' },
          { text: '进行中', value: 'progress' },
          { text: '已完成', value: 'completed' },
        ],
      },
      {
        key: 'date',
        label: '日期',
        type: 'date',
        placeholder: '请选择日期',
      },
      {
        key: 'dateRange',
        label: '日期范围',
        type: 'daterange',
        placeholder: '请选择日期范围',
      },
    ],
    initialValues: {},
    collapsible: false,
  },
  render: Default.render,
};

// 自定义初始值
export const WithInitialValues = {
  args: {
    fields: [
      {
        key: 'keyword',
        label: '关键词',
        type: 'text',
        placeholder: '请输入关键词',
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
        defaultValue: 'active',
      },
      {
        key: 'category',
        label: '分类',
        type: 'select',
        placeholder: '请选择分类',
        options: [
          { text: '全部', value: '' },
          { text: '技术', value: 'tech' },
          { text: '产品', value: 'product' },
        ],
      },
    ],
    initialValues: {
      keyword: '搜索关键词',
      status: 'active',
    },
    collapsible: false,
  },
  render: Default.render,
};

// 自定义字段插槽
export const CustomFieldSlot = {
  args: {
    fields: [
      {
        key: 'keyword',
        label: '关键词',
        type: 'text',
        placeholder: '请输入关键词',
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
        key: 'customField',
        label: '自定义字段',
        type: 'slot',
      },
    ],
    initialValues: {},
    collapsible: false,
  },
  render: (args) => ({
    components: { JhQueryFilter },
    data() {
      return {
        args,
        customValue: '',
        queryData: {},
      };
    },
    template: `
      <div>
        <jh-query-filter
          v-bind="args"
          @search="handleSearch"
          @reset="handleReset"
        >
          <template #field-customField="{ updateField }">
            <v-text-field
              v-model="customValue"
              placeholder="自定义字段插槽"
              dense
              filled
              single-line
              class="jh-v-input"
              hide-details
              @input="updateField('customField', $event)"
            >
              <template v-slot:append>
                <v-icon small>mdi-magnify</v-icon>
              </template>
            </v-text-field>
          </template>
        </jh-query-filter>
        <v-card class="mt-4" outlined>
          <v-card-text>
            <h4>查询参数：</h4>
            <pre>{{ JSON.stringify(queryData, null, 2) }}</pre>
          </v-card-text>
        </v-card>
      </div>
    `,
    methods: {
      handleSearch(queryData) {
        this.queryData = queryData;
        console.log('查询参数:', queryData);
      },
      handleReset() {
        this.customValue = '';
        console.log('重置查询');
      },
    },
  }),
};

// 自定义按钮插槽
export const CustomButtons = {
  args: {
    fields: [
      {
        key: 'keyword',
        label: '关键词',
        type: 'text',
        placeholder: '请输入关键词',
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
    ],
    initialValues: {},
    collapsible: false,
  },
  render: (args) => ({
    components: { JhQueryFilter },
    data() {
      return {
        args,
        queryData: {},
      };
    },
    template: `
      <div>
        <jh-query-filter
          v-bind="args"
          @search="handleSearch"
        >
          <template #buttons="{ formData, search, reset }">
            <div class="d-flex align-center gap-2">
              <v-btn
                color="primary"
                small
                @click="search"
              >
                <v-icon left small>mdi-magnify</v-icon>
                搜索
              </v-btn>
              <v-btn
                color="default"
                small
                text
                @click="reset"
              >
                <v-icon left small>mdi-refresh</v-icon>
                清空
              </v-btn>
              <v-btn
                color="success"
                small
                @click="handleExport"
              >
                <v-icon left small>mdi-download</v-icon>
                导出
              </v-btn>
            </div>
          </template>
        </jh-query-filter>
        <v-card class="mt-4" outlined>
          <v-card-text>
            <h4>查询参数：</h4>
            <pre>{{ JSON.stringify(queryData, null, 2) }}</pre>
          </v-card-text>
        </v-card>
      </div>
    `,
    methods: {
      handleSearch(queryData) {
        this.queryData = queryData;
        console.log('查询参数:', queryData);
      },
      handleExport() {
        alert('导出数据');
      },
    },
  }),
};

// 完整示例 - 配合 JhTable 使用
export const CompleteExample = {
  render: () => ({
    components: { JhQueryFilter },
    data() {
      return {
        queryFields: [
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
              { text: '在职', value: 'active' },
              { text: '离职', value: 'inactive' },
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
            label: '入职时间',
            type: 'daterange',
            placeholder: '请选择日期范围',
          },
        ],
        initialValues: {},
        queryData: {},
        tableData: [],
        loading: false,
      };
    },
    template: `
      <div>
        <v-card outlined>
          <v-card-text>
            <jh-query-filter
              :fields="queryFields"
              :initial-values="initialValues"
              :loading="loading"
              @search="handleSearch"
              @reset="handleReset"
            />
          </v-card-text>
        </v-card>

        <v-card class="mt-4" outlined>
          <v-card-text>
            <h3>查询结果</h3>
            <div class="mt-2">
              <p><strong>当前查询条件：</strong></p>
              <pre class="pa-2 grey lighten-4 rounded">{{ JSON.stringify(queryData, null, 2) }}</pre>
            </div>
            <div class="mt-4">
              <p class="grey--text">在实际使用中，这里会显示 JhTable 组件，并根据查询条件刷新表格数据。</p>
              <v-alert type="info" text dense>
                示例代码：&lt;jh-table :request="fetchData" /&gt;
              </v-alert>
            </div>
          </v-card-text>
        </v-card>
      </div>
    `,
    methods: {
      async handleSearch(queryData) {
        this.loading = true;
        this.queryData = queryData;
        console.log('查询参数:', queryData);

        // 模拟 API 请求
        await new Promise(resolve => setTimeout(resolve, 1000));

        this.loading = false;
        console.log('查询完成');
      },
      handleReset() {
        this.queryData = {};
        console.log('重置查询');
      },
    },
  }),
};
