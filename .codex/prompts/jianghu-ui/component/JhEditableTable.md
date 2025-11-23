# JhEditableTable - AI 快速集成指南

> 可编辑表格组件，支持行内编辑

## 🎯 核心用法

```vue
<jh-editable-table
  :headers="headers"
  :items="items"
  @save="handleSave"
/>

<script>
export default {
  data() {
    return {
      headers: [
        { text: '商品名称', value: 'name', editable: true },
        { text: '数量', value: 'quantity', editable: true, type: 'number' },
        { text: '单价', value: 'price', editable: true, type: 'number' }
      ],
      items: [
        { id: 1, name: '商品A', quantity: 10, price: 100 },
        { id: 2, name: '商品B', quantity: 20, price: 200 }
      ]
    };
  },
  methods: {
    handleSave(row) {
      console.log('保存:', row);
    }
  }
};
</script>
```

## 📋 关键 Props

| Prop | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| `headers` | Array | 表头配置 | `[]` |
| `items` | Array | 数据 | `[]` |
| `editable` | Boolean | 是否可编辑 | `true` |

## 📡 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| `save` | 保存行 | `(row)` |
| `delete` | 删除行 | `(row)` |

## 🔗 相关组件

- **JhTable**: 表格组件
- **JhFormList**: 动态表单列表
