# JhFormList 组件开发文档

## 一、组件概述

### 1.1 组件定位
JhFormList 是一个用于动态增删改查表单项列表的高级表单组件，类似于 Ant Design Pro 的 ProFormList。它允许用户在表单中维护一个可变长度的数据列表，每个列表项都是一个完整的表单项或表单组。

### 1.2 核心价值
- **动态列表管理**：支持新增、删除、排序、复制列表项
- **灵活的布局**：支持卡片、表格、行内等多种展示模式
- **嵌套表单能力**：每个列表项可包含多个字段或嵌套子列表
- **完整的验证支持**：支持列表级和项级验证
- **拖拽排序**：可选的拖拽重排功能

### 1.3 应用场景
- 用户填写多个联系人信息
- 商品订单中的多个商品项
- 项目经历/教育经历等重复性表单
- 动态配置项管理（如环境变量、路由配置等）
- 嵌套关联数据编辑

---

## 二、技术方案设计

### 2.1 技术栈
- **Vue 2.7** - 组件框架
- **Vuetify 2.x** - UI 组件库
- **JhForm** - 内部表单项渲染（复用现有组件）
- **SortableJS** - 拖拽排序功能（可选依赖）

### 2.2 组件架构

```
JhFormList (容器组件)
├── ListHeader (标题、说明、全局操作区)
├── ListBody (列表内容渲染区)
│   ├── FormListItem (单个列表项)
│   │   ├── ItemIndex (索引序号)
│   │   ├── ItemContent (表单内容)
│   │   │   ├── JhForm (复用 JhForm 组件)
│   │   │   └── 自定义插槽内容
│   │   └── ItemActions (操作按钮: 删除、复制、拖拽把手)
│   └── ... (多个 FormListItem)
└── ListFooter (添加按钮区)
```

### 2.3 数据结构设计

#### Props 数据结构
```javascript
{
  // 列表数据 (v-model)
  value: [
    { id: '1', name: '张三', phone: '13800138000' },
    { id: '2', name: '李四', phone: '13900139000' }
  ],

  // 字段配置 (复用 JhForm 的 fields 结构)
  fields: [
    { key: 'name', label: '姓名', type: 'text', required: true },
    { key: 'phone', label: '电话', type: 'text', rules: 'phone' }
  ],

  // 列表配置
  config: {
    mode: 'card',           // 渲染模式: card | table | inline
    min: 0,                 // 最小项数
    max: 10,                // 最大项数
    sortable: true,         // 是否可排序
    copyable: true,         // 是否可复制
    showIndex: true,        // 是否显示序号
    defaultValue: {},       // 新增项的默认值
    addButtonText: '添加',  // 添加按钮文本
  }
}
```

#### 内部状态数据
```javascript
{
  listData: [],              // 列表数据副本 (带 __id__ 唯一标识)
  validationErrors: {},      // 验证错误信息
  dragging: false,           // 是否正在拖拽
  expandedItems: [],         // 展开的项 (table 模式下)
}
```

---

## 三、组件 API 设计

### 3.1 Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| **value** | Array | `[]` | 列表数据，支持 v-model |
| **fields** | Array | `[]` | 字段配置数组，复用 JhForm 的 fields 结构 |
| **mode** | String | `'card'` | 渲染模式：`card` \| `table` \| `inline` |
| **title** | String | `''` | 列表标题 |
| **description** | String | `''` | 列表说明文字 |
| **min** | Number | `0` | 最小项数，删除时校验 |
| **max** | Number | `Infinity` | 最大项数，新增时校验 |
| **sortable** | Boolean | `false` | 是否启用拖拽排序 |
| **copyable** | Boolean | `true` | 是否显示复制按钮 |
| **showIndex** | Boolean | `true` | 是否显示序号 |
| **showItemActions** | Boolean | `true` | 是否显示项操作按钮 |
| **defaultValue** | Object/Function | `{}` | 新增项的默认值，可以是对象或返回对象的函数 |
| **addButtonText** | String | `'添加'` | 添加按钮文本 |
| **addButtonProps** | Object | `{}` | 添加按钮的 Vuetify props |
| **deleteConfirm** | Boolean | `false` | 删除时是否需要确认 |
| **deleteConfirmText** | String | `'确定要删除这一项吗?'` | 删除确认文本 |
| **itemLayout** | String | `'horizontal'` | 列表项内表单布局：继承 JhForm 的 layout |
| **itemLabelWidth** | Number/String | `'auto'` | 列表项标签宽度 |
| **dense** | Boolean | `true` | 紧凑模式 |
| **outlined** | Boolean | `true` | 使用边框样式 |
| **disabled** | Boolean | `false` | 禁用整个列表 |
| **readonly** | Boolean | `false` | 只读模式 |
| **rules** | Array | `[]` | 列表级验证规则 |
| **actionColumn** | Object | `{ width: 100 }` | 操作列配置 (table 模式) |
| **cardProps** | Object | `{}` | 列表项卡片的 Vuetify props (card 模式) |
| **itemClass** | String | `''` | 列表项自定义样式类 |

### 3.2 Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| **input** | `(value: Array)` | v-model 更新事件 |
| **change** | `(value: Array)` | 列表数据变化 |
| **add** | `(item: Object, index: Number)` | 添加项后触发 |
| **remove** | `(item: Object, index: Number)` | 删除项后触发 |
| **copy** | `(item: Object, newItem: Object)` | 复制项后触发 |
| **sort** | `(oldIndex: Number, newIndex: Number)` | 排序后触发 |
| **item-change** | `(index: Number, item: Object)` | 单项数据变化 |
| **validate** | `(isValid: Boolean, errors: Object)` | 验证完成 |

### 3.3 Methods

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| **addItem** | `(item?: Object, index?: Number)` | `void` | 添加一项 |
| **removeItem** | `(index: Number)` | `void` | 删除指定项 |
| **copyItem** | `(index: Number)` | `void` | 复制指定项 |
| **moveItem** | `(oldIndex: Number, newIndex: Number)` | `void` | 移动项位置 |
| **getItems** | - | `Array` | 获取列表数据 |
| **setItems** | `(items: Array)` | `void` | 设置列表数据 |
| **getItemValue** | `(index: Number)` | `Object` | 获取指定项数据 |
| **setItemValue** | `(index: Number, value: Object)` | `void` | 设置指定项数据 |
| **validate** | - | `Promise<Boolean>` | 验证整个列表 |
| **validateItem** | `(index: Number)` | `Promise<Boolean>` | 验证指定项 |
| **resetValidation** | - | `void` | 重置验证状态 |
| **reset** | - | `void` | 重置列表为初始值 |

### 3.4 Slots

| 插槽名 | 参数 | 说明 |
|--------|------|------|
| **header** | - | 自定义列表头部 |
| **item** | `{ item, index, fields, updateItem }` | 自定义列表项内容 |
| **item-actions** | `{ item, index, removeItem, copyItem }` | 自定义列表项操作区 |
| **footer** | `{ addItem, canAdd }` | 自定义列表底部 |
| **empty** | - | 空列表占位内容 |
| **field-{key}** | `{ item, index, field, updateItem }` | 自定义指定字段渲染 |

---

## 四、渲染模式设计

### 4.1 Card 模式 (默认)
**适用场景**：字段较多、结构复杂的表单项

**视觉特征**：
- 每项用 `v-card` 包裹，带边框和阴影
- 顶部显示序号和操作按钮
- 表单字段垂直或水平排列

**布局示例**：
```
┌─────────────────────────────────────┐
│ [#1] 联系人信息        [复制] [删除] │
├─────────────────────────────────────┤
│  姓名: [_____________]              │
│  电话: [_____________]              │
│  邮箱: [_____________]              │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ [#2] 联系人信息        [复制] [删除] │
├─────────────────────────────────────┤
│  姓名: [_____________]              │
│  ...                                │
└─────────────────────────────────────┘
         [+ 添加联系人]
```

### 4.2 Table 模式
**适用场景**：字段较少、结构简单、需要对比数据

**视觉特征**：
- 使用 `v-data-table` 组件
- 表头为字段标签
- 每行一个列表项
- 最后一列为操作列

**布局示例**：
```
┌───┬──────────┬──────────────┬──────────────┬────────┐
│ # │ 姓名     │ 电话         │ 邮箱         │ 操作   │
├───┼──────────┼──────────────┼──────────────┼────────┤
│ 1 │ 张三     │ 13800138000  │ zhang@xx.com │ [删除] │
│ 2 │ 李四     │ 13900139000  │ li@xx.com    │ [删除] │
└───┴──────────┴──────────────┴──────────────┴────────┘
                  [+ 添加行]
```

### 4.3 Inline 模式
**适用场景**：单字段或极简场景（如标签列表、关键词列表）

**视觉特征**：
- 每项在同一行内显示
- 紧凑排列，使用 chips 或小型输入框
- 操作按钮紧贴在项旁边

**布局示例**：
```
标签列表:
  [Vue.js ×] [React ×] [Angular ×] [+ 添加]
```

---

## 五、核心功能实现细节

### 5.1 唯一 ID 生成策略
为每个列表项生成内部唯一标识，用于 Vue 的 `:key` 绑定和项追踪：

```javascript
generateItemId() {
  return `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// 初始化列表数据时添加 __id__
initListData() {
  this.listData = this.value.map(item => ({
    ...item,
    __id__: item.__id__ || this.generateItemId(),
  }));
}
```

### 5.2 新增操作
```javascript
addItem(item = null, index = null) {
  // 检查最大数量限制
  if (this.listData.length >= this.max) {
    this.$emit('max-limit', this.max);
    return;
  }

  // 获取默认值
  const defaultValue = typeof this.defaultValue === 'function'
    ? this.defaultValue(this.listData.length)
    : { ...this.defaultValue };

  // 创建新项
  const newItem = {
    ...defaultValue,
    ...item,
    __id__: this.generateItemId(),
  };

  // 插入列表
  if (index !== null) {
    this.listData.splice(index, 0, newItem);
  } else {
    this.listData.push(newItem);
  }

  // 触发事件
  this.$emit('input', this.getCleanData());
  this.$emit('add', newItem, index ?? this.listData.length - 1);
}
```

### 5.3 删除操作
```javascript
async removeItem(index) {
  // 检查最小数量限制
  if (this.listData.length <= this.min) {
    this.$emit('min-limit', this.min);
    return;
  }

  // 确认弹窗
  if (this.deleteConfirm) {
    const confirmed = await this.$refs.confirmDialog.open({
      title: '确认删除',
      content: this.deleteConfirmText,
    });
    if (!confirmed) return;
  }

  const removedItem = this.listData[index];
  this.listData.splice(index, 1);

  this.$emit('input', this.getCleanData());
  this.$emit('remove', removedItem, index);
}
```

### 5.4 复制操作
```javascript
copyItem(index) {
  const sourceItem = this.listData[index];
  const newItem = {
    ...sourceItem,
    __id__: this.generateItemId(),
  };

  // 在源项后面插入
  this.listData.splice(index + 1, 0, newItem);

  this.$emit('input', this.getCleanData());
  this.$emit('copy', sourceItem, newItem);
}
```

### 5.5 拖拽排序
使用 `SortableJS` 实现：

```javascript
import Sortable from 'sortablejs';

mounted() {
  if (this.sortable) {
    this.initSortable();
  }
},

methods: {
  initSortable() {
    const container = this.$refs.listBody;
    this.sortableInstance = Sortable.create(container, {
      animation: 150,
      handle: '.jh-form-list-drag-handle',
      ghostClass: 'jh-form-list-ghost',
      onEnd: (evt) => {
        const { oldIndex, newIndex } = evt;
        this.moveItem(oldIndex, newIndex);
      },
    });
  },

  moveItem(oldIndex, newIndex) {
    const item = this.listData.splice(oldIndex, 1)[0];
    this.listData.splice(newIndex, 0, item);

    this.$emit('input', this.getCleanData());
    this.$emit('sort', oldIndex, newIndex);
  },
}
```

### 5.6 验证机制
支持两级验证：
1. **列表级验证**：通过 `rules` prop 定义
2. **项级验证**：通过 `fields` 中的验证规则

```javascript
async validate() {
  const errors = {};
  let isValid = true;

  // 1. 验证列表规则 (如最小数量)
  if (this.rules && this.rules.length) {
    for (const rule of this.rules) {
      const result = rule(this.listData);
      if (typeof result === 'string') {
        errors._list = result;
        isValid = false;
        break;
      }
    }
  }

  // 2. 验证每个项
  for (let i = 0; i < this.listData.length; i++) {
    const itemValid = await this.validateItem(i);
    if (!itemValid) {
      isValid = false;
      errors[i] = true;
    }
  }

  this.validationErrors = errors;
  this.$emit('validate', isValid, errors);
  return isValid;
},

async validateItem(index) {
  const formRef = this.$refs[`itemForm_${index}`];
  if (formRef && formRef[0]) {
    return await formRef[0].validate();
  }
  return true;
}
```

---

## 六、样式设计规范

### 6.1 样式变量
```scss
// 间距
$jh-form-list-item-margin: 16px;
$jh-form-list-card-padding: 16px;

// 颜色
$jh-form-list-border-color: rgba(0, 0, 0, 0.12);
$jh-form-list-hover-bg: rgba(0, 0, 0, 0.02);
$jh-form-list-error-color: #f44336;

// 拖拽
$jh-form-list-ghost-opacity: 0.5;
```

### 6.2 关键样式类
```scss
.jh-form-list {
  width: 100%;
}

.jh-form-list-header {
  margin-bottom: 16px;
}

.jh-form-list-body {
  position: relative;
}

.jh-form-list-item {
  position: relative;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }

  &--card {
    // 卡片模式样式
  }

  &--dragging {
    cursor: move;
  }

  &--error {
    border-color: $jh-form-list-error-color;
  }
}

.jh-form-list-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
}

.jh-form-list-item-index {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.6);
}

.jh-form-list-item-actions {
  display: flex;
  gap: 8px;
}

.jh-form-list-drag-handle {
  cursor: move;
  color: rgba(0, 0, 0, 0.4);

  &:hover {
    color: rgba(0, 0, 0, 0.6);
  }
}

.jh-form-list-ghost {
  opacity: $jh-form-list-ghost-opacity;
}

.jh-form-list-footer {
  margin-top: 16px;
  text-align: center;
}

.jh-form-list-empty {
  padding: 40px;
  text-align: center;
  color: rgba(0, 0, 0, 0.4);
}
```

---

## 七、使用示例

### 7.1 基础使用
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
        { key: 'phone', label: '电话', type: 'text', rules: 'phone', cols: 4 },
        { key: 'email', label: '邮箱', type: 'text', rules: 'email', cols: 4 },
      ],
    };
  },
};
</script>
```

### 7.2 Table 模式
```vue
<jh-form-list
  v-model="items"
  :fields="fields"
  mode="table"
  :sortable="true"
  :show-index="true"
/>
```

### 7.3 自定义渲染
```vue
<jh-form-list v-model="tags" mode="inline">
  <template #item="{ item, index, updateItem }">
    <v-chip
      closable
      @click:close="removeItem(index)"
    >
      {{ item.name }}
    </v-chip>
  </template>
</jh-form-list>
```

### 7.4 嵌套列表
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

### 7.5 高级验证
```vue
<jh-form-list
  v-model="list"
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
```

---

## 八、性能优化策略

### 8.1 大列表优化
- 使用虚拟滚动（集成 `vue-virtual-scroller`）
- 懒加载验证（仅验证可见项）
- 防抖输入事件

### 8.2 渲染优化
- 使用 `v-show` 替代 `v-if`（在 tab/collapse 场景）
- 计算属性缓存复杂计算
- 避免深度 watch

### 8.3 内存优化
- 组件销毁时清理 Sortable 实例
- 及时移除事件监听器

---

## 九、兼容性与依赖

### 9.1 浏览器兼容性
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### 9.2 依赖清单
| 依赖 | 版本 | 必需 | 说明 |
|------|------|------|------|
| Vue | 2.7.x | ✅ | 核心框架 |
| Vuetify | 2.x | ✅ | UI 组件库 |
| SortableJS | 1.15.x | ❌ | 拖拽排序（sortable=true 时需要） |

---

## 十、开发计划

### 阶段一：核心功能 (预计 2 天)
- [x] 组件基础结构搭建
- [x] Card 模式实现
- [x] 增删操作
- [x] 数据绑定 (v-model)
- [x] 基础验证

### 阶段二：高级功能 (预计 1.5 天)
- [ ] Table 模式实现
- [ ] Inline 模式实现
- [ ] 复制功能
- [ ] 拖拽排序
- [ ] 完整验证机制

### 阶段三：优化与文档 (预计 1 天)
- [ ] 插槽系统
- [ ] 样式优化
- [ ] Storybook 示例
- [ ] API 文档完善

### 阶段四：测试与发布 (预计 0.5 天)
- [ ] 单元测试
- [ ] 集成测试
- [ ] 浏览器兼容性测试
- [ ] 性能测试

**总计时间**: 约 5 个工作日

---

## 十一、注意事项与风险

### 11.1 技术风险
- **SortableJS 集成复杂度**：需要处理拖拽与 Vue 响应式的冲突
- **验证性能问题**：大列表时验证可能阻塞 UI
- **嵌套列表数据同步**：深层嵌套时数据更新可能出现问题

### 11.2 用户体验风险
- **删除误操作**：需要明确的确认机制
- **大列表性能**：100+ 项时可能卡顿
- **移动端体验**：拖拽在触摸设备上体验较差

### 11.3 解决方案
- 提供 `deleteConfirm` 强制确认
- 虚拟滚动 + 分页加载
- 移动端提供上下移动按钮替代拖拽

---

## 十二、未来扩展方向

1. **协同编辑模式**：多人同时编辑同一列表
2. **历史记录/撤销重做**：操作历史栈
3. **模板功能**：保存和应用列表模板
4. **批量操作**：批量删除、批量编辑
5. **导入导出**：JSON/CSV 数据导入导出
6. **AI 辅助**：智能填充、数据验证建议

---

## 十三、参考资料

- [Ant Design ProFormList](https://procomponents.ant.design/components/group#proformlist)
- [Vuetify Data Table](https://v2.vuetifyjs.com/en/components/data-tables/)
- [SortableJS 文档](https://github.com/SortableJS/Sortable)
- [JhForm 组件源码](../src/components/JhForm/JhForm.vue)

---

## 附录 A：完整 API 速查表

```typescript
// Props
interface JhFormListProps {
  value: Array<any>;                    // v-model 列表数据
  fields: Array<FieldConfig>;           // 字段配置
  mode?: 'card' | 'table' | 'inline';  // 渲染模式
  title?: string;                       // 标题
  min?: number;                         // 最小项数
  max?: number;                         // 最大项数
  sortable?: boolean;                   // 可排序
  copyable?: boolean;                   // 可复制
  defaultValue?: any;                   // 新增项默认值
  // ... 其他属性见 3.1 节
}

// Events
interface JhFormListEvents {
  input: (value: Array<any>) => void;
  add: (item: any, index: number) => void;
  remove: (item: any, index: number) => void;
  // ... 其他事件见 3.2 节
}

// Methods
interface JhFormListMethods {
  addItem(item?: any, index?: number): void;
  removeItem(index: number): void;
  validate(): Promise<boolean>;
  // ... 其他方法见 3.3 节
}
```

---

**文档版本**: v1.0
**最后更新**: 2025-11-02
**作者**: JianghuJS Team
**审核状态**: 待审核 ⏳
