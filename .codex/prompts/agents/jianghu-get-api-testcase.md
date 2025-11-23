# jianghu-get-api-testcase

## 参考规范

请参考江湖JS规范文档：[规范文档引用](../shared/jianghu-rules-reference.md)

本提示词主要涉及以下规范：
- API测试用例规范

根据JianghuJS项目的页面文件，自动生成Apifox/Postman格式的API测试用例文件。

## 使用方法
```
@jianghu-get-api-testcase [页面路径] [输出目录] [格式:apifox|postman]
```

## 示例
```
# 生成Postman格式
@jianghu-get-api-testcase @app/view/page/ @docs/测试用例/ postman

# 生成Apifox格式（默认）
@jianghu-get-api-testcase @app/view/page/ @docs/测试用例/ apifox
```

## 执行步骤

### 1. 分析页面文件
- 扫描指定目录下的所有HTML页面文件
- 提取每个页面中的 `window.jianghuAxios` 调用
- 识别 pageId、actionId 和 actionData 结构

### 2. 生成测试用例文件
根据指定格式生成相应的测试用例文件：

#### A. Apifox格式（推荐）
生成符合Apifox项目结构的JSON文件：

**项目结构**
```json
{
  "apifoxProject": "1.0.0",
  "info": {
    "name": "项目名称",
    "description": "项目描述"
  },
  "apiCollection": [
    {
      "name": "根目录",
      "preProcessors": [/* 公共预处理脚本 */],
      "postProcessors": [/* 公共后处理脚本 */],
      "items": [/* 业务模块文件夹 */]
    }
  ],
  "commonScripts": [/* 公共脚本列表 */],
  "globalVariables": [/* 全局变量列表 */]
}
```

**公共脚本配置**
- packageId生成脚本（ID: 615551）
- authToken保存脚本（ID: 615566）
- 响应状态检查脚本（ID: 615567）

**文件夹结构**
```
根目录/
├── 认证管理/
│   ├── 用户登录
│   └── 用户登出
└── 其他业务模块/
```

#### B. Postman格式
创建标准的Postman Collection v2.1格式文件：

#### 文件结构
```json
{
  "info": {
    "name": "项目名称API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "模块名称",
      "item": [
        {
          "name": "接口名称",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/{{appId}}/resource",
            "body": {
              "mode": "raw",
              "raw": "{\n  \"appData\": {\n    \"pageId\": \"页面ID\",\n    \"actionId\": \"操作ID\",\n    \"actionData\": {},\n    \"appId\": \"{{appId}}\",\n    \"userAgent\": \"{{userAgent}}\",\n    \"authToken\": \"{{authToken}}\"\n  },\n  \"packageId\": \"{{packageId}}\",\n  \"packageType\": \"httpRequest\"\n}"
            }
          }
        }
      ]
    }
  ]
}
```

#### 自动化脚本
在Collection级别添加：

**Pre-request Script:**
```javascript
// 生成唯一的packageId
if (!pm.variables.get('packageId')) {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 9000000) + 1000000;
  const packageId = `${timestamp}_${random}`;
  pm.variables.set('packageId', packageId);
  pm.environment.set('packageId', packageId);
}
```

**Tests Script:**
```javascript
// 检查响应状态
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// 检查业务状态
pm.test("Response status is success", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.status).to.eql("success");
});

// 保存登录token
if (pm.info.requestName === "用户登录") {
    const jsonData = pm.response.json();
    if (jsonData.status === "success" && jsonData.appData && jsonData.appData.resultData && jsonData.appData.resultData.authToken) {
        pm.environment.set("authToken", jsonData.appData.resultData.authToken);
        console.log("AuthToken saved:", jsonData.appData.resultData.authToken);
    }
}
```

### 3. 生成Environment文件

#### Apifox环境配置
在项目的`environments`数组中配置：
```json
{
  "name": "开发环境",
  "variables": [
    {"key": "baseUrl", "value": "http://127.0.0.1:7205", "type": "text"},
    {"key": "appId", "value": "car_rental_mgmt_v3", "type": "text"},
    {"key": "deviceId", "value": "127.0.0.1:7658_Windows.10.0_c31217fc_chrome", "type": "text"},
    {"key": "userAgent", "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", "type": "text"},
    {"key": "authToken", "value": "", "type": "text"},
    {"key": "packageId", "value": "", "type": "text"}
  ]
}
```

#### Postman环境配置
创建环境变量配置文件：
```json
{
  "name": "项目名称-开发环境",
  "values": [
    {"key": "baseUrl", "value": "http://127.0.0.1:7205"},
    {"key": "appId", "value": "项目appId"},
    {"key": "deviceId", "value": "127.0.0.1:7658_Windows.10.0_c31217fc_chrome"},
    {"key": "userAgent", "value": "Mozilla/5.0..."},
    {"key": "authToken", "value": ""},
    {"key": "packageId", "value": ""}
  ]
}
```

### 4. 生成使用说明
创建 POSTMAN_使用说明.md 文件，包含：
- 文件说明
- 导入步骤
- 使用说明
- 环境变量说明
- API模块列表
- 注意事项

## API提取规则

### 0. 请求体结构
所有JianghuJS API都使用统一的请求结构：
```json
{
  "appData": {
    "pageId": "页面ID",
    "actionId": "操作ID",
    "actionData": {/* 业务数据 */},
    "where": {/* 查询条件（可选） */},
    "whereLike": {/* 模糊查询条件（可选） */},
    "whereIn": {/* IN查询条件（可选） */},
    "orderBy": [{"column": "字段名", "order": "desc"}], // 排序（可选）
    "appId": "{{appId}}",
    "userAgent": "{{userAgent}}",
    "authToken": "{{authToken}}"
  },
  "packageId": "{{packageId}}",
  "packageType": "httpRequest"
}
```

### 1. 标准CRUD操作
```javascript
// 查询列表
pageId: 'xxxManagement', actionId: 'selectItemList'
// 创建
pageId: 'xxxManagement', actionId: 'insertItem'
// 更新
pageId: 'xxxManagement', actionId: 'updateItem'
// 删除
pageId: 'xxxManagement', actionId: 'deleteItem'
```

### 2. 特殊操作
- 登录: `pageId: 'login', actionId: 'passwordLogin'`
- 登出: `pageId: 'allPage', actionId: 'userLogout'`
- 文件上传: 使用 multipart/form-data
- 业务操作: 根据实际 actionId 命名

### 3. 查询参数处理
对于列表查询接口，自动处理：
- `where`: 精确查询条件
- `whereLike`: 模糊查询条件（自动添加%）
- `whereIn`: IN查询条件（数组）
- `whereOrOptions`: OR查询条件（二维数组）
- `orderBy`: 排序条件（默认 operationAt desc）
- `limit/offset`: 分页参数

### 4. 业务ID生成
如果发现 `bizIdGenerate` 配置，添加到请求体中：
```json
"bizIdGenerate": {
  "prefix": "前缀",
  "bizId": "字段名",
  "tableName": "表名",
  "startValue": 起始值
}
```

## 输出文件

### Apifox格式
1. `项目名称.apifox.json` - 完整的Apifox项目文件
2. `APIFOX_导入说明.md` - 导入和使用说明

### Postman格式
1. `项目名称.postman_collection.json` - Collection文件
2. `项目名称.postman_environment.json` - Environment文件
3. `POSTMAN_使用说明.md` - 使用文档

## 注意事项
1. 所有API使用统一端点 `/{{appId}}/resource`
2. 保留变量格式 `{{variableName}}`
3. 确保请求体包含必需的三个字段：appData、packageId、packageType
4. 根据页面分组创建文件夹结构
5. 为每个接口添加描述说明
6. Apifox格式支持更丰富的功能：
   - 公共脚本管理
   - 预处理/后处理脚本继承
   - 更完善的响应断言
   - 支持多环境切换
7. 自动识别并提取：
   - 文件上传接口（识别 formData）
   - 批量操作接口（识别 batchXxx）
   - 导入导出接口（识别 import/export）

## 高级功能

### 1. 自动化测试场景
根据页面逻辑自动生成测试场景：
- 登录 → 查询列表 → 创建 → 更新 → 删除 → 登出
- 数据依赖关系自动处理
- 变量传递和断言验证

### 2. Mock数据生成
基于接口参数自动生成Mock规则：
- 字符串类型：@cname、@phone、@email等
- 数字类型：@integer(1, 100)
- 日期类型：@datetime
- 枚举类型：基于constantObj自动识别

### 3. 性能测试支持
生成适用于性能测试的配置：
- 并发用户数配置
- 循环次数设置
- 响应时间断言
- 吞吐量统计