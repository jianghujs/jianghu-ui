# JhCheckCard - AI 快速集成指南

> 多选卡片组件，参考 Ant Design ProComponents CheckCard 设计

## 🎯 核心用法

### 基础卡片
```vue
<jh-check-card
  title="基础卡片"
  description="这是一个基础的多选卡片"
  @change="handleChange"
>
  <div>卡片内容</div>
</jh-check-card>
```

## 📋 关键 Props

| Prop | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| `title` | String | 卡片标题 | `''` |
| `description` | String | 卡片描述 | `''` |
| `cover` | String | 封面图片URL | `''` |
| `extra` | String | 右下角额外内容 | `''` |
| `value` | Any | 卡片值 | `null` |
| `checked` | Boolean | 是否选中（受控） | `false` |
| `disabled` | Boolean | 是否禁用 | `false` |
| `loading` | Boolean | 是否加载中 | `false` |
| `size` | String | 尺寸 | `'default'` |
| `checkboxPosition` | String | 选择框位置 | `'top-right'` |
| `hoverable` | Boolean | 可悬浮 | `true` |

## 🔧 常用功能

### 1. 多选模式
```vue
<template>
  <div>
    <jh-check-card
      v-for="option in options"
      :key="option.value"
      :title="option.title"
      :description="option.description"
      :value="option.value"
      :checked="selectedValues.includes(option.value)"
      @change="handleMultipleChange"
    >
      {{ option.content }}
    </jh-check-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedValues: ['option1'],
      options: [
        { value: 'option1', title: '选项一', description: '描述一', content: '内容一' },
        { value: 'option2', title: '选项二', description: '描述二', content: '内容二' }
      ]
    };
  },
  methods: {
    handleMultipleChange(checked, value) {
      if (checked) {
        if (!this.selectedValues.includes(value)) {
          this.selectedValues.push(value);
        }
      } else {
        const index = this.selectedValues.indexOf(value);
        if (index > -1) {
          this.selectedValues.splice(index, 1);
        }
      }
    }
  }
};
</script>
```

### 2. 单选模式
```vue
<template>
  <div>
    <jh-check-card
      v-for="option in options"
      :key="option.value"
      :title="option.title"
      :value="option.value"
      :checked="selectedValue === option.value"
      @change="handleSingleChange"
    >
      {{ option.content }}
    </jh-check-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedValue: 'option1'
    };
  },
  methods: {
    handleSingleChange(checked, value) {
      if (checked) {
        this.selectedValue = value;
      }
    }
  }
};
</script>
```

### 3. 带封面图片
```vue
<jh-check-card
  title="产品名称"
  description="产品描述"
  cover="https://example.com/image.jpg"
  extra="￥299"
  @change="handleChange"
>
  <div>产品详细信息</div>
</jh-check-card>
```

### 4. 不同尺寸
```vue
<!-- 小尺寸 -->
<jh-check-card title="小尺寸" size="small" />

<!-- 默认尺寸 -->
<jh-check-card title="默认尺寸" size="default" />

<!-- 大尺寸 -->
<jh-check-card title="大尺寸" size="large" />
```

### 5. 选择框位置
```vue
<!-- 右上角（默认） -->
<jh-check-card checkbox-position="top-right" />

<!-- 左上角 -->
<jh-check-card checkbox-position="top-left" />

<!-- 右下角 -->
<jh-check-card checkbox-position="bottom-right" />

<!-- 左下角 -->
<jh-check-card checkbox-position="bottom-left" />
```

### 6. 自定义内容
```vue
<jh-check-card @change="handleChange">
  <template #title>
    <div style="display: flex; align-items: center;">
      <v-icon color="primary" class="mr-2">mdi-rocket</v-icon>
      自定义标题
    </div>
  </template>
  
  <template #description>
    <div style="color: #52c41a;">自定义描述样式</div>
  </template>
  
  <div style="text-align: center; padding: 20px;">
    <div style="font-size: 32px; margin-bottom: 8px;">⚡</div>
    <div>自定义内容区域</div>
  </div>
</jh-check-card>
```

## 📡 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| `change` | 选中状态改变 | `(checked: boolean, value: any)` |
| `click` | 点击卡片 | `(event: Event)` |

## 🎨 插槽

| 插槽名 | 说明 |
|--------|------|
| `default` | 默认内容 |
| `title` | 自定义标题 |
| `description` | 自定义描述 |
| `cover` | 自定义封面 |
| `extra` | 自定义额外内容 |

## ⚡ 快速模板

### 商品选择
```vue
<template>
  <v-row>
    <v-col
      v-for="product in products"
      :key="product.id"
      cols="12"
      sm="6"
      md="4"
    >
      <jh-check-card
        :title="product.name"
        :description="product.description"
        :cover="product.image"
        :extra="`￥${product.price}`"
        :value="product.id"
        :checked="selectedProducts.includes(product.id)"
        @change="handleProductSelect"
      >
        <div class="pa-2">
          <div>库存: {{ product.stock }}</div>
          <div>销量: {{ product.sales }}</div>
        </div>
      </jh-check-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      selectedProducts: [],
      products: [
        {
          id: 1,
          name: 'iPhone 15 Pro',
          description: '最新款苹果手机',
          image: 'https://example.com/iphone.jpg',
          price: 7999,
          stock: 100,
          sales: 1234
        }
        // ...
      ]
    };
  },
  methods: {
    handleProductSelect(checked, productId) {
      if (checked) {
        this.selectedProducts.push(productId);
      } else {
        const index = this.selectedProducts.indexOf(productId);
        if (index > -1) {
          this.selectedProducts.splice(index, 1);
        }
      }
    }
  }
};
</script>
```

### 套餐选择（单选）
```vue
<template>
  <v-row>
    <v-col
      v-for="plan in plans"
      :key="plan.id"
      cols="12"
      md="4"
    >
      <jh-check-card
        :title="plan.name"
        :description="plan.description"
        :value="plan.id"
        :checked="selectedPlan === plan.id"
        size="large"
        @change="handlePlanSelect"
      >
        <div class="text-center pa-4">
          <div class="text-h3 primary--text mb-2">￥{{ plan.price }}</div>
          <div class="text-caption grey--text mb-4">{{ plan.period }}</div>
          <v-divider class="mb-4" />
          <div v-for="feature in plan.features" :key="feature" class="mb-2">
            <v-icon small color="success" class="mr-2">mdi-check</v-icon>
            {{ feature }}
          </div>
        </div>
      </jh-check-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      selectedPlan: 2,
      plans: [
        {
          id: 1,
          name: '基础版',
          description: '适合个人用户',
          price: 99,
          period: '每月',
          features: ['功能A', '功能B', '功能C']
        },
        {
          id: 2,
          name: '专业版',
          description: '适合小团队',
          price: 299,
          period: '每月',
          features: ['功能A', '功能B', '功能C', '功能D']
        }
      ]
    };
  },
  methods: {
    handlePlanSelect(checked, planId) {
      if (checked) {
        this.selectedPlan = planId;
      }
    }
  }
};
</script>
```

## ⚠️ 注意事项

1. **受控模式：使用 `checked` 属性时，需要通过 `change` 事件更新状态**
2. **非受控模式：不传 `checked` 属性，组件内部管理状态**
3. **`value` 属性用于标识卡片，在多选场景中特别重要**
4. **禁用和加载状态下，卡片不响应点击事件**
5. **建议为每个卡片设置合适的宽度，避免内容溢出**

## 🔗 相关组件

- **JhCard**: 基础卡片组件
- **JhForm**: 表单组件（可配合使用）
