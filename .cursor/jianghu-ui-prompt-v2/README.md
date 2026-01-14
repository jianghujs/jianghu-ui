# JianghuJS UI - AI 知识库 v2

> **目标**: 为 AI 编程助手提供快速集成 jianghu-ui 组件的知识库

## 📚 组件文档列表

### 核心组件（必读）

- **[JhTable.md](./JhTable.md)** - 高级表格组件
  - 服务端分页、批量操作、筛选、操作列
  - 最常用的数据展示组件

- **[JhForm.md](./JhForm.md)** - 高级表单组件
  - 多种字段类型、字段联动、验证规则
  - 表单开发的核心组件

- **[JhDescriptions.md](./JhDescriptions.md)** - 描述列表组件
  - 详情页展示、可编辑模式、ValueType
  - 详情页必备组件

- **[JhCard.md](./JhCard.md)** - 高级卡片组件
  - 分栏、栅格、折叠、操作项
  - 页面布局基础组件

- **[JhLayout.md](./JhLayout.md)** - 页面布局组件
  - 后台管理系统标准布局
  - 应用入口组件

### 表单相关

- **[JhModalForm.md](./JhModalForm.md)** - 弹窗表单
  - 新增/编辑弹窗的快捷方案

- **[JhFormList.md](./JhFormList.md)** - 动态表单列表
  - 处理数组类型字段

- **[JhQueryFilter.md](./JhQueryFilter.md)** - 高级筛选
  - 查询表单、可折叠

- **[JhDrawerForm.md](./JhDrawerForm.md)** - 抽屉表单
  - 侧边抽屉表单

- **[JhStepsForm.md](./JhStepsForm.md)** - 分步表单
  - 多步骤表单向导

### 数据展示

- **[JhList.md](./JhList.md)** - 列表组件
  - 卡片列表、网格列表

- **[JhStatisticCard.md](./JhStatisticCard.md)** - 统计卡片
  - 数据统计展示

- **[JhCheckCard.md](./JhCheckCard.md)** - 多选卡片
  - 卡片式选择组件

### 交互组件

- **[JhModal.md](./JhModal.md)** - 弹窗组件
  - 基础弹窗

- **[JhDrawer.md](./JhDrawer.md)** - 抽屉组件
  - 侧边抽屉

- **[JhConfirmDialog.md](./JhConfirmDialog.md)** - 确认对话框
  - 确认操作

### 其他组件

- **[JhPageContainer.md](./JhPageContainer.md)** - 页面容器
- **[JhEditableTable.md](./JhEditableTable.md)** - 可编辑表格
- **[JhFileInput.md](./JhFileInput.md)** - 文件上传
- **[JhJsonEditor.md](./JhJsonEditor.md)** - JSON 编辑器
- **[JhMarkdownEditor.md](./JhMarkdownEditor.md)** - Markdown 编辑器
- **[JhTreeSelect.md](./JhTreeSelect.md)** - 树形选择
- **[JhWaterMark.md](./JhWaterMark.md)** - 水印组件

## 🚀 快速开始

### 1. 技术栈
- **Vue 2.7** + Options API（不是 Vue 3）
- **Vuetify 2.x**（不是 Vuetify 3）
- **组件前缀**: `Jh`

### 2. 基础模板
```vue
<template>
  <v-app>
    <jh-layout
      app-name="我的应用"
      :menu-items="menuItems"
    >
      <router-view />
    </jh-layout>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [
        { title: '首页', icon: 'mdi-home', path: '/home' }
      ]
    };
  }
};
</script>
```

### 3. 常见页面类型

#### CRUD 列表页
```vue
<template>
  <jh-table
    header-title="用户管理"
    :headers="headers"
    :request="fetchData"
    :show-select="true"
    :action-column="actionColumn"
  >
    <template v-slot:toolbar-actions>
      <v-btn color="success" @click="handleCreate">
        <v-icon left>mdi-plus</v-icon>新增
      </v-btn>
    </template>
  </jh-table>
</template>
```

#### 表单页
```vue
<template>
  <jh-form
    :fields="fields"
    :initial-data="formData"
    @submit="handleSubmit"
  >
    <template #actions="{ validate, resetForm }">
      <v-btn @click="resetForm">重置</v-btn>
      <v-btn color="primary" @click="validate">提交</v-btn>
    </template>
  </jh-form>
</template>
```

#### 详情页
```vue
<template>
  <jh-card title="用户详情">
    <jh-descriptions
      :columns="columns"
      :data-source="userData"
      :column="3"
      bordered
    />
  </jh-card>
</template>
```

## 💡 使用方式

### 在 Cursor 中使用

#### 方式一：@引用文件
```
@JhTable.md 创建一个用户管理页面
@JhForm.md 创建一个带字段联动的表单
@JhDescriptions.md 创建一个详情页
```

#### 方式二：直接提问
```
使用 JhTable 创建一个商品管理页面，包含新增、编辑、删除功能
使用 JhForm 创建一个订单表单，包含动态商品明细
使用 JhDescriptions 创建一个用户详情页，可编辑
```

### 在其他 AI 工具中使用

1. 复制对应组件的 `.md` 文件内容
2. 粘贴到对话中作为上下文
3. 提出你的需求

## ⚠️ 重要规则

### 必须遵守

1. **所有组件必须包裹在 `<v-app>` 中**
2. **使用 Vue 2.7 Options API，不要用 Composition API**
3. **使用 Vuetify 2.x API，不要用 Vuetify 3 API**
4. **组件名以 `Jh` 开头，首字母大写**
5. **服务端分页用 `request`，不要用 `items`**

### 常见错误

❌ **错误示例**
```vue
<!-- 错误：没有 v-app -->
<jh-layout>...</jh-layout>

<!-- 错误：使用 Vue 3 语法 -->
<script setup>
const data = ref([])
</script>

<!-- 错误：客户端分页用 request -->
<jh-table :request="fetchData" :items="data" />
```

✅ **正确示例**
```vue
<!-- 正确：包裹 v-app -->
<v-app>
  <jh-layout>...</jh-layout>
</v-app>

<!-- 正确：使用 Vue 2 Options API -->
<script>
export default {
  data() {
    return { data: [] }
  }
}
</script>

<!-- 正确：服务端分页只用 request -->
<jh-table :request="fetchData" />
```

## 📖 学习路径

### 第一步：了解核心组件
1. 阅读 [JhTable.md](./JhTable.md) - 学习表格使用
2. 阅读 [JhForm.md](./JhForm.md) - 学习表单使用
3. 阅读 [JhLayout.md](./JhLayout.md) - 学习布局使用

### 第二步：实践常见场景
1. 创建一个 CRUD 列表页（JhTable + JhModalForm）
2. 创建一个复杂表单页（JhForm + 字段联动）
3. 创建一个详情页（JhCard + JhDescriptions）

### 第三步：掌握高级功能
1. 表格的批量操作和筛选
2. 表单的动态列表（JhFormList）
3. 分步表单（JhStepsForm）

## 🎯 提示词模板

### 创建 CRUD 页面
```
使用 JhTable 创建一个[实体名]管理页面，包含：
- 列表展示（字段：[字段1]、[字段2]、[字段3]）
- 新增/编辑功能（使用 JhModalForm）
- 删除功能（带确认）
- 按[字段]筛选
```

### 创建表单页面
```
使用 JhForm 创建一个[表单名]，包含：
- 基本信息（字段：[字段列表]）
- 字段联动：当[字段A]为[值]时，显示[字段B]
- 动态列表：[列表名]（使用 JhFormList）
```

### 创建详情页面
```
使用 JhDescriptions 创建一个[实体名]详情页，包含：
- 基本信息（字段：[字段列表]）
- 可编辑模式
- 字段复制功能
```

## 🔗 更多资源

- **旧版提示词**: `.cursor/jianghu-ui-prompt/` 目录
- **组件 README**: `src/components/*/README.md`
- **Storybook 示例**: `src/components/*/*.stories.js`

## 📝 更新日志

### v2.0.0 (2024-11)
- ✨ 创建 AI 知识库 v2
- ✨ 为每个组件创建快速集成指南
- ✨ 提供快速模板和提示词示例
- 🎯 优化 AI 可读性和集成效率

---

**Happy Coding with JianghuJS UI! 🎉**
