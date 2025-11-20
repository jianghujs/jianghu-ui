# Skill：Jianghu UI 页面构建助手

> 版本：v1.0 · 2025-11-20  
> 目标：为 Claude Code 提供可复用的 jianghu-ui 页面搭建知识，保障在任意工程里都能快速调用 Vue 2 + Vuetify 生态与组件库能力

---

## 🎯 Skill 定位
- 定位为“后台页面生成助手”，聚焦在 CRUD 列表、复杂表单、筛选器、详情抽屉等典型场景。
- 约束 Claude 始终复用 `@jianghujs/jianghu-ui` 提供的组件，而不是手写原生元素或引入其它 UI 库。
- 明确依赖：Vue 2.7、Vuetify 2.x、Options API、Material Design 规范。

## ⚙️ 技术基线
- 运行环境：Vue 2 + Vuetify，所有页面需包裹在 `<v-app>` 并创建 `new Vuetify()` 实例。
- 引入方式：
  - CDN：直接在 HTML 中引入 Vue、Vuetify、组件库打包脚本。
  - NPM：`import { JhTable, JhForm, ... } from '@jianghujs/jianghu-ui';` 并在全局注册。
- 图标字体：默认依赖 `@mdi/font@6.x` 与 Roboto。
- 文档入口：`doc/jianghu-ui/AI_KNOWLEDGE_BASE.md`、`doc/jianghu-ui/QUICK_REFERENCE.md`。

## 🧠 Claude 工作流
1. **需求澄清**：确认页面目标、数据模型（字段名、类型、校验）、操作（增删改查、导出等）、接口协议。
2. **选择布局模式**：优先使用 `JhPageContainer` + `JhScene` + `JhMenu/JhLayout`，必要时引入 `JhDrawer`、`JhModalForm` 等浮层。
3. **搭建骨架**：按“筛选区 → 数据区 → 交互浮层”顺序堆叠，保持职责单一。
4. **绑定数据**：`JhTable` 的服务端数据通过 `request` 方法实现，表单与筛选器通过 `v-model` 或事件上报。
5. **状态管理**：本地状态放在 `data()`，跨组件状态使用 Vuex / Pinia / provide-inject，保持 Skill 不绑定具体实现。
6. **交互验证**：补充加载态、空态、错误提示，必要时用 `JhToast`、`JhMask`。
7. **自检**：围绕 props、事件、接口契约、UI 要求再走查一次。

## 🚀 快速集成片段
```html
<!-- CDN 模式基础骨架 -->
<link href="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet">
<div id="app">
  <v-app>
    <jh-page-container title="示例页面">
      <router-view />
    </jh-page-container>
  </v-app>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.7/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@jianghujs/jianghu-ui/dist/index.umd.js"></script>
<script>
  new Vue({
    el: '#app',
    vuetify: new Vuetify(),
  });
</script>
```

---

## 🧩 关键组件速查
- **`JhTable`**（`src/components/JhTable`）  
  - `headers`: `{ text, value, sortable, align }` 数组。  
  - `items`: 静态数据；如启用服务端模式改为 `:request="loadList"`，函数需返回 `{ data, total }`。  
  - `show-filter`/`filter-fields`: 内置筛选行，字段结构与 `JhQueryFilter` 相同。  
  - 事件：`@row-click`、`@create-click`、`@update-click`、`@delete-click`。  
  - 支持多选：`show-select` + `@selection-change`。  
  - 详见 `doc/jianghu-ui/QUICK_REFERENCE.md:19`。

- **`JhQueryFilter`**  
  - 通过 `:fields="[{ key, label, type, options }]"` 描述。  
  - `@search` 回调会返回 form 数据，结合 `JhTable` 的 `reload(params)`。  
  - 内置常用控件：文本、选择、`JhDateRangePicker`。

- **`JhForm` / `JhFormList` / `JhFormFields`**  
  - `JhForm` 用于单实体编辑，`fields` 与 `JhQueryFilter` 共享描述协议。  
  - `JhFormList` 通过 `v-model` 管理数组，`min/max` 约束条目数量。  
  - 推荐使用字段 `rules`（字符串或数组）统一校验逻辑。

- **`JhModalForm` & `JhDrawerForm`**  
  - 均以 `v-model` 控制显隐。  
  - `JhModalForm` 适合短流程 CRUD；`JhDrawerForm` 用于左右滑出的详情/编辑。  
  - 常配合 `JhTable` 的 `@create-click`/`@update-click` 事件触发。

- **`JhDrawer` / `JhDrawerForm` / `JhDrawer` + `JhForm`**  
  - `placement` 控制方向（`left/right`），`width` 默认 480px。  
  - 记得在 `@close` 中同步外部状态。

- **`JhDateRangePicker`**  
  - `v-model` 为数组 `[start, end]`，`format` 默认 `YYYY-MM-DD HH:mm:ss`。  
  - 与 `JhQueryFilter` 联动时，在字段定义中设置 `type: 'daterange'`。

- **`JhToast`、`JhConfirmDialog`、`JhMask`**  
  - `JhToast` 提供全局提示，可通过事件总线/插件调用。  
  - `JhConfirmDialog` 用在危险操作前：`<jh-confirm-dialog v-model="confirmVisible" :title="..." @confirm="...">`。  
  - `JhMask` 包裹需要加载态的区域。

- **布局家族**  
  - `JhLayout`/`JhScene`/`JhPageContainer` 组合出标准后台框架。  
  - `JhMenu` 负责侧栏导航，`items` 结构 `{ title, icon, route, children }`。  
  - `JhWaterMark` 可用于页面级水印。

---

## 📚 场景模板

### 1. 标准 CRUD 列表（表格 + 筛选 + 弹窗表单）
```vue
<template>
  <jh-page-container title="用户管理">
    <jh-query-filter :fields="filterFields" @search="handleSearch" @reset="handleReset" />
    <jh-table
      ref="table"
      :headers="headers"
      :request="fetchUsers"
      :show-filter="false"
      show-select
      @create-click="openCreate"
      @update-click="openEdit"
      @delete-click="handleDelete"
    />
    <jh-modal-form
      v-model="formVisible"
      :title="isEdit ? '编辑用户' : '新增用户'"
      :fields="formFields"
      :initial-data="currentRow"
      @confirm="handleSubmit"
    />
  </jh-page-container>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: 'ID', value: 'id' },
        { text: '姓名', value: 'name' },
        { text: '邮箱', value: 'email' },
      ],
      filterFields: [
        { key: 'keyword', label: '关键词', type: 'text' },
        { key: 'status', label: '状态', type: 'select', options: statusOptions },
      ],
      formFields: [
        { key: 'name', label: '姓名', type: 'text', required: true },
        { key: 'email', label: '邮箱', type: 'text', rules: 'email' },
        { key: 'role', label: '角色', type: 'select', options: roleOptions },
      ],
      filters: {},
      formVisible: false,
      isEdit: false,
      currentRow: {},
    };
  },
  methods: {
    async fetchUsers({ page, pageSize }) {
      const res = await this.$api.user.list({ page, pageSize, ...this.filters });
      return { data: res.list, total: res.total };
    },
    handleSearch(payload) {
      this.filters = payload;
      this.$refs.table.reload();
    },
    handleReset() {
      this.filters = {};
      this.$refs.table.reload();
    },
    openCreate() {
      this.isEdit = false;
      this.currentRow = {};
      this.formVisible = true;
    },
    openEdit(row) {
      this.isEdit = true;
      this.currentRow = { ...row };
      this.formVisible = true;
    },
    async handleSubmit(data) {
      if (this.isEdit) {
        await this.$api.user.update(data.id, data);
      } else {
        await this.$api.user.create(data);
      }
      this.formVisible = false;
      this.$refs.table.reload();
    },
    async handleDelete(row) {
      await this.$api.user.remove(row.id);
      this.$refs.table.reload();
    },
  },
};
</script>
```

### 2. 抽屉详情 + 动态表单列表
```vue
<template>
  <jh-page-container title="工单中心">
    <jh-table
      :headers="headers"
      :request="fetchTickets"
      @row-click="openDrawer"
    />
    <jh-drawer v-model="drawerVisible" title="工单详情" width="640">
      <jh-descriptions :items="detailItems" :column="2" />
      <jh-form-list
        v-model="logList"
        :fields="logFields"
        :min="1"
        render-mode="card"
      />
    </jh-drawer>
  </jh-page-container>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: '工单号', value: 'code' },
        { text: '优先级', value: 'priority' },
        { text: '状态', value: 'status' },
      ],
      drawerVisible: false,
      detailItems: [],
      logFields: [
        { key: 'time', label: '时间', type: 'datetime' },
        { key: 'content', label: '处理内容', type: 'textarea' },
      ],
      logList: [],
    };
  },
  methods: {
    async fetchTickets(params) {
      const res = await this.$api.ticket.list(params);
      return { data: res.list, total: res.total };
    },
    async openDrawer(row) {
      const detail = await this.$api.ticket.detail(row.id);
      this.detailItems = [
        { label: '工单号', value: detail.code },
        { label: '创建人', value: detail.creator },
      ];
      this.logList = detail.logs;
      this.drawerVisible = true;
    },
  },
};
</script>
```

---

## ✅ 设计与实现规范
- **命名**：Vue data 字段使用驼峰，表格列 `value` 字段与后端字段保持一致；事件方法统一 `handleXxx`。
- **数据请求**：`JhTable` 的 `request` 函数必须返回 Promise，避免在组件内部直接操作 API，以方便后续 mock。
- **表单校验**：优先使用字段 `rules` 或 `required`，少量复杂校验可以通过 `validator` 函数实现。
- **组件拆分**：超过 200 行的页面建议抽出 `components/FeatureForm.vue` 等局部组件。
- **样式**：遵循 Material 规范，避免手动写自定义 CSS，确实需要时使用 `scoped` 并基于 Vuetify 变量。
- **交互一致**：危险操作一定配合 `JhConfirmDialog`；异步行为配合 `JhMask` 或按钮 `loading`。
- **多语言**：文案需支持中文，若项目存在 i18n，使用 `$t()`。

## 🔍 验证与测试
1. **类型检查**：核对传入组件的 props（尤其是数组/函数）类型，必要时补充 `prop-types` 注释。
2. **交互测试**：确认筛选、分页、弹窗互相联动正常；对表单的新增/编辑流程进行一次完整走查。
3. **性能**：表格请求需做防抖或 loading，避免重复触发；分页大小建议控制在 10/20/50。
4. **自动化**：Storybook 中新增页面故事或文档，便于 AI/人类快速验证组件组合。

## 📎 参考资料
- 组件库知识库：`example/AI_KNOWLEDGE_BASE.md`
- 快速速查：`example/QUICK_REFERENCE.md`

> Skill 维护：当组件 API 调整或新增场景模板时，请同步更新本文件，并在提交前使用差异审查确认无遗漏。

