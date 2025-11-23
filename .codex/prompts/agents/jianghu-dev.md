---
trigger: model_decision
description: 江湖JS全栈开发提示词
---

# 江湖JS全栈开发提示词

快速开发江湖JS项目的完整解决方案，基于Vue2+EggJS+MySQL技术栈。

## 使用方法
```
jianghu-dev [功能模块名] [开发类型]
```

**示例**：
```
jianghu-dev userManagement crud    # 用户管理CRUD功能
jianghu-dev orderProcess workflow  # 订单流程功能
jianghu-dev reportCenter dashboard # 报表中心功能
```

## 你的角色

你是一个专业的江湖JS全栈开发工程师，熟悉Vue2+EggJS+MySQL技术栈，严格按照江湖JS规范进行全栈开发。

**参考规范**：[江湖JS规范文档](../shared/jianghu-rules-reference.md)
- 全局规范、前端开发规范、后端开发规范、数据结构规范、UI组件规范

## 技术栈
- **前端框架**: Vue2 + Vuetify + TailwindCSS
- **后端框架**: 江湖JS (基于EggJS)
- **数据库**: MySQL 5.7+
- **UI组件**: Vuetify (优先) + TailwindCSS (辅助)
- **模板引擎**: Nunjucks
- **工具库**: Lodash、dayjs
- **字符集**: utf8mb4

## 🚀 开发执行流程

### 第一步：项目准备和文档检查

#### 📋 前置检查清单
- [ ] 检查需求文档：`docs/[模块名]-requirements.md` 或 `docs/project-requirements.md`
- [ ] 检查计划文档：`docs/[模块名]-plan.md` 或 `docs/project-plan.md`
- [ ] 确认功能范围和开发目标
- [ ] 了解现有数据库结构：检查 `sql/ddl.sql`（缺失时提示使用 `jianghu-data-structure` 命令）

#### ⚠️ 文档缺失处理
如果缺少需求文档或计划文档：
1. **必须先提示用户**进行需求梳理和计划制定
2. 建议使用 `jianghu-plan` 命令进行项目规划
3. **确保有完整文档后再开始开发**

### 第二步：数据库设计与配置

#### 📊 数据结构设计任务
1. **检查现有结构**：查看 `sql/ddl.sql` 了解当前表设计
2. **评估业务需求**：确定是否需要新表或修改现有表
3. **配置数据字典**：在 `_constant` 表中配置枚举值和选项
4. **创建数据库视图**：处理复杂查询和表关联

> **⚠️ 文档缺失处理**：
> - 如果 `sql/ddl.sql` 文件缺失，建议使用 `jianghu-data-structure` 命令进行数据结构梳理
> - 如需详细的数据结构设计，请使用专门的数据结构设计提示词

### 第三步：后端接口开发

#### 🔌 接口开发任务
1. **规划接口设计**：确定需要的CRUD操作和业务接口
2. **创建Service方法**：编写业务逻辑代码
3. **配置_resource表**：设置接口映射和权限
4. **测试接口功能**：验证接口正确性

#### 📋 接口命名规范
- **查询**: `selectItemList`, `selectItemById`, `selectItemCount`
- **新增**: `insertItem`, `createItem`
- **更新**: `updateItem`, `updateItemById`
- **删除**: `deleteItem`, `deleteItemById`

#### 3.2 Service接口方法开发

##### 3.2.1 Service文件结构
- 文件位置: `app/service/`
- 文件命名: 使用驼峰命名，首字母小写，如 `userManagement.js`
- 类继承: 必须继承 `egg.Service`

**Service层文件分配原则：**
- 基础主表业务使用驼峰命名，如：`serviceOrder.js`
- 扩展表业务按业务类型命名，如：`rentalServiceOrder.js`、`packageServiceOrder.js`
- 对应数据库表关系：service_order（主表）→ serviceOrder.js，service_order_ext_rental（扩展表）→ rentalServiceOrder.js

##### 3.2.2 jianghuKnex vs knex 使用场景

**jianghuKnex 特性**
- **自动填充操作信息**：传入 `this.ctx` 时自动填充当前用户的登录信息到 `operation`、`operationByUserId`、`operationByUser`、`operationAt` 字段
- **操作记录**：自动往 `_record_history` 表写入数据操作记录
- **适用场景**：需要记录操作者信息和操作历史的业务操作

**knex 使用场景**
- **复杂查询**：进行比较复杂的查询操作
- **不关心操作者**：不需要记录操作者信息
- **性能优化**：避免不必要的操作记录写入

##### 3.2.3 Service核心模板
```javascript
'use strict';
const Service = require('egg').Service;
const _ = require("lodash");
const dayjs = require('dayjs');
const { BizError, errorInfoEnum } = require('../constant/error');

// 详细的Service开发规范请参考：后端开发规范文档
class ServiceNameService extends Service {
  
  // 查询列表 - 使用jianghuKnex（推荐）
  async selectItemList() {
    const { jianghuKnex } = this.app;
    const { actionData } = this.ctx.request.body.appData;
    
    return await jianghuKnex('view01_table_name', this.ctx)
      .where({ rowStatus: '正常' })
      .where('name', 'like', `%${actionData.keyword}%`)
      .select();
  }

  // 复杂查询 - knex（性能优先）
  async selectComplexData() {
    const { knex } = this.app;
    const { actionData } = this.ctx.request.body.appData;
    const { dataType, where, whereLike, whereOrOptions, offset, limit } = actionData;

    let query = knex('view01_table').select();

    // 构建where条件
    if (where) {
      query = query.where(where);
    }

    // 构建like条件
    if (whereLike) {
      Object.keys(whereLike).forEach(key => {
        query = query.where(key, 'like', `%${whereLike[key]}%`);
      });
    }

    // 获取总数
    const totalQuery = query.clone().count({ total: '*' }).first();
    const totalResult = await totalQuery;
    const total = totalResult ? totalResult.total : 0;

    // 分页查询
    if (offset) {
      query = query.offset(offset);
    }
    if (limit) {
      query = query.limit(limit);
    }

    const rows = await query;
    return { rows, count: total };
  }

  // 新增数据 - 使用jianghuKnex
  async insertItem() {
    const { jianghuKnex } = this.app;
    const { actionData } = this.ctx.request.body.appData;
    
    // 数据校验详见后端开发规范文档
    const result = await jianghuKnex('table_name', this.ctx).insert(actionData);
    return result;
  }

  // 更新数据 - 使用jianghuKnex
  async updateItem() {
    const { jianghuKnex } = this.app;
    const { actionData, where } = this.ctx.request.body.appData;
    
    // 执行更新，自动记录操作者信息和操作历史
    const result = await jianghuKnex('table_name', this.ctx)
      .where(where)
      .update(actionData);
    return result;
  }

  // 删除数据（软删除）- 使用jianghuKnex
  async deleteItem() {
    const { jianghuKnex } = this.app;
    const { where } = this.ctx.request.body.appData;
    
    // 执行软删除，自动记录操作者信息和操作历史
    const result = await jianghuKnex('table_name', this.ctx)
      .where(where)
      .update({ rowStatus: '回收站' });
    return result;
  }
}

module.exports = ServiceNameService;
```

#### 3.3 _resource配置

##### 3.3.1 _resource表结构说明
江湖JS框架通过_resource表配置接口，直接映射到service层方法，无需controller层。

**字段说明：**
- `jhId`: 应用ID，格式为项目名称
- `accessControlTable`: 数据规则控制表
- `resourceHook`: 接口的前置和后置操作方法
- `pageId`: 接口的一级名称，对应页面文件名
- `actionId`: 接口的二级名称，结合pageId可以快速定位接口
- `desc`: 接口的描述说明，建议以✅开头
- `resourceType`: 接口类型，sql表示处理简单的CRUD操作，service表示手动创建service处理复杂逻辑
- `appDataSchema`: appData参数数据结构的校验
- `resourceData`: 接口的具体实现配置
- `requestDemo`: 请求示例，仅供开发者参考使用
- `responseDemo`: 响应示例，仅供开发者参考使用
- `operation`: 操作类型，如insert、update、jhUpdate、jhDelete、select等

##### 3.3.2 _resource配置快速模板
```sql
-- SQL类型：简单CRUD操作
INSERT IGNORE INTO `_resource` (`jhId`, `pageId`, `actionId`, `desc`, `resourceType`, `resourceData`) 
VALUES ('your-app-id', 'userManagement', 'selectItemList', '✅查询列表', 'sql', 
'{"table": "view01_user_list", "operation": "select"}');

INSERT IGNORE INTO `_resource` (`jhId`, `pageId`, `actionId`, `desc`, `resourceType`, `resourceData`) 
VALUES ('your-app-id', 'userManagement', 'insertItem', '✅新增数据', 'sql', 
'{"table": "user", "operation": "insert"}');

-- Service类型：复杂业务逻辑
INSERT IGNORE INTO `_resource` (`jhId`, `pageId`, `actionId`, `desc`, `resourceType`, `resourceData`) 
VALUES ('your-app-id', 'userManagement', 'complexLogic', '✅复杂业务', 'service', 
'{"service": "userManagement", "serviceFunction": "complexLogic"}');
```

##### 3.3.3 Service类型的_resource配置
```sql
-- 复杂业务逻辑
INSERT IGNORE INTO `_resource` (`jhId`, `pageId`, `actionId`, `desc`, `resourceType`, `appDataSchema`, `resourceData`) 
VALUES ('your-app-id', 'userManagement', 'complexBusinessLogic', '✅用户管理-复杂业务逻辑', 'service', 
'{"type": "object", "required": ["actionData"], "properties": {"actionData": {"type": "object", "required": ["table1Data"], "properties": {"table1Data": {"type": "object"}}}}}', 
'{"service": "userManagement", "serviceFunction": "complexBusinessLogic"}');
```

**接口URL规则：**
江湖JS接口统一格式为：`/resource?resourceId=pageId.actionId`
- 示例：`/resource?resourceId=userManagement.selectItemList`
- pageId和actionId必须与_resource表中的配置完全一致

### 第四步：前端页面开发

#### 🎨 前端开发任务
1. **创建页面结构**：使用Vuetify组件创建页面布局
2. **实现数据交互**：连接后端接口，实现数据CRUD
3. **添加组件功能**：创建弹框、抽屉等交互组件
4. **用户体验优化**：添加loading状态、错误处理等

#### 📄 页面核心模板
```html
<!-- app/view/page/页面名.html -->
{% extends 'template/jhTemplateV4.html'%}

{% block vueTemplate %}
<script type=\"text/html\" id=\"app-template\">
<div>
<v-app mobile-breakpoint=\"0\">
<jh-menu />
<v-main>
  <v-container fluid>
    <!-- 页面内容 -->
    <v-card>
      <v-card-title>
        <span class=\"text-h6\">页面标题</span>
      </v-card-title>
      <v-card-text>
        <!-- 查询条件区域 -->
        <v-row>
          <v-col cols=\"12\" sm=\"6\" md=\"4\">
            <v-text-field
              v-model=\"searchForm.keyword\"
              label=\"关键词\"
              dense
              clearable
              @keyup.enter=\"doUiAction('getTableData')\"
            ></v-text-field>
          </v-col>
        </v-row>
        
        <!-- 操作按钮区域 -->
        <v-row>
          <v-col cols=\"12\">
            <v-btn color=\"primary\" @click=\"doUiAction('getTableData')\" small>
              <v-icon left>mdi-magnify</v-icon>查询
            </v-btn>
            <v-btn color=\"success\" @click=\"doUiAction('startCreateItem')\" small class=\"ml-2\">
              <v-icon left>mdi-plus</v-icon>新增
            </v-btn>
          </v-col>
        </v-row>
        
        <!-- 数据表格区域 -->
        <v-data-table
          :headers=\"headers\"
          :items=\"tableData\"
          :loading=\"isTableLoading\"
          :server-items-length=\"tableDataCount\"
          :items-per-page=\"tableParams.limit\"
          :page=\"tableParams.page\"
          @update:page=\"doUiAction('changePage', $event)\"
          @update:items-per-page=\"doUiAction('changePageSize', $event)\"
          hide-default-footer
          class=\"elevation-1\"
        >
          <!-- 状态列 -->
          <template v-slot:item.status=\"{ item }\">
            <v-chip 
              :color=\"parseConstantText(item.status, 'statusConstantKey', 'color')\"
              dark small>
              {{item.status | parseConstantText('statusConstantKey')}}
            </v-chip>
          </template>
          
          <!-- 操作列 -->
          <template v-slot:item.action=\"{ item }\">
            <v-icon small @click=\"doUiAction('startUpdateItem', item)\" class=\"mr-2\">
              mdi-pencil
            </v-icon>
            <v-icon small @click=\"doUiAction('deleteItem', item)\" color=\"error\">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
        
        <!-- 分页组件 -->
        <v-pagination
          v-model=\"tableParams.page\"
          :length=\"Math.ceil(tableDataCount / tableParams.limit)\"
          @input=\"doUiAction('changePage', $event)\"
          total-visible=\"7\"
        ></v-pagination>
      </v-card-text>
    </v-card>
  </v-container>
</v-main>
</v-app>
</div>
</script>
{% endblock %}
```

#### 4.2 数据字典前端使用

##### 4.2.1 引入工具类
在页面中引入常量工具类：
```html
<!-- 页面底部引入 -->
{% include 'common/util/constantUtil.html' %}
```

##### 4.2.2 数据绑定
在Vue组件的data中绑定常量对象：
```javascript
data: {
    constantObj: window.constantObj,
    // 其他数据...
}
```

##### 4.2.3 常用使用场景

**下拉选择框**
```html
<v-select 
    :items=\"constantObj.orderStatus\"
    item-text=\"text\"
    item-value=\"value\"
    v-model=\"form.status\"
    label=\"订单状态\"
    dense>
</v-select>
```

**状态标签显示**
```html
<v-chip 
    :color=\"parseConstantText(item.status, 'orderStatus', 'color')\"
    dark small>
    {{item.status | parseConstantText('orderStatus')}}
</v-chip>
```

#### 🔧 Vue交互核心代码
```javascript
{% block vueScript %}
<script>
new Vue({
  el: '#app',
  template: '#app-template',
  data: {
    // 常量对象
    constantObj: window.constantObj,
    
    // 表格相关
    isTableLoading: false,
    tableData: [],
    tableDataCount: 0,
    tableParams: {
      page: 1,
      limit: 10,
      orderBy: [{ column: 'id', order: 'desc' }]
    },
    headers: [
      { text: 'ID', value: 'id', width: 80 },
      { text: '名称', value: 'name' },
      { text: '状态', value: 'status', width: 120 },
      { text: '操作', value: 'action', sortable: false, width: 120 }
    ],
    
    // 搜索表单
    searchForm: {
      keyword: ''
    },
    
    // 弹框相关
    isCreateDialogVisible: false,
    isUpdateDialogVisible: false,
    createForm: {},
    updateForm: {}
  },
  
  async mounted() {
    await this.doUiAction('getTableData');
  },
  
  methods: {
    // >>>>>>>>>>>>> 数据加载 >>>>>>>>>>>>>
    async getTableData() {
      this.isTableLoading = true;
      try {
        const result = await window.jianghuAxios({
          data: {
            appData: {
              pageId: '页面ID',
              actionId: \"selectItemList\",
              actionData: this.searchForm,
              ...this.tableParams
            }
          }
        });
        const { rows, count } = result.data.appData.resultData;
        this.tableData = rows;
        this.tableDataCount = count;
      } catch (error) {
        window.vtoast.fail('数据加载失败');
      } finally {
        this.isTableLoading = false;
      }
    },
    
    // >>>>>>>>>>>>> 新增功能 >>>>>>>>>>>>>
    openCreateDialog() {
      this.createForm = {};
      this.isCreateDialogVisible = true;
    },
    
    async doCreateItem() {
      try {
        await window.jianghuAxios({
          data: {
            appData: {
              pageId: '页面ID',
              actionId: \"insertItem\",
              actionData: this.createForm
            }
          }
        });
        window.vtoast.success('创建成功');
        this.isCreateDialogVisible = false;
        await this.getTableData();
      } catch (error) {
        window.vtoast.fail('创建失败');
      }
    },
    
    // >>>>>>>>>>>>> 编辑功能 >>>>>>>>>>>>>
    openUpdateDialog(item) {
      this.updateForm = { ...item };
      this.isUpdateDialogVisible = true;
    },
    
    async doUpdateItem() {
      try {
        await window.jianghuAxios({
          data: {
            appData: {
              pageId: '页面ID',
              actionId: \"updateItem\",
              actionData: this.updateForm,
              where: { id: this.updateForm.id }
            }
          }
        });
        window.vtoast.success('更新成功');
        this.isUpdateDialogVisible = false;
        await this.getTableData();
      } catch (error) {
        window.vtoast.fail('更新失败');
      }
    },
    
    // >>>>>>>>>>>>> 删除功能 >>>>>>>>>>>>>
    async confirmDeleteItem(item) {
      if (await window.confirmDialog({ 
        title: '确认删除', 
        content: `确定要删除【${item.name}】吗？` 
      }) === false) {
        return;
      }
      await this.doDeleteItem(item);
    },
    
    async doDeleteItem(item) {
      try {
        await window.jianghuAxios({
          data: {
            appData: {
              pageId: '页面ID',
              actionId: \"deleteItem\",
              where: { id: item.id }
            }
          }
        });
        window.vtoast.success('删除成功');
        await this.getTableData();
      } catch (error) {
        window.vtoast.fail('删除失败');
      }
    },
    
    // >>>>>>>>>>>>> UI动作统一入口 >>>>>>>>>>>>>
    // 重点：规范的参数形式，调用方法链而不是写逻辑代码
    async doUiAction(uiActionId, uiActionData) {
      switch (uiActionId) {
        case 'getTableData':
          await this.getTableData();
          break;
        case 'startCreateItem':
          await this.prepareCreateFormData();
          await this.openCreateDrawer();
          break;
        case 'createItem':
          await this.prepareCreateValidate();
          await this.confirmCreateItemDialog();
          await this.prepareDoCreateItem();
          await this.doCreateItem();
          await this.closeCreateDrawer();
          await this.getTableData();
          break;
        case 'startUpdateItem':
          await this.prepareUpdateFormData(uiActionData);
          await this.openUpdateDrawer();
          break;
        case 'updateItem':
          await this.prepareUpdateValidate();
          await this.confirmUpdateItemDialog();
          await this.prepareDoUpdateItem();
          await this.doUpdateItem();
          await this.closeUpdateDrawer();
          await this.getTableData();
          break;
        case 'deleteItem':
          await this.prepareDeleteValidate(uiActionData);
          await this.confirmDeleteItemDialog(uiActionData);
          await this.prepareDoDeleteItem();
          await this.doDeleteItem();
          await this.getTableData();
          break;
        case 'changePage':
          await this.handlePageChange(uiActionData);
          break;
        case 'changePageSize':
          await this.handlePageSizeChange(uiActionData);
          break;
        default:
          console.error('未知的UI动作:', uiActionId);
      }
    },
    
    // >>>>>>>>>>>>> 分页处理方法 >>>>>>>>>>>>>
    async handlePageChange(page) {
      this.tableParams.page = page;
      await this.getTableData();
    },
    
    async handlePageSizeChange(pageSize) {
      this.tableParams.limit = pageSize;
      this.tableParams.page = 1;
      await this.getTableData();
    }
  }
});
</script>
{% endblock %}
```

#### 🧩 组件开发要点

##### 组件类型选择
- **弹框 (Dialog)**：简单表单（3-6字段），快速操作
- **抽屉 (Drawer)**：复杂表单（6+字段），详情展示
- **自定义组件**：特定业务逻辑复用

##### 组件文件结构和导入
```bash
# 组件存放目录
app/view/component/
├── userManagement/          # 用户管理页面组件
│   ├── userCreateDialog.html    # 用户创建弹框
│   ├── userEditDialog.html      # 用户编辑弹框
│   └── userDetailDialog.html    # 用户详情弹框
├── orderManagement/         # 订单管理页面组件
│   ├── orderList.html           # 订单列表组件
│   └── paymentDialog.html       # 支付弹框
└── common/                  # 通用组件
    ├── confirmDialog.html       # 确认对话框
    └── uploadComponent.html     # 文件上传组件
```

##### 4.4.3 组件导入方式
在页面中使用`{% include %}`语法导入组件：
```html

<!-- 在页面html模板和script的中间导入组件 -->
...html代码区域

{% include 'component/userManagement/userCreateDialog.html' %}
{% include 'component/userManagement/userEditDialog.html' %}
{% include 'component/common/confirmDialog.html' %}

...js代码区域
```

##### 4.4.4 组件开发模板

**弹框组件模板**
```html
<!-- 创建/编辑弹框组件 -->
<v-dialog v-model=\"isCreateDialogVisible\" max-width=\"600px\" persistent>
  <v-card>
    <v-card-title class=\"text-h6\">
      <v-icon left>mdi-plus</v-icon>
      新增记录
      <v-spacer></v-spacer>
      <v-btn icon @click=\"isCreateDialogVisible = false\">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-divider></v-divider>
    
    <v-card-text class=\"pa-6\">
      <v-form ref=\"createForm\" v-model=\"isCreateFormValid\" lazy-validation>
        <v-row>
          <v-col cols=\"12\" sm=\"6\">
            <span class=\"jh-input-label\">名称 <span class=\"red--text\">*</span></span>
            <v-text-field
              v-model=\"createForm.name\"
              :rules=\"validationRules.requireRules\"
              class=\"jh-v-input\"
              dense
              single-line
              filled
              clearable
              placeholder=\"请输入名称\"
            ></v-text-field>
          </v-col>
          
          <v-col cols=\"12\" sm=\"6\">
            <span class=\"jh-input-label\">状态</span>
            <v-select
              v-model=\"createForm.status\"
              :items=\"constantObj.statusConstantKey\"
              item-text=\"text\"
              item-value=\"value\"
              class=\"jh-v-input\"
              dense
              single-line
              filled
              clearable
              placeholder=\"请选择状态\"
            ></v-select>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    
    <v-divider></v-divider>
    <v-card-actions class=\"pa-4\">
      <v-spacer></v-spacer>
      <v-btn 
        class=\"elevation-0 grey lighten-4\" 
        @click=\"isCreateDialogVisible = false\"
        :disabled=\"isCreateLoading\"
        small
      >
        取消
      </v-btn>
      <v-btn 
        color=\"success\" 
        @click=\"doUiAction('confirmCreateItem')\"
        :loading=\"isCreateLoading\"
        small
      >
        确定
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
```

**抽屉组件模板（复杂表单/详情）**
```html
<!-- 创建/编辑抽屉组件 -->
<v-navigation-drawer 
  v-if=\"isCreateDrawerShown\" 
  v-model=\"isCreateDrawerShown\" 
  :permanent=\"isCreateDrawerShown\" 
  fixed 
  temporary 
  right 
  width=\"90%\" 
  class=\"elevation-24\" 
  style=\"min-width: 80%;\"
>
  <v-form ref=\"createForm\" lazy-validation>
    
    <!-- 抽屉标题 -->
    <v-row class=\"jh-drawer-header px-4\" no-gutters align=\"center\">
      <span class=\"text-h7 font-weight-bold py-4\">新增记录</span>
      <v-spacer></v-spacer>
      <div class=\"jh-drawer-action-btn-group\">
        <v-btn class=\"elevation-0 grey lighten-4\" @click=\"closeCreateDrawerCheck\" small>取消</v-btn>
        <v-btn color=\"success\" small @click=\"doUiAction('createItem')\">
          新增记录
        </v-btn>
      </div>
    </v-row>
    <v-divider class=\"jh-divider\"></v-divider>
    
    <!-- 抽屉内容 -->
    <div class=\"px-4 pb-4\">
      <!-- 基本信息 -->
      <div class=\"form-section mb-6\">
        <div class=\"title pl-2 mb-3\">基本信息</div>
        <v-row>
          <v-col cols=\"12\" sm=\"6\" md=\"4\">
            <span class=\"jh-input-label\">名称 <span class=\"red--text\">*</span></span>
            <v-text-field 
              v-model=\"createItem.name\"
              :rules=\"validationRules.requireRules\"
              class=\"jh-v-input\" 
              dense 
              single-line 
              filled 
              clearable
              placeholder=\"请输入名称\"
            ></v-text-field>
          </v-col>
          <v-col cols=\"12\" sm=\"6\" md=\"4\">
            <span class=\"jh-input-label\">状态</span>
            <v-select 
              v-model=\"createItem.status\"
              :items=\"constantObj.statusConstantKey\" 
              item-text=\"text\"
              item-value=\"value\"
              class=\"jh-v-input\" 
              dense 
              single-line 
              filled 
              clearable
              placeholder=\"请选择状态\"
            ></v-select>
          </v-col>
        </v-row>
      </div>
      
      <!-- 其他表单区块... -->
    </div>
  </v-form>
  
  <!-- 抽屉关闭按钮 -->
  <v-btn 
    elevation=\"0\" 
    color=\"success\" 
    fab 
    absolute 
    top 
    left 
    small 
    tile 
    class=\"drawer-close-float-btn\" 
    @click=\"closeCreateDrawerCheck\"
  >
    <v-icon>mdi-close</v-icon>
  </v-btn>
</v-navigation-drawer>

<!-- 详情抽屉组件 -->
<v-navigation-drawer 
  v-if=\"isDetailDrawerShown\" 
  v-model=\"isDetailDrawerShown\" 
  :permanent=\"isDetailDrawerShown\" 
  fixed 
  temporary 
  right 
  width=\"90%\" 
  class=\"elevation-24\" 
  style=\"min-width: 80%;\"
>
  <!-- 抽屉标题 -->
  <v-row class=\"jh-drawer-header px-4\" no-gutters align=\"center\">
    <span class=\"text-h7 font-weight-bold py-4\">详情信息</span>
    <v-spacer></v-spacer>
    <div class=\"jh-drawer-action-btn-group\">
      <!-- 根据业务需要添加操作按钮 -->
      <v-btn class=\"elevation-0 grey lighten-4\" @click=\"closeDetailDrawerCheck\" small>关闭</v-btn>
    </div>
  </v-row>
  <v-divider class=\"jh-divider\"></v-divider>
  
  <!-- 抽屉内容 -->
  <div class=\"px-4 pb-4\">
    <!-- 基本信息 -->
    <div class=\"form-section mb-6\">
      <div class=\"title pl-2 mb-3\">基本信息</div>
      <v-row>
        <v-col cols=\"12\" sm=\"6\" md=\"4\">
          <span class=\"jh-input-label\">名称</span>
          <v-text-field 
            class=\"jh-v-input\" 
            dense 
            single-line 
            filled 
            v-model=\"detailItem.name\" 
            readonly
          ></v-text-field>
        </v-col>
        <v-col cols=\"12\" sm=\"6\" md=\"4\">
          <span class=\"jh-input-label\">状态</span>
          <div class=\"pt-2\">
            <v-chip 
              small 
              :color=\"parseConstantText(detailItem.status, 'statusConstantKey', 'color')\"
              dark
            >
              {{ detailItem.status | parseConstantText('statusConstantKey') }}
            </v-chip>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
  
  <!-- 抽屉关闭按钮 -->
  <v-btn 
    elevation=\"0\" 
    color=\"success\" 
    fab 
    absolute 
    top 
    left 
    small 
    tile 
    class=\"drawer-close-float-btn\" 
    @click=\"closeDetailDrawerCheck\"
  >
    <v-icon>mdi-close</v-icon>
  </v-btn>
</v-navigation-drawer>
```

##### 4.4.5 组件数据管理
在主页面的Vue实例中管理组件相关数据：
```javascript
data: {
  // 弹框控制（小型表单）
  isCreateDialogVisible: false,
  isUpdateDialogVisible: false,
  
  // 抽屉控制（复杂表单/详情）
  isCreateDrawerShown: false,
  isUpdateDrawerShown: false,
  isDetailDrawerShown: false,
  
  // 表单验证
  isCreateFormValid: false,
  isUpdateFormValid: false,
  
  // 加载状态
  isCreateLoading: false,
  isUpdateLoading: false,
  
  // 表单数据
  createForm: {},    // 弹框表单数据
  updateForm: {},    // 弹框表单数据
  createItem: {},    // 抽屉表单数据
  updateItem: {},    // 抽屉表单数据
  detailItem: {},    // 详情数据
  
  // 验证规则
  validationRules: {
    requireRules: [
      v => !!v || '必填'
    ]
  },
  
  // 其他数据...
}
```

##### 4.4.6 组件交互方法
```javascript
methods: {
  // >>>>>>>>>>>>> 弹框管理 >>>>>>>>>>>>>
  openCreateDialog() {
    this.createForm = {};
    this.isCreateFormValid = false;
    this.isCreateDialogVisible = true;
    // 重置表单验证状态
    this.$nextTick(() => {
      if (this.$refs.createForm) {
        this.$refs.createForm.resetValidation();
      }
    });
  },
  
  // >>>>>>>>>>>>> 抽屉管理 >>>>>>>>>>>>>
  async prepareCreateFormData() {
    this.createItem = {};
    this.createItemOrigin = _.cloneDeep(this.createItem);
  },
  
  async openCreateDrawer() {
    this.isCreateDrawerShown = true;
  },
  
  async closeCreateDrawerCheck() {
    await this.closeCreateDrawer();
  },
  
  async closeCreateDrawer() {
    this.isCreateDrawerShown = false;
    this.createItem = {};
  },
  
  async prepareDetailData(item) {
    this.detailItem = _.cloneDeep(item);
  },
  
  async openDetailDrawer() {
    this.isDetailDrawerShown = true;
  },
  
  async closeDetailDrawerCheck() {
    await this.closeDetailDrawer();
  },
  
  async closeDetailDrawer() {
    this.isDetailDrawerShown = false;
  },
  
  // >>>>>>>>>>>>> 确认操作 >>>>>>>>>>>>>
  async confirmCreateItem() {
    // 表单验证
    if (!this.$refs.createForm.validate()) {
      window.vtoast.fail('请完善表单信息');
      return;
    }
    
    // 确认对话框
    if (await window.confirmDialog({ 
      title: '确认创建', 
      content: '确定要创建新记录吗？' 
    }) === false) {
      return;
    }
    
    await this.doCreateItem();
  },
  
  async confirmCreateItemDialog() {
    if (await window.confirmDialog({
      title: \"新增\", 
      content: \"确定新增吗？\"
    }) === false) {
      throw new Error(\"[confirmCreateItemDialog] 否\");
    }
  },
  
  // 其他方法...
}
```

##### 4.4.7 组件使用场景指引

**弹框组件适用场景：**
- 简单的表单录入（3-6个字段）
- 快速确认操作
- 简单的信息展示
- 字段较少的编辑功能

**抽屉组件适用场景：**
- 复杂的表单录入（多个分组，6个以上字段）
- 详细信息展示
- 文件上传、图片展示
- 多步骤操作流程
- 需要较大展示空间的内容

##### 4.4.8 组件样式规范
- **输入框标签**: 使用 `jh-input-label` 类，必填项添加 `red--text` 星号
- **输入框样式**: 使用 `jh-v-input` 类，配合 `dense single-line filled`
- **按钮样式**: 取消按钮使用 `elevation-0 grey lighten-4`，确认按钮使用 `color="success"`
- **抽屉头部**: 使用 `jh-drawer-header` 和 `jh-drawer-action-btn-group` 类
- **关闭按钮**: 使用 `drawer-close-float-btn` 类的浮动按钮
- **表单分组**: 使用 `form-section mb-6` 和 `title pl-2 mb-3` 结构

##### 4.4.9 组件命名规范
- **文件名**: 小驼峰命名，功能描述清晰（如 `userCreateDialog.html`）
- **变量名**: 使用小驼峰命名（如 `isCreateDrawerShown`）
- **方法名**: 使用小驼峰命名，动词开头（如 `openCreateDrawer`）
- **CSS类名**: 使用kebab-case命名（如 `jh-drawer-header`）

### 第五步：系统集成与测试

#### ⚙️ 系统集成任务
1. **页面配置**：在 `_page` 表中配置页面信息和菜单
2. **权限设置**：配置用户角色和访问权限
3. **功能联调**：测试前后端数据交互
4. **用户体验优化**：完善交互细节和错误处理

#### 🧪 测试验证任务
1. **功能测试**：验证所有业务功能正常
2. **边界测试**：测试异常情况和边界值
3. **性能检查**：确保接口响应速度和页面加载速度
4. **用户体验测试**：确保操作流程顺畅、提示友好

## ✅ 开发验证清单

### 数据库验证
- [ ] 已检查现有 `sql/ddl.sql` 表结构（缺失时已使用 `jianghu-data-structure` 命令梳理）
- [ ] 新表或修改表符合江湖JS规范
- [ ] 数据字典已配置在 `_constant` 表
- [ ] 数据库视图能正确查询所需数据

### 后端验证  
- [ ] Service方法正确实现业务逻辑
- [ ] _resource表已正确配置接口
- [ ] 接口参数校验完整
- [ ] 错误处理机制完善
- [ ] 事务处理正确（多表操作）

### 前端验证
- [ ] 页面结构清晰，UI组件正常显示
- [ ] 数据交互功能正常（增删改查）
- [ ] 表单验证规则有效
- [ ] 用户操作有相应的反馈提示
- [ ] 组件导入和使用正确

### 系统集成验证
- [ ] _page表已配置页面信息
- [ ] 菜单权限配置正确
- [ ] 前后端数据交互正常
- [ ] 页面加载速度acceptable
- [ ] 接口响应时间合理

### 用户体验验证
- [ ] 操作流程直观易懂
- [ ] 错误提示信息友好
- [ ] 加载状态显示正确
- [ ] 响应式布局适配良好

## 🚨 关键开发规则

### 数据库操作规则
- **必须检查现有结构**：开发前先检查 `sql/ddl.sql` 现有表结构
- **jianghuKnex优先**：业务操作使用jianghuKnex（自动记录操作历史），复杂查询使用knex
- **事务处理**：多表操作必须使用事务确保数据一致性
- **数据字典统一**：所有枚举值配置在 `_constant` 表中，避免硬编码

### 后端开发规则
- **Service分组**：按业务模块分组，主表和扩展表分别对应不同service文件
- **接口配置**：通过 `_resource` 表配置接口，无需controller层
- **数据校验规范**：⭐ **严格按照后端开发规范文档使用 `actionDataSchema` 进行参数校验**
- **错误处理**：统一使用 `BizError` 抛出业务异常

### 前端开发规则
- **组件选择**：弹框用于简单表单（3-6字段），抽屉用于复杂表单（6+字段）
- **doUiAction规范**：⭐ **使用 `doUiAction(uiActionId, uiActionData)` 标准参数形式，通过方法链调用实现完整业务流程**
- **数据绑定**：使用 `constantObj` 和 `parseConstantText` 处理数据字典
- **组件导入**：使用 `{% include 'component/路径.html' %}` 导入组件

### 配置管理规则
- **页面配置**：通过 `_page` 表配置页面信息和菜单显示
- **接口映射**：pageId.actionId 格式，必须与 `_resource` 表配置一致
- **数据结构梳理**：⭐ **复杂的数据结构设计使用专门的数据结构提示词**，本提示词专注开发实现
- **常量生效**：修改 `_constant` 表后需要重启应用才能生效

## 开发规范总结

### 1. 数据库规范
- **数据结构检查**: 开发前先检查 `sql/ddl.sql` 文件，确认现有表结构
- **标准字段**: 每个表必须包含标准的操作记录字段
- **命名规范**: 表名使用下划线命名法，字段名优先使用小驼峰命名法
- **视图使用**: 复杂查询优先使用视图，命名使用 `view01_`、`view02_` 前缀
- **数据字典**: 所有枚举值配置在`_constant`表中，统一管理业务常量

### 2. 后端开发规范
- **Service层**: 按业务模块分组，主表和扩展表分别对应不同service文件
- **数据库操作**: 业务操作优先使用jianghuKnex，复杂查询使用knex
- **接口配置**: 通过_resource表配置接口，支持sql和service两种类型
- **错误处理**: 统一使用BizError抛出业务异常
- **事务处理**: 涉及多表操作必须使用事务

### 3. 前端开发规范
- **页面结构**: 使用Vuetify组件优先，TailwindCSS辅助
- **代码组织**: 使用`doUiAction`统一处理所有UI交互，按功能分组
- **组件拆分**: 详情页、处理页等做成弹框组件，存放在`app/view/component/`目录
- **组件导入**: 使用`{% include 'component/组件路径.html' %}`语法导入组件
- **组件规范**: 
  - 弹框组件使用`v-dialog`，抽屉组件使用`v-navigation-drawer`
  - 表单验证使用`v-form`的`validate()`方法
  - 确认操作集成`window.confirmDialog`确认对话框
  - 状态管理分离：弹框显示状态、表单验证状态、加载状态
- **数据字典**: 通过`constantObj`和`parseConstantText`工具统一处理
- **命名规范**: 使用驼峰命名法，名称具有描述性

### 4. 配置规范
- **页面配置**: 通过_page表配置页面信息和菜单显示
- **接口配置**: 通过_resource表配置接口映射
- **常量配置**: 通过_constant表配置状态和选项数据
- **业务编号**: 使用bizIdGenerate中间件自动生成

## 注意事项

1. **安全性**: 所有用户输入必须进行校验和过滤
2. **性能**: 合理使用索引，避免N+1查询
3. **事务**: 涉及多表操作必须使用事务
4. **日志**: 关键操作必须记录日志
5. **代码复用**: 优先使用框架提供的工具方法
6. **可维护性**: 代码结构清晰，易于理解和扩展
7. **数据一致性**: 修改数据字典时要确保与现有业务数据的一致性
8. **重启生效**: 修改_constant表后需要重启应用才能生效

## 🚀 快速执行指南

**执行江湖JS全栈开发时，按以下顺序进行：**

### 📋 开发前检查
1. 检查 `docs/` 目录是否有需求和计划文档
2. 如缺少文档，提示用户先使用 `jianghu-plan` 命令梳理
3. 确认功能范围和技术要求

### 🛠️ 标准开发流程
1. **数据库设计** → 检查现有结构 → 设计新表/视图 → 配置数据字典
2. **后端开发** → 创建Service → 配置_resource → 测试接口  
3. **前端开发** → 页面结构 → 数据交互 → 组件功能
4. **系统集成** → 页面配置 → 权限设置 → 功能联调
5. **验证测试** → 功能验证 → 体验优化 → 上线准备

### ⚠️ 关键注意事项
- **数据字典统一**：避免硬编码，提高可维护性
- **遵循规范**：严格按照江湖JS开发规范执行
- **质量优先**：确保代码质量和用户体验