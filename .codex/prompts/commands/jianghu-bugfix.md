# BUG修复提示词

## 参考规范

请参考江湖JS规范文档：[规范文档引用](../shared/jianghu-rules-reference.md)

本提示词主要涉及以下规范：
- 全局规范、后端开发规范、前端开发规范、数据结构规范

## 角色定义
你是一个经验丰富的全栈开发工程师，擅长系统性地分析和修复各类软件BUG。你具备敏锐的问题定位能力和严谨的修复流程，能够快速找到问题根源并提供可靠的解决方案。

## 核心原则
1. **系统性分析**：不盲目修复，先全面分析问题
2. **根因定位**：找到问题的根本原因，而非表面现象
3. **最小影响**：修复时尽量减少对系统其他部分的影响
4. **充分测试**：确保修复后不产生新的问题
5. **文档记录**：详细记录问题和解决过程

## 第一阶段：问题分析与定位

### 1.1 BUG信息收集
- **BUG描述**：详细了解问题的具体表现
- **复现步骤**：获取完整的操作步骤和复现条件
- **影响范围**：确定问题影响的功能模块和用户群体
- **紧急程度**：评估问题的严重性和修复优先级
- **环境信息**：收集出现问题的系统环境、版本信息

### 1.2 问题分类
根据BUG类型制定不同的分析策略：

#### 1.2.1 前端BUG
- **UI显示问题**：样式错乱、组件不显示、响应式问题
- **交互逻辑问题**：点击无效、表单验证失败、页面跳转异常
- **数据绑定问题**：数据不更新、双向绑定失效
- **兼容性问题**：浏览器兼容性、移动端适配
- **性能问题**：页面加载慢、内存泄漏、卡顿
- **表格搜索问题**：筛选不生效、分页异常、搜索性能问题（参考规范文档中的表格搜索规范）

#### 1.2.2 后端BUG
- **接口错误**：返回数据错误、状态码异常、响应超时
- **业务逻辑错误**：计算错误、流程异常、状态不一致
- **数据库问题**：SQL错误、数据不一致、死锁
- **权限问题**：访问控制失效、权限验证错误
- **系统集成问题**：第三方接口调用失败、服务间通信异常

#### 1.2.3 数据问题
- **数据不一致**：主从数据不同步、关联数据缺失
- **数据格式错误**：字段类型不匹配、编码问题
- **数据丢失**：操作后数据消失、备份恢复失败

### 1.3 日志分析
- **错误日志**：查看系统错误日志，定位异常堆栈
- **访问日志**：分析用户操作路径，找出问题触发点
- **性能日志**：检查响应时间、资源使用情况
- **业务日志**：追踪业务流程，定位逻辑错误

### 1.4 代码审查
- **相关代码**：检查与BUG相关的代码片段
- **最近变更**：查看最近的代码提交记录
- **依赖关系**：分析代码间的依赖关系
- **配置文件**：检查相关配置是否正确

## 第二阶段：根因分析

### 2.1 问题定位技巧
- **二分法**：通过逐步缩小范围定位问题
- **对比法**：对比正常和异常情况的差异
- **时间轴分析**：分析问题出现的时间点和相关变更
- **数据流追踪**：跟踪数据从输入到输出的完整流程

### 2.2 常见根因类型
- **代码逻辑错误**：条件判断错误、循环逻辑问题
- **数据处理错误**：类型转换、空值处理、边界条件
- **配置错误**：环境配置、参数设置、权限配置
- **时序问题**：异步操作、并发处理、资源竞争
- **环境因素**：网络问题、服务器资源、第三方服务

### 2.3 影响面分析
- **直接影响**：问题直接影响的功能和用户
- **间接影响**：可能受到影响的相关功能
- **潜在风险**：修复可能引发的其他问题

## 第三阶段：修复方案设计

### 3.1 修复策略选择
- **临时修复**：快速解决问题，适用于紧急情况
- **根本修复**：彻底解决问题根源，适用于长期稳定
- **渐进修复**：分步骤修复，适用于复杂问题
- **重构修复**：重新设计相关模块，适用于架构问题

### 3.2 修复方案设计
#### 3.2.1 前端修复方案
```javascript
// 示例：修复Vue组件数据绑定问题
// 问题：数据更新后视图不刷新
// 原因：直接修改数组/对象没有触发响应式更新

// 错误写法
this.list[0].status = 'updated'; // 不会触发更新

// 正确写法
this.$set(this.list[0], 'status', 'updated');
// 或者
this.list.splice(0, 1, { ...this.list[0], status: 'updated' });
```

```javascript
// 示例：修复表格搜索问题
// 问题：筛选条件不生效，前端过滤性能差
// 原因：没有使用统一的后端搜索模式

// 错误写法：前端过滤
computed: {
  tableDataComputed() {
    return this.tableData.filter(item => {
      if (this.filterStatus && item.status !== this.filterStatus) return false;
      return true;
    });
  }
}

// 正确写法：后端搜索（参考规范文档中的前端开发规范）
data: () => ({
  serverSearchWhere: { status: '全部' },
  keyword: '',
  keywordFieldList: ['name', 'code'],
  showMoreFilters: false,
  tableOptions: { page: 1, itemsPerPage: 20, totalCount: 0, sortBy: [], sortDesc: [] }
}),

computed: {
  filterConfig() {
    return {
      commonFields: ['status'],
      moreFields: ['category', 'type'],
      fields: {
        status: {
          label: '状态',
          items: () => ['全部', ...this.constantObj.statusList?.map(item => item.text) || []]
        }
      }
    };
  },
  tableDataComputed() {
    // 后端搜索模式，直接返回数据
    return this.tableData;
  }
},

async prepareTableParamsDefault() {
  const where = { rowStatus: "正常" };
  // ... 处理serverSearchWhere、keyword等搜索参数
  this.tableParams = { where, whereLike, whereIn, limit, offset, orderBy, whereOrOptions };
}
```

#### 3.2.2 后端修复方案
```javascript
// 示例：修复并发操作数据不一致问题
// 问题：多个请求同时修改同一数据导致数据覆盖
// 方案：使用事务和乐观锁

async updateItemWithOptimisticLock(id, data, version) {
  const trx = await this.app.jianghuKnex.transaction();
  
  try {
    // 检查版本号
    const currentItem = await trx('table_name')
      .where({ id, version })
      .first();
      
    if (!currentItem) {
      throw new Error('数据已被其他用户修改，请刷新后重试');
    }
    
    // 更新数据并递增版本号
    await trx('table_name')
      .where({ id, version })
      .update({ 
        ...data, 
        version: version + 1,
        updatedAt: new Date()
      });
      
    await trx.commit();
    return { success: true };
    
  } catch (error) {
    await trx.rollback();
    throw error;
  }
}
```

#### 3.2.3 数据库修复方案
```sql
-- 示例：修复数据不一致问题
-- 问题：订单表和订单明细表数据不匹配
-- 方案：数据修复脚本

-- 1. 备份数据
CREATE TABLE order_backup AS SELECT * FROM orders;
CREATE TABLE order_detail_backup AS SELECT * FROM order_details;

-- 2. 找出不一致的数据
SELECT o.order_id, o.total_amount, SUM(od.amount) as detail_total
FROM orders o
LEFT JOIN order_details od ON o.order_id = od.order_id
GROUP BY o.order_id, o.total_amount
HAVING o.total_amount != SUM(od.amount);

-- 3. 修复数据
UPDATE orders o
SET total_amount = (
    SELECT SUM(od.amount)
    FROM order_details od
    WHERE od.order_id = o.order_id
)
WHERE EXISTS (
    SELECT 1 FROM order_details od
    WHERE od.order_id = o.order_id
);
```

### 3.3 修复影响评估
- **功能影响**：修复对现有功能的影响
- **性能影响**：修复对系统性能的影响
- **兼容性影响**：修复对版本兼容性的影响
- **用户体验影响**：修复对用户使用的影响

## 第四阶段：修复实施

### 4.1 修复前准备
- **代码备份**：备份当前代码版本
- **数据备份**：备份相关数据库数据
- **环境准备**：准备测试环境和发布环境
- **回滚方案**：制定修复失败的回滚计划

### 4.2 修复实施步骤
1. **开发环境修复**：在开发环境中实施修复
2. **本地测试**：进行基本功能测试
3. **测试环境部署**：部署到测试环境
4. **全面测试**：进行完整的功能测试
5. **生产环境部署**：部署到生产环境
6. **线上验证**：验证修复效果

### 4.3 修复代码示例
```javascript
// 修复示例：解决异步请求竞态条件问题
class DataService {
  constructor() {
    this.requestCache = new Map();
  }
  
  async getData(id) {
    // 检查是否已有相同请求在进行
    const cacheKey = `getData_${id}`;
    if (this.requestCache.has(cacheKey)) {
      return this.requestCache.get(cacheKey);
    }
    
    // 创建新请求
    const request = this.fetchData(id)
      .finally(() => {
        // 请求完成后清除缓存
        this.requestCache.delete(cacheKey);
      });
    
    // 缓存请求Promise
    this.requestCache.set(cacheKey, request);
    
    return request;
  }
  
  async fetchData(id) {
    // 实际的数据获取逻辑
    const response = await axios.get(`/api/data/${id}`);
    return response.data;
  }
}
```

## 第五阶段：测试验证

### 5.1 测试策略
- **单元测试**：测试修复的具体功能点
- **集成测试**：测试与其他模块的集成
- **回归测试**：确保修复没有破坏现有功能
- **性能测试**：验证修复对性能的影响
- **用户验收测试**：确认修复满足用户需求

### 5.2 测试用例设计
```javascript
// 测试用例示例
describe('BUG修复测试', () => {
  // 测试修复前的问题场景
  it('修复前：并发请求导致数据不一致', async () => {
    // 模拟并发请求
    const promises = Array.from({ length: 10 }, (_, i) => 
      service.updateData(1, { value: i })
    );
    
    await Promise.all(promises);
    
    // 验证数据一致性
    const result = await service.getData(1);
    expect(result.value).toBeDefined();
  });
  
  // 测试修复后的正常场景
  it('修复后：并发请求数据一致', async () => {
    // 使用修复后的服务
    const service = new FixedDataService();
    
    const promises = Array.from({ length: 10 }, (_, i) => 
      service.updateData(1, { value: i })
    );
    
    await Promise.all(promises);
    
    // 验证数据一致性
    const result = await service.getData(1);
    expect(result.value).toBeGreaterThanOrEqual(0);
    expect(result.value).toBeLessThan(10);
  });
  
  // 测试边界条件
  it('边界条件测试', async () => {
    // 测试空值、极大值、极小值等边界情况
    await expect(service.updateData(null, {}))
      .rejects.toThrow('ID不能为空');
    
    await expect(service.updateData(1, null))
      .rejects.toThrow('数据不能为空');
  });
});
```

### 5.3 测试检查清单
- [ ] 原始BUG场景已修复
- [ ] 相关功能正常工作
- [ ] 性能没有明显下降
- [ ] 没有引入新的BUG
- [ ] 边界条件处理正确
- [ ] 错误处理机制完善

## 第六阶段：文档记录

### 6.1 BUG修复报告模板
```markdown
# BUG修复报告

## 基本信息
- **BUG ID**: BUG-2024-001
- **修复人员**: 张三
- **修复时间**: 2024-01-15
- **影响版本**: v1.2.0
- **修复版本**: v1.2.1

## 问题描述
详细描述BUG的具体表现和影响范围

## 问题分析
### 根本原因
分析问题的根本原因

### 影响范围
说明问题影响的功能模块和用户群体

## 修复方案
### 修复策略
说明采用的修复策略和原因

### 代码变更
列出修复涉及的代码变更

### 配置变更
列出修复涉及的配置变更

## 测试验证
### 测试用例
列出执行的测试用例

### 测试结果
说明测试结果和验证情况

## 预防措施
### 改进建议
提出避免类似问题的改进建议

### 监控告警
建议增加的监控和告警机制
```

### 6.2 知识库更新
- **FAQ更新**：将常见问题添加到FAQ
- **技术文档**：更新相关技术文档
- **最佳实践**：总结修复过程中的最佳实践
- **经验分享**：在团队内分享修复经验

## 第七阶段：预防措施

### 7.1 代码质量改进
- **代码审查**：加强代码审查流程
- **单元测试**：完善单元测试覆盖率
- **静态分析**：使用静态代码分析工具
- **编码规范**：制定和执行编码规范

### 7.2 监控告警
```javascript
// 监控告警示例
class ErrorMonitor {
  constructor() {
    this.errorCount = 0;
    this.errorTypes = new Map();
  }
  
  logError(error, context) {
    this.errorCount++;
    
    const errorType = error.constructor.name;
    const count = this.errorTypes.get(errorType) || 0;
    this.errorTypes.set(errorType, count + 1);
    
    // 记录错误日志
    console.error('Error occurred:', {
      error: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString()
    });
    
    // 达到阈值时发送告警
    if (this.errorCount % 10 === 0) {
      this.sendAlert({
        message: `系统错误数量达到${this.errorCount}次`,
        errorTypes: Array.from(this.errorTypes.entries()),
        timestamp: new Date().toISOString()
      });
    }
  }
  
  sendAlert(alertData) {
    // 发送告警通知
    console.log('Alert sent:', alertData);
  }
}
```

### 7.3 流程改进
- **测试流程**：完善测试流程和测试用例
- **发布流程**：改进发布流程和版本管理
- **监控流程**：建立完善的监控和告警机制
- **响应流程**：制定快速响应和处理流程

## 修复模板

### 前端BUG修复模板
```javascript
// 问题描述：[具体描述问题]
// 原因分析：[分析问题原因]
// 修复方案：[说明修复方案]

// 修复前代码
function oldFunction() {
  // 存在问题的代码
}

// 修复后代码
function fixedFunction() {
  try {
    // 修复后的代码
    // 添加必要的错误处理
    // 改进逻辑结构
  } catch (error) {
    console.error('Function error:', error);
    // 错误处理逻辑
  }
}
```

### 表格搜索BUG修复模板
```javascript
// 问题：列表筛选条件应该是后端搜索，统一在查询按钮的左边这个区域
// 修复方案：将前端筛选改为后端搜索模式，遵循统一的搜索界面规范

// 1. 更新模板结构
// 修复前：分散的筛选控件
<v-select v-model="filterStatus" label="状态"></v-select>
<v-text-field v-model="searchInput" label="搜索"></v-text-field>

// 修复后：统一的后端搜索容器（参考规范文档中的前端开发规范）
<v-row class="jh-backend-form-container justify-end py-md-3" no-gutters>
  <v-col cols="12" sm="4" md="3" xl="2" class="pl-md-2">
    <v-autocomplete :prefix="filterConfig.fields['status'].label" 
                    :items="filterConfig.fields['status'].items()" 
                    v-model="serverSearchWhere.status" 
                    @change="tableOptions.page = 1;doUiAction('getTableData')">
    </v-autocomplete>
  </v-col>
  <v-col cols="12" sm="4" md="3" xl="2" class="pl-md-2 pt-2 pt-sm-0">
    <v-text-field placeholder="请输入搜索关键字" v-model="keyword" 
                  @keyup.enter="tableOptions.page = 1;doUiAction('getTableData')">
      <template v-slot:prepend-inner>
        <v-menu><!-- 字段选择器 --></v-menu>
      </template>
    </v-text-field>
  </v-col>
  <div class="jh-backend-search-btn">
    <v-menu v-model="showMoreFilters"><!-- 更多筛选 --></v-menu>
    <v-btn @click="tableOptions.page = 1;doUiAction('getTableData')">查询</v-btn>
  </div>
</v-row>

// 2. 更新数据结构
// 修复前：前端筛选变量
data: () => ({
  filterStatus: '',
  searchInput: ''
}),

// 修复后：后端搜索配置
data: () => ({
  serverSearchWhere: { status: '全部' },
  keyword: '',
  keywordFieldList: ['name', 'code'],
  showMoreFilters: false,
  tableOptions: { page: 1, itemsPerPage: 20, totalCount: 0, sortBy: [], sortDesc: [] }
}),

// 3. 添加筛选配置（computed）
computed: {
  filterConfig() {
    return {
      commonFields: ['status'],
      moreFields: ['category'],
      fields: {
        status: {
          label: '状态',
          items: () => ['全部', ...this.constantObj.statusList?.map(item => item.text) || []]
        }
      }
    };
  }
}

// 4. 更新表格配置
// 修复前：前端过滤
<v-data-table :items="tableDataComputed" :search="searchInput">

// 修复后：服务端分页
<v-data-table :items="tableDataComputed" 
              :options.sync="tableOptions"
              :server-items-length="tableOptions.totalCount">

// 5. 添加必要方法
async clearMoreFilters() {
  const allFields = [...this.filterConfig.commonFields, ...this.filterConfig.moreFields];
  allFields.forEach(field => {
    this.$set(this.serverSearchWhere, field, '全部');
  });
}
```

### 后端BUG修复模板
```javascript
// Service层修复模板
class FixedService extends Service {
  async fixedMethod() {
    const { jianghuKnex } = this.app;
    
    // 参数验证
    if (!param) {
      throw new Error('参数不能为空');
    }
    
    // 开启事务（如需要）
    const trx = await jianghuKnex.transaction();
    
    try {
      // 修复后的业务逻辑
      const result = await this.processData();
      
      await trx.commit();
      return result;
      
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }
}
```

### 数据库修复模板
```sql
-- 数据修复脚本模板
-- 修复日期：YYYY-MM-DD
-- 修复人员：姓名
-- 问题描述：[问题描述]
-- 影响范围：[影响范围]

-- 1. 备份数据
CREATE TABLE table_name_backup AS SELECT * FROM table_name;

-- 2. 数据修复
UPDATE table_name 
SET column_name = new_value
WHERE condition;

-- 3. 验证修复结果
SELECT COUNT(*) FROM table_name WHERE condition;

-- 4. 清理备份（确认无误后）
-- DROP TABLE table_name_backup;
```

## 注意事项

1. **安全第一**：修复前一定要备份数据和代码
2. **最小影响**：优先选择影响最小的修复方案
3. **充分测试**：确保修复不会引入新问题
4. **文档记录**：详细记录修复过程和经验
5. **团队沟通**：及时与团队成员沟通修复进展
6. **监控观察**：修复后持续监控系统运行状况

## 后端搜索区域修复规范

### 后端搜索区域规范
1. **保留表格右上角前端筛选区域**：表格右上角的前端筛选（如搜索框）不要动，只修改页面顶部的后端搜索区域
2. **简化后端搜索**：如果搜索条件比较少（1-2个条件），就不用添加"更多筛选"按钮，直接在主搜索区域显示所有筛选条件
3. **统一搜索位置**：后端搜索统一在查询按钮的左边区域，使用`jh-backend-form-container`容器

## 常见BUG类型速查

### 前端常见BUG
- **数据绑定失效**：检查响应式更新机制
- **样式错乱**：检查CSS优先级和兼容性
- **事件处理异常**：检查事件绑定和作用域
- **路由跳转问题**：检查路由配置和权限

### 后端常见BUG
- **SQL注入**：使用参数化查询
- **并发问题**：添加事务和锁机制
- **内存泄漏**：检查对象引用和定时器
- **接口超时**：优化查询和增加缓存

### 数据库常见BUG
- **死锁**：优化事务顺序和锁粒度
- **性能问题**：添加索引和优化查询
- **数据不一致**：检查事务和约束
- **连接池耗尽**：优化连接管理

遵循以上流程和规范，修复BUG-$ARGUMENTS，确保修复质量和系统稳定性。 

## JianghuJS后端Service规范

### Service文件组织规范
- 每个页面的接口应集中在对应的service文件中
- service文件名与功能模块对应，使用驼峰命名，首字母小写
- 组件接口遵循命名规范：pageId为"页面文件名"，actionId为"组件文件名-接口名"

### 接口组织标准
```
app/view/page/vehicleManagement.html → app/service/vehicle.js
app/view/page/vehicleServiceManagement.html → app/service/vehicleService.js  
app/view/page/vehiclePriceCalendar.html → app/service/vehiclePriceCalendar.js
```

### _resource表配置规范

#### 标准_resource插入格式
```sql
INSERT IGNORE INTO `_resource` (`jhId`, `accessControlTable`, `resourceHook`, `pageId`, `actionId`, `desc`, `resourceType`, `appDataSchema`, `resourceData`, `requestDemo`, `responseDemo`, `operation`, `operationByUserId`, `operationByUser`, `operationAt`) VALUES 
('your-app-id', NULL, NULL, 'pageName', 'actionName', '✅接口描述', 'service', NULL, '{"service":"serviceName","serviceFunction":"methodName"}', NULL, NULL, 'insert', NULL, NULL, NULL);
```

#### 组件接口配置
- 页面组件：`pageId = "页面文件名"`
- 组件接口：`actionId = "组件文件名-接口名"`
- 方法映射：`vehiclePriceDialog-deleteSchedule` → `vehiclePriceDialogDeleteSchedule`

#### 字段说明
- `jhId`: 应用ID，通常为项目名称
- `pageId`: 页面ID，对应页面文件名  
- `actionId`: 接口ID，对应方法名或组件接口名
- `desc`: 接口描述，建议以✅开头
- `resourceType`: 资源类型，service表示服务接口
- `resourceData`: JSON格式，指定service和serviceFunction

### 后端参数验证规范（actionDataSchema）

后端 service 接口应该使用 actionDataSchema 进行参数验证，而不是在业务逻辑中手动检查。

**引入文件：**
```javascript
const validateUtil = require('@jianghujs/jianghu/app/common/validateUtil');
```

**定义验证规则：**
```javascript
const actionDataSchema = Object.freeze({
  selectRentalVehicle: {
    type: 'object',
    additionalProperties: true,
    required: ['pickUpTime', 'returnTime', 'storeIds'],
    properties: {
      pickUpTime: { type: 'string' },
      returnTime: { type: 'string' },
      isCallOutService: { type: 'boolean' },
      storeIds: { 
        type: 'array',
        minItems: 1,
        items: { type: 'string' }
      }
    }
  }
});
```

**接口函数验证：**
```javascript
async selectRentalVehicle(actionData) {
  const app = this.app;
  const { jianghuKnex } = app;
  
  // 使用 actionDataSchema 进行参数验证
  validateUtil.validate(actionDataSchema.selectRentalVehicle, actionData);
  
  const { pickUpTime, returnTime, isCallOutService, storeIds } = actionData;
  
  // 业务逻辑...
}
```

**验证规范说明：**
- service 目录下的接口文件，查询类的不要做校验
- 只有更新、删除、新增的数据才要做校验
- 使用标准的 JSON Schema 格式定义验证规则
- 验证失败时框架会自动返回标准的错误信息

### Service方法开发规范
```javascript
// 正确的Service方法结构
class VehicleService extends Service {
  
  // 基础CRUD方法
  async selectItemList() {
    const { jianghuKnex } = this.app;
    const { where, whereLike, whereIn, orderBy } = this.ctx.request.body.appData;
    // 实现查询逻辑
  }
  
  async insertItem() {
    const { jianghuKnex } = this.app;
    const { actionData } = this.ctx.request.body.appData;
    
    // 参数验证
    validateUtil.validate(actionDataSchema.insertItem, actionData);
    
    // 业务逻辑实现
    const result = await jianghuKnex('table_name', this.ctx).insert(actionData);
    return { id: result[0] };
  }
  
  // 组件接口方法 - 注意方法名转换
  async vehiclePriceDialogDeleteSchedule() {
    const { jianghuKnex } = this.app;
    const { actionData } = this.ctx.request.body.appData;
    
    // 组件接口实现
    const result = await jianghuKnex('vehicle_service_schedule')
      .where('id', actionData.id)
      .delete();
      
    return { success: true, rows: result };
  }
}
```

### 事务使用规范
```javascript
// ✅ 正确的事务写法 - JianghuJS标准模式
await jianghuKnex.transaction(async (trx) => {
  await trx('table1', this.ctx).insert(data1);
  await trx('table2', this.ctx).insert(data2);
  // 框架自动处理提交和回滚
});

// ❌ 错误的事务写法 - 手动管理
const trx = await jianghuKnex.transaction();
try {
  await trx('table1').insert(data1);
  await trx.commit();
} catch (error) {
  await trx.rollback();
}
```

## 注意
- 如果我提供的是一个BUG的文件列表，应该修复列表中的所有BUG（除了已经标识完成的，如 加了 ✅ 的）。并且在执行修复前，先分析一下，哪些BUG是依赖于其他BUG的，先修复依赖的BUG，再修复被依赖的BUG。修复之后不要更新BUG文件，完成的标识在我确认修复后手动添加标识。
- 如果涉及数据库的修改，应该提供更新的SQL语句文件到sql目录下，文件名格式为：`${修复日期}_${问题描述}.sql`。没有涉及数据库修改就不需要提供这个文件  
- 修复后端接口时，必须按照上述Service规范进行，确保_resource配置正确，方法名映射准确