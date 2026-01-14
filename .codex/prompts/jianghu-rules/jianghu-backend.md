---
trigger: model_decision
description: 后端开发说明
---

继承JianghuJS通用规范 [jianghu-global.mdc](mdc:.cursor/rules/jianghujs/jianghu-global.mdc)

# 后端开发说明

- 在 app/service 目录下定义接口方法，在数据库的_resource表增加配置，前端就可以调用对应配置的接口了
- 当需要新增接口时，需要提供给我对应插入_resource的sql语句（编辑init-json文件时除外，init-json有专门的resourceList配置，只需要填写配置就会自动更新到数据库，不需要手动执行sql语句）。
- service下的文件名与table名类似，用驼峰命名，文件名首字母小写。
- **优先使用SQL类型resource**：一般的查询、更新、删除的接口通过resource配置一个sql的配置就能实现，不需要新增一个service方法。框架会自动处理where、whereLike、offset、limit等常用查询参数。
- **谨慎创建复杂查询方法**：除非有特殊的业务逻辑需求，否则不要创建复杂的列表查询方法。如确实需要，必须经过确认再添加。
- 新增接口需要新增一个service方法，并配置到resource中，如果需要处理多张表可能需要加入事务

## Service方法开发规范

### 新增方法前必须检查
- **避免重复开发**：在新增service方法前，必须先检查当前service文件中是否已存在相同或类似功能的方法
- **功能复用优先**：如果已存在相似功能的方法，应优先考虑复用或改进现有方法，而不是新建重复方法
- **代码审查**：在提交代码前，需要审查是否存在功能重复的方法

### 代码复用原则
- **公共逻辑抽取**：将多个方法中重复的业务逻辑抽取为私有方法
- **参数化设计**：通过参数配置实现不同业务场景，避免为相似功能创建多个方法
- **工具方法共享**：数据处理、格式化等工具性方法应抽取到公共工具类或当前service的私有方法中

### 方法命名规范
- **简洁明了**：方法名应简洁，不需要重复service文件名或表名信息
- **功能导向**：直接体现方法的具体功能，如 `insertSchedule`、`batchInsertConfig`、`updateStatus`
- **统一格式**：动词+名词的格式，如 `selectItemList`、`insertItem`、`updateStatus`、`deleteItem`
- **避免冗余**：在 `vehicleSchedule.js` 中使用 `insertSchedule` 而不是 `insertVehicleSchedule`

#### 推荐的方法命名示例
```javascript
// ✅ 推荐：简洁明了的命名
class VehicleScheduleService extends Service {
  async selectItemList() { }           // 查询排班列表
  async insertSchedule() { }       // 新增排班
  async updateSchedule() { }       // 更新排班
  async deleteSchedule() { }       // 删除排班
  async batchInsertScheduleConfig() { }    // 批量插入配置
  async updateStatus() { }         // 更新状态
}

// ❌ 不推荐：冗余的命名
class VehicleScheduleService extends Service {
  async selectVehicleScheduleList() { }
  async insertVehicleSchedule() { }
  async updateVehicleScheduleById() { }
  async deleteVehicleScheduleItem() { }
}
```

## Service文件与数据库表对应规范

### 基本对应原则
- **一对一关系**：每个service文件优先对应一个主数据库表
- **一对多关系**：当多个表属于同一业务逻辑时，可以放在同一个service文件中
- **命名规范**：service文件名以主表名命名，使用驼峰命名法，首字母小写

### 表关联处理
- **主从表关系**：主表和从表的操作可以放在同一个service文件中
  - 示例：`vehicle`（主表）和 `vehicle_config`（配置表）→ `vehicle.js`
- **业务关联表**：业务上紧密关联的表可以合并处理
  - 示例：`vehicle_schedule_config` 和 `vehicle_schedule` → `vehicleSchedule.js`
- **扩展表处理**：扩展表可以与主表放在同一个service中，也可以根据业务复杂度独立成文件

### 文件组织最佳实践
```javascript
// ✅ 推荐：相关表统一管理
// vehicleSchedule.js - 处理车辆排班相关的所有表
class VehicleScheduleService extends Service {
  // 处理 vehicle_schedule 表
  async selectScheduleList() { }
  
  // 处理 vehicle_schedule_config 表  
  async selectScheduleConfig() { }
  
  // 同时处理两个表的业务逻辑
  async createScheduleWithConfig() { }
}

// ❌ 不推荐：过度拆分
// vehicleSchedule.js - 只处理 vehicle_schedule
// vehicleScheduleConfig.js - 只处理 vehicle_schedule_config
```


# 参考

## _resource表结构
```sql
CREATE TABLE `_resource` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accessControlTable` varchar(255) DEFAULT NULL COMMENT '数据规则控制表',
  `resourceHook` text COMMENT '[ "before": {"service": "xx", "serviceFunction": "xxx"}, "after": [] }',
  `pageId` varchar(255) DEFAULT NULL COMMENT 'page id; E.g: index',
  `actionId` varchar(255) DEFAULT NULL COMMENT 'action id; E.g: selectXXXByXXX',
  `desc` varchar(255) DEFAULT NULL COMMENT '描述',
  `resourceType` varchar(255) DEFAULT NULL COMMENT 'resource 类型; E.g: auth service sql',
  `appDataSchema` text COMMENT 'appData 参数校验',
  `resourceData` text COMMENT 'resource 数据; { "service": "auth", "serviceFunction": "passwordLogin" } or  { "table": "${tableName}", "action": "select", "whereCondition": ".where(function() {this.whereNot( { recordStatus: \\"active\\" })})" }',
  `requestDemo` text COMMENT '请求Demo',
  `responseDemo` text COMMENT '响应Demo',
  `operation` varchar(255) DEFAULT 'insert' COMMENT '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore',
  `operationByUserId` varchar(255) DEFAULT NULL COMMENT '操作者userId',
  `operationByUser` varchar(255) DEFAULT NULL COMMENT '操作者用户名',
  `operationAt` varchar(255) DEFAULT NULL COMMENT '操作时间; E.g: 2021-05-28T10:24:54+08:00 ',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=360 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='请求资源表; 软删除未启用; resourceId=`${appId}.${pageId}.${actionId}`';
```

## bizIdGenerate 业务ID生成中间件
当需要自动生成业务ID时，使用bizIdGenerate中间件（参考全局规范5.4节）：

```javascript
// 前端调用示例
await window.jianghuAxios({
  data: {
    appData: {
      pageId: 'customerManagement',
      actionId: 'insertItem',
      bizIdGenerate: {
        prefix: "C",           // ID前缀
        bizId: "customerId",   // 业务ID字段名
        tableName: "customer", // 表名
        startValue: 10001      // 起始值
      },
      actionData: this.createActionData
    }
  }
});
```

**注意事项**：
- 使用bizIdGenerate的表必须包含 `idSequence` 字段用于序列号跟踪
- 不要在service中手动生成ID，统一使用中间件

## ID生成方法

在JianghuJS中，Service层生成ID有两种常用做法：

### 1. 序列化ID生成（idPlus）
用于生成有序递增的数字ID，适用于需要控制ID顺序的场景：

```javascript
const idGenerateUtil = require("@jianghujs/jianghu/app/common/idGenerateUtil");

// 生成序列化ID
const taskId = await idGenerateUtil.idPlus({
  knex: jianghuKnex,
  startValue: 1000,          // 起始值
  tableName: tableEnum.task, // 表名
  columnName: "idSequence"   // 序列字段名
});

// 使用生成的ID
const result = await jianghuKnex('task', this.ctx).insert({
  taskId,
  taskName: actionData.taskName,
  // 其他字段...
});
```

**使用场景**：
- 订单号、任务编号等需要有序递增的业务ID
- 需要控制ID生成顺序的场景
- 表必须包含 `idSequence` 字段用于序列号跟踪

### 2. UUID生成
用于生成全局唯一的字符串ID，适用于不需要有序但要求全局唯一的场景：

```javascript
const idGenerateUtil = require("@jianghujs/jianghu/app/common/idGenerateUtil");

// 生成UUID
const userId = await idGenerateUtil.uuid();

// 使用生成的UUID
const result = await jianghuKnex('user', this.ctx).insert({
  userId,
  userName: actionData.userName,
  // 其他字段...
});
```

**使用场景**：
- 用户ID、会话ID等不需要有序的唯一标识
- 分布式系统中需要全局唯一ID的场景
- 不依赖数据库序列的ID生成

### 使用建议
- **优先考虑前端的bizIdGenerate中间件**：对于简单的业务ID生成，建议使用前端调用时的bizIdGenerate配置
- **复杂业务逻辑时使用Service层生成**：当ID生成需要复杂的业务逻辑处理时，在Service层使用上述方法
- **保持一致性**：同一个项目中相同类型的ID生成应使用统一的方法

## 事务使用规范

在JianghuJS中，所有涉及多表操作或需要确保数据一致性的操作都必须使用事务。事务必须按照以下标准格式编写：

### 正确的事务写法
```javascript
// ✅ 正确 - 使用 async/await 回调模式
await jianghuKnex.transaction(async (trx) => {
  await trx(tableEnum.org, this.ctx).insert({
    ...classData,
    orgType: '班级',
    orgStatus: 'active',
  });
  // 添加组长
  if (leaderMemberId) {
    await trx(tableEnum.org_member_role, this.ctx).insert({
      ..._.pick(classData, ['orgId', 'orgName', 'orgLevel']),
      ..._.pick(leaderMemberInfo, ['memberId', 'memberSource']),
      memberName: leaderMemberInfo.netName,
      userId: leaderMemberInfo.loginId,
      roleId: '教师',
      isLeader: '是',
    });
  }
  // 默认绑定课程下的全部课件
  const coursewareList = await jianghuKnex(tableEnum.courseware, this.ctx)
    .where({ courseId: classData.orgParentId })
    .select();
  for (const courseware of coursewareList) {
    await trx(tableEnum.org_courseware_relation, this.ctx).insert({
      ..._.pick(classData, ['orgId', 'orgName']),
      ..._.pick(courseware, [
        'courseId',
        'courseName',
        'coursewareId',
        'coursewareName',
      ]),
      orgSource,
    });
  }
});
```

### 错误的事务写法
```javascript
// ❌ 错误 - 手动管理事务
const trx = await jianghuKnex.transaction();
try {
  await trx('table1').insert(data1);
  await trx('table2').insert(data2);
  await trx.commit();
} catch (error) {
  await trx.rollback();
  throw error;
}
```

### 事务使用要点
1. **统一格式**: 使用 `jianghuKnex.transaction(async (trx) => {})` 模式
2. **自动管理**: 框架自动处理提交和回滚，无需手动调用 commit/rollback
3. **错误处理**: 事务内抛出异常会自动回滚
4. **返回值**: 可以直接返回事务结果
5. **上下文传递**: 在事务内使用 `trx(tableName, this.ctx)` 确保审计字段正确填充

## Service文件组织规范

### 服务文件命名和组织原则
- service文件名与功能模块对应，使用驼峰命名，首字母小写
- 每个页面的接口应该集中在对应的service文件中
- 组件使用的接口遵循命名规范：pageId为"页面文件名"，actionId为"组件文件名-接口名"

### 接口组织规范
```
app/view/page/vehicleManagement.html → app/service/vehicle.js
app/view/page/vehicleServiceManagement.html → app/service/vehicleService.js  
app/view/page/vehiclePriceCalendar.html → app/service/vehiclePriceCalendar.js
```
## 插入_resource sql语句

### 标准格式
```sql
INSERT IGNORE INTO `_resource` (`jhId`, `accessControlTable`, `resourceHook`, `pageId`, `actionId`, `desc`, `resourceType`, `appDataSchema`, `resourceData`, `requestDemo`, `responseDemo`, `operation`, `operationByUserId`, `operationByUser`, `operationAt`) VALUES 
('your-app-id', NULL, NULL, 'pageName', 'actionName', '✅接口描述', 'service', NULL, '{"service":"serviceName","serviceFunction":"methodName"}', NULL, NULL, 'insert', NULL, NULL, NULL);
```

### 示例
```sql
-- 基础CRUD接口
INSERT IGNORE INTO `_resource` (`jhId`, `accessControlTable`, `resourceHook`, `pageId`, `actionId`, `desc`, `resourceType`, `appDataSchema`, `resourceData`, `requestDemo`, `responseDemo`, `operation`, `operationByUserId`, `operationByUser`, `operationAt`) VALUES 
('car-rental-mgmt_v3', NULL, NULL, 'vehicleManagement', 'selectItemList', '✅查询车辆列表', 'service', NULL, '{"service":"vehicle","serviceFunction":"selectItemList"}', NULL, NULL, 'insert', NULL, NULL, NULL),
('car-rental-mgmt_v3', NULL, NULL, 'vehicleManagement', 'insertItem', '✅新增车辆', 'service', NULL, '{"service":"vehicle","serviceFunction":"insertItem"}', NULL, NULL, 'insert', NULL, NULL, NULL);

-- 组件接口
INSERT IGNORE INTO `_resource` (`jhId`, `accessControlTable`, `resourceHook`, `pageId`, `actionId`, `desc`, `resourceType`, `appDataSchema`, `resourceData`, `requestDemo`, `responseDemo`, `operation`, `operationByUserId`, `operationByUser`, `operationAt`) VALUES 
('car-rental-mgmt_v3', NULL, NULL, 'vehicleManagement', 'vehiclePriceDialog-deleteSchedule', '✅车辆价格弹框-删除排班', 'service', NULL, '{"service":"vehicle","serviceFunction":"vehiclePriceDialogDeleteSchedule"}', NULL, NULL, 'insert', NULL, NULL, NULL);
```

### 字段说明
- `jhId`: 应用ID，格式为项目名称
- `pageId`: 页面ID，对应页面文件名
- `actionId`: 接口ID，对应方法名或组件接口名
- `desc`: 接口描述，建议以✅开头
- `resourceType`: 资源类型，service表示服务接口
- `resourceData`: 资源数据，JSON格式指定service和serviceFunction

## CRUD的_resource
```
INSERT INTO `car_rental_v3`.`_resource`(`id`, `accessControlTable`, `resourceHook`, `pageId`, `actionId`, `desc`, `resourceType`, `appDataSchema`, `resourceData`, `requestDemo`, `responseDemo`, `operation`, `operationByUserId`, `operationByUser`, `operationAt`) VALUES (293, NULL, NULL, 'demo/protocolDemo', 'selectItemList', '✅应用协议-查询列表', 'sql', '{\n	\"type\": \"object\",\n	\"additionalProperties\": true,\n	\"required\": [],\n	\"properties\": {}\n}', '{\"table\": \"student\", \"operation\": \"select\"}', '', '', 'insert', NULL, NULL, NULL);
INSERT INTO `car_rental_v3`.`_resource`(`id`, `accessControlTable`, `resourceHook`, `pageId`, `actionId`, `desc`, `resourceType`, `appDataSchema`, `resourceData`, `requestDemo`, `responseDemo`, `operation`, `operationByUserId`, `operationByUser`, `operationAt`) VALUES (294, NULL, NULL, 'demo/protocolDemo', 'insertItem', '✅应用协议-添加成员', 'sql', '{\n	\"type\": \"object\",\n	\"required\": [\"actionData\"],\n	\"properties\": {\n		\"actionData\": {\n			\"type\": \"object\",\n			\"required\": [\"classId\", \"name\", \"level\", \"gender\", \"dateOfBirth\"],\n			\"properties\": {\n				\"name\": {\n					\"type\": \"string\"\n				},\n				\"level\": {\n					\"anyOf\": [{\n						\"type\": \"string\"\n					}, {\n						\"type\": \"number\"\n					}]\n				},\n				\"gender\": {\n					\"type\": \"string\"\n				},\n				\"classId\": {\n					\"type\": \"string\"\n				},\n				\"dateOfBirth\": {\n					\"type\": \"string\",\n					\"format\": \"date\"\n				}\n			},\n			\"additionalProperties\": true\n		}\n	},\n	\"additionalProperties\": true\n}', '{\"table\": \"student\", \"operation\": \"insert\"}', '', '', 'insert', NULL, NULL, NULL);
INSERT INTO `car_rental_v3`.`_resource`(`id`, `accessControlTable`, `resourceHook`, `pageId`, `actionId`, `desc`, `resourceType`, `appDataSchema`, `resourceData`, `requestDemo`, `responseDemo`, `operation`, `operationByUserId`, `operationByUser`, `operationAt`) VALUES (295, NULL, NULL, 'demo/protocolDemo', 'updateItem', '✅应用协议-更新成员', 'sql', '{\n	\"type\": \"object\",\n	\"required\": [\"where\", \"actionData\"],\n	\"properties\": {\n		\"where\": {\n			\"type\": \"object\",\n			\"required\": [\"id\"],\n			\"properties\": {\n				\"id\": {\n					\"type\": \"number\"\n				}\n			}\n		},\n		\"actionData\": {\n			\"type\": \"object\",\n			\"properties\": {\n\n				\"studentId\": {\n					\"type\": \"string\"\n				},\n				\"name\": {\n					\"type\": \"string\"\n				},\n				\"level\": {\n					\"anyOf\": [{\n						\"type\": \"string\"\n					}, {\n						\"type\": \"number\"\n					}]\n				},\n				\"gender\": {\n					\"type\": \"string\"\n				},\n				\"classId\": {\n					\"type\": \"string\"\n				},\n				\"dateOfBirth\": {\n					\"type\": \"string\",\n					\"format\": \"date\"\n				}\n			},\n			\"additionalProperties\": true\n		}\n	},\n	\"additionalProperties\": true\n}', '{\"table\": \"student\", \"operation\": \"jhUpdate\"}', '', '', 'insert', NULL, NULL, NULL);
INSERT INTO `car_rental_v3`.`_resource`(`id`, `accessControlTable`, `resourceHook`, `pageId`, `actionId`, `desc`, `resourceType`, `appDataSchema`, `resourceData`, `requestDemo`, `responseDemo`, `operation`, `operationByUserId`, `operationByUser`, `operationAt`) VALUES (296, NULL, NULL, 'demo/protocolDemo', 'deleteItem', '✅应用协议-删除信息', 'sql', '{\n	\"type\": \"object\",\n	\"required\": [\"where\"],\n	\"properties\": {\n		\"where\": {\n			\"type\": \"object\",\n			\"required\": [\"id\"],\n			\"properties\": {\n				\"id\": {\n					\"type\": \"number\"\n				}\n			},\n			\"additionalProperties\": true\n		}\n	},\n	\"additionalProperties\": true\n}', '{\"table\": \"student\", \"operation\": \"jhDelete\"}', '', '', 'insert', NULL, NULL, NULL);

```

## Service文件组织和开发规范

### Service文件结构和命名
- **文件位置**: `app/service/`
- **文件命名**: 使用驼峰命名，首字母小写，如 `userManagement.js`
- **类继承**: 必须继承 `egg.Service`

### Service层文件分配原则
- **基础主表业务**: 使用驼峰命名，如：`serviceOrder.js`
- **扩展表业务**: 按业务类型命名，如：`rentalServiceOrder.js`、`packageServiceOrder.js`
- **对应关系**: 
  - `service_order`（主表）→ `serviceOrder.js`
  - `service_order_ext_rental`（扩展表）→ `rentalServiceOrder.js`

### jianghuKnex vs knex 使用场景

**jianghuKnex 特性**
- **自动填充操作信息**: 传入 `this.ctx` 时自动填充当前用户的登录信息到 `operation`、`operationByUserId`、`operationByUser`、`operationAt` 字段
- **操作记录**: 自动往 `_record_history` 表写入数据操作记录
- **适用场景**: 需要记录操作者信息和操作历史的业务操作

**knex 使用场景**
- **复杂查询**: 进行比较复杂的查询操作
- **不关心操作者**: 不需要记录操作者信息
- **性能优化**: 避免不必要的操作记录写入

### Service基础模板

```javascript
'use strict';
const Service = require('egg').Service;
const _ = require("lodash");
const dayjs = require('dayjs');
const validateUtil = require('@jianghujs/jianghu/app/common/validateUtil');
const { BizError, errorInfoEnum } = require('../constant/error');

class ServiceNameService extends Service {
  
  constructor(ctx) {
    super(ctx);
    // 定义数据校验规则 - 方法名保持简洁
    this.actionDataSchema = Object.freeze({
      insertItem: {
        type: 'object',
        additionalProperties: true,
        required: ['name'],
        properties: {
          name: { type: 'string', minLength: 1 },
          description: { type: 'string' },
          status: { type: 'string', enum: ['active', 'inactive'] }
        }
      },
      updateItem: {
        type: 'object',
        additionalProperties: true,
        required: ['name'],
        properties: {
          name: { type: 'string', minLength: 1 },
          description: { type: 'string' },
          status: { type: 'string', enum: ['active', 'inactive'] }
        }
      }
    });
  }
  
  // 查询列表 - 使用jianghuKnex（推荐）
  // 注意：一般列表查询建议使用SQL类型的resource配置，不需要创建service方法
  // 只有在需要特殊业务逻辑处理时才创建此类方法
  async selectItemList() {
    const { jianghuKnex } = this.app;
    const { actionData } = this.ctx.request.body.appData;
    
    // 构建查询条件
    const result = await jianghuKnex('view01_table_name', this.ctx)
      .where({ rowStatus: '正常' })
      .where('name', 'like', `%${actionData.keyword || ''}%`)
      .select();
      
    return result;
  }

  // 新增数据 - 使用jianghuKnex
  async insertItem() {
    const { jianghuKnex } = this.app;
    const { actionData } = this.ctx.request.body.appData;
    
    // 1. 数据格式校验
    validateUtil.validate(this.actionDataSchema.insertItem, actionData);
    
    // 2. 业务规则校验
    const existingItem = await jianghuKnex('table_name', this.ctx)
      .where({ name: actionData.name })
      .first();
      
    if (existingItem) {
      throw new BizError(errorInfoEnum.data_already_exists);
    }
    
    // 3. 执行插入，自动记录操作者信息和操作历史
    const result = await jianghuKnex('table_name', this.ctx).insert(actionData);
    return result;
  }

  // 更新数据 - 使用jianghuKnex
  async updateItem() {
    const { jianghuKnex } = this.app;
    const { actionData, where } = this.ctx.request.body.appData;
    
    // 1. 数据格式校验
    validateUtil.validate(this.actionDataSchema.updateItem, actionData);
    
    // 2. 检查记录是否存在
    const existingItem = await jianghuKnex('table_name', this.ctx)
      .where(where)
      .first();
      
    if (!existingItem) {
      throw new BizError(errorInfoEnum.data_not_found);
    }
    
    // 3. 执行更新，自动记录操作者信息和操作历史
    const result = await jianghuKnex('table_name', this.ctx)
      .where(where)
      .update(actionData);
    return result;
  }

  // 删除数据（软删除）- 使用jianghuKnex
  async deleteItem() {
    const { jianghuKnex } = this.app;
    const { where } = this.ctx.request.body.appData;
    
    // 检查记录是否存在
    const existingItem = await jianghuKnex('table_name', this.ctx)
      .where(where)
      .first();
      
    if (!existingItem) {
      throw new BizError(errorInfoEnum.data_not_found);
    }
    
    // 执行软删除，自动记录操作者信息和操作历史
    const result = await jianghuKnex('table_name', this.ctx)
      .where(where)
      .update({ rowStatus: '回收站' });
    return result;
  }
}

module.exports = ServiceNameService;
```

## _resource配置详细规范

### _resource表结构说明
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

### SQL类型的_resource配置

```sql
-- 查询列表（可以直接查询视图）
INSERT IGNORE INTO `_resource` (`jhId`, `pageId`, `actionId`, `desc`, `resourceType`, `appDataSchema`, `resourceData`) 
VALUES ('your-app-id', 'userManagement', 'selectItemList', '✅用户管理-查询列表', 'sql', 
'{"type": "object", "additionalProperties": true, "required": [], "properties": {}}', 
'{"table": "view01_user_list", "operation": "select"}');

-- 新增数据（操作基础表）
INSERT IGNORE INTO `_resource` (`jhId`, `pageId`, `actionId`, `desc`, `resourceType`, `appDataSchema`, `resourceData`) 
VALUES ('your-app-id', 'userManagement', 'insertItem', '✅用户管理-新增用户', 'sql', 
'{"type": "object", "required": ["actionData"], "properties": {"actionData": {"type": "object", "required": ["name"], "properties": {"name": {"type": "string"}}}}}', 
'{"table": "user", "operation": "insert"}');

-- 更新数据（操作基础表）
INSERT IGNORE INTO `_resource` (`jhId`, `pageId`, `actionId`, `desc`, `resourceType`, `appDataSchema`, `resourceData`) 
VALUES ('your-app-id', 'userManagement', 'updateItem', '✅用户管理-更新用户', 'sql', 
'{"type": "object", "required": ["where", "actionData"], "properties": {"where": {"type": "object", "required": ["id"]}}}', 
'{"table": "user", "operation": "jhUpdate"}');

-- 删除数据（操作基础表）
INSERT IGNORE INTO `_resource` (`jhId`, `pageId`, `actionId`, `desc`, `resourceType`, `appDataSchema`, `resourceData`) 
VALUES ('your-app-id', 'userManagement', 'deleteItem', '✅用户管理-删除用户', 'sql', 
'{"type": "object", "required": ["where"], "properties": {"where": {"type": "object", "required": ["id"]}}}', 
'{"table": "user", "operation": "jhDelete"}');
```

### Service类型的_resource配置

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

## 接口设计和开发规范

### 命名规范
- **命名格式**: 使用驼峰命名法，动词+名词格式
- **保持简洁**: 不重复service文件名或表名信息
- **查询**: `selectItemList`, `selectItemById`, `selectItemCount`
- **新增**: `insertItem`, `insertItemConfig`, `batchInsertItem`
- **更新**: `updateItem`, `updateItemStatus`, `updateItemById`
- **删除**: `deleteItem`, `deleteItemById`, `batchDeleteItem`

#### 实际命名示例
```javascript
// vehicleSchedule.js 文件中的方法命名
class VehicleScheduleService extends Service {
  async selectItemList() { }          // 查询排班列表
  async selectScheduleConfig() { }        // 查询配置
  async insertSchedule() { }      // 新增排班
  async insertScheduleConfig() { }        // 新增配置
  async batchInsertScheduleConfig() { }   // 批量新增配置
  async updateSchedule() { }      // 更新排班
  async updateScheduleStatus() { }        // 更新状态
  async deleteSchedule() { }      // 删除排班
}

// vehicle.js 文件中的方法命名
class VehicleService extends Service {
  async selectItemList() { }          // 查询车辆列表
  async insertItem() { }          // 新增车辆
  async updateItem() { }          // 更新车辆
  async updateItemStatus() { }        // 更新车辆状态
  async deleteItem() { }          // 删除车辆
}
```

### 参数规范
- **查询参数**: 放在 `actionData` 中
- **条件参数**: 放在 `where` 中
- **分页参数**: 使用 `tableParams`

### 错误处理
- 使用 `BizError` 抛出业务异常
- 引用 `errorInfoEnum` 中定义的错误类型
- 所有业务异常必须在 `app/constant/error.js` 中预定义
- 进行必要的数据校验和边界检查

### 错误定义规范
在 `app/constant/error.js` 中定义所有业务错误：
```javascript
'use strict';

class BizError extends Error {
  constructor({ errorCode, errorReason, errorReasonSupplement }) {
    super(JSON.stringify({ errorCode, errorReason, errorReasonSupplement }));
    this.name = 'BizError';
    this.errorCode = errorCode;
    this.errorReason = errorReason;
    this.errorReasonSupplement = errorReasonSupplement;
  }
}

const errorInfoEnum = {
  // 通用错误
  data_exception: { errorCode: 'data_exception', errorReason: '数据异常' },
  data_not_found: { errorCode: 'data_not_found', errorReason: '数据不存在' },
  data_already_exists: { errorCode: 'data_already_exists', errorReason: '数据已存在' },
  
  // 订单相关错误
  order_time_invalid: { errorCode: 'order_time_invalid', errorReason: '订单时间设置无效' },
  order_amount_invalid: { errorCode: 'order_amount_invalid', errorReason: '订单金额无效' },
  order_status_error: { errorCode: 'order_status_error', errorReason: '订单状态异常' },
  
  // 用户相关错误
  customer_phone_exist: { errorCode: 'customer_phone_exist', errorReason: '该手机号已被使用' },
  customer_not_found: { errorCode: 'customer_not_found', errorReason: '客户信息不存在' },
  phone_already_exists: { errorCode: 'phone_already_exists', errorReason: '手机号码已存在' },
};

module.exports = {
  BizError,
  errorInfoEnum,
};
```

### 接口数据校验规范

### 校验原则
- **查询类接口**: 不需要做严格的数据格式校验，但需要进行基本的安全检查
- **增删改接口**: 必须进行完整的数据格式校验和业务规则校验
- **统一使用actionDataSchema**: 在constructor中定义所有方法的校验规则

### 校验实现标准

#### 1. 引入必要工具
```javascript
const validateUtil = require('@jianghujs/jianghu/app/common/validateUtil');
const { BizError, errorInfoEnum } = require('../constant/error');
```

#### 2. 在constructor中定义校验规则
```javascript
constructor(ctx) {
  super(ctx);
  this.actionDataSchema = Object.freeze({
    insertItem: {
      type: 'object',
      additionalProperties: true,
      required: ['name', 'type'],
      properties: {
        name: { type: 'string', minLength: 1, maxLength: 100 },
        type: { type: 'string', enum: ['type1', 'type2', 'type3'] },
        phone: { type: 'string', pattern: '^1[3-9]\\d{9}$' },
        email: { type: 'string', format: 'email' },
        age: { type: 'integer', minimum: 0, maximum: 150 },
        status: { type: 'string', enum: ['active', 'inactive'] }
      }
    },
    updateItem: {
      type: 'object',
      additionalProperties: true,
      required: ['name'],
      properties: {
        name: { type: 'string', minLength: 1, maxLength: 100 },
        type: { type: 'string', enum: ['type1', 'type2', 'type3'] },
        phone: { type: 'string', pattern: '^1[3-9]\\d{9}$' },
        email: { type: 'string', format: 'email' },
        age: { type: 'integer', minimum: 0, maximum: 150 },
        status: { type: 'string', enum: ['active', 'inactive'] }
      }
    },
    passwordLogin: {
      type: 'object',
      additionalProperties: true,
      required: ['userId', 'password', 'deviceId'],
      properties: {
        userId: { type: 'string', minLength: 3, maxLength: 50 },
        password: { type: 'string', minLength: 6 },
        deviceId: { type: 'string', minLength: 1 },
        deviceType: { type: 'string', enum: ['web', 'mobile', 'desktop'] },
        needSetCookies: { anyOf: [{ type: 'boolean' }, { type: 'null' }] }
      }
    }
  });
}
```

#### 3. 在方法中使用校验
```javascript
async insertItem() {
  const { jianghuKnex } = this.app;
  const { actionData } = this.ctx.request.body.appData;
  
  // 1. 数据格式校验
  validateUtil.validate(this.actionDataSchema.insertItem, actionData);
  
  // 2. 业务规则校验（如果需要）
  await this._validateBusinessRules(actionData);
  
  // 3. 执行业务逻辑
  const result = await jianghuKnex('table_name', this.ctx).insert(actionData);
  return result;
}

async updateItem() {
  const { jianghuKnex } = this.app;
  const { actionData, where } = this.ctx.request.body.appData;
  
  // 1. 数据格式校验
  validateUtil.validate(this.actionDataSchema.updateItem, actionData);
  
  // 2. 业务规则校验（如果需要）
  await this._validateBusinessRules(actionData);
  
  // 3. 执行业务逻辑
  const result = await jianghuKnex('table_name', this.ctx).where(where).update(actionData);
  return result;
}
```

#### 4. 业务规则校验抽取
```javascript
// 将业务规则校验抽取为私有方法
async _validateBusinessRules(actionData) {
  const { jianghuKnex } = this.app;
  
  // 检查数据唯一性
  if (actionData.phone) {
    const existingRecord = await jianghuKnex('table_name', this.ctx)
      .where({ phone: actionData.phone })
      .whereNot({ rowStatus: '回收站' })
      .first();
      
    if (existingRecord) {
      throw new BizError(errorInfoEnum.phone_already_exists);
    }
  }
  
  // 其他业务规则校验...
}
```

### 常用校验规则参考

#### 数据类型校验
```javascript
// 字符串类型
name: { type: 'string', minLength: 1, maxLength: 100 }

// 数字类型
age: { type: 'integer', minimum: 0, maximum: 150 }
price: { type: 'number', minimum: 0 }

// 枚举类型
status: { type: 'string', enum: ['active', 'inactive', 'pending'] }

// 日期格式
birthday: { type: 'string', format: 'date' }
createAt: { type: 'string', format: 'date-time' }

// 正则校验
phone: { type: 'string', pattern: '^1[3-9]\\d{9}$' }
idCard: { type: 'string', pattern: '^[1-9]\\d{5}(18|19|20)\\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$' }

// 邮箱格式
email: { type: 'string', format: 'email' }

// 可选字段
description: { type: ['string', 'null'] }
```

## 代码复用最佳实践

### 公共逻辑抽取规范

#### 1. 复杂业务逻辑抽取
```javascript
class OrderService extends Service {
  
  // ✅ 推荐：抽取复杂的业务处理逻辑
  async _processOrderPayment(orderData, paymentMethod) {
    const { jianghuKnex } = this.app;
    
    // 复杂的支付处理逻辑
    let finalAmount = orderData.baseAmount;
    
    // 应用折扣规则
    if (orderData.discountCode) {
      const discount = await this._calculateDiscount(orderData.discountCode, orderData.customerLevel);
      finalAmount = finalAmount * (1 - discount);
    }
    
    // 计算税费
    const tax = await this._calculateTax(finalAmount, orderData.region);
    finalAmount = finalAmount + tax;
    
    // 处理支付方式手续费
    if (paymentMethod === 'credit_card') {
      finalAmount = finalAmount * 1.03; // 3%手续费
    }
    
    return {
      finalAmount: Math.round(finalAmount * 100) / 100, // 保留两位小数
      tax,
      discountApplied: orderData.discountCode ? true : false
    };
  }
  
  // 复用复杂业务逻辑
  async createOrder() {
    const { actionData } = this.ctx.request.body.appData;
    
    // 使用抽取的复杂逻辑
    const paymentInfo = await this._processOrderPayment(actionData, actionData.paymentMethod);
    
    // 创建订单记录
    const orderData = {
      ...actionData,
      finalAmount: paymentInfo.finalAmount,
      tax: paymentInfo.tax,
      discountApplied: paymentInfo.discountApplied
    };
    
    const { jianghuKnex } = this.app;
    return await jianghuKnex('service_order', this.ctx).insert(orderData);
  }
  
  async updateOrderPayment() {
    const { actionData } = this.ctx.request.body.appData;
    
    // 复用相同的复杂逻辑
    const paymentInfo = await this._processOrderPayment(actionData, actionData.newPaymentMethod);
    
    const { jianghuKnex } = this.app;
    return await jianghuKnex('service_order', this.ctx)
      .where({ orderId: actionData.orderId })
      .update({
        paymentMethod: actionData.newPaymentMethod,
        finalAmount: paymentInfo.finalAmount,
        tax: paymentInfo.tax
      });
  }
}
```

#### 2. 复杂业务校验复用
```javascript
const validateUtil = require('@jianghujs/jianghu/app/common/validateUtil');
const { BizError, errorInfoEnum } = require('../constant/error');

class VehicleService extends Service {
  
  // ✅ 推荐：抽取复杂的业务校验逻辑
  async _validateVehicleAvailability(vehicleId, startTime, endTime, excludeOrderId = null) {
    const { jianghuKnex } = this.app;
    
    // 检查车辆是否存在且可用
    const vehicle = await jianghuKnex('vehicle', this.ctx)
      .where({ vehicleId, rowStatus: '正常' })
      .first();
      
    if (!vehicle) {
      throw new BizError(errorInfoEnum.vehicle_not_found);
    }
    
    if (vehicle.status !== '可用') {
      throw new BizError(errorInfoEnum.vehicle_not_available);
    }
    
    // 检查时间段是否冲突
    let conflictQuery = jianghuKnex('service_order', this.ctx)
      .where({ vehicleId, rowStatus: '正常' })
      .where('orderStatus', 'in', ['confirmed', 'in_progress'])
      .where(function() {
        this.whereBetween('startTime', [startTime, endTime])
            .orWhereBetween('endTime', [startTime, endTime])
            .orWhere(function() {
              this.where('startTime', '<=', startTime)
                  .where('endTime', '>=', endTime);
            });
      });
      
    if (excludeOrderId) {
      conflictQuery = conflictQuery.whereNot({ orderId: excludeOrderId });
    }
    
    const conflictOrders = await conflictQuery.select();
    
    if (conflictOrders.length > 0) {
      throw new BizError(errorInfoEnum.vehicle_time_conflict);
    }
    
    return true;
  }
  
  // 复用复杂校验逻辑
  async createRentalOrder() {
    const { actionData } = this.ctx.request.body.appData;
    
    // 1. 基础数据校验
    validateUtil.validate(this.actionDataSchema.createRentalOrder, actionData);
    
    // 2. 复杂业务校验
    await this._validateVehicleAvailability(
      actionData.vehicleId, 
      actionData.startTime, 
      actionData.endTime
    );
    
    // 3. 创建订单
    const { jianghuKnex } = this.app;
    return await jianghuKnex('service_order', this.ctx).insert(actionData);
  }
  
  async updateRentalOrder() {
    const { actionData, where } = this.ctx.request.body.appData;
    
    // 1. 基础数据校验
    validateUtil.validate(this.actionDataSchema.updateRentalOrder, actionData);
    
    // 2. 复用相同的复杂校验逻辑，排除当前订单
    await this._validateVehicleAvailability(
      actionData.vehicleId, 
      actionData.startTime, 
      actionData.endTime,
      where.orderId
    );
    
    // 3. 更新订单
    const { jianghuKnex } = this.app;
    return await jianghuKnex('service_order', this.ctx).where(where).update(actionData);
  }
}
```

#### 3. 工具方法复用
```javascript
class VehicleService extends Service {
  
  // ✅ 推荐：抽取可复用的工具方法
  _calculateRentalPrice(vehicleType, days, seasonRate = 1.0) {
    const basePrice = {
      '经济型': 200,
      '舒适型': 300,
      '豪华型': 500
    };
    
    return basePrice[vehicleType] * days * seasonRate;
  }
  
  // 抽取状态更新逻辑
  async _updateVehicleStatus(vehicleId, status, remark = '') {
    const { jianghuKnex } = this.app;
    return await jianghuKnex('vehicle', this.ctx)
      .where({ vehicleId })
      .update({
        status,
        statusUpdateTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        remark
      });
  }
  
  // 复用工具方法的具体业务方法
  async calculateOrderPrice() {
    const { actionData } = this.ctx.request.body.appData;
    const { vehicleType, rentalDays, isSeason } = actionData;
    
    const seasonRate = isSeason ? 1.5 : 1.0;
    const totalPrice = this._calculateRentalPrice(vehicleType, rentalDays, seasonRate);
    
    return { totalPrice };
  }
  
  async rentVehicle() {
    const { actionData } = this.ctx.request.body.appData;
    // 其他业务逻辑...
    await this._updateVehicleStatus(actionData.vehicleId, '已租出', '车辆租赁');
  }
  
  async returnVehicle() {
    const { actionData } = this.ctx.request.body.appData;
    // 其他业务逻辑...
    await this._updateVehicleStatus(actionData.vehicleId, '可用', '车辆归还');
  }
}
```

**抽取原则**：
- **复杂业务逻辑**：多步骤计算、复杂校验、业务规则处理
- **工具方法**：价格计算、状态更新、数据格式化等
- **避免过度抽取**：简单的查询逻辑不需要抽取成单独方法

### 参数化设计模式

#### 业务逻辑参数化
```javascript
class VehicleService extends Service {
  
  // ✅ 推荐：参数化的业务方法，避免重复逻辑
  async updateVehicleStatus(vehicleId, status, remark = '') {
    const { jianghuKnex } = this.app;
    
    // 检查车辆是否存在
    const vehicle = await jianghuKnex('vehicle', this.ctx)
      .where({ vehicleId })
      .first();
      
    if (!vehicle) {
      throw new BizError(errorInfoEnum.vehicle_not_found);
    }
    
    // 更新状态
    return await jianghuKnex('vehicle', this.ctx)
      .where({ vehicleId })
      .update({
        status,
        remark,
        statusUpdateTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
      });
  }
  
  // 复用参数化方法
  async rentVehicle() {
    const { actionData } = this.ctx.request.body.appData;
    return await this.updateVehicleStatus(actionData.vehicleId, '已租出', '车辆租赁');
  }
  
  async returnVehicle() {
    const { actionData } = this.ctx.request.body.appData;
    return await this.updateVehicleStatus(actionData.vehicleId, '可用', '车辆归还');
  }
  
  async maintainVehicle() {
    const { actionData } = this.ctx.request.body.appData;
    return await this.updateVehicleStatus(actionData.vehicleId, '维修中', '车辆维修');
  }
}
```

**注意**：不要创建通用的列表查询方法，优先使用SQL类型的resource配置。

## 方法重复检查流程

### 开发前检查清单

#### 1. 当前文件方法梳理
- 查看当前service文件中已有的所有方法
- 分析每个方法的功能和输入输出
- 识别可能存在功能重叠的方法

#### 2. 功能相似性分析
```javascript
// 检查清单示例
/*
当前需要新增：selectUsersByRole() - 按角色查询用户

现有方法检查：
- selectUserList() - 查询用户列表，支持关键字搜索
- selectActiveUsers() - 查询活跃用户
- selectUsersByStatus() - 按状态查询用户

分析结果：
- selectUsersByStatus() 功能相似，可以通过参数扩展支持角色查询
- 建议改造 selectUsersByStatus() 为 selectUsersByCondition()
*/
```

#### 3. 重构决策流程
```
新功能需求 -> 检查现有方法 -> 评估重构成本 -> 决策
                     |              |
                   无相似          成本低
                     |              |
                 直接新增    -> 重构现有方法
                     
                   有相似          成本高  
                     |              |
                 评估重构    -> 新增方法并标记TODO重构
```

### 代码审查重点

#### 检查项清单
1. **功能重复检查**
   - 是否存在功能完全相同的方法
   - 是否存在可以通过参数配置统一的相似方法

2. **命名一致性检查**
   - 相似功能的方法是否遵循统一命名规范
   - 方法名是否能清晰表达其功能差异

3. **代码复用检查**
   - 是否存在重复的代码块可以抽取为私有方法
   - 是否存在可以参数化的相似逻辑

### 重构指导原则

#### 优先级顺序
1. **高优先级**：功能完全重复 → 必须合并
2. **中优先级**：逻辑相似度>70% → 建议重构
3. **低优先级**：仅部分逻辑相似 → 抽取公共部分

#### 重构策略
```javascript
// ❌ 重构前：功能重复
async selectUsersByRole() {
  return jianghuKnex('user').where({ role: 'admin' }).select();
}

async selectUsersByStatus() {
  return jianghuKnex('user').where({ status: 'active' }).select();
}

async selectUsersByDepartment() {
  return jianghuKnex('user').where({ department: 'IT' }).select();
}

// ✅ 重构后：统一参数化
async selectUsersByCondition(conditions = {}) {
  const { jianghuKnex } = this.app;
  let query = jianghuKnex('user', this.ctx);
  
  Object.keys(conditions).forEach(key => {
    if (conditions[key] !== undefined) {
      query = query.where(key, conditions[key]);
    }
  });
  
  return query.select();
}

// 保留原有接口，内部调用统一方法
async selectUsersByRole(role) {
  return this.selectUsersByCondition({ role });
}
```

## 日期时间处理规范

### 数据库字段类型
- **日期时间字段**: 数据库中所有日期时间字段统一使用 `varchar` 类型，不使用 `datetime` 或 `timestamp`
- **字段长度**: 日期时间字段建议设置为 `varchar(255)`，日期字段建议设置为 `varchar(20)`

### 日期格式标准
- **完整日期时间**: `YYYY-MM-DD HH:mm:ss` 格式，如：`2023-10-15 14:30:25`
- **日期格式**: `YYYY-MM-DD` 格式，如：`2023-10-15`
- **时间格式**: `HH:mm:ss` 格式，如：`14:30:25`

### 代码实现方式
```javascript
// ✅ 推荐：使用 dayjs 生成日期时间字符串
const dayjs = require('dayjs');

const currentDateTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
// 结果：'2023-10-15 14:30:25'

const currentDate = dayjs().format('YYYY-MM-DD');
// 结果：'2023-10-15'

const currentTime = dayjs().format('HH:mm:ss');
// 结果：'14:30:25'
```

### Service层日期处理示例
```javascript
class ServiceNameService extends Service {
  async insertItem() {
    const { jianghuKnex } = this.app;
    const { actionData } = this.ctx.request.body.appData;

    // 添加创建时间
    const itemData = {
      ...actionData,
      createAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      updateAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
    };

    const result = await jianghuKnex('table_name', this.ctx).insert(itemData);
    return result;
  }

  async updateItem() {
    const { jianghuKnex } = this.app;
    const { actionData, where } = this.ctx.request.body.appData;

    // 添加更新时间
    const updateData = {
      ...actionData,
      updateAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
    };

    const result = await jianghuKnex('table_name', this.ctx)
      .where(where)
      .update(updateData);
    return result;
  }
}
```

### 注意事项
- **dayjs优势**: dayjs是轻量级日期库，API简洁，支持链式调用
- **时区处理**: dayjs默认使用本地时区，如需其他时区可使用插件
- **常用格式**: 统一使用 `dayjs().format('YYYY-MM-DD HH:mm:ss')` 格式化日期时间
```javascript
// 常用日期操作示例
const dayjs = require('dayjs');

// 当前时间
const now = dayjs().format('YYYY-MM-DD HH:mm:ss');

// 指定日期
const specificDate = dayjs('2023-10-15').format('YYYY-MM-DD');

// 日期计算
const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD');
const lastWeek = dayjs().subtract(7, 'day').format('YYYY-MM-DD');
```

## 最佳实践
1. **优先使用SQL类型resource**: 一般的CRUD操作使用SQL类型resource配置，框架会自动处理常用查询参数，无需创建service方法
2. **谨慎创建service方法**: 只有在需要复杂业务逻辑、多表事务、特殊数据处理时才创建service方法，且需要经过确认
3. **方法命名简洁**: service方法名保持简洁，不重复文件名或表名，使用 `selectItemList`、`insertItem`、`updateItemStatus` 等简洁命名
4. **优先使用jianghuKnex**: 在service方法中，除非是复杂查询，否则优先使用jianghuKnex
5. **数据校验**: 在service层进行基础的数据校验，使用validateUtil进行参数验证
6. **错误处理**: 统一使用框架提供的错误处理机制，所有业务异常必须在error.js中预定义
7. **代码复用**: 新增方法前必须检查重复，抽取公共逻辑，减少代码冗余
8. **方法设计**: 优先考虑参数化设计，一个灵活的方法胜过多个功能相似的方法
9. **避免过度设计**: 不要创建"通用"的复杂查询方法，每个业务场景使用对应的SQL类型resource配置
10. **日期处理**: 数据库日期字段使用varchar类型，统一使用dayjs进行日期格式化

