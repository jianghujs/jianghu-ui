# jianghu-ui AI 可读使用手册

## 元信息
- 标题：jianghu-ui AI 可读使用手册
- 适用版本：jianghu-ui >= 1.0.0，Vue 2.7.x，Vuetify 2.x
- 最近更新时间：2026-01-08
- 依赖/运行时：Vue 2.7、Vuetify 2.x、@mdi/font、Roboto 字体、window.jianghuAxios、window.vtoast、Storybook 7
- 参考资料：`README.md`、`doc/jianghu-ui/jianghu-ui-prompts.md`、`.codex/prompts/jianghu-ui/README.md`、`.codex/prompts/jianghu-rules/jianghu-frontend.md`、Storybook(`https://jianghujs.github.io/jianghu-ui/`)、`examples/jianghu-ui-demo.html`

---

## 运行方式（CDN / 工程化双路径）

### CDN 引入（零构建）
1. 在 `<head>` 中依次引入 Vuetify 样式、@mdi/font、Roboto 以及 `https://jianghujs.github.io/jianghu-ui/cdn/<版本号>/jianghu-ui.css`。
2. 在 `<body>` 底部引入 Vue 2.7、Vuetify 2.x、`jianghu-ui.js`，并确保锁定具体版本号（生产环境禁止使用 `cdn/latest/`）。
3. 初始化 `new Vue({ el: '#app', vuetify: new Vuetify() })`，所有页面节点必须包裹在 `<v-app>` 内。
4. 可直接在模板中使用 `<jh-table>`、`<jh-form>` 等组件；若需要请求，请通过 `window.jianghuAxios` 访问后端，并使用 `window.vtoast` 反馈状态。

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css">
<link rel="stylesheet" href="https://jianghujs.github.io/jianghu-ui/cdn/1.0.0/jianghu-ui.css">
...
<script src="https://cdn.jsdelivr.net/npm/vue@2.7/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.js"></script>
<script src="https://jianghujs.github.io/jianghu-ui/cdn/1.0.0/jianghu-ui.js"></script>
```

### 工程化集成（构建/调试）
1. 克隆仓库后执行 `npm install`，推荐 Node >= 18。
2. 开发模式：`npm run storybook`（默认端口 6006），用于可视检验组件与示例。
3. 构建发布：`npm run build` 生成 `dist/jianghu-ui.{js,css}`；`npm run build-storybook` 输出静态 Storybook，可通过 `npm run deploy` 发布。
4. 在业务项目中以 npm/yarn 引入：`import JianghuUI from 'jianghu-ui'; Vue.use(JianghuUI);`，并确保全局提供 `window.jianghuAxios`、`window.vtoast`、`window.confirmDialog` 等运行时工具。
5. 任何新组件/页面必须同时更新 Storybook 示例与本手册引用，以维持知识库一致性。

---

## 核心概念与 doUiAction 数据流
- **命名约定**：组件以 `JhFoo` 命名，对外暴露 `jh-foo` 标签；props、事件、插槽均使用小驼峰/短横线，注释与文档统一使用中文。
- **布局理念**：`JhLayout → JhPageContainer → (JhTable/JhForm/JhDrawer...)`，所有业务页面都应放入 `v-app` 下，避免直接操作低层的 `v-` 元素。
- **数据请求**：统一通过 `window.jianghuAxios`（Axios 实例）访问后端，返回 `{ rows/data, total, success }` 结构；异常时使用 `window.vtoast.fail(message)` 或 `window.confirmDialog`.
- **doUiAction 方法链**：复杂交互拆为多个小方法，保持单一职责，方便 AI 组合/重放。常见前缀对应职责如下：

| 前缀 | 职责说明 | 备注 |
| --- | --- | --- |
| `prepare` | 准备交互所需的本地状态或校验参数 | 如 `prepareQueryForm`、`prepareDrawerData` |
| `get` | 请求远程数据，必须返回 Promise 并封装 `window.jianghuAxios` | 例如 `getUserList`、`getRoleOptions` |
| `do` | 执行核心业务动作（提交、删除、批量操作） | 内部调用 `window.jianghuAxios` 并处理异常 |
| `ui` | 控制界面状态（打开抽屉、弹窗提示） | 如 `uiOpenDrawer`、`uiCloseDrawer` |
| `confirm` | 触发确认对话框或权限校验 | 统一接入 `window.confirmDialog` |
| `validate` | 表单/数据校验，确保后续步骤参数合法 | 在 `JhForm`、`JhModalForm` 上复用 `validate()` |

- **状态同步**：组件的数据与 `store` 解耦，倾向 `props + 事件` 控制；加载态、选中态、分页均由 `jh-*` 组件托管，通过事件 (`@selection-change`、`@update:options`) 回传，外部存储必要的检索条件与权限信息。

---

## 组件速查矩阵

| 组件 | 典型场景 | 核心 props/slots | 核心事件 | 最小片段 |
| --- | --- | --- | --- | --- |
| JhLayout | 顶层导航+侧栏布局 | `title` / `layout` / `menu-data` / `current-path` / `show-breadcrumb` / `#header-extra` | `@menu-click`、`@logout` | `<jh-layout :menu-data=\"menus\" layout=\"mix\"><router-view/></jh-layout>` |
| JhPageContainer | 单页容器，承载筛选+内容 | `page-name` / `show-help-button` / `#search-bar` / `#content` | `@help-click` | `<jh-page-container page-name=\"用户管理\"><template #content><jh-table .../></template></jh-page-container>` |
| JhTable | 列表/查询结果展示 | `headers` / `request` / `header-title` / `show-select` / `toolbar-actions` / `action-column` | `@selection-change`、`@options-change`、`@row-click` | `<jh-table :headers=\"headers\" :request=\"doUiActionGetUserList\" />` |
| JhForm | 表单生成器 | `fields` / `initial-data` / `layout` / `#actions` | `@submit`、`@change`、`@validate` | `<jh-form :fields=\"fields\" @submit=\"doUiActionSubmit\" />` |
| JhDrawer | 右侧抽屉，常内嵌 JhForm | `v-model` / `title` / `width` / `#default` | `@confirm`、`@cancel`、`@close` | `<jh-drawer v-model=\"drawer.visible\" title=\"编辑\"><jh-form .../></jh-drawer>` |
| JhModalForm | 弹窗 + 表单一体化 | `title` / `fields` / `visible.sync` / `submit-text` / `#extra` | `@submit`、`@cancel`、`@validate` | `<jh-modal-form :fields=\"fields\" v-model=\"modalVisible\" @submit=\"doUiActionSave\" />` |
| JhConfirmDialog | 二次确认弹窗 | `title` / `content` / `confirm-text` / `cancel-text` | `@confirm`、`@cancel` | `<jh-confirm-dialog v-model=\"confirmVisible\" title=\"确定删除?\" @confirm=\"doUiActionDelete\" />` |
| JhDescriptions | 详情渲染 | `items` / `column` / `bordered` / `title` | `@action-click`（若配置操作项） | `<jh-descriptions :items=\"detailItems\" column=\"2\" bordered />` |

> 更多组件细节可在 `doc/jianghu-ui/jianghu-ui-prompts.md` 或 Storybook 中检索，保持与上述矩阵同步。

---

## 页面模板：列表 + 抽屉编辑 + doUiAction

### 步骤概览
1. 使用 `JhLayout + JhPageContainer` 搭建骨架，并在 `#content` 内放置 `JhTable` 和隐藏的 `JhDrawer`。
2. `JhTable` 的 `request` 接口返回 `{ data, total, success }`；分页、筛选条件通过 `tableOptions` 管理。
3. 抽屉内嵌 `JhForm`，提交前调用 `validate`，然后执行 `doUiActionUpdateUser`。
4. 所有请求通过 `window.jianghuAxios`，结果统一用 `window.vtoast.success/fail` 提示，异常需 try/catch。

```vue
<template>
  <v-app>
    <jh-layout :menu-data="menus" layout="mix" title="江湖运营中心">
      <jh-page-container page-name="成员管理">
        <template #search-bar>
          <jh-form :fields="queryFields" layout="inline" @submit="doUiActionSearch" />
        </template>
        <template #content>
          <jh-table
            header-title="成员列表"
            :headers="tableHeaders"
            :request="doUiActionGetUserList"
            :options.sync="tableOptions"
            :show-select="true"
            @selection-change="selectedRows = $event"
          >
            <template #toolbar-actions>
              <v-btn color="primary" small @click="uiOpenDrawer()">新增成员</v-btn>
            </template>
            <template #action-column="{ item }">
              <v-btn text small color="primary" @click="uiOpenDrawer(item)">编辑</v-btn>
            </template>
          </jh-table>
        </template>
      </jh-page-container>
      <jh-drawer
        v-model="drawer.visible"
        title="编辑成员"
        width="520px"
        @confirm="doUiActionSubmitDrawer"
        @cancel="uiCloseDrawer"
      >
        <div class="pa-4">
          <jh-form
            ref="drawerForm"
            :fields="drawer.fields"
            :initial-data="drawer.data"
            layout="vertical"
            @submit="doUiActionSubmitDrawer"
          >
            <template #actions="{ validate }">
              <v-btn text color="primary" @click="uiCloseDrawer">取消</v-btn>
              <v-btn color="primary" @click="validate">保存</v-btn>
            </template>
          </jh-form>
        </div>
      </jh-drawer>
    </jh-layout>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      menus: [{ text: '成员管理', path: '/member', icon: 'mdi-account-multiple' }],
      queryFields: [
        { key: 'keyword', label: '关键词', type: 'text', placeholder: '姓名/邮箱' },
        {
          key: 'role',
          label: '角色',
          type: 'select',
          options: [
            { text: '全部', value: '' },
            { text: '管理员', value: 'admin' },
            { text: '运营', value: 'ops' }
          ],
        },
      ],
      tableHeaders: [
        { text: '姓名', value: 'name', width: 140 },
        { text: '角色', value: 'role', width: 120 },
        { text: '邮箱', value: 'email' },
        { text: '加入时间', value: 'joinDate', width: 160 },
        { text: '操作', value: 'actions', sortable: false, width: 160 },
      ],
      tableOptions: { page: 1, itemsPerPage: 10, sortBy: [], sortDesc: [] },
      selectedRows: [],
      drawer: {
        visible: false,
        data: { id: null, name: '', email: '', role: '', joinDate: '' },
        fields: [
          { key: 'name', label: '姓名', type: 'text', required: true },
          { key: 'email', label: '邮箱', type: 'text', rules: 'email' },
          {
            key: 'role',
            label: '角色',
            type: 'select',
            required: true,
            options: [
              { text: '管理员', value: 'admin' },
              { text: '运营', value: 'ops' },
            ],
          },
          { key: 'joinDate', label: '加入时间', type: 'date', required: true },
        ],
      },
    };
  },
  methods: {
    async doUiActionGetUserList(params = {}) {
      const payload = {
        ...params,
        ...this.tableOptions,
      };
      const { data } = await window.jianghuAxios.post('/user/selectList', payload);
      if (!data?.success) {
        window.vtoast.fail(data?.message || '获取列表失败');
        return { data: [], total: 0, success: false };
      }
      return {
        data: data.rows || [],
        total: data.total || 0,
        success: true,
      };
    },
    doUiActionSearch(formValues) {
      this.tableOptions.page = 1;
      this.doUiActionGetUserList({
        ...formValues,
        ...this.tableOptions,
      });
    },
    uiOpenDrawer(record = null) {
      this.drawer.data = record ? { ...record } : { id: null, name: '', email: '', role: '', joinDate: '' };
      this.drawer.visible = true;
    },
    uiCloseDrawer() {
      this.drawer.visible = false;
    },
    async doUiActionSubmitDrawer(values) {
      try {
        const payload = { ...(values || this.drawer.data) };
        const { data } = await window.jianghuAxios.post('/user/save', payload);
        if (!data?.success) {
          window.vtoast.fail(data?.message || '保存失败');
          return;
        }
        window.vtoast.success('保存成功');
        this.uiCloseDrawer();
        this.doUiActionGetUserList(this.tableOptions);
      } catch (error) {
        window.vtoast.fail(error?.message || '网络异常');
      }
    },
  },
};
</script>
```

> 自检提示：确认 `<v-app>` 包裹、`JhTable` 的 `request` 返回 Promise、`JhDrawer` 双向绑定 `v-model`、以及 `window.jianghuAxios/window.vtoast` 已在全局注入。

---

## 调试 Checklist 与 FAQ

### Checklist
1. **依赖加载顺序**：CSS → 字体 → `jianghu-ui.css` → Vue → Vuetify → `jianghu-ui.js`，任一缺失都会导致样式或组件注册失败。
2. **`v-app` 包裹**：所有页面必须被 `<v-app>` 包住，否则 Vuetify 布局、主题、弹层定位会异常。
3. **请求返回结构**：`request`、`doUiActionGet*` 必须返回 `{ data, total, success }`；当 `success=false` 时要使用 `window.vtoast.fail` 提示。
4. **doUiAction 命名**：遵循 `prepare/get/do/ui/confirm/validate`，每个方法内职责单一，便于复用与测试。
5. **表单校验**：通过 `JhForm` 暴露的 `validate()`，不要直接访问内部 `$refs.form`。
6. **抽屉/弹窗状态**：通过 `v-model` 同步布尔值，并在 `@confirm/@cancel` 内调用 `uiCloseDrawer`，防止状态错乱。
7. **Storybook 验证**：任何新增/修改都需要 `npm run storybook` 自测，避免部署后故事缺失。

### 常见问题
- **Q：CDN 页面报 ``window.jianghuAxios is undefined``?**  
  A：在业务入口先挂载 Axios 实例 `window.jianghuAxios = axios.create({ baseURL: '/api' })`，或改为导入按需封装的请求工具。

- **Q：`JhTable` 不触发分页事件?**  
  A：确保传入 `:options.sync="tableOptions"` 或 `:request`，并监听 `@options-change` 来刷新数据。

- **Q：`JhDrawer` 内的 `JhForm` 不更新初始值?**  
  A：在打开抽屉时使用浅拷贝 `this.drawer.data = { ...record }`，并保证 `key` 属性唯一，必要时借助 `:key="drawer.data.id || 'create'"` 强制重渲。

- **Q：如何排查样式覆盖?**  
  A：优先复用 `src/style` 中的主题变量，避免全局 `!important`；若需覆盖，使用 `:deep` 或在外层包裹 class，保持 scoped。

- **Q：Storybook 工具栏无响应?**  
  A：执行 `npm run storybook -- --no-manager-cache` 清除缓存，并确认 `.storybook/preview.js` 引入了 `jianghu-ui.css`。

---

## 维护策略
- **触发条件**：新增/修改 `jh-*` 组件、结构性交互模式、运行方式或工具链更新时必须同步本手册。
- **责任人**：变更负责人需更新 `docs/jianghu_ui_ai_handbook.md`、Storybook 示例以及 `doc/jianghu-ui/jianghu-ui-prompts.md` 对应段落。
- **同步渠道**：在 PR/变更说明中引用本手册章节，确保 AI 知识库实时刷新；每次发版前运行 `openspec validate add-ai-jianghu-ui-handbook --strict` 复核。 
