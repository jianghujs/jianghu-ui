---
trigger: model_decision
description: 江湖JS移动端开发规范
globs: app/view/page/mobile/**/*.html
---

# 江湖JS移动端开发规范

本规范旨在提高移动端代码质量、可读性和可维护性，降低团队协作成本。所有移动端项目成员都应遵循本规范。

## 一、移动端开发概述

移动端开发主要使用 `jhMobileTemplateV4` 模板，针对移动端进行优化。

## 二、HTML模板开发模式（主要模式）

### 2.1 基础模板结构

移动端HTML页面基于 `jhMobileTemplateV4` 模板。更全面的移动端开发技术栈和架构，请参见：[江湖JS UniApp移动端开发规范](jianghu-uniapp.md)

基础HTML结构示例：

```html
{% extends 'template/jhMobileTemplateV4.html'%}

{% block vueTemplate %}
<script type="text/html" id="app-template">
<div>
<v-app mobile-breakpoint="sm">
  <jh-menu>
    <template v-slot:title>页面标题</template>
  </jh-menu>
  <v-main class="mt-13">
    <!-- 页面内容 -->
  </v-main>
</v-app>
</div>
</script>
{% endblock %}
```

### 2.2 核心模板块说明

| 模板块 | 用途 | 必填 |
|--------|------|------|
| `htmlHead` | 自定义head内容，如CSS、meta标签 | 否 |
| `vueTemplate` | Vue模板内容，包含页面结构 | ✅ |
| `vueScript` | Vue实例和脚本逻辑 | ✅ |

### 2.3 移动端页面布局结构

```html
<v-app mobile-breakpoint="sm">
  <!-- 顶部菜单 -->
  <jh-menu>
    <template v-slot:title>页面标题</template>
  </jh-menu>
  
  <!-- 主内容区域 -->
  <v-main class="mt-13">
    <!-- 头部工具栏 -->
    <div class="jh-page-second-bar px-3 py-2 border-b">
      <!-- 排序、筛选、模式切换等 -->
    </div>
    
    <!-- 页面主体内容 -->
    <div class="jh-page-body-container">
      <!-- 列表内容 -->
    </div>
    
    <!-- 底部分页信息 -->
    <div class="fixed left-0 bottom-0 py-2 px-3 bg-white border-t w-full">
      <!-- 分页控件 -->
    </div>
  </v-main>
</v-app>
```

### 2.4 移动端核心组件

#### 2.4.1 顶部工具栏

```html
<div class="jh-page-second-bar px-3 py-2 border-b">
  <v-row class="align-center justify-space-between" no-gutters>
    <!-- 排序按钮 -->
    <div class="inline-flex bg-white h-8 leading-8 rounded-lg mr-3 text-[13px] text-gray-600" 
         :class="{'text-green-600': !!usePageOrder}" 
         @click="isPageOrderDrawerShown = true">
      <v-icon :color="usePageOrder ? 'primary' : ''" size="14" class="mr-1">
        mdi-sort-ascending
      </v-icon>
      排序
    </div>
    
    <!-- 筛选按钮 -->
    <div class="inline-flex bg-white h-8 leading-8 rounded-lg text-[13px] text-gray-600" 
         :class="{'text-green-600': !!usePageSearch}" 
         @click="isPageSearchDrawerShown = true">
      <v-icon :color="usePageSearch ? 'primary' : ''" size="14" class="mr-1">
        mdi-filter-multiple-outline
      </v-icon>
      筛选
    </div>
    
    <!-- 模式切换 -->
    <v-spacer></v-spacer>
    <v-menu nudge-bottom="36" class="elevation-0">
      <template v-slot:activator="{ on, attrs }">
        <div class="inline-flex bg-white h-8 leading-8 rounded-lg font-medium text-[13px]"
             v-bind="attrs" v-on="on">
          <v-icon size="14" class="mr-1">mdi-view-carousel-outline</v-icon>
          {{ viewMode == 'simple' ? '简洁模式' : '详细模式' }}
        </div>
      </template>
      <div class="flex flex-col p-2 pb-0">
        <v-btn small class="mb-2" @click="viewMode = 'simple'" 
               :class="{primary: viewMode == 'simple', '!text-white': viewMode == 'simple'}">
          简洁模式
        </v-btn>
        <v-btn small class="mb-2" @click="viewMode = 'detail'" 
               :class="{primary: viewMode == 'detail', '!text-white': viewMode == 'detail'}">
          详细模式
        </v-btn>
      </div>
    </v-menu>
  </v-row>
</div>
```

#### 2.4.2 移动端列表项

```html
<div class="flex p-3 relative bg-white mb-2" 
     v-for="(item, index) in tableDataComputed" 
     @click="viewMode == 'simple' && doUiAction('startDetailItem', item)">
  <div class="flex-1">
    <!-- 标题行 -->
    <div class="flex items-start border-b pb-1.5 w-full">
      <div class="flex-1 flex min-w-0">
        <div class="text-base font-medium break-words line-clamp-1 break-all">
          {{ item.name }}
        </div>
        <div class="shrink-0 grow">
          <span :class="'ml-2 text-sm align-sub ' + statusColor(item.status)">
            {{ item.status }}
          </span>
        </div>
      </div>
      <!-- 操作按钮 -->
      <div v-if="viewMode == 'simple'" 
           class="ml-2 translate-y-[3px] shrink-0 inline-flex items-center font-medium text-[#4caf50] border-b border-dashed border-[#4caf50]">
        <span class="text-xs">查看详情</span>
        <v-icon size="16" color="success">mdi-chevron-right</v-icon>
      </div>
    </div>
    
    <!-- 简洁模式信息 -->
    <div v-show="viewMode != 'detail'" class="text-xs pt-2 grid grid-cols-2 gap-x-4 gap-y-1">
      <div class="flex items-center gap-1">
        <div class="text-[#7E838F]">字段1：</div>
        <div>{{ item.field1 }}</div>
      </div>
    </div>
    
    <!-- 详细模式信息 -->
    <div v-show="viewMode == 'detail'" class="text-xs pt-2 grid grid-cols-2 gap-x-4 gap-y-1">
      <!-- 更多字段显示 -->
      <div class="flex justify-end items-center col-span-2">
        <span role="button" class="success--text font-weight-medium font-size-2 mr-2" 
              @click="doUiAction('startUpdateItem', item)">
          <v-icon size="16" class="success--text">mdi-note-edit-outline</v-icon>编辑
        </span>
      </div>
    </div>
  </div>
</div>
```

#### 2.4.3 底部抽屉（编辑表单）

```html
<v-bottom-sheet v-if="isUpdateDrawerShown" v-model="isUpdateDrawerShown" 
                style="z-index: 111;" fixed temporary>
  <v-form ref="updateForm" lazy-validation>
    <div class="!h-[calc(100dvh-52px)] relative rounded-t-lg bg-white overflow-hidden overflow-y-auto">
      <!-- 抽屉标题 -->
      <v-row class="jh-drawer-header pl-3 py-1 h-[48px] relative pr-10" no-gutters align="center">
        <span class="text-base font-medium line-clamp-1 max-w-[calc(100%-40px)]">编辑</span>
        <v-spacer></v-spacer>
        <div class="success--text text-xs text-center absolute right-3" 
             @click="isUpdateDrawerShown = false">
          <v-icon size="22" class="success--text">mdi-window-close</v-icon>
          <div class="success--text mt-[-2px]">关闭</div>
        </div>
      </v-row>
      
      <v-divider class="jh-divider"></v-divider>
      
      <!-- 标签页切换 -->
      <div class="px-3 border-b sticky top-0 bg-white z-10">
        <v-tabs v-model="updateDrawerTab" color="success" height="36">
          <v-tab key="0">基础信息</v-tab>
          <v-tab key="1">详细信息</v-tab>
        </v-tabs>
      </div>
      
      <!-- 表单内容 -->
      <v-tabs-items v-model="updateDrawerTab">
        <v-tab-item key="0">
          <v-row class="m-0 p-0 pb-[calc(env(safe-area-inset-bottom)+72px)]">
            <v-col cols="12" class="flex flex-wrap items-start border-b py-2">
              <span class="jh-input-label w-1/3 pr-2">字段名</span>
              <v-text-field placeholder="请输入" 
                            class="jh-v-input mt-0 pt-0 w-2/3 inline-block" 
                            v-model="updateItem.field" 
                            dense single-line>
              </v-text-field>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
      
      <!-- 底部操作按钮 -->
      <div class="p-3 fixed bottom-0 left-0 right-0 bg-white border-t jh-safe-bottom-3">
        <div class="w-full gap-x-3 grid grid-cols-[repeat(auto-fit,minmax(50px,1fr))] gap-2 relative">
          <v-btn color="success" @click="doUiAction('updateItem')" small>保存</v-btn>
        </div>
      </div>
    </div>
  </v-form>
</v-bottom-sheet>
```


## 三、移动端样式规范

### 3.1 移动端专用CSS类

```css
/* 安全区域适配 */
.jh-safe-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}

.jh-safe-bottom-3 {
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
}

/* 页面布局 */
.jh-page-second-bar {
  background-color: #f5f5f5;
}

.jh-page-body-container {
  min-height: calc(100vh - 200px);
}

/* 抽屉样式 */
.jh-drawer-header {
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
}

/* 输入框样式 */
.jh-input-label {
  padding-top: 8px;
  font-weight: 500;
  color: #666;
  line-height: 1.5;
}

.jh-v-input .v-input__control {
  min-height: 36px !important;
}

/* 文本截断 */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

### 3.2 响应式断点

```css
/* 移动端断点：< 600px */
@media (max-width: 599px) {
  .mobile-only {
    display: block !important;
  }
  .desktop-only {
    display: none !important;
  }
  
  .v-btn {
    min-width: 44px;
    min-height: 44px;
  }
}

/* 桌面端断点：>= 600px */
@media (min-width: 600px) {
  .mobile-only {
    display: none !important;
  }
  .desktop-only {
    display: block !important;
  }
}
```

## 四、移动端开发最佳实践

### 4.1 命名规范

- 抽屉显示状态：`is[Name]DrawerShown`
- 数据项：`[name]Item` / `[name]List`
- 搜索条件：`serverSearchWhere` / `serverSearchWhereLike`
- 打开抽屉：`open[Name]Drawer`
- 关闭抽屉：`close[Name]Drawer`
- 准备数据：`prepare[Name]Data`
- 执行操作：`do[Name]`

### 4.2 数据流管理

```javascript
// 标准数据流：准备参数 -> 获取数据 -> 格式化数据
async doUiAction('getTableData') {
  await this.prepareTableParamsDefault(); // 1. 准备查询参数
  await this.getTableData();              // 2. 获取数据
  await this.formatTableData();           // 3. 格式化数据
}
```

### 4.3 错误处理

```javascript
async doUiAction(uiActionId, uiActionData) {
  try {
    // 业务逻辑
  } catch (error) {
    window.jhMask && window.jhMask.hide();
    if (error.message !== '取消') {
      window.vtoast.fail(error.message || '操作失败');
    }
    throw error;
  } finally {
    window.jhMask && window.jhMask.hide();
  }
}
```

## 五、性能优化

### 5.1 数据加载优化

```javascript
// 服务端分页
tableOptions: {
  page: 1,
  limit: 10, // 移动端建议较小分页
  totalCount: 0
}

// 图片懒加载
<v-img :lazy-src="'/placeholder.jpg'" :src="item.imageUrl" />

// 防抖搜索
const searchDebounced = _.debounce(this.doSearch, 500);
```

### 5.2 虚拟滚动（大数据量）

```html
<v-virtual-scroll :items="largeList" height="400px" item-height="48">
  <template v-slot:default="{ item }">
    <!-- 列表项内容 -->
  </template>
</v-virtual-scroll>
```

## 六、兼容性与支持

### 6.1 浏览器支持

- iOS Safari 12+
- Android Chrome 70+
- 微信内置浏览器
- 支付宝内置浏览器

### 6.2 设备支持

- iPhone 6+ (375px+ 宽度)
- Android 6.0+ 设备
- 支持触摸操作
- 最小触摸目标：44px × 44px

## 七、常见问题

### 7.1 样式问题

**问题**：页面在移动端显示异常
**解决方案**：
1. 确保使用 `jhMobileTemplateV4` 模板
2. 检查 viewport 设置
3. 使用 TailwindCSS 响应式类

### 7.2 性能问题

**问题**：页面加载缓慢
**解决方案**：
1. 启用服务端分页（limit: 10-20）
2. 使用图片懒加载
3. 减少同时渲染的数据量

### 7.3 交互问题

**问题**：触摸操作不响应
**解决方案**：
1. 确保触摸目标不小于44px
2. 避免事件冲突
3. 检查z-index层级

遵循以上规范能够确保移动端应用的一致性、性能和用户体验。推荐优先使用HTML模板模式进行移动端开发。