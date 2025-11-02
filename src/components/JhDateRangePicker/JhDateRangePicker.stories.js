import JhDateRangePicker from './JhDateRangePicker.vue';

export default {
  title: '基础组件/JhDateRangePicker - 日期范围',
  component: JhDateRangePicker,
  tags: ['autodocs'],
  argTypes: {
    prefix: {
      control: 'text',
      description: '输入框前缀文本',
    },
    filled: {
      control: 'boolean',
      description: '使用填充样式',
    },
    dense: {
      control: 'boolean',
      description: '使用紧凑模式',
    },
    outlined: {
      control: 'boolean',
      description: '使用轮廓样式',
    },
    hideDetails: {
      control: 'boolean',
      description: '隐藏详情信息',
    },
    clearable: {
      control: 'boolean',
      description: '是否可清除',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `

一个功能丰富的日期范围选择器组件，支持快捷日期选择和自定义日期范围。

## 功能特性

- 日期范围选择
- 快捷日期选择：
  - 最近7天、30天、90天、365天
  - 本月、上月
- 支持清除功能
- 支持多种样式：filled、outlined、dense
- 自动日期排序
- 确认/取消操作

## 使用方法

\`\`\`vue
<jh-date-range-picker
  v-model="dateRange"
  prefix="选择日期："
  @change="handleDateChange"
/>
\`\`\`

## 事件

- \`input\`: v-model 绑定事件，参数为日期数组 [startDate, endDate]
- \`change\`: 日期变化事件，参数为日期数组 [startDate, endDate]

## 日期格式

日期格式为 YYYY-MM-DD，例如：['2024-01-01', '2024-01-31']
        `,
      },
    },
  },
};

// 获取今天日期
const getToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 获取N天前的日期
const getDaysAgo = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 基础示例
export const 基础示例 = {
  args: {
    value: [getDaysAgo(7), getToday()],
    prefix: '',
    filled: true,
    dense: true,
    outlined: false,
    hideDetails: true,
    clearable: true,
  },
  render: (args) => ({
    components: { JhDateRangePicker },
    data() {
      return {
        dateRange: args.value || [],
      };
    },
    template: `
      <div>
        <jh-date-range-picker
          v-model="dateRange"
          :prefix="'${args.prefix}'"
          :filled="${args.filled}"
          :dense="${args.dense}"
          :outlined="${args.outlined}"
          :hide-details="${args.hideDetails}"
          :clearable="${args.clearable}"
          @change="handleChange"
        />
        <v-card class="mt-4" outlined>
          <v-card-text>
            <h4>选中的日期范围：</h4>
            <p v-if="dateRange && dateRange.length === 2">
              {{ dateRange[0] }} ~ {{ dateRange[1] }}
            </p>
            <p v-else class="grey--text">未选择日期</p>
          </v-card-text>
        </v-card>
      </div>
    `,
    methods: {
      handleChange(value) {
        console.log('Date range changed:', value);
        this.dateRange = value;
      },
    },
  }),
};

// 带前缀
export const 带前缀 = {
  args: {
    ...基础示例.args,
    prefix: '日期范围：',
  },
  render: 基础示例.render,
};

// 轮廓样式
export const 轮廓样式 = {
  args: {
    ...基础示例.args,
    filled: false,
    outlined: true,
  },
  render: 基础示例.render,
};

// 正常尺寸
export const 正常尺寸 = {
  args: {
    ...基础示例.args,
    dense: false,
  },
  render: 基础示例.render,
};

// 不可清除
export const 不可清除 = {
  args: {
    ...基础示例.args,
    clearable: false,
  },
  render: 基础示例.render,
};

// 初始为空
export const 初始为空 = {
  args: {
    value: [],
    prefix: '选择日期：',
    filled: true,
    dense: true,
    outlined: false,
    hideDetails: true,
    clearable: true,
  },
  render: 基础示例.render,
};

// 表单中使用
export const 表单中使用 = {
  args: 基础示例.args,
  render: (args) => ({
    components: { JhDateRangePicker },
    data() {
      return {
        formData: {
          dateRange: [getDaysAgo(30), getToday()],
          keyword: '',
          status: '',
        },
      };
    },
    template: `
      <v-card max-width="500">
        <v-card-title>数据查询</v-card-title>
        <v-card-text>
          <v-form>
            <jh-date-range-picker
              v-model="formData.dateRange"
              prefix="查询日期："
              filled
              dense
              hide-details="auto"
              class="mb-4"
            />
            <v-text-field
              v-model="formData.keyword"
              label="关键词"
              filled
              dense
              hide-details="auto"
              class="mb-4"
            ></v-text-field>
            <v-select
              v-model="formData.status"
              :items="statusOptions"
              label="状态"
              filled
              dense
              hide-details="auto"
            ></v-select>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="reset">重置</v-btn>
          <v-btn color="primary" @click="search">查询</v-btn>
        </v-card-actions>
        <v-divider></v-divider>
        <v-card-text>
          <h4>查询条件：</h4>
          <pre>{{ formData }}</pre>
        </v-card-text>
      </v-card>
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
      search() {
        console.log('Search with:', this.formData);
        alert('查询条件：\\n' + JSON.stringify(this.formData, null, 2));
      },
      reset() {
        this.formData = {
          dateRange: [],
          keyword: '',
          status: '',
        };
      },
    },
  }),
};

// 多个选择器
export const 多个选择器 = {
  args: 基础示例.args,
  render: () => ({
    components: { JhDateRangePicker },
    data() {
      return {
        createDate: [getDaysAgo(7), getToday()],
        updateDate: [getDaysAgo(3), getToday()],
      };
    },
    template: `
      <div>
        <v-row>
          <v-col cols="12" md="6">
            <div class="mb-2 text-subtitle-2">创建日期</div>
            <jh-date-range-picker
              v-model="createDate"
              prefix="创建："
              filled
              dense
            />
          </v-col>
          <v-col cols="12" md="6">
            <div class="mb-2 text-subtitle-2">更新日期</div>
            <jh-date-range-picker
              v-model="updateDate"
              prefix="更新："
              filled
              dense
            />
          </v-col>
        </v-row>
        <v-card class="mt-4" outlined>
          <v-card-text>
            <h4>选中的日期：</h4>
            <p><strong>创建日期：</strong>{{ createDate[0] }} ~ {{ createDate[1] }}</p>
            <p><strong>更新日期：</strong>{{ updateDate[0] }} ~ {{ updateDate[1] }}</p>
          </v-card-text>
        </v-card>
      </div>
    `,
  }),
};
