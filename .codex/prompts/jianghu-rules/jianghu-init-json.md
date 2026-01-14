# JianghuJS Init-JSON 配置规范

## 核心概念

JianghuJS 采用混合开发模式：**配置化 + 独立HTML + API开发**
- 部分HTML通过配置文件生成
- 部分为独立HTML文件
- 前后端接口需要统一规划开发

## 全栈开发原则

⚠️ **当开发 Init-JSON 配置涉及到新增功能时，需要同时考虑后端 API 开发**

### 开发范围判断

1. **仅前端配置修改**
   - 界面调整、样式修改
   - 现有功能的UI优化
   - 表格列显示/隐藏

2. **需要后端API支持的场景**
   - 新增数据操作（增删改查）
   - 新增业务逻辑处理
   - 数据验证和权限控制
   - 文件上传/下载功能
   - 数据统计和报表
   - 第三方API集成

## 开发流程判断规则

### 第一步：检查配置文件是否存在

**必须首先检查是否存在对应的 init-json 配置文件：**

```bash
# 检查页面配置文件
ls app/view/init-json/page/fileName.js

# 检查组件配置文件  
ls app/view/init-json/component/fileName.js
```

### 第二步：检查API接口是否需要开发

**必须检查是否需要开发后端接口：**

```bash
# 检查现有资源配置
grep -r "actionId.*yourActionName" app/view/init-json/
grep -r "yourActionName" app/service/

# 检查数据库资源表
mysql -e "SELECT * FROM _resource WHERE actionId = 'yourActionName';"

# 检查服务文件
ls app/service/yourService.js
```

### 第三步：根据检查结果选择开发方式

1. **存在配置文件的情况**
   - 路径：`app/view/init-json/page/fileName.js`
   - 路径：`app/view/init-json/component/fileName.js`
   - **规则**：
     - ✅ **只能修改配置文件**
     - ❌ **禁止直接修改对应的 HTML 文件**
     - 🔄 **修改后必须运行 `jianghu-init json` 生成 HTML**
     - 🚀 **如需新API，同时开发后端接口**

2. **不存在配置文件的情况**
   - **规则**：
     - ✅ **可以直接修改 HTML 文件**
     - 💡 **这些是独立的 HTML 文件，不通过配置生成**
     - 🚀 **如需新API，同时开发后端接口**

### 关键提醒

⚠️ **开发前必须先检查是否有对应的 init-json 配置文件**

- ✅ **有配置文件 → 只改配置文件**
- ✅ **无配置文件 → 可改 HTML 文件**
- 🚀 **需要新功能 → 检查并开发API接口**

## 安装和命令

### 安装最新版本
```bash
npm install -g @jianghujs/jianghu-init@latest
```

### 常用命令

#### 生成命令
```bash
# 生成示例文件
jianghu-init json --generateType=example

# 根据数据表生成配置文件
jianghu-init json --generateType=json --pageType=jh-page --table=tableName --pageId=pageName

# 配置文件生成页面
jianghu-init json --generateType=page --pageType=page --file=pageName

# 组件生成命令
jianghu-init json --generateType=component --file=componentName
```

#### 开发模式
```bash
# 开启dev模式（自动检测配置文件变更并更新页面）
jianghu-init json dev
```

## 标准配置模板

### PC端标准配置模板

```javascript
const content = {
  pageType: "jh-page", 
  pageId: "{{moduleName}}", 
  pageName: "{{moduleName}}页面", 
  template: 'jhTemplateV4', 
  version: 'v3',
  
  resourceList: [
    {
      actionId: "selectItemList",
      resourceType: "sql",
      desc: "✅查询列表-{{moduleName}}",
      resourceData: { table: "{{tableName}}", operation: "select" }
    },
    {
      actionId: "insertItem",
      resourceType: "sql",
      desc: "✅新增-{{moduleName}}",
      resourceData: { table: "{{tableName}}", operation: "insert" }
    },
    {
      actionId: "updateItem",
      resourceType: "sql", 
      desc: "✅更新-{{moduleName}}",
      resourceData: { table: "{{tableName}}", operation: "jhUpdate" }
    },
    {
      actionId: "deleteItem",
      resourceType: "sql",
      desc: "✅删除-{{moduleName}}", 
      resourceData: { table: "{{tableName}}", operation: "jhDelete" }
    }
  ],
  
  headContent: [
    { tag: 'jh-page-title', value: "{{moduleName}}", attrs: { cols: 12, sm: 6, md:4 }, helpBtn: true, slot: [] },
    { tag: 'v-spacer' },
    {
      tag: 'jh-search',
      attrs: { cols: 12, sm: 6, md:8 },
      searchBtn: true,
      value: [
        { tag: "v-text-field", model: "serverSearchWhereLike.{{searchField}}", attrs: {prefix: '{{searchPrefix}}'} },
      ],
      // v3版本新特性：直接在组件中配置data
      data: {
        serverSearchWhereLike: { {{searchField}}: '' },
        serverSearchWhere: {},
      }
    }
  ],
  
  pageContent: [
    {
      tag: 'jh-table',
      props: { serverPagination: true }, // 开启服务端分页
      attrs: {},
      colAttrs: { cols: 12 },
      cardAttrs: { class: 'rounded-lg elevation-0' },
      headActionList: [
        { tag: 'v-btn', value: '新增', attrs: { color: 'success', class: 'mr-2', '@click': 'doUiAction("startCreateItem")', small: true } },
        { tag: 'v-spacer' },
        // 默认筛选组件
        {
          tag: 'v-col',
          attrs: { cols: '12', sm: '6', md: '3', xs: 8, class: 'pa-0' },
          value: [
            { tag: 'v-text-field', attrs: {prefix: '筛选', 'v-model': 'searchInput', class: 'jh-v-input', ':dense': true, ':filled': true, ':single-line': true} },
          ],
        }
      ],
      headers: [
        { text: "ID", value: "id", width: 80, sortable: true, class: "fixed", cellClass: "fixed" },
        // 根据表结构动态生成字段列
        { text: "操作", value: "action", type: "action", width: 'window.innerWidth < 500 ? 70 : 120', align: "center", class: "fixed", cellClass: "fixed" },
        // ⚠️ width表达式需要使用字符串包裹
      ],
      rowActionList: [
        { text: '编辑', icon: 'mdi-note-edit-outline', color: 'success', click: 'doUiAction("startUpdateItem", item)' },
        { text: '删除', icon: 'mdi-trash-can-outline', color: 'error', click: 'doUiAction("deleteItem", item)' }
      ],
      value: []
    }
  ],
  
  actionContent: [
    {
      tag: 'jh-create-drawer',
      key: "create",
      attrs: {},
      title: '新增',
      headSlot: [{ tag: 'v-spacer'}],
      contentList: [
        {
          label: "新增",
          type: "form",
          formItemList: [
            // 根据表结构动态生成表单字段
            { label: "字段名", model: "fieldName", tag: "v-text-field", rules: "validationRules.requireRules" },
          ],
          action: [{
            tag: "v-btn",
            value: "新增",
            attrs: {
              color: "success",
              ':small': true,
              '@click': "doUiAction('createItem')"
            }
          }],
        },
      ]
    },
    {
      tag: 'jh-update-drawer',
      key: "update", 
      props: { mergeForm: true }, // prepareFormData 将会合并对象表单
      attrs: {},
      title: '编辑',
      headSlot: [{ tag: 'v-spacer'}],
      contentList: [
        {
          label: "编辑",
          type: "form",
          formItemList: [
            // 根据表结构动态生成表单字段
            { label: "字段名", model: "fieldName", tag: "v-text-field", rules: "validationRules.requireRules" },
          ],
          action: [{
            tag: "v-btn",
            value: "编辑", 
            attrs: {
              color: "success",
              ':small': true,
              '@click': "doUiAction('updateItem')"
            }
          }],
        },
        { label: "操作记录", type: "component", componentPath: "recordHistory", attrs: { table: '{{tableName}}', pageId: '{{moduleName}}', ':id': 'updateItem.id' } },
      ]
    },
  ],
  
  includeList: [], // { type: < js | css | html | vueComponent >, path: ''}
  
  common: {
    data: {
      constantObj: {},
      validationRules: {
        requireRules: [v => !!v || '必填'],
      },
      serverSearchWhereLike: { {{searchField}}: '' }, // 服务端like查询
      serverSearchWhere: {}, // 服务端查询
      serverSearchWhereIn: {}, // 服务端 in 查询
      filterMap: {}, // 结果筛选条件
    },
    dataExpression: {
      isMobile: 'window.innerWidth < 500'
    }, // data 表达式
    watch: {},
    computed: {
      tableDataComputed() {
        if(this.filterMap) {
          return this.tableData.filter(row => {
            for (const key in this.filterMap) {
              if (this.filterMap[key] && row[key] !== this.filterMap[key]) {
                return false;
              }
            }
            return true;
          });
        } else {
          return this.tableData;
        }
      },
    },
    doUiAction: {}, // 额外uiAction { [key]: [action1, action2]}
    methods: {}
  },
};

module.exports = content;
```

### 移动端标准配置模板

```javascript
const content = {
  pageType: "jh-mobile-page", 
  pageId: "mobile/{{moduleName}}", 
  pageName: "{{moduleName}}页面", 
  template: "jhMobileTemplateV4", 
  version: 'v3',
  
  resourceList: [
    // 与PC端相同的resourceList配置
  ],
  
  headContent: [
    { tag: 'jh-page-title', value: "{{moduleName}}", helpBtn: true, slot: [] },
    { 
      tag: 'jh-order',
      // v3版本新增特性：直接在组件中配置data
      data: {
        tableDataOrder: [ { column: "createAt", order: "desc" } ],
        tableDataOrderList: [
          { text: "创建时间↓", value: [ { column: "createAt", order: "desc" } ] },
          { text: "更新时间↓", value: [ { column: "operationAt", order: "desc" } ] },
        ],
      }
    },
    { 
      tag: 'jh-search', 
      searchList: [
        { tag: 'v-select', model: "serverSearchWhere.status", colAttrs: { class: 'pb-0' }, attrs: { prefix: '状态：', color: 'success', ':items': 'constantObj.statusList' } },
        { tag: 'v-text-field', model: "serverSearchWhereLike.name", colAttrs: { class: 'pb-0' }, attrs: { label: '名称:', color: 'success' }, quickAttrs: ['clearable'] },
      ],
      data: {
        serverSearchWhereLike: { name: '' },
        serverSearchWhere: { status: '' },
      }
    },
    { tag: 'v-spacer'},
    { tag: 'jh-mode', data: { viewMode: 'simple' } },
  ],
  
  pageContent: [
    {
      tag: 'jh-list',
      props: {
        limit: 10,
        rightArrowText: '',
      },
      attrs: { cols: 12, class: 'p-0 pb-7', ':style': '`height: calc(100vh - 140px); overflow-y: auto;overscroll-behavior: contain`' },
      headers: [
        {text: "ID", value: "id", width: 80, isSimpleMode: true},
        {text: "名称", value: "name", width: 90, isTitle: true},
        {text: "状态", value: "status", width: 80},
        {text: "创建时间", value: "createAt", width: 150},
        {text: '操作', value: 'action', align: 'center', sortable: false, width: 'window.innerWidth < 500 ? 90: 180', class: 'fixed', cellClass: 'fixed'},
      ],
      rowActionList: [
        { text: "编辑", icon: 'mdi-note-edit-outline', color: 'success', click: 'doUiAction("startUpdateItem", item)' }
      ],
    },
    {
      tag: 'jh-action',
      attrs: { class: 'h-16 w-16 p-2 fixed right-4 bottom-32' },
      actionList: [
        { tag: 'v-btn', value: '新增', icon: 'mdi-plus', color: 'success', click: "doUiAction('startCreateItem')" },
      ]
    }
  ],
  
  actionContent: [
    // 与PC端类似的抽屉配置，但适配移动端样式
  ],
  
  includeList: [],
  
  common: {
    data: {
      constantObj: {
        statusList: [
          { text: '全部', value: '' },
          { text: '启用', value: 'active' },
          { text: '禁用', value: 'inactive' }
        ]
      },
      validationRules: {
        requireRules: [v => !!v || '必填'],
      },
      filterMap: {},
    },
    dataExpression: {
      isMobile: 'window.innerWidth < 500'
    },
    watch: {},
    computed: {
      tableDataComputed() {
        if(this.filterMap) {
          return this.tableData.filter(row => {
            for (const key in this.filterMap) {
              if (this.filterMap[key] && row[key] !== this.filterMap[key]) {
                return false;
              }
            }
            return true;
          });
        } else {
          return this.tableData;
        }
      },
    },
    doUiAction: {},
    async created() {
      await this.doUiAction('getTableData');
    },
    methods: {}
  },
};

module.exports = content;
```

## 配置文件完整结构

### 基础配置结构
```javascript
const content = {
  pageType: "jh-page", // jh-page | jh-mobile-page | jh-component
  pageId: "pageName", 
  pageName: "页面标题",
  template: "jhTemplateV4", // jhTemplateV4 | jhMobileTemplateV4
  version: 'v3', // v2 | v3
  
  resourceList: [],      // API资源配置
  headContent: [],       // 页面头部内容
  pageContent: [],       // 页面主体内容
  actionContent: [],     // 抽屉/弹窗内容
  includeList: [],       // 引入的资源文件
  
  common: {
    data: {},            // Vue data
    computed: {},        // Vue computed
    watch: {},           // Vue watch
    created() {},        // Vue生命周期
    doUiAction: {},      // 自定义操作链
    methods: {}          // Vue methods
  },
  
  style: ``             // 自定义CSS样式
};

module.exports = content;
```

### resourceList 配置规范
```javascript
resourceList: [
  {
    actionId: "selectItemList",
    resourceType: "sql", // sql | service
    desc: "✅操作描述",
    resourceData: {
      table: "tableName",
      operation: "select" // select | insert | update | jhUpdate | delete
    },
    resourceHook: { 
      before: [{ service: "serviceName", serviceFunction: "functionName" }],
      after: [{ service: "serviceName", serviceFunction: "functionName" }]
    }
  }
]
```

### headContent 页面头部配置
```javascript
headContent: [
  // 页面标题
  { 
    tag: 'jh-page-title', 
    value: "页面标题", 
    attrs: { cols: 12, sm: 6, md: 4 }, 
    helpBtn: true 
  },
  { tag: 'v-spacer' },
  
  // 搜索组件
  {
    tag: 'jh-search',
    attrs: { cols: 12, sm: 6, md: 8 },
    value: [
      { 
        tag: "v-text-field", 
        model: "serverSearchWhereLike.name", 
        attrs: { prefix: '姓名：', clearable: true } 
      },
      { 
        tag: "v-select", 
        model: "serverSearchWhere.status", 
        attrs: { 
          ':items': 'constantObj.statusList',
          prefix: '状态：',
          clearable: true
        } 
      }
    ],
    searchBtn: true
  }
]
```

### pageContent 主体内容配置
```javascript
pageContent: [
  // 数据表格
  {
    tag: 'jh-table',
    props: { serverPagination: true },
    headers: [
      { text: "字段名", value: "fieldName", width: 120, sortable: true },
      { text: "固定列", value: "fixed", class: "fixed", cellClass: "fixed" },
      { 
        text: "操作", 
        value: "action", 
        type: "action", 
        width: 'window.innerWidth < 500 ? 80 : 180',
        align: "center" 
      }
    ],
    headActionList: [
      { 
        tag: 'v-btn', 
        value: '新增', 
        attrs: { 
          color: 'success', 
          '@click': 'doUiAction("startCreateItem")', 
          small: true 
        } 
      }
    ],
    rowActionList: [
      { 
        text: '编辑', 
        icon: 'mdi-note-edit-outline', 
        color: 'success', 
        click: 'doUiAction("startUpdateItem", item)' 
      },
      { 
        text: '删除', 
        icon: 'mdi-trash-can-outline', 
        color: 'error', 
        click: 'doUiAction("deleteItem", item)' 
      }
    ]
  }
]
```

### actionContent 抽屉弹窗配置

#### 🔑 actionContent 配置命名规范
- actionContent 下的 key 配置应该使用简洁的动作名称
- **不要**包含 `drawer`、`dialog` 等 UI 组件字眼  
- 使用语义化的动作名：`detail`、`update`、`create`、`delete` 等
- 系统会自动根据 key 生成对应的数据对象，格式为 `key + Item`
- 例如：key 为 `update` 的抽屉，会自动生成 `updateItem` 对象在 HTML 上

#### 🔧 弹框数据准备规范
- **数据准备方法命名**：`prepare{Key}Data` (key首字母大写)
- **打开弹框调用**：`doUiAction('view{Key}', item)`
- **⭐ 重要：参数传递机制**：`doUiAction` 调用时传递的参数会直接作为第一个参数传递给对应的数据准备方法
- **异步加载原则**：当弹框有请求时，先打开弹框显示loading，然后异步请求接口加载数据
- **示例**：弹框key为`tenantDetail`时
  - 数据准备方法：`prepareTenantDetailData`
  - 打开弹框调用：`doUiAction('viewTenantDetail', item)`
  - 参数传递：`item` 参数会直接传递给 `prepareTenantDetailData(funObj)` 方法的 `funObj` 参数
  - 异步加载流程：打开弹框 → 显示loading → 请求API → 更新数据

#### 🔧 表单提交数据准备规范
- **编辑提交数据准备**：`prepareDoUpdateItem`
- **新增提交数据准备**：`prepareDoCreateItem`
- **用途**：在提交前自定义要提交的数据字段，进行数据转换、验证、过滤等操作
- **示例**：
  ```javascript
  // 编辑弹框提交数据准备
  async prepareDoUpdateItem() {
    const {id, ...data} = this.updateItem;
    this.updateItemId = id;
    this.updateActionData = {
      tenantName: data.tenantName,
      tenantPhone: data.tenantPhone,
      // 只提交需要的字段
    };
  }
  
  // 新增弹框提交数据准备  
  async prepareDoCreateItem() {
    this.createActionData = {
      tenantName: this.createItem.tenantName,
      tenantPhone: this.createItem.tenantPhone,
      // 只提交需要的字段
    };
  }
  ```

#### 🔧 弹框多Tab配置规范
- **适用场景**：当弹框需要多个标签页展示不同内容时
- **配置方式**：通过 `contentList` 数组配置多个内容项
- **Tab类型**：支持表单(`type: "form"`)、组件(`type: "component"`)等类型
- **组件传参**：使用 `bind` 数组指定需要传递给子组件的数据字段
- **示例配置**：
  ```javascript
  // 多Tab抽屉示例 - 租客详情抽屉
  {
    tag: 'jh-drawer',
    key: "tenantDetail",
    title: '租客详情',
    contentList: [
      {
        label: "租客信息", // 第一个Tab：表单类型
        type: "form",
        formItemList: [
          { label: "租客姓名", model: "tenantName", tag: "v-text-field", colAttrs: { cols: 12, md: 6 }, attrs: { readonly: true, filled: true } },
          { label: "租客电话", model: "tenantPhone", tag: "v-text-field", colAttrs: { cols: 12, md: 6 }, attrs: { readonly: true, filled: true } },
          { label: "身份证号", model: "tenantIdCard", tag: "v-text-field", colAttrs: { cols: 12, md: 6 }, attrs: { readonly: true, filled: true } },
          { label: "性别", model: "tenantGender", tag: "v-text-field", colAttrs: { cols: 12, md: 6 }, attrs: { readonly: true, filled: true } },
          { label: "职业", model: "tenantJob", tag: "v-text-field", colAttrs: { cols: 12, md: 6 }, attrs: { readonly: true, filled: true } },
          { label: "当前租赁", model: "currentRentalCount", tag: "v-text-field", colAttrs: { cols: 12, md: 6 }, attrs: { readonly: true, filled: true, suffix: '个' } },
          { label: "历史租赁次数", model: "actualRentalCount", tag: "v-text-field", colAttrs: { cols: 12, md: 6 }, attrs: { readonly: true, filled: true, suffix: '次' } },
          { label: "累计租赁天数", model: "actualRentalDays", tag: "v-text-field", colAttrs: { cols: 12, md: 6 }, attrs: { readonly: true, filled: true, suffix: '天' } },
          { label: "租客状态", model: "tenantStatus", tag: "v-text-field", colAttrs: { cols: 12, md: 6 }, attrs: { readonly: true, filled: true } },
          { label: "备注", model: "remarks", tag: "v-textarea", colAttrs: { cols: 12 }, attrs: { readonly: true, filled: true, rows: 2 } }
        ]
      },
      {
        label: "租赁记录", // 第二个Tab：组件类型
        type: "component",
        componentPath: "sharedRental-tenantManagement/rentalHistory",
        bind: ['tenantDetailItem.tenantId'] // 传递tenantId给子组件
      },
      {
        label: "账单记录", // 第三个Tab：组件类型
        type: "component",
        componentPath: "sharedRental-tenantManagement/billHistory", 
        bind: ['tenantDetailItem.tenantId'] // 传递tenantId给子组件
      }
    ]
  }
  
  // 编辑抽屉多Tab示例
  {
    tag: 'jh-update-drawer',
    key: "update",
    props: { mergeForm: true },
    title: '编辑',
    contentList: [
      {
        label: "基本信息", // 第一个Tab：编辑表单
        type: "form",
        formItemList: [
          { label: "姓名", model: "name", tag: "v-text-field", rules: "validationRules.requireRules" },
          { label: "电话", model: "phone", tag: "v-text-field", rules: "validationRules.requireRules" }
        ],
        action: [{
          tag: "v-btn",
          value: "保存",
          attrs: { color: "success", '@click': "doUiAction('updateItem')" },
          quickAttrs: ['small']
        }]
      },
      {
        label: "操作记录", // 第二个Tab：操作历史组件
        type: "component",
        componentPath: "recordHistory",
        attrs: { 
          table: 'user', 
          pageId: 'userManagement', 
          ':id': 'updateItem.id' 
        }
      }
    ]
  }
  ```

#### 🔧 多Tab配置关键要点
- **组件引入**：需要在 `includeList` 中引入对应的组件文件
- **数据传递**：使用 `bind` 数组传递数据给子组件，如 `bind: ['tenantId']`
- **数据准备**：在弹框数据准备方法中设置需要传递的数据
- **Tab类型混合**：可以混合使用表单类型和组件类型的Tab

#### 🔧 includeList 配置示例
```javascript
includeList: [
  { type: 'html', path: 'component/sharedRental-tenantManagement/rentalHistory.html' },
  { type: 'html', path: 'component/sharedRental-tenantManagement/billHistory.html' }
]
```

#### 🔧 组件导入方式统一规范
**重要：所有 init-json 生成的组件导入必须统一使用以下格式：**

```javascript
// ✅ 正确的组件导入方式
includeList: [
  { type: 'html', path: 'component/sharedRental-tenantManagement/tenantCreateDrawer.html' },
  { type: 'html', path: 'component/orgManagement/adminAddDrawer.html' },
  { type: 'html', path: 'component/userManagement/userDetailDrawer.html' }
]
```

**说明：**
- **type**: 固定使用 `'html'`
- **path**: 使用相对路径，格式为 `'component/模块名/组件名.html'`
- **路径规范**: `component/` + `模块名-子模块名/` + `组件名.html`
- **命名约定**: 使用小驼峰命名或连字符分隔的命名方式

#### 🔧 bind 数据传递机制详解
- **bind 配置**：`bind: ['tenantId']` 表示将当前页面的 `tenantId` 数据传递给子组件
- **数据来源**：bind指定的数据字段必须在弹框数据准备方法中设置
- **传递方式**：子组件可以通过 `this.tenantId` 直接访问传递的数据
- **多字段传递**：`bind: ['tenantId', 'userId', 'status']` 可以传递多个字段
- **实时更新**：当页面中的数据发生变化时，传递给子组件的数据也会实时更新

#### 🔧 弹框数据准备示例（配合bind使用）
```javascript
// 在 common.methods 中实现
async prepareTenantDetailData(funObj) {
  // ⭐ funObj 就是 doUiAction('viewTenantDetail', item) 中传递的 item 参数
  
  // 设置弹框数据用于表单绑定
  this.tenantDetailItem = _.cloneDeep(funObj);
  this.tenantDetailItemOrigin = _.cloneDeep(funObj);
  
  // 设置详情数据用于模板绑定和组件传参
  this.tenantDetailData = _.cloneDeep(funObj);
  
  // ⭐ 关键：确保bind配置中的字段在此处设置
  this.tenantId = funObj.tenantId; // 对应 bind: ['tenantId']
  this.userId = funObj.userId;     // 对应 bind: ['tenantId', 'userId']
  this.status = funObj.status;     // 对应 bind: ['tenantId', 'userId', 'status']
}

// 🔥 实际项目示例：编辑床位信息
async prepareEditItem(funObj) {
  // funObj 就是表格行点击时传递的 item 数据
  this.editItem = _.cloneDeep(funObj);
  
  // 设置详情数据用于模板绑定和组件传参
  this.bedDetailData = _.cloneDeep(funObj);
  
  // 确保bedId传递给子组件
  this.bedId = funObj.bedId;
}
```

#### 🔧 doUiAction 参数传递核心机制
- **调用格式**：`doUiAction(actionName, ...params)`
- **参数传递**：所有在 `doUiAction` 中传递的参数，都会按顺序传递给对应的方法
- **方法接收**：数据准备方法可以直接通过参数接收这些数据
- **示例对应关系**：
  ```javascript
  // 调用方式
  doUiAction('viewEditItem', item, extraData)
  
  // 方法接收
  async prepareEditItemData(funObj, extraData) {
    // funObj = item (第一个参数)
    // extraData = extraData (第二个参数)
  }
  ```

#### 🔴 表单必填项标识规范
- 必填字段的 label 后方应添加红色星号标识
- 使用统一的 HTML 格式：`<span class='red--text ml-1'>*</span>`
- 配合验证规则 `rules: "validationRules.requireRules"` 使用
- 示例：`label: "用户名<span class='red--text ml-1'>*</span>"`

```javascript
actionContent: [
  // 新增抽屉
  {
    tag: 'jh-create-drawer',
    key: "create",  // ✅ 正确：使用简洁的动作名
    title: '新增',
    contentList: [
      {
        label: "新增表单",
        type: "form",
        formItemList: [
          { 
            label: "必填字段", 
            model: "requiredField", 
            tag: "v-text-field", 
            rules: "validationRules.requireRules" 
          },
          { 
            label: "下拉选择", 
            model: "selectField", 
            tag: "v-select", 
            attrs: { ':items': 'constantObj.options' } 
          },
          { 
            label: "邮箱", 
            model: "email", 
            tag: "v-text-field", 
            rules: "validationRules.emailRules" 
          },
          { 
            label: `手机号<span class="red--text ml-1">*</span>`, 
            model: "phone", 
            tag: "v-text-field", 
            rules: "validationRules.phoneRules" 
          },
          { 
            label: "文件上传", 
            tag: "jh-file-input", 
            attrs: {
              vModel: "formItem['attachment']",
              accept: "image/*,.pdf,.doc,.docx",
              showSize: true
            }
          },
          { 
            label: "多行文本", 
            model: "remarks", 
            tag: "v-textarea", 
            md: 12 
          },
          
          // 🔥 表单分组示例：使用标题和分组布局
          { tag: 'span', value: '基本信息', md: 12, attrs: {class: 'title pl-2'}},
          { tag: 'div', md: 12, value: [/*html*/ `
            <div class="grey lighten-5">
              <v-row class="ma-0 pa-2">
                <v-col cols="12" md="6">
                  <v-text-field v-model="formItem.name" label="姓名" dense></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="formItem.email" label="邮箱" dense></v-text-field>
                </v-col>
              </v-row>
            </div>
            `]
          },
          
          // 另一个分组
          { tag: 'span', value: '详细信息', md: 12, attrs: {class: 'title pl-2'}},
          { tag: 'div', md: 12, value: [/*html*/ `
            <div class="grey lighten-5">
              <v-row class="ma-0 pa-2">
                <v-col cols="12" md="4" v-for="(item, index) in detailInfoItems" :key="index">
                  <span>{{item.title}}：{{item.value}}</span>
                </v-col>
              </v-row>
            </div>
            `]
          }
        ],
        action: [{
          tag: "v-btn", 
          value: "保存",
          attrs: { 
            color: "success", 
            '@click': "doUiAction('createItem')" 
          },
          quickAttrs: ['small']
        }]
      }
    ]
  },
  
  // 编辑抽屉（多Tab示例）
  {
    tag: 'jh-update-drawer',
    key: "update",  // ✅ 正确：会自动生成 updateItem 数据对象
    props: { mergeForm: true }, // prepareFormData 将会合并对象表单
    title: '编辑',
    contentList: [
      {
        label: "基本信息", // 第一个Tab：表单
        type: "form",
        formItemList: [
          { label: "ID", model: "id", tag: "v-text-field", rules: "validationRules.requireRules" },
          { label: "姓名", model: "name", tag: "v-text-field", rules: "validationRules.requireRules" },
          { label: "电话", model: "phone", tag: "v-text-field", rules: "validationRules.phoneRules" },
          { label: "邮箱", model: "email", tag: "v-text-field", rules: "validationRules.emailRules" }
        ],
        action: [{
          tag: "v-btn",
          value: "保存",
          attrs: { color: "success", '@click': "doUiAction('updateItem')" },
          quickAttrs: ['small']
        }]
      },
      {
        label: "操作记录", // 第二个Tab：组件
        type: "component",
        componentPath: "recordHistory",
        attrs: { 
          table: 'user', 
          pageId: 'userManagement', 
          ':id': 'updateItem.id' 
        }
      }
    ]
  },
  
  // 多Tab详情抽屉（实际项目示例）
  {
    tag: 'jh-drawer',
    key: "tenantDetail",  // ✅ 正确：会自动生成 tenantDetailItem 数据对象
    title: '租客详情',
    attrs: { width: '80vw' },
    contentList: [
      {
        label: "租客信息", // 第一个Tab：详情表单
        type: "form",
        formItemList: [
          { label: "租客姓名", model: "tenantName", tag: "v-text-field", colAttrs: { cols: 12, md: 6 }, attrs: { readonly: true, filled: true } },
          { label: "租客电话", model: "tenantPhone", tag: "v-text-field", colAttrs: { cols: 12, md: 6 }, attrs: { readonly: true, filled: true } },
          { label: "身份证号", model: "tenantIdCard", tag: "v-text-field", colAttrs: { cols: 12, md: 6 }, attrs: { readonly: true, filled: true } },
          { label: "性别", model: "tenantGender", tag: "v-text-field", colAttrs: { cols: 12, md: 6 }, attrs: { readonly: true, filled: true } },
          { label: "职业", model: "tenantJob", tag: "v-text-field", colAttrs: { cols: 12, md: 6 }, attrs: { readonly: true, filled: true } },
          { label: "当前租赁", model: "currentRentalCount", tag: "v-text-field", colAttrs: { cols: 12, md: 6 }, attrs: { readonly: true, filled: true, suffix: '个' } },
          { label: "历史租赁次数", model: "actualRentalCount", tag: "v-text-field", colAttrs: { cols: 12, md: 6 }, attrs: { readonly: true, filled: true, suffix: '次' } },
          { label: "累计租赁天数", model: "actualRentalDays", tag: "v-text-field", colAttrs: { cols: 12, md: 6 }, attrs: { readonly: true, filled: true, suffix: '天' } },
          { label: "租客状态", model: "tenantStatus", tag: "v-text-field", colAttrs: { cols: 12, md: 6 }, attrs: { readonly: true, filled: true } },
          { label: "备注", model: "remarks", tag: "v-textarea", colAttrs: { cols: 12 }, attrs: { readonly: true, filled: true, rows: 2 } }
        ]
      },
      {
        label: "租赁记录", // 第二个Tab：租赁历史组件
        type: "component",
        componentPath: "sharedRental-tenantManagement/rentalHistory",
        bind: ['tenantDetailItem.tenantId'] // 传递tenantId给子组件
      },
      {
        label: "账单记录", // 第三个Tab：账单历史组件
        type: "component", 
        componentPath: "sharedRental-tenantManagement/billHistory",
        bind: ['tenantDetailItem.tenantId'] // 传递tenantId给子组件
      }
    ]
  }
]
```

### common 配置详解
```javascript
common: {
  data: {
    // 常量对象
    constantObj: {
      statusList: [
        { text: '全部', value: '' },
        { text: '启用', value: 'active' },
        { text: '禁用', value: 'inactive' }
      ]
    },
    
    // 验证规则
    validationRules: {
      requireRules: [v => !!v || '此字段为必填项'],
      emailRules: [
        v => !!v || '邮箱为必填项',
        v => /.+@.+\..+/.test(v) || '邮箱格式不正确'
      ],
      phoneRules: [
        v => !!v || '手机号为必填项',
        v => /^1[3-9]\d{9}$/.test(v) || '手机号格式不正确'
      ]
    },
    
    // 搜索条件
    serverSearchWhereLike: { name: '' },
    serverSearchWhere: { status: '' },
    filterMap: {},
    
    // 统计数据
    statistics: [
      { title: '总数量', value: 0, color: 'primary' },
      { title: '本月新增', value: 0, color: 'success' },
      { title: '待处理', value: 0, color: 'warning' },
      { title: '已完成', value: 0, color: 'info' }
    ]
  },
  
  computed: {
    // 表格数据计算
    tableDataComputed() {
      return this.tableData.filter(item => {
        // 筛选逻辑
        return true;
      });
    },
    
    // 权限判断
    canEdit() {
      return this.currentUser.role === 'admin' || 
             this.currentUser.id === this.editItem.userId;
    },
    
    // 移动端判断
    isMobile() {
      return window.innerWidth < 768;
    }
  },
  
  watch: {
    // 监听数据变化
    tableData: {
      handler() {
        this.calculateStatistics();
      },
      deep: true
    }
  },
  
  async created() {
    await this.doUiAction('getTableData');
  },
  
  doUiAction: {
    // 基础调用链
    customAction: ['method1', 'method2', 'doUiAction.refreshTable'],
    
    // 异步调用
    asyncAction: ['async.method1', 'method2'],
    
    // 方法带参数
    actionWithParam: ['method1(123)', 'method2'],
    
    // 嵌套doUiAction
    nestedAction: ['method1', 'doUiAction.customAction']
  },
  
  methods: {
    // 弹框数据准备方法规范
    // 格式：prepare + key + Data（key首字母大写）
    // 示例：弹框key为tenantDetail，数据准备方法为prepareTenantDetailData
    // ⭐ 重要：funObj参数是doUiAction调用时传递的参数
    async prepareTenantDetailData(funObj) {
      // funObj 就是 doUiAction('viewTenantDetail', item) 中的 item 参数
      this.tenantDetailItem = _.cloneDeep(funObj);
      this.tenantDetailItemOrigin = _.cloneDeep(funObj);
    },
    
    // 异步加载数据的弹框数据准备方法示例
    async prepareTenantDetailDataWithAsync(item) {
      try {
        // 设置loading状态
        this.tenantDetailLoading = true;
        
        // 异步请求数据
        const { data: { appData: { resultData } } } = await window.jianghuAxios({
          data: {
            appData: {
              pageId: this.pageId,
              actionId: 'selectTenantDetail',
              actionData: {},
              where: { id: item.id }
            }
          }
        });
        
        // 更新弹框数据
        this.tenantDetailItem = resultData[0] || {};
      } catch (error) {
        console.error('加载详情数据失败:', error);
        window.vtoast.fail('加载数据失败');
      } finally {
        // 关闭loading状态
        this.tenantDetailLoading = false;
      }
    },
    
    // 编辑弹框提交数据准备方法规范
    // 格式：prepareDoUpdate + key（key首字母大写，去掉key中的update部分）
    // 示例：弹框key为updateTenant，数据准备方法为prepareDoUpdateTenant
    // 或者 弹框key为update，数据准备方法为prepareDoUpdateItem
    async prepareDoUpdateItem() {
      const {id, ...data} = this.updateItem;
      this.updateItemId = id;
      this.updateActionData = {
        // 自定义要提交的字段
        tenantId: data.tenantId,
        tenantName: data.tenantName,
        tenantPhone: data.tenantPhone,
        // 可以在这里进行数据转换、验证、过滤等操作
      };
    },
    
    // 新增弹框提交数据准备方法规范
    // 格式：prepareDoCreate + key（key首字母大写，去掉key中的create部分）
    // 示例：弹框key为createTenant，数据准备方法为prepareDoCreateTenant
    // 或者 弹框key为create，数据准备方法为prepareDoCreateItem
    async prepareDoCreateItem() {
      this.createActionData = {
        // 自定义要提交的字段
        tenantName: this.createItem.tenantName,
        tenantPhone: this.createItem.tenantPhone,
        // 可以在这里进行数据转换、验证、过滤等操作
      };
    },
    
    // 打开弹框方法规范
    // 格式：view + key（key首字母大写）
    // 示例：弹框key为tenantDetail，打开方法为viewTenantDetail
    // 调用方式：doUiAction('viewTenantDetail', item)
    
    // API调用标准格式
    async getTableData() {
      const { data: { appData: { resultData } } } = await window.jianghuAxios({
        data: {
          appData: {
            pageId: this.pageId,
            actionId: 'selectItemList',
            actionData: {},
            where: this.serverSearchWhere,
            whereLike: this.serverSearchWhereLike,
            orderBy: [{ column: 'createTime', order: 'desc' }]
          }
        }
      });
      this.tableData = resultData;
    },
    
    // CRUD操作
    async createItem() {
      try {
        await window.jianghuAxios({
          data: {
            appData: {
              pageId: this.pageId,
              actionId: 'insertItem',
              actionData: this.formItem
            }
          }
        });
        window.vtoast.success('创建成功');
        this.isCreateDrawerShown = false;
        await this.doUiAction('getTableData');
      } catch (error) {
        console.error('创建失败:', error);
        window.vtoast.fail('创建失败: ' + (error.message || '未知错误'));
      }
    },
    
    async updateItem() {
      try {
        await window.jianghuAxios({
          data: {
            appData: {
              pageId: this.pageId,
              actionId: 'updateItem',
              actionData: this.formItem,
              where: { id: this.formItem.id }
            }
          }
        });
        window.vtoast.success('更新成功');
        this.isUpdateDrawerShown = false;
        await this.doUiAction('getTableData');
      } catch (error) {
        window.vtoast.fail('更新失败');
      }
    },
    
    async deleteItem(item) {
      if (await window.confirmDialog({ title: "确认删除", content: "确定要删除这条记录吗？" })) {
        try {
          await window.jianghuAxios({
            data: {
              appData: {
                pageId: this.pageId,
                actionId: 'deleteItem',
                where: { id: item.id }
              }
            }
          });
          window.vtoast.success('删除成功');
          await this.doUiAction('getTableData');
        } catch (error) {
          window.vtoast.fail('删除失败');
        }
      }
    },
    
    // 统计计算
    calculateStatistics() {
      this.statistics[0].value = this.tableData.length;
      this.statistics[1].value = this.tableData.filter(item => 
        new Date(item.createTime).getMonth() === new Date().getMonth()
      ).length;
    },
    
    // 导出功能
    async exportToExcel() {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('数据列表');
      
      // 设置表头
      worksheet.addRow(['姓名', '状态', '创建时间']);
      
      // 添加数据
      this.tableData.forEach(item => {
        worksheet.addRow([item.name, item.status, item.createTime]);
      });
      
      // 生成文件
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `数据导出_${new Date().getTime()}.xlsx`;
      a.click();
    }
  }
}
```

## 移动端配置
```javascript
const content = {
  pageType: "jh-mobile-page",
  template: "jhMobileTemplateV4",
  
  headContent: [
    { tag: 'jh-page-title', value: "页面标题" },
    { 
      tag: 'jh-order',
      data: {
        tableDataOrder: [{ column: "createAt", order: "desc" }],
        tableDataOrderList: [
          { text: "时间↓", value: [{ column: "createAt", order: "desc" }] }
        ]
      }
    },
    { 
      tag: 'jh-search',
      searchList: [
        { 
          tag: 'v-select', 
          model: "serverSearchWhere.status", 
          attrs: { 
            prefix: '状态：', 
            ':items': 'constantObj.statusList' 
          } 
        }
      ],
      data: { serverSearchWhere: { status: '' } }
    },
    { tag: 'jh-mode', data: { viewMode: 'simple' } }
  ],
  
  pageContent: [
    {
      tag: 'jh-list',
      props: { limit: 10 },
      headers: [
        { text: "标题", value: "title", isTitle: true },
        { text: "状态", value: "status", isSimpleMode: true }
      ]
    }
  ]
};
```

## 文件命名约定

### 配置文件命名
- 配置文件: 小驼峰命名 `pageManagement.js`
- 页面ID: 小驼峰命名 `pageManagement`
- 组件key: 小驼峰命名 `createDrawer`

### 变量命名规范
```javascript
// 数据变量
constantObj: {},
validationRules: {},
serverSearchWhere: {},
serverSearchWhereLike: {},
filterMap: {},

// 状态变量
isCreateDrawerShown: false,    // 抽屉显示状态
isTableLoading: false,         // 表格加载状态
tenantDetailLoading: false,    // 弹框内容加载状态

// 表格相关
tableData: [],
tableDataFromBackend: [],
```

## 开发约定

1. **抽屉显示状态**: `is{Key}DrawerShown` (自动生成)
2. **调用抽屉**: `doUiAction('view{Key}', data)`
3. **弹框数据准备方法**: `prepare{Key}Data` (key首字母大写)
4. **⭐ 参数传递机制**: `doUiAction('actionName', param1, param2)` 中的参数会按顺序传递给对应方法
5. **编辑提交数据准备**: `prepareDoUpdate{Key}` 或 `prepareDoUpdateItem`
6. **新增提交数据准备**: `prepareDoCreate{Key}` 或 `prepareDoCreateItem`
7. **多Tab弹框配置**: 通过 `contentList` 数组配置，每项包含 `label`、`type` 等属性
8. **API调用标准格式**: `window.jianghuAxios({ data: { appData: {...} } })`
9. **验证规则**: `validationRules.requireRules`
10. **常量对象**: `constantObj.fieldName`

## 版本差异

- **v2**: 增加服务端搜索、分页
- **v3**: 重构组件，变量管理优化，支持标签内data配置

## 配置文件结构

### 页面配置文件位置
- `app/view/init-json/page/[fileName].js`

### 组件配置文件位置
- `app/view/init-json/component/[fileName].js`

## 组件导入规范

### 🔑 统一导入方式
**所有 init-json 生成的组件必须统一使用以下导入格式：**

```javascript
includeList: [
  { type: 'html', path: 'component/模块名/组件名.html' }
]
```

### 🔑 组件配置文件 pageId 规范
**组件 init-json 配置文件中的 pageId 必须与父页面的 pageId 保持一致：**

```javascript
// 父页面配置 (userManagement.js)
const content = {
  pageType: "jh-page",
  pageId: "userManagement",  // 父页面 pageId
  // ...
};

// 组件配置 (userCreateDrawer.js)
module.exports = {
  pageType: "jh-component",
  pageId: "userManagement",  // ✅ 与父页面保持一致
  componentPath: "userManagement/userCreateDrawer",
  // ...
};
```

**重要说明：**
- **保持一致性**: 组件的 pageId 直接使用父页面的 pageId
- **资源共享**: 相同 pageId 的组件可以共享父页面的资源配置
- **权限统一**: 统一的 pageId 确保权限控制的一致性

### 🔑 路径命名规范
- **基础路径**: 固定以 `component/` 开头
- **模块名规范**:
  - 单模块：`component/userManagement/`
  - 多级模块：`component/sharedRental-tenantManagement/`
  - 使用连字符分隔多级模块名
- **组件名规范**: 使用小驼峰命名，如 `tenantCreateDrawer.html`

### 🔑 标准示例
```javascript
// ✅ 正确的组件导入示例
includeList: [
  // 用户管理模块组件
  { type: 'html', path: 'component/userManagement/userCreateDrawer.html' },
  { type: 'html', path: 'component/userManagement/userDetailDrawer.html' },

  // 共享租赁-租客管理模块组件
  { type: 'html', path: 'component/sharedRental-tenantManagement/tenantCreateDrawer.html' },
  { type: 'html', path: 'component/sharedRental-tenantManagement/rentalHistory.html' },
  { type: 'html', path: 'component/sharedRental-tenantManagement/billHistory.html' },

  // 组织管理模块组件
  { type: 'html', path: 'component/orgManagement/orgTree.html' },
  { type: 'html', path: 'component/orgManagement/adminAddDrawer.html' },

  // 通用组件
  { type: 'html', path: 'component/common/recordHistory.html' }
]
```

### 🔑 错误示例对比
```javascript
// ❌ 错误的导入方式 - 缺少模块路径
{ type: 'html', path: 'component/orgTree.html' }

// ❌ 错误的导入方式 - 路径不规范
{ type: 'html', path: 'components/userManagement/userCreate.html' }

// ❌ 错误的导入方式 - 类型错误
{ type: 'vue', path: 'component/userManagement/userCreate.html' }

// ✅ 正确的导入方式
{ type: 'html', path: 'component/userManagement/userCreateDrawer.html' }
```

### 🔑 组件目录结构建议
```
app/view/
├── init-json/
│   ├── page/              # 页面配置文件
│   └── component/         # 组件配置文件
│       ├── userManagement/
│       ├── orgManagement/
│       └── sharedRental-tenantManagement/
└── component/             # 生成的组件HTML文件
    ├── userManagement/
    │   ├── userCreateDrawer.html
    │   └── userDetailDrawer.html
    ├── orgManagement/
    │   ├── orgTree.html
    │   └── adminAddDrawer.html
    ├── sharedRental-tenantManagement/
    │   ├── tenantCreateDrawer.html
    │   ├── rentalHistory.html
    │   └── billHistory.html
    └── common/
        └── recordHistory.html
```

### 弹框组件配置示例

弹框组件是一种特殊的组件类型，通常作为子组件在父页面中使用。以下是一个完整的弹框组件配置示例：

```javascript
// app/view/init-json/component/orgManagement/adminAddDrawer.js
module.exports = {
  "pageId": "orgManagement",
  "pageType": "jh-component",
  "componentPath": "orgManagement/adminAddDrawer",
  
  resourceList: [
    { 
      actionId: "selectNewMemberListByOrg", 
      resourceType: "sql", 
      resourceHook: {
        "after": [{"service": "org", "serviceFunction": "filterNewMemberListByOrgIdAfterHook"}]
      }, 
      desc: "✅查询组织新人员列表", 
      resourceData: {"table": "org_member_role", "operation": "select"} 
    },
    { 
      actionId: "addOrgAdmin", 
      resourceType: "service", 
      resourceHook: {}, 
      desc: "✅增加班级管理员", 
      resourceData: {"service": "org", "serviceFunction": "addOrgAdmin"} 
    }
  ],
  
  includeList: [
    { type: 'html', path: 'component/orgManagement/orgTree.html' },
  ], 
  
  pageContent: [],
  
  actionContent: [
    {
      tag: 'jh-drawer',
      key: "current",
      attrs: { style: "z-index: 120 !important;", width: '80%' },
      title: '添加管理员',
      headSlot: [
        { tag: 'v-spacer' }
      ],
      contentList: [
        {
          type: "form",
          formItemList: [
            // 组织信息标题和展示
            { 
              tag: 'span', 
              value: '{{orgInfo.orgType}}信息', 
              md: 12, 
              attrs: {class: 'title pl-2'}
            },
            { 
              tag: 'div', 
              md: 12, 
              value: [/*html*/ `
                <div class="grey lighten-5">
                  <v-row class="ma-0 pa-2">
                    <v-col cols="12" md="3" v-for="(item, index) in courseInfoItems" :key="index">
                      <span>{{item.title}}：{{item.value}}</span>
                    </v-col>
                  </v-row>
                </div>
              `]
            },
            
            // 左侧组织树
            { 
              tag: 'div', 
              md: 4, 
              value: [/*html*/ `
                <span class="title pl-2">可选人员</span>
                <org-tree 
                  v-model="currentOrgId" 
                  @change="doUiAction('getTableData')" 
                  treeStyle="max-height: calc(100vh - 257px)" 
                  :showExpandAll="false">
                </org-tree>
              `]  
            },
            
            // 右侧人员表格
            { 
              tag: 'div', 
              md: 8, 
              value: [/*html*/ `
                <!-- 表格顶部栏 -->
                <v-card class="rounded-lg elevation-0">
                  <v-row class="ma-0 pb-3 pa-0 px-3 px-md-0" align="center">
                    <v-btn color="success" class="mr-2 mb-4 mb-md-0" @click="doUiAction('addOrgAdmin', selection)" small>
                      批量添加
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-col cols="12" sm="6" md="4" class="pa-0 mr-2">
                      <v-text-field 
                        prefix="搜索" 
                        v-model="searchInput" 
                        class="jh-v-input" 
                        dense 
                        filled 
                        single-line 
                        append-icon="mdi-magnify">
                      </v-text-field>
                    </v-col>
                  </v-row>
                  
                  <!-- 表格 -->
                  <jh-data-list
                    v-model="selection"
                    :headers="headers"
                    :items="tableDataComputed"
                    :search="searchInput"
                    :footer-props="{ itemsPerPageOptions: [20, 50, 200, -1], itemsPerPageText: '每页', itemsPerPageAllText: '所有'}"
                    :items-per-page="-1"
                    mobile-breakpoint="0"
                    :loading="isTableLoading"
                    checkbox-color="success"
                    :class="{'zebraLine': true}"
                    fixed-header
                    show-select
                    class="jh-fixed-table-height elevation-0 mt-0 mb-xs-4">
                    
                    <!-- 表格插槽 -->
                    <template v-slot:item.action="{ item }">
                      <span class="jh-table-action success--text" @click="doUiAction('addSingleAdmin', item)">
                        <v-icon size="20" class="success--text text--accent-2 mr-2">mdi-plus-circle-outline</v-icon>添加
                      </span>
                    </template>
                    
                    <!-- 没有数据 -->
                    <template v-slot:loading>
                      <div class="jh-no-data">数据加载中</div>
                    </template>
                    <template v-slot:no-data>
                      <div class="jh-no-data">暂无数据</div>
                    </template>
                    <template v-slot:no-results>
                      <div class="jh-no-data">暂无数据</div>
                    </template>
                    
                    <!-- 表格分页 -->
                    <template v-slot:footer.page-text="pagination">
                      <span>{{pagination.pageStart}}-{{pagination.pageStop}}</span>
                      <span class="ml-1">共{{pagination.itemsLength}}条</span>
                    </template>
                  </jh-data-list>
                </v-card>
              `]
            }
          ]
        }
      ]
    }
  ],
  
  common: {
    props: ['orgId', 'orgInfo'],
    
    data: {
      // 组织信息展示项
      courseInfoItems: [
        { title: '课程名称', key: 'orgName', value: '' }
      ],
      
      selectedMemberList: [],
      
      // 表格配置
      headers: [
        { text: "管理员名称", value: "memberName", width: 100 },
        { text: "会友编号", value: "memberId", width: 120 },
        { text: "牧区", value: "district", width: 80 },
        { text: '操作', value: 'action', disabled: true, align: 'center', width: 80, class: 'fixed', cellClass: 'fixed' }
      ],
      tableData: [],
      isTableLoading: false,
      searchInput: null,
      currentOrgId: '',
      selection: [],
    },
    
    dataExpression: {
      isMobile: 'window.innerWidth < 500',
      constantObj: 'window.constantObj',
      constantCollection: 'window.constantObj',
    }, 
    
    computed: {
      tableDataComputed() {
        return this.tableData || [];
      }
    },
    
    created() {
      // 组件创建时的初始化逻辑
    },

    doUiAction: {
      openDrawer: ['prepareCurrentData', 'openCurrentDrawer'],
      closeDrawer: ['closeCurrentDrawer'],
      getTableData: ['getTableData'],
      addOrgAdmin: ['addOrgAdmin', 'closeCurrentDrawer', 'emitSuccessEvent'],
      addSingleAdmin: ['addSingleAdmin', 'getTableData'],
    },
   
    methods: {
      // 准备弹窗数据
      async prepareCurrentData() {
        this.tableData = [];
        this.courseInfoItems[0].title = this.orgInfo.orgType + '名称';
        this.courseInfoItems.forEach(item => {
          item.value = this.orgInfo[item.key];
        });
      },

      // 获取表格数据
      async getTableData() {
        this.isTableLoading = true;
        this.tableData = [];

        const where = {};
        if (this.currentOrgId) {
          where.orgId = `${this.currentOrgId}`;
        }

        try {
          const result = await window.jianghuAxios({
            data: {
              appData: {
                pageId: 'orgManagement',
                actionId: 'selectNewMemberListByOrg',
                actionData: {orgId: this.orgId},
                where,
                orderBy: [{ column: 'memberName', order: 'asc' }]
              }
            }
          });
          
          const { rows } = result.data.appData.resultData;
          this.tableData = rows || [];
        } catch (error) {
          console.error('获取数据失败:', error);
          window.vtoast.fail('获取数据失败');
        } finally {
          this.isTableLoading = false;
        }
      },

      // 批量添加管理员
      async addOrgAdmin(selection) {
        if (selection.length === 0) {
          return window.vtoast.error('请选择人员');
        }
        
        await window.vtoast.loading("正在添加管理员");
        
        try {
          const adminList = selection;
          const result = await window.jianghuAxios({
            data: {
              appData: {
                pageId: 'orgManagement',
                actionId: 'addOrgAdmin',
                actionData: { orgId: this.orgId, adminList }
              }
            }
          });
          
          if (result.data.appData.resultData === 'ok') {
            window.vtoast.success('操作成功');
          } else {
            window.vtoast.error('操作失败');
            throw new Error('操作失败');
          }
        } catch (error) {
          console.error('添加管理员失败:', error);
          window.vtoast.error('操作失败');
          throw error;
        }
      },

      // 添加单个管理员
      async addSingleAdmin(item) {
        await this.addOrgAdmin([item]);
      },

      // 触发成功事件
      async emitSuccessEvent() {
        this.$emit('success');
      }
    }
  },
  
  style: `
    .jh-chip.v-chip{
      background-color: #EDF7EE !important;
      color: var(--cPrimaryColor) !important;
    }
  `
};
```

### 弹框组件配置要点

#### 🔑 组件类型配置
- **pageType**: 必须设置为 `"jh-component"`
- **pageId**: 使用父页面的 pageId，保持一致性
- **componentPath**: 组件路径，用于在父页面中引用

#### 🔑 Props传参机制
- **props配置**: 通过 `common.props` 定义组件接收的参数
- **父页面传参**: 在父页面的 `includeList` 和组件使用处传递参数

#### 🔑 事件通信
- **子向父通信**: 使用 `this.$emit('eventName', data)` 向父组件发送事件
- **父页面监听**: 在父页面组件标签上使用 `@eventName="handleMethod"`

#### 🔑 弹框组件特点
- **独立性**: 组件有自己完整的生命周期和状态管理
- **复用性**: 可以在多个父页面中复用
- **封装性**: 内部逻辑封装，通过props和events与外部通信

### 表格组件配置示例

表格组件是JianghuJS中最常用的组件类型之一，用于展示和操作数据列表。以下是一个完整的表格组件配置示例：

```javascript
// app/view/init-json/component/orgAdminTable.js
module.exports = {
  "pageType": "jh-component",
  "pageId": "orgManagement",  // 与父页面 pageId 保持一致
  "componentPath": "orgAdminTable",
  
  resourceList: [
    { 
      actionId: "selectOrgAdminList", 
      resourceType: "sql", 
      resourceHook: {}, 
      desc: "✅获取组织管理员", 
      resourceData: {
        "table": "view01_org_member_role", 
        "where": {"roleId": "管理员"}, 
        "operation": "select"
      } 
    },
    { 
      actionId: "delectOrgAdmin", 
      resourceType: "sql", 
      resourceHook: {}, 
      desc: "✅删除组织管理员", 
      resourceData: {
        "table": "org_member_role", 
        "operation": "jhDelete"
      } 
    }
  ],
  
  includeList: [],
  
  pageContent: [
    {
      tag: 'jh-table',
      attrs: {},
      colAttrs: { cols: 12 },
      cardAttrs: { class: 'rounded-lg elevation-0' },
      
      // 表格头部操作栏
      headActionList: [
        { 
          tag: 'v-btn', 
          value: '增加管理员', 
          attrs: { 
            color: 'success', 
            class: 'mr-2 mb-4 mb-md-0', 
            '@click': 'doUiAction("openAddAdmin")', 
            small: true 
          } 
        },
        { tag: 'v-spacer' },
        // 默认筛选组件
        {
          tag: 'v-col',
          attrs: { cols: '12', sm: '6', md: '4', class: 'pa-0' },
          value: [
            { 
              tag: 'v-text-field', 
              attrs: {
                prefix: '筛选', 
                'v-model': 'searchInput', 
                class: 'jh-v-input', 
                ':dense': true, 
                ':filled': true, 
                ':single-line': true
              } 
            }
          ]
        }
      ],
      
      // 表格列定义
      headers: [
        { text: "管理员名称", value: "memberName", width: 100 },
        { text: "会友编号", value: "memberId", width: 120 },
        { text: "牧区", value: "district", width: 80 },
        { 
          text: '操作', 
          value: 'action', 
          disabled: true, 
          align: 'center', 
          width: 80, 
          class: 'fixed', 
          cellClass: 'fixed' 
        }
      ],
      
      // 表格插槽配置（可选）
      value: [
        // 自定义插槽示例
        // { tag: 'template', attrs: {'slot': 'item.className', 'slot-scope': "{item, index}"}, value: "<div>{{item.className}}</div>" }
      ],
      
      // 行操作按钮
      rowActionList: [
        { 
          text: '删除', 
          icon: 'mdi-trash-can-outline', 
          color: 'error', 
          click: 'doUiAction("deleteItem", item)' 
        } 
      ]
    }
  ],
  
  common: {
    // Props定义 - 支持详细配置
    props: {
      'orgId': {
        type: [String, Number],
        default: ''
      },
      'orgInfo': {
        type: Object,
        default: () => ({})
      }
    },

    data: {
      isTableLoading: true,
      tableData: [],
      searchInput: null, // 筛选输入
    },
    
    dataExpression: {
      isMobile: 'window.innerWidth < 500',
    },

    // 组件挂载后自动加载数据
    mounted() {
      this.doUiAction('getTableData');
    },
    
    computed: {
      // 表格数据计算属性
      tableDataComputed() {
        if (!this.searchInput) return this.tableData;
        return this.tableData.filter(item => {
          return Object.values(item).some(val => 
            String(val).toLowerCase().includes(this.searchInput.toLowerCase())
          );
        });
      }
    },

    doUiAction: {
      getTableData: ['getTableData'],
      openAddAdmin: ['openAddAdmin'],
      deleteItem: ['confirmDeleteItemDialog', 'doDeleteItem', 'getTableData']
    },
    
    methods: {
      // 获取表格数据
      async getTableData() {
        this.isTableLoading = true;
        this.tableData = [];

        try {
          const result = await window.jianghuAxios({
            data: {
              appData: {
                pageId: 'orgManagement',
                actionId: 'selectOrgAdminList',
                actionData: {},
                where: { orgId: this.orgId },
                orderBy: [{ column: 'memberName', order: 'asc' }]
              }
            }
          });
          
          const { rows } = result.data.appData.resultData;
          this.tableData = rows || [];
        } catch (error) {
          console.error('获取数据失败:', error);
          window.vtoast.fail('获取数据失败');
        } finally {
          this.isTableLoading = false;
        }
      },
      
      // 打开新增管理员弹窗
      async openAddAdmin() {
        this.$emit('openAddAdmin');
      },

      // 确认删除管理员对话框
      async confirmDeleteItemDialog(item) {
        const confirmed = await window.confirmDialog({ 
          title: "删除", 
          content: `确定删除"<span class="red--text">${item.orgName}</span>"的管理员"<span class="red--text">${item.memberName}</span>"吗？` 
        });
        
        if (!confirmed) {
          throw new Error("[confirmDeleteItemDialog] 用户取消操作");
        }
      },

      // 执行删除操作
      async doDeleteItem(item) {
        await window.vtoast.loading("正在删除");
        
        try {
          const result = await window.jianghuAxios({
            data: {
              appData: {
                pageId: 'orgManagement',
                actionId: 'delectOrgAdmin',
                where: { id: item.id }
              }
            }
          });
          
          if (result.data.appData.resultData) {
            window.vtoast.success('删除成功');
          } else {
            window.vtoast.error('删除失败');
            throw new Error('删除失败');
          }
        } catch (error) {
          console.error('删除操作失败:', error);
          window.vtoast.error('删除失败');
          throw error;
        }
      }
    }
  }
};
```

### 表格组件配置要点

#### 🔑 表格基础配置
- **pageType**: 设置为 `"jh-component"` 表示这是一个组件
- **pageId**: 使用父页面的 pageId，保持一致性
- **componentPath**: 组件路径，用于在父页面中引用
- **pageContent**: 主要包含 `jh-table` 配置

#### 🔑 表格头部操作栏 (headActionList)
```javascript
headActionList: [
  // 操作按钮
  { tag: 'v-btn', value: '新增', attrs: { color: 'success', '@click': 'doAction()' } },
  { tag: 'v-spacer' }, // 弹性空间
  // 搜索框
  {
    tag: 'v-col',
    attrs: { cols: '12', sm: '6', md: '4', class: 'pa-0' },
    value: [
      { tag: 'v-text-field', attrs: { prefix: '筛选', 'v-model': 'searchInput' } }
    ]
  }
]
```

#### 🔑 表格列配置 (headers)
```javascript
headers: [
  { text: "列标题", value: "fieldName", width: 120, sortable: true },
  { text: "固定列", value: "fixed", class: "fixed", cellClass: "fixed" },
  { 
    text: "操作", 
    value: "action", 
    type: "action", 
    width: 'window.innerWidth < 500 ? 80 : 120',
    align: "center" 
  }
]
```

#### 🔑 行操作配置 (rowActionList)
```javascript
rowActionList: [
  { 
    text: '编辑', 
    icon: 'mdi-note-edit-outline', 
    color: 'success', 
    click: 'doUiAction("editItem", item)' 
  },
  { 
    text: '删除', 
    icon: 'mdi-trash-can-outline', 
    color: 'error', 
    click: 'doUiAction("deleteItem", item)' 
  }
]
```

#### 🔑 Props详细配置
表格组件支持详细的Props类型定义：
```javascript
props: {
  'dataId': {
    type: [String, Number],
    default: '',
    required: true
  },
  'config': {
    type: Object,
    default: () => ({}),
    validator: (value) => {
      return typeof value === 'object';
    }
  }
}
```

#### 🔑 数据筛选和搜索
- **本地筛选**: 通过 `computed` 属性实现客户端搜索
- **服务端筛选**: 在 `getTableData` 方法中传递搜索参数
- **多条件筛选**: 支持多个搜索条件组合

#### 🔑 表格组件特点
- **数据展示**: 主要用于列表数据的展示和操作
- **交互丰富**: 支持排序、筛选、分页、行操作等
- **响应式**: 自动适配移动端和桌面端
- **可扩展**: 支持自定义插槽和操作按钮

### 树组件配置示例

树组件用于展示层级结构数据，如组织架构、分类目录等。以下是一个完整的组织树组件配置示例：

```javascript
// app/view/init-json/component/orgTree.js
const content = {
  pageType: "jh-component",
  pageId: "orgManagement",  // 与父页面 pageId 保持一致
  componentPath: 'orgTree',
  
  resourceList: [
    {
      actionId: "selectOrgTree",
      resourceType: "sql",
      desc: "✅查询组织树",
      resourceData: {
        "table": "view01_org_tree",
        "operation": "select"
      }
    }
  ],
  
  includeList: [],
  
  headContent: [],
  
  pageContent: [
    /*html*/`
    <div>
      <!-- 展开/收缩控制按钮 -->
      <v-btn v-if="showExpandAll" class="mt-4" @click="toggleOrgTree" small>
        <v-icon size="18">{{isAllExpand ? 'mdi-plus-box-outline': 'mdi-minus-box-outline'}}</v-icon>
        {{isAllExpand ? '全部收缩' : '全部展开'}}
      </v-btn>
      
      <!-- 树形组件容器 -->
      <v-card rounded v-if="orgTree.length">
        <!-- 搜索框 -->
        <v-text-field 
          prefix="搜索" 
          v-model="searchInput" 
          class="jh-v-input pa-2" 
          dense 
          filled 
          single-line 
          append-icon="mdi-magnify">
        </v-text-field>
        
        <!-- 树形组件 -->
        <v-treeview 
          :active="[currentOrgId]" 
          @update:active="doUiAction('onTreeChange', $event)" 
          shaped 
          hoverable 
          activatable
          :open-all="false" 
          :open="openTree" 
          :items="filterOrgItems" 
          item-key="orgId" 
          item-text="orgName"
          class="jh-fixed-table-height overflow-y-auto overflow-x-hidden" 
          dense>
          
          <!-- 自定义节点标签 -->
          <template v-slot:label="{ item, open }">
            <span :class="{'grey--text': item.orgStatus == 'closed'}">
              {{ item.orgName }}{{item.orgStatus == 'active'? '': '（已关闭）'}}
            </span>
          </template>

          <!-- 自定义节点图标 -->
          <template v-slot:prepend="{ item, open }">
            <v-icon size="20" v-if="item.orgType == '组织'">mdi-family-tree</v-icon>
            <v-icon size="20" v-if="item.orgType == '课程'">mdi-bookmark-box-outline</v-icon>
            <v-icon size="20" v-if="item.orgType == '班级'">mdi-account-group</v-icon>
          </template>
          
          <!-- 组件开放append插槽，允许父组件自定义 -->
          <template v-slot:append="{ item, open }">
            <slot name="append" v-bind:item="item" v-bind:open="open" />
          </template>
        </v-treeview>
      </v-card>
      
      <!-- 数据加载骨架屏 -->
      <v-skeleton-loader class="ma-0" type="article@3" v-else></v-skeleton-loader>
    </div>
    `
  ],
  
  actionContent: [
    {
      tag: 'jh-drawer',
      key: "coursewareList",
      attrs: {},
      title: '查看教材',
      contentList: [
        `<jh-data-list class="ma-3"></jh-data-list>`
      ]
    }
  ],
  
  common: { 
    // Props配置 - 支持v-model
    props: {
      'value': {
        type: [String, Number],
        default: ''
      }, 
      'currentOrgId': {
        type: [String, Number],
        default: ''
      }, 
      'showExpandAll': {
        type: Boolean,
        default: true
      },
      'treeStyle': {
        type: String,
        default: ''
      }
    },
    
    data: {
      isAllExpand: true, // 是否全部展开
      orgTree: [], // 树形数据
      orgList: [], // 扁平化数据
      openTree: [], // 展开的节点
      searchInput: '', // 搜索关键词
      currentOrgInfo: {}, // 当前选中的组织信息
    },

    computed: {
      // 过滤树形数据（搜索功能）
      filterOrgItems() {
        const search = this.searchInput.trim();
        if (!search) {
          return this.orgTree;
        }
        
        const openNodes = new Set();
        const filter = (data) => {
          return data.map(item => {
            // 当前节点匹配搜索条件
            if (item.orgName.indexOf(search) > -1) {
              openNodes.add(item.orgId);
              return item;
            }
            
            // 递归检查子节点
            if (item.children) {
              const filteredChildren = filter(item.children);
              if (filteredChildren.length > 0) {
                openNodes.add(item.orgId);
                return { ...item, children: filteredChildren };
              }
            }
            return null;
          }).filter(item => item !== null);
        };
        
        const filteredItems = filter(this.orgTree);
        this.openTree = Array.from(openNodes); 
        return filteredItems;
      }
    },
    
    async created() {
      // 防抖更新值，避免频繁触发
      this.debouncedUpdateValue = _.debounce(this.updateValue, 300);
      await this.doUiAction('getOrgTree');
    },
    
    doUiAction: {
      getOrgTree: ['getUrlParams', 'getOrgTree', 'setDefaultSelectedOrg', 'openAllNode'],
      refreshOrgTree: ['getOrgTree'],
      onTreeChange: ['onTreeChange'],
    },
    
    methods: {
      // 获取URL参数
      async getUrlParams() {
        const urlObj = new URLSearchParams(location.search.substring(1));
        this.orgId = urlObj.get('orgId');
      },
      
      // 更新v-model值并触发change事件
      updateValue() {
        let currentOrgInfo = _.cloneDeep(this.currentOrgInfo);
        if (currentOrgInfo.orgConfig && typeof currentOrgInfo.orgConfig === 'string') {
          currentOrgInfo.orgConfig = JSON.parse(currentOrgInfo.orgConfig);
          currentOrgInfo.studentOrTeacher = currentOrgInfo.orgConfig.studentOrTeacher;
        }
        
        // v-model双向绑定
        this.$emit('input', this.currentOrgId);
        // 触发change事件，传递完整组织信息
        this.$emit('change', currentOrgInfo);
      },
      
      // 获取所有节点的key（用于全部展开）
      getAllKeys() {
        let keys = [];
        let stack = [...this.orgTree];

        while (stack.length) {
          let item = stack.pop();
          keys.push(item.orgId);

          if (item.children) {
            stack.push(...item.children);
          }
        }
        return keys;
      },
      
      // 切换全部展开/收缩
      toggleOrgTree() {
        this.isAllExpand = !this.isAllExpand;
        if (this.isAllExpand) {
          this.openTree = this.getAllKeys();
        } else {
          this.openTree = [];
        }
      },
      
      // 获取组织树数据
      async getOrgTree() {
        try {
          const result = await window.jianghuAxios({
            data: {
              appData: {
                pageId: 'orgManagement',
                actionId: 'selectOrgTree',
                actionData: {},
                orderBy: [{ column: 'orgSortPath', order: 'asc' }]
              }
            }
          });
          
          let { rows } = result.data.appData.resultData;
          this.orgTree = rows || [];
          
          // 重置表格高度（如果需要）
          this.$nextTick(() => {
            if (window.resetTableMaxHeight) {
              window.resetTableMaxHeight();
            }
          });
        } catch (error) {
          console.error('获取组织树失败:', error);
          window.vtoast.fail('获取组织树失败');
        }
      },
      
      // 设置默认选中的组织
      async setDefaultSelectedOrg() {
        if (!_.isEmpty(this.orgTree)) {
          let orgId = this.orgId || this.value || this.orgTree[0].orgId;
          let orgInfo = this.getTreeItem(this.orgTree, orgId);
          this.currentOrgId = orgId;
          this.currentOrgInfo = orgInfo || {};
          this.debouncedUpdateValue();
        }
      },
      
      // 默认展开所有节点
      async openAllNode() {
        this.openTree = this.getAllKeys();
      },
      
      // 树节点选择变化事件
      async onTreeChange(orgIdArray) {
        if (orgIdArray.length === 0) return;
        
        this.currentOrgId = orgIdArray[0];
        const currentOrgInfo = this.getTreeItem(this.orgTree, orgIdArray[0]);
        this.currentOrgInfo = currentOrgInfo || {};
        this.debouncedUpdateValue();
      },
      
      /**
       * 在树形数据中查找指定orgId的节点
       * @param {Array} data 树形数据
       * @param {String|Number} orgId 组织ID
       * @returns {Object|null} 找到的节点对象
       */
      getTreeItem(data, orgId) {
        let result = null;
        
        function getTreeItemInner(data) {
          data.forEach((item) => {
            if (item.orgId === orgId) {
              result = item;
            } else if (item.children && item.children.length) {
              getTreeItemInner(item.children);
            }
          });
          return result;
        }
        
        return getTreeItemInner(data);
      }
    }
  },
  
  style: `
    /* 自定义树组件样式 */
    .v-treeview-node__root {
      min-height: 32px;
    }
    
    .v-treeview-node__content {
      cursor: pointer;
    }
    
    .v-treeview-node--active > .v-treeview-node__root > .v-treeview-node__content {
      background-color: rgba(25, 118, 210, 0.12);
    }
  `
};

module.exports = content;
```

### 树组件配置要点

#### 🔑 树组件基础配置
- **pageType**: 设置为 `"jh-component"` 表示这是一个组件
- **pageId**: 使用父页面的 pageId，保持一致性
- **componentPath**: 组件路径，如 `'orgTree'`
- **pageContent**: 使用HTML模板定义树组件UI结构

#### 🔑 Props配置和v-model支持
```javascript
props: {
  'value': {
    type: [String, Number],
    default: ''
  }, // v-model绑定值
  'currentOrgId': {
    type: [String, Number], 
    default: ''
  }, // 当前选中ID
  'showExpandAll': {
    type: Boolean,
    default: true
  } // 是否显示展开/收缩按钮
}
```

#### 🔑 v-treeview核心配置
```javascript
// 树组件属性
:active="[currentOrgId]"           // 当前激活节点
@update:active="onTreeChange"      // 节点选择事件
:open="openTree"                   // 展开的节点数组
:items="filterOrgItems"            // 树形数据
item-key="orgId"                   // 节点唯一标识字段
item-text="orgName"                // 节点显示文本字段
```

#### 🔑 自定义插槽
```javascript
// 自定义节点标签
<template v-slot:label="{ item, open }">
  <span :class="{'grey--text': item.orgStatus == 'closed'}">
    {{ item.orgName }}{{item.orgStatus == 'active'? '': '（已关闭）'}}
  </span>
</template>

// 自定义节点图标
<template v-slot:prepend="{ item, open }">
  <v-icon size="20" v-if="item.orgType == '组织'">mdi-family-tree</v-icon>
</template>

// 开放插槽给父组件
<template v-slot:append="{ item, open }">
  <slot name="append" v-bind:item="item" v-bind:open="open" />
</template>
```

#### 🔑 搜索和过滤功能
- **搜索框**: 实时过滤树节点
- **filterOrgItems计算属性**: 根据搜索条件递归过滤树数据
- **自动展开**: 搜索时自动展开匹配节点的父级

#### 🔑 事件通信机制
```javascript
// v-model双向绑定
this.$emit('input', this.currentOrgId);

// 触发change事件，传递完整信息
this.$emit('change', currentOrgInfo);
```

#### 🔑 父组件使用示例
```javascript
// 在父页面中使用
<org-tree 
  v-model="selectedOrgId" 
  @change="handleOrgChange"
  :showExpandAll="true">
  
  <!-- 使用append插槽添加自定义操作 -->
  <template v-slot:append="{ item }">
    <v-btn @click="editOrg(item)" small icon>
      <v-icon size="16">mdi-pencil</v-icon>
    </v-btn>
  </template>
</org-tree>
```

#### 🔑 树组件特点
- **层级展示**: 清晰展示多层级数据结构
- **交互丰富**: 支持展开/收缩、选择、搜索等操作
- **可定制**: 支持自定义图标、标签、操作按钮
- **数据绑定**: 支持v-model双向绑定
- **事件通信**: 完善的父子组件通信机制
- **搜索过滤**: 内置搜索功能，支持递归过滤

## 工作流程

1. **检查** → 确认是否存在对应的 init-json 配置文件
2. **判断** → 根据配置文件存在与否选择开发方式
3. **开发** → 按规则修改配置文件或HTML文件
4. **生成** → 如修改了配置文件，运行生成命令更新HTML

## 常见任务和示例

### 1. 新增页面功能

**任务**: 在现有页面添加新按钮和功能

```javascript
// 在 headContent 中添加按钮
headContent: [
  { tag: 'jh-page-title', value: "页面标题" },
  { tag: 'v-spacer' },
  {
    tag: 'v-btn',
    value: '新功能',
    attrs: {
      color: 'primary',
      '@click': 'doUiAction("customAction")'
    }
  }
],

// 在 common.methods 中实现功能
methods: {
  async customAction() {
    // 实现具体功能
  }
}
```

### 2. 添加数据表格列

**任务**: 在表格中新增一列显示

```javascript
// 修改 pageContent 中的表格配置
{
  tag: 'jh-table',
  headers: [
    { text: "现有列", value: "existingField", width: 120 },
    { text: "新增列", value: "newField", width: 150 }, // 新增这行
    { text: "操作", value: "action", type: "action", width: 120 }
  ]
}
```

### 3. 新增自定义抽屉弹窗

**任务**: 添加自定义抽屉用于特定功能

```javascript
// 在 actionContent 中添加抽屉配置
{
  tag: 'jh-drawer',
  key: "customDrawer",
  title: '自定义功能',
  attrs: { width: '60vw' },
  contentList: [
    {
      tag: 'v-row',
      attrs: { class: "mt-0 px-4" },
      value: `
        <v-col cols="12">
          <!-- 自定义内容 -->
          <v-card>
            <v-card-text>
              功能内容
            </v-card-text>
            <v-card-actions>
              <v-btn @click="confirmAction">确认</v-btn>
              <v-btn @click="isDetailDrawerShown = false">取消</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      `
    }
  ]
}

// 在 common.methods 中添加相关方法
methods: {
  async openDetailDrawer() {
    this.isDetailDrawerShown = true;
  },
  async confirmAction() {
    // 实现确认逻辑
    this.isDetailDrawerShown = false;
  }
}
```

### 4. 添加高级搜索功能

**任务**: 在页面顶部添加多条件搜索

```javascript
// 在 headContent 中添加搜索组件
{
  tag: 'jh-search',
  attrs: { cols: 12, sm: 6, md: 8 },
  value: [
    { 
      tag: "v-text-field", 
      model: "serverSearchWhereLike.name", 
      attrs: { 
        prefix: '姓名：',
        clearable: true
      } 
    },
    { 
      tag: "v-select", 
      model: "serverSearchWhere.status", 
      attrs: { 
        ':items': 'constantObj.statusList',
        prefix: '状态：',
        clearable: true
      } 
    }
  ],
  searchBtn: true
}

// 在 common.data 中初始化搜索数据
data: {
  serverSearchWhereLike: { name: '' },
  serverSearchWhere: { status: '' },
  constantObj: {
    statusList: [
      { text: '全部', value: '' },
      { text: '启用', value: 'active' },
      { text: '禁用', value: 'inactive' }
    ]
  }
}
```

### 5. 导出Excel功能实现

**任务**: 添加数据导出到 Excel 功能

```javascript
// 添加导出按钮
{
  tag: 'v-btn',
  value: '导出Excel',
  attrs: {
    color: 'success',
    '@click': 'exportToExcel'
  },
  quickAttrs: ['outlined', 'small']
}

// 在 includeList 中引入 Excel 库
includeList: [
  { type: 'js', path: '/<$ ctx.app.config.appId $>/public/xlsx/exceljs.min.js' }
]

// 实现导出方法
methods: {
  async exportToExcel() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('数据列表');
    
    // 设置表头
    worksheet.addRow(['姓名', '状态', '创建时间']);
    
    // 添加数据
    this.tableData.forEach(item => {
      worksheet.addRow([item.name, item.status, item.createTime]);
    });
    
    // 生成文件
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer]);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `数据导出_${new Date().getTime()}.xlsx`;
    a.click();
  }
}
```

### 6. 高级表单验证

**任务**: 添加复杂表单字段验证规则

```javascript
// 在抽屉表单中添加验证
{
  tag: 'jh-create-drawer',
  key: "create",
  contentList: [{
    label: "新增表单",
    type: "form",
    formItemList: [
      { 
        label: "必填字段<span class='red--text ml-1'>*</span>", 
        model: "requiredField", 
        tag: "v-text-field", 
        rules: "validationRules.requireRules" 
      },
      { 
        label: "邮箱", 
        model: "email", 
        tag: "v-text-field", 
        rules: "validationRules.emailRules" 
      },
      { 
        label: "手机号", 
        model: "phone", 
        tag: "v-text-field", 
        rules: "validationRules.phoneRules" 
      }
    ]
  }]
}

// 在 common.data 中定义验证规则
data: {
  validationRules: {
    requireRules: [v => !!v || '此字段为必填项'],
    emailRules: [
      v => !!v || '邮箱为必填项',
      v => /.+@.+\..+/.test(v) || '邮箱格式不正确'
    ],
    phoneRules: [
      v => !!v || '手机号为必填项',
      v => /^1[3-9]\d{9}$/.test(v) || '手机号格式不正确'
    ]
  }
}
```

### 7. 条件渲染和权限控制

**任务**: 根据条件显示不同内容

```javascript
// 使用 v-if 条件渲染
value: `
  <v-col cols="12">
    <div v-if="currentUser.role === 'admin'">
      <!-- 管理员专用内容 -->
      <v-btn @click="adminAction">管理员操作</v-btn>
    </div>
    <div v-else>
      <!-- 普通用户内容 -->
      <span>普通用户界面</span>
    </div>
  </v-col>
`

// 在计算属性中处理复杂逻辑
computed: {
  canEdit() {
    return this.currentUser.role === 'admin' || 
           this.currentUser.id === this.editItem.userId;
  }
}
```

### 8. 数据统计卡片

**任务**: 添加数据统计卡片显示

```javascript
// 统计卡片配置
{
  tag: 'v-row',
  value: `
    <v-col cols="6" md="3" v-for="stat in statistics" :key="stat.title">
      <v-card>
        <v-card-text class="text-center">
          <div class="text-h4" :class="stat.color + '--text'">{{ stat.value }}</div>
          <div class="text-caption">{{ stat.title }}</div>
        </v-card-text>
      </v-card>
    </v-col>
  `
}

// 在 data 中定义统计数据
data: {
  statistics: [
    { title: '总数量', value: 0, color: 'primary' },
    { title: '本月新增', value: 0, color: 'success' },
    { title: '待处理', value: 0, color: 'warning' },
    { title: '已完成', value: 0, color: 'info' }
  ],
  
  // 🔥 表单分组数据示例
  detailInfoItems: [
    { title: '创建时间', value: '2024-01-01' },
    { title: '更新时间', value: '2024-01-02' },
    { title: '状态', value: '启用' },
    { title: '操作人', value: '管理员' }
  ]
}

// 在方法中计算统计
methods: {
  calculateStatistics() {
    this.statistics[0].value = this.tableData.length;
    this.statistics[1].value = this.tableData.filter(item => 
      new Date(item.createTime).getMonth() === new Date().getMonth()
    ).length;
    // 其他统计逻辑...
  }
}
```

### 9. 文件上传功能

**任务**: 添加文件上传组件

```javascript
// 在表单中添加文件上传
{
  label: "上传文件",
  tag: "jh-file-input",
  attrs: {
    vModel: "formItem['attachment']",
    accept: "image/*,.pdf,.doc,.docx",
    showSize: true
  }
}

// 处理文件上传
methods: {
  async handleFileUpload(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await window.jianghuAxios({
        url: '/api/upload',
        method: 'POST',
        data: formData
      });
      return response.data.filePath;
    } catch (error) {
      window.vtoast.fail('文件上传失败');
      throw error;
    }
  }
}
```

### 10. 表单字段分组配置

**任务**: 使用分组标题组织表单字段，提升用户体验

```javascript
// 在抽屉表单中添加分组配置
{
  tag: 'jh-drawer',
  key: "detail",
  title: '详情查看',
  contentList: [
    {
      type: "form",
      formItemList: [
        // 🔥 分组标题
        { tag: 'span', value: '课程信息', md: 12, attrs: {class: 'title pl-2'}},
        
        // 🔥 分组内容 - 使用 HTML 布局
        { tag: 'div', md: 12, value: [/*html*/ `
          <div class="grey lighten-5">
            <v-row class="ma-0 pa-2">
              <v-col cols="12" md="3" v-for="(item, index) in courseInfoItems" :key="index">
                <span>{{item.title}}：{{item.value}}</span>
              </v-col>
            </v-row>
          </div>
          `]
        },
        
        // 另一个分组
        { tag: 'span', value: '学员信息', md: 12, attrs: {class: 'title pl-2'}},
        { tag: 'div', md: 12, value: [/*html*/ `
          <div class="grey lighten-5">
            <v-row class="ma-0 pa-2">
              <v-col cols="12" md="4" v-for="(item, index) in studentInfoItems" :key="index">
                <span class="d-block mb-1">{{item.title}}：{{item.value}}</span>
              </v-col>
            </v-row>
          </div>
          `]
        }
      ]
    }
  ]
}

// 在 common.data 中定义分组数据
data: {
  courseInfoItems: [
    { title: '课程名称', value: 'JavaScript 基础' },
    { title: '课程类型', value: '在线课程' },
    { title: '课程时长', value: '40小时' },
    { title: '开课时间', value: '2024-01-15' }
  ],
  studentInfoItems: [
    { title: '学员姓名', value: '张三' },
    { title: '学员年龄', value: '25岁' },
    { title: '联系方式', value: '138****8888' },
    { title: '注册时间', value: '2024-01-01' }
  ]
}
```

### 11. 移动端适配

**任务**: 优化移动端显示效果

```javascript
// 响应式列配置
headers: [
  { text: "姓名", value: "name", width: 120 },
  { 
    text: "详情", 
    value: "detail", 
    width: 'window.innerWidth < 500 ? 200 : 300'  // 响应式宽度
  },
  { 
    text: "操作", 
    value: "action", 
    type: "action", 
    width: 'window.innerWidth < 500 ? 80 : 180'   // 移动端简化操作
  }
]

// 移动端隐藏某些列
computed: {
  isMobile() {
    return window.innerWidth < 768;
  }
}

// 条件显示内容
value: `
  <v-col v-if="!isMobile" cols="4">
    <!-- 桌面端显示的内容 -->
  </v-col>
  <v-col cols="12" sm="6">
    <!-- 响应式内容 -->
  </v-col>
`
```

## API开发规范

### API开发决策流程

当配置 `resourceList` 时，需要判断是否需要开发对应的后端接口：

#### 1. 简单数据操作 (使用 resourceType: "sql")

**适用场景**：标准的增删改查操作，无复杂业务逻辑

```javascript
// 前端配置
resourceList: [
  {
    actionId: "selectUserList",
    resourceType: "sql",
    desc: "✅查询用户列表",
    resourceData: {
      table: "user",
      operation: "select"
    }
  },
  {
    actionId: "insertUser", 
    resourceType: "sql",
    desc: "✅新增用户",
    resourceData: {
      table: "user",
      operation: "insert"
    }
  }
]
```

**后端配置**：在数据库 `_resource` 表中添加资源配置
```sql
-- 需要在数据库中添加对应资源记录
INSERT INTO _resource (pageId, actionId, resourceType, resourceData, desc) VALUES
('userManagement', 'selectUserList', 'sql', '{"table": "user", "operation": "select"}', '✅查询用户列表'),
('userManagement', 'insertUser', 'sql', '{"table": "user", "operation": "insert"}', '✅新增用户');
```

#### 2. 复杂业务逻辑 (使用 resourceType: "service")

**适用场景**：需要复杂数据处理、业务验证、第三方API调用等

```javascript
// 前端配置
resourceList: [
  {
    actionId: "exportUserData",
    resourceType: "service",
    desc: "✅导出用户数据",
    resourceData: {
      service: "user",
      serviceFunction: "exportUserData"
    }
  }
]
```

**后端开发**：需要开发对应的 Service 类

```javascript
// app/service/user.js
class UserService extends Service {
  async exportUserData() {
    const { jianghuKnex } = this.app;
    const { actionData, whereLike, where, orderBy } = this.ctx.request.body.appData;
    
    // 1. 查询数据
    let query = jianghuKnex('user').select('*');
    
    if (where) {
      query = query.where(where);
    }
    
    if (whereLike) {
      Object.keys(whereLike).forEach(key => {
        if (whereLike[key]) {
          query = query.where(key, 'like', `%${whereLike[key]}%`);
        }
      });
    }
    
    const userData = await query;
    
    // 2. 数据处理和Excel生成
    const ExcelJS = require('exceljs');
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('用户数据');
    
    // 设置表头和数据
    worksheet.columns = [
      { header: '姓名', key: '姓名', width: 15 },
      { header: '邮箱', key: '邮箱', width: 25 }
    ];
    
    userData.forEach(user => {
      worksheet.addRow({
        姓名: user.username,
        邮箱: user.email
      });
    });
    
    const buffer = await workbook.xlsx.writeBuffer();
    
    return {
      resultData: {
        fileName: `用户数据导出_${new Date().toISOString().slice(0, 10)}.xlsx`,
        fileBuffer: buffer.toString('base64'),
        fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }
    };
  }
}
```

### Service开发最佳实践

#### 1. Service文件结构
```javascript
'use strict';
const Service = require('egg').Service;
const _ = require("lodash");
const dayjs = require('dayjs');
const { BizError, errorInfoEnum } = require('../constant/error');
const validateUtil = require('@jianghujs/jianghu/app/common/validateUtil');

class UserService extends Service {
  // Service方法实现
}

module.exports = UserService;
```

#### 2. 数据验证规范
```javascript
// 定义验证规则
const actionDataSchema = Object.freeze({
  insertUser: {
    type: 'object',
    additionalProperties: true,
    required: ['username', 'email'],
    properties: {
      username: { type: 'string', minLength: 3 },
      email: { type: 'string', format: 'email' },
      phone: { type: 'string', pattern: '^1[3-9]\\d{9}$' }
    }
  }
});

// 在Service方法中使用验证
async insertUser() {
  const { jianghuKnex } = this.app;
  const { actionData } = this.ctx.request.body.appData;
  
  // 参数验证
  validateUtil.validate(actionDataSchema.insertUser, actionData);
  
  // 执行插入
  const result = await jianghuKnex('user', this.ctx).insert(actionData);
  return { resultData: result };
}
```

#### 3. jianghuKnex vs knex 使用规范

**jianghuKnex 特性**：
- 自动填充操作信息（operationByUserId、operationByUser、operationAt）
- 自动记录操作历史到 `_record_history` 表

```javascript
// 使用jianghuKnex（推荐用于CRUD操作）
async insertItem() {
  const { jianghuKnex } = this.app;
  const { actionData } = this.ctx.request.body.appData;
  
  // 自动记录操作者信息和操作历史
  const result = await jianghuKnex('user', this.ctx).insert(actionData);
  return { resultData: result };
}

// 使用knex（用于复杂查询）
async selectFilteredItemList() {
  const { knex } = this.app;
  const { where, whereLike } = this.ctx.request.body.appData;
  
  let query = knex('view01_user_list').select();
  
  // 构建复杂查询条件
  if (where) {
    query = query.where(where);
  }
  
  const rows = await query;
  return { resultData: rows };
}
```

#### 4. 事务处理规范
```javascript
async createUserWithProfile() {
  const { jianghuKnex } = this.app;
  const { actionData } = this.ctx.request.body.appData;
  const { userData, profileData } = actionData;
  
  await jianghuKnex.transaction(async (trx) => {
    // 创建用户
    const userResult = await trx('user', this.ctx).insert(userData);
    const userId = userResult[0];
    
    // 创建用户资料
    await trx('user_profile', this.ctx).insert({
      ...profileData,
      userId: userId
    });
  });
  
  return { resultData: { success: true } };
}
```

## jianghu-init工具详解

### 安装和更新
```bash
# 卸载旧版本并安装最新版本
npm uninstall -g @jianghujs/jianghu-init
npm install -g @jianghujs/jianghu-init@latest

# 查看版本
jianghu-init -v

# 查看命令帮助
jianghu-init -h
```

### JSON配置相关命令

#### 生成参考示例
```bash
# 在jianghuJS项目目录中生成example_class和example_student数据表及配置文件
jianghu-init json --generateType=example
```

#### 根据数据表生成配置文件
```bash
# 根据数据表生成页面配置文件
jianghu-init json --generateType=json --pageType=jh-page --table=class --pageId=classManagement

# 参数说明
# --generateType: json (数据表生成配置文件)
# --pageType: jh-page (页面类型) 或 jh-component (组件类型)
# --table: 数据表名
# --pageId: 页面ID
```

#### 配置文件生成页面
```bash
# 根据配置文件生成页面
jianghu-init json --generateType=page --pageType=page --file=classManagement

# 参数说明
# --generateType: page (配置文件生成页面)
# --pageType: page 或 component
# --file: 配置文件名（不含扩展名）
```

#### 开发模式
```bash
# 开启dev模式（自动检测配置文件变更并更新页面）
jianghu-init json dev
```

## 版本特性详解

### v3版本新特性 (推荐使用)

#### 🔥 核心改进
- **组件内data配置**: 将需要设置在 `common.data` 的变量直接放入标签内，方便组件变量管理

#### 🆕 新增组件

**1. jh-order (移动端排序组件)**
```javascript
{
  tag: 'jh-order',
  data: {
    tableDataOrder: [ { column: "createAt", order: "desc" } ],
    tableDataOrderList: [
      { text: "创建时间↓", value: [ { column: "createAt", order: "desc" } ] },
      { text: "更新时间↓", value: [ { column: "operationAt", order: "desc" } ] },
    ],
  }
}
```

**2. jh-search (服务端搜索增强)**
```javascript
{
  tag: 'jh-search', 
  searchList: [
    { tag: 'v-select', model: "serverSearchWhere.status", attrs: { prefix: '状态：', ':items': 'constantObj.statusList' } },
    { tag: 'v-text-field', model: "serverSearchWhereLike.name", attrs: { label: '名称:' }, quickAttrs: ['clearable'] },
  ],
  data: {
    serverSearchWhereLike: { name: '' },
    serverSearchWhere: { status: '' },
  }
}
```

**3. jh-mode (模式切换组件)**
```javascript
{ tag: 'jh-mode', data: { viewMode: 'simple' } }
```

**4. jh-scene (场景搜索组件)**
```javascript
{
  tag: 'jh-scene',
  attrs: { ':showActionBtn': false, ':mobile': false },
  data: {
    sceneCreateForm: {},
    serverSceneSearchWhere: {},
    serverSceneSearchWhereIn: {},
    serverSceneSearchWhereLike: {}, 
    currentSceneId: '公开',
    defaultSceneList: [
      { name: "全部", where: {}, whereIn: { "status": ["active", "inactive"] } },
      { name: "启用", where: { "status": "active"}, whereIn: {} },
      { name: "禁用", where: { "status": "inactive"}, whereIn: {} },
    ],
    maxSceneDisplay: 5,
  }
}
```

## jianghu-init渲染限制和解决方案

### 🚨 关键约束和最佳实践

#### 1. 严格按文档示例配置
⚠️ **重要原则**：
- **只使用文档中明确说明的配置** - 避免扩散使用未在文档中提及的配置
- **未说明的配置可能不支持** - jianghu-init工具对配置的支持是有限的
- **严格参考标准模板** - 使用本文档提供的标准配置模板作为基础
- **避免过度自定义** - 复杂配置容易导致渲染失败

#### 2. 生成后必须验证页面
⚠️ **验证流程**：
```bash
# 生成页面后的必要检查步骤
jianghu-init json --generateType=page --pageType=page --file=pageName

# 检查生成的HTML文件格式是否正确
1. 打开生成的 app/view/page/pageName.html 文件
2. 检查页面结构是否完整
3. 验证Vue组件是否正确渲染
4. 确认没有语法错误或格式问题
5. 在浏览器中检查控制台是否有JavaScript错误

# 如果生成的页面格式不正确，回头检查配置文件
1. 检查 app/view/init-json/page/pageName.js 配置文件
2. 对比文档标准模板，找出不当配置
3. 特别检查页面绑定的值或方法是否存在：
   - 检查所有 v-model、{{ }} 绑定的变量是否在 common.data 中定义
   - 检查所有 @click、:items 等绑定的方法是否在 common.methods 中存在
   - 检查所有 computed、watch 引用的变量是否正确
   - 验证 doUiAction 调用的方法是否存在对应实现
4. 修正配置后重新生成页面
5. 重复验证直到页面格式完全正确
```

#### 3. 渲染限制和解决方案
- **嵌套配置限制**: jianghu-init暂时不支持复杂的嵌套配置渲染
- **复杂组件约束**: 某些复杂的UI组件配置可能无法通过纯配置实现

### 🛠️ 解决方案
1. **直接HTML代码**: 对于复杂UI，可以直接在配置的`value`字段中写HTML代码
2. **混合开发模式**: 配置项与原生HTML代码可以在同一文件中混合使用  
3. **script标签规范**: `<script>`标签内的代码必须严格按照jianghuJS规范编写

### 📝 实践示例
```javascript
// 复杂UI直接写HTML
{
  tag: 'v-row',
  value: `
    <v-col cols="12">
      <!-- 复杂的表单布局直接写HTML -->
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="form.name" label="名称"></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  `
}
```

### 🎯 配置开发检查清单

#### ✅ 配置编写检查
- [ ] 所有配置项都有文档依据
- [ ] 没有使用未在文档中说明的配置
- [ ] 参考标准模板结构
- [ ] 避免过度复杂的嵌套配置
- [ ] 复杂UI使用HTML代码方案

#### ✅ 页面生成验证检查
- [ ] 执行jianghu-init生成命令成功
- [ ] 检查生成的HTML文件存在且完整
- [ ] 验证页面在浏览器中正常显示
- [ ] 确认Vue组件正确渲染
- [ ] 检查控制台无JavaScript错误信息
- [ ] 验证所有页面功能正常工作（按钮点击、表单提交等）

#### ✅ 数据绑定验证检查
- [ ] 所有 `v-model` 绑定的变量都在 `common.data` 中定义
- [ ] 所有 `{{ }}` 模板绑定的变量都存在对应数据
- [ ] 所有 `@click` 绑定的方法都在 `common.methods` 中实现
- [ ] 所有 `:items` 绑定的数组都在 `constantObj` 或 `data` 中定义
- [ ] 所有 `computed` 引用的变量都正确存在
- [ ] 所有 `doUiAction` 调用都有对应的方法实现
- [ ] 所有 `rules` 引用的验证规则都在 `validationRules` 中定义

#### ✅ 问题排查流程
- [ ] 页面格式异常时，优先检查配置文件
- [ ] 对比文档标准配置找出差异
- [ ] 特别检查数据绑定和方法引用的完整性
- [ ] 移除或修正不当配置项
- [ ] 补充缺失的数据定义或方法实现
- [ ] 重新生成并验证页面
- [ ] 记录配置限制以避免重复问题

## 注意事项

- ⚠️ **配置文件优先级高于HTML文件**
- ⚠️ **有配置文件的页面/组件，HTML文件会被自动覆盖**
- ⚠️ **开发过程中要时刻注意配置文件的存在性**
- ⚠️ **所有修改都应先检查配置文件是否存在**
- ⚠️ **配置文件生成的HTML文件不应手动编辑**
- 🔑 **组件导入必须统一使用规范格式**: `{ type: 'html', path: 'component/模块名/组件名.html' }`
- 🔑 **严格遵循组件路径命名规范**: 基础路径 + 模块名 + 组件名
- 🔑 **组件 pageId 必须与父页面保持一致**: 确保资源共享和权限统一
- 💡 **复杂功能建议先在简单环境测试后再集成**
- 💡 **注意响应式设计，确保移动端兼容性**
- 🔧 **简单配置优先**: 能用配置实现的尽量用配置
- 🔧 **复杂UI用HTML**: 配置无法实现的复杂UI直接写HTML代码
- 🔧 **严格规范遵循**: script标签内代码必须符合jianghuJS规范
