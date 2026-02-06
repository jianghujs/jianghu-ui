# 江湖UI 设计令牌完整参考

> 所有设计系统值的集中定义，用于CSS变量、配置文件、代码常量。  
> **用途**: 复制粘贴使用，确保全局一致

---

## 📋 快速导航

| 类别 | 变量数 | 用途 |
|------|------|------|
| 颜色 | 30+ | CSS color值 |
| 字体 | 12+ | font-size, font-weight, line-height |
| 间距 | 8 | padding, margin, gap |
| 圆角 | 5 | border-radius |
| 阴影 | 4 | box-shadow |
| 过渡 | 8 | transition duration & timing |

---

## 🎨 色彩令牌

### 完整CSS变量定义

```css
/* src/style/design-tokens.css */

:root {
  /* ===== 语义色（业务含义色） ===== */
  
  /* 成功色 - 新增、成功、正常 */
  --color-success: #10B981;
  --color-success-light: #D1FAE5;
  --color-success-lighter: #ECFDF5;
  --color-success-darker: #059669;
  --color-success-darkest: #047857;
  
  /* 警告色 - 需要注意 */
  --color-warning: #F59E0B;
  --color-warning-light: #FEF3C7;
  --color-warning-lighter: #FFFBEB;
  --color-warning-darker: #D97706;
  --color-warning-darkest: #B45309;
  
  /* 错误色 - 删除、错误 */
  --color-error: #EF4444;
  --color-error-light: #FEE2E2;
  --color-error-lighter: #FEF2F2;
  --color-error-darker: #DC2626;
  --color-error-darkest: #991B1B;
  
  /* 信息色 - 提示、辅助 */
  --color-info: #3B82F6;
  --color-info-light: #DBEAFE;
  --color-info-lighter: #EFF6FF;
  --color-info-darker: #1D4ED8;
  --color-info-darkest: #1E40AF;
  
  /* ===== 中性色（文字、背景、边框） ===== */
  
  /* 文字色系 */
  --color-text-primary: rgba(0, 0, 0, 0.85);    /* 主要文字 */
  --color-text-secondary: rgba(0, 0, 0, 0.65);  /* 次要文字 */
  --color-text-tertiary: rgba(0, 0, 0, 0.45);   /* 辅助文字 */
  --color-text-disabled: rgba(0, 0, 0, 0.28);   /* 禁用文字 */
  --color-text-inverse: rgba(255, 255, 255, 1); /* 反色（深色背景） */
  
  /* 背景色系 */
  --color-bg-primary: #FFFFFF;        /* 主背景（白） */
  --color-bg-secondary: #FBFBFB;      /* 次级背景（浅灰） */
  --color-bg-tertiary: #F2F2F2;       /* 第三背景（中灰） */
  --color-bg-quaternary: #E8E8E8;     /* 第四背景（较深灰） */
  --color-bg-hover: #EEF7ED;          /* Hover背景（绿底） */
  --color-bg-selected: #E6F7FF;       /* 选中背景（蓝底） */
  --color-bg-selected-hover: #D1EDFF; /* 选中+Hover（深蓝） */
  --color-bg-dark: #1F2937;           /* 深色背景（预留） */
  
  /* 边框色系 */
  --color-border-light: rgba(0, 0, 0, 0.06);  /* 极淡边框 */
  --color-border-normal: rgba(0, 0, 0, 0.12); /* 标准边框 */
  --color-border-strong: #E5E7EB;             /* 强边框 */
  --color-border-focus: var(--color-success); /* 焦点边框（绿） */
  
  /* ===== 黑白纯色 ===== */
  --color-black: #000000;
  --color-white: #FFFFFF;
  
  /* ===== 灰度色系（补充） ===== */
  --color-gray-50: #F9FAFB;
  --color-gray-100: #F3F4F6;
  --color-gray-200: #E5E7EB;
  --color-gray-300: #D1D5DB;
  --color-gray-400: #9CA3AF;
  --color-gray-500: #6B7280;
  --color-gray-600: #4B5563;
  --color-gray-700: #374151;
  --color-gray-800: #1F2937;
  --color-gray-900: #111827;
}
```

### 颜色使用速查表

```json
{
  "按钮": {
    "主按钮": "background: var(--color-success); color: white;",
    "主按钮Hover": "background: var(--color-success-darker);",
    "次按钮": "background: white; border: 1px solid var(--color-border-normal);",
    "危险按钮": "border: 1px solid var(--color-error); color: var(--color-error);"
  },
  "输入框": {
    "默认": "border: 1px solid var(--color-border-normal); background: white;",
    "焦点": "border-color: var(--color-border-focus); background: var(--color-bg-hover);",
    "禁用": "background: var(--color-bg-tertiary); color: var(--color-text-disabled);"
  },
  "文字": {
    "主": "color: var(--color-text-primary);",
    "次": "color: var(--color-text-secondary);",
    "辅": "color: var(--color-text-tertiary);"
  },
  "表格": {
    "表头": "background: var(--color-bg-secondary);",
    "选中行": "background: var(--color-bg-selected);"
  }
}
```

---

## 🔤 字体令牌

### 完整字体定义

```css
:root {
  /* ===== 字体栈 ===== */
  --font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --font-family-mono: 'Monaco', 'Courier New', monospace;
  
  /* ===== 字体大小 ===== */
  --font-size-h1: 20px;      /* 超大标题 */
  --font-size-h2: 18px;      /* 大标题 */
  --font-size-h3: 16px;      /* 中等标题 */
  --font-size-body: 14px;    /* 正文（默认） */
  --font-size-small: 12px;   /* 小文本 */
  --font-size-caption: 11px; /* 极小文本 */
  
  /* ===== 字重 ===== */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* ===== 行高 ===== */
  --line-height-h1: 1.4;    /* 28px（20×1.4） */
  --line-height-h2: 1.33;   /* 24px（18×1.33） */
  --line-height-h3: 1.5;    /* 24px（16×1.5） */
  --line-height-body: 1.57; /* 22px（14×1.57） */
  --line-height-small: 1.67;/* 20px（12×1.67） */
  --line-height-caption: 1.45;  /* 16px（11×1.45） */
  
  /* ===== 字间距（letter-spacing） ===== */
  --letter-spacing-h1: 0;
  --letter-spacing-h2: 0;
  --letter-spacing-h3: 0;
  --letter-spacing-body: 0.5px;
  --letter-spacing-small: 0.4px;
  --letter-spacing-caption: 0.3px;
}
```

### 字体快速应用

```css
/* 方案1：单个属性 */
.text-h1 {
  font-size: var(--font-size-h1);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-h1);
}

/* 方案2：Shorthand（仅支持部分） */
.text-body {
  font: var(--font-weight-normal) var(--font-size-body) / var(--line-height-body) var(--font-family-base);
  letter-spacing: var(--letter-spacing-body);
}

/* 方案3：使用@apply（Tailwind） */
@apply text-h1 font-semibold leading-h1;
```

### 字体对照表

| 类型 | 大小 | 字重 | 行高 | 字间距 | 用途 |
|------|------|------|------|------|------|
| H1 | 20px | 600 | 1.4 | 0 | 页面标题 |
| H2 | 18px | 600 | 1.33 | 0 | 模块标题 |
| H3 | 16px | 600 | 1.5 | 0 | 卡片标题 |
| Body | 14px | 400 | 1.57 | 0.5px | 正文内容 |
| Small | 12px | 400 | 1.67 | 0.4px | 标签、说明 |
| Caption | 11px | 400 | 1.45 | 0.3px | 微文本 |

---

## 📏 间距令牌

### CSS变量定义

```css
:root {
  /* ===== 间距系统（基础4px） ===== */
  --spacing-xs: 4px;      /* 1单位 */
  --spacing-sm: 8px;      /* 2单位 */
  --spacing-md: 12px;     /* 3单位 */
  --spacing-lg: 16px;     /* 4单位 */
  --spacing-xl: 24px;     /* 6单位 */
  --spacing-2xl: 32px;    /* 8单位 */
  --spacing-3xl: 40px;    /* 10单位 */
  --spacing-4xl: 48px;    /* 12单位 */
  
  /* ===== 响应式间距（移动端调整） ===== */
  @media (max-width: 600px) {
    --spacing-xs: 4px;    /* 保持 */
    --spacing-sm: 6px;    /* 从8缩减 */
    --spacing-md: 10px;   /* 从12缩减 */
    --spacing-lg: 12px;   /* 从16缩减 */
    --spacing-xl: 16px;   /* 从24缩减 */
    --spacing-2xl: 24px;  /* 从32缩减 */
  }
}
```

### 间距应用规范

```
按钮：6px(上下) × 16px(左右)
输入框：8px(上下) × 12px(左右)
卡片：24px（大） / 16px（小）
表单组：16px（组间） / 12px（组内）
表格行：12-16px（单元格padding）
相邻元素：8px（横向） / 12px（纵向）
```

### 间距速查

```json
{
  "极小": "4px - xs",
  "小": "8px - sm",
  "标准": "12px - md",
  "大": "16px - lg",
  "超大": "24px - xl",
  "2倍超大": "32px - 2xl"
}
```

---

## 🔲 圆角令牌

### CSS变量定义

```css
:root {
  /* ===== 圆角系统 ===== */
  --radius-none: 0;       /* 无圆角 */
  --radius-sm: 4px;       /* 小圆角（按钮、输入框） */
  --radius-md: 6px;       /* 中圆角（菜单项） */
  --radius-lg: 8px;       /* 大圆角（卡片、模态框） */
  --radius-pill: 9999px;  /* 胶囊形（完全圆形） */
}
```

### 圆角应用规范

```json
{
  "按钮": 4,
  "输入框": 4,
  "标签": 4,
  "菜单项Hover": 6,
  "卡片": 8,
  "模态框": 8,
  "表格": 8,
  "完全圆形": 9999
}
```

---

## 💫 阴影令牌

### CSS变量定义

```css
:root {
  /* ===== 阴影系统 ===== */
  
  /* 极淡阴影（Level 1） */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  
  /* 轻阴影（Level 2） */
  --shadow-md: 0 2px 8px rgba(0, 0, 0, 0.09);
  
  /* 重阴影（Level 3） */
  --shadow-lg: 0 3px 14px 2px rgba(0, 0, 0, 0.08);
  
  /* 极重阴影（Level 4） */
  --shadow-xl: 0 10px 30px rgba(0, 0, 0, 0.15);
  
  /* 无阴影 */
  --shadow-none: none;
}
```

### 阴影应用规范

```json
{
  "表格容器": "var(--shadow-sm)",
  "标准卡片": "var(--shadow-md)",
  "卡片Hover": "var(--shadow-lg)",
  "菜单/下拉": "var(--shadow-lg)",
  "模态框": "var(--shadow-xl)"
}
```

---

## ⏱️ 过渡令牌

### CSS变量定义

```css
:root {
  /* ===== 过渡时间 ===== */
  --transition-fast: 150ms;   /* 快速（即时反馈） */
  --transition-base: 200ms;   /* 标准（最常用） */
  --transition-slow: 300ms;   /* 缓慢（流畅感） */
  --transition-slower: 500ms; /* 极缓（特殊强调） */
  
  /* ===== 缓动曲线 ===== */
  --easing-linear: linear;
  --easing-ease: ease;
  --easing-ease-in: ease-in;
  --easing-ease-out: ease-out;
  --easing-ease-in-out: ease-in-out;
  
  /* Material Design 标准曲线 */
  --easing-standard: cubic-bezier(0.4, 0, 0.2, 1);     /* 标准 */
  --easing-decelerate: cubic-bezier(0, 0, 0.2, 1);     /* 减速进入 */
  --easing-accelerate: cubic-bezier(0.4, 0, 1, 1);     /* 加速离开 */
  --easing-sharp: cubic-bezier(0.4, 0, 0.6, 1);        /* 尖锐 */
}
```

### 过渡应用规范

```css
/* 标准过渡 */
.component {
  transition: all var(--transition-base) var(--easing-standard);
}

/* 快速反馈 */
.button:active {
  transition: transform var(--transition-fast) var(--easing-standard);
}

/* 流畅动画 */
.modal {
  animation: slideIn var(--transition-slow) var(--easing-decelerate);
}

/* 旋转（线性） */
.spinner {
  animation: spin 0.8s linear infinite;
}
```

---

## 📊 令牌规范矩阵

### 完整值对照

```
颜色令牌：
├── 语义色（5色系×5级 = 25个）
├── 中性色（文字3 + 背景7 + 边框4 = 14个）
└── 灰度（10级）

字体令牌：
├── 字体栈（2个）
├── 字体大小（6个）
├── 字重（4个）
├── 行高（6个）
├── 字间距（6个）

间距令牌：
└── 8个基础值

圆角令牌：
└── 5个预设值

阴影令牌：
└── 4个深度级别

过渡令牌：
├── 时间（4个）
└── 缓动（8个）

总计：80+ 个设计令牌
```

---

## 🔧 实际使用示例

### 示例1：按钮

```css
.button-primary {
  /* 颜色 */
  background: var(--color-success);
  color: white;
  
  /* 尺寸和间距 */
  height: 36px;
  padding: 6px 16px;
  
  /* 字体 */
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
  
  /* 圆角 */
  border-radius: var(--radius-sm);
  
  /* 过渡 */
  transition: all var(--transition-base) var(--easing-standard);
}

.button-primary:hover {
  background: var(--color-success-darker);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}
```

### 示例2：卡片

```css
.card {
  /* 颜色 */
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-normal);
  
  /* 间距 */
  padding: var(--spacing-xl);
  
  /* 圆角 */
  border-radius: var(--radius-lg);
  
  /* 阴影 */
  box-shadow: var(--shadow-md);
  
  /* 过渡 */
  transition: all var(--transition-base) var(--easing-standard);
}

.card:hover {
  box-shadow: var(--shadow-lg);
  border-color: var(--color-border-strong);
}

.card-title {
  font-size: var(--font-size-h3);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  line-height: var(--line-height-h3);
}

.card-content {
  font-size: var(--font-size-body);
  color: var(--color-text-secondary);
  line-height: var(--line-height-body);
  margin-top: var(--spacing-md);
}
```

### 示例3：表单

```css
.form-item {
  margin-bottom: var(--spacing-lg);
}

.form-label {
  display: block;
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
}

.form-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--color-border-normal);
  border-radius: var(--radius-sm);
  background: var(--color-bg-primary);
  font-size: var(--font-size-body);
  color: var(--color-text-primary);
  transition: all var(--transition-base) var(--easing-standard);
}

.form-input:focus {
  outline: none;
  border-color: var(--color-border-focus);
  background: var(--color-bg-hover);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.form-hint {
  font-size: var(--font-size-small);
  color: var(--color-text-tertiary);
  margin-top: var(--spacing-xs);
}

.form-error {
  font-size: var(--font-size-small);
  color: var(--color-error);
  margin-top: var(--spacing-xs);
}
```

---

## 📋 令牌清单

### 设计令牌导入模板

```css
/* 将以下所有变量复制到 src/style/design-tokens.css */

:root {
  /* === 颜色 === */
  --color-success: #10B981;
  --color-success-light: #D1FAE5;
  --color-success-darker: #059669;
  /* ... 其他颜色 ... */
  
  /* === 字体 === */
  --font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --font-size-h1: 20px;
  /* ... 其他字体 ... */
  
  /* === 间距 === */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  /* ... 其他间距 ... */
  
  /* === 圆角 === */
  --radius-sm: 4px;
  --radius-lg: 8px;
  /* ... 其他圆角 ... */
  
  /* === 阴影 === */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 3px 14px 2px rgba(0, 0, 0, 0.08);
  /* ... 其他阴影 ... */
  
  /* === 过渡 === */
  --transition-base: 200ms;
  --easing-standard: cubic-bezier(0.4, 0, 0.2, 1);
  /* ... 其他过渡 ... */
}
```

---

## 🎯 令牌使用检查

- [ ] 所有颜色值使用 CSS 变量
- [ ] 所有字体定义一致
- [ ] 间距遵循 4/8px 倍数系统
- [ ] 圆角只用预设值
- [ ] 阴影使用标准深度
- [ ] 过渡使用标准时长
- [ ] 已创建 design-tokens.css 文件
- [ ] 主文件已导入该文件
- [ ] 所有组件已使用令牌
- [ ] 未发现硬编码设计值

---

**维护说明**: 更新令牌时，请同步更新所有相关文档（jianghu-ui_design_system.md、tailwind.config.js、组件代码）

