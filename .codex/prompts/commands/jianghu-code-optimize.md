# JianghuJS 项目代码整理优化提示词

## 参考规范

请参考江湖JS规范文档：[规范文档引用](../shared/jianghu-rules-reference.md)

本提示词主要涉及以下规范：
- 全局规范、前端开发规范、后端开发规范、数据结构规范、UI组件规范

## 命令描述
帮我对项目代码进行整理优化，包括前端页面、组件和后端服务的代码结构规范化。可以指定具体的文件或路径进行整理，如果没有指定，将对全部前后端文件进行整理优化。

## 整理范围
- **前端页面文件**: `app\view\page` 目录下的HTML页面
- **前端组件文件**: `app\view\component` 目录下的组件  
- **后端服务文件**: `app\service` 目录下的服务类

## 整理优化规范

### 1. 页面文件与组件的对应整理
页面下调用的弹框等逻辑复杂的组件，应放置在 `component` 下与页面同名的目录中，并统一命名规范：

```
-- page
  -- vehicleManagement.html
-- component
  -- vehicleManagement
    -- vehiclePriceCalendar.html
    -- vehiclePriceDialog.html
```

### 2. 前端代码的方法调用规范
HTML模板中调用JS方法应统一通过 `doUiAction` 进行，通过doUiAction串起多个方法实现完整的业务流程，各方法分工明确、职责单一，避免方法间直接调用：

**HTML模板示例**:
```html
<v-app>
    <v-row class="ma-0 pa-3">
        <v-btn class="elevation-0 mr-2" color="success" small @click="doUiAction('startCreateItem')">开始新增</v-btn>
        <v-btn class="elevation-0 mr-2" color="success" small @click="doUiAction('createItem')">确认新增</v-btn>
        <v-btn class="elevation-0 mr-2" color="success" small @click="doUiAction('getTableData')">刷新数据</v-btn>
        <v-btn class="elevation-0 mr-2" color="success" small @click="doUiAction('updateItem')">更新数据</v-btn>
        <v-btn class="elevation-0 mr-2" color="success" small @click="doUiAction('deleteItem')">删除数据</v-btn>
    </v-row>
</v-app>
```

**JS方法结构示例**:
```javascript
<script type="module">
new Vue({
    el: '#app',
    template: '#app-template',
    vuetify: new Vuetify(),
    data: {
    },
    async created() {
    },
    async mounted() {
    },
    methods: {
        async doUiAction(uiActionId, uiActionData) {
            try {
                switch (uiActionId) {
                    case 'getTableData':
                        await this.getTableData();
                        break;
                    case 'startCreateItem':
                        await this.prepareCreateFormData(uiActionData);
                        await this.openCreateDrawer(uiActionData);
                        break;
                    case 'createItem':
                        await this.prepareCreateValidate(uiActionData);
                        await this.confirmCreateItemDialog(uiActionData);
                        await this.prepareDoCreateItem(uiActionData);
                        await this.doCreateItem(uiActionData);
                        await this.closeCreateDrawer(uiActionData);
                        await this.doUiAction('getTableData', uiActionData);
                        break;
                    case 'startUpdateItem':
                        await this.prepareUpdateFormData(uiActionData);
                        await this.openUpdateDrawer(uiActionData);
                        break;
                    case 'updateItem':
                        await this.prepareUpdateValidate(uiActionData);
                        await this.confirmUpdateItemDialog(uiActionData);
                        await this.prepareDoUpdateItem(uiActionData);
                        await this.doUpdateItem(uiActionData);
                        await this.closeUpdateDrawer(uiActionData);
                        await this.doUiAction('getTableData', uiActionData);
                        break;
                    case 'deleteItem':
                        await this.prepareDeleteFormData(uiActionData);
                        await this.confirmDeleteItemDialog(uiActionData);
                        await this.prepareDoDeleteItem(uiActionData);
                        await this.doDeleteItem(uiActionData);
                        await this.clearDeleteItem(uiActionData);
                        await this.doUiAction('getTableData', uiActionData);
                        break;
                    default:
                        console.error("[doUiAction] uiActionId not found", { uiActionId });
                        break;
                }
            } catch (error) {
                throw error;
            } finally {
                window.jhMask && window.jhMask.hide();
            }
        },
        async getTableData() {
            console.log("====获取表格数据.getTableData");
        },
        // ---------- 新增数据 uiAction >>>>>>>>>>>> --------
        async prepareCreateFormData(uiActionData) {
            // 初始化表单数据，设置默认值
            this.createItem = {
                appointmentDate: dayjs().format('YYYY-MM-DD'),
                classHours: 1
            };
            this.createItemOrigin = _.cloneDeep(this.createItem);
        },
        async openCreateDrawer(uiActionData) {
            // 打开新增抽屉/对话框
            this.isCreateDrawerShown = true;
        },
        async prepareCreateValidate(uiActionData) {
            // 表单验证
            if (await this.$refs.createForm.validate()) {
                return true;
            }
            throw new Error("请完善表单信息")
        },
        async confirmCreateItemDialog(uiActionData) {
            // 确认新增对话框
            if (await window.confirmDialog({title: "新增", content: "确定新增吗？"}) === false) {
                throw new Error("[confirmCreateFormDialog] 用户取消");
            }
        },
        async prepareDoCreateItem(uiActionData) {
            // 准备新增数据，数据转换和业务逻辑处理
            const {id, ...data} = this.createItem;
            const timeSlot = `${data.startTime}-${this.calculatedEndTime}`;
            const studentCourse = this.studentCourseList.find(item => item.studentCourseId === data.studentCourseId);
            
            this.createActionData = {
                courseType: studentCourse.courseType,
                userId: data.studentId,
                courseId: studentCourse.courseId,
                scheduleDate: data.appointmentDate,
                timeSlot: timeSlot,
                classHours: data.classHours,
                coachId: data.coachId,
                studentId: data.studentId,
                studentName: data.studentName,
                courseName: studentCourse.courseName,
                coachName: data.coachName
            };
        },
        async doCreateItem(uiActionData) {
            // 执行新增操作
            await window.jhMask.show();
            await window.vtoast.loading("新增数据");
            await window.jianghuAxios({
                data: {
                    appData: {
                        pageId: 'appointmentManagement',
                        actionId: 'insertItem',
                        bizIdGenerate: {
                            type: "idSequence",
                            prefix: "YY",
                            bizId: "appointmentId",
                            tableName: "course_appointment",
                            startValue: 1000,
                        },
                        actionData: this.createActionData
                    }
                }
            })
            await window.jhMask.hide();
            await window.vtoast.success("新增数据成功");
        },
        async closeCreateDrawer(uiActionData) {
            // 关闭新增抽屉/对话框，清理数据
            this.isCreateDrawerShown = false;
            this.createItem = {};
            this.createActionData = null;
        },
        // ---------- <<<<<<<<<<< 新增数据 uiAction ---------
        // ---------- 修改数据 uiAction >>>>>>>>>>>> --------
        async prepareUpdateFormData(uiActionData) {
            // 初始化编辑表单数据
            console.log("====修改数据.prepareUpdateFormData");
        },
        async openUpdateDrawer(uiActionData) {
            // 打开编辑抽屉/对话框
            console.log("====修改数据.openUpdateDrawer");
        },
        async prepareUpdateValidate(uiActionData) {
            // 编辑表单验证
            console.log("====修改数据.prepareUpdateValidate");
        },
        async confirmUpdateItemDialog(uiActionData) {
            // 确认更新对话框
            console.log("====修改数据.confirmUpdateItemDialog");
        },
        async prepareDoUpdateItem(uiActionData) {
            // 准备更新数据，数据转换和业务逻辑处理
            console.log("====修改数据.prepareDoUpdateItem");
        },
        async doUpdateItem(uiActionData) {
            // 执行更新操作
            console.log("====修改数据.doUpdateItem");
        },
        async closeUpdateDrawer(uiActionData) {
            // 关闭编辑抽屉/对话框，清理数据
            console.log("====修改数据.closeUpdateDrawer");
        },
        // ---------- <<<<<<<<<<< 修改数据 uiAction ---------
        // ---------- 删除数据 uiAction >>>>>>>>>>>> --------
        async prepareDeleteFormData(uiActionData) {
            // 准备删除数据
            console.log("====删除数据.prepareDeleteFormData");
        },
        async confirmDeleteItemDialog(uiActionData) {
            // 确认删除对话框
            console.log("====删除数据.confirmDeleteItemDialog");
        },
        async prepareDoDeleteItem(uiActionData) {
            // 准备删除操作，数据验证和预处理
            console.log("====删除数据.prepareDoDeleteItem");
        },
        async doDeleteItem(uiActionData) {
            // 执行删除操作
            console.log("====删除数据.doDeleteItem");
        },
        async clearDeleteItem(uiActionData) {
            // 清理删除相关数据
            console.log("====删除数据.clearDeleteItem");
        },
        // ---------- <<<<<<<<<<< 删除数据 uiAction ---------
    }
})
</script>
```

**doUiAction方法分工原则**：
- **prepare系列方法**：负责数据准备、初始化、验证等预处理工作
- **open/close系列方法**：负责UI状态管理，如打开/关闭对话框、抽屉等
- **confirm系列方法**：负责用户确认交互，处理用户意图确认
- **do系列方法**：负责执行具体的业务操作，如API调用
- **clear系列方法**：负责数据清理和状态重置
- **流程串联**：通过doUiAction调用其他doUiAction实现流程串联，如新增完成后刷新数据

### 3. _resource 表接口配置规范
页面对应的接口需要通过 `_resource` 表来配置，包含以下字段：
- `pageId`: 接口的一级名称
- `actionId`: 接口的二级名称，结合一级名称可以快速定位接口
- `desc`: 协议的描述说明
- `resourceType`: 协议类型（sql: 处理简单的CRUD操作; service: 手动创建相关service处理复杂的逻辑）
- `appDataSchema`: appData 参数数据结构的校验
- `resourceData`: 协议的具体实现配置

#### 3.1 JianghuJS框架CRUD最佳实践
**重要：JianghuJS框架已经内置完整CRUD操作，大部分情况下不需要编写service方法！**

**优先使用SQL资源配置**：
```sql
-- 标准CRUD SQL配置（推荐方式）
INSERT INTO `_resource`(`id`,`jhId`,`pageId`, `actionId`, `desc`, `resourceType`, `resourceData`) 
VALUES 
(250, 'car-rental-mgmt_v3', 'driverManagement', 'selectItemList', '✅司机管理-查询列表', 'sql', '{"table": "driver", "operation": "select"}'),
(251, 'car-rental-mgmt_v3', 'driverManagement', 'insertItem', '✅司机管理-新增司机', 'sql', '{"table": "driver", "operation": "jhInsert"}'),
(252, 'car-rental-mgmt_v3', 'driverManagement', 'updateItem', '✅司机管理-更新司机', 'sql', '{"table": "driver", "operation": "jhUpdate"}'),
(253, 'car-rental-mgmt_v3', 'driverManagement', 'deleteItem', '✅司机管理-删除司机', 'sql', '{"table": "driver", "operation": "jhDelete"}');
```

**仅复杂业务逻辑使用Service配置**：
```sql
-- Service类型接口配置（仅用于复杂业务逻辑）
INSERT INTO `_resource`(`pageId`, `actionId`, `desc`, `resourceType`, `resourceData`) 
VALUES 
('orderManagement', 'selectOrderStatistics', '✅订单管理-统计分析', 'service', '{"service": "serviceOrder", "serviceFunction": "selectOrderStatistics"}'),
('orderManagement', 'processOrderPayment', '✅订单管理-处理支付', 'service', '{"service": "rentalServiceOrder", "serviceFunction": "processOrderPayment"}');
```

#### 3.2 前端jianghuAxios调用示例
```javascript
// 查询列表
const result = await window.jianghuAxios({
    data: {
        appData: {
            pageId: 'driverManagement',
            actionId: 'selectItemList',
            actionData: {},
            where: { status: '正常' },
            orderBy: [{ column: 'operationAt', order: 'desc' }],
            limit: 10,
            offset: 0
        }
    }
});

// 新增记录
const result = await window.jianghuAxios({
    data: {
        appData: {
            pageId: 'driverManagement',
            actionId: 'insertItem',
            actionData: {
                driverName: '张三',
                phone: '13800138000',
                licenseNumber: 'A1234567890'
            }
        }
    }
});
```

#### 3.3 resourceHook前置和后置处理
`resourceHook`允许在SQL操作前后执行service方法，主要用于业务逻辑处理，**不用于参数验证**。

**配置格式**：
```json
{
  "before": [{ "service": "service文件名", "serviceFunction": "service方法名" }],
  "after": [{ "service": "service文件名", "serviceFunction": "service方法名" }]
}
```

**resourceHook适用场景**：
1. **业务ID自动生成**：如订单ID、工单ID等
2. **缓存更新**：数据变更后清除或更新缓存
3. **日志记录**：操作完成后记录业务日志
4. **第三方系统通知**：如发送短信、推送消息等
5. **复杂业务计算**：如费用计算、积分更新等

**实际应用示例**：
```sql
-- 在订单创建前自动生成订单ID
INSERT INTO `_resource`(`pageId`, `actionId`, `desc`, `resourceType`, `resourceHook`, `resourceData`) 
VALUES ('orderManagement', 'insertItem', '✅订单管理-创建订单', 'sql', 
'{"before":[{"service":"common","serviceFunction":"generateBizIdOfBeforeHook"}]}',
'{"table": "service_order", "operation": "jhInsert"}');

-- 在用户更新后清除缓存并发送通知
INSERT INTO `_resource`(`pageId`, `actionId`, `desc`, `resourceType`, `resourceHook`, `resourceData`) 
VALUES ('userManagement', 'updateItem', '✅用户管理-更新用户', 'sql',
'{"after":[{"service":"common","serviceFunction":"clearUserCache"},{"service":"notification","serviceFunction":"sendUpdateNotification"}]}', 
'{"table": "_user", "operation": "jhUpdate"}');

-- 在订单支付成功后更新车辆状态
INSERT INTO `_resource`(`pageId`, `actionId`, `desc`, `resourceType`, `resourceHook`, `resourceData`) 
VALUES ('orderManagement', 'processPayment', '✅订单管理-处理支付', 'sql',
'{"after":[{"service":"serviceOrder","serviceFunction":"updateVehicleStatusAfterPayment"}]}',
'{"table": "service_order_transaction", "operation": "jhInsert"}');
```

**Hook方法开发规范**：
```javascript
// 前置Hook示例 - 自动生成业务ID
async generateBizIdOfBeforeHook() {
  const actionData = this.ctx.request.body.appData.actionData;
  
  // 生成订单ID
  const orderId = `SO${dayjs().format('YYYYMMDD')}${Math.random().toString(36).substring(2, 8)}`;
  actionData.serviceOrderId = orderId;
  
  // 前置Hook可以修改请求数据
}

// 后置Hook示例 - 清除缓存  
async clearUserCache() {
  const actionData = this.ctx.request.body.appData.actionData;
  
  // 清除相关缓存
  await this.app.redis.del(`user:${actionData.userId}`);
  
  // 后置Hook可以修改返回结果
  this.ctx.response.body.appData.resultData.cacheCleared = true;
}
```

**参数验证使用actionDataSchema（不用resourceHook）**：
```javascript
// ✅ 正确的参数验证方式
const actionDataSchema = Object.freeze({
  insertItem: {
    type: 'object',
    additionalProperties: true,
    required: ['userId', 'vehicleId'],
    properties: {
      userId: { type: 'string' },
      vehicleId: { type: 'string' },
      payAmount: { type: 'number', minimum: 0 }
    }
  }
});

async insertItem() {
  const actionData = this.ctx.request.body.appData.actionData;
  
  // 使用validateUtil进行参数验证
  validateUtil.validate(actionDataSchema.insertItem, actionData);
  
  // 业务逻辑处理...
}
```

### 4. 后端服务文件开发规范

#### 4.1 服务文件命名规范
`app\service` 下的文件按照数据库表名命名，一个表对应一个服务文件：
- 数据库表：`vehicle` → 对应文件：`app\service\vehicle.js`
- 数据库表：`driver` → 对应文件：`app\service\driver.js`

#### 4.2 何时需要编写service方法
**只有以下情况才需要编写service方法**：
1. **复杂的业务逻辑**：涉及多表联查、复杂计算
2. **事务处理**：需要保证数据一致性的多步操作
3. **数据验证**：复杂的业务规则验证
4. **第三方接口调用**：支付、短信等外部服务
5. **数据统计分析**：复杂的聚合计算

#### 4.3 JianghuKnex使用规范
**重要：JianghuKnex会自动处理审计字段，无需手动添加！**

```javascript
// ✅ 正确：传入this.ctx，框架自动处理审计字段
await jianghuKnex('service_order', this.ctx).insert({
    serviceOrderId: 'SO123',
    userId: 'user001'
    // 无需手动添加operation、operationByUserId、operationByUser、operationAt字段
});

// ❌ 错误：手动添加审计字段
await jianghuKnex('service_order', this.ctx).insert({
    serviceOrderId: 'SO123',
    userId: 'user001',
    operation: 'insert', // 多余！框架会自动处理
    operationByUserId: userId, // 多余！
    operationAt: new Date() // 多余！
});
```

#### 4.4 Service方法开发模板
```javascript
'use strict';

const Service = require('egg').Service;
const validateUtil = require('@jianghujs/jianghu/app/common/validateUtil');
const { BizError, errorInfoEnum } = require('../constant/error');

const actionDataSchema = Object.freeze({
  complexBusinessMethod: {
    type: 'object',
    additionalProperties: true,
    required: ['requiredField'],
    properties: {
      requiredField: { type: 'string' }
    },
  },
});

class YourService extends Service {

  /**
   * 复杂业务方法示例
   * @returns {Promise<Object>}
   */
  async complexBusinessMethod() {
    const { jianghuKnex } = this.app;
    const actionData = this.ctx.request.body.appData.actionData;
    
    // 参数验证
    validateUtil.validate(actionDataSchema.complexBusinessMethod, actionData);
    
    // 复杂业务逻辑处理...
    
    // 返回标准格式
    return {
      rows: [result],
      resultMessage: '操作成功'
    };
  }

}

module.exports = YourService;
```

#### 4.5 工具方法使用原则
**优先使用第三方库，避免过度封装**

**直接使用第三方库（推荐）**：
```javascript
// 日期操作 - 直接使用 dayjs
const currentTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
const hoursDiff = dayjs(endTime).diff(dayjs(startTime), 'hour');
const daysDiff = Math.ceil(dayjs(endDate).diff(dayjs(startDate), 'day', true)) || 1;

// 对象操作 - 直接使用 lodash
const cleanedObj = _.omitBy(originalObj, _.isUndefined);
const mergedObj = _.merge({}, defaultConfig, userConfig);

// 字符串操作 - 直接使用原生JS或lodash
const orderId = `SO${dayjs().format('YYYYMMDD')}${sequence.toString().padStart(4, '0')}`;
```

**仅特别复杂的业务逻辑才封装到 common.js**：
- `generateDatesFromRule()` - 根据规则生成日期数组
- `calculateHours()` - 时间计算（如有特殊业务规则）
- `calculateDays()` - 天数计算（如有特殊业务规则）
- `buildQueryConditions()` - 复杂查询条件构建

**避免简单封装**：
```javascript
// ❌ 不推荐：简单封装第三方库功能
formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
    return dayjs(date).format(format);
}

// ✅ 推荐：直接使用第三方库
dayjs(date).format('YYYY-MM-DD HH:mm:ss')
```

## 重构执行流程
1. **结构分析**: 扫描现有的页面、组件、服务文件结构
2. **文件整理**: 按照命名规范重新组织文件和目录结构
3. **代码重构**: 统一 doUiAction 调用模式和方法组织结构
4. **接口配置**: 检查和完善 _resource 表的接口配置，优先使用SQL操作
5. **服务优化**: 只为复杂业务逻辑创建service方法，移除不必要的CRUD方法
6. **工具方法提取**: 将重复的工具方法提取到 common.js 中
7. **验证测试**: 确保重构后功能正常运行

## 关键优化原则

### 代码去重原则
- **优先使用第三方库**：dayjs、lodash等现有方法，避免重复实现
- **避免简单封装**：不要为第三方库的基础功能创建wrapper方法
- **只有复杂业务逻辑才提取**：真正复杂的业务方法才放入 `app/service/common.js`

### CRUD操作原则  
- **优先使用框架内置SQL操作**，通过_resource配置实现
- **只有复杂业务逻辑才编写service方法**
- 避免重复实现框架已有的CRUD功能

### Service方法设计原则
- 方法名与_resource配置中的actionId保持一致
- 返回格式统一：`{ rows: [], resultMessage: '' }`
- 使用validateUtil进行参数验证
- 正确使用jianghuKnex，避免手动添加审计字段

## 注意事项
- 重构前会先分析现有结构并制定详细方案
- 保持原有功能不变，仅进行结构和规范优化
- 遵循JianghuJS框架的开发模式和最佳实践
- 确保前后端接口命名一致性
- 充分利用框架内置能力，避免重复造轮子

## 输出要求
请严格按照以上规范进行 $ARGUMENTS 的整理优化，输出内容包括：
1. **代码重构**: 按规范整理的代码文件
2. **_resource更新脚本**: 如果涉及到_resource表更新，提供完整的SQL更新脚本
3. **_page更新脚本**: 如果涉及到_page表更新，提供相应的SQL更新语句
4. **重构总结报告**: 说明具体的优化内容和改进点