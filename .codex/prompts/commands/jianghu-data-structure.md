---
trigger: model_decision
description: 江湖JS项目数据结构梳理
---

# 江湖JS项目数据结构梳理

## 参考规范

请参考江湖JS规范文档：[规范文档引用](../shared/jianghu-rules-reference.md)

本提示词主要涉及以下规范：
- 数据结构规范

你是一个专业的数据库架构师，正在为一个基于江湖JS框架的项目设计数据结构。请根据以下规范和要求，为项目生成完整的数据库结构DDL文件。

## 技术栈
- 框架：江湖JS (基于EggJS)
- 数据库：MySQL 5.7
- 字符集：utf8mb4
- 排序规则：utf8mb4_bin

## 数据库设计规范

### 1. 命名规范
- **表名**：使用下划线命名法（snake_case），如 `user_info`, `order_detail`
- **字段名**：优先使用小驼峰命名法（camelCase），如 `userId`, `orderStatus`
- **索引名**：使用 `字段名_index` 格式，如 `userId_index`
- **主键**：统一使用 `id` 作为主键名

### 2. 表结构标准
- 必须包含自增主键 `id int(11) NOT NULL AUTO_INCREMENT`
- 必须包含完整的 COMMENT 注释
- 推荐包含以下标准字段：
  ```sql
  `rowStatus` varchar(255) DEFAULT '正常' COMMENT '数据状态; 正常、回收站',
  `operation` varchar(255) DEFAULT 'insert' COMMENT '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore',
  `operationByUserId` varchar(255) DEFAULT NULL COMMENT '操作者userId',
  `operationByUser` varchar(255) DEFAULT NULL COMMENT '操作者用户名',
  `operationAt` varchar(255) DEFAULT NULL COMMENT '操作时间; E.g: 2021-05-28T10:24:54+08:00'
  ```

### 3. 字段类型规范
- **ID字段**：`varchar(255)` 或 `int(11)`
- **状态字段**：`varchar(255)` 配合枚举值注释
- **金额字段**：`decimal(10,2)` 
- **时间字段**：`varchar(255)` 存储ISO格式时间字符串
- **文本字段**：`varchar(255)` 或 `text`
- **JSON字段**：`text` 存储JSON字符串
- **图片字段**：`varchar(500)` 或 `text` 存储URL，多个用逗号分隔

### 4. 索引规范
- 主键使用 `PRIMARY KEY (id) USING BTREE`
- 唯一索引使用 `UNIQUE KEY 字段名_index (字段名) USING BTREE`
- 普通索引使用 `KEY 字段名_index (字段名) USING BTREE`
- 外键关联字段必须建立索引

### 5. 表引擎和字符集
```sql
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='表注释'
```

## 业务建模指导

### 1. 核心实体识别
- 识别业务中的核心实体（如用户、订单、商品等）
- 每个实体对应一个主表
- 考虑实体的生命周期和状态变化

### 2. 关系设计
- **一对一**：在子表中添加父表ID字段
- **一对多**：在多的一方添加一的一方ID字段
- **多对多**：创建中间关联表

### 3. 扩展性设计
- 为复杂业务创建扩展表（如 `order_ext_rental`）
- 使用JSON字段存储灵活的扩展信息
- 考虑历史记录和审计需求

### 4. 状态管理
- 为有状态变化的实体设计状态字段
- 状态值使用中文，便于理解
- 在注释中明确列出所有可能的状态值
- **数据字典配置**：所有状态值和枚举数据必须在 `_constant` 表中统一配置管理，详细规范请参考 [江湖JS数据字典规范](jianghu-constant-dict.md)

### 5. Vuetify组件配色规范
当状态字段需要在前端使用 `v-chip` 组件显示时，`_constant` 表的配置中需要添加 `chipColor` 参数：

```json
{
  "text": "状态显示名称", 
  "value": "状态值", 
  "color": "#颜色代码", 
  "chipColor": "vuetify内置颜色名"
}
```

**Vuetify内置颜色名称**：
- `primary` - 主色（蓝色）
- `success` - 成功色（绿色）
- `error` - 错误色（红色）
- `warning` - 警告色（橙色）
- `info` - 信息色（浅蓝色）
- `default` - 默认色（灰色）

**状态语义化对应**：
- 成功/正常/已完成/可用 → `success`
- 失败/错误/异常 → `error`
- 警告/待处理/进行中 → `warning`
- 重要/主要/活跃 → `primary`
- 次要/禁用/停用 → `default`

## 输出要求

### 1. 文件结构
```sql
-- 项目名称 数据结构

-- -- 模块1名称（如：用户管理）

-- 表1注释
DROP TABLE IF EXISTS `table1`;
CREATE TABLE `table1` (
  -- 字段定义
  PRIMARY KEY (`id`) USING BTREE,
  -- 索引定义
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='表注释';

-- 表2注释
-- ...
```

### 2. 注释规范
- 每个表前必须有注释说明表的用途
- 字段注释格式：`COMMENT '字段描述; 枚举值1, 枚举值2, 枚举值3'`
- 复杂字段需要详细说明数据格式和用途

### 3. 分组组织
- 按业务模块分组，用注释分隔
- 相关表放在一起
- 主表在前，关联表在后

## 示例参考

参考以下表结构设计：

```sql
-- 用户表
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL COMMENT '用户ID',
  `username` varchar(255) DEFAULT NULL COMMENT '用户名',
  `phone` varchar(255) DEFAULT NULL COMMENT '手机号',
  `status` varchar(255) DEFAULT '正常' COMMENT '用户状态; 正常, 禁用, 注销',
  `registerTime` varchar(255) DEFAULT NULL COMMENT '注册时间',
  
  `rowStatus` varchar(255) DEFAULT '正常' COMMENT '数据状态; 正常、回收站',
  `operation` varchar(255) DEFAULT 'insert' COMMENT '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore',
  `operationByUserId` varchar(255) DEFAULT NULL COMMENT '操作者userId',
  `operationByUser` varchar(255) DEFAULT NULL COMMENT '操作者用户名',
  `operationAt` varchar(255) DEFAULT NULL COMMENT '操作时间; E.g: 2021-05-28T10:24:54+08:00',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `userId_index` (`userId`) USING BTREE,
  KEY `phone_index` (`phone`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='用户信息表';
```

## 任务执行流程

1. **需求分析**：理解项目业务需求和功能模块
2. **实体建模**：识别核心业务实体和关系
3. **表结构设计**：按照规范设计每个表的字段和索引
4. **关系梳理**：确保表间关系正确，外键关联合理
5. **扩展考虑**：预留扩展字段和扩展表设计
6. **输出DDL**：生成完整的数据库创建脚本，存放到项目目录的 sql 目录下，命名为ddl.sql

请严格按照以上规范进行项目需求 - $ARGUMENTS 的数据结构设计，确保生成的DDL文件符合江湖JS项目的标准要求。