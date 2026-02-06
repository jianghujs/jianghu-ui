# 江湖UI Tailwind CSS 实现指南

> 详细的 Tailwind CSS 类映射、配置说明、最佳实践。  
> **项目配置**: Vue 2.7 + Vuetify 2.x + Tailwind CSS 3.x

---

## 📋 目录

1. [Tailwind 配置](#tailwind-配置)
2. [颜色类映射](#颜色类映射)
3. [间距类映射](#间距类映射)
4. [圆角类映射](#圆角类映射)
5. [阴影类映射](#阴影类映射)
6. [字体类映射](#字体类映射)
7. [常用工具类](#常用工具类)
8. [组件示例](#组件示例)
9. [与Vuetify的协调](#与vuetify的协调)
10. [性能优化](#性能优化)

---

## Tailwind 配置

### 项目中的 tailwind.config.js

```javascript
module.exports = {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './docs/**/*.md',
  ],
  important: true,  // 提升优先级以覆盖Vuetify
  theme: {
    extend: {
      colors: {
        // 语义色
        success: {
          DEFAULT: '#10B981',
          light: '#D1FAE5',
          darker: '#059669',
        },
        warning: {
          DEFAULT: '#F59E0B',
          light: '#FEF3C7',
          darker: '#D97706',
        },
        error: {
          DEFAULT: '#EF4444',
          light: '#FEE2E2',
          darker: '#DC2626',
        },
        info: {
          DEFAULT: '#3B82F6',
          light: '#DBEAFE',
          darker: '#1D4ED8',
        },
        
        // 中性色
        text: {
          primary: 'rgba(0, 0, 0, 0.85)',
          secondary: 'rgba(0, 0, 0, 0.65)',
          tertiary: 'rgba(0, 0, 0, 0.45)',
          disabled: 'rgba(0, 0, 0, 0.28)',
        },
        
        // 背景色
        bg: {
          primary: '#FFFFFF',
          secondary: '#FBFBFB',
          tertiary: '#F2F2F2',
          hover: '#EEF7ED',
          selected: '#E6F7FF',
          'selected-hover': '#D1EDFF',
        },
        
        // 边框色
        border: {
          light: 'rgba(0, 0, 0, 0.06)',
          normal: 'rgba(0, 0, 0, 0.12)',
          strong: '#E5E7EB',
          focus: '#10B981',
        },
      },
      
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
        '3xl': '40px',
        '4xl': '48px',
      },
      
      borderRadius: {
        xs: '0',
        sm: '4px',
        md: '6px',
        lg: '8px',
        pill: '9999px',
      },
      
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 2px 8px rgba(0, 0, 0, 0.09)',
        lg: '0 3px 14px 2px rgba(0, 0, 0, 0.08)',
        xl: '0 10px 30px rgba(0, 0, 0, 0.15)',
      },
      
      fontSize: {
        h1: ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        h2: ['18px', { lineHeight: '1.33', fontWeight: '600' }],
        h3: ['16px', { lineHeight: '1.5', fontWeight: '600' }],
        body: ['14px', { lineHeight: '1.57', fontWeight: '400' }],
        small: ['12px', { lineHeight: '1.67', fontWeight: '400' }],
        caption: ['11px', { lineHeight: '1.45', fontWeight: '400' }],
      },
      
      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
        slower: '500ms',
      },
      
      transitionTimingFunction: {
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
        decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
        accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
    },
  },
  corePlugins: {
    preflight: true,  // 保留基础样式
  },
  plugins: [],
}
```

---

## 颜色类映射

### 语义色

#### 成功色（绿色）

```html
<!-- 背景 -->
<div class="bg-success">绿色背景</div>
<div class="bg-success-light">浅绿色背景</div>

<!-- 文字 -->
<span class="text-success">绿色文字</span>
<span class="text-success-darker">深绿色文字</span>

<!-- 边框 -->
<div class="border border-success">绿色边框</div>

<!-- 按钮 -->
<button class="bg-success text-white hover:bg-success-darker">保存</button>
```

#### 错误色（红色）

```html
<!-- 背景 -->
<div class="bg-error">红色背景</div>
<div class="bg-error-light">浅红色背景</div>

<!-- 文字 -->
<span class="text-error">红色文字</span>

<!-- 边框 -->
<div class="border border-error">红色边框</div>

<!-- 删除按钮 -->
<button class="border border-error text-error hover:bg-error-light">删除</button>
```

#### 警告色（橙色）

```html
<div class="bg-warning text-white">警告提示</div>
<span class="text-warning">需要注意</span>
```

#### 信息色（蓝色）

```html
<div class="bg-info text-white">信息提示</div>
<button class="bg-info text-white hover:bg-info-darker">确定</button>
```

### 中性色

#### 文字颜色

```html
<!-- 主要文字 -->
<p class="text-text-primary">主体内容</p>

<!-- 次要文字 -->
<p class="text-text-secondary">二级内容</p>

<!-- 辅助文字 -->
<p class="text-text-tertiary">帮助说明</p>

<!-- 禁用文字 -->
<p class="text-text-disabled">禁用状态</p>
```

#### 背景颜色

```html
<!-- 主背景 -->
<div class="bg-bg-primary">主背景（白色）</div>

<!-- 次级背景 -->
<div class="bg-bg-secondary">次级背景（浅灰）</div>

<!-- 禁用背景 -->
<div class="bg-bg-tertiary">禁用背景</div>

<!-- Hover背景 -->
<div class="hover:bg-bg-hover">Hover变色</div>

<!-- 选中背景 -->
<div class="bg-bg-selected">选中状态</div>
```

#### 边框颜色

```html
<!-- 标准边框 -->
<div class="border border-border-normal">标准边框</div>

<!-- 浅边框 -->
<div class="border border-border-light">浅边框</div>

<!-- 强边框 -->
<div class="border-2 border-border-strong">强边框</div>

<!-- 焦点边框 -->
<input class="border border-border-normal focus:border-border-focus" />
```

---

## 间距类映射

### Padding

```html
<!-- 单边 -->
<div class="pt-lg">上padding 16px</div>
<div class="pr-lg">右padding 16px</div>
<div class="pb-lg">下padding 16px</div>
<div class="pl-lg">左padding 16px</div>

<!-- 多边 -->
<div class="px-lg">左右padding 16px</div>
<div class="py-lg">上下padding 16px</div>

<!-- 四边 -->
<div class="p-lg">四边padding 16px</div>

<!-- 快速应用 -->
<div class="p-xs">4px</div>
<div class="p-sm">8px</div>
<div class="p-md">12px</div>
<div class="p-lg">16px</div>
<div class="p-xl">24px</div>
<div class="p-2xl">32px</div>
```

### Margin

```html
<!-- 单边 -->
<div class="mt-lg">上margin 16px</div>
<div class="mr-lg">右margin 16px</div>
<div class="mb-lg">下margin 16px</div>
<div class="ml-lg">左margin 16px</div>

<!-- 多边 -->
<div class="mx-auto">左右自动（居中）</div>
<div class="my-lg">上下margin 16px</div>

<!-- 快速应用 -->
<div class="m-lg">四边margin 16px</div>
```

### Gap（Flexbox/Grid）

```html
<!-- Flex间距 -->
<div class="flex gap-sm">
  <div>项目1</div>
  <div>项目2</div>
  <!-- 间距8px -->
</div>

<!-- Grid间距 -->
<div class="grid grid-cols-2 gap-lg">
  <div>网格1</div>
  <div>网格2</div>
  <!-- 间距16px -->
</div>
```

### 响应式间距

```html
<!-- 移动端12px，桌面端16px -->
<div class="p-sm md:p-lg">响应式padding</div>

<!-- 移动端竖排，桌面端横排 -->
<div class="flex flex-col md:flex-row gap-sm md:gap-lg">
  <div>左</div>
  <div>右</div>
</div>
```

---

## 圆角类映射

### 基础圆角

```html
<!-- 无圆角 -->
<div class="rounded-xs">无圆角</div>

<!-- 小圆角 4px -->
<button class="rounded-sm">按钮</button>

<!-- 中圆角 6px -->
<div class="rounded-md">中圆角卡片</div>

<!-- 大圆角 8px -->
<div class="rounded-lg">大圆角容器</div>

<!-- 完全圆形 -->
<div class="rounded-pill w-12 h-12">胶囊形</div>
```

### 单边圆角

```html
<!-- 仅右上角 -->
<div class="rounded-tr-lg">右上圆角</div>

<!-- 仅左上角 -->
<div class="rounded-tl-lg">左上圆角</div>

<!-- 仅左下角 -->
<div class="rounded-bl-lg">左下圆角</div>

<!-- 仅右下角 -->
<div class="rounded-br-lg">右下圆角</div>

<!-- 仅上方 -->
<div class="rounded-t-lg">上方圆角</div>

<!-- 仅下方 -->
<div class="rounded-b-lg">下方圆角</div>
```

---

## 阴影类映射

### 阴影深度

```html
<!-- 极淡阴影 -->
<div class="shadow-sm">轻微阴影</div>

<!-- 标准阴影 -->
<div class="shadow-md">标准阴影</div>

<!-- 重阴影 -->
<div class="shadow-lg">重阴影</div>

<!-- 极重阴影 -->
<div class="shadow-xl">极重阴影</div>

<!-- 无阴影 -->
<div class="shadow-none">无阴影</div>
```

### Hover增强阴影

```html
<div class="shadow-md hover:shadow-lg transition-shadow duration-base">
  卡片（Hover增强阴影）
</div>
```

---

## 字体类映射

### 字体大小和权重

```html
<!-- H1 - 20px / 600 -->
<h1 class="text-h1">超大标题</h1>

<!-- H2 - 18px / 600 -->
<h2 class="text-h2">大标题</h2>

<!-- H3 - 16px / 600 -->
<h3 class="text-h3">中等标题</h3>

<!-- Body - 14px / 400（默认） -->
<p class="text-body">正文内容</p>

<!-- Small - 12px / 400 -->
<p class="text-small">小文本</p>

<!-- Caption - 11px / 400 -->
<p class="text-caption">超小文本</p>

<!-- 字重 -->
<p class="font-normal">400 - 正常</p>
<p class="font-medium">500 - 中等</p>
<p class="font-semibold">600 - 半粗</p>
<p class="font-bold">700 - 粗体</p>
```

### 行高和字间距

```html
<!-- 组合使用 -->
<p class="text-body leading-7 tracking-wide">
  带自定义行高和字间距的正文
</p>
```

---

## 常用工具类

### Flex 布局

```html
<!-- 基础Flex -->
<div class="flex">默认横排</div>
<div class="flex flex-col">竖排</div>

<!-- 对齐 -->
<div class="flex items-center">垂直居中</div>
<div class="flex items-start">靠上对齐</div>
<div class="flex items-end">靠下对齐</div>

<!-- 水平对齐 -->
<div class="flex justify-start">靠左</div>
<div class="flex justify-center">居中</div>
<div class="flex justify-end">靠右</div>
<div class="flex justify-between">两端</div>
<div class="flex justify-around">均匀分布</div>

<!-- 弹性增长 -->
<div class="flex">
  <div class="flex-none w-20">固定宽度</div>
  <div class="flex-1">自动增长填充</div>
</div>

<!-- 间距和包裹 -->
<div class="flex flex-wrap gap-lg">
  <div>项目1</div>
  <div>项目2</div>
  <!-- 自动换行，16px间距 -->
</div>
```

### Grid 布局

```html
<!-- 基础Grid -->
<div class="grid gap-lg">
  <div>内容</div>
</div>

<!-- 栅格列 -->
<div class="grid grid-cols-2 gap-lg">
  <div>列1</div>
  <div>列2</div>
</div>

<!-- 自适应列 -->
<div class="grid grid-cols-3 gap-lg md:grid-cols-1">
  <div>响应式</div>
</div>

<!-- 自动适配 -->
<div class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-lg">
  <div>自动卡片</div>
</div>
```

### 尺寸

```html
<!-- 宽度 -->
<div class="w-full">100%</div>
<div class="w-1/2">50%</div>
<div class="w-screen">屏幕宽度</div>

<!-- 高度 -->
<div class="h-screen">屏幕高度</div>
<div class="h-96">384px</div>

<!-- 最大/最小宽高 -->
<div class="max-w-lg">最大宽度</div>
<div class="min-h-screen">最小高度屏幕</div>

<!-- 宽高相等（正方形） -->
<div class="w-24 h-24">96×96px正方形</div>
```

### 边框

```html
<!-- 边框 -->
<div class="border">1px边框</div>
<div class="border-2">2px边框</div>
<div class="border-0">无边框</div>

<!-- 单边边框 -->
<div class="border-t border-b">上下边框</div>
<div class="border-l border-r">左右边框</div>

<!-- 边框颜色 -->
<div class="border border-border-normal">标准边框色</div>
<div class="border border-border-strong">强边框色</div>
```

### 显示/隐藏

```html
<!-- 隐藏 -->
<div class="hidden">隐藏</div>
<div class="invisible">不可见但占空间</div>

<!-- 响应式显示 -->
<div class="hidden md:block">桌面端显示</div>
<div class="block md:hidden">仅移动端显示</div>

<!-- 显示方式 -->
<div class="inline">行内</div>
<div class="block">块级</div>
<div class="inline-block">行内块</div>
```

### 位置

```html
<!-- 相对定位 -->
<div class="relative">
  <div class="absolute top-0 right-0">右上角</div>
</div>

<!-- 固定定位 -->
<div class="fixed top-0 left-0 right-0 bottom-0 z-50">
  全屏固定
</div>

<!-- Sticky定位 -->
<div class="sticky top-0">粘性定位</div>
```

### 透明度

```html
<div class="opacity-100">完全不透明</div>
<div class="opacity-75">75%透明</div>
<div class="opacity-50">50%透明</div>
<div class="opacity-25">25%透明</div>
<div class="opacity-0">完全透明</div>

<!-- Hover时改变透明度 -->
<div class="opacity-75 hover:opacity-100">Hover变完全不透明</div>
```

### 过渡和变换

```html
<!-- 过渡 -->
<div class="transition duration-base">标准过渡</div>
<div class="transition duration-fast">快速过渡</div>
<div class="transition duration-slow">缓慢过渡</div>

<!-- 缩放 -->
<div class="hover:scale-105">Hover放大</div>
<div class="active:scale-95">点击缩小</div>

<!-- 旋转 -->
<div class="hover:rotate-180">Hover旋转180度</div>

<!-- 平移 -->
<div class="hover:translate-x-2">Hover向右平移</div>
<div class="hover:-translate-y-2">Hover向上平移</div>

<!-- 不透明度过渡 -->
<div class="hover:opacity-50">Hover变半透明</div>
```

### 光标

```html
<div class="cursor-auto">auto光标</div>
<div class="cursor-pointer">指针光标</div>
<div class="cursor-not-allowed">禁止光标</div>
<div class="cursor-wait">等待光标</div>
<div class="cursor-move">移动光标</div>
```

---

## 组件示例

### 按钮组件

```html
<!-- 主按钮 -->
<button class="px-lg py-sm bg-success text-white rounded-sm font-medium transition-all duration-base hover:bg-success-darker active:scale-95">
  保存
</button>

<!-- 次按钮 -->
<button class="px-lg py-sm bg-white border border-border-normal text-text-primary rounded-sm font-medium transition-all duration-base hover:bg-bg-secondary hover:border-border-strong">
  取消
</button>

<!-- 危险按钮 -->
<button class="px-lg py-sm bg-white border border-error text-error rounded-sm font-medium transition-all duration-base hover:bg-error hover:text-white">
  删除
</button>

<!-- 禁用按钮 -->
<button disabled class="px-lg py-sm bg-bg-tertiary border border-border-light text-text-disabled rounded-sm cursor-not-allowed opacity-60">
  禁用
</button>
```

### 输入框组件

```html
<!-- 默认输入框 -->
<input 
  type="text" 
  placeholder="请输入..."
  class="w-full px-md py-sm border border-border-normal rounded-sm bg-bg-primary text-text-primary focus:border-border-focus focus:bg-bg-hover focus:outline-none focus:ring-2 focus:ring-success/10 transition-all duration-base"
/>

<!-- 错误状态 -->
<input 
  type="text"
  class="w-full px-md py-sm border border-error rounded-sm bg-error-light text-error focus:outline-none"
/>

<!-- 禁用状态 -->
<input 
  type="text"
  disabled
  class="w-full px-md py-sm border border-border-light rounded-sm bg-bg-tertiary text-text-disabled cursor-not-allowed"
/>
```

### 卡片组件

```html
<div class="rounded-lg border border-border-normal bg-bg-primary shadow-md hover:shadow-lg transition-shadow duration-base">
  <!-- 卡片头 -->
  <div class="p-xl border-b border-border-light bg-bg-secondary">
    <h3 class="text-h3 text-text-primary m-0">卡片标题</h3>
    <p class="text-small text-text-secondary mt-xs">副标题或描述</p>
  </div>
  
  <!-- 卡片内容 -->
  <div class="p-xl">
    <p class="text-body text-text-primary">卡片内容</p>
  </div>
  
  <!-- 卡片底部 -->
  <div class="p-lg border-t border-border-light bg-bg-secondary flex gap-sm justify-end">
    <button class="px-lg py-sm bg-white border border-border-normal rounded-sm">取消</button>
    <button class="px-lg py-sm bg-success text-white rounded-sm">确定</button>
  </div>
</div>
```

### 表格组件

```html
<div class="rounded-lg border border-border-strong overflow-hidden shadow-sm">
  <table class="w-full">
    <!-- 表头 -->
    <thead class="bg-bg-secondary">
      <tr>
        <th class="px-lg py-md text-left text-body font-semibold text-text-primary border-b border-border-normal">
          姓名
        </th>
        <th class="px-lg py-md text-left text-body font-semibold text-text-primary border-b border-border-normal">
          邮箱
        </th>
        <th class="px-lg py-md text-left text-body font-semibold text-text-primary border-b border-border-normal">
          操作
        </th>
      </tr>
    </thead>
    
    <!-- 表体 -->
    <tbody>
      <tr class="border-b border-border-light hover:bg-bg-hover transition-colors duration-base">
        <td class="px-lg py-md text-text-primary">张三</td>
        <td class="px-lg py-md text-text-primary">zhangsan@example.com</td>
        <td class="px-lg py-md flex gap-sm">
          <button class="text-success hover:text-success-darker">编辑</button>
          <button class="text-error hover:text-error-darker">删除</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

### 表单组件

```html
<form class="flex flex-col gap-lg">
  <!-- 表单组 -->
  <fieldset>
    <legend class="text-h3 font-semibold text-text-primary mb-lg pb-lg border-b border-border-light">
      基本信息
    </legend>
    
    <!-- 表单项 -->
    <div class="flex flex-col gap-xs mb-lg">
      <label class="text-body font-medium text-text-primary">
        用户名 <span class="text-error">*</span>
      </label>
      <input 
        type="text"
        required
        class="px-md py-sm border border-border-normal rounded-sm bg-bg-primary focus:border-border-focus"
      />
      <span class="text-small text-text-tertiary">请输入3-20个字符</span>
    </div>
    
    <!-- 表单项 -->
    <div class="flex flex-col gap-xs mb-lg">
      <label class="text-body font-medium text-text-primary">
        邮箱 <span class="text-error">*</span>
      </label>
      <input 
        type="email"
        required
        class="px-md py-sm border border-border-normal rounded-sm bg-bg-primary focus:border-border-focus"
      />
    </div>
  </fieldset>
  
  <!-- 操作栏 -->
  <div class="flex gap-sm justify-end pt-lg border-t border-border-light">
    <button class="px-lg py-sm bg-white border border-border-normal rounded-sm hover:bg-bg-secondary">
      取消
    </button>
    <button class="px-lg py-sm bg-success text-white rounded-sm hover:bg-success-darker">
      提交
    </button>
  </div>
</form>
```

### 菜单/下拉

```html
<div class="relative">
  <!-- 触发器 -->
  <button 
    class="flex items-center gap-xs px-lg py-sm bg-white border border-border-normal rounded-sm text-text-primary hover:bg-bg-secondary transition-colors"
    @click="toggle"
  >
    <span>选项</span>
    <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': isOpen }">
      <!-- 下箭头图标 -->
    </svg>
  </button>
  
  <!-- 下拉菜单 -->
  <div v-if="isOpen" class="absolute top-full left-0 mt-sm min-w-40 bg-bg-primary border border-border-normal rounded-lg shadow-lg z-1000">
    <button class="w-full px-lg py-md text-left text-body text-text-primary hover:bg-bg-hover transition-colors">
      新增
    </button>
    <button class="w-full px-lg py-md text-left text-body text-text-primary hover:bg-bg-hover transition-colors">
      编辑
    </button>
    <hr class="border-b border-border-light" />
    <button class="w-full px-lg py-md text-left text-body text-error hover:bg-error-light transition-colors">
      删除
    </button>
  </div>
</div>
```

---

## 与Vuetify的协调

### 避免冲突

Tailwind 和 Vuetify 都会生成 CSS，可能产生冲突。解决策略：

#### 1. 使用 `!important` 提升优先级

```javascript
// tailwind.config.js
module.exports = {
  important: true,  // 所有Tailwind类都加!important
}
```

#### 2. 在特定选择器上使用 `!`

```html
<!-- 仅这个元素强制应用Tailwind -->
<div class="!bg-success">强制绿色背景</div>
```

#### 3. 优先级顺序

```html
<!-- 建议顺序 -->
<div class="
  /* 1. 布局 */
  flex flex-col gap-lg
  /* 2. 尺寸 */
  w-full h-auto
  /* 3. 间距 */
  p-lg m-0
  /* 4. 圆角 */
  rounded-lg
  /* 5. 边框 */
  border border-border-normal
  /* 6. 背景/颜色 */
  bg-bg-primary text-text-primary
  /* 7. 阴影 */
  shadow-md
  /* 8. 过渡/变换 */
  transition-all duration-base hover:shadow-lg
">
  内容
</div>
```

### 与Vuetify组件配合

```vue
<template>
  <div class="p-lg">
    <!-- Tailwind容器 -->
    <div class="flex gap-lg mb-xl">
      <!-- Vuetify按钮 -->
      <v-btn color="success" @click="save">
        保存
      </v-btn>
      
      <!-- Tailwind按钮 -->
      <button class="px-lg py-sm bg-white border border-border-normal rounded-sm hover:bg-bg-secondary">
        取消
      </button>
    </div>
    
    <!-- Vuetify表格 -->
    <v-data-table
      :headers="headers"
      :items="items"
      class="!shadow-md"  <!-- 强制覆盖Vuetify阴影 -->
    />
  </div>
</template>
```

---

## 性能优化

### 1. 仅引入使用的类

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{vue,js,ts}',  // 只扫描这些文件
    './docs/**/*.md',
  ],
  // 不包括不使用的文件
}
```

### 2. 使用 PurgeCSS 删除未使用的样式

```bash
npm install -D @fullhuman/postcss-purgecss
```

### 3. 提取常用组件类

```css
/* src/style/components.css */
@layer components {
  .btn-primary {
    @apply px-lg py-sm bg-success text-white rounded-sm font-medium transition-all duration-base hover:bg-success-darker active:scale-95;
  }
  
  .btn-secondary {
    @apply px-lg py-sm bg-white border border-border-normal rounded-sm font-medium transition-all duration-base hover:bg-bg-secondary;
  }
  
  .input-base {
    @apply w-full px-md py-sm border border-border-normal rounded-sm bg-bg-primary focus:border-border-focus focus:outline-none;
  }
  
  .card-base {
    @apply rounded-lg border border-border-normal bg-bg-primary shadow-md hover:shadow-lg transition-shadow duration-base;
  }
}
```

然后在 HTML 中使用：

```html
<!-- 使用提取的类 -->
<button class="btn-primary">保存</button>
<input type="text" class="input-base" />
<div class="card-base">卡片</div>
```

### 4. 响应式设计优化

```html
<!-- 只在需要时添加响应式前缀 -->
<div class="
  w-full              /* 移动端 */
  md:w-1/2            /* 平板端 */
  lg:w-1/3            /* 桌面端 -->
  gap-sm              /* 移动端 -->
  md:gap-lg           /* 桌面端 -->
">
  响应式内容
</div>
```

---

## 快速参考

### 颜色速查

```
成功（绿）: success / success-light / success-darker
错误（红）: error / error-light / error-darker
警告（橙）: warning / warning-light / warning-darker
信息（蓝）: info / info-light / info-darker
```

### 间距速查

```
4px: xs / 1
8px: sm / 2
12px: md / 3
16px: lg / 4
24px: xl / 6
32px: 2xl / 8
```

### 圆角速查

```
4px: rounded-sm
6px: rounded-md
8px: rounded-lg
9999px: rounded-pill
```

### 阴影速查

```
轻: shadow-sm
标准: shadow-md
重: shadow-lg
极重: shadow-xl
```

---

## 最佳实践

1. ✅ 使用设计令牌而非硬编码值
2. ✅ 将常用类组合提取为组件类
3. ✅ 使用响应式前缀处理不同屏幕
4. ✅ 避免过度嵌套的 @apply
5. ✅ 在 vue scoped style 中谨慎使用 Tailwind
6. ✅ 使用 !important 处理Vuetify冲突
7. ✅ 定期检查未使用的CSS并删除
8. ✅ 为颜色、间距等值建立清晰的映射关系

