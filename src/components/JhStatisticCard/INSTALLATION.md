# JhStatisticCard 安装说明

## 推荐方式：CDN 引入

JhStatisticCard 组件现已支持 CDN 方式引入 ECharts，无需安装 npm 依赖。

### 1. CDN 引入（推荐）

在您的 HTML 文件中添加以下 CDN 链接：

```html
<!-- 在 head 标签中添加 -->
<script src="https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js"></script>

<!-- 或使用其他 CDN -->
<script src="https://unpkg.com/echarts@5.4.3/dist/echarts.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/5.4.3/echarts.min.js"></script>
```

**优势**:
- ✅ 无需安装 npm 依赖
- ✅ 避免版本冲突问题
- ✅ 减少打包体积
- ✅ 更快的加载速度

### 2. NPM 安装方式（备选）

如果您更喜欢 npm 方式，可以安装以下依赖：

```bash
npm install echarts@5 vue-echarts@6 --save
```

**重要说明**:
- `echarts@5`: ECharts 5.x 版本，支持 Vue 2 和 Vue 3
- `vue-echarts@6`: vue-echarts 6.x 版本，专为 Vue 2 设计

### 为什么需要特定版本？

- **vue-echarts@8.x** 只支持 Vue 3
- **vue-echarts@6.x** 支持 Vue 2.7+
- 当前项目使用 Vue 2.7.16，因此必须使用 vue-echarts@6

### 安装命令

在项目根目录执行：

```bash
npm install echarts@5 vue-echarts@6 --save
```

或使用 yarn:

```bash
yarn add echarts@5 vue-echarts@6
```

### 验证安装

安装完成后，可以在 `package.json` 中看到：

```json
{
  "dependencies": {
    "echarts": "^5.x.x",
    "vue-echarts": "^6.x.x"
  }
}
```

## 使用组件

### CDN 方式使用

1. **在 HTML 中引入 CDN**：

```html
<!DOCTYPE html>
<html>
<head>
  <!-- 引入 ECharts CDN -->
  <script src="https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js"></script>
</head>
<body>
  <div id="app">
    <!-- 您的 Vue 应用 -->
  </div>
</body>
</html>
```

2. **在 Vue 组件中使用**：

```vue
<template>
  <jh-statistic-card
    title="总销售额"
    :value="126560"
    prefix="¥"
    trend="12.5%"
    trend-type="up"
    description="周同比"
    :chart-option="chartOption"
  />
</template>

<script>
import JhStatisticCard from '@/components/JhStatisticCard/JhStatisticCard.vue';

export default {
  components: {
    JhStatisticCard,
  },
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
};
</script>
```

### NPM 方式使用

如果使用 npm 安装，组件会自动导入相关依赖：

```vue
<template>
  <jh-statistic-card
    title="总销售额"
    :value="126560"
    prefix="¥"
    trend="12.5%"
    trend-type="up"
    description="周同比"
    :chart-option="chartOption"
  />
</template>

<script>
import JhStatisticCard from '@/components/JhStatisticCard/JhStatisticCard.vue';

export default {
  components: {
    JhStatisticCard,
  },
  data() {
    return {
      chartOption: {
        // ECharts 配置
      },
    };
  },
};
</script>
```

## 故障排除

### 错误: peer vue@"^3.3.0" from vue-echarts@8.0.1

**原因**: 安装了 vue-echarts 8.x 版本，该版本只支持 Vue 3

**解决方案**:
```bash
npm uninstall vue-echarts
npm install vue-echarts@6 --save
```

### 错误: Cannot find module 'echarts/core'

**原因**: 未安装 echarts

**解决方案**:
```bash
npm install echarts@5 --save
```

### 使用 --legacy-peer-deps

如果遇到依赖冲突，可以使用：

```bash
npm install echarts@5 vue-echarts@6 --save --legacy-peer-deps
```

## 更新 package.json

手动更新 `package.json` 后运行 `npm install`:

```json
{
  "dependencies": {
    "@mdi/font": "^7.4.47",
    "vuetify": "^2.7.0",
    "echarts": "^5.5.0",
    "vue-echarts": "^6.7.3"
  }
}
```

然后执行：

```bash
npm install
```
