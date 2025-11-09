# JhEditableTable 组件

基于 Ant Design EditableProTable 设计的可编辑表格组件，支持行内编辑、新增、删除等操作。

## 功能特性

### 核心功能
- ✅ **行内编辑**: 支持单行/多行同时编辑
- ✅ **多种字段类型**: text、number、select、date、switch、enum 等
- ✅ **新增行**: 支持动态添加新行
- ✅ **删除行**: 支持删除指定行
- ✅ **数据验证**: 支持字段级验证规则
- ✅ **自定义渲染**: 支持自定义单元格和操作列渲染

### EditableProTable 风格特性
- ✅ **编辑类型控制**: single（单行编辑）/ multiple（多行编辑）
- ✅ **最大行数限制**: maxRows 限制表格行数
- ✅ **操作守卫**: beforeAddRow、beforeRemoveRow 守卫函数
- ✅ **回调函数**: onSave、onDelete、onValuesChange
- ✅ **受控模式**: editableKeys 受控编辑状态
- ✅ **自定义操作**: actionRender 自定义操作列

## 基础用法

```vue
<template>
  <jh-editable-table
    v-model="dataSource"
    :columns="columns"
    :record-creator="true"
    :editable="true"
    :deletable="true"
  />
</template>

<script>
export default {
  data() {
    return {
      dataSource: [
        { id: 1, name: '张三', age: 25, status: 'active' },
        { id: 2, name: '李四', age: 30, status: 'inactive' }
      ],
      columns: [
        {
          key: 'name',
          label: '姓名',
          type: 'text',
          editable: true,
          rules: [(v) => !!v || '姓名必填']
        },
        {
          key: 'age',
          label: '年龄',
          type: 'number',
          editable: true
        },
        {
          key: 'status',
          label: '状态',
          type: 'enum',
          editable: true,
          enum: {
            active: { text: '激活', color: 'success' },
            inactive: { text: '未激活', color: 'grey' }
          }
        }
      ]
    };
  }
};
</script>
```

## 编辑模式

### 单行编辑模式
同一时间只能编辑一行，编辑新行时自动保存当前编辑行。

```vue
<jh-editable-table
  v-model="dataSource"
  :columns="columns"
  editable-type="single"
/>
```

### 多行编辑模式（默认）
可以同时编辑多行数据。

```vue
<jh-editable-table
  v-model="dataSource"
  :columns="columns"
  editable-type="multiple"
/>
```

## 字段类型

### 文本输入
```javascript
{
  key: 'name',
  label: '姓名',
  type: 'text',
  editable: true,
  placeholder: '请输入姓名',
  rules: [(v) => !!v || '必填']
}
```

### 数字输入
```javascript
{
  key: 'age',
  label: '年龄',
  type: 'number',
  editable: true,
  rules: [(v) => v >= 0 || '年龄不能为负数']
}
```

### 下拉选择
```javascript
{
  key: 'department',
  label: '部门',
  type: 'select',
  editable: true,
  options: ['技术部', '产品部', '运营部']
}
```

### 日期选择
```javascript
{
  key: 'birthday',
  label: '生日',
  type: 'date',
  editable: true
}
```

### 开关
```javascript
{
  key: 'enabled',
  label: '启用',
  type: 'switch',
  editable: true
}
```

### 枚举类型
```javascript
{
  key: 'status',
  label: '状态',
  type: 'enum',
  editable: true,
  enum: {
    pending: { text: '待处理', color: 'warning' },
    approved: { text: '已批准', color: 'success' },
    rejected: { text: '已拒绝', color: 'error' }
  }
}
```

## 高级功能

### 操作守卫
```vue
<jh-editable-table
  v-model="dataSource"
  :columns="columns"
  :before-add-row="async () => {
    const confirmed = await confirmAdd();
    return confirmed;
  }"
  :before-remove-row="async (item, index) => {
    const confirmed = await confirmDelete(item);
    return confirmed;
  }"
/>
```

### 保存和删除回调
```vue
<jh-editable-table
  v-model="dataSource"
  :columns="columns"
  :on-save="async (key, item, originRow) => {
    await saveToServer(item);
    console.log('保存成功', item);
  }"
  :on-delete="async (key, item) => {
    await deleteFromServer(key);
    console.log('删除成功', item);
  }"
  :on-values-change="(item, allData) => {
    console.log('数据变化', item, allData);
  }"
/>
```

### 受控编辑状态
```vue
<template>
  <jh-editable-table
    v-model="dataSource"
    :columns="columns"
    :editable-keys.sync="editingKeys"
  />
</template>

<script>
export default {
  data() {
    return {
      dataSource: [],
      editingKeys: ['row-1', 'row-2'] // 控制哪些行处于编辑状态
    };
  }
};
</script>
```

### 自定义操作列
```vue
<jh-editable-table
  v-model="dataSource"
  :columns="columns"
  :action-render="({ item, index, isEditing }) => {
    if (isEditing) {
      return h('div', [
        h('v-btn', { 
          props: { small: true, color: 'success' },
          on: { click: () => handleSave(item) }
        }, '保存'),
        h('v-btn', { 
          props: { small: true, color: 'error' },
          on: { click: () => handleCancel(item) }
        }, '取消')
      ]);
    }
    return h('div', [
      h('v-btn', { 
        props: { small: true },
        on: { click: () => handleEdit(item) }
      }, '编辑')
    ]);
  }"
/>
```

### 自定义单元格渲染
```vue
<jh-editable-table
  v-model="dataSource"
  :columns="columns"
>
  <template #cell.status="{ item, value }">
    <v-chip :color="getStatusColor(value)" small>
      {{ value }}
    </v-chip>
  </template>
</jh-editable-table>
```

### 最大行数限制
```vue
<jh-editable-table
  v-model="dataSource"
  :columns="columns"
  :max-rows="10"
  @max-rows="handleMaxRows"
/>
```

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value (v-model) | Array | `[]` | 表格数据 |
| columns | Array | `[]` | 列配置（必填） |
| editable | Boolean | `true` | 是否可编辑 |
| deletable | Boolean | `true` | 是否可删除 |
| recordCreator | Boolean | `true` | 是否显示新增按钮 |
| recordCreatorProps | Object | `{}` | 新增按钮配置 |
| itemsPerPage | Number | `-1` | 每页显示数量 |
| hideFooter | Boolean | `true` | 是否隐藏底部分页 |
| dense | Boolean | `false` | 紧凑模式 |
| sortable | Boolean | `false` | 是否可排序 |
| rowKey | String | `'id'` | 行唯一标识字段 |
| **editableType** | String | `'multiple'` | 编辑类型: `single` \| `multiple` |
| **maxRows** | Number | `Infinity` | 最大行数 |
| **onValuesChange** | Function | `null` | 值变化回调 |
| **beforeAddRow** | Function | `null` | 添加行前守卫 |
| **beforeRemoveRow** | Function | `null` | 删除行前守卫 |
| **actionRender** | Function | `null` | 自定义操作渲染 |
| **editableKeys** | Array | `null` | 受控模式的编辑行keys |
| **onSave** | Function | `null` | 保存数据时的回调 |
| **onDelete** | Function | `null` | 删除数据时的回调 |

### Column 配置

| 属性 | 类型 | 说明 |
|------|------|------|
| key | String | 字段键名（必填） |
| label | String | 列标题 |
| type | String | 字段类型: `text` \| `number` \| `select` \| `date` \| `switch` \| `enum` |
| editable | Boolean | 是否可编辑，默认 true |
| rules | Array | 验证规则数组 |
| options | Array | select 类型的选项 |
| enum | Object | enum 类型的映射 |
| placeholder | String | 占位符 |
| width | Number | 列宽度 |
| align | String | 对齐方式 |
| sortable | Boolean | 是否可排序 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| input | `(value: Array)` | v-model 更新事件 |
| change | `(value: Array)` | 数据变化 |
| edit | `(item: Object)` | 开始编辑行 |
| save | `(item: Object)` | 保存行 |
| cancel | `(item: Object)` | 取消编辑 |
| delete | `(item: Object, index: Number)` | 删除行 |
| add | `(item: Object)` | 添加新行 |
| validation-error | `{ item, column, message }` | 验证错误 |
| max-rows | `(max: Number)` | 达到最大行数 |
| update:editableKeys | `(keys: Array)` | 编辑状态变化（受控模式） |

### Methods

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| getData | - | `Array` | 获取当前数据 |
| setData | `(data: Array)` | `void` | 设置数据 |
| clearData | - | `void` | 清空数据 |

### Slots

| 插槽名 | 参数 | 说明 |
|--------|------|------|
| cell.{key} | `{ item, value }` | 自定义单元格渲染 |
| actions | `{ item }` | 自定义操作按钮（显示状态） |
| footer | - | 自定义底部内容 |

## 完整示例

```vue
<template>
  <div>
    <jh-editable-table
      v-model="dataSource"
      :columns="columns"
      editable-type="single"
      :max-rows="20"
      :record-creator-props="{
        creatorButtonText: '添加用户'
      }"
      :before-add-row="beforeAdd"
      :before-remove-row="beforeRemove"
      :on-save="handleSave"
      :on-delete="handleDelete"
      :on-values-change="handleValuesChange"
      @max-rows="handleMaxRows"
    >
      <!-- 自定义状态列 -->
      <template #cell.status="{ item, value }">
        <v-chip :color="getStatusColor(value)" small>
          {{ getStatusText(value) }}
        </v-chip>
      </template>
    </jh-editable-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataSource: [],
      columns: [
        {
          key: 'name',
          label: '姓名',
          type: 'text',
          editable: true,
          rules: [(v) => !!v || '姓名必填'],
          width: 150
        },
        {
          key: 'age',
          label: '年龄',
          type: 'number',
          editable: true,
          rules: [
            (v) => v >= 0 || '年龄不能为负数',
            (v) => v <= 150 || '年龄不能超过150'
          ],
          width: 100
        },
        {
          key: 'department',
          label: '部门',
          type: 'select',
          editable: true,
          options: ['技术部', '产品部', '运营部'],
          width: 150
        },
        {
          key: 'status',
          label: '状态',
          type: 'enum',
          editable: true,
          enum: {
            active: { text: '激活', color: 'success' },
            inactive: { text: '未激活', color: 'grey' },
            pending: { text: '待审核', color: 'warning' }
          },
          width: 120
        },
        {
          key: 'enabled',
          label: '启用',
          type: 'switch',
          editable: true,
          width: 100
        }
      ]
    };
  },
  methods: {
    async beforeAdd() {
      const confirmed = await this.$confirm('确定要添加新用户吗？');
      return confirmed;
    },
    async beforeRemove(item, index) {
      const confirmed = await this.$confirm(`确定要删除 ${item.name} 吗？`);
      return confirmed;
    },
    async handleSave(key, item, originRow) {
      try {
        await this.$api.saveUser(item);
        this.$message.success('保存成功');
      } catch (error) {
        this.$message.error('保存失败');
        return false; // 返回 false 阻止保存
      }
    },
    async handleDelete(key, item) {
      try {
        await this.$api.deleteUser(key);
        this.$message.success('删除成功');
      } catch (error) {
        this.$message.error('删除失败');
        return false;
      }
    },
    handleValuesChange(item, allData) {
      console.log('数据变化:', item);
      console.log('全部数据:', allData);
    },
    handleMaxRows(max) {
      this.$message.warning(`最多只能添加 ${max} 行数据`);
    },
    getStatusColor(status) {
      const colors = {
        active: 'success',
        inactive: 'grey',
        pending: 'warning'
      };
      return colors[status] || 'grey';
    },
    getStatusText(status) {
      const texts = {
        active: '激活',
        inactive: '未激活',
        pending: '待审核'
      };
      return texts[status] || status;
    }
  }
};
</script>
```

## 注意事项

1. **唯一标识**: 确保每行数据有唯一的 `rowKey` 字段
2. **验证规则**: rules 数组中的函数返回 true 表示通过，返回字符串表示错误信息
3. **异步操作**: onSave、onDelete 等回调支持异步函数，返回 false 可阻止操作
4. **性能优化**: 大数据量时建议启用分页（设置 itemsPerPage）
5. **编辑模式**: single 模式适合表单场景，multiple 模式适合批量编辑

## 相关组件

- [JhFormList](../JhFormList/README.md) - 动态表单列表组件
- [JhTable](../JhTable/README.md) - 高级表格组件
- [JhForm](../JhForm/README.md) - 表单组件
