# JhFormList 组件

基于 Ant Design ProFormList 设计的动态表单列表组件，支持动态增删改查表单项列表。

## 功能特性

### 核心功能
- ✅ **多种渲染模式**: Card、Table、Inline 三种展示模式
- ✅ **动态列表管理**: 支持新增、删除、排序、复制列表项
- ✅ **拖拽排序**: 可选的拖拽重排功能（需引入 SortableJS）
- ✅ **完整验证支持**: 列表级和项级验证
- ✅ **嵌套表单能力**: 每个列表项可包含多个字段或嵌套子列表

### ProFormList 风格特性
- ✅ **可折叠卡片**: 支持折叠/展开列表项（Card 模式）
- ✅ **操作守卫**: 添加/删除前的确认机制
- ✅ **创建按钮配置**: 灵活的按钮配置（creatorButtonProps）
- ✅ **自定义操作渲染**: actionRender 自定义操作按钮
- ✅ **数量限制提示**: 自动显示最大/最小数量限制提示
- ✅ **删除后回调**: onAfterRemove 回调支持

## 基础用法

```vue
<template>
  <jh-form-list
    v-model="contacts"
    :fields="contactFields"
    title="联系人列表"
    description="请填写至少一位联系人信息"
    :min="1"
    :max="5"
  />
</template>

<script>
export default {
  data() {
    return {
      contacts: [
        { name: '张三', phone: '13800138000', email: 'zhang@example.com' }
      ],
      contactFields: [
        { key: 'name', label: '姓名', type: 'text', required: true, cols: 4 },
        { key: 'phone', label: '电话', type: 'text', cols: 4 },
        { key: 'email', label: '邮箱', type: 'text', cols: 4 },
      ],
    };
  },
};
</script>
```

## 渲染模式

### Card 模式（默认）
适用于字段较多、结构复杂的表单项。

```vue
<jh-form-list
  v-model="items"
  :fields="fields"
  mode="card"
  :collapsible="true"
  :default-collapsed="false"
/>
```

### Table 模式
适用于字段较少、需要对比数据的场景。

```vue
<jh-form-list
  v-model="items"
  :fields="fields"
  mode="table"
  :sortable="true"
  :show-index="true"
/>
```

### Inline 模式
适用于单字段或极简场景（如标签列表）。

```vue
<jh-form-list
  v-model="tags"
  :fields="[{ key: 'name', label: '标签' }]"
  mode="inline"
  :inline-display-key="name"
/>
```

## 高级功能

### 操作守卫
```vue
<jh-form-list
  v-model="items"
  :fields="fields"
  :action-guard="{
    beforeAddRow: async (count) => {
      return await confirmAdd();
    },
    beforeRemoveRow: async (index, item) => {
      return await confirmDelete(item);
    }
  }"
  :on-after-remove="handleAfterRemove"
/>
```

### 自定义创建按钮
```vue
<jh-form-list
  v-model="items"
  :fields="fields"
  :creator-button-props="{
    color: 'success',
    text: '新增一行',
    outlined: false,
    large: true
  }"
  :creator-record="(index) => ({
    id: Date.now(),
    name: `项目${index + 1}`
  })"
/>
```

### 自定义操作按钮
```vue
<jh-form-list
  v-model="items"
  :fields="fields"
  :action-render="({ item, index, removeItem, copyItem }) => {
    return h('div', [
      h('v-btn', { 
        props: { icon: true, small: true },
        on: { click: () => copyItem() }
      }, [h('v-icon', 'mdi-content-copy')]),
      h('v-btn', { 
        props: { icon: true, small: true, color: 'error' },
        on: { click: () => removeItem() }
      }, [h('v-icon', 'mdi-delete')])
    ]);
  }"
/>
```

### 嵌套列表
```vue
<jh-form-list v-model="orders" :fields="orderFields">
  <template #field-items="{ item, index, updateItem }">
    <jh-form-list
      :value="item.items"
      :fields="itemFields"
      @input="updateItem('items', $event)"
      mode="table"
    />
  </template>
</jh-form-list>
```

### 列表验证
```vue
<jh-form-list
  ref="formList"
  v-model="items"
  :fields="fields"
  :rules="[
    (items) => items.length >= 2 || '至少需要两项',
    (items) => {
      const names = items.map(i => i.name);
      const unique = new Set(names);
      return names.length === unique.size || '姓名不能重复';
    }
  ]"
/>

<script>
methods: {
  async validate() {
    const isValid = await this.$refs.formList.validate();
    if (isValid) {
      // 提交数据
    }
  }
}
</script>
```

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value (v-model) | Array | `[]` | 列表数据 |
| fields | Array | `[]` | 字段配置数组 |
| mode | String | `'card'` | 渲染模式: `card` \| `table` \| `inline` |
| title | String | `''` | 列表标题 |
| description | String | `''` | 列表说明文字 |
| min | Number | `0` | 最小项数 |
| max | Number | `Infinity` | 最大项数 |
| sortable | Boolean | `false` | 是否启用拖拽排序 |
| copyable | Boolean | `true` | 是否显示复制按钮 |
| showIndex | Boolean | `true` | 是否显示序号 |
| showItemActions | Boolean | `true` | 是否显示项操作按钮 |
| defaultValue | Object/Function | `{}` | 新增项的默认值 |
| addButtonText | String | `'添加'` | 添加按钮文本 |
| addButtonProps | Object | `{}` | 添加按钮的 props |
| deleteConfirm | Boolean | `false` | 删除时是否需要确认 |
| deleteConfirmText | String | `'确定要删除这一项吗?'` | 删除确认文本 |
| itemLayout | String | `'horizontal'` | 列表项内表单布局 |
| itemLabelWidth | Number/String | `'auto'` | 列表项标签宽度 |
| dense | Boolean | `true` | 紧凑模式 |
| outlined | Boolean | `true` | 使用边框样式 |
| disabled | Boolean | `false` | 禁用整个列表 |
| readonly | Boolean | `false` | 只读模式 |
| rules | Array | `[]` | 列表级验证规则 |
| **alwaysShowItemLabel** | Boolean | `true` | 始终显示项标签 |
| **collapsible** | Boolean | `false` | 卡片是否可折叠 |
| **defaultCollapsed** | Boolean | `false` | 默认折叠状态 |
| **creatorButtonProps** | Object/Boolean | `{}` | 创建按钮配置，false 时隐藏 |
| **creatorRecord** | Object/Function | `null` | 创建记录的初始值 |
| **actionGuard** | Object | `{}` | 操作守卫配置 |
| **onAfterRemove** | Function | `null` | 删除后回调 |
| **actionRender** | Function | `null` | 自定义操作按钮渲染 |
| **maxLimitText** | String | `'已达到最大数量限制'` | 最大数量提示文本 |
| **minLimitText** | String | `'已达到最小数量限制'` | 最小数量提示文本 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| input | `(value: Array)` | v-model 更新事件 |
| change | `(value: Array)` | 列表数据变化 |
| add | `(item: Object, index: Number)` | 添加项后触发 |
| remove | `(item: Object, index: Number)` | 删除项后触发 |
| copy | `(item: Object, newItem: Object)` | 复制项后触发 |
| sort | `(oldIndex: Number, newIndex: Number)` | 排序后触发 |
| item-change | `(index: Number, item: Object)` | 单项数据变化 |
| validate | `(isValid: Boolean, errors: Object)` | 验证完成 |
| max-limit | `(max: Number)` | 达到最大数量限制 |
| min-limit | `(min: Number)` | 达到最小数量限制 |

### Methods

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| addItem | `(item?: Object, index?: Number)` | `void` | 添加一项 |
| removeItem | `(index: Number)` | `void` | 删除指定项 |
| copyItem | `(index: Number)` | `void` | 复制指定项 |
| moveItem | `(oldIndex: Number, newIndex: Number)` | `void` | 移动项位置 |
| getItems | - | `Array` | 获取列表数据 |
| setItems | `(items: Array)` | `void` | 设置列表数据 |
| getItemValue | `(index: Number)` | `Object` | 获取指定项数据 |
| setItemValue | `(index: Number, value: Object)` | `void` | 设置指定项数据 |
| validate | - | `Promise<Boolean>` | 验证整个列表 |
| validateItem | `(index: Number)` | `Promise<Boolean>` | 验证指定项 |
| resetValidation | - | `void` | 重置验证状态 |
| reset | - | `void` | 重置列表为初始值 |

### Slots

| 插槽名 | 参数 | 说明 |
|--------|------|------|
| header | - | 自定义列表头部 |
| item | `{ item, index, fields, updateItem }` | 自定义列表项内容 |
| item-actions | `{ item, index, removeItem, copyItem }` | 自定义列表项操作区 |
| footer | `{ addItem, canAdd }` | 自定义列表底部 |
| empty | - | 空列表占位内容 |
| field-{key} | `{ item, index, field, updateItem }` | 自定义指定字段渲染 |

## 样式定制

```scss
// 自定义样式
.jh-form-list {
  --jh-form-list-item-margin: 16px;
  --jh-form-list-card-padding: 16px;
}

// 自定义卡片样式
.jh-form-list-item--card {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

## 注意事项

1. **拖拽排序**: 需要全局引入 SortableJS 库
2. **性能优化**: 大列表（100+ 项）建议使用 Table 模式
3. **嵌套列表**: 注意数据同步，使用 updateItem 方法更新
4. **验证规则**: 列表级规则和项级规则可以同时使用

## 相关组件

- [JhForm](../JhForm/JhForm.md) - 表单组件
- [JhFormFields](../JhFormFields/JhFormFields.md) - 表单字段组件
- [JhEditableTable](../JhEditableTable/JhEditableTable.md) - 可编辑表格组件
