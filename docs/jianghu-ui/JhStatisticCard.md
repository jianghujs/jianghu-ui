# JhStatisticCard 指标卡

指标卡组件，参考 Ant Design Pro StatisticCard 设计规范。用于展示统计数据、趋势和图表，适用于数据大屏、仪表盘等场景。

## 依赖安装

### 方式一：CDN 引入（推荐）

在 HTML 文件中添加 ECharts CDN 链接：

```html
<!-- 在 head 标签中添加 -->
<script src="https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js"></script>
```

**优势**：无需安装 npm 依赖，避免版本冲突，减少打包体积。

### 方式二：NPM 安装

如果更喜欢 npm 方式：

```bash
# Vue 2 项目请安装以下版本
npm install echarts@5 vue-echarts@6 --save
```

## 何时使用

- 需要展示统计数据和趋势时
- 构建数据大屏或仪表盘时
- 需要可视化关键业务指标时
- 需要对比多个指标数据时

## 基础用法

```vue
<template>
  <jh-statistic-card
    title="总销售额"
    :value="126560"
    prefix="¥"
    trend="12.5%"
    trend-type="up"
    description="周同比"
  />
</template>
```

## 带图表

```vue
<template>
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
</template>

<script>
export default {
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
};
</script>
```

## 多个指标卡组合

```vue
<template>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
    <jh-statistic-card
      title="总销售额"
      :value="126560"
      prefix="¥"
      trend="12.5%"
      trend-type="up"
      description="周同比"
      :chart-option="lineChartOption"
    />
    <jh-statistic-card
      title="访问量"
      :value="8846"
      trend="8.5%"
      trend-type="up"
      description="日同比"
      :chart-option="lineChartOption"
    />
    <jh-statistic-card
      title="支付笔数"
      :value="6560"
      trend="5.2%"
      trend-type="down"
      description="周同比"
      :chart-option="barChartOption"
    />
  </div>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 卡片标题 | `string` | - |
| tooltip | 标题提示信息 | `string` | - |
| value | 统计数值 | `number \| string` | `0` |
| prefix | 数值前缀 | `string` | - |
| suffix | 数值后缀 | `string` | - |
| precision | 数值精度（小数位数） | `number` | `0` |
| valueColor | 数值颜色 | `string` | - |
| trend | 趋势文本 | `string` | - |
| trendType | 趋势类型 | `'up' \| 'down'` | `'up'` |
| description | 描述信息 | `string` | - |
| footer | 底部信息 | `string` | - |
| chartOption | ECharts 图表配置 | `object` | - |
| chartHeight | 图表高度 | `number \| string` | `46` |
| chartWidth | 图表宽度 | `number \| string` | `100` |
| bordered | 是否显示边框 | `boolean` | `true` |
| loading | 加载状态 | `boolean` | `false` |
| layout | 布局方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |

### Slots

| 名称 | 说明 |
| --- | --- |
| title | 自定义标题 |
| value | 自定义数值 |
| trend | 自定义趋势 |
| description | 自定义描述 |
| chart | 自定义图表 |
| footer | 自定义底部 |

## 图表配置示例

### 折线图

```javascript
{
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
}
```

### 柱状图

```javascript
{
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
}
```

## 设计规范

### 尺寸规范

- **卡片内边距**: 24px
- **标题字号**: 14px
- **数值字号**: 30px
- **趋势字号**: 14px
- **描述字号**: 14px
- **图表默认高度**: 46px
- **图表默认宽度**: 100px

### 颜色规范

- **标题颜色**: `rgba(0, 0, 0, 0.65)`
- **数值颜色**: `rgba(0, 0, 0, 0.85)`
- **描述颜色**: `rgba(0, 0, 0, 0.45)`
- **上升趋势**: `#52c41a` (绿色)
- **下降趋势**: `#f5222d` (红色)
- **边框颜色**: `#e8e8e8`

### 布局规范

- **水平布局**: 数据在左，图表在右
- **垂直布局**: 数据在上，图表在下
- **卡片间距**: 建议 16px
- **响应式**: 建议使用 Grid 布局，最小宽度 280px

## 最佳实践

### 1. 数值格式化

```vue
<jh-statistic-card
  title="销售额"
  :value="126560.123"
  :precision="2"
  prefix="¥"
/>
```

### 2. 趋势展示

```vue
<jh-statistic-card
  title="访问量"
  :value="8846"
  trend="8.5%"
  trend-type="up"
  description="日同比"
/>
```

### 3. 自定义颜色

```vue
<jh-statistic-card
  title="异常订单"
  :value="234"
  value-color="#f5222d"
  trend="15.3%"
  trend-type="down"
/>
```

### 4. 响应式布局

```vue
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
  <jh-statistic-card ... />
  <jh-statistic-card ... />
  <jh-statistic-card ... />
</div>
```

### 5. 图表优化

- 使用 `grid` 配置去除图表边距
- 隐藏坐标轴 (`show: false`)
- 使用 `smooth: true` 使折线更平滑
- 使用 `symbol: 'none'` 隐藏数据点
- 使用渐变色增强视觉效果

## 注意事项

1. **依赖安装**: 使用前必须安装 `echarts@5` 和 `vue-echarts@6`
2. **性能优化**: 大量图表时建议使用懒加载或虚拟滚动
3. **数据更新**: 图表数据更新时会自动重新渲染
4. **响应式**: 图表会自动适应容器大小变化
5. **主题定制**: 可以通过 ECharts 主题定制图表样式

## 参考资料

- [Ant Design Pro StatisticCard](https://procomponents.ant.design/components/statistic-card)
- [ECharts 文档](https://echarts.apache.org/zh/index.html)
- [vue-echarts 文档](https://github.com/ecomfe/vue-echarts)
