# JianghuJS API测试用例规范

## 概述

本规范定义了JianghuJS项目中API测试用例的标准格式、结构和生成规则。支持Apifox和Postman两种主流API测试工具格式。

## 1. 总体要求

### 1.1 统一接口规范
- 所有API使用统一端点：`/{{appId}}/resource`
- 请求方法：POST
- 请求格式：application/json
- 响应格式：application/json

### 1.2 请求体结构
```json
{
  "appData": {
    "pageId": "页面ID",
    "actionId": "操作ID", 
    "actionData": {/* 业务数据 */},
    "where": {/* 查询条件 */},
    "whereLike": {/* 模糊查询条件 */},
    "whereIn": {/* IN查询条件 */},
    "orderBy": [{/* 排序条件 */}],
    "appId": "{{appId}}",
    "userAgent": "{{userAgent}}",
    "authToken": "{{authToken}}"
  },
  "packageId": "{{packageId}}",
  "packageType": "httpRequest"
}
```

### 1.3 响应体结构
```json
{
  "status": "success|error",
  "errorCode": "错误码",
  "errorReason": "错误原因",
  "errorReasonSupplement": "错误详情",
  "appData": {
    "resultData": {/* 返回数据 */},
    "appId": "应用ID",
    "pageId": "页面ID",
    "actionId": "操作ID"
  }
}
```

## 2. API命名规范

### 2.1 标准CRUD操作
| 操作类型 | pageId格式 | actionId | 说明 |
|---------|-----------|----------|------|
| 查询列表 | xxxManagement | selectItemList | 获取数据列表 |
| 创建数据 | xxxManagement | insertItem | 新增单条数据 |
| 更新数据 | xxxManagement | updateItem | 修改单条数据 |
| 删除数据 | xxxManagement | deleteItem | 删除单条数据 |
| 批量创建 | xxxManagement | batchInsertItem | 批量新增数据 |
| 批量更新 | xxxManagement | batchUpdateItem | 批量修改数据 |
| 批量删除 | xxxManagement | batchDeleteItem | 批量删除数据 |

### 2.2 特殊操作
| 功能 | pageId | actionId | 说明 |
|------|--------|----------|------|
| 用户登录 | login | passwordLogin | 密码登录 |
| 用户登出 | allPage | userLogout | 退出登录 |
| 文件上传 | file | uploadFile | 上传文件 |
| 文件下载 | file | downloadFile | 下载文件 |
| 数据导入 | xxxManagement | importData | Excel导入 |
| 数据导出 | xxxManagement | exportData | Excel导出 |

### 2.3 业务操作命名
- 审核操作：`auditXxx`
- 提交操作：`submitXxx`
- 撤销操作：`cancelXxx`
- 复制操作：`copyXxx`
- 启用/禁用：`enableXxx/disableXxx`

## 3. 查询参数规范

### 3.1 基础查询参数
```javascript
{
  // 精确查询
  "where": {
    "field1": "value1",
    "field2": "value2"
  },
  
  // 模糊查询（自动添加%）
  "whereLike": {
    "name": "张",      // 生成: name LIKE '%张%'
    "phone": "138"     // 生成: phone LIKE '%138%'
  },
  
  // IN查询
  "whereIn": {
    "status": ["active", "pending"],
    "type": [1, 2, 3]
  },
  
  // OR查询（二维数组）
  "whereOrOptions": [
    ["field1", "=", "value1"],
    ["field2", "like", "%value2%"]
  ],
  
  // 排序
  "orderBy": [
    {"column": "operationAt", "order": "desc"},
    {"column": "id", "order": "asc"}
  ],
  
  // 分页
  "limit": 20,
  "offset": 0
}
```

### 3.2 高级查询参数
```javascript
{
  // 日期范围查询
  "whereBetween": {
    "createAt": ["2024-01-01", "2024-12-31"]
  },
  
  // 空值查询
  "whereNull": ["deletedAt"],
  "whereNotNull": ["verifyAt"],
  
  // 自定义SQL
  "whereRaw": "price * quantity > 1000"
}
```

## 4. 业务ID生成规范

### 4.1 bizIdGenerate配置
```json
{
  "bizIdGenerate": {
    "prefix": "C",              // 前缀
    "bizId": "customerId",      // 业务ID字段名
    "tableName": "customer",    // 表名
    "startValue": 10001        // 起始值
  }
}
```

### 4.2 常见业务ID前缀
| 业务类型 | 前缀 | 示例 |
|---------|------|------|
| 客户 | C | C10001 |
| 订单 | O | O20240001 |
| 车辆 | V | V30001 |
| 门店 | S | S40001 |
| 员工 | E | E50001 |

## 5. 环境变量规范

### 5.1 必需的环境变量
| 变量名 | 说明 | 示例值 |
|--------|------|--------|
| baseUrl | API基础地址 | http://127.0.0.1:7205 |
| appId | 应用ID | car_rental_mgmt_v3 |
| deviceId | 设备ID | 127.0.0.1:7658_Windows.10.0_chrome |
| userAgent | 用户代理 | Mozilla/5.0... |
| authToken | 认证令牌 | 动态生成 |
| packageId | 请求包ID | 动态生成 |

### 5.2 可选的环境变量
| 变量名 | 说明 | 示例值 |
|--------|------|--------|
| timeout | 请求超时时间 | 30000 |
| retryCount | 重试次数 | 3 |
| mockData | 是否使用Mock | false |

## 6. 脚本规范

### 6.1 预处理脚本（Pre-request Script）
```javascript
// 1. packageId生成（必需）
if (!pm.variables.get('packageId')) {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 9000000) + 1000000;
  const packageId = `${timestamp}_${random}`;
  pm.variables.set('packageId', packageId);
  pm.environment.set('packageId', packageId);
}

// 2. 动态参数处理
// 示例：生成当前日期
pm.variables.set('currentDate', new Date().toISOString().split('T')[0]);

// 3. 数据签名（如需要）
// 示例：生成请求签名
const crypto = require('crypto-js');
const signature = crypto.MD5(JSON.stringify(pm.request.body)).toString();
pm.request.headers.add({key: 'X-Signature', value: signature});
```

### 6.2 后处理脚本（Tests Script）
```javascript
// 1. 基础断言（必需）
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response status is success", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.status).to.eql("success");
});

// 2. 响应时间断言
pm.test("Response time is less than 1000ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(1000);
});

// 3. 数据结构验证
pm.test("Response has required fields", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('status');
    pm.expect(jsonData).to.have.property('appData');
});

// 4. 业务逻辑验证
// 示例：验证列表查询返回数组
if (pm.info.requestName.includes("列表")) {
    pm.test("List response returns array", function () {
        const resultData = pm.response.json().appData.resultData;
        pm.expect(resultData.rows).to.be.an('array');
        pm.expect(resultData).to.have.property('count');
    });
}

// 5. Token保存（登录接口专用）
if (pm.info.requestName === "用户登录") {
    const jsonData = pm.response.json();
    if (jsonData.status === "success" && jsonData.appData?.resultData?.authToken) {
        pm.environment.set("authToken", jsonData.appData.resultData.authToken);
        console.log("AuthToken saved:", jsonData.appData.resultData.authToken);
    }
}

// 6. 数据提取（用于后续请求）
// 示例：保存创建的数据ID
if (pm.info.requestName.includes("创建")) {
    const jsonData = pm.response.json();
    if (jsonData.status === "success" && jsonData.appData?.resultData?.id) {
        pm.environment.set("lastCreatedId", jsonData.appData.resultData.id);
    }
}
```

## 7. 文件夹组织规范

### 7.1 标准文件夹结构
```
根目录/
├── 认证管理/
│   ├── 用户登录
│   ├── 用户登出
│   └── 修改密码
├── 系统管理/
│   ├── 用户管理/
│   ├── 角色管理/
│   └── 权限管理/
├── 业务模块1/
│   ├── 列表查询
│   ├── 新增数据
│   ├── 修改数据
│   └── 删除数据
└── 公共接口/
    ├── 文件上传
    └── 数据字典
```

### 7.2 文件夹命名规则
- 使用中文命名，便于理解
- 按业务模块分组
- 认证相关接口放在最前
- 公共接口放在最后

## 8. 测试场景规范

### 8.1 基础CRUD测试流程
```
1. 用户登录（获取token）
2. 查询列表（验证初始状态）
3. 创建数据（验证创建成功）
4. 查询详情（验证数据正确）
5. 更新数据（验证更新成功）
6. 查询列表（验证数据更新）
7. 删除数据（验证删除成功）
8. 查询列表（验证数据删除）
```

### 8.2 批量操作测试流程
```
1. 批量创建（验证批量创建）
2. 批量查询（验证数据存在）
3. 批量更新（验证批量更新）
4. 批量删除（验证批量删除）
```

### 8.3 异常场景测试
```
1. 未登录访问（验证权限控制）
2. 参数缺失（验证参数校验）
3. 参数类型错误（验证类型校验）
4. 业务规则违反（验证业务校验）
5. 并发请求（验证并发控制）
```

## 9. Mock数据规范

### 9.1 Mock规则配置
```javascript
{
  // 基础类型
  "id": "@integer(1, 10000)",
  "name": "@cname",
  "phone": "@phone",
  "email": "@email",
  "address": "@county(true)",
  
  // 日期时间
  "createAt": "@datetime('yyyy-MM-dd HH:mm:ss')",
  "updateAt": "@now",
  
  // 枚举类型
  "status": "@pick(['active', 'inactive', 'pending'])",
  "type": "@pick([1, 2, 3])",
  
  // 布尔类型
  "isDeleted": "@boolean",
  
  // 数组类型
  "tags": "@array(@word, 1, 5)",
  
  // 自定义规则
  "price": "@float(10, 1000, 2, 2)",
  "description": "@cparagraph(1, 3)"
}
```

### 9.2 响应示例配置
```json
{
  "success_example": {
    "status": "success",
    "appData": {
      "resultData": {
        "rows|10-20": [{
          "id": "@integer(1, 10000)",
          "name": "@cname",
          "status": "@pick(['active', 'inactive'])"
        }],
        "count": "@integer(50, 200)"
      }
    }
  },
  "error_example": {
    "status": "error",
    "errorCode": "BIZ_ERROR",
    "errorReason": "业务错误",
    "errorReasonSupplement": "具体错误信息"
  }
}
```

## 10. 性能测试规范

### 10.1 性能测试配置
```javascript
{
  // 并发用户数
  "virtualUsers": 100,
  
  // 循环次数
  "iterations": 1000,
  
  // 持续时间
  "duration": "5m",
  
  // 启动时间
  "rampUpPeriod": "30s",
  
  // 思考时间
  "thinkTime": {
    "min": 1000,
    "max": 3000
  }
}
```

### 10.2 性能断言
```javascript
// 响应时间断言
pm.test("Response time P95 < 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

// 吞吐量断言
pm.test("Throughput > 100 req/s", function () {
    // 需要配合性能测试工具
});

// 错误率断言
pm.test("Error rate < 1%", function () {
    // 需要配合性能测试工具
});
```

## 11. 文档生成规范

### 11.1 接口描述模板
```markdown
## 接口名称

### 功能描述
简要描述接口的业务功能

### 请求参数
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| field1 | string | 是 | 字段说明 |
| field2 | number | 否 | 字段说明 |

### 响应参数
| 参数名 | 类型 | 说明 |
|--------|------|------|
| field1 | string | 字段说明 |
| field2 | array | 字段说明 |

### 示例
请求示例、响应示例

### 注意事项
- 业务规则说明
- 异常情况处理
```

### 11.2 自动文档生成
- 从代码注释提取
- 从测试用例提取
- 从Mock配置提取
- 生成Markdown格式

## 12. 版本管理规范

### 12.1 版本号规则
- 格式：`v{major}.{minor}.{patch}`
- major：重大变更
- minor：功能新增
- patch：问题修复

### 12.2 变更记录
```markdown
## v1.2.0 (2024-01-15)
### 新增
- 添加批量操作接口
- 支持文件上传功能

### 优化
- 优化查询性能
- 改进错误提示

### 修复
- 修复分页查询问题
- 修复权限验证漏洞
```

## 13. 最佳实践

### 13.1 命名一致性
- 保持pageId、actionId命名风格一致
- 使用有意义的业务名称
- 避免使用拼音或缩写

### 13.2 参数校验
- 前端校验：基础格式校验
- 后端校验：业务规则校验
- 测试校验：边界条件测试

### 13.3 错误处理
- 统一错误码体系
- 友好的错误提示
- 详细的错误日志

### 13.4 安全规范
- 敏感数据脱敏
- SQL注入防护
- XSS攻击防护
- CSRF防护

### 13.5 性能优化
- 合理使用分页
- 避免N+1查询
- 使用缓存机制
- 异步处理耗时操作

## 14. 工具集成

### 14.1 Apifox特性
- 在线协作
- 自动化测试
- Mock服务
- 文档生成
- CI/CD集成

### 14.2 Postman特性
- 环境管理
- 集合运行
- Newman CLI
- 监控功能
- 团队协作

### 14.3 自动化集成
```bash
# Newman命令行运行
newman run collection.json -e environment.json --reporters html,junit

# 集成到CI/CD
- stage: test
  script:
    - newman run collection.json -e environment.json
    - newman run performance.json --iteration-count 100
```

## 15. 常见问题

### 15.1 Token过期处理
```javascript
// 在预处理脚本中检查token
const tokenExpiry = pm.environment.get('tokenExpiry');
if (!tokenExpiry || new Date() > new Date(tokenExpiry)) {
    // 触发重新登录
    pm.execution.setNextRequest('用户登录');
}
```

### 15.2 动态数据依赖
```javascript
// 使用环境变量传递数据
pm.environment.set('lastCreatedId', responseData.id);
// 在后续请求中使用
{{lastCreatedId}}
```

### 15.3 条件执行
```javascript
// 根据条件跳过某些请求
if (condition) {
    pm.execution.setNextRequest('下一个请求名称');
} else {
    pm.execution.setNextRequest(null); // 停止执行
}
```

## 总结

本规范旨在建立JianghuJS项目API测试用例的标准化体系，提高测试效率和质量。通过遵循这些规范，可以：

1. 确保API设计的一致性
2. 提高测试用例的可维护性
3. 便于团队协作和知识传承
4. 支持自动化测试和持续集成
5. 生成高质量的API文档

在实际应用中，应根据项目特点适当调整和扩展本规范。