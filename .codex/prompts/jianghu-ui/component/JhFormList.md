# JhFormList - AI 快速集成指南

> 动态表单列表组件，用于处理数组类型的表单字段

## 🎯 核心用法

```vue
<jh-form-list
  v-model="items"
  :fields="fields"
  add-text="添加商品"
  @add="handleAdd"
  @remove="handleRemove"
/>

<script>
export default {
  data() {
    return {
      items: [
        { productName: '', quantity: 1, price: 0 }
      ],
      fields: [
        { key: 'productName', label: '商品名称', type: 'text', required: true },
        { key: 'quantity', label: '数量', type: 'number', required: true },
        { key: 'price', label: '单价', type: 'number', required: true }
      ]
    };
  }
};
</script>
```

## 📋 关键 Props

| Prop | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| `value` / `v-model` | Array | 列表数据 | `[]` |
| `fields` | Array | 字段配置 | `[]` |
| `addText` | String | 添加按钮文本 | `'添加'` |
| `max` | Number | 最大数量 | `Infinity` |
| `min` | Number | 最小数量 | `0` |
| `showIndex` | Boolean | 显示序号 | `true` |

## ⚡ 快速模板

### 订单明细
```vue
<template>
  <jh-form
    :fields="formFields"
    :initial-data="formData"
    @submit="handleSubmit"
  >
    <template #field-items="{ formData, updateField }">
      <jh-form-list
        :value="formData.items"
        :fields="itemFields"
        add-text="添加商品"
        @input="updateField('items', $event)"
      />
    </template>
    
    <template #actions="{ validate }">
      <v-btn color="primary" @click="validate">提交订单</v-btn>
    </template>
  </jh-form>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        customerName: '',
        items: [
          { productName: '', quantity: 1, price: 0 }
        ]
      },
      formFields: [
        { key: 'customerName', label: '客户名称', type: 'text', required: true },
        { key: 'items', label: '订单明细', type: 'slot' }
      ],
      itemFields: [
        { key: 'productName', label: '商品', type: 'text', required: true },
        { key: 'quantity', label: '数量', type: 'number', required: true },
        { key: 'price', label: '单价', type: 'number', required: true }
      ]
    };
  },
  methods: {
    handleSubmit(data) {
      console.log('提交:', data);
    }
  }
};
</script>
```

## ⚠️ 注意事项

1. **通常配合 JhForm 的 slot 类型字段使用**
2. **使用 `v-model` 或 `@input` 事件更新数据**
3. **`fields` 配置与 JhForm 字段配置一致**

## 🔗 相关组件

- **JhForm**: 表单组件
- **JhEditableTable**: 可编辑表格
