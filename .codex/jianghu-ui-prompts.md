# jianghu-ui 组件速查 Prompt

本文件帮你在不翻源码的情况下直接开箱使用 jianghu-ui。围绕 **组件定位 → 核心 API → 事件/方法 → 最小示例** 展开，适合 AI/脚本快速生成代码。若示例未覆盖的 props 或 slot，可以对照目录中对应 README / `.vue` 源码补充。

---

## 使用须知
- 组件基于 Vuetify 2.x，除特别说明外均可在 `<template>` 中直接使用。
- 布局类（JhLayout/JhPageContainer）负责页面骨架，数据展示和表单组件在插槽中按需组合。
- 受控属性一律走 `v-model`/`value` + `@input`，表单相关组件普遍提供 `setFieldsValue`、`validate` 等方法。
- 所有示例均为最小可运行片段，可按需叠加校验、插槽或自定义内容。


## 离线调试 Demo：`examples/jianghu-ui-demo.html`
- 目的：快速验证 CDN 版本组件是否可用，覆盖 JhTable + JhForm + JhDrawer + 事件日志，可直接双击运行，推荐配合 `npx http-server examples` 或浏览器 Live Server 打开。
- 依赖：引入 `https://jianghujs.github.io/jianghu-ui/cdn/jianghu-ui.css` 与 `jianghu-ui.js` 即可，脚本内置 Vue 2.7 + Vuetify 2。
- 使用流程：① 将下方代码保存或覆盖为 `examples/jianghu-ui-demo.html`；② 运行 `npx http-server examples -p 4173` 或直接打开文件；③ 通过表格选择、表单提交、抽屉编辑和日志输出观察组件行为。

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>jianghu-ui-demo</title>
    <link
      rel="stylesheet"
      href="https://jianghujs.github.io/jianghu-ui/cdn/jianghu-ui.css"
    />
    <style>
      body {
        background-color: #f5f5f5;
      }
      .section-card {
        margin-bottom: 32px;
      }
      .section-title {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 12px;
      }
    </style>
  </head>
  <body>
    <div id="app">
      <v-app>
        <v-main>
          <v-container>
            <h1 class="mb-8">Jianghu UI Demo</h1>

            <v-card class="pa-6 section-card">
              <div class="section-title">📊 JhTable</div>
              <p class="text-body-2 mb-4">
                静态数据 + 操作列 + 选择列，适用于快速校验表格渲染。
              </p>
              <jh-table
                header-title="团队成员"
                :headers="tableHeaders"
                :items="tableItems"
                :show-select="true"
                @selection-change="handleSelectionChange"
              >
                <template #toolbar-actions>
                  <v-btn color="primary" small @click="refreshTable">
                    <v-icon left small>mdi-refresh</v-icon>
                    手动刷新
                  </v-btn>
                </template>
                <template #action-column="{ item }">
                  <v-btn text small color="primary" @click="openDrawerWithUser(item)">
                    <v-icon left small>mdi-pencil</v-icon>
                    编辑
                  </v-btn>
                </template>
              </jh-table>
            </v-card>

            <v-card class="pa-6 section-card">
              <div class="section-title">🧾 JhForm</div>
              <p class="text-body-2 mb-4">
                通过字段配置渲染表单，并追加自定义操作区。
              </p>
              <jh-form
                :fields="profileFields"
                :initial-data="profileData"
                layout="horizontal"
                @submit="handleProfileSubmit"
                @change="handleFieldChange"
              >
                <template #actions="{ validate, resetForm }">
                  <v-btn outlined color="primary" class="mr-3" @click="resetForm">
                    重置
                  </v-btn>
                  <v-btn color="primary" @click="validate">
                    提交
                  </v-btn>
                </template>
              </jh-form>
            </v-card>

            <v-card class="pa-6 section-card">
              <div class="section-title">📂 JhDrawer</div>
              <p class="text-body-2">
                抽屉结合 JhForm，用于模拟编辑流程。
              </p>
              <v-btn color="primary" class="mt-4" @click="drawer.visible = true">
                打开抽屉
              </v-btn>
              <jh-drawer
                v-model="drawer.visible"
                title="编辑成员信息"
                width="520px"
                @confirm="submitDrawerForm"
                @cancel="resetDrawerForm"
              >
                <div class="pa-4">
                  <jh-form
                    ref="drawerFormRef"
                    :fields="drawer.fields"
                    :initial-data="drawer.data"
                    layout="vertical"
                    @submit="submitDrawerForm"
                  >
                    <template #actions="{ validate, resetForm }">
                      <v-btn text color="primary" class="mr-2" @click="resetForm">
                        重置
                      </v-btn>
                      <v-btn color="primary" @click="validate">
                        保存
                      </v-btn>
                    </template>
                  </jh-form>
                </div>
              </jh-drawer>
            </v-card>

            <v-card class="pa-4">
              <div class="section-title">📝 事件日志</div>
              <v-list dense>
                <v-list-item v-for="(log, index) in logs" :key="index" class="py-1">
                  <v-list-item-content>
                    <v-list-item-title class="text-body-2">
                      {{ log }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-container>
        </v-main>
      </v-app>
    </div>

    <script src="https://jianghujs.github.io/jianghu-ui/cdn/jianghu-ui.js"></script>
    <script>
      new Vue({
        el: '#app',
        vuetify: new Vuetify(),
        data() {
          return {
            logs: [],
            tableHeaders: [
              { text: '姓名', value: 'name', width: 140 },
              { text: '邮箱', value: 'email' },
              { text: '角色', value: 'role', width: 120 },
              { text: '加入时间', value: 'joinDate', width: 140 },
              { text: '操作', value: 'actions', sortable: false, width: 160 },
            ],
            tableItems: [
              { id: 1, name: '张无忌', email: 'wz@jianghujs.com', role: '平台管理员', joinDate: '2024-02-12' },
              { id: 2, name: '赵敏', email: 'zm@jianghujs.com', role: '产品经理', joinDate: '2024-03-08' },
              { id: 3, name: '周芷若', email: 'zzr@jianghujs.com', role: '前端开发', joinDate: '2024-05-15' },
              { id: 4, name: '小昭', email: 'xz@jianghujs.com', role: '测试工程师', joinDate: '2024-07-02' },
            ],
            profileData: {
              nickname: '',
              city: null,
              notify: true,
              description: '',
            },
            profileFields: [
              { key: 'nickname', label: '昵称', type: 'text', placeholder: '请输入昵称', required: true },
              {
                key: 'city',
                label: '所在城市',
                type: 'select',
                options: [
                  { text: '杭州', value: 'hangzhou' },
                  { text: '成都', value: 'chengdu' },
                  { text: '北京', value: 'beijing' },
                ],
                placeholder: '请选择城市',
                cols: { md: 6 },
              },
              {
                key: 'notify',
                label: '开启通知',
                type: 'switch',
                defaultValue: true,
                cols: { md: 6 },
              },
              {
                key: 'description',
                label: '个人介绍',
                type: 'textarea',
                rows: 3,
                placeholder: '填写简单介绍',
                cols: { md: 12 },
              },
            ],
            drawer: {
              visible: false,
              data: { id: null, name: '', role: '', email: '', remark: '' },
              fields: [
                { key: 'name', label: '姓名', type: 'text', required: true, placeholder: '请输入姓名' },
                {
                  key: 'role',
                  label: '角色',
                  type: 'select',
                  options: [
                    { text: '平台管理员', value: '平台管理员' },
                    { text: '研发负责人', value: '研发负责人' },
                    { text: '产品经理', value: '产品经理' },
                    { text: '测试工程师', value: '测试工程师' },
                  ],
                  required: true,
                },
                {
                  key: 'email',
                  label: '邮箱',
                  type: 'text',
                  placeholder: '请输入邮箱',
                  rules: 'email',
                },
                { key: 'remark', label: '备注', type: 'textarea', rows: 3 },
              ],
            },
          };
        },
        methods: {
          log(message) {
            this.logs.unshift(`${new Date().toLocaleTimeString()} - ${message}`);
            this.logs = this.logs.slice(0, 6);
          },
          refreshTable() {
            this.log('触发手动刷新');
          },
          handleSelectionChange(selectedRows) {
            this.log(`当前选择 ${selectedRows.length} 行`);
          },
          handleProfileSubmit(values) {
            this.log(`JhForm 提交: ${JSON.stringify(values)}`);
          },
          handleFieldChange({ key, value }) {
            this.log(`字段变化: ${key} => ${value}`);
          },
          openDrawerWithUser(user) {
            this.drawer.data = { ...user };
            this.drawer.visible = true;
            this.log(`准备编辑 ${user.name}`);
          },
          submitDrawerForm(values) {
            this.log(`抽屉保存: ${JSON.stringify(values || this.drawer.data)}`);
            this.drawer.visible = false;
          },
          resetDrawerForm() {
            this.log('抽屉取消编辑');
            this.drawer.visible = false;
          },
        },
      });
    </script>
  </body>
</html>
```

---

## 布局与导航

### JhLayout（`src/components/JhLayout`）
定位：企业后台顶层布局（含侧边栏、顶部导航、用户菜单、面包屑、设置面板）。
- **核心 Props**：`title`、`logo`、`menu-data`、`current-path`、`layout="side|top|mix"`、`sidebar-width`、`header-theme`、`sidebar-theme`、`show-breadcrumb`、`breadcrumbs`、`show-page-header`、`page-title`、`show-footer`、`show-avatar`、`avatar-menu-list`、`show-settings`、`content-padding`、`default-collapsed`。
- **事件/方法**：`@menu-click(item)`、`@logout`、`@update:layout`、`@update:contentPadding`（其余 `update:*` 配合设置面板联动）。
- **插槽**：`logo`（自定义 LOGO）、`header-extra`、`footer`、`default`（主内容）。
- **最小示例**
```vue
<jh-layout
  title="管理控制台"
  :menu-data="menus"
  :current-path="$route.path"
  layout="mix"
  show-breadcrumb
  @menu-click="({ path }) => $router.push(path)"
>
  <router-view />
</jh-layout>
```

### JhPageContainer（`src/components/JhPageContainer`）
定位：页面级容器，提供标题、帮助按钮、查询区、内容区，常与 JhLayout 搭配。
- **核心 Props**：`page-name`、`show-help-button`。
- **事件**：`@help-click`。
- **插槽**：`menu`、`search-bar`、`content`、`default`（放抽屉、弹窗等）。
- **最小示例**
```vue
<jh-page-container page-name="用户管理" @help-click="showDoc = true">
  <template #search-bar>
    <jh-query-filter :fields="filterFields" @search="fetchList" />
  </template>
  <template #content>
    <jh-table :headers="headers" :request="fetchList" />
  </template>
</jh-page-container>
```

### JhMenu（`src/components/JhMenu`）
定位：移动端/桌面端通用顶部菜单（含抽屉、自定义用户菜单、右上角按钮）。
- **核心 Props**：`app-title`、`menu-list`（支持多级）、`right-menu-list`、`avatar-menu-list`、`user-info`（含头像/角色）、`show-avatar`、`active-menu-index`、`active-second-menu-id`、`temporary`、`hide-drawers`。
- **事件**：`@menu-click(menu, index)`、`@logout`。
- **最小示例**
```vue
<jh-menu
  :menu-list="menus"
  :avatar-menu-list="profileMenus"
  :user-info="{ username: 'admin' }"
  :active-menu-index="0"
  @menu-click="handleMenu"
/>
```

### JhScene（`src/components/JhScene`）
定位：场景筛选器，提供场景切换、创建、删除与本地存储能力，可插入自定义筛选表单。
- **核心 Props**：`init-form-data`、`storage-key`、`scenes`（默认场景列表）、`current-scene-id`、`show-action-btn`、`use-local-storage`。
- **事件**：`@scene-change(scene)`、`@scene-created(scene)`、`@scene-deleted(scene)`、`@error(message)`。
- **插槽**：`form`（创建场景时追加自定义字段）。
- **最小示例**
```vue
<jh-scene
  :scenes="defaultScenes"
  storage-key="user-list-scenes"
  @scene-change="applyScene"
>
  <template #form="{ form }">
    <jh-form-fields v-model="form" :fields="sceneFields" dense />
  </template>
</jh-scene>
```

---

## 数据展示

### JhCard（`src/components/JhCard`）
定位：ProCard 风格容器，支持分栏、折叠、操作区、标签页等。
- **核心 Props**：`title`、`sub-title`、`tooltip`、`extra`、`bordered`、`header-bordered`、`ghost`、`collapsible`、`default-collapsed`、`size="default|small"`、`loading`、`actions`（[{ icon,text,onClick }]）、`layout`、`split`、`col-span`、`gutter`、`tabs`、`hoverable`、`body-style`、`head-style`。
- **事件**：`@collapse(collapsed)`、`@tab-change(key)`。
- **插槽**：`default`、`title`、`extra`。
- **最小示例**
```vue
<jh-card title="概览" :actions="[{ text: '刷新', onClick: refresh }]">
  <p>主内容</p>
</jh-card>
```

### JhCheckCard（`src/components/JhCheckCard`）
定位：多选/单选卡片，支持封面、副标题、勾选框位置等。
- **核心 Props**：`title`、`description`、`cover`、`extra`、`value`、`checked`、`default-checked`、`disabled`、`loading`、`size`、`bordered`、`hide-checkbox`、`checkbox-position`、`hoverable`、`width/height`、`body-style`、`head-style`。
- **事件**：`@change(checked, value)`、`@click`、`@input`（v-model）。
- **插槽**：`default`、`title`、`description`、`cover`、`extra`。
- **最小示例**
```vue
<jh-check-card
  v-for="prod in products"
  :key="prod.id"
  :title="prod.name"
  :value="prod.id"
  :checked="selected.includes(prod.id)"
  @change="toggle"
/>
```

### JhStatisticCard（`src/components/JhStatisticCard`）
定位：指标卡，可嵌入 ECharts 迷你图表。
- **核心 Props**：`title`、`value`、`prefix/suffix`、`precision`、`value-color`、`trend`、`trend-type="up|down"`、`description`、`chart-option`、`chart-width`、`chart-height`、`loading`。
- **事件**：`@click`（卡片点击，可在根元素加 `@click` 监听）。
- **最小示例**
```vue
<jh-statistic-card
  title="总销售额"
  prefix="¥"
  :value="126560"
  trend="12.5%"
  trend-type="up"
  :chart-option="sparklineOption"
/>
```

### JhDescriptions（`src/components/JhDescriptions`）
定位：ProDescriptions 风格详情面板，支持 `columns` 配置、可编辑、异步加载。
- **核心 Props**：`columns`（支持 `title/dataIndex/valueType/span/editable/render`）、`data-source`、`column`（列数或响应式对象）、`layout="horizontal|vertical"`、`bordered`、`size`、`title`、`editable`、`request`（异步加载）、`copyable`（列级别）。
- **事件**：`@save(key, value, data)`、`@request-error(error)`。
- **插槽**：`title`、`extra`、以及列级别 `render`/`slot`。
- **最小示例**
```vue
<jh-descriptions
  title="用户信息"
  :columns="columns"
  :data-source="user"
  bordered
/>
```

### JhList（`src/components/JhList`）
定位：ProList 风格卡片/网格列表，内置搜索、分页、批量操作。
- **核心 Props**：`data-source`、`request`、`metas`（title/subTitle/description/avatar/content/extra/actions）、`layout="list|grid"`、`grid`、`row-key`、`pagination`、`header-title`、`tooltip`、`toolbar`、`search`、`loading`、`polling`、`debounce-time`、`selectable/rowSelection`。
- **事件**：`@item-click(item, index)`、`@action-click(action, item)`、`@selection-change({ selectedRowKeys, selectedRows })`、`@page-change`、`@page-size-change`、`@refresh`、`@request-error`。
- **插槽**：`header-title`、`toolbar-actions`、`toolbar-extra`、`alert`、`alert-actions`、`renderItem` 以及逐字段 `title/subTitle/...`。
- **最小示例**
```vue
<jh-list
  header-title="项目列表"
  :metas="{ title: 'name', description: 'owner' }"
  :request="fetchProjects"
/>
```

### JhTable（`src/components/JhTable`）
定位：ProTable 风格表格，集成查询、排序、列设置、批量操作、轮询等。
- **核心 Props**：`headers`（扩展 Vuetify columns，支持 `copyable/ellipsis/valueType`）、`items` 或 `request`、`row-key`、`header-title`、`tooltip`、`card-bordered`、`ghost`、`toolbar`、`search`（关联 JhQueryFilter）、`options`（列设置、刷新、密度、全屏）、`row-selection`、`columns-state`（列可见性持久化）、`polling`、`debounce-time`、`sort-by`、`sort-desc`、`multi-sort`、`must-sort`、`data-table-props`。
- **事件**：`@search(query)`、`@reset`、`@refresh`、`@selection-change`、`@sort-change({ sorter })`、`@update:sortBy`、`@update:sortDesc`、`@columns-state-change`、`@click:row`、`@page-change` 等同 v-data-table。
- **插槽**：`toolbar-actions`、`toolbar-extra`、`alert`、`alert-actions`、`item.{value}`（定制单元格）、`header.{value}`、`expanded-row`、`empty`。
- **最小示例**
```vue
<jh-table
  header-title="订单列表"
  :headers="headers"
  :request="fetchOrders"
  :row-selection="{ type: 'checkbox' }"
  :columns-state="{ persistenceKey: 'order-table' }"
  @selection-change="({ selectedRows }) => batch = selectedRows"
/>
```

### JhEditableTable（`src/components/JhEditableTable`）
定位：可编辑数据表，支持行内编辑/新增/删除、守卫、最大行数限制。
- **核心 Props**：`value`(v-model)、`columns`（`key/label/type/options/rules/enum/editable` 等）、`row-key`、`editable`、`editable-type="single|multiple"`、`record-creator`/`creator-button-props`、`max-rows`、`show-index`、`before-add-row`、`before-remove-row`、`action-render`。
- **事件**：`@input/@change(value)`、`@save(key, row, originRow)`、`@delete(key, row)`、`@values-change(row, allData)`、`@max-limit(max)`。
- **最小示例**
```vue
<jh-editable-table
  v-model="rows"
  :columns="columns"
  row-key="id"
  :record-creator="true"
  editable-type="single"
  @save="persistRow"
/>
```

### JhTableAttachment（`src/components/JhTableAttachment`）
定位：附件分组展示卡片，含过滤、预览、下载、删除。
- **核心 Props**：`attachments`（[{ id, filename, downloadPath, fileType, fileSubtype }]）、`show-create-button`、`readonly`、`group-by`、`preview-prefix`、`loading`。
- **事件**：`@create-click`、`@preview(item)`、`@download(item)`、`@delete(item)`。
- **最小示例**
```vue
<jh-table-attachment
  :attachments="files"
  group-by="fileType"
  @create-click="openUpload = true"
/>
```

### JhWaterMark（`src/components/JhWaterMark`）
定位：容器水印，支持文字/图片、多行、旋转、间距。
- **核心 Props**：`content`(string|string[])、`image`、`width/height`、`rotate`、`gap-x/gap-y`、`offset-x/offset-y`、`font`（color/fontSize/fontWeight/...）、`z-index`、`get-container`。
- **最小示例**
```vue
<jh-water-mark :content="['内部资料', userName]" :gap-x="160" :gap-y="120">
  <jh-table :headers="headers" :items="items" />
</jh-water-mark>
```

### JhTestCard（`src/components/JhTestCard`）
定位：当前目录为空，仅作为后续实验组件预留。如果需要示例卡片，可直接沿用 JhCard，或在该目录下新增自定义组件。

---

## 表单与输入

### JhForm（`src/components/JhForm`）
定位：ProForm 风格表单容器，支持多类型字段、联动、分组、只读展示。
- **核心 Props**：`fields`（字段配置，支持 `key/label/type/options/rules/visible/disabled/readonly/dependencies/layout/cols/tooltip/extra/transform`）、`initial-data`、`form-ref`、`layout`、`show-labels`、`label-width/align`、`show-required-mark`、`readonly`、`disabled`、`default-dense/filled/outlined`、`hide-details`、`grid`/`col-props`、`row-class`、`omit-nil`。
- **事件**：`@field-change({ key, value, formData })`、`@change`、`@blur`、`@submit(values)`、`@reset(values)`、`@validate(isValid, values)`。
- **公开方法**：`validate()`、`resetForm()`、`resetValidation()`、`getFormData()`、`setFieldsValue(values)`、`setFieldValue(key, value)`。
- **插槽**：`field-${key}`（自定义字段界面）、`actions`（底部按钮）。
- **最小示例**
```vue
<jh-form :fields="formFields" :initial-data="formData" @submit="save">
  <template #actions="{ validate }">
    <v-btn color="primary" @click="validate()">提交</v-btn>
  </template>
</jh-form>
```

### JhFormFields（`src/components/JhFormFields`）
定位：字段集合组件，可单独使用或嵌入 JhForm，实现字段依赖、联动、组装。
- **核心 Props**：`value`(v-model)、`fields`、`title/description/tooltip`、`layout`、`show-labels`、`label-width/align`、`default-dense/filled/outlined`、`hide-details`、`dense`、`bordered`、`dependencies`。
- **事件**：`@field-change`、`@field-input`、`@field-blur`、`@dependency-change`、`@field-dependency-change`、`@reset`。
- **最小示例**
```vue
<jh-form-fields
  v-model="profile"
  :fields="basicFields"
  title="基本信息"
  @field-change="syncProfile"
/>
```

### JhFormList（`src/components/JhFormList`）
定位：动态表单列表，支持 card/table/inline 渲染、拖拽、复制、守卫、验证。
- **核心 Props**：`value`、`fields`、`mode`、`title/description`、`min/max`、`sortable`、`copyable`、`show-index`、`show-item-actions`、`default-value`/`creator-record`、`creator-button-props`、`delete-confirm`、`collapsible`、`always-show-item-label`、`action-guard`、`on-after-remove`、`action-render`、`rules`（列表级验证）。
- **事件**：`@add(item, index)`、`@remove(item, index)`、`@copy(item, copied)`、`@sort(oldIndex, newIndex)`、`@item-change(index, item)`、`@max-limit(max)`、`@min-limit(min)`、`@validate(isValid, errors)`。
- **公开方法（通过 ref）**：`addItem/removeItem/copyItem/moveItem/getItems/setItems/validate/reset`。
- **最小示例**
```vue
<jh-form-list
  v-model="contacts"
  :fields="contactFields"
  title="联系人"
  :min="1"
  :max="5"
  @add="logAdd"
/>
```

### JhStepsForm（`src/components/JhStepsForm`）
定位：分步表单，封装 Stepper + JhForm，可配置多步骤、插槽自定义。
- **核心 Props**：`steps`（[{ title, subTitle, fields?, slot? }]）、`initial-step`、`value/current`、`editable`、`vertical`、`alt-labels`、`form-props`、`steps-props`、`submitter`（控制按钮/自定义渲染）、`validate-step`、`transform-before-finish`、`container-style`。
- **事件**：`@finish(allValues)`、`@change(formData)`、`@step-change({ current, step })`、`@update:current`。
- **插槽**：命名为 `step-${slot}`（步骤自定义内容）、`submitter`（自定义按钮）。
- **最小示例**
```vue
<jh-steps-form :steps="steps" @finish="handleFinish">
  <template #step-confirm="{ formData }">
    <pre>{{ formData }}</pre>
  </template>
</jh-steps-form>
```

### JhQueryFilter（`src/components/JhQueryFilter`）
定位：高级查询面板，内部复用 JhFormFields，支持折叠、实时搜索、按钮插槽。
- **核心 Props**：`fields`、`initial-values`、`collapsible`、`default-collapsed`、`default-visible-count`、`col-span`、`dense/filled/outlined/single-line`、`row-class`、`button-class`、`button-size`、`search-text`、`reset-text`、`loading/searching`。
- **事件**：`@search(query)`、`@reset`、`@field-change({ key, value })`、`@collapse-change(collapsed)`。
- **插槽**：`field-${key}`（透传至 JhFormFields）、`buttons`（自定义操作区域）。
- **最小示例**
```vue
<jh-query-filter
  :fields="filterFields"
  :initial-values="{ keyword: '' }"
  @search="fetchList"
/>
```

### JhDateRangePicker（`src/components/JhDateRangePicker`）
定位：带快捷项的日期范围选择器（含最近 N 天、本月/上月等）。
- **核心 Props**：`value`(v-model，长度 2 的数组)、`prefix`、`filled/dense/outlined`、`hide-details`、`clearable`。
- **事件**：`@input(range)`、`@change(range)`。
- **最小示例**
```vue
<jh-date-range-picker v-model="range" prefix="时间段" @change="handleRange" />
```

### JhTreeSelect（`src/components/JhTreeSelect`）
定位：树形选择对话框，支持单选/多选、搜索、批量全选、临时选中。
- **核心 Props**：`value`(选中节点数组)、`visible.sync`、`data`（树数据）、`mode="multiple|single"`、`title`、`placeholder`、`max-width`、`node-key/node-label/node-children`、`allow-select-node`、`show-search`、`show-select-all`、`loading`。
- **事件**：`@input(nodes)`、`@update:visible`、`@confirm(nodes)`、`@cancel`。
- **插槽**：内置 `tree-node` 子组件支持 Scoped Slot（可在源码中扩展，如需完全自定义节点展示）。
- **最小示例**
```vue
<jh-tree-select
  v-model="selectedNodes"
  :visible.sync="treeVisible"
  :data="deptTree"
  mode="multiple"
  @confirm="handleTreeConfirm"
/>
```

### JhFileInput（`src/components/JhFileInput`）
定位：文件/图片上传展示面板，支持单文件/多文件、数量限制、只读预览。
- **核心 Props**：`value`（string 或 File[]）、`max-files`、`accept`、`multiple`、`rules`、`readonly`、`upload-prefix`。
- **事件**：`@input(files)`、`@change(files)`。
- **最小示例**
```vue
<jh-file-input
  v-model="photos"
  multiple
  :max-files="5"
  accept="image/*"
/>
```

### JhJsonEditor（`src/components/JhJsonEditor`）
定位：JSONEditor 容器，支持多模式切换、自动展开、校验提示。
- **核心 Props**：`value`（字符串或对象）、`expanded-on-start`、`mode`、`modes`、`height`。
- **事件**：`@input(value)`、`@has-error(flag)`。
- **方法**：`editor.get()`、`editor.set()` 已封装；通过组件 ref 可访问 `setEditor()`。
- **最小示例**
```vue
<jh-json-editor v-model="configJson" mode="tree" @has-error="jsonInvalid = $event" />
```

### JhMarkdownEditor（`src/components/JhMarkdownEditor`）
定位：基于 Editor.md 的 Markdown 编辑器，支持自定义工具栏、SEO HTML 输出。
- **核心 Props**：`value`、`placeholder`、`height`、`width`、`editor-path`（静态资源路径）、`toolbar-icons`、`readonly`。
- **事件**：`@input(markdown)`、`@change(markdown)`、`@content-for-seo(html)`。
- **方法**：`getMarkdown()`、`setMarkdown(content)`、`insertValue(text)`。
- **最小示例**
```vue
<jh-markdown-editor v-model="content" height="500px" @content-for-seo="seoHtml = $event" />
```

### JhDraggable（`src/components/JhDraggable`）
定位：拖拽设计面板（基于 vuedraggable），左侧组件库 → 右侧设计区域。
- **核心 Props**：`components`（组件库数组）、`value`(设计区 v-model)、`show-component-library`、`component-library-title`、`group-name`、`animation`、`drag-class`、`ghost-class`、`chosen-class`、`empty-placeholder`。
- **事件**：`@input(list)`、`@change(list)`、`@start`、`@end`。
- **插槽**：`item`（自定义设计区单个元素渲染）。
- **最小示例**
```vue
<jh-draggable
  :components="componentTemplates"
  v-model="canvasBlocks"
>
  <template #item="{ item }">
    <jh-card :title="item.name">{{ item.desc }}</jh-card>
  </template>
</jh-draggable>
```

---

## 反馈、弹层与通用交互

### JhModal（`src/components/JhModal`）
定位：基础对话框，提供标题、内容插槽、底部按钮、全屏模式。
- **核心 Props**：`value`(v-model)、`title`、`width`、`fullscreen`、`persistent`、`closable`、`show-actions`、`show-confirm-button`、`confirm-text`、`show-cancel-button`、`cancel-text`。
- **事件**：`@open`、`@close`、`@confirm`、`@cancel`、`@input`。
- **插槽**：`default`、`actions`。
- **最小示例**
```vue
<jh-modal v-model="visible" title="提示" @confirm="submit">
  表单或提示内容
</jh-modal>
```

### JhModalForm（`src/components/JhModalForm`）
定位：弹窗+JhForm 组合，内置验证、字段插槽，可直接提交表单数据。
- **核心 Props**：继承 JhModal + `fields`、`initial-data`、`form-ref`、`validate-before-confirm`、`validation-rules`。
- **事件**：`@confirm(formData)`、`@cancel`、`@close`、`@field-change`。
- **方法（通过 ref）**：`getFormData()`、`setFieldsValue()`、`setFieldValue()`、`resetForm()`、`resetValidation()`、`validate()`。
- **最小示例**
```vue
<jh-modal-form
  v-model="modalVisible"
  title="编辑用户"
  :fields="formFields"
  :initial-data="currentRow"
  @confirm="saveUser"
/>
```

### JhDrawer（`src/components/JhDrawer`）
定位：基础抽屉，左右拉出，支持默认按钮、close FAB。
- **核心 Props**：`value`、`title`、`position="left|right"`、`width`、`show-confirm-button`、`show-cancel-button`、`show-close-button`、`confirm-text`、`cancel-text`。
- **事件**：`@open`、`@close`、`@confirm`、`@cancel`、`@input`。
- **插槽**：`default`、`actions`（覆盖顶部按钮组）。
- **最小示例**
```vue
<jh-drawer v-model="drawerVisible" title="详情" @confirm="handleAccept">
  <p>抽屉内容</p>
</jh-drawer>
```

### JhDrawerForm（`src/components/JhDrawerForm`）
定位：抽屉 + JhForm，能力与 JhModalForm 类似。
- **核心 Props/事件/方法**：同 JhModalForm，额外的 `row-class`、`validate-before-confirm`、`show-confirm-button` 控制位于顶部按钮组。
- **最小示例**
```vue
<jh-drawer-form
  v-model="drawerVisible"
  title="筛选条件"
  :fields="filterFields"
  @confirm="applyFilter"
/>
```

### JhConfirmDialog（`src/components/JhConfirmDialog`）
定位：简单确认对话框，可自定义内容、按钮文本/颜色、钩子。
- **核心 Props**：`value`、`title`、`content`(可含 HTML)、`content-class`、`max-width`、`show-cancel-button`、`confirm-button-text/color`、`cancel-button-text/color`、`persistent`、`loading`、`before-confirm`、`before-cancel`。
- **事件**：`@confirm`、`@cancel`、`@click-outside`、`@input`。
- **方法**：通过 ref 调用 `open()`、`close()`。
- **最小示例**
```vue
<jh-confirm-dialog
  v-model="confirmVisible"
  title="删除确认"
  content="确定要删除该记录吗？"
  @confirm="remove"
/>
```

### JhToast（`src/components/JhToast`）
定位：全局 Snackbar，支持多类型、位置、操作按钮。
- **核心 Props**：`value`、`message`、`type="success|error|warning|info|loading"`、`position`、`timeout`、`color`、`icon`、`icon-color`、`show-close-button`、`close-button-text/color`、`action-text/color`、`vertical`、`elevation`、`max-length`。
- **事件**：`@input`、`@close`、`@action`。
- **最小示例**
```vue
<jh-toast v-model="toast.visible" :message="toast.text" type="success" />
```

### JhMask（`src/components/JhMask`）
定位：全局遮罩，可选 loading、超时自动关闭。
- **核心 Props**：`value`、`color`、`opacity`、`z-index`、`show-loading`、`loading-size/width/color`、`close-on-click`、`timeout`。
- **事件**：`@input`、`@click`、`@timeout`。
- **插槽**：自定义遮罩内容（默认展示 loading 圆环）。
- **最小示例**
```vue
<jh-mask v-model="masking" show-loading opacity="0.6" @timeout="masking = false" />
```

### JhDateRangePicker / JhFileInput / JhJsonEditor / JhMarkdownEditor / JhTreeSelect / JhDraggable
> 已在“表单与输入”章节分别列出。需要与 JhModal/JhDrawer 组合时，可直接放入对应插槽。

---

## 其他提示
- 需要联动查询时，推荐 `JhQueryFilter + JhScene + JhTable` 组合；`JhPageContainer` 用于统一抬头、帮助按钮、搜索/内容布局。
- 需要表单持久化/多场景切换，可结合 `JhScene` 的 `storage-key` 和 `use-local-storage` 存储策略，加上 `JhForm`/`JhFormList` 渲染表单。
- Storybook 中的 `.stories.js` 提供更多玩法，可在 `src/components/<Name>` 目录下查看。

> 所有组件默认遵循 Vue 2 + Vuetify 语法（`kebab-case` props），如需 TypeScript/JSX 调用，按需自行封装声明。

