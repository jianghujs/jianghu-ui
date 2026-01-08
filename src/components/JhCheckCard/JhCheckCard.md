# JhCheckCard 多选卡片

多选卡片组件，参考 Ant Design ProComponents CheckCard 设计规范。支持单选、多选、不同尺寸、自定义内容等功能。

## 基础用法

```vue
<template>
  <jh-check-card
    title="基础卡片"
    description="这是一个基础的多选卡片"
    @change="handleChange"
  >
    <div>卡片内容</div>
  </jh-check-card>
</template>

<script>
export default {
  methods: {
    handleChange(checked, value) {
      console.log('选中状态:', checked, '值:', value);
    },
  },
};
</script>
```

## 多选模式

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
        { value: 'option2', title: '选项二', description: '描述二', content: '内容二' },
        { value: 'option3', title: '选项三', description: '描述三', content: '内容三' },
      ],
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
    },
  },
};
</script>
```

## 单选模式

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
      selectedValue: 'option1',
      options: [
        { value: 'option1', title: '选项一', content: '内容一' },
        { value: 'option2', title: '选项二', content: '内容二' },
        { value: 'option3', title: '选项三', content: '内容三' },
      ],
    };
  },
  methods: {
    handleSingleChange(checked, value) {
      if (checked) {
        this.selectedValue = value;
      }
    },
  },
};
</script>
```

## 带封面图片

```vue
<template>
  <jh-check-card
    title="产品名称"
    description="产品描述"
    cover="https://example.com/image.jpg"
    extra="￥299"
    @change="handleChange"
  >
    <div>产品详细信息</div>
  </jh-check-card>
</template>
```

## 自定义内容

```vue
<template>
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
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 卡片标题 | `string` | `''` |
| description | 卡片描述 | `string` | `''` |
| cover | 卡片封面图片URL | `string` | `''` |
| extra | 右下角额外内容 | `string` | `''` |
| value | 卡片值，用于多选时的标识 | `string \| number \| boolean` | `null` |
| checked | 是否选中（受控） | `boolean` | `false` |
| defaultChecked | 默认选中状态（非受控） | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |
| size | 卡片尺寸 | `'small' \| 'default' \| 'large'` | `'default'` |
| bordered | 是否显示边框 | `boolean` | `true` |
| hideCheckbox | 是否隐藏选择框 | `boolean` | `false` |
| checkboxPosition | 选择框位置 | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'top-right'` |
| hoverable | 是否可悬浮 | `boolean` | `true` |
| width | 卡片宽度 | `string \| number` | `''` |
| height | 卡片高度 | `string \| number` | `''` |
| bodyStyle | 自定义样式 | `object` | `{}` |
| headStyle | 自定义头部样式 | `object` | `{}` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 选中状态改变时触发 | `(checked: boolean, value: any) => void` |
| click | 点击卡片时触发 | `(event: Event) => void` |
| input | 兼容 v-model，选中状态改变时触发 | `(checked: boolean) => void` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| default | 默认内容 | - |
| title | 自定义标题 | - |
| description | 自定义描述 | - |
| cover | 自定义封面 | - |
| extra | 自定义额外内容 | - |

## 设计规范

### 尺寸规格

- **小尺寸 (small)**: 最小高度 80px，内边距 12px，标题字号 14px
- **默认尺寸 (default)**: 最小高度 100px，内边距 16px，标题字号 16px  
- **大尺寸 (large)**: 最小高度 120px，内边距 20px，标题字号 18px

### 状态样式

- **默认状态**: 灰色边框 `#d9d9d9`，白色背景
- **悬浮状态**: 蓝色边框 `#1890ff`，轻微阴影
- **选中状态**: 蓝色边框 `#1890ff`，蓝色阴影 `rgba(24, 144, 255, 0.2)`
- **禁用状态**: 透明度 50%，不可交互
- **加载状态**: 显示加载指示器，不可交互

### 选择框位置

选择框可以放置在卡片的四个角落：
- `top-left`: 左上角
- `top-right`: 右上角（默认）
- `bottom-left`: 左下角
- `bottom-right`: 右下角

### 响应式设计

组件支持响应式布局，在小屏幕设备上会自动调整内边距和字号：
- 屏幕宽度 ≤ 768px 时，内边距调整为 12px，标题字号调整为 14px

## 使用场景

1. **商品选择**: 电商场景中的商品多选
2. **套餐选择**: 会员套餐、服务套餐等单选场景
3. **功能选择**: 产品功能、权限等多选场景
4. **配置选择**: 系统配置项、参数设置等
5. **内容分类**: 文章分类、标签选择等

## 注意事项

1. 当使用 `checked` 属性时，组件为受控模式，需要通过 `change` 事件更新状态
2. 当不传入 `checked` 属性时，组件为非受控模式，使用内部状态管理
3. `value` 属性用于标识卡片，在多选场景中特别重要
4. 禁用和加载状态下，卡片不响应点击事件
5. 建议为每个卡片设置合适的宽度，避免内容溢出
