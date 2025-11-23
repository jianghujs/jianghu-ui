---
trigger: model_decision
description: 江湖JS前端规范
globs: app/view/component/**/*.html, app/view/page/**/*.html
---

继承JianghuJS通用规范 [jianghu-global.mdc](mdc:.cursor/rules/jianghujs/jianghu-global.mdc)

# 前端开发说明

- 使用doUiAction方法来链接方法，达到方法复用效果，dom元素调用doUiAction的来使用方法链
- 请求后端接口使用使用window.jianghuAxios，源代码在node_modules\@jianghujs\jianghu\app\view\utility\jianghuJs\jianghuAxiosV4.html
- 表单中正常情况都用v-input字段，选项使用v-autocomplete（items使用constantObj中的值），日期选择使用日期选择器
- 使用window.vtoast来显示提示信息
- 在执行一个动作前如果需要确认，确认的动作独立一个方法，命名为confirmXXXDialog，在方法中使用window.confirmDialog来显示确认框，并添加到doUiAction的方法链中
- 确认弹框方法必须使用统一的格式，采用async/await模式，并在用户取消时抛出标准错误
- 一个方法尽量只做一件事，减少多余的重复代码
- **UI组件选择**：新增、编辑、详情等比较复杂的抽屉优先使用v-drawer，除非明确要求用弹框，或者功能只有一两个输入框才使用v-dialog
- **注释规范**：只写必要的逻辑注释，避免写一眼就能看出来的冗余注释。注释应该解释复杂的业务逻辑、算法思路或非显而易见的实现原因
- 前端的方法需要做好分组，方便理解代码
- 合理拆分组件，一般在做一个复杂的弹框或抽屉时可以单独一个组件，存放到 @app/views/components/ 与页面文件同名的目录中，提高代码可读性
- 列表的请求要确保优先发出去，保证页面的加载速度，其他跟列表无关的异步加载就行
- 样式尽量保持主题色，不要太花
- 数据字典使用constantObj中的值，不要直接在代码中写死，参考 @jianghu-constant-dict.md

# doUiAction 方法链模式核心规范

## 设计理念

doUiAction是江湖JS前端的核心调度机制，遵循**单一职责原则**，通过方法链串联多个独立的方法来完成复杂业务流程。

### 核心原则

1. **单一职责**：每个方法只做一件事，职责清晰明确
2. **见名知意**：通过方法名一眼能看出这个方法是做什么的
3. **链式调用**：通过doUiAction将多个方法串起来，形成清晰的执行流程
4. **可复用性**：独立的方法便于在不同场景下复用

## 方法命名规范

### 动作类型分类

```javascript
// 数据准备类 - prepare前缀
prepareGetOrderList()      // 准备获取订单列表的参数
prepareCreateUser()        // 准备创建用户的数据
prepareUpdateForm()        // 准备更新表单的数据

// 数据获取类 - get前缀
getOrderList()            // 获取订单列表
getUserInfo()             // 获取用户信息
getTableData()            // 获取表格数据

// 表单操作类 - do前缀
doCreateUser()            // 执行创建用户操作
doUpdateOrder()           // 执行更新订单操作
doDeleteItem()            // 执行删除项目操作

// 界面操作类 - ui前缀或动词
openCreateDialog()        // 打开创建对话框
closeEditDialog()         // 关闭编辑对话框
showOrderDetail()         // 显示订单详情
toggleUserStatus()        // 切换用户状态

// 确认操作类 - confirm前缀 + Dialog后缀
confirmCreateDialog()     // 确认创建对话框
confirmDeleteDialog()     // 确认删除对话框
confirmSubmitDialog()     // 确认提交对话框

// 验证类 - validate前缀
validateForm()            // 验证表单
validateUserInput()       // 验证用户输入
validateRequired()        // 验证必填项

// 处理类 - handle前缀
handleTabChange()         // 处理标签页切换
handlePageChange()        // 处理页码变化
handleFileUpload()        // 处理文件上传

// 初始化类 - init前缀
initPageData()            // 初始化页面数据
initFormData()            // 初始化表单数据
initTableOptions()        // 初始化表格配置
```

### 方法命名最佳实践

```javascript
// ✅ 好的命名 - 清晰明确
prepareSearchParams()     // 准备搜索参数
getUserProfile()          // 获取用户档案  
doSubmitForm()           // 执行表单提交
validateEmail()          // 验证邮箱

// ❌ 避免的命名 - 模糊不清
handleData()             // 处理什么数据？
doSomething()           // 做什么事情？
processInfo()           // 处理什么信息？
manageItem()            // 管理什么项目？
```

## doUiAction方法链示例

### 完整的业务流程示例

```javascript
async doUiAction(uiActionId, uiActionData) {
  try {
    switch (uiActionId) {
      case 'createUser':
        await this.validateCreateForm();      // 验证创建表单
        await this.confirmCreateDialog();     // 确认创建
        await this.prepareCreateData();       // 准备创建数据
        await this.doCreateUser();           // 执行创建用户
        await this.showSuccessMessage();     // 显示成功消息
        await this.closeCreateDialog();      // 关闭创建对话框
        await this.refreshUserList();        // 刷新用户列表
        break;
        
      case 'deleteUser':
        await this.validateDeletePermission();  // 验证删除权限
        await this.confirmDeleteDialog();       // 确认删除
        await this.doDeleteUser(uiActionData);  // 执行删除用户
        await this.showSuccessMessage();        // 显示成功消息
        await this.refreshUserList();           // 刷新用户列表
        break;
        
      case 'searchUsers':
        await this.prepareSearchParams();    // 准备搜索参数
        await this.getUserList();            // 获取用户列表
        await this.updateTableDisplay();     // 更新表格显示
        break;
        
      case 'exportUsers':
        await this.validateExportPermission(); // 验证导出权限
        await this.confirmExportDialog();      // 确认导出
        await this.prepareExportData();        // 准备导出数据
        await this.doExportUsers();           // 执行导出用户
        await this.showExportSuccess();       // 显示导出成功
        break;
        
      default:
        console.error('[doUiAction] uiActionId not found', { uiActionId });
        break;
    }
  } catch (error) {
    if (error.message.includes('取消') || error.message.includes('否')) {
      // 用户取消操作，不显示错误
      return;
    }
    console.error('[doUiAction] error', error);
    window.vtoast.fail(error.message || '操作失败');
  }
}
```

### 独立方法实现示例

```javascript
// ============ 验证类方法 ============
async validateCreateForm() {
  if (!this.createFormData.name) {
    throw new Error('用户名不能为空');
  }
  if (!this.createFormData.email) {
    throw new Error('邮箱不能为空');
  }
  if (!this.validateEmail(this.createFormData.email)) {
    throw new Error('邮箱格式不正确');
  }
},

async validateDeletePermission() {
  if (this.selectedUser.role === 'admin' && this.userInfo.role !== 'superAdmin') {
    throw new Error('无权限删除管理员用户');
  }
},

// ============ 数据准备类方法 ============
async prepareCreateData() {
  this.createActionData = {
    name: this.createFormData.name.trim(),
    email: this.createFormData.email.trim(),
    role: this.createFormData.role,
    createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    createUserId: this.userInfo.userId
  };
},

async prepareSearchParams() {
  this.searchActionData = {
    keyword: this.searchKeyword?.trim(),
    role: this.selectedRole !== '全部' ? this.selectedRole : undefined,
    status: this.selectedStatus !== '全部' ? this.selectedStatus : undefined,
    dateRange: this.dateRange
  };
},

// ============ 数据操作类方法 ============
async doCreateUser() {
  const result = await window.jianghuAxios({
    data: {
      appData: {
        pageId: 'userManagement',
        actionId: 'insertUser',
        actionData: this.createActionData
      }
    }
  });
  
  if (result.data.appData.resultData.rows.length === 0) {
    throw new Error('创建用户失败');
  }
  
  this.newUserId = result.data.appData.resultData.rows[0].id;
},

async doDeleteUser(userData) {
  await window.jianghuAxios({
    data: {
      appData: {
        pageId: 'userManagement', 
        actionId: 'deleteUser',
        actionData: { userId: userData.userId }
      }
    }
  });
},

// ============ 界面操作类方法 ============
async showSuccessMessage() {
  window.vtoast.success('操作成功');
},

async closeCreateDialog() {
  this.isCreateDialogVisible = false;
  this.createFormData = { name: '', email: '', role: 'user' };
},

async refreshUserList() {
  await this.doUiAction('searchUsers');
},

// ============ 确认对话框方法 ============
async confirmCreateDialog() {
  if (await window.confirmDialog({
    title: "创建用户", 
    content: `确定创建用户"${this.createFormData.name}"吗？`
  }) === false) {
    throw new Error("[confirmCreateDialog] 取消");
  }
},

async confirmDeleteDialog() {
  if (await window.confirmDialog({
    title: "删除用户",
    content: `确定删除用户"${this.selectedUser.name}"吗？此操作不可恢复。`
  }) === false) {
    throw new Error("[confirmDeleteDialog] 取消");
  }
}
```

## 方法分组和组织规范

```javascript
methods: {
  // >>>>>>>>>>>>>>> doUiAction 调度中心 >>>>>>>>>>>>>>>
  async doUiAction(uiActionId, uiActionData) {
    // 统一的调度逻辑
  },

  // >>>>>>>>>>>>>>> 数据验证类 >>>>>>>>>>>>>>>
  async validateCreateForm() { },
  async validateUpdateForm() { },
  async validateDeletePermission() { },
  
  // >>>>>>>>>>>>>>> 数据准备类 >>>>>>>>>>>>>>>
  async prepareCreateData() { },
  async prepareUpdateData() { },
  async prepareSearchParams() { },
  
  // >>>>>>>>>>>>>>> 数据获取类 >>>>>>>>>>>>>>>
  async getUserList() { },
  async getUserDetail() { },
  async getTableData() { },
  
  // >>>>>>>>>>>>>>> 数据操作类 >>>>>>>>>>>>>>>  
  async doCreateUser() { },
  async doUpdateUser() { },
  async doDeleteUser() { },
  
  // >>>>>>>>>>>>>>> 界面控制类 >>>>>>>>>>>>>>>
  async openCreateDialog() { },
  async closeCreateDialog() { },
  async showUserDetail() { },
  
  // >>>>>>>>>>>>>>> 确认对话框类 >>>>>>>>>>>>>>>
  async confirmCreateDialog() { },
  async confirmUpdateDialog() { },
  async confirmDeleteDialog() { },
  
  // >>>>>>>>>>>>>>> 工具辅助类 >>>>>>>>>>>>>>>
  validateEmail(email) { },
  formatDate(date) { },
  resetForm() { }
}
```

# 示例

## 请求参数准备规范

### 数据请求的单一职责示例

将数据请求流程拆分为独立的方法，每个方法职责明确：

```js
// data中定义请求参数存储属性
data() {
  return {
    orderListActionData: {},  // 存储请求参数
    orderList: []
  };
},

methods: {
  async doUiAction(uiActionId, uiActionData) {
    switch (uiActionId) {
      case 'getOrderList':
        await this.prepareOrderListParams();  // 准备订单列表参数
        await this.fetchOrderList();          // 获取订单列表
        await this.processOrderListData();    // 处理订单列表数据
        break;
      case 'onTabChange':
        await this.handleTabChange(uiActionData);  // 处理标签页切换
        await this.doUiAction('getOrderList');     // 重新获取列表
        break;
      default:
        console.error('[doUiAction] uiActionId not find', { uiActionId });
        break;
    }
  },
  
  // 准备订单列表查询参数
  async prepareOrderListParams() {
    this.orderListActionData = {
      userId: this.userInfo.userId,
      pageSize: this.pageSize,
      currentPage: this.currentPage
    };
    
    // 根据选中的tab添加筛选条件
    if (this.orderTab && this.orderTab !== '全部') {
      this.orderListActionData.orderStatus = this.orderTab;
    }
    
    // 添加搜索关键词
    if (this.searchKeyword) {
      this.orderListActionData.keyword = this.searchKeyword.trim();
    }
  },
  
  // 获取订单列表数据
  async fetchOrderList() {
    const result = await window.jianghuAxios({
      data: {
        appData: {
          pageId: "orders",
          actionId: "selectOrderList",
          where: this.orderListActionData
        }
      }
    });
    
    this.rawOrderList = result.data.appData.resultData.rows;
    this.totalCount = result.data.appData.resultData.count;
  },
  
  // 处理订单列表数据
  async processOrderListData() {
    this.orderList = this.rawOrderList.map(order => ({
      ...order,
      statusText: this.getOrderStatusText(order.status),
      createTimeFormatted: this.formatDateTime(order.createTime),
      amountFormatted: this.formatCurrency(order.amount)
    }));
  },
  
  // 处理标签页切换
  async handleTabChange(tabData) {
    this.orderTab = tabData.tab;
    this.currentPage = 1;  // 重置页码
  }
}
```

### 模板事件绑定规范

在模板中，事件应该直接调用doUiAction，而不是直接调用具体方法：

```html
<!-- ✅ 正确的写法 - 通过doUiAction调度 -->
<v-tabs @change="doUiAction('handleTabChange', $event)" />
<v-btn @click="doUiAction('createUser')">创建用户</v-btn>
<v-btn @click="doUiAction('deleteUser', selectedUser)">删除用户</v-btn>

<!-- ❌ 错误的写法 - 直接调用方法 -->
<v-tabs @change="handleTabChange" />
<v-btn @click="createUser">创建用户</v-btn>
<v-btn @click="deleteUser">删除用户</v-btn>
```

### 方法命名规范总结

| 功能类型 | 命名格式 | 示例 | 说明 |
|---------|---------|------|------|
| 数据准备 | `prepare[Business][Action]` | `prepareOrderListParams()` | 准备业务数据或参数 |
| 数据获取 | `fetch[Business]` / `get[Business]` | `fetchOrderList()` | 从服务端获取数据 |
| 数据处理 | `process[Business]Data` | `processOrderListData()` | 处理、转换数据格式 |
| 业务操作 | `do[Business][Action]` | `doCreateUser()` | 执行具体的业务操作 |
| 界面控制 | `open/close/show/hide[UI]` | `openCreateDialog()` | 控制界面元素显示隐藏 |
| 事件处理 | `handle[Event][Target]` | `handleTabChange()` | 处理用户交互事件 |
| 数据验证 | `validate[Target]` | `validateUserForm()` | 验证数据合法性 |
| 确认对话框 | `confirm[Action]Dialog` | `confirmDeleteDialog()` | 用户确认操作 |

### 实际应用示例对比

```javascript
// ❌ 不规范的命名 - 职责不清
async getUserData() {
  // 既准备参数，又发请求，又处理数据
  const params = { userId: this.selectedUser.id };
  const result = await window.jianghuAxios({...});
  this.userList = result.data.rows.map(user => ({
    ...user,
    statusText: this.getStatusText(user.status)
  }));
}

// ✅ 规范的命名 - 职责明确
async doUiAction(uiActionId) {
  switch (uiActionId) {
    case 'loadUserData':
      await this.prepareUserParams();    // 准备参数
      await this.fetchUserList();        // 获取数据  
      await this.processUserData();      // 处理数据
      break;
  }
}

async prepareUserParams() {
  this.userQueryParams = {
    userId: this.selectedUser.id,
    includeDeleted: false
  };
}

async fetchUserList() {
  const result = await window.jianghuAxios({
    data: { appData: { ...this.userQueryParams } }
  });
  this.rawUserList = result.data.appData.resultData.rows;
}

async processUserData() {
  this.userList = this.rawUserList.map(user => ({
    ...user,
    statusText: this.getStatusText(user.status),
    lastLoginFormatted: this.formatDate(user.lastLoginTime)
  }));
}
```


## 标准请求方法示例

```js

// 获取表格数据
async getTableData() {
  this.isTableLoading = true;

  const result = await window.jianghuAxios({
    data: {
      appData: {
        pageId: 'connectionManagement',
        actionId: "selectItemList",
        actionData: {},
        ...this.tableParams
      }
    }
  });
  const { rows, count } = result.data.appData.resultData;
  
  this.tableDataFromBackend = rows;
  this.isTableLoading = false;
},
```

## 使用window.vtoast来显示提示信息

```js
window.vtoast.success('操作成功');
window.vtoast.fall('操作失败');
window.vtoast.loading('正在加载...');
```


## 确认弹框方法标准格式

所有确认弹框方法必须遵循以下标准格式：

```js
async confirmCreateItemDialog() {
  if (await window.confirmDialog({title: "新增", content: "确定新增吗？"}) === false) {
    throw new Error("[confirmCreateItemDialog] 否");
  }
},

async confirmUpdateItemDialog() {
  if (await window.confirmDialog({title: "修改", content: "确定修改吗？"}) === false) {
    throw new Error("[confirmUpdateItemDialog] 否");
  }
},

async confirmDeleteItemDialog() {
  if (await window.confirmDialog({title: "删除", content: "确定删除吗？"}) === false) {
    throw new Error("[confirmDeleteItemDialog] 否");
  }
},
```

### 复杂确认弹框示例

```js
async confirmInitSyncConfigDialog(item) {
  if (await window.confirmDialog({ title: `初始化`, content: `<div class="leading-4">
      <div>确认要初始化同步任务<span class="red--text">【${item.syncConfigName}】</span>吗？</div>
      <div>1. 初始化可能需要修改目标表(${item.targetTable})的结构，</div>
      <div>2. 确保存在对应的同步字段</div>
      <div>3. 当同步类型为tragger时源表会添加触发器配置</div>
      <div>4. 可能需要对双方的表做一些初始化的配置</div>
      <div class="mt-2 red--text">该操作存在风险，请确保自标表做好备份后再执行</div>
    </div>` }) === false) {
    throw new Error("[confirmInitSyncConfigDialog] 否");
  }
},
```

### 命名规范

- 方法名必须以 `confirm` 开头，以 `Dialog` 结尾
- 错误信息中的方法名必须与实际方法名一致
- 例如：`confirmCreateItemDialog`、`confirmDeleteItemDialog`、`confirmTransferVehicleDialog` 等

## 方法分组示例
```js
// >>>>>>>>>>>>> 新增弹框 >>>>>>>>>>>>>
async prepareCreateFormData() {
  // 准备创建表单数据
},

async doCreateItem() {
  // 创建表单数据
},

// <<<<<<<<<<<<< 列表相关 <<<<<<<<<<<<<
async getTableData() {
  // 获取表格数据
},
```

## 拆分的弹框组件

复杂的弹框建议拆分为独立组件，存放到 `@app/views/components/` 与页面同名的目录中，提高代码可读性和维护性。

## 表单分组标题样式参考
```html
<v-col cols="12">
  <div class="title pl-2">
    分组标题
  </div>
</v-col>
```

# 表格搜索规范

## 概述
表格搜索统一采用后端搜索模式，确保大数据量下的性能和用户体验。所有列表页面都应遵循统一的搜索界面结构和交互规范。

## 搜索界面结构

### 基本搜索区域
```html
<!-- 统一的后端搜索容器 -->
<v-row class="jh-backend-form-container justify-end py-md-3" no-gutters>
  <!-- 常用筛选字段 -->
  <v-col cols="12" sm="4" md="3" xl="2" class="pl-md-2" :cols="12":md="4">
    <v-autocomplete 
      :prefix="filterConfig.fields['status'].label" 
      :items="filterConfig.fields['status'].items()" 
      class="jh-v-input" 
      dense 
      single-line 
      filled 
      v-model="serverSearchWhere.status" 
      @change="tableOptions.page = 1;doUiAction('getTableData')">
    </v-autocomplete>
  </v-col>
  
  <!-- 关键字搜索 -->
  <v-col cols="12" sm="4" md="3" xl="2" class="pl-md-2 pt-2 pt-sm-0" :cols="12":md="4">
    <v-text-field 
      placeholder="请输入搜索关键字" 
      class="jh-v-input" 
      dense 
      single-line 
      filled 
      v-model="keyword" 
      @keyup.enter="tableOptions.page = 1;doUiAction('getTableData')">
      <template v-slot:prepend-inner>
        <!-- 搜索字段选择器 -->
        <v-menu :close-on-content-click="false" transition="scale-transition" offset-y min-width="290">
          <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on" class="text-nowrap pt-1">
              筛选<span class="bg-green-500 text-white ml-0.5 px-1 rounded">{{keywordFieldList.length}}</span>
            </div>
          </template>
          <div class="pa-2 w-[300px]">
            <v-chip 
              v-for="header in headers.filter(e => e.field)" 
              :key="header.value" 
              class="ma-1" 
              :color="keywordFieldList.includes(header.field) ? 'primary' : 'default'" 
              label 
              outlined 
              small 
              @click="keywordFieldList = keywordFieldList.includes(header.field) ? keywordFieldList.filter(field => field !== header.field) : [...keywordFieldList, header.field]">
              {{ header.text }}
            </v-chip>
          </div>
        </v-menu>
      </template>
    </v-text-field>
  </v-col>
  
  <!-- 更多筛选和查询按钮 -->
  <div class="jh-backend-search-btn sm:ml-0 md:ml-2">
    <!-- 更多筛选菜单 -->
    <v-menu v-model="showMoreFilters" :offset-y="true" :close-on-content-click="false" :nudge-width="200" :max-width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn mandatory outlined dense small v-bind="attrs" v-on="on" class="elevation-0 mt-2 mt-sm-0" style="border: 1px solid #e0e0e0">
          <v-icon left>mdi-filter-outline</v-icon>
          更多筛选
          <v-icon right>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-card class="pa-4">
        <v-row>
          <template v-for="fieldName in [...filterConfig.moreFields]">
            <v-col cols="12" sm="6" :key="fieldName">
              <v-autocomplete
                :prefix="filterConfig.fields[fieldName].label"
                :items="filterConfig.fields[fieldName].items()"
                v-model="serverSearchWhere[fieldName]"
                class="jh-v-input"
                dense
                single-line
                filled>
              </v-autocomplete>
            </v-col>
          </template>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="clearMoreFilters">清空</v-btn>
          <v-btn text color="primary" @click="showMoreFilters = false;tableOptions.page = 1;doUiAction('getTableData')">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
    
    <!-- 查询按钮 -->
    <v-btn class="elevation-0 float-right mt-2 ml-2 mt-sm-0" color="success" small @click="tableOptions.page = 1;doUiAction('getTableData')">
      查询
    </v-btn>
  </div>
</v-row>
```

## 数据结构规范

### 必需的数据属性
```javascript
data: () => ({
  // 服务端搜索参数
  serverSearchWhere: {
    // 初始化常用筛选条件，'全部'表示不筛选
    status: '全部'
  },
  serverSearchWhereIn: {},
  serverSearchWhereLike: {},
  
  // 关键字搜索
  keyword: '',
  keywordFieldList: [
    'fieldName1',  // 支持关键字搜索的字段
    'fieldName2'
  ],
  
  // 更多筛选控制
  showMoreFilters: false,
  
  // 分页配置
  tableOptions: {
    page: 1,
    itemsPerPage: 20,
    totalCount: 0,
    sortBy: [],
    sortDesc: [],
  }
}),
```

### 筛选配置（computed属性）
```javascript
computed: {
  filterConfig() {
    return {
      // 常用筛选字段（显示在主搜索区域）
      commonFields: [
        'status'
      ],
      // 更多筛选字段（显示在更多筛选菜单中）
      moreFields: [
        'category',
        'type',
        'region'
      ],
      // 字段配置
      fields: {
        status: {
          label: '状态',
          type: 'select',
          items: () => ['全部', ...this.constantObj.statusList?.map(item => item.text) || []]
        },
        category: {
          label: '分类',
          type: 'select', 
          items: () => ['全部', ...this.constantObj.categoryList?.map(item => item.text) || []]
        }
      }
    };
  }
}
```

## 表格配置规范

### v-data-table配置
```html
<v-data-table
  :headers="headers"
  :items="tableDataComputed"
  :footer-props="{ itemsPerPageOptions: [20, 50, 200, -1], itemsPerPageText: '每页', itemsPerPageAllText: '所有'}"
  :options.sync="tableOptions"
  :server-items-length="tableOptions.totalCount"
  :items-per-page="20"
  mobile-breakpoint="0"
  :loading="isTableLoading"
  checkbox-color="success"
  :class="{'zebraLine': true }"
  fixed-header
  class="jh-fixed-table-height elevation-0 mt-0 mb-xs-4">
</v-data-table>
```

### headers配置
```javascript
headers: [
  { text: "编号", value: "id", field: "id", width: 120, sortable: true },
  { text: "名称", value: "name", field: "name", width: 140, sortable: true },
  { text: "状态", value: "status", field: "status", width: 120, sortable: true },
  // field 属性用于关键字搜索，没有field的列不支持关键字搜索
],
```

## 方法实现规范

### 搜索参数准备
```javascript
async prepareTableParamsDefault() {
  const where = { rowStatus: "正常" };
  const whereLike = {};
  const whereIn = {};
  const serverSearchWhere = { ...this.serverSearchWhere };
  const serverSearchWhereIn = { ...this.serverSearchWhereIn };
  const serverSearchWhereLike = { ...this.serverSearchWhereLike };

  // 处理精确匹配条件
  for (const fieldKey in serverSearchWhere) {
    const fieldValue = serverSearchWhere[fieldKey];
    if (!!fieldValue && fieldValue != '全部') {
      if (_.isString(fieldValue)) {
        where[fieldKey] = fieldValue.trim();
      } else {
        where[fieldKey] = fieldValue;
      }
    }
  }
  
  // 处理模糊匹配条件
  for (const fieldKey in serverSearchWhereLike) {
    const fieldValue = serverSearchWhereLike[fieldKey];
    if (!!fieldValue && fieldValue != '全部') {
      if (_.isString(fieldValue)) {
        whereLike[fieldKey] = '%' + fieldValue.trim() + '%';
      } else {
        whereLike[fieldKey] = '%' + fieldValue + '%';
      }
    }
  }
  
  // 处理数组匹配条件
  for (const fieldKey in serverSearchWhereIn) {
    const fieldValue = serverSearchWhereIn[fieldKey];
    if (!!fieldValue && _.isArray(fieldValue) && fieldValue.length > 0) {
      whereIn[fieldKey] = fieldValue;
    }
  }

  // 处理关键字搜索
  let whereOrOptions = [];
  if (this.keyword) {
    if (!this.keywordFieldList || this.keywordFieldList.length === 0) {
      console.warn('keywordFieldList is empty');
    }
    this.keywordFieldList.forEach(fieldKey => {
      whereOrOptions.push([fieldKey, 'like', '%' + this.keyword.trim() + '%']);
    });
  }
  
  // 处理排序
  let orderBy = [{ column: 'operationAt', order: 'desc' }];
  if (this.tableOptions.sortBy.length) {
    orderBy = this.tableOptions.sortBy.map((item, index) => {
      return {
        column: item,
        order: this.tableOptions.sortDesc[index] ? 'desc' : 'asc'
      }
    });
  }
  
  // 处理分页
  let limit = this.tableOptions.itemsPerPage === -1 ? 10000 : this.tableOptions.itemsPerPage;
  let offset = (this.tableOptions.page - 1) * limit;

  this.tableParams = { where, whereLike, whereIn, limit, offset, orderBy, whereOrOptions };
},
```

### 数据获取方法
```javascript
async getTableData() {
  this.isTableLoading = true;

  const result = await window.jianghuAxios({
    data: {
      appData: {
        pageId: 'pageName',
        actionId: "selectItemList",
        actionData: {},
        ...this.tableParams
      }
    }
  });
  
  const { rows, count } = result.data.appData.resultData;
  this.tableOptions.totalCount = count || rows.length;
  
  this.tableDataFromBackend = rows;
  this.isTableLoading = false;
},
```

### 清空筛选方法
```javascript
async clearMoreFilters() {
  const allFields = [...this.filterConfig.commonFields, ...this.filterConfig.moreFields];
  allFields.forEach(field => {
    this.$set(this.serverSearchWhere, field, '全部');
  });
}
```

## 监听器配置

### 表格选项监听
```javascript
watch: {
  'tableOptions.itemsPerPage'(val) {
    this.tableOptions.page = 1;
    this.doUiAction('getTableData');
  },
  'tableOptions.page'(val) {
    this.doUiAction('getTableData');
  },
  'tableOptions.sortDesc'(val, oldVal) {
    // 初始化会异常调用加载2次，暂时跳过
    if (oldVal.length === 0 && val.length === 0) return;
    this.doUiAction('getTableData');
  },
}
```

## 计算属性规范

### 表格数据计算
```javascript
computed: {
  tableDataComputed() {
    // 后端搜索模式，直接返回表格数据，不做前端过滤
    return this.tableData;
  }
}
```

## 注意事项

1. **字段配置**：headers中必须包含field属性才能支持关键字搜索
2. **初始值**：筛选条件的初始值使用'全部'表示不筛选
3. **分页重置**：筛选条件变化时要重置页码为1
4. **响应式数据**：filterConfig必须放在computed中才能访问this
5. **性能优化**：大数据量时避免前端过滤，全部交给后端处理
6. **用户体验**：支持回车键触发搜索，筛选条件有视觉反馈

## 完整示例

参考 `vehicleManagement.html` 和 `customerManagement copy.html` 的实现，确保所有列表页面都遵循相同的搜索规范。

# 独立弹框组件开发规范

## 使用场景

当配置化抽屉无法满足需求时使用独立弹框组件：
- 复杂的多步骤操作流程
- 复杂的数据关联和联动
- 需要自定义的交互逻辑
- 包含多个子组件的复合界面

## 基本结构

### 文件结构
```html
<!-- componentName.html -->
<script type="text/x-template" id="component-name">
  <v-navigation-drawer v-if="isCurrentDrawerShown" v-model="isCurrentDrawerShown">
    <!-- 组件内容 -->
  </v-navigation-drawer>
</script>

<!-- 引入依赖组件 -->
{% include "component/dependency.html" %}

<script>
Vue.component('component-name', {
  template: '#component-name',
  props: ['propName'],
  data: () => ({
    isCurrentDrawerShown: false,
    // 其他数据
  }),
  methods: {
    // >>>>>>>>>>>>>>> doUiAction 调度中心 >>>>>>>>>>>>>>>
    async doUiAction(uiActionId, uiActionData) {
      try {
        switch (uiActionId) {
          case 'openDrawer':
            await this.prepareCurrentData(uiActionData);
            await this.openCurrentDrawer(uiActionData);
            break;
          case 'closeDrawer':
            await this.closeCurrentDrawer(uiActionData);
            break;
          case 'getTableData':
            await this.getTableData(uiActionData);
            break;
          default:
            console.error('[doUiAction] uiActionId not find', { uiActionId });
            break;
        }
      } catch (error) {
        window.jhMask && window.jhMask.hide();
        throw error;
      } finally {
        window.jhMask && window.jhMask.hide();
      }
    },

    // >>>>>>>>>>>>>>> 抽屉控制类 >>>>>>>>>>>>>>>
    async prepareCurrentData(funObj) {
      this.currentItem = _.cloneDeep(funObj);
      this.currentItemOrigin = _.cloneDeep(funObj);
      
      // 初始化表格数据
      this.tableData = [];
      this.courseInfoItems[0].title = this.orgInfo.orgType + '名称';
      this.courseInfoItems.forEach((item) => {
        item.value = this.orgInfo[item.key];
      });
    },
    
    async openCurrentDrawer() {
      this.isCurrentDrawerShown = true;
    },
    
    async closeCurrentDrawerCheck() {
      await this.closeCurrentDrawer();
    },
    
    async closeCurrentDrawer() {
      this.isCurrentDrawerShown = false;
    }
  }
});
</script>
```

### 页面中使用
```html
<!-- 引入组件 -->
{% include "component/componentName.html" %}

<!-- 使用组件 -->
<component-name
  :propName="propValue"
  @success="handleSuccess"
  ref="componentRef"
></component-name>
```

```javascript
// 页面配置中控制组件
data: {
},
methods: {
  async openComponent() {
    this.$refs.componentRef.doUiAction('openDrawer');
}
```

## 开发规范

### 1. 组件结构
- **模板定义**: 使用 `<script type="text/x-template">`
- **组件命名**: kebab-case格式
- **模板ID**: 唯一的template id

### 2. 数据传递
- **Props**: 接收父组件数据
- **Events**: 通过 `$emit` 向父组件发送事件
- **Refs**: 允许父组件调用子组件方法

### 3. 方法组织
- **doUiAction调度**: 统一操作入口
- **方法分组**: 按功能分组，使用注释分隔
- **错误处理**: 完整的 try-catch 错误处理

