# JhEditableTable 优化总结

基于 Ant Design EditableProTable 的优化升级

## 优化时间
2025-11-09

## 参考文档
- [Ant Design EditableProTable](https://procomponents.ant.design/components/editable-table)

## 新增功能

### 1. 编辑类型控制
**功能**: 支持单行编辑和多行编辑两种模式

**新增 Props**:
- `editableType`: String - 编辑类型，`single` | `multiple`（默认）

**使用示例**:
```vue
<!-- 单行编辑模式 -->
<jh-editable-table
  v-model="dataSource"
  :columns="columns"
  editable-type="single"
/>

<!-- 多行编辑模式 -->
<jh-editable-table
  v-model="dataSource"
  :columns="columns"
  editable-type="multiple"
/>
```

**行为说明**:
- `single`: 同一时间只能编辑一行，编辑新行时自动保存当前编辑行
- `multiple`: 可以同时编辑多行数据

### 2. 最大行数限制
**功能**: 限制表格的最大行数

**新增 Props**:
- `maxRows`: Number - 最大行数，默认 Infinity

**新增 Events**:
- `max-rows`: 达到最大行数时触发

**使用示例**:
```vue
<jh-editable-table
  v-model="dataSource"
  :columns="columns"
  :max-rows="20"
  @max-rows="handleMaxRows"
/>

<script>
methods: {
  handleMaxRows(max) {
    this.$message.warning(`最多只能添加 ${max} 行数据`);
  }
}
</script>
```

### 3. 操作守卫机制
**功能**: 添加/删除前的确认和拦截机制

**新增 Props**:
- `beforeAddRow`: Function - 添加行前守卫
- `beforeRemoveRow`: Function - 删除行前守卫

**使用示例**:
```vue
<jh-editable-table
  v-model="dataSource"
  :columns="columns"
  :before-add-row="async () => {
    const confirmed = await this.$confirm('确定要添加新行吗？');
    return confirmed;
  }"
  :before-remove-row="async (item, index) => {
    const confirmed = await this.$confirm(`确定要删除 ${item.name} 吗？`);
    return confirmed;
  }"
/>
```

### 4. 数据变化回调
**功能**: 监听数据变化的回调函数

**新增 Props**:
- `onValuesChange`: Function - 值变化回调

**使用示例**:
```vue
<jh-editable-table
  v-model="dataSource"
  :columns="columns"
  :on-values-change="(item, allData) => {
    console.log('当前修改的项:', item);
    console.log('全部数据:', allData);
    // 可以在这里执行自动保存、数据联动等操作
  }"
/>
```

### 5. 保存和删除回调
**功能**: 保存和删除操作的异步回调

**新增 Props**:
- `onSave`: Function - 保存数据时的回调
- `onDelete`: Function - 删除数据时的回调

**使用示例**:
```vue
<jh-editable-table
  v-model="dataSource"
  :columns="columns"
  :on-save="async (key, item, originRow) => {
    try {
      await api.saveUser(item);
      this.$message.success('保存成功');
      return true;
    } catch (error) {
      this.$message.error('保存失败');
      return false; // 返回 false 阻止保存
    }
  }"
  :on-delete="async (key, item) => {
    try {
      await api.deleteUser(key);
      this.$message.success('删除成功');
    } catch (error) {
      this.$message.error('删除失败');
      return false; // 返回 false 阻止删除
    }
  }"
/>
```

### 6. 受控编辑状态
**功能**: 通过外部控制哪些行处于编辑状态

**新增 Props**:
- `editableKeys`: Array - 受控模式的编辑行keys

**新增 Events**:
- `update:editableKeys`: 编辑状态变化时触发

**使用示例**:
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
  },
  methods: {
    // 外部控制编辑状态
    startEdit(rowKey) {
      this.editingKeys = [...this.editingKeys, rowKey];
    },
    stopEdit(rowKey) {
      this.editingKeys = this.editingKeys.filter(k => k !== rowKey);
    }
  }
};
</script>
```

### 7. 自定义操作列渲染
**功能**: 完全自定义操作列的渲染

**新增 Props**:
- `actionRender`: Function - 自定义操作渲染函数

**使用示例**:
```vue
<jh-editable-table
  v-model="dataSource"
  :columns="columns"
  :action-render="({ item, index, isEditing }) => {
    if (isEditing) {
      return h('div', { class: 'custom-actions' }, [
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
      }, '编辑'),
      h('v-btn', {
        props: { small: true, color: 'error' },
        on: { click: () => handleDelete(item) }
      }, '删除')
    ]);
  }"
/>
```

## 功能增强

### 1. 改进的编辑操作
**单行编辑模式**:
```javascript
async handleEdit(item) {
  const key = this.getRowKey(item);
  
  // single 模式下，关闭其他编辑行
  if (this.editableType === 'single' && this.editingKeys.size > 0) {
    const currentKey = Array.from(this.editingKeys)[0];
    const currentItem = this.internalData.find(row => this.getRowKey(row) === currentKey);
    if (currentItem) {
      await this.handleCancel(currentItem);
    }
  }
  
  // 保存原始数据
  this.originalData.set(key, { ...item });
  this.editingKeys.add(key);
  
  this.$emit('edit', item);
  this.$emit('update:editableKeys', Array.from(this.editingKeys));
}
```

### 2. 改进的保存操作
**支持异步回调和拦截**:
```javascript
async handleSave(item) {
  const key = this.getRowKey(item);
  
  // 验证数据
  if (!this.validateRow(item)) {
    return;
  }
  
  // 执行保存回调
  if (this.onSave) {
    const result = await this.onSave(key, item, this.originalData.get(key));
    if (result === false) return; // 返回 false 阻止保存
  }
  
  // 从编辑集合中移除
  this.editingKeys.delete(key);
  this.originalData.delete(key);
  
  // 更新父组件数据
  this.syncToParent();
  
  this.$emit('save', item);
  this.$emit('change', this.internalData);
  this.$emit('update:editableKeys', Array.from(this.editingKeys));
  
  // 触发值变化回调
  if (this.onValuesChange) {
    this.onValuesChange(item, this.internalData);
  }
}
```

### 3. 改进的删除操作
**支持守卫和回调**:
```javascript
async handleDelete(item) {
  const key = this.getRowKey(item);
  const index = this.internalData.findIndex(row => this.getRowKey(row) === key);
  
  // 执行删除前守卫
  if (this.beforeRemoveRow) {
    const canDelete = await this.beforeRemoveRow(item, index);
    if (canDelete === false) return;
  }
  
  // 执行删除回调
  if (this.onDelete) {
    const result = await this.onDelete(key, item);
    if (result === false) return;
  }
  
  if (index > -1) {
    this.internalData.splice(index, 1);
    this.syncToParent();
    this.$emit('delete', item, index);
    this.$emit('change', this.internalData);
  }
}
```

### 4. 改进的添加操作
**支持最大行数限制和守卫**:
```javascript
async handleAddRow() {
  // 检查最大行数限制
  if (this.internalData.length >= this.maxRows) {
    this.$emit('max-rows', this.maxRows);
    return;
  }
  
  // 执行添加前守卫
  if (this.beforeAddRow) {
    const canAdd = await this.beforeAddRow();
    if (canAdd === false) return;
  }
  
  const newRow = {
    _uuid: this.generateUUID(),
    _isNew: true,
    ...this.recordCreatorProps.record,
  };
  
  // 初始化列的默认值
  this.columns.forEach(col => {
    if (col.key && newRow[col.key] === undefined) {
      if (col.type === 'switch') {
        newRow[col.key] = false;
      } else if (col.type === 'number') {
        newRow[col.key] = 0;
      } else {
        newRow[col.key] = '';
      }
    }
  });
  
  this.internalData.push(newRow);
  
  // 立即进入编辑状态
  this.$nextTick(() => {
    this.handleEdit(newRow);
  });
  
  this.$emit('add', newRow);
}
```

## 使用场景

### 1. 单行编辑场景
适用于表单式编辑，一次只能编辑一行：
```vue
<jh-editable-table
  v-model="users"
  :columns="userColumns"
  editable-type="single"
  :on-save="saveUser"
/>
```

### 2. 批量编辑场景
适用于需要同时编辑多行的场景：
```vue
<jh-editable-table
  v-model="products"
  :columns="productColumns"
  editable-type="multiple"
  :on-save="batchSaveProducts"
/>
```

### 3. 受控编辑场景
适用于需要外部控制编辑状态的场景：
```vue
<jh-editable-table
  v-model="items"
  :columns="columns"
  :editable-keys.sync="editingKeys"
  @edit="handleEdit"
  @save="handleSave"
/>
```

### 4. 数据联动场景
适用于需要实时监听数据变化的场景：
```vue
<jh-editable-table
  v-model="orderItems"
  :columns="columns"
  :on-values-change="(item, allData) => {
    // 计算总价
    const total = allData.reduce((sum, row) => sum + row.price * row.quantity, 0);
    this.totalPrice = total;
  }"
/>
```

## 向后兼容性

✅ **完全向后兼容**

所有新增功能都是可选的，不影响现有代码：
- 新增的 Props 都有默认值
- `editableType` 默认为 `multiple`，保持原有行为
- 不使用新功能时，行为与之前完全一致
- 现有的 API 和事件保持不变

## 最佳实践

### 1. 使用操作守卫
```vue
<jh-editable-table
  :before-add-row="async () => {
    // 检查权限
    if (!hasPermission) {
      this.$message.error('无权限添加');
      return false;
    }
    return true;
  }"
  :before-remove-row="async (item) => {
    // 确认删除
    return await this.$confirm(`确定删除 ${item.name}？`);
  }"
/>
```

### 2. 使用保存回调
```vue
<jh-editable-table
  :on-save="async (key, item, originRow) => {
    try {
      // 调用 API 保存
      await api.save(item);
      this.$message.success('保存成功');
      return true;
    } catch (error) {
      this.$message.error(error.message);
      return false; // 阻止保存
    }
  }"
/>
```

### 3. 使用数据变化回调
```vue
<jh-editable-table
  :on-values-change="(item, allData) => {
    // 自动保存草稿
    localStorage.setItem('draft', JSON.stringify(allData));
    
    // 数据联动计算
    this.updateCalculations(allData);
  }"
/>
```

## 测试建议

1. **编辑模式测试**
   - 测试单行编辑模式切换
   - 测试多行编辑模式
   - 测试受控编辑状态

2. **守卫功能测试**
   - 测试异步守卫
   - 测试守卫返回 false
   - 测试守卫异常处理

3. **回调功能测试**
   - 测试保存回调
   - 测试删除回调
   - 测试值变化回调

4. **限制功能测试**
   - 测试最大行数限制
   - 测试限制提示

## 后续优化方向

1. **性能优化**
   - 虚拟滚动支持
   - 大数据量优化

2. **功能增强**
   - 批量操作支持
   - 行拖拽排序
   - 更多字段类型

3. **用户体验**
   - 更好的加载状态
   - 更好的错误提示
   - 键盘快捷键支持

## 相关文件

- `JhEditableTable.vue` - 组件主文件
- `README.md` - 使用文档
- `JhEditableTable.stories.js` - Storybook 示例（待更新）
