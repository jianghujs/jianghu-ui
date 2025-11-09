<template>
  <div :class="cardClasses" :style="cardStyles">
    <!-- 标题区域 -->
    <div v-if="title || $slots.title" class="jh-statistic-card-header">
      <slot name="title">
        <div class="jh-statistic-card-title">{{ title }}</div>
      </slot>
      <div v-if="tooltip" class="jh-statistic-card-tooltip">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon small v-bind="attrs" v-on="on">mdi-help-circle-outline</v-icon>
          </template>
          <span>{{ tooltip }}</span>
        </v-tooltip>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="jh-statistic-card-content">
      <!-- 左侧统计数据 -->
      <div class="jh-statistic-card-statistic">
        <!-- 数值 -->
        <div class="jh-statistic-card-value-wrapper">
          <span v-if="prefix" class="jh-statistic-card-prefix">{{ prefix }}</span>
          <span :class="valueClasses" :style="valueStyles">
            <slot name="value">{{ formattedValue }}</slot>
          </span>
          <span v-if="suffix" class="jh-statistic-card-suffix">{{ suffix }}</span>
        </div>

        <!-- 趋势指标 -->
        <div v-if="trend || $slots.trend" class="jh-statistic-card-trend">
          <slot name="trend">
            <v-icon 
              small 
              :color="trendColor"
              class="jh-statistic-card-trend-icon"
            >
              {{ trendIcon }}
            </v-icon>
            <span :style="{ color: trendColor }">{{ trend }}</span>
          </slot>
        </div>

        <!-- 描述信息 -->
        <div v-if="description || $slots.description" class="jh-statistic-card-description">
          <slot name="description">{{ description }}</slot>
        </div>
      </div>

      <!-- 右侧图表区域 -->
      <div v-if="hasChart" class="jh-statistic-card-chart">
        <slot name="chart">
          <v-chart 
            v-if="chartOption" 
            :option="chartOption" 
            :style="chartStyles"
            autoresize
          />
        </slot>
      </div>
    </div>

    <!-- 底部操作区 -->
    <div v-if="$slots.footer || footer" class="jh-statistic-card-footer">
      <slot name="footer">{{ footer }}</slot>
    </div>
  </div>
</template>

<script>
// CDN 方式引入 echarts 和 vue-echarts
// 在 HTML 中添加以下 CDN 链接：

// 检查全局 echarts 和 VueECharts 是否可用
const isEChartsAvailable = () => {
  return typeof window !== 'undefined' && window.echarts;
};

const isVueEChartsAvailable = () => {
  return typeof window !== 'undefined' && window.VueECharts;
};

// 动态组件定义
const VChart = {
  name: 'VChart',
  props: {
    option: Object,
    autoresize: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.initChart();
    if (this.autoresize) {
      window.addEventListener('resize', this.handleResize);
    }
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
    if (this.autoresize) {
      window.removeEventListener('resize', this.handleResize);
    }
  },
  watch: {
    option: {
      handler() {
        this.updateChart();
      },
      deep: true,
    },
  },
  methods: {
    initChart() {
      if (!isEChartsAvailable()) {
        console.warn('ECharts is not available. Please include ECharts CDN.');
        return;
      }
      
      this.chart = window.echarts.init(this.$el);
      this.updateChart();
    },
    updateChart() {
      if (this.chart && this.option) {
        this.chart.setOption(this.option, true);
      }
    },
    handleResize() {
      if (this.chart) {
        this.chart.resize();
      }
    },
  },
  render(h) {
    return h('div', {
      style: {
        width: '100%',
        height: '100%',
      },
    });
  },
};

export default {
  name: 'JhStatisticCard',

  components: {
    VChart,
  },

  props: {
    // 标题
    title: {
      type: String,
      default: '',
    },

    // 提示信息
    tooltip: {
      type: String,
      default: '',
    },

    // 数值
    value: {
      type: [Number, String],
      default: 0,
    },

    // 前缀
    prefix: {
      type: String,
      default: '',
    },

    // 后缀
    suffix: {
      type: String,
      default: '',
    },

    // 精度（小数位数）
    precision: {
      type: Number,
      default: 0,
    },

    // 数值颜色
    valueColor: {
      type: String,
      default: '',
    },

    // 趋势文本
    trend: {
      type: String,
      default: '',
    },

    // 趋势类型 up | down
    trendType: {
      type: String,
      default: 'up',
      validator: (value) => ['up', 'down'].includes(value),
    },

    // 描述信息
    description: {
      type: String,
      default: '',
    },

    // 底部信息
    footer: {
      type: String,
      default: '',
    },

    // 图表配置
    chartOption: {
      type: Object,
      default: null,
    },

    // 图表高度
    chartHeight: {
      type: [Number, String],
      default: 46,
    },

    // 图表宽度
    chartWidth: {
      type: [Number, String],
      default: 100,
    },

    // 是否有边框
    bordered: {
      type: Boolean,
      default: true,
    },

    // 加载状态
    loading: {
      type: Boolean,
      default: false,
    },

    // 布局方向 vertical | horizontal
    layout: {
      type: String,
      default: 'horizontal',
      validator: (value) => ['horizontal', 'vertical'].includes(value),
    },
  },

  computed: {
    // 格式化数值
    formattedValue() {
      if (typeof this.value === 'number') {
        return this.value.toFixed(this.precision);
      }
      return this.value;
    },

    // 趋势图标
    trendIcon() {
      return this.trendType === 'up' ? 'mdi-trending-up' : 'mdi-trending-down';
    },

    // 趋势颜色
    trendColor() {
      return this.trendType === 'up' ? '#52c41a' : '#f5222d';
    },

    // 是否有图表
    hasChart() {
      return (this.$slots.chart || this.chartOption) && isEChartsAvailable();
    },

    // 卡片样式类
    cardClasses() {
      return [
        'jh-statistic-card',
        {
          'jh-statistic-card--bordered': this.bordered,
          'jh-statistic-card--loading': this.loading,
          'jh-statistic-card--vertical': this.layout === 'vertical',
        },
      ];
    },

    // 卡片样式
    cardStyles() {
      return {};
    },

    // 数值样式类
    valueClasses() {
      return ['jh-statistic-card-value'];
    },

    // 数值样式
    valueStyles() {
      const styles = {};
      if (this.valueColor) {
        styles.color = this.valueColor;
      }
      return styles;
    },

    // 图表样式
    chartStyles() {
      const height = typeof this.chartHeight === 'number' 
        ? `${this.chartHeight}px` 
        : this.chartHeight;
      const width = typeof this.chartWidth === 'number' 
        ? `${this.chartWidth}px` 
        : this.chartWidth;
      
      return {
        height,
        width,
      };
    },
  },
};
</script>

<style scoped>
/* 卡片容器 */
.jh-statistic-card {
  background: #ffffff;
  border-radius: 4px;
  padding: 24px;
  position: relative;
  transition: box-shadow 0.3s;
}

.jh-statistic-card--bordered {
  border: 1px solid #e8e8e8;
}

.jh-statistic-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
}

/* 标题区域 */
.jh-statistic-card-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.jh-statistic-card-title {
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 22px;
}

.jh-statistic-card-tooltip {
  margin-left: 4px;
  color: rgba(0, 0, 0, 0.45);
}

/* 内容区域 */
.jh-statistic-card-content {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.jh-statistic-card--vertical .jh-statistic-card-content {
  flex-direction: column;
}

/* 统计数据区域 */
.jh-statistic-card-statistic {
  flex: 1;
}

/* 数值区域 */
.jh-statistic-card-value-wrapper {
  display: flex;
  align-items: baseline;
  margin-bottom: 8px;
}

.jh-statistic-card-value {
  font-size: 30px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  line-height: 38px;
}

.jh-statistic-card-prefix,
.jh-statistic-card-suffix {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.65);
  margin: 0 4px;
}

/* 趋势指标 */
.jh-statistic-card-trend {
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-bottom: 4px;
}

.jh-statistic-card-trend-icon {
  margin-right: 4px;
}

/* 描述信息 */
.jh-statistic-card-description {
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  line-height: 22px;
}

/* 图表区域 */
.jh-statistic-card-chart {
  margin-left: 16px;
  display: flex;
  align-items: center;
}

.jh-statistic-card--vertical .jh-statistic-card-chart {
  margin-left: 0;
  margin-top: 16px;
  width: 100%;
}

/* 底部区域 */
.jh-statistic-card-footer {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #e8e8e8;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
}

/* 加载状态 */
.jh-statistic-card--loading {
  opacity: 0.6;
  pointer-events: none;
}
</style>
