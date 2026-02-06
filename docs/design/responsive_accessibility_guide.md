# 江湖UI 响应式设计与无障碍访问指南

> 响应式设计原则、断点策略、无障碍访问规范（WCAG 2.1 AA）

---

## 📋 目录

1. [响应式设计原则](#响应式设计原则)
2. [断点系统](#断点系统)
3. [移动端优先策略](#移动端优先策略)
4. [响应式组件](#响应式组件)
5. [触摸设计](#触摸设计)
6. [无障碍访问基础](#无障碍访问基础)
7. [颜色与对比度](#颜色与对比度)
8. [键盘导航](#键盘导航)
9. [屏幕阅读器支持](#屏幕阅读器支持)
10. [无障碍检查清单](#无障碍检查清单)

---

## 响应式设计原则

### 三个核心原则

1. **流式布局** - 使用百分比宽度而非固定像素
2. **灵活图像** - 图像能随容器缩放
3. **媒体查询** - 在不同断点应用不同样式

### Mobile-First 策略

从移动端开始设计，然后逐步扩展到更大屏幕：

```css
/* 1. 基础样式（移动端） */
.component {
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  flex-direction: column;
}

/* 2. 平板端扩展 (≥ 600px) */
@media (min-width: 600px) {
  .component {
    padding: 16px 24px;
  }
}

/* 3. 桌面端扩展 (≥ 1024px) */
@media (min-width: 1024px) {
  .component {
    max-width: 1200px;
    padding: 24px;
  }
}
```

---

## 断点系统

### 标准断点定义

| 断点 | 宽度 | 设备类型 | 应用场景 |
|------|-----|--------|--------|
| **xs** | 0-480px | 手机 | 极小屏幕 |
| **sm** | 480-600px | 手机 | 标准手机 |
| **md** | 600-768px | 平板 | 竖屏平板 |
| **lg** | 768-1024px | 平板 | 横屏平板/小屏幕PC |
| **xl** | 1024-1280px | 桌面 | 标准桌面 |
| **2xl** | 1280px+ | 宽屏 | 宽屏桌面 |

### 关键分界点

```css
:root {
  /* 移动/桌面分界 - 最重要 */
  --breakpoint-mobile: 600px;
  
  /* 平板/桌面分界 */
  --breakpoint-tablet: 768px;
  
  /* 大屏幕 */
  --breakpoint-desktop: 1024px;
  
  /* 超大屏幕 */
  --breakpoint-wide: 1280px;
}
```

### 媒体查询规范

```css
/* ✅ 推荐：使用最小宽度（Mobile-First） */
@media (min-width: 600px) { }
@media (min-width: 1024px) { }

/* ⚠️ 避免：仅使用最大宽度 */
@media (max-width: 600px) { }  /* 不够精确 */

/* ⚠️ 避免：复杂范围查询 */
@media (min-width: 600px) and (max-width: 1023px) { }
/* 改为分别定义 min-width */
```

---

## 移动端优先策略

### 1. 布局调整

```vue
<template>
  <div class="container">
    <!-- 移动端：竖排 / 桌面端：横排 -->
    <div class="flex flex-col md:flex-row gap-sm md:gap-lg">
      <div class="w-full md:w-1/3">左侧</div>
      <div class="w-full md:w-2/3">右侧</div>
    </div>
  </div>
</template>

<style scoped>
/* 移动端 */
.sidebar { display: none; }
.main { width: 100%; }

/* 桌面端 */
@media (min-width: 1024px) {
  .sidebar { display: block; width: 25%; }
  .main { width: 75%; }
}
</style>
```

### 2. 字体和间距缩放

```css
/* 移动端 */
.component {
  font-size: 14px;
  padding: 12px;
  margin-bottom: 12px;
  gap: 8px;
}

/* 平板端 */
@media (min-width: 600px) {
  .component {
    font-size: 14px;
    padding: 16px;
    margin-bottom: 16px;
    gap: 12px;
  }
}

/* 桌面端 */
@media (min-width: 1024px) {
  .component {
    font-size: 14px;
    padding: 24px;
    margin-bottom: 24px;
    gap: 16px;
  }
}
```

### 3. 显示/隐藏元素

```html
<!-- 仅在移动端显示 -->
<button class="md:hidden">菜单（移动端）</button>

<!-- 仅在桌面端显示 -->
<nav class="hidden md:block">导航（桌面端）</nav>

<!-- 在平板及以上隐藏 -->
<div class="md:hidden">移动端提示</div>

<!-- 在桌面端显示，其他隐藏 -->
<div class="hidden lg:flex">桌面端特性</div>
```

### 4. 列数自适应

```html
<!-- 移动端1列、平板2列、桌面3列 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
  <div class="card">卡片1</div>
  <div class="card">卡片2</div>
  <div class="card">卡片3</div>
</div>
```

---

## 响应式组件

### 表格响应式

```html
<!-- 桌面端：标准表格 -->
<!-- 移动端：卡片式列表 -->

<div class="overflow-x-auto md:overflow-visible">
  <table class="w-full">
    <thead class="hidden md:table-header-group bg-bg-secondary">
      <tr>
        <th class="text-left p-lg">姓名</th>
        <th class="text-left p-lg">邮箱</th>
        <th class="text-left p-lg">操作</th>
      </tr>
    </thead>
    <tbody class="block md:table-row-group">
      <tr class="block md:table-row border mb-lg md:border-b">
        <!-- 移动端标签 -->
        <td class="block md:table-cell before:content-['姓名'] md:before:content-none p-lg">
          张三
        </td>
        <td class="block md:table-cell before:content-['邮箱'] md:before:content-none p-lg">
          zhangsan@example.com
        </td>
        <td class="block md:table-cell before:content-['操作'] md:before:content-none p-lg">
          <button>编辑</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

### 导航响应式

```html
<!-- 汉堡菜单 + 响应式导航 -->
<nav class="bg-white border-b border-border-normal">
  <div class="flex justify-between items-center p-lg md:p-xl">
    <!-- Logo -->
    <div class="font-semibold text-h3">Logo</div>
    
    <!-- 汉堡菜单按钮（移动端） -->
    <button class="md:hidden p-sm" @click="toggleMenu">
      ☰
    </button>
  </div>
  
  <!-- 菜单（移动端：隐藏、平板+：显示） -->
  <div :class="{ 'hidden': !menuOpen, 'md:flex': true }" class="flex-col md:flex-row gap-sm md:gap-lg p-lg md:p-0 md:border-0 border-t border-border-light">
    <a href="#" class="text-text-primary hover:text-success">首页</a>
    <a href="#" class="text-text-primary hover:text-success">产品</a>
    <a href="#" class="text-text-primary hover:text-success">关于</a>
  </div>
</nav>
```

### 模态框响应式

```html
<!-- 移动端：全屏 / 桌面端：居中对话框 -->
<div v-if="showModal" class="fixed inset-0 bg-black/45 z-50 flex items-center justify-center">
  <div class="
    bg-white rounded-lg shadow-xl
    w-full md:w-auto
    m-sm md:m-0
    max-h-screen md:max-h-96
    overflow-y-auto
    md:min-w-96
  ">
    <div class="p-lg md:p-xl">
      <h2 class="text-h2">标题</h2>
      <p class="text-body mt-lg">内容</p>
    </div>
    <div class="flex gap-sm justify-end p-lg md:p-xl border-t border-border-light">
      <button @click="closeModal">取消</button>
      <button class="bg-success text-white px-lg py-sm rounded-sm">确定</button>
    </div>
  </div>
</div>
```

---

## 触摸设计

### 触摸目标尺寸

所有可交互元素在移动设备上的最小尺寸为 **44×44px**：

```css
/* ✅ 符合规范 */
.button {
  min-width: 44px;
  min-height: 44px;
  padding: 10px 16px;  /* 确保内容充满 */
}

.icon-button {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ❌ 不符合规范 */
.small-button {
  width: 20px;
  height: 20px;  /* 太小 */
}
```

### 触摸间距

相邻可交互元素之间至少留 **8px 间距**，防止误触：

```css
.button-group {
  display: flex;
  gap: 8px;  /* 最小间距 */
  
  @media (max-width: 600px) {
    gap: 12px;  /* 移动端增加间距 */
  }
}
```

### 触摸反馈

提供清晰的触摸反馈，使用更大的悬浮区域：

```css
.touch-target {
  /* 扩大交互区域 */
  position: relative;
  padding: 8px 12px;
  
  /* 伪元素扩大可交互区域（不影响布局） */
  &::before {
    content: '';
    position: absolute;
    inset: -8px;  /* 向外扩展8px */
  }
  
  /* 触摸反馈 */
  &:active {
    background: var(--color-bg-hover);
    transform: scale(0.98);
  }
}
```

---

## 无障碍访问基础

### 什么是无障碍访问（A11y）

无障碍访问是指设计和开发方式，使残障人士也能无障碍地使用网站/应用。

**WCAG 2.1** 定义了三个符合等级：
- **A** - 基本符合
- **AA** - 推荐符合（业界标准）
- **AAA** - 增强符合

---

## 颜色与对比度

### WCAG 对比度要求

| 级别 | 标准文本 | 大文本(≥18pt) | 图形/UI |
|------|--------|-------------|--------|
| **AA** | 4.5:1 | 3:1 | 3:1 |
| **AAA** | 7:1 | 4.5:1 | - |

### 计算对比度

```
对比度 = (R1 + 0.05) / (R2 + 0.05)
其中 R = RGB转换后的相对亮度值
```

### 常见颜色组合检查

```css
/* ✅ PASS: 对比度 14.87:1 (AAA) */
color: rgba(0, 0, 0, 0.85);
background: #FFFFFF;

/* ✅ PASS: 对比度 7.13:1 (AAA) */
color: rgba(0, 0, 0, 0.65);
background: #FFFFFF;

/* ✅ PASS: 对比度 4.55:1 (AA) */
color: rgba(0, 0, 0, 0.45);
background: #FFFFFF;

/* ❌ FAIL: 对比度 2.49:1 */
color: rgba(0, 0, 0, 0.28);
background: #FFFFFF;
/* 仅用于禁用态，不推荐 */

/* ✅ PASS 组合 */
color: #FFFFFF;
background: #10B981;  /* 对比度 6.45:1 */

/* ✅ PASS 组合 */
color: #FFFFFF;
background: #EF4444;  /* 对比度 5.14:1 */
```

### 不能仅用颜色表达含义

```html
<!-- ❌ 错误：仅用颜色区分 -->
<div>
  <span class="text-green">成功</span>
  <span class="text-red">失败</span>
</div>

<!-- ✅ 正确：用文本和图标辅助 -->
<div>
  <span class="text-success">✓ 成功</span>
  <span class="text-error">✗ 失败</span>
</div>

<!-- ✅ 或用文本标签 -->
<div role="status" aria-label="成功">
  <svg class="text-success"><!-- 成功图标 --></svg>
  <span>操作成功</span>
</div>
```

---

## 键盘导航

### Tab 键顺序

所有可交互元素都应该能通过 Tab 键访问，顺序应该符合逻辑（通常从左到右、从上到下）：

```html
<!-- ✅ 正确的Tab顺序 -->
<form>
  <input type="text" placeholder="用户名" />  <!-- Tab 1 -->
  <input type="password" placeholder="密码" />  <!-- Tab 2 -->
  <button type="submit">登录</button>            <!-- Tab 3 -->
  <a href="/signup">注册</a>                     <!-- Tab 4 -->
</form>

<!-- ❌ 错误：乱序 -->
<div>
  <button tabindex="2">按钮1</button>
  <button tabindex="1">按钮2</button>  <!-- 顺序混乱 -->
</div>
```

### Tabindex 规范

```html
<!-- tabindex="0" - 可Tab访问（推荐） -->
<div tabindex="0" role="button">可点击</div>

<!-- tabindex="-1" - 不可Tab但可编程焦点 -->
<div tabindex="-1" id="modal-content">
  模态框内容（通过编程设置焦点）
</div>

<!-- 避免正数 tabindex（难以维护） -->
<!-- ❌ 不推荐 -->
<button tabindex="5">先点击</button>
<button tabindex="3">后点击</button>
```

### 焦点指示

所有元素都必须有清晰的焦点指示：

```css
/* 全局焦点样式 */
*:focus-visible {
  outline: 2px solid #10B981;
  outline-offset: 2px;
}

/* 按钮焦点 */
button:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

/* 输入框焦点 */
input:focus {
  outline: none;
  border-color: #10B981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

/* 避免移除焦点指示 */
/* ❌ 不要这样做 */
button:focus { outline: none; }  /* 移除焦点 */

/* ✅ 改为提供替代指示 */
button:focus {
  outline: none;
  background: var(--color-bg-hover);  /* 替代视觉反馈 */
}
```

### 跳过链接

为键盘用户提供跳过重复内容的方式：

```html
<!-- 跳过链接（对屏幕阅读器用户可见） -->
<a href="#main-content" class="skip-link">
  跳转到主内容
</a>

<nav><!-- 导航菜单 --></nav>

<main id="main-content">
  <!-- 主要内容 -->
</main>

<style>
.skip-link {
  position: absolute;
  left: -9999px;
  z-index: 999;
}

.skip-link:focus {
  left: 0;
  top: 0;
  background: #000;
  color: #fff;
  padding: 8px;
}
</style>
```

---

## 屏幕阅读器支持

### ARIA 标签

#### aria-label

```html
<!-- 按钮只有图标时 -->
<button aria-label="关闭">×</button>

<!-- 链接文本不够描述性时 -->
<a href="/users/john" aria-label="查看 John 的个人资料">
  John
</a>
```

#### aria-labelledby

```html
<!-- 关联元素和标签 -->
<h2 id="dialog-title">确认删除</h2>
<div role="dialog" aria-labelledby="dialog-title">
  你确定要删除吗？
</div>
```

#### aria-describedby

```html
<!-- 为表单字段提供额外说明 -->
<input 
  id="password" 
  type="password" 
  aria-describedby="pwd-hint"
/>
<span id="pwd-hint">至少8个字符，包含大小写和数字</span>
```

### 角色定义

```html
<!-- 按钮 -->
<div role="button" tabindex="0" @keydown.enter="onClick">
  可点击的区域
</div>

<!-- 对话框 -->
<div role="dialog" aria-modal="true" aria-labelledby="title">
  <h2 id="title">标题</h2>
</div>

<!-- 状态容器 -->
<div role="status" aria-live="polite">
  保存成功
</div>

<!-- 表格 -->
<table role="table">
  <thead role="rowgroup">
    <tr role="row">
      <th role="columnheader">列标题</th>
    </tr>
  </thead>
</table>

<!-- 列表 -->
<ul role="list">
  <li role="listitem">项目1</li>
  <li role="listitem">项目2</li>
</ul>
```

### aria-live 区域

```html
<!-- 动态更新的内容 -->
<div aria-live="polite" aria-atomic="true">
  <!-- 状态消息会被自动朗读 -->
</div>

<!-- polite - 等到用户暂停时说出 -->
<!-- assertive - 立即中断并说出 -->
<!-- off - 不朗读（默认） -->

<!-- 应用示例 -->
<form>
  <input id="email" type="email" />
  <div aria-live="polite" id="email-error"></div>
  <button type="submit">提交</button>
</form>

<script>
// 校验失败时，错误信息会被屏幕阅读器朗读
document.getElementById('email-error').textContent = '请输入有效的邮箱地址';
</script>
```

### aria-disabled vs disabled

```html
<!-- 对于原生表单元素 -->
<button disabled>禁用</button>

<!-- 对于自定义元素 -->
<div role="button" aria-disabled="true" tabindex="-1">
  自定义按钮（禁用）
</div>
```

---

## 无障碍检查清单

### 颜色和对比度

- [ ] 所有文字颜色对比度 ≥ 4.5:1（标准文本）或 ≥ 3:1（大文本）
- [ ] 不仅用颜色表示重要信息（配合文本或图标）
- [ ] 焦点指示明确可见（不是仅通过颜色变化）

### 键盘访问

- [ ] 所有功能都能通过键盘访问
- [ ] Tab 顺序合理（左→右，上→下）
- [ ] 焦点指示清晰（outline 或替代反馈）
- [ ] 没有键盘陷阱（能通过 Tab 离开）
- [ ] 提供跳过链接

### 文本替代

- [ ] 所有图像有 alt 属性
- [ ] 纯装饰图像的 alt="" 且 aria-hidden="true"
- [ ] 图标按钮有 aria-label
- [ ] 复杂图像有详细描述

### 结构和语义

- [ ] 使用正确的 HTML 标题层级（h1 > h2 > h3）
- [ ] 列表使用 `<ul>` / `<ol>` / `<li>`
- [ ] 表单字段有 `<label>`
- [ ] 表格有 `<thead>`、`<tbody>`、`<th>`

### 表单

- [ ] 所有输入框有标签
- [ ] 错误信息清晰（`aria-invalid` + `aria-describedby`）
- [ ] 必填字段标记（aria-required）
- [ ] 表单提交成功/失败有反馈

### 响应式

- [ ] 在移动设备测试
- [ ] 触摸目标 ≥ 44×44px
- [ ] 支持 200% 缩放
- [ ] 内容不水平溢出（移动端）

### 动画和运动

- [ ] 提供减少运动选项 (`prefers-reduced-motion`)
- [ ] 自动播放内容可控制
- [ ] 闪烁内容频率 < 3Hz

### 语言和易读性

- [ ] 页面语言设置 (`<html lang="zh">`)
- [ ] 首字母缩略词有解释
- [ ] 复杂词汇有定义
- [ ] 文字清晰易懂（避免过度复杂）

### 音视频

- [ ] 视频有字幕/文字记录
- [ ] 音频有文字记录
- [ ] 没有仅音频的关键内容

---

## 测试工具

### 自动化工具

- **axe DevTools** - Chrome扩展，检测无障碍问题
- **WAVE** - WebAIM无障碍评估工具
- **Lighthouse** - Chrome内置，包含无障碍审计
- **Color Contrast Analyzer** - 检查颜色对比度

### 手动测试

1. **仅键盘测试** - 不使用鼠标，仅用Tab键导航
2. **屏幕阅读器测试** - 使用NVDA（Windows）或VoiceOver（Mac）
3. **移动端测试** - 测试触摸交互和响应式
4. **缩放测试** - 放大到200%，检查可用性

### 测试用例

```
[ ] 1. 仅用键盘完成一次完整操作流程
[ ] 2. 使用屏幕阅读器浏览页面
[ ] 3. 关闭 CSS 后页面仍可用
[ ] 4. 将浏览器缩放到 200%
[ ] 5. 在移动设备上测试
[ ] 6. 检查所有对比度
[ ] 7. 验证ARIA标签正确
```

---

## 最佳实践总结

### 响应式设计

1. ✅ 采用 Mobile-First 策略
2. ✅ 使用流式布局和相对单位
3. ✅ 在关键断点测试
4. ✅ 图像使用 srcset 适配
5. ✅ 触摸目标 ≥ 44×44px

### 无障碍访问

1. ✅ 颜色对比度 ≥ 4.5:1
2. ✅ 所有功能可通过键盘访问
3. ✅ 为所有图像提供 alt
4. ✅ 使用正确的 HTML 语义元素
5. ✅ 支持屏幕阅读器和键盘导航
6. ✅ 定期使用工具和真实用户测试

