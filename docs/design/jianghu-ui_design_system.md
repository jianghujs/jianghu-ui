# 江湖UI 完整设计系统规范

> **版本**: 1.0  
> **最后更新**: 2025年2月  
> **适用范围**: 全部34个组件库  
> **技术栈**: Vue 2.7 + Vuetify 2.x + Tailwind CSS

---

## 📋 目录

1. [设计系统概述](#设计系统概述)
2. [色彩系统](#色彩系统)
3. [字体系统](#字体系统)
4. [间距系统](#间距系统)
5. [圆角系统](#圆角系统)
6. [阴影系统](#阴影系统)
7. [边框系统](#边框系统)
8. [密度系统](#密度系统)
9. [响应式设计](#响应式设计)
10. [动效与过渡](#动效与过渡)

---

## 设计系统概述

### 设计原则

江湖UI设计系统遵循以下核心原则：

1. **一致性** - 所有组件使用统一的设计令牌，保证视觉和交互一致
2. **可预测性** - 清晰的规范，让开发者能快速、正确地使用组件
3. **灵活性** - 支持多种场景（移动端、平板、桌面），同时保持核心规范
4. **可达性** - 满足WCAG AA标准，确保无障碍访问
5. **可维护性** - 采用CSS变量和模块化结构，便于长期维护和升级

### 设计系统构成

```
设计系统
├── 色彩系统（语义色、功能色、中性色）
├── 字体系统（6个级别、字重、行高）
├── 间距系统（基础4px的倍数）
├── 圆角系统（4个规范值）
├── 阴影系统（4个深度层级）
├── 边框系统（边框宽度、颜色、样式）
├── 密度系统（3个密度级别）
├── 响应式规则（4个断点）
└── 动效系统（过渡、动画）
```

---

## 色彩系统

### 颜色调色板

#### 1. **语义色** - 业务含义明确的颜色

| 色系 | 基础色值 | RGB值 | 应用场景 | 说明 |
|------|--------|------|--------|------|
| **成功** | `#10B981` | rgb(16, 185, 129) | 新增、成功、正常状态 | 低饱和绿色，企业级友好 |
| **警告** | `#F59E0B` | rgb(245, 158, 11) | 警告、提示、需要注意 | 柔和金黄色 |
| **错误** | `#EF4444` | rgb(239, 68, 68) | 删除、错误、危险操作 | 适度红色，不过度鲜艳 |
| **信息** | `#3B82F6` | rgb(59, 130, 246) | 信息、辅助操作 | 柔和蓝色 |

```css
/* CSS变量定义 */
:root {
  --color-success: #10B981;
  --color-success-light: #D1FAE5;
  --color-success-darker: #059669;
  
  --color-warning: #F59E0B;
  --color-warning-light: #FEF3C7;
  --color-warning-darker: #D97706;
  
  --color-error: #EF4444;
  --color-error-light: #FEE2E2;
  --color-error-darker: #DC2626;
  
  --color-info: #3B82F6;
  --color-info-light: #DBEAFE;
  --color-info-darker: #1D4ED8;
}
```

#### 2. **中性色** - 文字、背景、边框

| 等级 | 颜色值 | 说明 | 应用场景 |
|------|------|------|--------|
| **文字-主要** | `rgba(0, 0, 0, 0.85)` | 高对比度，最常用 | 标题、主要内容、按钮文字 |
| **文字-次要** | `rgba(0, 0, 0, 0.65)` | 次级内容 | 二级标题、描述文字、标签 |
| **文字-第三** | `rgba(0, 0, 0, 0.45)` | 辅助说明 | 帮助文字、占位符、补充信息 |
| **文字-禁用** | `rgba(0, 0, 0, 0.28)` | 最弱对比 | 禁用状态的文字 |
| **文字-反色** | `rgba(255, 255, 255, 1)` | - | 深色背景上的文字 |

```css
:root {
  --color-text-primary: rgba(0, 0, 0, 0.85);
  --color-text-secondary: rgba(0, 0, 0, 0.65);
  --color-text-tertiary: rgba(0, 0, 0, 0.45);
  --color-text-disabled: rgba(0, 0, 0, 0.28);
  --color-text-inverse: rgba(255, 255, 255, 1);
}
```

#### 3. **背景色** - 容器、填充、交互反馈

| 背景 | 颜色值 | 说明 | 应用场景 |
|------|------|------|--------|
| **背景-主体** | `#FFFFFF` | 最亮 | 主容器、卡片、表单 |
| **背景-次级** | `#FBFBFB` | 浅灰 | 表格表头、工具栏背景 |
| **背景-第三** | `#F2F2F2` | 中灰 | 禁用状态、轻量容器 |
| **背景-Hover** | `#EEF7ED` | 绿色底 | 输入框hover、列表项hover |
| **背景-选中** | `#E6F7FF` | 蓝色底 | 表格选中行 |
| **背景-选中Hover** | `#D1EDFF` | 更深蓝 | 选中行hover |
| **背景-反色** | `#1F2937` | 深灰/黑 | 深色模式（预留） |

```css
:root {
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #FBFBFB;
  --color-bg-tertiary: #F2F2F2;
  --color-bg-hover: #EEF7ED;
  --color-bg-selected: #E6F7FF;
  --color-bg-selected-hover: #D1EDFF;
  --color-bg-dark: #1F2937;
  
  /* 深色背景文字 */
  --color-bg-dark-text: rgba(255, 255, 255, 0.87);
}
```

#### 4. **边框色** - 分割线、边框

| 等级 | 颜色值 | 说明 | 应用场景 |
|------|------|------|--------|
| **边框-浅** | `rgba(0, 0, 0, 0.06)` | 极淡，近似无 | 细微分割、虚弱分界 |
| **边框-标准** | `rgba(0, 0, 0, 0.12)` | 标准边框 | 输入框、卡片、表单边框 |
| **边框-强** | `#E5E7EB` 或 `#E8E8E8` | 明显边框 | 强调分割、主要结构线 |
| **边框-焦点** | `--color-success` | 语义色 | 获焦状态的边框 |

```css
:root {
  --color-border-light: rgba(0, 0, 0, 0.06);
  --color-border-normal: rgba(0, 0, 0, 0.12);
  --color-border-strong: #E5E7EB;
  --color-border-focus: var(--color-success);
}
```

### 颜色使用规范

#### 文字颜色矩阵

| 场景 | 颜色变量 | 备注 |
|------|--------|------|
| 标题（H1-H3） | `--color-text-primary` | 权重最高 |
| 内容文字 | `--color-text-primary` | 主体内容 |
| 二级标题 | `--color-text-secondary` | 重要性次级 |
| 图标（操作） | `--color-text-secondary` | 配合主色使用 |
| 提示文字 | `--color-text-tertiary` | 补充说明 |
| 占位符 | `--color-text-tertiary` | 输入框占位 |
| 禁用文字 | `--color-text-disabled` | 禁用状态 |
| 时间戳 | `--color-text-tertiary` | 时间信息 |
| 标签/徽章 | `--color-text-secondary` | 小型标识 |

#### 背景颜色矩阵

| 场景 | 颜色变量 | 备注 |
|------|--------|------|
| 页面背景 | `--color-bg-primary` | 最常用 |
| 表格表头 | `--color-bg-secondary` | 浅灰，易区分 |
| 表格奇数行 | `--color-bg-secondary` | 斑马纹 |
| 表格偶数行 | `--color-bg-primary` | 白色 |
| 卡片背景 | `--color-bg-primary` | 默认白 |
| 工具栏 | `--color-bg-secondary` | 浅灰背景 |
| 禁用输入框 | `--color-bg-tertiary` | 浅灰禁用态 |
| 输入框Hover | `--color-bg-hover` | 绿色底提示 |
| 选中行 | `--color-bg-selected` | 蓝色底 |
| 选中行Hover | `--color-bg-selected-hover` | 更深的蓝 |

#### 边框颜色矩阵

| 场景 | 颜色变量 | 说明 |
|------|--------|------|
| 虚弱分割线 | `--color-border-light` | 表格内行分割 |
| 标准边框 | `--color-border-normal` | 输入框、卡片 |
| 强分割线 | `--color-border-strong` | 主要结构线 |
| 焦点状态 | `--color-border-focus` | 获焦的绿色边 |
| 错误状态 | `--color-error` | 校验失败显红 |
| 警告状态 | `--color-warning` | 需要注意 |

### 对比度规范（WCAG AA）

所有文字颜色组合必须满足最小对比度：

| 对比度 | 要求 | 应用 |
|------|------|------|
| **≥ 7:1** | AAA等级（最高） | 所有标题、主体文字 |
| **≥ 4.5:1** | AA等级（推荐） | 次要文字、按钮 |
| **≥ 3:1** | AA大文字 | 18pt以上的文字 |

**常见组合检查**:
- `rgba(0,0,0,0.85)` on `#FFFFFF`: **对比度 14.87:1** ✅ AAA
- `rgba(0,0,0,0.65)` on `#FFFFFF`: **对比度 7.13:1** ✅ AAA
- `rgba(0,0,0,0.45)` on `#FFFFFF`: **对比度 4.55:1** ✅ AA
- `rgba(0,0,0,0.28)` on `#FFFFFF`: **对比度 2.49:1** ❌（仅用于禁用）

---

## 字体系统

### 字体栈定义

```css
:root {
  /* 不同平台的字体回退方案 */
  --font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --font-family-mono: 'Monaco', 'Courier New', monospace;
}

body {
  font-family: var(--font-family-base);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### 字体等级系统

共 6 个等级，每级定义 font-size、font-weight、line-height：

#### **H1 - 超大标题**
- **用途**: 页面主标题、大型弹窗标题
- **尺寸**: 20px
- **字重**: 600
- **行高**: 1.4（28px）
- **字间距**: 0

```css
.text-h1 {
  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
}
```

#### **H2 - 大标题**
- **用途**: 模块标题、卡片标题、表单组标题
- **尺寸**: 18px
- **字重**: 600
- **行高**: 1.33（24px）
- **字间距**: 0

```css
.text-h2 {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.33;
}
```

#### **H3 - 中等标题**
- **用途**: 小标题、表格表头、卡片小标题
- **尺寸**: 16px
- **字重**: 600
- **行高**: 1.5（24px）
- **字间距**: 0

```css
.text-h3 {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
}
```

#### **Body - 正文**（默认）
- **用途**: 主体内容、表格数据、描述文字
- **尺寸**: 14px
- **字重**: 400（正常）
- **行高**: 1.57（22px）
- **字间距**: 0.5px

```css
.text-body, body {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.57;
  letter-spacing: 0.5px;
}
```

#### **Small - 小文本**
- **用途**: 标签、辅助说明、时间戳、备注
- **尺寸**: 12px
- **字重**: 400
- **行高**: 1.67（20px）
- **字间距**: 0.4px

```css
.text-small {
  font-size: 12px;
  font-weight: 400;
  line-height: 1.67;
  letter-spacing: 0.4px;
}
```

#### **Caption - 极小文本**
- **用途**: 微小标签、图片描述、版本号
- **尺寸**: 11px
- **字重**: 400
- **行高**: 1.45（16px）
- **字间距**: 0.3px

```css
.text-caption {
  font-size: 11px;
  font-weight: 400;
  line-height: 1.45;
  letter-spacing: 0.3px;
}
```

### 字重规范

| 字重值 | 名称 | 应用场景 |
|------|------|--------|
| **400** | Regular | 正文、描述、内容 |
| **500** | Medium | 强调、标签、次要标题 |
| **600** | SemiBold | 标题、重要标签 |
| **700** | Bold | 超级强调（谨慎使用） |

**规范**:
- 正文内容必须用 400
- 标题默认用 600
- 标签可用 500
- 避免使用 700 除非特别强调

### 字体应用矩阵

| 场景 | 等级 | 字重 | 颜色 | 行高 |
|------|------|------|------|------|
| 页面标题 | H1 | 600 | `--color-text-primary` | 1.4 |
| 模块标题 | H2 | 600 | `--color-text-primary` | 1.33 |
| 卡片标题 | H3 | 600 | `--color-text-primary` | 1.5 |
| 表格表头 | H3 | 600 | `--color-text-primary` | 1.5 |
| 主体内容 | Body | 400 | `--color-text-primary` | 1.57 |
| 二级内容 | Body | 400 | `--color-text-secondary` | 1.57 |
| 按钮文字 | Body | 500 | 取决于样式 | 1.57 |
| 标签 | Small | 500 | `--color-text-secondary` | 1.67 |
| 帮助文字 | Small | 400 | `--color-text-tertiary` | 1.67 |
| 占位符 | Small | 400 | `--color-text-tertiary` | 1.67 |
| 时间戳 | Small | 400 | `--color-text-tertiary` | 1.67 |

---

## 间距系统

### 间距基础单位

采用 **8px 基础单位**，所有间距均为 8 的倍数：

```css
:root {
  /* 基础间距（4px倍数系统） */
  --spacing-xs: 4px;   /* 1 */
  --spacing-sm: 8px;   /* 2 */
  --spacing-md: 12px;  /* 3 */
  --spacing-lg: 16px;  /* 4 */
  --spacing-xl: 24px;  /* 6 */
  --spacing-2xl: 32px; /* 8 */
  --spacing-3xl: 40px; /* 10 */
  --spacing-4xl: 48px; /* 12 */
}
```

### 间距应用规范

#### 1. **Padding**（内边距）

| 场景 | 值 | 说明 |
|------|---|----|
| 按钮（竖向） | 6px | 上下 |
| 按钮（横向） | 16px | 左右 |
| 输入框（竖向） | 8px | 上下 |
| 输入框（横向） | 12px | 左右 |
| 卡片（竖向） | 16-24px | 大卡片24px |
| 卡片（横向） | 16-24px | 大卡片24px |
| 表单组 | 16px | 组内上下间距 |
| 表格行 | 8px | 表格单元格内 |
| 容器（大） | 24px | 模块容器 |
| 容器（小） | 16px | 次级容器 |

```css
/* 应用示例 */
.jh-button {
  padding: 6px 16px;  /* v-padding, h-padding */
}

.jh-input {
  padding: 8px 12px;
}

.jh-card {
  padding: 24px;      /* 大卡片 */
  &.is-small {
    padding: 16px;    /* 小卡片 */
  }
}

.jh-form-group {
  margin-bottom: var(--spacing-lg);  /* 16px */
  padding: 0 var(--spacing-lg);      /* 16px */
}
```

#### 2. **Margin**（外边距）

| 场景 | 值 | 说明 |
|------|---|----|
| 相邻元素（竖向） | 8px | 默认间距 |
| 相邻元素（横向） | 8px | 默认间距 |
| 模块间距 | 24px | 大模块间 |
| 组件组间距 | 16px | 组件间 |
| 元素间距 | 4-8px | 紧密元素 |

```css
.jh-component + .jh-component {
  margin-top: var(--spacing-lg);  /* 16px */
}

.jh-module + .jh-module {
  margin-top: var(--spacing-xl);  /* 24px */
}
```

#### 3. **Gap**（Flexbox/Grid间距）

| 场景 | 值 | 说明 |
|------|---|----|
| 按钮组 | 8px | 按钮之间 |
| 标签列 | 8px | 标签之间 |
| 工具栏项 | 8px | 工具项间 |
| 列表项间 | 12px | 列表项间 |
| 表单项间 | 16px | 表单字段间 |
| 栅格列间 | 16px | 栅格系统 |

```css
.jh-button-group {
  display: flex;
  gap: var(--spacing-sm);  /* 8px */
}

.jh-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);  /* 16px */
}

.jh-toolbar {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);  /* 8px */
}
```

### 间距响应式调整

在移动端（< 600px）缩减间距，提高信息密度：

```css
@media (max-width: 600px) {
  :root {
    --spacing-xs: 4px;      /* 保持 */
    --spacing-sm: 6px;      /* 从 8px → 6px */
    --spacing-md: 10px;     /* 从 12px → 10px */
    --spacing-lg: 12px;     /* 从 16px → 12px */
    --spacing-xl: 16px;     /* 从 24px → 16px */
    --spacing-2xl: 24px;    /* 从 32px → 24px */
  }
  
  .jh-card {
    padding: 12px;          /* 从 24px → 12px */
  }
  
  .jh-form-group {
    margin-bottom: var(--spacing-md);  /* 10px */
  }
}
```

### 间距一览表

```
┌─────────────────────────────────────────────────────────┐
│ 间距单位对照表（基础 4px）                               │
├─────────────┬──────┬──────┬──────┬──────┬──────┬────────┤
│ 变量名      │ xs   │ sm   │ md   │ lg   │ xl   │ 2xl    │
├─────────────┼──────┼──────┼──────┼──────┼──────┼────────┤
│ 桌面端      │ 4px  │ 8px  │ 12px │ 16px │ 24px │ 32px   │
│ 移动端      │ 4px  │ 6px  │ 10px │ 12px │ 16px │ 24px   │
└─────────────┴──────┴──────┴──────┴──────┴──────┴────────┘

常用组合：
- 紧凑：xs + md = 4px + 12px
- 标准：sm + lg = 8px + 16px
- 宽松：md + xl = 12px + 24px
```

---

## 圆角系统

### 圆角等级

采用 **4级圆角系统**，从无到有递进：

```css
:root {
  /* 圆角规范 */
  --radius-none: 0;      /* 无圆角 */
  --radius-sm: 4px;      /* 小圆角 */
  --radius-md: 6px;      /* 中圆角 */
  --radius-lg: 8px;      /* 大圆角 */
  --radius-pill: 9999px; /* 胶囊（完全圆形） */
}
```

### 圆角应用规范

| 组件类型 | 圆角值 | 说明 | 示例 |
|--------|------|------|------|
| **基础元素** | 4px | 最常用 | 按钮、输入框、卡片 |
| **按钮** | 4px | 所有按钮统一 | 主按钮、次按钮、危险按钮 |
| **输入框** | 4px | 文本框、选择器 | text-field、select |
| **标签** | 4px | 标签、徽章 | label、badge |
| **菜单项** | 6px | 菜单hover效果 | dropdown menu items |
| **卡片** | 8px | 容器级别 | card、panel、popover |
| **模态框** | 8px | 对话框、抽屉 | modal、drawer |
| **表格** | 8px | 表格容器 | 仅容器 |
| **胶囊形** | 9999px | 特殊形态 | 徽章数字、进度圆 |

### 圆角应用示例

```css
/* 按钮 */
.jh-button {
  border-radius: 4px;
}

/* 输入框 */
.jh-input {
  border-radius: 4px;
}

/* 卡片 */
.jh-card {
  border-radius: 8px;
}

/* 模态框 */
.jh-modal {
  border-radius: 8px;
}

/* 菜单 */
.jh-menu-item:hover {
  border-radius: 6px;
}

/* 标签 */
.jh-tag {
  border-radius: 4px;
}

/* 圆形徽章 */
.jh-badge-circle {
  border-radius: 50%;
  /* 或 */
  border-radius: 9999px;
}
```

### 圆角不应用的地方

- **表格单元格**: 不应用（会破坏表格的严整感）
- **列表项**: 不应用（除非明确的卡片风格）
- **模态框内部区块**: 只有顶级容器应用

---

## 阴影系统

### 阴影等级

采用 **4级阴影体系**，对应不同的视觉深度：

```css
:root {
  /* 阴影规范 - 递进式深度 */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 2px 8px rgba(0, 0, 0, 0.09);
  --shadow-lg: 0 3px 14px 2px rgba(0, 0, 0, 0.08);
  --shadow-xl: 0 10px 30px rgba(0, 0, 0, 0.15);
}
```

### 阴影应用规范

| 阴影类型 | 高度 | 应用场景 | 说明 |
|--------|------|--------|------|
| **无阴影** | 0 | 扁平设计 | 默认卡片、列表项 |
| **极淡阴影** (sm) | 1px | 细微分层 | 表格容器、轻量卡片 |
| **轻阴影** (md) | 2-8px | 标准卡片 | 数据卡片、模块容器 |
| **重阴影** (lg) | 3-14px | 浮层 | 菜单、弹窗、Popover |
| **极重阴影** (xl) | 10-30px | 模态顶层 | 模态框、重要对话框 |

### 阴影应用示例

```css
/* 表格容器 - 极淡阴影 */
.jh-pro-table {
  box-shadow: var(--shadow-sm);
}

/* 卡片 - 轻阴影 */
.jh-card {
  box-shadow: var(--shadow-md);
  
  &:hover {
    box-shadow: var(--shadow-lg);
    transition: box-shadow 0.3s ease;
  }
}

/* 菜单/下拉 - 重阴影 */
.jh-dropdown-menu,
.jh-menu {
  box-shadow: var(--shadow-lg);
}

/* 模态框 - 极重阴影 */
.jh-modal {
  box-shadow: var(--shadow-xl);
}

/* 悬浮按钮 - 重阴影 */
.jh-fab {
  box-shadow: var(--shadow-lg);
  
  &:hover {
    box-shadow: var(--shadow-xl);
  }
}
```

### 阴影转换效果

在 hover、active、focus 状态下平滑转换阴影：

```css
.jh-component {
  box-shadow: var(--shadow-md);
  transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    box-shadow: var(--shadow-lg);
  }
  
  &:active {
    box-shadow: var(--shadow-md);
  }
}
```

---

## 边框系统

### 边框宽度规范

```css
:root {
  /* 边框宽度 */
  --border-width-thin: 1px;   /* 标准边框 */
  --border-width-normal: 1px; /* 同上 */
  --border-width-thick: 2px;  /* 强调边框 */
}
```

**规范**: 
- 所有边框默认 **1px**
- 特殊强调时才用 2px（谨慎使用）
- 避免 3px 以上

### 边框颜色规范

| 边框类型 | 颜色值 | 应用场景 |
|--------|------|--------|
| **默认边框** | `rgba(0, 0, 0, 0.12)` | 输入框、卡片、表单 |
| **浅边框** | `rgba(0, 0, 0, 0.06)` | 虚弱分割、网格 |
| **强边框** | `#E5E7EB` | 主要分割、表格边框 |
| **焦点边框** | `--color-success` | 获焦状态 |
| **错误边框** | `--color-error` | 校验失败 |

### 边框应用示例

```css
/* 标准输入框 */
.jh-input {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  background: #FFFFFF;
  padding: 8px 12px;
  transition: border-color 0.2s ease;
}

/* 输入框 - 焦点 */
.jh-input:focus {
  border-color: var(--color-success);
  outline: none;
}

/* 输入框 - 禁用 */
.jh-input:disabled {
  border-color: rgba(0, 0, 0, 0.06);
  background: var(--color-bg-tertiary);
}

/* 输入框 - 错误 */
.jh-input.is-error {
  border-color: var(--color-error);
}

/* 卡片边框 */
.jh-card {
  border: 1px solid var(--color-border-normal);
  border-radius: 8px;
  background: var(--color-bg-primary);
}

/* 表格边框 */
.jh-table {
  border: 1px solid var(--color-border-strong);
}

.jh-table tbody tr {
  border-bottom: 1px solid var(--color-border-light);
}
```

---

## 密度系统

### 三级密度划分

江湖UI提供 **3个密度级别**，满足不同的信息展示需求：

#### 1. **Default（默认）** - 标准密度

**使用场景**: 大多数情况，平衡内容展示和操作空间

```css
.jh-table.density-default {
  /* 行高 */
  height: 48px;
  
  /* 内边距 */
  padding: 0 16px;
  
  /* 字体 */
  font-size: 14px;
  
  /* 间距 */
  gap: 8px;
  
  /* 列宽 */
  min-width: 80px;
}

.jh-form.density-default {
  gap: 16px;
  
  .jh-form-item {
    padding: 12px 0;
  }
}
```

#### 2. **Medium（中等）** - 紧凑密度

**使用场景**: 需要显示较多数据时，减少纵向空间

```css
.jh-table.density-medium {
  height: 40px;
  padding: 0 12px;
  font-size: 14px;
  gap: 8px;
  min-width: 70px;
}

.jh-form.density-medium {
  gap: 12px;
  
  .jh-form-item {
    padding: 8px 0;
  }
}
```

#### 3. **Compact（紧凑）** - 极限密度

**使用场景**: 大量数据展示，空间受限

```css
.jh-table.density-compact {
  height: 32px;
  padding: 0 8px;
  font-size: 13px;
  gap: 4px;
  min-width: 60px;
}

.jh-form.density-compact {
  gap: 8px;
  
  .jh-form-item {
    padding: 4px 0;
  }
}
```

### 密度响应式调整

移动端应该提升密度（减少间距），以适应小屏幕：

```css
@media (max-width: 600px) {
  .jh-table.density-default {
    height: 44px;    /* 从 48px 缩减 */
    padding: 0 12px; /* 从 16px 缩减 */
    font-size: 13px;
  }
  
  .jh-table.density-medium {
    height: 40px;    /* 保持 */
    padding: 0 10px;
  }
  
  .jh-table.density-compact {
    height: 36px;    /* 从 32px 提升 */
    padding: 0 8px;
  }
}
```

### 密度选择指南

| 指标 | 默认 | 中等 | 紧凑 |
|------|-----|------|-----|
| **行高** | 48px | 40px | 32px |
| **字体** | 14px | 14px | 13px |
| **padding** | 16px | 12px | 8px |
| **gap** | 8px | 8px | 4px |
| **数据量** | < 50 | 50-200 | > 200 |
| **屏幕** | 桌面 | 平板 | 移动 |
| **操作频率** | 高 | 中 | 低 |

---

## 响应式设计

### 断点定义

采用 **Mobile-First** 策略，定义4个主要断点：

```css
/* 断点常量 */
:root {
  /* Vuetify 标准断点 */
  --breakpoint-xs: 0;      /* 极小设备 */
  --breakpoint-sm: 480px;  /* 手机 */
  --breakpoint-md: 768px;  /* 平板 */
  --breakpoint-lg: 1024px; /* 桌面 */
  --breakpoint-xl: 1280px; /* 宽屏 */
  
  /* 常用分界线 */
  --breakpoint-mobile: 600px;    /* 移动/桌面分界 */
  --breakpoint-tablet: 768px;    /* 平板/桌面分界 */
}
```

### 媒体查询规范

```css
/* ===== 移动端优先（Mobile-First） ===== */

/* 基础样式（< 600px） */
.jh-component {
  font-size: 14px;
  padding: 12px 16px;
}

/* 平板及以上 (≥ 600px) */
@media (min-width: 600px) {
  .jh-component {
    font-size: 14px;
    padding: 16px 24px;
  }
}

/* 桌面及以上 (≥ 1024px) */
@media (min-width: 1024px) {
  .jh-component {
    font-size: 14px;
    padding: 16px 24px;
  }
}
```

### 响应式应用矩阵

#### 组件尺寸调整

| 属性 | 移动端 (<600px) | 平板 (600-1024px) | 桌面 (>1024px) |
|------|---------|----------|--------|
| **表格行高** | 44px | 46px | 48px |
| **表格padding** | 12px | 14px | 16px |
| **卡片padding** | 12px | 16px | 24px |
| **字体大小** | 13px | 14px | 14px |
| **按钮高度** | 36px | 36px | 36px |
| **间距** | 12px | 16px | 16px |
| **圆角** | 4px | 4px | 4px |

#### 布局响应

```css
/* 移动端 - 单列 */
@media (max-width: 600px) {
  .jh-form {
    display: flex;
    flex-direction: column;
  }
  
  .jh-form-row {
    display: block;
  }
  
  .jh-form-col {
    width: 100%;
    margin-bottom: var(--spacing-lg);
  }
}

/* 平板 - 两列 */
@media (min-width: 600px) and (max-width: 1024px) {
  .jh-form-col {
    width: 50%;
    float: left;
    padding-right: var(--spacing-lg);
  }
}

/* 桌面 - 自由布局 */
@media (min-width: 1024px) {
  .jh-form-col {
    width: auto;
    display: inline-block;
  }
}
```

#### 显示/隐藏元素

```css
/* 仅在移动端显示 */
.show-mobile-only {
  display: block;
}

@media (min-width: 600px) {
  .show-mobile-only {
    display: none;
  }
}

/* 仅在桌面端显示 */
.show-desktop-only {
  display: none;
}

@media (min-width: 1024px) {
  .show-desktop-only {
    display: block;
  }
}
```

### 响应式工具类

```css
/* Flex 响应式 */
.flex-mobile-vertical {
  display: flex;
  flex-direction: column;
}

@media (min-width: 600px) {
  .flex-mobile-vertical {
    flex-direction: row;
  }
}

/* Grid 响应式 */
.grid-auto {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
}

/* 隐藏溢出文字（响应式） */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 600px) {
  .truncate-mobile {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
```

---

## 动效与过渡

### 过渡时间规范

```css
:root {
  /* 过渡时间（毫秒） */
  --transition-fast: 150ms;   /* 极速 - 快速反馈 */
  --transition-base: 200ms;   /* 标准 - 最常用 */
  --transition-slow: 300ms;   /* 缓慢 - 流畅感 */
  --transition-slower: 500ms; /* 极缓 - 特殊强调 */
}
```

### 缓动函数规范

```css
:root {
  /* 缓动曲线 */
  --easing-linear: linear;
  --easing-ease: ease;
  --easing-ease-in: ease-in;
  --easing-ease-out: ease-out;
  --easing-ease-in-out: ease-in-out;
  
  /* Material Design 标准曲线 */
  --easing-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --easing-decelerate: cubic-bezier(0, 0, 0.2, 1);
  --easing-accelerate: cubic-bezier(0.4, 0, 1, 1);
  --easing-sharp: cubic-bezier(0.4, 0, 0.6, 1);
}
```

### 过渡应用规范

#### 1. **颜色过渡**

```css
.jh-button {
  transition: background-color var(--transition-base) var(--easing-standard),
              color var(--transition-base) var(--easing-standard);
}

.jh-button:hover {
  background-color: var(--color-success-darker);
  color: #FFFFFF;
}
```

#### 2. **阴影过渡**

```css
.jh-card {
  box-shadow: var(--shadow-md);
  transition: box-shadow var(--transition-base) var(--easing-standard);
}

.jh-card:hover {
  box-shadow: var(--shadow-lg);
}
```

#### 3. **位置过渡**

```css
.jh-drawer {
  transform: translateX(-100%);
  transition: transform var(--transition-slow) var(--easing-standard);
}

.jh-drawer.open {
  transform: translateX(0);
}
```

#### 4. **透明度过渡**

```css
.jh-modal-overlay {
  opacity: 0;
  transition: opacity var(--transition-base) var(--easing-standard);
  pointer-events: none;
}

.jh-modal-overlay.open {
  opacity: 1;
  pointer-events: auto;
}
```

#### 5. **大小过渡**

```css
.jh-component {
  transform: scale(1);
  transition: transform var(--transition-fast) var(--easing-standard);
}

.jh-component:active {
  transform: scale(0.98);
}
```

### 常见动效组合

```css
/* 按钮点击动效 */
.jh-button {
  transition: 
    background-color var(--transition-base) var(--easing-standard),
    box-shadow var(--transition-base) var(--easing-standard),
    transform var(--transition-fast) var(--easing-standard);
}

.jh-button:hover {
  background-color: var(--color-success-darker);
  box-shadow: var(--shadow-md);
}

.jh-button:active {
  transform: scale(0.98);
}

/* 列表项悬浮动效 */
.jh-list-item {
  transition:
    background-color var(--transition-base) var(--easing-standard),
    padding-left var(--transition-base) var(--easing-standard);
}

.jh-list-item:hover {
  background-color: var(--color-bg-hover);
  padding-left: var(--spacing-lg);
}

/* 菜单展开动效 */
.jh-menu {
  max-height: 0;
  overflow: hidden;
  transition: max-height var(--transition-slow) var(--easing-standard);
}

.jh-menu.open {
  max-height: 500px;
}
```

### 动画规范

#### 加载动画

```css
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.jh-loading-spinner {
  animation: spin 1s linear infinite;
}
```

#### 脉冲动画

```css
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.jh-skeleton {
  animation: pulse 2s var(--easing-ease-in-out) infinite;
}
```

#### 淡入淡出

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

.jh-modal.enter {
  animation: fadeIn var(--transition-slow) var(--easing-standard);
}
```

#### 滑动展开

```css
@keyframes slideDown {
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 500px;
    opacity: 1;
  }
}

.jh-collapse.open {
  animation: slideDown var(--transition-slow) var(--easing-standard);
}
```

### 减速动效（可访问性）

对于有语言偏好的用户，应支持 `prefers-reduced-motion`：

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

---

## 设计令牌 CSS 变量总览

所有设计系统的规范值都定义为 CSS 变量，便于在全局 CSS 中集中管理：

```css
/* src/style/design-tokens.css */
:root {
  /* ===== 颜色系统 ===== */
  /* 语义色 */
  --color-success: #10B981;
  --color-success-light: #D1FAE5;
  --color-success-darker: #059669;
  --color-warning: #F59E0B;
  --color-warning-light: #FEF3C7;
  --color-warning-darker: #D97706;
  --color-error: #EF4444;
  --color-error-light: #FEE2E2;
  --color-error-darker: #DC2626;
  --color-info: #3B82F6;
  --color-info-light: #DBEAFE;
  --color-info-darker: #1D4ED8;
  
  /* 中性色 */
  --color-text-primary: rgba(0, 0, 0, 0.85);
  --color-text-secondary: rgba(0, 0, 0, 0.65);
  --color-text-tertiary: rgba(0, 0, 0, 0.45);
  --color-text-disabled: rgba(0, 0, 0, 0.28);
  --color-text-inverse: rgba(255, 255, 255, 1);
  
  /* 背景色 */
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #FBFBFB;
  --color-bg-tertiary: #F2F2F2;
  --color-bg-hover: #EEF7ED;
  --color-bg-selected: #E6F7FF;
  --color-bg-selected-hover: #D1EDFF;
  --color-bg-dark: #1F2937;
  
  /* 边框色 */
  --color-border-light: rgba(0, 0, 0, 0.06);
  --color-border-normal: rgba(0, 0, 0, 0.12);
  --color-border-strong: #E5E7EB;
  --color-border-focus: var(--color-success);
  
  /* ===== 字体系统 ===== */
  --font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --font-family-mono: 'Monaco', 'Courier New', monospace;
  --font-size-h1: 20px;
  --font-size-h2: 18px;
  --font-size-h3: 16px;
  --font-size-body: 14px;
  --font-size-small: 12px;
  --font-size-caption: 11px;
  
  /* ===== 间距系统 ===== */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 12px;
  --spacing-lg: 16px;
  --spacing-xl: 24px;
  --spacing-2xl: 32px;
  --spacing-3xl: 40px;
  --spacing-4xl: 48px;
  
  /* ===== 圆角系统 ===== */
  --radius-none: 0;
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-pill: 9999px;
  
  /* ===== 阴影系统 ===== */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 2px 8px rgba(0, 0, 0, 0.09);
  --shadow-lg: 0 3px 14px 2px rgba(0, 0, 0, 0.08);
  --shadow-xl: 0 10px 30px rgba(0, 0, 0, 0.15);
  
  /* ===== 过渡/动效 ===== */
  --transition-fast: 150ms;
  --transition-base: 200ms;
  --transition-slow: 300ms;
  --transition-slower: 500ms;
  
  --easing-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --easing-decelerate: cubic-bezier(0, 0, 0.2, 1);
  --easing-accelerate: cubic-bezier(0.4, 0, 1, 1);
  --easing-sharp: cubic-bezier(0.4, 0, 0.6, 1);
}
```

---

## 快速参考表

### 色彩速查

| 用途 | 变量 | 值 |
|------|------|-----|
| 主按钮背景 | `--color-success` | #10B981 |
| 标题文字 | `--color-text-primary` | rgba(0,0,0,0.85) |
| 边框 | `--color-border-normal` | rgba(0,0,0,0.12) |
| 输入框Hover | `--color-bg-hover` | #EEF7ED |

### 间距速查

| 用途 | 变量 | 值 |
|------|------|-----|
| 元素间距 | `--spacing-sm` | 8px |
| 组件间距 | `--spacing-lg` | 16px |
| 模块间距 | `--spacing-xl` | 24px |

### 圆角速查

| 用途 | 变量 | 值 |
|------|------|-----|
| 按钮/输入框 | `--radius-sm` | 4px |
| 卡片/模态框 | `--radius-lg` | 8px |

### 阴影速查

| 用途 | 变量 | 值 |
|------|------|-----|
| 卡片 | `--shadow-md` | 0 2px 8px ... |
| 菜单 | `--shadow-lg` | 0 3px 14px 2px ... |

---

## 最佳实践

1. **统一使用 CSS 变量** - 所有颜色、间距、圆角都应该使用 CSS 变量，便于全局调整
2. **保持一致的间距倍数** - 所有间距都应该是 4 或 8 的倍数
3. **圆角不应过大** - 避免使用 > 12px 的圆角（特殊情况除外）
4. **使用语义色** - 避免硬编码颜色值，使用有业务含义的语义色
5. **移动端优先** - 从移动端设计开始，然后扩展到更大屏幕
6. **支持可访问性** - 确保颜色对比度满足 WCAG AA，提供焦点状态反馈
7. **平滑动效** - 所有过渡都应该 > 150ms，< 500ms
8. **响应式调整** - 在不同断点调整间距、字体、密度

---

**文档维护**: 本文档采用版本控制，如需更新请遵循规范修改并更新版本号。

