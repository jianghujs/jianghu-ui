# JianghuJS UI 组件库 - AI 工具使用指南

> 如何在 Cursor、GitHub Copilot 等 AI 代码助手中使用本知识库

---

## 📖 知识库文件说明

本项目为 AI 工具准备了以下知识库文件：

| 文件名 | 说明 | 适用场景 |
|--------|------|----------|
| `AI_KNOWLEDGE_BASE.md` | 完整的组件库知识库 | 详细了解组件API和使用方法 |
| `QUICK_REFERENCE.md` | 快速参考手册 | 快速查找组件用法和代码模板 |
| `README.md` | 项目说明文档 | 了解项目概况和快速开始 |

---

## 🎯 在 Cursor 中使用

### 方法一：通过 `.cursorrules` 文件（推荐）

1. 在项目根目录创建 `.cursorrules` 文件（如果还没有）

2. 添加以下内容：

```markdown
# JianghuJS UI 组件库规则

本项目使用 JianghuJS UI 组件库（基于 Vue 2 + Vuetify 2）。

## 知识库文件
- `AI_KNOWLEDGE_BASE.md`: 完整的组件库知识库
- `QUICK_REFERENCE.md`: 快速参考手册

## 编码规范
1. 使用 JianghuJS UI 组件时，优先参考知识库文档
2. 表单使用 JhForm 或 JhModalForm 组件
3. 表格使用 JhTable 组件
4. 动态表单列表使用 JhFormList 组件
5. 遵循 Vue 2 和 Vuetify 2 的最佳实践

## 组件命名规范
- 所有组件以 `Jh` 开头
- 使用 PascalCase 命名法
- Props 使用 camelCase 命名法
- 事件使用 kebab-case 命名法

## 常见模式
请参考 QUICK_REFERENCE.md 中的场景代码模板。
```

3. 在与 Cursor 对话时，AI 会自动读取这个规则文件

### 方法二：直接在对话中引用

在 Cursor 的对话框中，你可以这样提问：

```
请参考 AI_KNOWLEDGE_BASE.md 文档，帮我创建一个用户管理页面，
包含表格、搜索筛选和新增编辑功能。
```

或者使用 `@` 符号引用文件：

```
@AI_KNOWLEDGE_BASE.md 如何使用 JhTable 实现服务端分页？
```

### 方法三：使用 Cursor 的 "Add to Chat" 功能

1. 在 Cursor 中打开 `AI_KNOWLEDGE_BASE.md` 或 `QUICK_REFERENCE.md`
2. 右键选择文件内容
3. 选择 "Add to Chat"
4. 然后在对话框中提问

---

## 🤖 在 GitHub Copilot 中使用

### 方法一：打开知识库文件

1. 在编写代码前，先在 VS Code 中打开以下文件：
   - `AI_KNOWLEDGE_BASE.md`
   - `QUICK_REFERENCE.md`

2. GitHub Copilot 会自动读取打开的文件作为上下文

3. 然后开始编写代码，Copilot 会根据知识库提供更准确的建议

### 方法二：在注释中引用

在代码文件的顶部添加注释：

```javascript
/**
 * 用户管理页面
 * 
 * 使用 JianghuJS UI 组件库:
 * - JhTable: 数据表格，支持服务端分页和高级搜索
 * - JhModalForm: 弹窗表单，用于新增和编辑
 * - JhConfirmDialog: 确认对话框，用于删除确认
 * 
 * 参考: AI_KNOWLEDGE_BASE.md
 */
```

### 方法三：使用 Copilot Chat

在 Copilot Chat 中，你可以直接引用文件：

```
参考 AI_KNOWLEDGE_BASE.md 中的 JhTable 组件说明，
帮我实现一个带高级搜索功能的用户列表页面。
```

---

## 💡 使用技巧

### 1. 提问示例

#### 基础使用

```
问：如何使用 JhTable 组件创建一个简单的数据表格？
```

#### 场景化问题

```
问：我需要实现一个用户管理页面，包含以下功能：
1. 表格展示用户列表，支持服务端分页
2. 高级搜索，可按姓名、部门、状态筛选
3. 新增/编辑用户功能（使用弹窗）
4. 删除用户功能（需要确认）
请参考 QUICK_REFERENCE.md 中的场景1代码模板。
```

#### 问题解决

```
问：我的 JhForm 表单验证不生效，如何解决？
请参考 QUICK_REFERENCE.md 的常见问题部分。
```

### 2. 代码生成建议

在提问时，明确说明：
- 需要使用的组件（如 JhTable、JhForm）
- 具体的功能需求
- 是否需要响应式布局
- 是否需要表单验证
- 是否需要权限控制

### 3. 上下文提供

在请求代码生成时，可以提供当前项目的上下文信息：

```
我正在开发一个订单管理系统，使用 Vue 2 + Vuetify 2 + JianghuJS UI。
请帮我创建一个订单列表页面，要求：
- 使用 JhTable 组件
- 支持按订单号、客户名称、订单状态筛选
- 支持查看订单详情（使用 JhDrawerForm）
- 支持导出功能

参考: QUICK_REFERENCE.md 场景1
```

---

## 🎓 最佳实践

### 1. 代码生成流程

```
1. 明确需求 → 2. 查阅知识库 → 3. 提供上下文 → 4. 请求生成 → 5. 验证调整
```

### 2. 推荐的提问模式

#### 模式一：基于场景

```
我需要实现 [具体场景]，使用 [组件名称]，
参考 [知识库文件] 中的 [具体章节]。
```

#### 模式二：基于问题

```
在使用 [组件名称] 时遇到 [具体问题]，
根据 [知识库文件] 应该如何解决？
```

#### 模式三：基于优化

```
我有以下代码 [贴出代码]，
请参考 [知识库文件] 中的最佳实践，帮我优化。
```

### 3. 知识库更新建议

当组件库更新或你发现知识库中的信息不准确时：

1. 查看组件库的在线文档：https://jianghujs.github.io/jianghu-ui/
2. 更新 `AI_KNOWLEDGE_BASE.md` 或 `QUICK_REFERENCE.md`
3. 如果使用 `.cursorrules`，同步更新规则

---

## 📋 常见使用场景

### 场景1: 创建 CRUD 页面

**提问**:
```
请参考 QUICK_REFERENCE.md 中的场景1，
帮我创建一个商品管理页面，包含完整的 CRUD 功能。
```

**AI 会生成**:
- 完整的 Vue 组件代码
- 包含 JhTable、JhModalForm 的使用
- 数据请求和事件处理逻辑

### 场景2: 实现复杂表单

**提问**:
```
请参考 AI_KNOWLEDGE_BASE.md 中的 JhForm 组件说明，
帮我创建一个用户注册表单，包含：
- 基本信息（姓名、手机、邮箱）
- 地址信息（省市区三级联动）
- 验证码输入
- 密码强度校验
```

**AI 会生成**:
- 完整的表单字段配置
- 字段联动逻辑
- 自定义验证规则

### 场景3: 优化现有代码

**提问**:
```
我有以下表格代码 [贴出代码]，
请参考 AI_KNOWLEDGE_BASE.md 中的 JhTable 最佳实践，
帮我添加高级搜索和自定义操作列功能。
```

**AI 会**:
- 分析现有代码
- 添加缺失的功能
- 提供优化建议

---

## 🔗 相关资源

### 在线文档
- **组件库文档**: https://jianghujs.github.io/jianghu-ui/
- **Storybook 示例**: https://jianghujs.github.io/jianghu-ui/

### 技术文档
- **Vue 2 文档**: https://v2.vuejs.org/
- **Vuetify 2 文档**: https://v2.vuetifyjs.com/

### AI 工具文档
- **Cursor 文档**: https://cursor.sh/docs
- **GitHub Copilot 文档**: https://docs.github.com/copilot

---

## 💬 示例对话

### 示例1: 创建页面

**你**:
```
请参考 QUICK_REFERENCE.md 场景1，
帮我创建一个员工管理页面，要求：
1. 表格显示员工列表（ID、姓名、部门、职位、状态）
2. 支持按姓名和部门搜索
3. 新增/编辑员工（弹窗形式）
4. 删除员工（需要确认）
```

**AI**:
```vue
<template>
  <div>
    <jh-table
      ref="table"
      :headers="headers"
      :request="loadData"
      :show-filter="true"
      :filter-fields="filterFields"
      @create-click="handleCreate"
      @update-click="handleUpdate"
      @delete-click="handleDelete"
    />
    
    <jh-modal-form
      v-model="showModal"
      :title="isEdit ? '编辑员工' : '新增员工'"
      :fields="formFields"
      :initial-data="currentRow"
      @confirm="handleSubmit"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: 'ID', value: 'id', width: 80 },
        { text: '姓名', value: 'name' },
        { text: '部门', value: 'department' },
        { text: '职位', value: 'position' },
        { text: '状态', value: 'status' },
        { text: '操作', value: 'action', width: 120 },
      ],
      filterFields: [
        { key: 'name', label: '姓名', type: 'text', placeholder: '请输入姓名' },
        { 
          key: 'department', 
          label: '部门', 
          type: 'select',
          options: [
            { text: '技术部', value: 'tech' },
            { text: '市场部', value: 'market' },
            { text: '人事部', value: 'hr' },
          ]
        },
      ],
      formFields: [
        { key: 'name', label: '姓名', type: 'text', required: true },
        { key: 'department', label: '部门', type: 'select', required: true, options: [] },
        { key: 'position', label: '职位', type: 'text', required: true },
        { 
          key: 'status', 
          label: '状态', 
          type: 'select',
          options: [
            { text: '在职', value: 'active' },
            { text: '离职', value: 'inactive' },
          ]
        },
      ],
      showModal: false,
      isEdit: false,
      currentRow: null,
    };
  },
  methods: {
    async loadData({ page, pageSize, filters }) {
      const res = await this.$api.getEmployeeList({ page, pageSize, ...filters });
      return { data: res.data.list, total: res.data.total };
    },
    handleCreate() {
      this.isEdit = false;
      this.currentRow = {};
      this.showModal = true;
    },
    handleUpdate(row) {
      this.isEdit = true;
      this.currentRow = { ...row };
      this.showModal = true;
    },
    async handleDelete(row) {
      await this.$api.deleteEmployee(row.id);
      this.$refs.table.reload();
    },
    async handleSubmit(data) {
      if (this.isEdit) {
        await this.$api.updateEmployee(data.id, data);
      } else {
        await this.$api.createEmployee(data);
      }
      this.showModal = false;
      this.$refs.table.reload();
    },
  },
};
</script>
```

### 示例2: 解决问题

**你**:
```
我的表单中有一个"用户类型"字段（个人/企业），
当选择企业时，需要显示"公司名称"字段，
应该如何实现？参考 AI_KNOWLEDGE_BASE.md
```

**AI**:
```javascript
// 使用字段联动功能，通过 visible 函数控制显示
const formFields = [
  {
    key: 'userType',
    label: '用户类型',
    type: 'radio',
    required: true,
    options: [
      { text: '个人', value: 'personal' },
      { text: '企业', value: 'company' },
    ],
  },
  {
    key: 'companyName',
    label: '公司名称',
    type: 'text',
    required: true,
    // 关键：使用 visible 函数实现动态显示
    visible: (formData) => formData.userType === 'company',
  },
];
```

---

## ✅ 自检清单

在使用 AI 工具生成代码后，请检查：

- [ ] 组件名称是否正确（以 `Jh` 开头）
- [ ] Props 命名是否符合 camelCase 规范
- [ ] 事件命名是否使用 kebab-case
- [ ] 表单字段是否包含必要的验证规则
- [ ] 是否正确处理了异步操作和错误处理
- [ ] 代码是否遵循 Vue 2 和 Vuetify 2 的最佳实践
- [ ] 是否添加了必要的注释

---

## 🎉 结语

通过合理使用 AI 知识库，你可以：

1. **提高开发效率** - AI 能快速生成符合规范的代码
2. **减少错误** - 基于知识库生成的代码更准确
3. **学习最佳实践** - 通过 AI 生成的代码学习组件的正确用法
4. **快速解决问题** - AI 能根据知识库提供针对性的解决方案

记住：AI 是你的助手，但最终的代码质量还是需要你来把关。始终保持对生成代码的理解和审查。

---

**有问题或建议？** 请访问项目 GitHub 仓库提交 Issue。

