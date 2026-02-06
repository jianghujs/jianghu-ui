# 江湖UI 组件分类设计规范

> 本文档详细说明34个UI组件的分类规范，包括视觉、交互、尺寸、间距等具体指导。  
> **引用**: 所有设计令牌参考 `jianghu-ui_design_system.md`

---

## 📋 组件分类索引

| 分类 | 组件数 | 组件列表 |
|------|------|--------|
| **表单组件** | 5 | JhForm, JhFormField, JhFormFields, JhFormList, JhFileInput |
| **表格/列表** | 3 | JhTable, JhEditableTable, JhList |
| **数据展示** | 5 | JhCard, JhCheckCard, JhDescriptions, JhStatisticCard, JhList |
| **对话框/抽屉** | 5 | JhModal, JhModalForm, JhConfirmDialog, JhDrawer, JhDrawerForm |
| **选择器/输入** | 4 | JhAddressSelect, JhTreeSelect, JhDateRangePicker, JhQueryFilter |
| **编辑器** | 2 | JhJsonEditor, JhMarkdownEditor |
| **布局/导航/其他** | 5 | JhLayout, JhMenu, JhPageContainer, JhIcon, JhToast |

---

## 一、表单组件

### 1. JhForm - 表单容器

#### 视觉规范

| 属性 | 规范值 | 说明 |
|------|------|------|
| **圆角** | 4px | 带边框模式 |
| **边框** | 1px `--color-border-normal` | 可选，默认无 |
| **背景色** | `--color-bg-primary` | 内部区块 |
| **padding** | 24px 内容区 / 16px 工具栏 | 大间距 |
| **内部gap** | 16px | 表单项之间 |
| **阴影** | `--shadow-md` | 可选的卡片模式 |

#### 表单布局

```css
/* 竖排布局（默认） */
.jh-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);  /* 16px */
  padding: var(--spacing-xl) var(--spacing-lg);  /* 24px 16px */
}

/* 横排布局（栅格） */
.jh-form--horizontal {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);  /* 16px */
}

/* 两列布局 */
.jh-form--two-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-lg);  /* 16px */
}
```

#### 表单组（分组）

```css
.jh-form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);  /* 12px */
  
  /* 分组标题 */
  .jh-form-group-title {
    font-size: var(--font-size-h3);  /* 16px */
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-sm);  /* 8px */
    padding-bottom: var(--spacing-sm);
    border-bottom: 1px solid var(--color-border-light);
  }
}
```

#### 表单项（单个字段）

```css
.jh-form-item {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);  /* 4px */
}

/* 标签 */
.jh-form-label {
  font-size: var(--font-size-body);  /* 14px */
  font-weight: 500;
  color: var(--color-text-primary);
  
  &.required::after {
    content: ' *';
    color: var(--color-error);
  }
}

/* 输入框容器 */
.jh-form-input-wrapper {
  position: relative;
}

/* 帮助文字 */
.jh-form-help {
  font-size: var(--font-size-small);  /* 12px */
  color: var(--color-text-tertiary);
  margin-top: var(--spacing-xs);  /* 4px */
}

/* 错误提示 */
.jh-form-error {
  font-size: var(--font-size-small);  /* 12px */
  color: var(--color-error);
  margin-top: var(--spacing-xs);  /* 4px */
}
```

#### 操作栏（按钮组）

```css
.jh-form-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);  /* 8px */
  margin-top: var(--spacing-xl);  /* 24px */
  padding-top: var(--spacing-lg);  /* 16px */
  border-top: 1px solid var(--color-border-light);
  
  /* 主按钮靠右 */
  &--right {
    justify-content: flex-end;
  }
  
  /* 居中 */
  &--center {
    justify-content: center;
  }
}
```

#### 交互状态

- **普通**: 边框 `--color-border-normal`，背景白色
- **聚焦**: 边框 `--color-border-focus`（绿色），背景变浅蓝 `#EEF7ED`
- **禁用**: 背景 `--color-bg-tertiary`，文字 `--color-text-disabled`
- **错误**: 边框变红 `--color-error`，背景变浅红 `#FEE2E2`
- **过渡**: 200ms

### 2. JhFormField - 表单字段

#### 视觉规范

| 属性 | 规范值 | 说明 |
|------|------|------|
| **圆角** | 4px | 标准圆角 |
| **边框** | 1px `--color-border-normal` | 默认 |
| **高度** | 36px | 标准高度 |
| **padding** | 8px 12px | 内内边距 |
| **字体** | 14px `--color-text-primary` | 输入文字 |
| **占位符** | 14px `--color-text-tertiary` | 占位符 |
| **过渡** | 200ms | 状态转换 |

```css
.jh-form-field {
  display: inline-flex;
  align-items: center;
  height: 36px;
  padding: 8px 12px;
  border: 1px solid var(--color-border-normal);
  border-radius: 4px;
  background: var(--color-bg-primary);
  font-size: var(--font-size-body);
  color: var(--color-text-primary);
  transition: all var(--transition-base) var(--easing-standard);
  
  /* 占位符 */
  &::placeholder {
    color: var(--color-text-tertiary);
  }
  
  /* 聚焦 */
  &:focus,
  &:focus-within {
    border-color: var(--color-border-focus);
    background: var(--color-bg-hover);
    outline: none;
  }
  
  /* Hover */
  &:hover:not(:focus) {
    border-color: var(--color-border-strong);
    background: var(--color-bg-secondary);
  }
  
  /* 禁用 */
  &:disabled {
    background: var(--color-bg-tertiary);
    border-color: var(--color-border-light);
    color: var(--color-text-disabled);
    cursor: not-allowed;
  }
  
  /* 错误 */
  &.is-error {
    border-color: var(--color-error);
    background: var(--color-error-light);
  }
}
```

#### 字段类型规范

**文本输入框**: 高度 36px, padding 8px 12px
```html
<input type="text" class="jh-form-field" />
```

**数字输入**: 高度 36px, 只允许数字
```html
<input type="number" class="jh-form-field" />
```

**密码输入**: 高度 36px, 隐藏文字
```html
<input type="password" class="jh-form-field" />
```

**文本域**: 高度 auto (最小 80px), padding 12px
```html
<textarea class="jh-form-field jh-form-field--textarea"></textarea>
```

```css
.jh-form-field--textarea {
  height: auto;
  min-height: 80px;
  padding: 12px;
  resize: vertical;
}
```

### 3. JhFormFields - 多字段组件

分组显示多个表单字段，常用于动态添加/删除场景。

```css
.jh-form-fields {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);  /* 16px */
  
  .jh-form-fields-item {
    display: flex;
    align-items: flex-end;
    gap: var(--spacing-sm);  /* 8px */
    
    .jh-form-fields-input {
      flex: 1;
    }
    
    .jh-form-fields-action {
      display: flex;
      gap: var(--spacing-xs);  /* 4px */
    }
  }
  
  /* 添加/删除按钮 */
  .jh-form-fields-toolbar {
    display: flex;
    gap: var(--spacing-sm);  /* 8px */
    margin-top: var(--spacing-lg);  /* 16px */
  }
}
```

### 4. JhFormList - 列表表单

表格式的表单，用于批量编辑。

```css
.jh-form-list {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid var(--color-border-normal);
  border-radius: 4px;
  overflow: hidden;
  
  /* 表头 */
  thead {
    background: var(--color-bg-secondary);
    
    th {
      padding: var(--spacing-md) var(--spacing-lg);  /* 12px 16px */
      border-bottom: 1px solid var(--color-border-normal);
      font-size: var(--font-size-body);
      font-weight: 600;
      color: var(--color-text-primary);
      text-align: left;
    }
  }
  
  /* 行 */
  tbody tr {
    border-bottom: 1px solid var(--color-border-light);
    transition: background-color var(--transition-base) var(--easing-standard);
    
    &:hover {
      background: var(--color-bg-hover);
    }
  }
  
  /* 单元格 */
  td {
    padding: var(--spacing-md) var(--spacing-lg);  /* 12px 16px */
    font-size: var(--font-size-body);
    color: var(--color-text-primary);
  }
}
```

### 5. JhFileInput - 文件上传

```css
.jh-file-input {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80px;
  border: 2px dashed var(--color-border-normal);
  border-radius: 4px;
  background: var(--color-bg-secondary);
  cursor: pointer;
  transition: all var(--transition-base) var(--easing-standard);
  
  &:hover {
    border-color: var(--color-success);
    background: var(--color-bg-hover);
  }
  
  &.dragging {
    border-color: var(--color-info);
    background: var(--color-info-light);
  }
  
  .jh-file-input-content {
    text-align: center;
    
    .icon {
      font-size: 32px;
      color: var(--color-text-tertiary);
      margin-bottom: var(--spacing-sm);  /* 8px */
    }
    
    .text {
      font-size: var(--font-size-body);
      color: var(--color-text-secondary);
      margin-bottom: var(--spacing-xs);  /* 4px */
    }
    
    .hint {
      font-size: var(--font-size-small);
      color: var(--color-text-tertiary);
    }
  }
}
```

---

## 二、表格/列表组件

### 1. JhTable - 数据表格

#### 容器规范

```css
.jh-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid var(--color-border-strong);
  border-radius: 8px;
  overflow: hidden;
  background: var(--color-bg-primary);
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--transition-base) var(--easing-standard);
  
  /* Hover时加强阴影 */
  &:hover {
    box-shadow: var(--shadow-md);
  }
}
```

#### 表头规范

```css
.jh-table thead {
  background: var(--color-bg-secondary);
  
  th {
    padding: var(--spacing-md) var(--spacing-lg);  /* 12px 16px */
    border-bottom: 1px solid var(--color-border-normal);
    font-size: var(--font-size-body);
    font-weight: 600;
    color: var(--color-text-primary);
    text-align: left;
    vertical-align: middle;
    white-space: nowrap;
  }
}
```

#### 行规范

三级密度的行高度定义：

| 密度 | 行高 | padding | 字体 | gap |
|------|------|--------|------|-----|
| Default | 48px | 0 16px | 14px | 8px |
| Medium | 40px | 0 12px | 14px | 8px |
| Compact | 32px | 0 8px | 13px | 4px |

```css
/* 默认密度 */
.jh-table.density-default tbody tr {
  height: 48px;
  padding: 0 16px;
}

/* 中等密度 */
.jh-table.density-medium tbody tr {
  height: 40px;
  padding: 0 12px;
}

/* 紧凑密度 */
.jh-table.density-compact tbody tr {
  height: 32px;
  padding: 0 8px;
  font-size: 13px;
}

/* 行状态 */
.jh-table tbody tr {
  background: var(--color-bg-primary);
  border-bottom: 1px solid var(--color-border-light);
  transition: background-color var(--transition-base) var(--easing-standard);
}

/* 奇数行（斑马纹） */
.jh-table tbody tr:nth-child(odd) {
  background: var(--color-bg-secondary);
}

/* Hover */
.jh-table tbody tr:hover {
  background: var(--color-bg-hover);
}

/* 选中行 */
.jh-table tbody tr.selected {
  background: var(--color-bg-selected);
}

/* 选中行Hover */
.jh-table tbody tr.selected:hover {
  background: var(--color-bg-selected-hover);
}
```

#### 单元格规范

```css
.jh-table td {
  padding: var(--spacing-md) var(--spacing-lg);  /* 12px 16px */
  border-right: 1px solid var(--color-border-light);
  font-size: var(--font-size-body);
  color: var(--color-text-primary);
  vertical-align: middle;
  word-break: break-word;
  
  &:last-child {
    border-right: none;
  }
}
```

#### 操作列规范

```css
.jh-table-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);  /* 8px */
  
  .action-button {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);  /* 4px */
    padding: 4px 8px;
    border-radius: 4px;
    font-size: var(--font-size-body);
    cursor: pointer;
    transition: all var(--transition-base) var(--easing-standard);
    
    /* 编辑按钮 */
    &.edit {
      color: var(--color-success);
      
      &:hover {
        background: var(--color-bg-hover);
        color: var(--color-success-darker);
      }
    }
    
    /* 删除按钮 */
    &.delete {
      color: var(--color-error);
      
      &:hover {
        background: var(--color-error-light);
        color: var(--color-error-darker);
      }
    }
  }
}
```

#### 分页规范

```css
.jh-table-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-lg);  /* 16px */
  border-top: 1px solid var(--color-border-light);
  background: var(--color-bg-secondary);
  
  .pagination-info {
    font-size: var(--font-size-small);
    color: var(--color-text-secondary);
  }
  
  .pagination-controls {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);  /* 8px */
  }
}
```

### 2. JhEditableTable - 可编辑表格

基于 JhTable，单元格可直接编辑。

```css
.jh-editable-table {
  /* 继承 JhTable 的所有规范 */
  
  /* 编辑状态的单元格 */
  .cell--editing {
    padding: 4px 8px;  /* 减少padding预留输入框 */
    
    .cell-input {
      width: 100%;
      height: 24px;
      padding: 4px 8px;
      border: 1px solid var(--color-border-focus);
      border-radius: 4px;
      font-size: var(--font-size-body);
      color: var(--color-text-primary);
    }
  }
  
  /* 可编辑标志 */
  .cell--editable {
    cursor: pointer;
    
    &:hover {
      background: var(--color-bg-hover);
    }
  }
}
```

### 3. JhList - 列表组件

```css
.jh-list {
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  border: 1px solid var(--color-border-normal);
  border-radius: 8px;
  background: var(--color-bg-primary);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.jh-list-item {
  padding: var(--spacing-lg);  /* 16px */
  border-bottom: 1px solid var(--color-border-light);
  transition: all var(--transition-base) var(--easing-standard);
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: var(--color-bg-hover);
  }
  
  /* 选中状态 */
  &.selected {
    background: var(--color-bg-selected);
    border-left: 4px solid var(--color-success);
    padding-left: calc(var(--spacing-lg) - 4px);
  }
  
  /* 列表项内容结构 */
  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-sm);  /* 8px */
    
    .item-title {
      font-size: var(--font-size-body);
      font-weight: 500;
      color: var(--color-text-primary);
    }
    
    .item-meta {
      font-size: var(--font-size-small);
      color: var(--color-text-tertiary);
    }
  }
  
  .item-content {
    font-size: var(--font-size-body);
    color: var(--color-text-secondary);
    line-height: 1.57;
  }
}

/* 虚拟列表优化 */
.jh-list--virtual {
  overflow-y: auto;
  height: 400px;
  
  .jh-list-item {
    will-change: transform;
  }
}
```

---

## 三、数据展示组件

### 1. JhCard - 卡片

#### 容器规范

```css
.jh-card {
  border-radius: 8px;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-normal);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  transition: all var(--transition-base) var(--easing-standard);
  
  /* Hover增强 */
  &:hover {
    box-shadow: var(--shadow-lg);
    border-color: var(--color-border-strong);
  }
}
```

#### 卡片内部结构

```css
.jh-card-header {
  padding: var(--spacing-lg) var(--spacing-xl);  /* 16px 24px */
  border-bottom: 1px solid var(--color-border-light);
  background: var(--color-bg-secondary);
  
  .card-title {
    font-size: var(--font-size-h3);
    font-weight: 600;
    color: var(--color-text-primary);
    margin: 0;
  }
  
  .card-subtitle {
    font-size: var(--font-size-body);
    color: var(--color-text-secondary);
    margin-top: var(--spacing-xs);  /* 4px */
  }
}

.jh-card-body {
  padding: var(--spacing-xl);  /* 24px */
}

.jh-card-footer {
  padding: var(--spacing-lg) var(--spacing-xl);  /* 16px 24px */
  border-top: 1px solid var(--color-border-light);
  background: var(--color-bg-secondary);
  display: flex;
  gap: var(--spacing-sm);  /* 8px */
}
```

#### 卡片尺寸变体

```css
/* 小卡片 */
.jh-card--small {
  .jh-card-header {
    padding: var(--spacing-md) var(--spacing-lg);  /* 12px 16px */
  }
  
  .jh-card-body {
    padding: var(--spacing-lg);  /* 16px */
  }
}

/* 无边框 */
.jh-card--ghost {
  border: none;
  background: transparent;
  box-shadow: none;
  
  &:hover {
    box-shadow: none;
  }
}

/* 带颜色 */
.jh-card--success {
  border-left: 4px solid var(--color-success);
}

.jh-card--warning {
  border-left: 4px solid var(--color-warning);
}

.jh-card--error {
  border-left: 4px solid var(--color-error);
}
```

### 2. JhCheckCard - 复选卡片

```css
.jh-check-card {
  position: relative;
  border: 2px solid var(--color-border-normal);
  border-radius: 8px;
  padding: var(--spacing-lg);  /* 16px */
  cursor: pointer;
  transition: all var(--transition-base) var(--easing-standard);
  
  /* 未选中Hover */
  &:hover:not(.checked) {
    border-color: var(--color-border-strong);
    background: var(--color-bg-secondary);
  }
  
  /* 选中状态 */
  &.checked {
    border-color: var(--color-success);
    background: var(--color-bg-hover);
    
    .check-icon {
      position: absolute;
      top: var(--spacing-sm);  /* 8px */
      right: var(--spacing-sm);
      width: 20px;
      height: 20px;
      background: var(--color-success);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
  }
  
  .card-title {
    font-size: var(--font-size-body);
    font-weight: 500;
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-sm);  /* 8px */
  }
  
  .card-description {
    font-size: var(--font-size-small);
    color: var(--color-text-tertiary);
  }
}
```

### 3. JhDescriptions - 描述列表

```css
.jh-descriptions {
  width: 100%;
  
  .desc-row {
    display: flex;
    border-bottom: 1px solid var(--color-border-light);
    
    &:last-child {
      border-bottom: none;
    }
  }
  
  .desc-item {
    padding: var(--spacing-lg);  /* 16px */
    
    /* 竖排布局 */
    &--vertical {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);  /* 8px */
    }
    
    /* 横排布局 */
    &--horizontal {
      display: grid;
      grid-template-columns: 150px 1fr;
      gap: var(--spacing-lg);  /* 16px */
    }
  }
  
  .desc-label {
    font-size: var(--font-size-body);
    font-weight: 500;
    color: var(--color-text-secondary);
    min-width: 100px;
  }
  
  .desc-content {
    font-size: var(--font-size-body);
    color: var(--color-text-primary);
    word-break: break-word;
  }
}
```

### 4. JhStatisticCard - 统计卡片

```css
.jh-statistic-card {
  padding: var(--spacing-xl);  /* 24px */
  border-radius: 8px;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-normal);
  text-align: center;
  
  .stat-title {
    font-size: var(--font-size-body);
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-md);  /* 12px */
  }
  
  .stat-value {
    font-size: 32px;
    font-weight: 700;
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-sm);  /* 8px */
  }
  
  .stat-unit {
    font-size: var(--font-size-small);
    color: var(--color-text-tertiary);
  }
  
  .stat-trend {
    margin-top: var(--spacing-md);  /* 12px */
    font-size: var(--font-size-body);
    
    &.up {
      color: var(--color-error);  /* 红色 */
    }
    
    &.down {
      color: var(--color-success);  /* 绿色 */
    }
  }
}
```

---

## 四、对话框/抽屉组件

### 1. JhModal - 模态框

#### 背景蒙层

```css
.jh-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  z-index: 1000;
  opacity: 0;
  transition: opacity var(--transition-base) var(--easing-standard);
  
  &.open {
    opacity: 1;
  }
}
```

#### 模态框容器

```css
.jh-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.95);
  background: var(--color-bg-primary);
  border-radius: 8px;
  box-shadow: var(--shadow-xl);
  z-index: 1001;
  max-width: 90vw;
  max-height: 90vh;
  overflow: hidden;
  transition: all var(--transition-slow) var(--easing-standard);
  
  &.open {
    transform: translate(-50%, -50%) scale(1);
  }
  
  /* 宽度规范 */
  &--sm { width: 400px; }
  &--md { width: 600px; }
  &--lg { width: 800px; }
  &--full { width: calc(100vw - 48px); max-width: 1200px; }
}

/* 内部结构 */
.jh-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg) var(--spacing-xl);  /* 16px 24px */
  border-bottom: 1px solid var(--color-border-light);
  
  .modal-title {
    font-size: var(--font-size-h2);  /* 18px */
    font-weight: 600;
    color: var(--color-text-primary);
  }
  
  .close-button {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    cursor: pointer;
    transition: all var(--transition-base) var(--easing-standard);
    
    &:hover {
      background: var(--color-bg-secondary);
      color: var(--color-error);
    }
  }
}

.jh-modal-body {
  padding: var(--spacing-xl);  /* 24px */
  max-height: calc(90vh - 200px);
  overflow-y: auto;
}

.jh-modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-sm);  /* 8px */
  padding: var(--spacing-lg) var(--spacing-xl);  /* 16px 24px */
  border-top: 1px solid var(--color-border-light);
  background: var(--color-bg-secondary);
}
```

### 2. JhModalForm - 模态表单

基于 JhModal，内嵌 JhForm：

```css
.jh-modal-form {
  .jh-modal-body {
    padding: var(--spacing-xl);  /* 24px */
    
    /* 表单样式 */
    .jh-form {
      padding: 0;  /* 不需要额外padding */
      gap: var(--spacing-lg);  /* 16px */
    }
  }
  
  .jh-modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-sm);  /* 8px */
    
    /* 取消按钮 */
    .btn-cancel {
      /* 次要按钮 */
    }
    
    /* 提交按钮 */
    .btn-submit {
      /* 主按钮 */
    }
  }
}
```

### 3. JhConfirmDialog - 确认对话框

```css
.jh-confirm-dialog {
  /* 基于JhModal，但宽度固定 */
  width: 360px;
  
  .jh-modal-body {
    padding: var(--spacing-xl);  /* 24px */
    text-align: center;
    
    .confirm-icon {
      font-size: 48px;
      margin-bottom: var(--spacing-lg);  /* 16px */
      
      &.success { color: var(--color-success); }
      &.warning { color: var(--color-warning); }
      &.error { color: var(--color-error); }
      &.info { color: var(--color-info); }
    }
    
    .confirm-title {
      font-size: var(--font-size-h3);  /* 16px */
      font-weight: 600;
      color: var(--color-text-primary);
      margin-bottom: var(--spacing-sm);  /* 8px */
    }
    
    .confirm-description {
      font-size: var(--font-size-body);
      color: var(--color-text-secondary);
      line-height: 1.57;
    }
  }
}
```

### 4. JhDrawer - 抽屉

```css
.jh-drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1000;
  opacity: 0;
  transition: opacity var(--transition-base) var(--easing-standard);
}

.jh-drawer {
  position: fixed;
  top: 0;
  right: -100%;
  width: 360px;
  height: 100vh;
  background: var(--color-bg-primary);
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
  z-index: 1001;
  transition: right var(--transition-slow) var(--easing-standard);
  display: flex;
  flex-direction: column;
  
  /* 从右侧滑入 */
  &.open {
    right: 0;
  }
  
  /* 从左侧滑入 */
  &--left {
    right: auto;
    left: -100%;
    
    &.open {
      left: 0;
    }
  }
  
  /* 宽度规范 */
  &--sm { width: 280px; }
  &--md { width: 360px; }
  &--lg { width: 480px; }
  &--full { width: 100%; max-width: 100vw; }
}

.jh-drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg) var(--spacing-xl);  /* 16px 24px */
  border-bottom: 1px solid var(--color-border-light);
  flex-shrink: 0;
  
  .drawer-title {
    font-size: var(--font-size-h2);  /* 18px */
    font-weight: 600;
    color: var(--color-text-primary);
  }
  
  .close-button {
    cursor: pointer;
  }
}

.jh-drawer-body {
  flex: 1;
  padding: var(--spacing-xl);  /* 24px */
  overflow-y: auto;
}

.jh-drawer-footer {
  display: flex;
  gap: var(--spacing-sm);  /* 8px */
  padding: var(--spacing-lg) var(--spacing-xl);  /* 16px 24px */
  border-top: 1px solid var(--color-border-light);
  background: var(--color-bg-secondary);
  flex-shrink: 0;
}
```

### 5. JhDrawerForm - 抽屉表单

基于 JhDrawer，内嵌 JhForm（类似 JhModalForm）。

---

## 五、选择器/输入组件

### 1. JhAddressSelect - 地址选择器

```css
.jh-address-select {
  display: flex;
  gap: var(--spacing-md);  /* 12px */
  
  .address-select-item {
    flex: 1;
    
    .select-label {
      font-size: var(--font-size-body);
      font-weight: 500;
      color: var(--color-text-primary);
      margin-bottom: var(--spacing-xs);  /* 4px */
      display: block;
    }
    
    .select-dropdown {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid var(--color-border-normal);
      border-radius: 4px;
      background: var(--color-bg-primary);
      font-size: var(--font-size-body);
      cursor: pointer;
      transition: all var(--transition-base) var(--easing-standard);
      
      &:hover {
        border-color: var(--color-border-strong);
      }
      
      &:focus {
        border-color: var(--color-border-focus);
        background: var(--color-bg-hover);
      }
    }
  }
  
  /* 级联布局响应 */
  @media (max-width: 600px) {
    flex-direction: column;
    gap: var(--spacing-sm);  /* 8px */
    
    .address-select-item {
      width: 100%;
    }
  }
}
```

### 2. JhTreeSelect - 树形选择器

```css
.jh-tree-select {
  width: 100%;
  border: 1px solid var(--color-border-normal);
  border-radius: 4px;
  background: var(--color-bg-primary);
  overflow: hidden;
  
  /* 下拉触发器 */
  .tree-select-trigger {
    padding: 8px 12px;
    cursor: pointer;
    transition: all var(--transition-base) var(--easing-standard);
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    &:hover {
      background: var(--color-bg-secondary);
    }
  }
  
  /* 树形菜单 */
  .tree-menu {
    max-height: 300px;
    overflow-y: auto;
    border-top: 1px solid var(--color-border-light);
    
    .tree-item {
      padding: var(--spacing-md) var(--spacing-lg);  /* 12px 16px */
      font-size: var(--font-size-body);
      color: var(--color-text-primary);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);  /* 8px */
      transition: all var(--transition-base) var(--easing-standard);
      
      &:hover {
        background: var(--color-bg-hover);
      }
      
      &.selected {
        background: var(--color-bg-selected);
        color: var(--color-success);
        font-weight: 500;
      }
      
      /* 嵌套缩进 */
      &--level-1 { padding-left: calc(var(--spacing-lg) + 16px); }
      &--level-2 { padding-left: calc(var(--spacing-lg) + 32px); }
      &--level-3 { padding-left: calc(var(--spacing-lg) + 48px); }
    }
  }
}
```

### 3. JhDateRangePicker - 日期范围选择器

```css
.jh-date-range-picker {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);  /* 8px */
  
  .date-input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid var(--color-border-normal);
    border-radius: 4px;
    font-size: var(--font-size-body);
    cursor: pointer;
    background: var(--color-bg-primary);
    transition: all var(--transition-base) var(--easing-standard);
    
    &:hover {
      border-color: var(--color-border-strong);
    }
    
    &:focus {
      border-color: var(--color-border-focus);
      background: var(--color-bg-hover);
    }
  }
  
  .date-separator {
    color: var(--color-text-tertiary);
    font-size: var(--font-size-body);
  }
  
  /* 日历弹窗 */
  .date-picker-calendar {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: var(--spacing-sm);  /* 8px */
    background: var(--color-bg-primary);
    border: 1px solid var(--color-border-normal);
    border-radius: 8px;
    box-shadow: var(--shadow-lg);
    padding: var(--spacing-lg);  /* 16px */
    z-index: 1000;
  }
}
```

### 4. JhQueryFilter - 查询过滤器

```css
.jh-query-filter {
  display: flex;
  align-items: flex-end;
  gap: var(--spacing-sm);  /* 8px */
  flex-wrap: wrap;
  padding: var(--spacing-lg);  /* 16px */
  background: var(--color-bg-secondary);
  border-radius: 4px;
  margin-bottom: var(--spacing-lg);  /* 16px */
  
  .filter-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);  /* 8px */
    
    .filter-label {
      font-size: var(--font-size-body);
      color: var(--color-text-secondary);
      white-space: nowrap;
    }
    
    .filter-input {
      padding: 8px 12px;
      border: 1px solid var(--color-border-normal);
      border-radius: 4px;
      font-size: var(--font-size-body);
      background: var(--color-bg-primary);
      width: 120px;
      
      &:focus {
        border-color: var(--color-border-focus);
      }
    }
  }
  
  .filter-actions {
    display: flex;
    gap: var(--spacing-sm);  /* 8px */
    margin-left: auto;
  }
}
```

---

## 六、编辑器/其他组件

### 1. JhJsonEditor - JSON编辑器

```css
.jh-json-editor {
  border: 1px solid var(--color-border-normal);
  border-radius: 4px;
  background: var(--color-bg-primary);
  overflow: hidden;
  
  .editor-toolbar {
    display: flex;
    gap: var(--spacing-sm);  /* 8px */
    padding: var(--spacing-md) var(--spacing-lg);  /* 12px 16px */
    border-bottom: 1px solid var(--color-border-light);
    background: var(--color-bg-secondary);
  }
  
  .editor-container {
    padding: var(--spacing-lg);  /* 16px */
    min-height: 200px;
    font-family: var(--font-family-mono);
    font-size: 13px;
    line-height: 1.5;
    white-space: pre-wrap;
    word-break: break-word;
  }
  
  .editor-error {
    background: var(--color-error-light);
    border: 1px solid var(--color-error);
    padding: var(--spacing-md) var(--spacing-lg);  /* 12px 16px */
    border-radius: 4px;
    color: var(--color-error);
    font-size: var(--font-size-small);
    margin-top: var(--spacing-sm);  /* 8px */
  }
}
```

### 2. JhMarkdownEditor - Markdown编辑器

```css
.jh-markdown-editor {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-lg);  /* 16px */
  border: 1px solid var(--color-border-normal);
  border-radius: 4px;
  overflow: hidden;
  background: var(--color-bg-primary);
  
  /* 编辑区 */
  .editor-panel {
    display: flex;
    flex-direction: column;
    border-right: 1px solid var(--color-border-light);
    
    .editor-toolbar {
      padding: var(--spacing-md) var(--spacing-lg);  /* 12px 16px */
      border-bottom: 1px solid var(--color-border-light);
      background: var(--color-bg-secondary);
      display: flex;
      gap: var(--spacing-sm);  /* 8px */
    }
    
    .editor-content {
      flex: 1;
      padding: var(--spacing-lg);  /* 16px */
      font-family: var(--font-family-mono);
      font-size: 13px;
      line-height: 1.5;
      white-space: pre-wrap;
      word-break: break-word;
    }
  }
  
  /* 预览区 */
  .preview-panel {
    padding: var(--spacing-lg);  /* 16px */
    overflow-y: auto;
    background: var(--color-bg-secondary);
    
    .preview-content {
      font-size: var(--font-size-body);
      color: var(--color-text-primary);
      line-height: 1.57;
      
      h1, h2, h3, h4, h5, h6 {
        margin-top: var(--spacing-lg);  /* 16px */
        margin-bottom: var(--spacing-md);  /* 12px */
        font-weight: 600;
      }
      
      p { margin-bottom: var(--spacing-md); }
      
      code {
        background: var(--color-bg-tertiary);
        padding: 2px 6px;
        border-radius: 3px;
        font-family: var(--font-family-mono);
        font-size: 12px;
      }
      
      pre {
        background: var(--color-bg-tertiary);
        padding: var(--spacing-md);
        border-radius: 4px;
        overflow-x: auto;
      }
    }
  }
  
  /* 移动端响应式 */
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    
    .editor-panel {
      border-right: none;
      border-bottom: 1px solid var(--color-border-light);
    }
  }
}
```

### 3. 其他组件

#### JhIcon - 图标

```css
.jh-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: var(--color-text-primary);
  transition: color var(--transition-base) var(--easing-standard);
  
  &:hover {
    color: var(--color-success);
  }
  
  /* 大小规范 */
  &--xs { font-size: 12px; }
  &--sm { font-size: 14px; }
  &--md { font-size: 16px; }
  &--lg { font-size: 20px; }
  &--xl { font-size: 24px; }
  &--2xl { font-size: 32px; }
}
```

#### JhToast - 提示

```css
.jh-toast {
  position: fixed;
  bottom: var(--spacing-xl);  /* 24px */
  right: var(--spacing-xl);  /* 24px */
  padding: var(--spacing-lg) var(--spacing-xl);  /* 16px 24px */
  border-radius: 4px;
  box-shadow: var(--shadow-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);  /* 8px */
  z-index: 2000;
  animation: slideIn 0.3s var(--easing-standard);
  
  /* 类型 */
  &--success {
    background: var(--color-success);
    color: white;
  }
  
  &--error {
    background: var(--color-error);
    color: white;
  }
  
  &--warning {
    background: var(--color-warning);
    color: white;
  }
  
  &--info {
    background: var(--color-info);
    color: white;
  }
}
```

---

## 常见问题

**Q: 如何选择组件的尺寸和密度？**

A: 根据数据量和使用场景选择：
- 数据少（< 50条）：Default 密度 + 桌面端
- 数据中（50-200条）：Medium 密度 + 平板
- 数据多（> 200条）：Compact 密度 + 移动端

**Q: 如何处理响应式？**

A: 使用 Mobile-First 策略：
- 基础样式适配移动端（< 600px）
- 使用 `@media (min-width: 600px)` 扩展到平板
- 使用 `@media (min-width: 1024px)` 扩展到桌面

**Q: 所有颜色都需要用 CSS 变量吗？**

A: 是的，所有颜色、间距、圆角都应该使用 CSS 变量，便于维护和主题定制。

