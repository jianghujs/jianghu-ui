import JhStatisticCard from './JhStatisticCard.vue';


export default {
  title: '布局/JhStatisticCard - 统计卡片',
  component: JhStatisticCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
 指标卡组件，参考 Ant Design Pro StatisticCard 设计规范。用于展示统计数据、趋势和图表，适用于数据大屏、仪表盘等场景。

## 使用前提

需要在 HTML 中引入 echarts 库：

\`\`\`html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vue-echarts@8.0.1/dist/style.min.css">
<script src="https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue-echarts@8.0.1/dist/index.min.js"></script>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: '卡片标题',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    tooltip: {
      control: 'text',
      description: '标题提示信息',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    value: {
      control: 'number',
      description: '统计数值',
      table: {
        type: { summary: 'number | string' },
        defaultValue: { summary: '0' },
      },
    },
    prefix: {
      control: 'text',
      description: '数值前缀',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    suffix: {
      control: 'text',
      description: '数值后缀',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    precision: {
      control: 'number',
      description: '数值精度（小数位数）',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    valueColor: {
      control: 'color',
      description: '数值颜色',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    trend: {
      control: 'text',
      description: '趋势文本',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    trendType: {
      control: 'select',
      options: ['up', 'down'],
      description: '趋势类型',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'up' },
      },
    },
    description: {
      control: 'text',
      description: '描述信息',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    footer: {
      control: 'text',
      description: '底部信息',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    chartOption: {
      control: 'object',
      description: 'ECharts 图表配置',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: 'null' },
      },
    },
    chartHeight: {
      control: 'number',
      description: '图表高度',
      table: {
        type: { summary: 'number | string' },
        defaultValue: { summary: '46' },
      },
    },
    chartWidth: {
      control: 'number',
      description: '图表宽度',
      table: {
        type: { summary: 'number | string' },
        defaultValue: { summary: '100' },
      },
    },
    bordered: {
      control: 'boolean',
      description: '是否显示边框',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    loading: {
      control: 'boolean',
      description: '加载状态',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    layout: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '布局方向',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'horizontal' },
      },
    },
  },
};

// 基础用法
export const Basic = {
  render: (args) => ({
    components: { JhStatisticCard },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 20px; background: #f0f2f5;">
        <jh-statistic-card
          v-bind="args"
          title="总销售额"
          :value="126560"
          prefix="¥"
          trend="12.5%"
          trend-type="up"
          description="周同比"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '最基础的用法，展示统计数值和趋势。',
      },
    },
  },
};

// 带图表的指标卡
export const WithLineChart = {
  render: () => ({
    components: { JhStatisticCard },
    data() {
      return {
        chartOption: {
          grid: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
          xAxis: {
            type: 'category',
            show: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          },
          yAxis: {
            type: 'value',
            show: false,
          },
          series: [
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line',
              smooth: true,
              symbol: 'none',
              lineStyle: {
                color: '#1890ff',
                width: 2,
              },
              areaStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: 'rgba(24, 144, 255, 0.3)' },
                    { offset: 1, color: 'rgba(24, 144, 255, 0)' },
                  ],
                },
              },
            },
          ],
        },
      };
    },
    template: `
      <div style="padding: 20px; background: #f0f2f5;">
        <jh-statistic-card
          title="访问量"
          :value="8846"
          trend="8.5%"
          trend-type="up"
          description="日同比"
          :chart-option="chartOption"
          :chart-width="120"
          :chart-height="46"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '带折线图的指标卡，使用 ECharts 展示趋势数据。',
      },
    },
  },
};

// 带柱状图的指标卡
export const WithBarChart = {
  render: () => ({
    components: { JhStatisticCard },
    data() {
      return {
        chartOption: {
          grid: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
          xAxis: {
            type: 'category',
            show: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          },
          yAxis: {
            type: 'value',
            show: false,
          },
          series: [
            {
              data: [120, 200, 150, 80, 70, 110, 130],
              type: 'bar',
              barWidth: 4,
              itemStyle: {
                color: '#52c41a',
                borderRadius: [2, 2, 0, 0],
              },
            },
          ],
        },
      };
    },
    template: `
      <div style="padding: 20px; background: #f0f2f5;">
        <jh-statistic-card
          title="支付笔数"
          :value="6560"
          trend="5.2%"
          trend-type="down"
          description="周同比"
          :chart-option="chartOption"
          :chart-width="120"
          :chart-height="46"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '带柱状图的指标卡，适合展示离散数据。',
      },
    },
  },
};

// 多个指标卡组合
export const CardGroup = {
  render: () => ({
    components: { JhStatisticCard },
    data() {
      return {
        lineChartOption: {
          grid: { left: 0, right: 0, top: 0, bottom: 0 },
          xAxis: { type: 'category', show: false, data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
          yAxis: { type: 'value', show: false },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true,
            symbol: 'none',
            lineStyle: { color: '#1890ff', width: 2 },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [
                  { offset: 0, color: 'rgba(24, 144, 255, 0.3)' },
                  { offset: 1, color: 'rgba(24, 144, 255, 0)' },
                ],
              },
            },
          }],
        },
        barChartOption: {
          grid: { left: 0, right: 0, top: 0, bottom: 0 },
          xAxis: { type: 'category', show: false, data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
          yAxis: { type: 'value', show: false },
          series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            barWidth: 4,
            itemStyle: { color: '#52c41a', borderRadius: [2, 2, 0, 0] },
          }],
        },
      };
    },
    template: `
      <div style="padding: 20px; background: #f0f2f5;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
          <jh-statistic-card
            title="总销售额"
            :value="126560"
            prefix="¥"
            trend="12.5%"
            trend-type="up"
            description="周同比"
            :chart-option="lineChartOption"
            :chart-width="100"
          />
          <jh-statistic-card
            title="访问量"
            :value="8846"
            trend="8.5%"
            trend-type="up"
            description="日同比"
            :chart-option="lineChartOption"
            :chart-width="100"
          />
          <jh-statistic-card
            title="支付笔数"
            :value="6560"
            trend="5.2%"
            trend-type="down"
            description="周同比"
            :chart-option="barChartOption"
            :chart-width="100"
          />
          <jh-statistic-card
            title="运营活动效果"
            :value="78"
            suffix="%"
            trend="2.1%"
            trend-type="up"
            description="周同比"
            :chart-option="lineChartOption"
            :chart-width="100"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '多个指标卡组合展示，适用于数据大屏和仪表盘场景。',
      },
    },
  },
};

// 自定义颜色
export const CustomColor = {
  render: () => ({
    components: { JhStatisticCard },
    data() {
      return {
        chartOption: {
          grid: { left: 0, right: 0, top: 0, bottom: 0 },
          xAxis: { type: 'category', show: false, data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
          yAxis: { type: 'value', show: false },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true,
            symbol: 'none',
            lineStyle: { color: '#f5222d', width: 2 },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [
                  { offset: 0, color: 'rgba(245, 34, 45, 0.3)' },
                  { offset: 1, color: 'rgba(245, 34, 45, 0)' },
                ],
              },
            },
          }],
        },
      };
    },
    template: `
      <div style="padding: 20px; background: #f0f2f5;">
        <jh-statistic-card
          title="异常订单"
          :value="234"
          value-color="#f5222d"
          trend="15.3%"
          trend-type="down"
          description="周同比"
          :chart-option="chartOption"
          :chart-width="100"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '自定义数值颜色和图表颜色，用于突出显示特殊数据。',
      },
    },
  },
};

// 带底部信息
export const WithFooter = {
  render: () => ({
    components: { JhStatisticCard },
    template: `
      <div style="padding: 20px; background: #f0f2f5;">
        <jh-statistic-card
          title="转化率"
          :value="60.5"
          :precision="1"
          suffix="%"
          trend="3.2%"
          trend-type="up"
          description="周同比"
          footer="日均转化率 58.2%"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '带底部信息的指标卡，可以展示额外的统计信息。',
      },
    },
  },
};

// 垂直布局
export const VerticalLayout = {
  render: () => ({
    components: { JhStatisticCard },
    data() {
      return {
        chartOption: {
          grid: { left: 0, right: 0, top: 0, bottom: 0 },
          xAxis: { type: 'category', show: false, data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
          yAxis: { type: 'value', show: false },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true,
            symbol: 'none',
            lineStyle: { color: '#1890ff', width: 2 },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [
                  { offset: 0, color: 'rgba(24, 144, 255, 0.3)' },
                  { offset: 1, color: 'rgba(24, 144, 255, 0)' },
                ],
              },
            },
          }],
        },
      };
    },
    template: `
      <div style="padding: 20px; background: #f0f2f5;">
        <jh-statistic-card
          title="总销售额"
          :value="126560"
          prefix="¥"
          trend="12.5%"
          trend-type="up"
          description="周同比"
          layout="vertical"
          :chart-option="chartOption"
          :chart-width="'100%'"
          :chart-height="100"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '垂直布局的指标卡，图表显示在数据下方。',
      },
    },
  },
};

// 无边框
export const NoBorder = {
  render: () => ({
    components: { JhStatisticCard },
    data() {
      return {
        chartOption: {
          grid: { left: 0, right: 0, top: 0, bottom: 0 },
          xAxis: { type: 'category', show: false, data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
          yAxis: { type: 'value', show: false },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true,
            symbol: 'none',
            lineStyle: { color: '#1890ff', width: 2 },
          }],
        },
      };
    },
    template: `
      <div style="padding: 20px; background: #f0f2f5;">
        <jh-statistic-card
          title="访问量"
          :value="8846"
          trend="8.5%"
          trend-type="up"
          description="日同比"
          :bordered="false"
          :chart-option="chartOption"
          :chart-width="100"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '无边框的指标卡，适合在已有背景的容器中使用。',
      },
    },
  },
};

// 自定义插槽
export const CustomSlots = {
  render: () => ({
    components: { JhStatisticCard },
    data() {
      return {
        chartOption: {
          grid: { left: 0, right: 0, top: 0, bottom: 0 },
          xAxis: { type: 'category', show: false, data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
          yAxis: { type: 'value', show: false },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true,
            symbol: 'none',
            lineStyle: { color: '#1890ff', width: 2 },
          }],
        },
      };
    },
    template: `
      <div style="padding: 20px; background: #f0f2f5;">
        <jh-statistic-card :chart-option="chartOption" :chart-width="100">
          <template #title>
            <div style="display: flex; align-items: center;">
              <v-icon small color="primary" class="mr-2">mdi-chart-line</v-icon>
              <span style="font-weight: 500;">自定义标题</span>
            </div>
          </template>
          <template #value>
            <span style="color: #1890ff; font-size: 32px; font-weight: bold;">¥126,560</span>
          </template>
          <template #trend>
            <div style="color: #52c41a;">
              <v-icon small color="success">mdi-arrow-up</v-icon>
              <span>增长 12.5%</span>
            </div>
          </template>
          <template #description>
            <span style="color: #999;">较上周增长明显</span>
          </template>
          <template #footer>
            <div style="display: flex; justify-content: space-between;">
              <span>日均销售额 ¥18,080</span>
              <a href="#" style="color: #1890ff;">查看详情 ></a>
            </div>
          </template>
        </jh-statistic-card>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '使用插槽自定义各个区域的内容，实现更灵活的布局。',
      },
    },
  },
};

// 仪表盘示例
export const Dashboard = {
  render: () => ({
    components: { JhStatisticCard },
    data() {
      return {
        salesChart: {
          grid: { left: 0, right: 0, top: 0, bottom: 0 },
          xAxis: { type: 'category', show: false, data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] },
          yAxis: { type: 'value', show: false },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320, 1450, 1500, 1600, 1700, 1800],
            type: 'line',
            smooth: true,
            symbol: 'none',
            lineStyle: { color: '#1890ff', width: 2 },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [
                  { offset: 0, color: 'rgba(24, 144, 255, 0.3)' },
                  { offset: 1, color: 'rgba(24, 144, 255, 0)' },
                ],
              },
            },
          }],
        },
        visitsChart: {
          grid: { left: 0, right: 0, top: 0, bottom: 0 },
          xAxis: { type: 'category', show: false, data: Array.from({ length: 30 }, (_, i) => i + 1) },
          yAxis: { type: 'value', show: false },
          series: [{
            data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 1000) + 500),
            type: 'bar',
            barWidth: 3,
            itemStyle: { color: '#52c41a', borderRadius: [2, 2, 0, 0] },
          }],
        },
        ordersChart: {
          grid: { left: 0, right: 0, top: 0, bottom: 0 },
          xAxis: { type: 'category', show: false, data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
          yAxis: { type: 'value', show: false },
          series: [{
            data: [320, 432, 301, 434, 590, 530, 520],
            type: 'line',
            smooth: true,
            symbol: 'none',
            lineStyle: { color: '#faad14', width: 2 },
          }],
        },
        conversionChart: {
          grid: { left: 0, right: 0, top: 0, bottom: 0 },
          xAxis: { type: 'category', show: false, data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
          yAxis: { type: 'value', show: false },
          series: [{
            data: [60, 65, 58, 70, 68, 72, 75],
            type: 'line',
            smooth: true,
            symbol: 'none',
            lineStyle: { color: '#722ed1', width: 2 },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [
                  { offset: 0, color: 'rgba(114, 46, 209, 0.3)' },
                  { offset: 1, color: 'rgba(114, 46, 209, 0)' },
                ],
              },
            },
          }],
        },
      };
    },
    template: `
      <div style="padding: 20px; background: #f0f2f5;">
        <h2 style="margin-bottom: 20px; color: rgba(0, 0, 0, 0.85);">数据概览</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-bottom: 24px;">
          <jh-statistic-card
            title="总销售额"
            :value="126560"
            prefix="¥"
            trend="12.5%"
            trend-type="up"
            description="周同比 12.5%"
            :chart-option="salesChart"
            :chart-width="120"
            footer="日均销售额 ¥18,080"
          />
          <jh-statistic-card
            title="访问量"
            :value="8846"
            trend="8.5%"
            trend-type="up"
            description="日同比 8.5%"
            :chart-option="visitsChart"
            :chart-width="120"
            footer="日均访问量 1,234"
          />
          <jh-statistic-card
            title="支付笔数"
            :value="6560"
            trend="5.2%"
            trend-type="down"
            description="周同比 -5.2%"
            :chart-option="ordersChart"
            :chart-width="120"
            footer="日均支付笔数 937"
          />
          <jh-statistic-card
            title="转化率"
            :value="78.5"
            :precision="1"
            suffix="%"
            trend="2.1%"
            trend-type="up"
            description="周同比 2.1%"
            :chart-option="conversionChart"
            :chart-width="120"
            footer="日均转化率 76.3%"
          />
        </div>
        
        <h2 style="margin-bottom: 20px; color: rgba(0, 0, 0, 0.85);">运营数据</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
          <jh-statistic-card
            title="新增用户"
            :value="1234"
            trend="18.2%"
            trend-type="up"
            description="月同比"
            :chart-option="visitsChart"
            :chart-width="120"
          />
          <jh-statistic-card
            title="活跃用户"
            :value="5678"
            trend="3.5%"
            trend-type="up"
            description="月同比"
            :chart-option="salesChart"
            :chart-width="120"
          />
          <jh-statistic-card
            title="用户留存率"
            :value="85.2"
            :precision="1"
            suffix="%"
            trend="1.2%"
            trend-type="down"
            description="月同比"
            :chart-option="conversionChart"
            :chart-width="120"
          />
          <jh-statistic-card
            title="平均响应时间"
            :value="234"
            suffix="ms"
            trend="5.8%"
            trend-type="down"
            description="周同比"
            value-color="#52c41a"
            :chart-option="ordersChart"
            :chart-width="120"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '完整的仪表盘示例，展示多个指标卡的组合使用。',
      },
    },
  },
};
