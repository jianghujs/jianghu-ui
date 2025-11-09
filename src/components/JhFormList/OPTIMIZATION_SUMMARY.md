# JhFormList 优化总结

基于 Ant Design ProFormList/ProFormGroup 的优化升级

## 优化时间
2025-11-09

## 参考文档
- [Ant Design ProFormList](https://procomponents.ant.design/components/group)
- [Ant Design ProFormGroup](https://procomponents.ant.design/components/group)

## 新增功能

### 1. 可折叠卡片模式
**功能**: Card 模式下支持折叠/展开列表项

**新增 Props**:
- `collapsible`: Boolean - 是否启用折叠功能
- `defaultCollapsed`: Boolean - 默认折叠状态

**使用示例**:
```vue
<jh-form-list
  v-model="items"
  :fields="fields"
  mode="card"
  :collapsible="true"
  :default-collapsed="false"
/>
```

### 2. ProFormList 风格的创建按钮配置
**功能**: 更灵活的新增按钮配置，支持隐藏按钮

**新增 Props**:
- `creatorButtonProps`: Object/Boolean - 创建按钮配置，false 时隐藏
- `creatorRecord`: Object/Function - 创建记录的初始值函数

**使用示例**:
```vue
<jh-form-list
  v-model="items"
  :fields="fields"
  :creator-button-props="{
    color: 'success',
    text: '新增一行',
    outlined: false
  }"
  :creator-record="(index) => ({
    id: Date.now(),
    order: index + 1
  })"
/>

<!-- 隐藏新增按钮 -->
<jh-form-list
  v-model="items"
  :fields="fields"
  :creator-button-props="false"
/>
```

### 3. 操作守卫机制
**功能**: 添加/删除前的确认和拦截机制

**新增 Props**:
- `actionGuard`: Object - 操作守卫配置
  - `beforeAddRow`: Function - 添加前守卫
  - `beforeRemoveRow`: Function - 删除前守卫

**使用示例**:
```vue
<jh-form-list
  v-model="items"
  :fields="fields"
  :action-guard="{
    beforeAddRow: async (count) => {
      if (count >= 10) {
        await this.$confirm('已有10项，确定继续添加？');
      }
      return true;
    },
    beforeRemoveRow: async (index, item) => {
      const confirmed = await this.$confirm(`确定删除 ${item.name}？`);
      return confirmed;
    }
  }"
/>
```

### 4. 删除后回调
**功能**: 删除操作完成后的回调函数

**新增 Props**:
- `onAfterRemove`: Function - 删除后回调

**使用示例**:
```vue
<jh-form-list
  v-model="items"
  :fields="fields"
  :on-after-remove="(index, item) => {
    console.log('已删除:', item);
    // 执行额外的清理操作
  }"
/>
```

### 5. 自定义操作按钮渲染
**功能**: 完全自定义操作按钮的渲染

**新增 Props**:
- `actionRender`: Function - 自定义操作按钮渲染函数

**使用示例**:
```vue
<jh-form-list
  v-model="items"
  :fields="fields"
  :action-render="({ item, index, removeItem, copyItem }) => {
    return h('div', { class: 'custom-actions' }, [
      h('v-btn', {
        props: { icon: true, small: true, color: 'primary' },
        on: { click: () => handleEdit(item) }
      }, [h('v-icon', 'mdi-pencil')]),
      h('v-btn', {
        props: { icon: true, small: true, color: 'error' },
        on: { click: () => removeItem() }
      }, [h('v-icon', 'mdi-delete')])
    ]);
  }"
/>
```

### 6. 数量限制提示
**功能**: 达到最大/最小数量时自动显示提示

**新增 Props**:
- `maxLimitText`: String - 最大数量提示文本
- `minLimitText`: String - 最小数量提示文本

**新增 UI**:
- 自动显示的警告提示框
- 3秒后自动消失
- 可手动关闭

**使用示例**:
```vue
<jh-form-list
  v-model="items"
  :fields="fields"
  :max="5"
  :min="1"
  max-limit-text="最多只能添加5个联系人"
  min-limit-text="至少需要保留1个联系人"
/>
```

### 7. 始终显示项标签
**功能**: 控制是否始终显示列表项的序号标签

**新增 Props**:
- `alwaysShowItemLabel`: Boolean - 始终显示项标签，默认 true

**使用示例**:
```vue
<jh-form-list
  v-model="items"
  :fields="fields"
  :always-show-item-label="false"
/>
```

## 功能增强

### 1. 改进的添加操作
- 支持异步守卫函数
- 自动显示数量限制提示
- 更好的错误处理

### 2. 改进的删除操作
- 支持异步守卫函数
- 删除后回调支持
- 自动清理折叠状态
- 更好的错误处理

### 3. 改进的按钮配置
- 统一使用 `computedCreatorButtonProps` 计算属性
- 支持完全隐藏新增按钮
- 更灵活的按钮样式配置

## UI/UX 改进

### 1. 折叠动画
- 使用 `v-expand-transition` 实现平滑展开/收起
- 折叠时隐藏验证错误提示
- 折叠时隐藏分割线

### 2. 提示信息
- 数量限制提示自动显示/隐藏
- 可关闭的警告提示框
- 更友好的错误提示

### 3. 操作按钮
- 支持自定义渲染
- 更灵活的布局
- 更好的视觉反馈

## 代码改进

### 1. 数据管理
```javascript
data() {
  return {
    listData: [],
    validationErrors: {},
    sortableInstance: null,
    collapsedItems: new Set(), // 新增：折叠状态管理
    showMaxLimitAlert: false,  // 新增：最大数量提示
    showMinLimitAlert: false,  // 新增：最小数量提示
  };
}
```

### 2. 计算属性
```javascript
computed: {
  // 新增：计算创建按钮配置
  computedCreatorButtonProps() {
    if (this.creatorButtonProps === false) return false;
    return {
      color: 'primary',
      outlined: true,
      ...this.creatorButtonProps,
    };
  },
  
  // 新增：计算创建记录初始值
  computedCreatorRecord() {
    if (this.creatorRecord) {
      return typeof this.creatorRecord === 'function'
        ? this.creatorRecord
        : () => this.creatorRecord;
    }
    return typeof this.defaultValue === 'function'
      ? this.defaultValue
      : () => this.defaultValue;
  }
}
```

### 3. 新增方法
```javascript
methods: {
  // 切换折叠状态
  toggleCollapse(item) {
    const id = item.__id__;
    if (this.collapsedItems.has(id)) {
      this.collapsedItems.delete(id);
    } else {
      this.collapsedItems.add(id);
    }
    this.$forceUpdate();
  },
  
  // 判断是否折叠
  isCollapsed(item) {
    return this.collapsedItems.has(item.__id__);
  },
  
  // 渲染操作按钮
  renderActionButtons(item, index) {
    if (this.actionRender) {
      return this.actionRender({
        item: this.getCleanItem(item),
        index,
        removeItem: () => this.removeItem(index),
        copyItem: () => this.copyItem(index),
      });
    }
    return null;
  }
}
```

## 向后兼容性

✅ **完全向后兼容**

所有新增功能都是可选的，不影响现有代码：
- 新增的 Props 都有默认值
- 不使用新功能时，行为与之前完全一致
- 现有的 API 和事件保持不变

## 使用建议

### 1. 折叠功能
适用于字段较多、需要节省空间的场景：
```vue
<jh-form-list
  mode="card"
  :collapsible="true"
  :default-collapsed="true"
/>
```

### 2. 操作守卫
适用于需要确认或验证的场景：
```vue
<jh-form-list
  :action-guard="{
    beforeRemoveRow: async (index, item) => {
      return await confirmDelete(item);
    }
  }"
/>
```

### 3. 自定义按钮
适用于需要特殊样式或行为的场景：
```vue
<jh-form-list
  :creator-button-props="{
    color: 'success',
    text: '添加新项',
    large: true
  }"
/>
```

## 测试建议

1. **折叠功能测试**
   - 测试折叠/展开动画
   - 测试折叠状态保持
   - 测试删除折叠项

2. **守卫功能测试**
   - 测试异步守卫
   - 测试守卫返回 false
   - 测试守卫异常处理

3. **数量限制测试**
   - 测试达到最大数量
   - 测试达到最小数量
   - 测试提示自动消失

4. **兼容性测试**
   - 测试不使用新功能时的行为
   - 测试与现有代码的兼容性

## 后续优化方向

1. **性能优化**
   - 虚拟滚动支持（大列表场景）
   - 懒加载验证

2. **功能增强**
   - 批量操作支持
   - 拖拽排序优化
   - 更多的操作守卫钩子

3. **用户体验**
   - 更多的动画效果
   - 更好的错误提示
   - 键盘快捷键支持

## 相关文件

- `JhFormList.vue` - 组件主文件
- `README.md` - 使用文档
- `JhFormList.stories.js` - Storybook 示例（待更新）
