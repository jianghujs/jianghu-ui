import JhQueryFilter from './JhQueryFilter.vue';

// 示例表头数据
const sampleHeaders = [
  { text: '用户名', value: 'username' },
  { text: '邮箱', value: 'email' },
  { text: '手机号', value: 'phone' },
  { text: '状态', value: 'status' },
  { text: '创建时间', value: 'createdAt' },
  { text: '操作', value: 'action' },
];

export default {
  title: '基础组件/JhQueryFilter',
  component: JhQueryFilter,
  tags: ['autodocs'],
  argTypes: {
    showKeywordSearch: {
      control: 'boolean',
      description: '是否显示关键字搜索',
    },
    keyword: {
      control: 'text',
      description: '关键字搜索内容',
    },
    keywordFieldList: {
      control: 'object',
      description: '关键字搜索字段列表',
    },
    keywordLabel: {
      control: 'text',
      description: '关键字字段标签',
    },
    headers: {
      control: 'object',
      description: '表头数据（用于关键字字段选择）',
    },
    searchButtonText: {
      control: 'text',
      description: '查询按钮文本',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
# JhQueryFilter - 江湖查询筛选组件

查询筛选组件，支持关键字搜索和自定义筛选字段。

## 功能特性

- 关键字搜索（支持多字段选择）
- 自定义筛选字段插槽
- 额外操作按钮插槽
- 响应式布局

## 使用场景

适用于需要查询和筛选功能的列表页面，如：
- 用户列表筛选
- 订单查询
- 商品搜索

## 事件

- \`search\`: 点击查询按钮时触发
- \`update:keyword\`: 关键字变化时触发
- \`update:keywordFieldList\`: 关键字字段列表变化时触发

## 插槽

- \`filter-fields\`: 自定义筛选字段
- \`extra-actions\`: 额外操作按钮
        `,
      },
    },
  },
};

// 默认故事
export const Default = {
  args: {
    showKeywordSearch: true,
    keyword: '',
    keywordFieldList: ['username', 'email'],
    keywordLabel: '标题',
    headers: sampleHeaders,
    searchButtonText: '查询',
  },
  render: (args) => ({
    components: { JhQueryFilter },
    data() {
      return {
        args,
        keywordSync: args.keyword,
        keywordFieldListSync: [...args.keywordFieldList],
      };
    },
    template: `
      <div>
        <jh-query-filter
          v-bind="args"
          :keyword.sync="keywordSync"
          :keywordFieldList.sync="keywordFieldListSync"
          @search="handleSearch"
        />
        <v-card class="mt-4" outlined>
          <v-card-text>
            <h4>搜索参数：</h4>
            <p><strong>关键字：</strong>{{ keywordSync }}</p>
            <p><strong>搜索字段：</strong>{{ keywordFieldListSync.join(', ') }}</p>
          </v-card-text>
        </v-card>
      </div>
    `,
    methods: {
      handleSearch() {
        console.log('Search triggered', {
          keyword: this.keywordSync,
          fields: this.keywordFieldListSync,
        });
        alert('查询触发！关键字：' + this.keywordSync);
      },
    },
  }),
};

// 带自定义筛选字段的故事
export const WithCustomFilters = {
  args: {
    ...Default.args,
  },
  render: (args) => ({
    components: { JhQueryFilter },
    data() {
      return {
        args,
        keywordSync: args.keyword,
        keywordFieldListSync: [...args.keywordFieldList],
        status: '',
        dateRange: '',
      };
    },
    template: `
      <div>
        <jh-query-filter
          v-bind="args"
          :keyword.sync="keywordSync"
          :keywordFieldList.sync="keywordFieldListSync"
          @search="handleSearch"
        >
          <template v-slot:filter-fields>
            <v-col cols="12" sm="3" md="2" class="pl-md-2">
              <v-select
                v-model="status"
                :items="statusOptions"
                label="状态"
                dense
                filled
                single-line
                class="jh-v-input"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="3" md="2" class="pl-md-2">
              <v-text-field
                v-model="dateRange"
                label="日期"
                dense
                filled
                single-line
                class="jh-v-input"
              ></v-text-field>
            </v-col>
          </template>
        </jh-query-filter>
        <v-card class="mt-4" outlined>
          <v-card-text>
            <h4>搜索参数：</h4>
            <p><strong>关键字：</strong>{{ keywordSync }}</p>
            <p><strong>搜索字段：</strong>{{ keywordFieldListSync.join(', ') }}</p>
            <p><strong>状态：</strong>{{ status }}</p>
            <p><strong>日期：</strong>{{ dateRange }}</p>
          </v-card-text>
        </v-card>
      </div>
    `,
    computed: {
      statusOptions() {
        return [
          { text: '全部', value: '' },
          { text: '启用', value: 'active' },
          { text: '禁用', value: 'inactive' },
        ];
      },
    },
    methods: {
      handleSearch() {
        console.log('Search triggered', {
          keyword: this.keywordSync,
          fields: this.keywordFieldListSync,
          status: this.status,
          dateRange: this.dateRange,
        });
        alert('查询触发！');
      },
    },
  }),
};

// 带额外操作按钮
export const WithExtraActions = {
  args: {
    ...Default.args,
  },
  render: (args) => ({
    components: { JhQueryFilter },
    data() {
      return {
        args,
        keywordSync: args.keyword,
        keywordFieldListSync: [...args.keywordFieldList],
      };
    },
    template: `
      <div>
        <jh-query-filter
          v-bind="args"
          :keyword.sync="keywordSync"
          :keywordFieldList.sync="keywordFieldListSync"
          @search="handleSearch"
        >
          <template v-slot:extra-actions>
            <div class="ml-2">
              <v-btn
                class="elevation-0 mt-2 mt-sm-0"
                color="primary"
                small
                @click="handleExport"
              >
                导出
              </v-btn>
            </div>
          </template>
        </jh-query-filter>
        <v-card class="mt-4" outlined>
          <v-card-text>
            <h4>搜索参数：</h4>
            <p><strong>关键字：</strong>{{ keywordSync }}</p>
            <p><strong>搜索字段：</strong>{{ keywordFieldListSync.join(', ') }}</p>
          </v-card-text>
        </v-card>
      </div>
    `,
    methods: {
      handleSearch() {
        console.log('Search triggered');
        alert('查询触发！');
      },
      handleExport() {
        console.log('Export triggered');
        alert('导出触发！');
      },
    },
  }),
};

// 不显示关键字搜索
export const WithoutKeywordSearch = {
  args: {
    ...Default.args,
    showKeywordSearch: false,
  },
  render: (args) => ({
    components: { JhQueryFilter },
    data() {
      return {
        args,
        status: '',
      };
    },
    template: `
      <div>
        <jh-query-filter
          v-bind="args"
          @search="handleSearch"
        >
          <template v-slot:filter-fields>
            <v-col cols="12" sm="4" md="3" class="pl-md-2">
              <v-select
                v-model="status"
                :items="statusOptions"
                label="状态"
                dense
                filled
                single-line
                class="jh-v-input"
              ></v-select>
            </v-col>
          </template>
        </jh-query-filter>
        <v-card class="mt-4" outlined>
          <v-card-text>
            <h4>搜索参数：</h4>
            <p><strong>状态：</strong>{{ status }}</p>
          </v-card-text>
        </v-card>
      </div>
    `,
    computed: {
      statusOptions() {
        return [
          { text: '全部', value: '' },
          { text: '启用', value: 'active' },
          { text: '禁用', value: 'inactive' },
        ];
      },
    },
    methods: {
      handleSearch() {
        console.log('Search triggered', { status: this.status });
        alert('查询触发！');
      },
    },
  }),
};
