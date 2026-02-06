# 江湖UI 交互与动效规范

> 完整的交互状态规范、动效设计、过渡效果指南。  
> **引用**: 设计令牌 `jianghu-ui_design_system.md`

---

## 📋 目录

1. [交互状态](#交互状态)
2. [按钮交互](#按钮交互)
3. [输入框交互](#输入框交互)
4. [表格行交互](#表格行交互)
5. [卡片交互](#卡片交互)
6. [菜单/下拉交互](#菜单下拉交互)
7. [动效规范](#动效规范)
8. [过渡曲线](#过渡曲线)
9. [键盘导航](#键盘导航)
10. [可访问性](#可访问性)

---

## 交互状态

### 标准状态流转图

所有交互组件遵循以下状态转换流程：

```
        ┌─────────────────────────────────────┐
        │      NORMAL (默认状态)               │
        │   border: --color-border-normal     │
        │   background: --color-bg-primary    │
        │   cursor: auto                      │
        └─────────────┬───────────────────────┘
                      │
        ┌─────────────┼───────────────────────┐
        │             │                       │
        ▼             ▼                       ▼
    HOVER         FOCUS                  DISABLED
    (悬浮)        (获焦)                  (禁用)
    border:       border:                background:
    --color-      --color-               --color-bg-
    border-       border-                tertiary
    strong        focus(绿)              border:
    background:   background:            --color-
    --color-      --color-bg-            border-
    bg-hover      hover                  light
    
        │             │                       │
        └─────────────┼───────────────────────┘
                      │
                      ▼
                   ACTIVE
                  (点击中)
                  transform:
                  scale(0.98)
                  box-shadow:
                  inset 0 2px 4px rgba(...)
```

### 状态矩阵

对于所有交互组件，定义标准的状态属性变化：

| 状态 | 背景色 | 边框 | 文字色 | 光标 | 其他 |
|------|------|------|------|------|------|
| **Default** | primary | normal | primary | auto | - |
| **Hover** | hover | strong | primary | pointer | shadow+, opacity+ |
| **Focus** | hover | focus(绿) | primary | auto | outline: 2px |
| **Active** | selected | focus | primary | auto | scale: 0.98 |
| **Disabled** | tertiary | light | disabled | not-allowed | opacity: 0.6 |
| **Loading** | primary | normal | primary | wait | spinner animation |
| **Error** | error-light | error(红) | error | auto | error icon |
| **Success** | success-light | success(绿) | success | auto | success icon |

---

## 按钮交互

### 按钮类型规范

#### 1. **主按钮**（Primary Button）

常用于主要操作（新增、保存、提交）。

```css
.jh-button--primary {
  background: var(--color-success);
  border: 1px solid var(--color-success);
  color: white;
  padding: 6px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-base) var(--easing-standard);
  
  /* 默认状态 */
  &:not(:disabled) {
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.016);
  }
  
  /* Hover */
  &:hover:not(:disabled) {
    background: var(--color-success-darker);
    border-color: var(--color-success-darker);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  }
  
  /* Focus */
  &:focus:not(:disabled) {
    outline: 2px solid var(--color-success);
    outline-offset: 2px;
  }
  
  /* Active */
  &:active:not(:disabled) {
    transform: scale(0.98);
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05);
  }
  
  /* Disabled */
  &:disabled {
    background: var(--color-bg-tertiary);
    border-color: var(--color-border-light);
    color: var(--color-text-disabled);
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  /* Loading */
  &.is-loading {
    position: relative;
    color: transparent;
    
    &::after {
      content: '';
      position: absolute;
      width: 12px;
      height: 12px;
      top: 50%;
      left: 50%;
      margin: -6px 0 0 -6px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
  }
}
```

#### 2. **次按钮**（Secondary Button）

常用于次要操作（取消、返回、关闭）。

```css
.jh-button--secondary {
  background: white;
  border: 1px solid var(--color-border-normal);
  color: var(--color-text-primary);
  padding: 6px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-base) var(--easing-standard);
  
  /* Hover */
  &:hover:not(:disabled) {
    background: var(--color-bg-secondary);
    border-color: var(--color-border-strong);
    color: var(--color-success);
  }
  
  /* Focus */
  &:focus:not(:disabled) {
    border-color: var(--color-success);
    background: var(--color-bg-hover);
    outline: none;
  }
  
  /* Active */
  &:active:not(:disabled) {
    background: var(--color-bg-tertiary);
    transform: scale(0.98);
  }
  
  /* Disabled */
  &:disabled {
    background: var(--color-bg-tertiary);
    border-color: var(--color-border-light);
    color: var(--color-text-disabled);
    cursor: not-allowed;
  }
}
```

#### 3. **危险按钮**（Danger Button）

常用于删除、清空等危险操作。

```css
.jh-button--danger {
  background: white;
  border: 1px solid var(--color-error);
  color: var(--color-error);
  padding: 6px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-base) var(--easing-standard);
  
  /* Hover - 变成填充 */
  &:hover:not(:disabled) {
    background: var(--color-error);
    border-color: var(--color-error);
    color: white;
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
  }
  
  /* Focus */
  &:focus:not(:disabled) {
    outline: 2px solid var(--color-error);
    outline-offset: 2px;
  }
  
  /* Active */
  &:active:not(:disabled) {
    transform: scale(0.98);
  }
  
  /* Disabled */
  &:disabled {
    background: var(--color-bg-tertiary);
    border-color: var(--color-border-light);
    color: var(--color-text-disabled);
    cursor: not-allowed;
  }
}
```

#### 4. **文字按钮**（Text Button）

常用于辅助操作、链接。

```css
.jh-button--text {
  background: transparent;
  border: none;
  color: var(--color-success);
  padding: 6px 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-base) var(--easing-standard);
  
  /* Hover */
  &:hover:not(:disabled) {
    background: var(--color-bg-hover);
    color: var(--color-success-darker);
    text-decoration: underline;
  }
  
  /* Focus */
  &:focus:not(:disabled) {
    outline: 2px solid var(--color-success);
    outline-offset: 2px;
    background: var(--color-bg-hover);
  }
  
  /* Active */
  &:active:not(:disabled) {
    color: var(--color-success-darker);
    transform: scale(0.98);
  }
  
  /* Disabled */
  &:disabled {
    color: var(--color-text-disabled);
    cursor: not-allowed;
  }
}
```

### 按钮尺寸

| 尺寸 | 高度 | padding | 字体 | 应用场景 |
|------|------|--------|------|--------|
| **大** (lg) | 40px | 8px 24px | 16px | 主要CTA |
| **中** (md) | 36px | 6px 16px | 14px | 标准按钮（默认） |
| **小** (sm) | 32px | 4px 12px | 14px | 表格操作、工具栏 |
| **极小** (xs) | 24px | 2px 8px | 12px | 内联操作、标签 |

```css
.jh-button--lg { height: 40px; padding: 8px 24px; }
.jh-button--sm { height: 32px; padding: 4px 12px; }
.jh-button--xs { height: 24px; padding: 2px 8px; }
```

---

## 输入框交互

### 输入框状态流转

```css
/* 基础输入框 */
.jh-input {
  width: 100%;
  height: 36px;
  padding: 8px 12px;
  border: 1px solid var(--color-border-normal);
  border-radius: 4px;
  background: var(--color-bg-primary);
  font-size: 14px;
  color: var(--color-text-primary);
  font-family: inherit;
  transition: all var(--transition-base) var(--easing-standard);
  
  /* 占位符 */
  &::placeholder {
    color: var(--color-text-tertiary);
  }
  
  /* 1. Default 状态 */
  /* 上面已定义 */
  
  /* 2. Hover 状态 */
  &:hover:not(:disabled):not(:focus) {
    border-color: var(--color-border-strong);
    background: var(--color-bg-secondary);
  }
  
  /* 3. Focus 状态 */
  &:focus {
    border-color: var(--color-border-focus);
    background: var(--color-bg-hover);
    outline: none;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
  
  /* 4. Disabled 状态 */
  &:disabled {
    background: var(--color-bg-tertiary);
    border-color: var(--color-border-light);
    color: var(--color-text-disabled);
    cursor: not-allowed;
    
    &::placeholder {
      color: var(--color-text-disabled);
    }
  }
  
  /* 5. Error 状态 */
  &.is-error {
    border-color: var(--color-error);
    background: var(--color-error-light);
    
    &:focus {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
  }
  
  /* 6. Success 状态 */
  &.is-success {
    border-color: var(--color-success);
    background: var(--color-bg-hover);
    
    &:focus {
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
    }
  }
  
  /* 7. Loading 状态 */
  &.is-loading {
    background: var(--color-bg-secondary);
    pointer-events: none;
  }
}
```

### 输入框前后缀

```css
.jh-input-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  
  /* 前缀图标 */
  .input-prefix {
    position: absolute;
    left: 8px;
    color: var(--color-text-tertiary);
    pointer-events: none;
    
    & + input {
      padding-left: 32px;
    }
  }
  
  /* 后缀图标/清除按钮 */
  .input-suffix {
    position: absolute;
    right: 8px;
    color: var(--color-text-tertiary);
    cursor: pointer;
    transition: color var(--transition-base) var(--easing-standard);
    
    &:hover {
      color: var(--color-text-primary);
    }
    
    & + input {
      padding-right: 32px;
    }
  }
}
```

### 文本域交互

```css
.jh-textarea {
  width: 100%;
  min-height: 80px;
  padding: 12px;
  border: 1px solid var(--color-border-normal);
  border-radius: 4px;
  background: var(--color-bg-primary);
  font-size: 14px;
  font-family: inherit;
  line-height: 1.57;
  resize: vertical;
  transition: all var(--transition-base) var(--easing-standard);
  
  /* 与输入框相同的状态 */
  
  /* Focus */
  &:focus {
    border-color: var(--color-border-focus);
    background: var(--color-bg-hover);
    outline: none;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
  
  /* 字符计数 */
  & + .char-count {
    text-align: right;
    font-size: 12px;
    color: var(--color-text-tertiary);
    margin-top: 4px;
    
    &.exceed {
      color: var(--color-error);
    }
  }
}
```

---

## 表格行交互

### 行状态管理

```css
.jh-table tbody tr {
  transition: all var(--transition-base) var(--easing-standard);
  
  /* 1. Default - 白色/浅灰 */
  background: var(--color-bg-primary);
  border-bottom: 1px solid var(--color-border-light);
  
  /* 奇数行斑马纹 */
  &:nth-child(odd) {
    background: var(--color-bg-secondary);
  }
  
  /* 2. Hover */
  &:hover {
    background: var(--color-bg-hover);
    cursor: pointer;
  }
  
  /* 3. Selected */
  &.selected {
    background: var(--color-bg-selected);
    border-left: 4px solid var(--color-success);
  }
  
  /* 4. Selected + Hover */
  &.selected:hover {
    background: var(--color-bg-selected-hover);
  }
  
  /* 5. Disabled */
  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    
    td {
      color: var(--color-text-disabled);
    }
  }
  
  /* 6. Expanded（展开详情） */
  &.expanded {
    border-bottom-width: 2px;
    border-bottom-color: var(--color-border-focus);
    
    & + tr.expand-content {
      background: var(--color-bg-secondary);
      border-bottom: 2px solid var(--color-border-focus);
      
      td {
        padding: var(--spacing-lg);
      }
    }
  }
}
```

### 表格操作列

```css
.jh-table-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: 0;
  transition: opacity var(--transition-base) var(--easing-standard);
  
  /* Hover时显示操作按钮 */
  tbody tr:hover & {
    opacity: 1;
  }
  
  /* 操作按钮 */
  .action-btn {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: all var(--transition-base) var(--easing-standard);
    background: transparent;
    border: none;
    
    /* 编辑 - 绿色 */
    &.edit {
      color: var(--color-success);
      
      &:hover {
        background: var(--color-bg-hover);
        color: var(--color-success-darker);
      }
    }
    
    /* 删除 - 红色 */
    &.delete {
      color: var(--color-error);
      
      &:hover {
        background: var(--color-error-light);
        color: var(--color-error-darker);
      }
    }
    
    /* 查看 - 蓝色 */
    &.view {
      color: var(--color-info);
      
      &:hover {
        background: var(--color-info-light);
        color: var(--color-info-darker);
      }
    }
  }
}
```

---

## 卡片交互

### 卡片Hover效果

```css
.jh-card {
  transition: all var(--transition-base) var(--easing-standard);
  box-shadow: var(--shadow-md);
  
  /* 1. Default */
  border: 1px solid var(--color-border-normal);
  background: var(--color-bg-primary);
  
  /* 2. Hover - 可交互卡片 */
  &:hover {
    box-shadow: var(--shadow-lg);
    border-color: var(--color-border-strong);
    
    &.clickable {
      cursor: pointer;
      transform: translateY(-2px);
    }
  }
  
  /* 3. Active - 点击态 */
  &.active {
    border-color: var(--color-success);
    background: var(--color-bg-hover);
  }
  
  /* 4. Selected - 选中态 */
  &.selected {
    border: 2px solid var(--color-success);
    background: var(--color-bg-selected);
  }
  
  /* 5. Disabled */
  &.disabled {
    opacity: 0.6;
    background: var(--color-bg-tertiary);
    cursor: not-allowed;
    
    &:hover {
      box-shadow: var(--shadow-md);
      border-color: var(--color-border-normal);
      transform: none;
    }
  }
  
  /* 6. Loading */
  &.loading {
    pointer-events: none;
    opacity: 0.7;
  }
}
```

---

## 菜单/下拉交互

### 下拉菜单

```css
.jh-dropdown {
  position: relative;
  display: inline-block;
  
  /* 触发按钮 */
  .dropdown-trigger {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    transition: all var(--transition-base) var(--easing-standard);
    
    &:hover {
      background: var(--color-bg-secondary);
    }
    
    &.open {
      background: var(--color-bg-hover);
      color: var(--color-success);
      
      .trigger-arrow {
        transform: rotate(180deg);
      }
    }
  }
  
  /* 下拉菜单 */
  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 8px;
    min-width: 160px;
    background: var(--color-bg-primary);
    border: 1px solid var(--color-border-normal);
    border-radius: 8px;
    box-shadow: var(--shadow-lg);
    overflow: hidden;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-8px);
    transition: all var(--transition-base) var(--easing-standard);
    
    /* 打开状态 */
    &.open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
  }
  
  /* 菜单项 */
  .menu-item {
    padding: var(--spacing-md) var(--spacing-lg);  /* 12px 16px */
    font-size: 14px;
    color: var(--color-text-primary);
    cursor: pointer;
    transition: all var(--transition-base) var(--easing-standard);
    display: flex;
    align-items: center;
    gap: 8px;
    
    /* Hover */
    &:hover {
      background: var(--color-bg-hover);
      color: var(--color-success);
      padding-left: 20px;
    }
    
    /* Selected */
    &.selected {
      background: var(--color-bg-selected);
      color: var(--color-success);
      font-weight: 500;
    }
    
    /* Disabled */
    &.disabled {
      color: var(--color-text-disabled);
      cursor: not-allowed;
      
      &:hover {
        background: transparent;
        padding-left: 16px;
      }
    }
    
    /* 分割线 */
    &.divider {
      height: 1px;
      background: var(--color-border-light);
      cursor: auto;
      padding: 0;
      
      &:hover {
        background: var(--color-border-light);
      }
    }
  }
}
```

---

## 动效规范

### 加载动画

#### Spinner 加载

```css
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid var(--color-border-light);
  border-top-color: var(--color-success);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
```

#### 脉冲加载

```css
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.pulse-loader {
  animation: pulse 1.5s var(--easing-ease-in-out) infinite;
}
```

#### 骨架屏动画

```css
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-bg-secondary),
    var(--color-bg-tertiary),
    var(--color-bg-secondary)
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
  border-radius: 4px;
}
```

### 展开/收缩动画

```css
@keyframes slideDown {
  from {
    max-height: 0;
    opacity: 0;
    overflow: hidden;
  }
  to {
    max-height: 500px;
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    max-height: 500px;
    opacity: 1;
    overflow: hidden;
  }
  to {
    max-height: 0;
    opacity: 0;
  }
}

.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height var(--transition-slow) var(--easing-standard);
  
  &.open {
    max-height: 500px;
  }
}
```

### 淡入淡出

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.fade-enter {
  animation: fadeIn var(--transition-base) var(--easing-standard);
}

.fade-leave {
  animation: fadeOut var(--transition-base) var(--easing-standard);
}
```

### 滑动进入

```css
@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideInUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.slide-enter-left {
  animation: slideInLeft var(--transition-slow) var(--easing-standard);
}

.slide-enter-right {
  animation: slideInRight var(--transition-slow) var(--easing-standard);
}

.slide-enter-up {
  animation: slideInUp var(--transition-slow) var(--easing-standard);
}
```

### 缩放动画

```css
@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.scale-enter {
  animation: scaleIn var(--transition-base) var(--easing-standard);
}
```

---

## 过渡曲线

### 缓动函数矩阵

| 函数 | 值 | 应用场景 | 说明 |
|------|-----|--------|------|
| **Linear** | `linear` | 连续动画 | 旋转、进度条 |
| **Ease** | `ease` | 一般过渡 | 默认缓动 |
| **Ease-in** | `ease-in` | 进入 | 加速进入 |
| **Ease-out** | `ease-out` | 退出 | 减速退出 |
| **Ease-in-out** | `ease-in-out` | 双向 | 进入和退出都有缓动 |
| **Material Standard** | `cubic-bezier(0.4, 0, 0.2, 1)` | 高级 UI | Material Design推荐 |
| **Material Accelerate** | `cubic-bezier(0.4, 0, 1, 1)` | 加速 | 元素离开视图 |
| **Material Decelerate** | `cubic-bezier(0, 0, 0.2, 1)` | 减速 | 元素进入视图 |

### 使用规范

```css
/* 标准过渡 - 使用 Material Standard */
.component {
  transition: all var(--transition-base) var(--easing-standard);
}

/* 进入动画 - 使用 Decelerate */
.enter {
  animation: slideInUp var(--transition-slow) var(--easing-decelerate);
}

/* 退出动画 - 使用 Accelerate */
.leave {
  animation: slideOutDown var(--transition-slow) var(--easing-accelerate);
}

/* 连续旋转 - 使用 Linear */
.spin {
  animation: spin 0.8s linear infinite;
}
```

---

## 键盘导航

### Tab焦点样式

所有可交互组件都必须支持 Tab 键导航，并显示清晰的焦点指示：

```css
/* 通用焦点样式 */
*:focus-visible {
  outline: 2px solid var(--color-success);
  outline-offset: 2px;
}

/* 按钮焦点 */
.jh-button:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

/* 输入框焦点 */
.jh-input:focus {
  outline: none;
  border-color: var(--color-border-focus);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

/* 表格行焦点 */
.jh-table tbody tr:focus-visible {
  outline: 2px solid var(--color-success);
  outline-offset: -1px;
}

/* 菜单项焦点 */
.menu-item:focus-visible {
  outline: 2px solid var(--color-success);
  outline-offset: -4px;
}
```

### 焦点陷阱管理

对话框/模态框中的 Tab 焦点应该被限制在组件内部：

```javascript
// 焦点陷阱（Pseudo Code）
handleKeyDown(event) {
  if (event.key === 'Tab') {
    const focusableElements = modal.querySelectorAll(
      'button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (event.shiftKey) {
      // Shift+Tab
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }
}
```

### 快捷键规范

定义全局快捷键以提升用户效率：

| 快捷键 | 功能 | 优先级 |
|-------|------|------|
| `Ctrl/Cmd + S` | 保存 | 高 |
| `Ctrl/Cmd + Enter` | 提交 | 高 |
| `Escape` | 关闭对话框 | 高 |
| `Ctrl/Cmd + K` | 搜索/命令 | 中 |
| `Ctrl/Cmd + Z` | 撤销 | 中 |
| `Ctrl/Cmd + Shift + Z` | 重做 | 中 |

---

## 可访问性

### 颜色对比度

确保所有文字颜色组合符合 WCAG AA 标准（最小 4.5:1）：

```css
/* ✅ PASS: 对比度 14.87:1 (AAA) */
.text-primary {
  color: rgba(0, 0, 0, 0.85);
  background: white;
}

/* ✅ PASS: 对比度 7.13:1 (AAA) */
.text-secondary {
  color: rgba(0, 0, 0, 0.65);
  background: white;
}

/* ✅ PASS: 对比度 4.55:1 (AA) */
.text-tertiary {
  color: rgba(0, 0, 0, 0.45);
  background: white;
}

/* ❌ FAIL: 对比度 2.49:1 (太低) */
.text-disabled {
  color: rgba(0, 0, 0, 0.28);
  background: white;
  /* 仅用于禁用状态，可接受 */
}
```

### ARIA 标签

为所有交互元素添加适当的 ARIA 标签：

```html
<!-- 按钮 -->
<button aria-label="保存">💾</button>

<!-- 输入框标签关联 -->
<label for="username">用户名</label>
<input id="username" type="text" />

<!-- 必填字段 -->
<input aria-required="true" />

<!-- 禁用状态 -->
<button aria-disabled="true" disabled>删除</button>

<!-- 加载状态 -->
<button aria-busy="true">
  <span aria-label="加载中..."></span>
</button>

<!-- 下拉菜单 -->
<button aria-haspopup="true" aria-expanded="false">
  选项
</button>

<!-- 表单错误 -->
<input aria-invalid="true" aria-describedby="error-msg" />
<span id="error-msg">必须输入邮箱地址</span>

<!-- 表格 -->
<table role="table">
  <thead role="rowgroup">
    <tr role="row">
      <th role="columnheader">姓名</th>
    </tr>
  </thead>
</table>

<!-- 对话框 -->
<div role="dialog" aria-labelledby="modal-title" aria-modal="true">
  <h2 id="modal-title">确认删除？</h2>
</div>

<!-- 加载框 -->
<div role="status" aria-live="polite">
  加载中...
</div>
```

### 触摸目标尺寸

所有可交互元素的最小尺寸应为 44×44px（或 48×48px），确保移动设备上易于点击：

```css
/* ✅ 符合规范（44×44px） */
.jh-button {
  min-width: 44px;
  min-height: 44px;
  padding: 8px 16px;  /* 确保内容充满 */
}

/* ✅ 符合规范（48×48px） */
.jh-icon-button {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ❌ 不符合规范（太小） */
.close-button {
  width: 20px;
  height: 20px;  /* 太小 */
  /* 需要增大 */
}
```

### 动画减速首选项

遵守用户的动画首选项，对于启用"减少运动"的用户，应禁用或简化动画：

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 文本替代

为图标、图像等提供文本替代：

```html
<!-- 图标 with aria-label -->
<i class="icon-edit" aria-label="编辑"></i>

<!-- 图像 with alt -->
<img src="logo.png" alt="公司LOGO" />

<!-- 纯装饰图像 -->
<img src="divider.png" alt="" aria-hidden="true" />

<!-- 按钮只有图标 -->
<button aria-label="删除该项目">
  <i class="icon-trash"></i>
</button>
```

---

## 最佳实践总结

1. ✅ **所有过渡都应该 > 150ms，< 500ms**
2. ✅ **使用 Material Design 标准曲线**
3. ✅ **提供清晰的焦点指示**
4. ✅ **支持键盘导航**
5. ✅ **确保颜色对比度达标**
6. ✅ **触摸目标不小于 44×44px**
7. ✅ **为图标/图像提供文本替代**
8. ✅ **支持减少运动首选项**
9. ✅ **为所有状态变化提供过渡**
10. ✅ **在移动端测试所有交互**

