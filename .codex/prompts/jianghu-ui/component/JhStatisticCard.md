# JhStatisticCard - AI 快速集成指南

> 统计卡片组件，用于展示数据统计

## 🎯 核心用法

```vue
<jh-statistic-card
  title="总用户数"
  :value="1234"
  icon="mdi-account-group"
  color="primary"
  trend="up"
  :trend-value="12.5"
/>
```

## 📋 关键 Props

| Prop | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| `title` | String | 标题 | `''` |
| `value` | Number/String | 数值 | `0` |
| `icon` | String | 图标 | `''` |
| `color` | String | 颜色 | `'primary'` |
| `trend` | String | 趋势 | `''` |
| `trendValue` | Number | 趋势值 | `0` |
| `suffix` | String | 后缀 | `''` |
| `prefix` | String | 前缀 | `''` |

## ⚡ 快速模板

### 仪表盘统计
```vue
<template>
  <v-row>
    <v-col cols="12" sm="6" md="3">
      <jh-statistic-card
        title="总用户数"
        :value="statistics.totalUsers"
        icon="mdi-account-group"
        color="primary"
        trend="up"
        :trend-value="12.5"
      />
    </v-col>
    
    <v-col cols="12" sm="6" md="3">
      <jh-statistic-card
        title="活跃用户"
        :value="statistics.activeUsers"
        icon="mdi-account-check"
        color="success"
        trend="up"
        :trend-value="8.3"
      />
    </v-col>
    
    <v-col cols="12" sm="6" md="3">
      <jh-statistic-card
        title="今日订单"
        :value="statistics.todayOrders"
        icon="mdi-cart"
        color="warning"
        trend="down"
        :trend-value="3.2"
      />
    </v-col>
    
    <v-col cols="12" sm="6" md="3">
      <jh-statistic-card
        title="总收入"
        :value="statistics.totalRevenue"
        prefix="¥"
        icon="mdi-currency-cny"
        color="error"
        trend="up"
        :trend-value="15.7"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      statistics: {
        totalUsers: 1234,
        activeUsers: 567,
        todayOrders: 89,
        totalRevenue: 123456
      }
    };
  }
};
</script>
```

## 🔗 相关组件

- **JhCard**: 卡片组件
