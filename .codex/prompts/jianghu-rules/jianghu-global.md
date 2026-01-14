---
trigger: always_on
description: 江湖JS通用规范
---

你是一个全栈开发工程师，你正在开发一个全栈的项目。

# 项目编码规范

本规范旨在提高代码质量、可读性和可维护性，降低团队协作成本。所有项目成员都应遵循本规范。

## 一、代码规范

代码规范是一套约定俗成的编码规则和标准，可以帮助团队成员编写一致的代码，提高代码的可读性、可维护性和可扩展性。

### 1.1 提高代码可读性

- **良好的命名规范**：变量、函数、类等命名应该具有描述性，并且符合团队或项目的命名规范。命名应该清晰、简洁、具有意义。
- **清晰的代码结构**：代码应该具有良好的结构，包括合理的缩进、适当的空格、明确的代码块和逻辑流程等。
- **注释和文档**：只写必要的逻辑注释，避免写一眼就能看出来的冗余注释。注释应该解释复杂的业务逻辑、算法思路或非显而易见的实现原因，而不是描述显而易见的代码行为。
- **避免过于复杂的逻辑**：尽量避免过于复杂的条件语句、嵌套和循环结构。可以考虑使用函数、类等方式来提取和封装复杂的逻辑。
- **一致的代码风格**：团队或项目应该遵循一致的代码风格和规范，包括缩进、命名、注释等方面。
- **一个组件只做件事情**: 为了保持代码的简洁，像弹框之类的一些内容，可以封装成一个独立的组件，放在views/components/页面名称 目录下。

### 1.2 变量 (Variable)

- 变量名最关键的是可读性。
- 推荐使用全名或者社区公认的缩写。
- 对于复杂的判断、正则表达式等，应使用过程变量来提高可读性。

### 1.3 函数 (Function)

- **函数命名**:
    - 推荐使用 `(副词) + 动词 + 名词` 的格式，例如 `getUserInfo`。
    - 数据库操作相关的函数，增删改查建议使用 `insert`/`add`/`create`, `delete`/`remove`, `update`, `get`/`select` 等关键字。
- **单一职责**: 一个函数只做一件事情。
- **函数式编程**: 鼓励使用函数式编程风格进行数据操作 (如数组的 `map`, `filter`, `reduce` 等)。
- **Async/Await**: 异步操作优先使用 `Async/Await`。
- **对象参数**: 当函数参数较多时，推荐使用对象作为参数，并利用 `Object.assign` 或解构赋值来设置默认值。
- **三元表达式**: 使用三元表达式替代简单的 `if-else`，但避免在逻辑表达式中直接返回变量，保证返回的是明确的布尔值或常量。
- **代码冗余**: 有一些方法为了保证逻辑独立且拓展性更强考虑，代码可以不要合并

### 1.4 模块 (Module/Class)

- **组合优于继承**: 优先使用组合模式而非继承。
- **高内聚**: 将相关的数据和函数放在一起，封装成模块或类。
- **ES6 Classes**: 推荐使用 ES6 的 `class` 语法。
- **开闭原则**: 易于扩展，难于修改。通过封装私有属性、提供 getter/setter 等方式实现。
- **里氏替换原则**: 子类对象应该能够替换其超类对象被使用。
- **依赖注入**: 鼓励使用控制反转（IoC）和依赖注入来管理对象依赖。

## 二、后端代码规范

### 2.1 基本要求
- 所有 JS 文件头部需要添加 `'use strict';` 开启严格模式。
- 遵循 `egg.js` 和 `@JianghuJS` 的开发规范。

### 2.2 模块导入
- 核心模块: `const Service = require('egg').Service;`
- 第三方库: `const _ = require("lodash");`
- 内部模块: `const { BizError, errorInfoEnum } = require('../constant/error');`

### 2.3 Service 规范
- Service 类必须继承自 `egg.Service`。
- 通过 `this.ctx` 获取上下文，通过 `this.app` 获取应用实例。
- 数据库操作使用 `this.app.jianghuKnex`。
- 日志记录使用 `this.app.logger`。
- 异步方法必须使用 `async/await`。

```javascript
'use strict';
const Service = require('egg').Service;
const _ = require("lodash");
const dayjs = require('dayjs');
const { BizError, errorInfoEnum } = require('../constant/error');

class MyService extends Service {
  async someAsyncTask() {
    const { jianghuKnex, logger } = this.app;
    const { actionData } = this.ctx.request.body.appData;

    // 记录日志
    logger.info('start some task', actionData);

    // 数据库查询
    const result = await jianghuKnex('my_table').where({ id: actionData.id }).first();

    return result;
  }
}
```

### 2.4 工具库使用
- **Lodash**: 推荐在进行复杂的数据操作（如集合、数组、对象的处理）时使用 `lodash`，以简化代码，提高可读性。

## 三、前端代码规范

### 3.1 技术栈
- 核心框架: Vue.js
- UI 框架: Vuetify + TailwindCSS
- 模板引擎: Nunjucks
- 工具库: Lodash

### 3.2 文件结构
- 页面（`.html`）存放在 `app/view/page/` 目录下。
- 页面继承自 `template/jhTemplateV4.html`。
- 主要逻辑包裹在 `<script type="text/html" id="app-template">` 中。

### 3.3 组件使用
- 页面顶层组件为 `<v-app>`。
- 大量使用 Vuetify 组件，如 `<v-main>`, `<v-row>`, `<v-col>`, `<v-btn>`, `<v-text-field>` 等。

### 3.4 代码风格
- 使用 `@` 或 `v-on:` 进行事件绑定，并统一通过 `doUiAction` 调用方法，例如 `@click="doUiAction('getTableData')"`。
- 使用 `doUiAction('actionName', ...args)` 的方法来触发 UI 层的动作，所有事件建议统一通过此方法调用，以保持事件处理逻辑的统一性。
- 前端代码中已全局引入 `lodash` (`_`)，推荐在进行复杂数据操作时使用，以简化代码。

```html
{% extends 'template/jhTemplateV4.html'%}
{% block vueTemplate %}
<script type="text/html" id="app-template">
<div>
  <v-app>
    <jh-menu />
    <v-main>
      <v-btn @click="getTableData">查询</v-btn>
      <v-data-table
        :headers="headers"
        :items="tableData">
        <template v-slot:item.action="{ item }">
          <v-icon @click="editItem(item)">mdi-pencil</v-icon>
        </template>
      </v-data-table>
    </v-main>
  </v-app>
</div>
</script>
{% endblock %}
```

## 四、数据库规范

### 4.1 命名规范
- **表名 (Table)**: 使用下划线命名法（`snake_case`），例如 `feedback_follow_up`。
- **字段名 (Column)**: 优先使用小驼峰命名法（`camelCase`），例如 `feedbackId`, `followUpUserId`。

### 4.2 表结构
- 必须包含主键 `id`，类型为 `int` 或 `bigint`，自增。
- 必须包含 `COMMENT`，清晰地描述表或字段的用途。
- **操作记录**: 推荐每个表都包含以下字段，用于记录数据变更历史：
  - `operation` (varchar): 操作类型，如 `insert`, `update`, `delete`。
  - `operationByUserId` (varchar): 操作者 ID。
  - `operationByUser` (varchar): 操作者用户名。
  - `operationAt` (datetime): 操作时间。

### 4.3 SQL 语句
- SQL 关键字大写，例如 `CREATE TABLE`, `SELECT`, `INSERT`, `UPDATE`。
- 库名、表名、字段名使用反引号 `` ` `` 包裹。

```sql
CREATE TABLE IF NOT EXISTS `feedback_follow_up` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `feedbackId` varchar(255) DEFAULT NULL COMMENT '反馈ID',
  `followUpUserId` varchar(255) DEFAULT NULL COMMENT '回访人ID',
  `operation` varchar(255) DEFAULT 'insert' COMMENT '操作: insert, update, jhDelete',
  `operationByUserId` varchar(255) DEFAULT NULL COMMENT '操作者userId',
  `operationByUser` varchar(255) DEFAULT NULL COMMENT '操作者用户名',
  `operationAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '操作时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='反馈回访记录';
```

### 4.4 数据字典规范

数据字典是江湖JS项目中用于管理系统常量和枚举值的标准化解决方案。所有的业务状态、类型、分类等枚举数据都应统一存储在 `_constant` 表中，通过标准化的配置和前端工具类实现数据的一致性管理。

#### 4.4.1 `_constant` 表结构

```sql
CREATE TABLE `_constant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `constantKey` varchar(255) DEFAULT NULL COMMENT '常量键名',
  `constantType` varchar(255) DEFAULT NULL COMMENT '常量类型; object, array',
  `desc` varchar(255) DEFAULT NULL COMMENT '描述',
  `constantValue` text COMMENT '常量内容; object, array',
  `operation` varchar(255) DEFAULT 'insert' COMMENT '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore',
  `operationByUserId` varchar(255) DEFAULT NULL COMMENT '操作者userId',
  `operationByUser` varchar(255) DEFAULT NULL COMMENT '操作者用户名',
  `operationAt` varchar(255) DEFAULT NULL COMMENT '操作时间; E.g: 2021-05-28T10:24:54+08:00 ',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='常量表; 软删除未启用;';
```

#### 4.4.2 字段说明

- **constantKey**: 常量的唯一标识符，使用驼峰命名法，如 `orderStatus`, `userType`
- **constantType**: 常量类型，目前支持 `array`（数组）和 `object`（对象）
- **desc**: 常量的中文描述，便于理解和维护
- **constantValue**: 存储JSON格式的常量内容

#### 4.4.3 配置格式标准

##### 状态类数据字典（推荐格式）
```json
[
    {
        "text": "处理中",
        "value": "处理中", 
        "color": "#E04848",
        "chipColor": "warning"
    },
    {
        "text": "关闭",
        "value": "关闭",
        "color": "#CECECE",
        "chipColor": "default"
    },
    {
        "text": "完成",
        "value": "完成",
        "color": "#4CAF50",
        "chipColor": "success"
    }
]
```

##### 类型分类数据字典
```json
[
    {
        "text": "个人用户",
        "value": "personal",
        "desc": "个人注册用户"
    },
    {
        "text": "企业用户", 
        "value": "enterprise",
        "desc": "企业注册用户"
    }
]
```

#### 4.4.4 字段规范

- **text**: 显示文本，使用中文，用于前端展示
- **value**: 存储值，通常与text相同（使用中文），也可使用英文标识符
- **color**: 颜色值，十六进制格式，用于状态标签显示
- **chipColor**: Vuetify内置颜色名，用于v-chip组件的color属性（可选）
- **desc**: 详细描述（可选），用于复杂配置的说明
- **sort**: 排序字段（可选），用于控制显示顺序

#### 4.4.5 常用数据字典示例

##### 订单状态
```sql
INSERT INTO `_constant`(`constantKey`, `constantType`, `desc`, `constantValue`) 
VALUES ('orderStatus', 'array', '订单状态', 
'[
    {"text": "待支付", "value": "待支付", "color": "#FF9800", "chipColor": "warning"},
    {"text": "已支付", "value": "已支付", "color": "#2196F3", "chipColor": "primary"},
    {"text": "配送中", "value": "配送中", "color": "#9C27B0", "chipColor": "info"},
    {"text": "已完成", "value": "已完成", "color": "#4CAF50", "chipColor": "success"},
    {"text": "已取消", "value": "已取消", "color": "#9E9E9E", "chipColor": "default"}
]');
```

##### 用户类型
```sql
INSERT INTO `_constant`(`constantKey`, `constantType`, `desc`, `constantValue`) 
VALUES ('userType', 'array', '用户类型', 
'[
    {"text": "普通用户", "value": "普通用户", "color": "#2196F3", "chipColor": "primary"},
    {"text": "VIP用户", "value": "VIP用户", "color": "#FF9800", "chipColor": "warning"},
    {"text": "管理员", "value": "管理员", "color": "#4CAF50", "chipColor": "success"}
]');
```

##### 优先级
```sql
INSERT INTO `_constant`(`constantKey`, `constantType`, `desc`, `constantValue`) 
VALUES ('priority', 'array', '优先级', 
'[
    {"text": "低", "value": "低", "color": "#4CAF50", "chipColor": "success"},
    {"text": "中", "value": "中", "color": "#FF9800", "chipColor": "warning"},
    {"text": "高", "value": "高", "color": "#F44336", "chipColor": "error"},
    {"text": "紧急", "value": "紧急", "color": "#9C27B0", "chipColor": "info"}
]');
```

#### 4.4.6 前端使用规范

##### 引入工具类
在页面中引入常量工具类：
```html
{% include 'common/util/constantUtil.html' %}
```

##### 数据绑定
在Vue组件的data中绑定常量对象：
```javascript
data: {
    constantObj: window.constantObj,
    // 其他数据...
}
```

##### 常用使用场景

###### 下拉选择框
```html
<v-select 
    :items="constantObj.orderStatus"
    item-text="text"
    item-value="value"
    v-model="form.status">
</v-select>
```

###### 状态标签显示
```html
<span class="text-white px-2 py-1 rounded" 
      :style="{'background-color': parseConstantText(item.status, 'orderStatus', 'color')}">
    状态: {{item.status | parseConstantText('orderStatus')}}
</span>
```

###### 表格列格式化（使用chipColor）
```html
<template v-slot:item.status="{ item }">
    <v-chip 
        :color="parseConstantText(item.status, 'orderStatus', 'chipColor')"
        small>
        {{item.status | parseConstantText('orderStatus')}}
    </v-chip>
</template>
```

##### 工具方法

###### parseConstantText 过滤器
```javascript
// 获取显示文本
{{value | parseConstantText('constantKey')}}

// 获取颜色
parseConstantText(value, 'constantKey', 'color')

// 获取Vuetify颜色（用于v-chip组件）
parseConstantText(value, 'constantKey', 'chipColor')

// 获取描述
parseConstantText(value, 'constantKey', 'desc')
```

###### findConstantItem 方法
```javascript
// 查找完整的常量项
let constantItem = constantUtil.findConstantItem(value, constantKey);
```

#### 4.4.7 命名规范

##### constantKey命名规范

- 使用驼峰命名法（camelCase）
- 名称要清晰表达含义
- 避免使用缩写，优先使用完整单词

###### 推荐命名示例：
- `orderStatus` - 订单状态
- `userType` - 用户类型
- `paymentMethod` - 支付方式
- `deliveryType` - 配送方式
- `urgencyLevel` - 紧急程度
- `feedbackStatus` - 反馈状态
- `vehicleStatus` - 车辆状态

###### 不推荐命名：
- `status1`, `status2` - 含义不明确
- `ordSts` - 过度缩写
- `ORDER_STATUS` - 大写格式不符合规范

##### 描述规范

- 使用简洁明了的中文描述
- 说明该常量的业务含义和使用场景
- 长度控制在50字符以内

#### 4.4.8 最佳实践

##### 数据库设计原则

1. **中文存储**：状态值直接使用中文存储在业务表中，便于查询和理解
2. **统一管理**：所有枚举值都通过数据字典统一配置，避免硬编码
3. **扩展性**：新增状态值只需在数据字典中添加，无需修改代码
4. **UI适配**：状态配置包含color和chipColor，支持不同UI组件的颜色需求

##### 配置管理原则

1. **唯一性**：每个constantKey在系统中必须唯一
2. **完整性**：每个配置项必须包含text和value字段
3. **一致性**：相同类型的状态使用统一的配置格式

##### 前端使用原则

1. **统一调用**：所有状态相关的显示都通过constantUtil工具类处理
2. **缓存机制**：constantObj在页面加载时初始化，避免重复解析
3. **容错处理**：工具类内置错误处理，确保异常情况下的稳定性

#### 4.4.9 维护指南

##### 新增数据字典

1. 确定constantKey，确保唯一性
2. 编写清晰的desc描述
3. 按照标准格式配置constantValue
4. 执行INSERT语句添加到数据库
5. 重启应用使配置生效

##### 修改数据字典

1. 确认修改的影响范围
2. 更新constantValue字段
3. 重启应用使配置生效
4. 验证前端显示是否正常

##### 删除数据字典

1. 确认该常量不再被使用
2. 检查数据库中是否还有相关数据
3. 删除对应的记录
4. 清理相关的前端代码

#### 4.4.10 注意事项

1. **重启生效**：修改数据字典后需要重启应用才能生效
2. **数据一致性**：修改constantValue时要确保与现有业务数据的一致性
3. **向后兼容**：删除或修改已有配置项时要考虑向后兼容性
4. **性能考虑**：constantObj在应用启动时加载到内存，大量数据可能影响启动性能

## 五、常用库说明

- **`@jianghujs/jianghu`**: 项目核心框架，提供了包括认证、授权、数据表联动、高级查询等企业级应用开发的常用功能。
- **`egg`**: 基于 Koa 的企业级 Node.js 框架，提供了约定优于配置的开发模式。
- **`lodash`**: 功能强大的 JavaScript 工具库，推荐在前后端用于简化数组、对象、字符串等数据的操作。
- **`dayjs`**: 轻量级的日期时间处理库，用于格式化、操作和显示日期。
- **`axios`**: 基于 Promise 的 HTTP 客户端，用于在后端服务中请求外部 API。
- **`exceljs`**: 用于生成和解析 Excel 文件（`.xlsx`）。

# 六、技术栈
前后端：JianghuJS（一个基于EggJS的全栈开发框架，框架的源码在node_modules/@jianghujs下）与Vue.js
UI库：优先使用vuetify的组件，如果vuetify的组件不满足则使用tailwindcss来显示
数据库：MySQL

# 七、JianghuJS项目结构
├── app 
│   ├── common                                       # 项目的常用工具、静态方法等    
│   ├── constant                                       # 常量   
│   │   ├── constant.js
│   │   └── error.js
│   ├── controller                                     # 对外暴露接口 
│   ├── public                                          # 静态资源目录 
│   ├── schedule                                      # 定时任务; 参考https://www.eggjs.org/zh-CN/basics/schedule
│   ├── service                                         # 应用协议service目录
│   └── view                                            # 页面存放目录
│     ├── component                                      # 前端组件存放目录
│     ├── page                                          # 前端页面存放目录
│     └── init-json                                      # jianghu-init 的json文件配置目录
│       ├── component                                     # 组件init-json
│       └── page                                          # 页面init-json
├── config                                                # egg config
│   ├── config.default.js                            # default config                    
│   ├── config.local.js                               # npm run dev 时使用的 config
│   ├── config.prod.js                               # npm run start 时使用的 config
│   ├── config.unittest.js                           # npm run test 时使用的 config
│   └── plugin.js                                      # egg插件配置
├── app.js                                                # 自定义启动时的初始化工作
├── jsconfig.json
├── package.json
├── sql                                                    # sql文件存放项目的数据库文件
│   └── init.sql
└── upload                                              # 文件的保存路径(文件上传业务)



# 八、开发说明
- 尽量使用lodash简化代码
- 多了解 node_modules/@jianghujs下的框架源码，有些工具在框架已经封装好了，不需要重复造轮子
- 输出的时候不用把现有代码展示出来，只展示修改的代码，尽量简化输出信息。

### 8.1 业务表编号生成
业务ID自动生成功能详见 [后端开发规范 - bizIdGenerate中间件](jianghu-backend.md#bizidgenerate-业务id生成中间件)

# 九、数据结构说明
- 数据库的文件一般存在sql目录下，init.sql一般为整个项目的初始化sql文件。但是一般会在项目开发完才从数据库导出一份，可能存在不准确的问题
- 目录下可能会存在ddl.sql，这个一般是开发项目前梳理的当前项目的数据结构，可参考性会高一点
- 如果在开发时有更好的数据结构调整方案应该提出改进意见并提供修改结构的sql语句


# 十、UI 要求
### 10.1 样式规范
- 优先使用Vuetify的组件，如果Vuetify的组件不满足则使用Tailwind CSS
- 只用核心工具类，不用 JIT 特性
- CSS 类名要按布局、尺寸、样式的顺序排列
- 避免内联样式和!important

### 10.2 界面交互
- 按钮必须有 hover 和 active 状态
- 加载状态要有 loading 提示
- 表单提交要有验证反馈
- 操作要有成功/失败提示

# 十一、目标
- 保证代码易于理解和维护
- 确保方案具有可扩展性