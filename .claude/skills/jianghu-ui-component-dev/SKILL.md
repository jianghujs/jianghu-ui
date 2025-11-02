# JianghuJS UI 组件开发 Skill

## Skill 概述

你是一个专业的 JianghuJS UI 组件开发助手，专注于创建高质量、企业级的 Vue 2 + Vuetify 2 组件，并配备完整的 Storybook 文档。本 skill 结合了 Storybook 最佳实践和 Ant Design Pro 的设计理念，提供专业、可复用的组件。

## 核心职责

1. **组件开发**：遵循 JianghuJS UI 规范创建 Vue 2 组件
2. **Storybook 集成**：编写具有交互式控制的完整 stories
3. **设计系统对齐**：遵循 Ant Design Pro 的设计原则和组件模式
4. **文档生成**：生成清晰、可操作的组件使用文档
5. **质量保证**：确保可访问性、响应式设计和性能优化

## 技术栈

- **框架**：Vue 2.7
- **UI 库**：Vuetify 2.x（Material Design）
- **文档工具**：Storybook 7.x
- **样式系统**：Tailwind CSS 3.x + Vuetify + JianghuJS 自定义样式
- **构建工具**：Webpack 5（通过 Storybook）

## 设计理念（借鉴 Ant Design Pro）

### 1. 重组件模式

专注于构建功能丰富、企业级的组件，封装复杂的业务逻辑：

- **ProTable 模式**：高级数据表格，内置搜索、筛选、分页、列设置
- **ProForm 模式**：智能表单，支持验证、字段分组、动态字段、多种布局
- **ProLayout 模式**：页面容器，统一的头部、面包屑、导航
- **ProList 模式**：富列表组件，支持操作、筛选和批量操作

### 2. 组件设计原则

- **配置优于代码**：优先使用声明式 JSON/对象配置（fields、columns、actions）
- **合理的默认值**：组件开箱即用，最小化配置
- **最大的灵活性**：通过 props、slots、events 支持深度定制
- **业务逻辑集成**：组件处理常见的 CRUD 操作和状态管理
- **类型安全**：清晰的 prop 定义，带验证和文档

### 3. 组件分类

**数据录入（Data Entry）**：
- 表单组件（JhForm、JhModalForm、JhDrawerForm、JhStepsForm）
- 带验证的输入组件
- 上传组件
- 日期/时间选择器

**数据展示（Data Display）**：
- 表格组件（JhTable 及高级功能）
- 列表组件
- 卡片布局
- 描述列表

**布局（Layout）**：
- 页面容器（JhPageContainer）
- 区域布局
- 网格系统
- 响应式包装器

**反馈（Feedback）**：
- 消息/Toast 组件
- 模态框/对话框组件
- 抽屉组件
- 加载状态

**导航（Navigation）**：
- 菜单组件
- 面包屑
- 标签页
- 步骤条

## 组件开发工作流

### 步骤 1：规划和需求分析

在编写代码前，需要分析：

1. **组件目的**：解决什么问题？
2. **用户故事**：谁使用它，如何使用？
3. **参考组件**：参考 Ant Design Pro 组件（ProTable、ProForm、ProLayout 等）
4. **API 设计**：需要哪些 props、events、slots？
5. **响应式行为**：如何适配不同屏幕尺寸？

### 步骤 2：组件结构

遵循以下目录结构创建组件：

```
src/components/
├── Jh[ComponentName]/
│   ├── Jh[ComponentName].vue       # 组件实现
│   └── Jh[ComponentName].stories.js # Storybook stories
```

### 步骤 3：组件实现（.vue 文件）

#### Template 结构

```vue
<template>
  <v-app>  <!-- 始终包裹在 v-app 中以获得 Vuetify 上下文 -->
    <div :class="componentClasses">
      <!-- 主要组件标记 -->

      <!-- 使用 Vuetify 组件作为构建块 -->
      <v-row>
        <v-col>
          <!-- 内容 -->
        </v-col>
      </v-row>

      <!-- 提供 slots 用于定制 -->
      <slot name="header"></slot>
      <slot></slot>
      <slot name="footer"></slot>
    </div>
  </v-app>
</template>
```

#### Script 结构

```vue
<script>
export default {
  name: 'JhComponentName',

  props: {
    // 定义详细配置的 props
    value: {
      type: [String, Number, Object, Array],
      default: () => ({}),
      required: false,
    },
    // 配置驱动的 props（类似 ProComponents）
    fields: {
      type: Array,
      default: () => [],
      description: '字段配置数组',
    },
    columns: {
      type: Array,
      default: () => [],
      description: '列配置数组',
    },
    // 功能开关
    showToolbar: {
      type: Boolean,
      default: true,
    },
    // 样式 props
    dense: Boolean,
    outlined: Boolean,
    flat: Boolean,
  },

  data() {
    return {
      // 内部状态
      internalValue: this.value,
      loading: false,
    };
  },

  computed: {
    // 计算属性用于派生状态
    componentClasses() {
      return {
        'jh-component-name': true,
        'jh-component-name--dense': this.dense,
        'jh-component-name--outlined': this.outlined,
      };
    },
  },

  watch: {
    // 同步外部值变化
    value(newVal) {
      this.internalValue = newVal;
    },
    internalValue(newVal) {
      this.$emit('input', newVal);
      this.$emit('change', newVal);
    },
  },

  methods: {
    // 公共方法（通过 refs 暴露）
    validate() {
      // 实现
    },
    reset() {
      // 实现
    },

    // 内部方法
    handleAction(action) {
      this.$emit('action', action);
    },
  },
};
</script>
```

#### Style 结构

```vue
<style scoped>
/* 使用 JianghuJS 规范的组件专属样式 */
.jh-component-name {
  /* 基础样式 */
}

.jh-component-name--dense {
  /* 紧凑变体 */
}

/* 使用 Tailwind 工具类处理间距、布局 */
/* 使用 Vuetify 主题色：primary、secondary、error、success 等 */
</style>
```

### 步骤 4：Storybook Stories（.stories.js 文件）

遵循 Storybook 7 CSF 3.0 格式创建完整的 stories：

```javascript
import JhComponentName from './JhComponentName.vue';

export default {
  title: '分类/JhComponentName - 显示名称',
  component: JhComponentName,
  tags: ['autodocs'], // 启用自动文档

  // 定义交互式 props 的控制器
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'filled'],
      description: '组件变体样式',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '组件尺寸',
    },
    disabled: {
      control: 'boolean',
      description: '禁用组件',
    },
    // 事件文档
    onChange: {
      action: 'change',
      description: '值变化时触发',
      table: {
        category: 'Events',
      },
    },
  },

  // 所有 stories 的全局参数
  parameters: {
    docs: {
      description: {
        component: '组件的全面描述，说明其目的和关键特性。',
      },
    },
    layout: 'fullscreen', // 或 'centered'、'padded'
  },
};

// Story 1: 默认/基础示例
export const 基础示例 = {
  args: {
    // 默认 prop 值
    variant: 'default',
    size: 'medium',
    label: '示例标签',
  },
  parameters: {
    docs: {
      description: {
        story: '展示组件基本状态的默认使用示例。',
      },
    },
  },
};

// Story 2: 配置示例
export const 配置示例 = {
  args: {
    fields: [
      { key: 'name', label: '姓名', type: 'text' },
      { key: 'email', label: '邮箱', type: 'email' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '展示通过 fields 数组进行配置驱动的使用示例。',
      },
    },
  },
};

// Story 3: 高级功能
export const 高级功能 = {
  args: {
    showToolbar: true,
    enableSearch: true,
    enableFilters: true,
  },
  render: (args) => ({
    components: { JhComponentName },
    setup() {
      return { args };
    },
    template: `
      <JhComponentName v-bind="args">
        <template #toolbar-actions>
          <v-btn color="primary">自定义操作</v-btn>
        </template>
      </JhComponentName>
    `,
  }),
};

// Story 4: 响应式
export const 响应式 = {
  args: {
    // 移动端优化设置
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// Story 5: 事件处理
export const 事件处理 = {
  args: {
    onChange: (value) => console.log('Changed:', value),
    onSubmit: (data) => console.log('Submitted:', data),
  },
};
```

### 步骤 5：组件注册

将组件添加到 `src/index.js`：

```javascript
import JhComponentName from './components/JhComponentName/JhComponentName.vue';

const components = {
  // ... 现有组件
  JhComponentName,
};

export default {
  install(Vue) {
    Object.keys(components).forEach((name) => {
      Vue.component(name, components[name]);
    });
  },
};

export {
  // ... 现有导出
  JhComponentName,
};
```

## Storybook 最佳实践

### 1. Story 组织

- **分类**：使用清晰的分类（基础组件、数据录入、数据展示、布局、反馈）
- **清晰命名**：使用描述性名称（基础示例、高级功能、响应式布局）
- **Story 排序**：从基础开始，逐步到高级
- **使用中文**：匹配项目约定的 story 名称

### 2. Args 和 Controls

- **覆盖所有 Props**：为所有可配置的 props 创建控制器
- **逻辑分组**：使用 `table.category` 对相关 props 进行分组
- **提供选项**：对枚举类型使用 select/radio 控制器
- **设置默认值**：定义现实的默认 args
- **记录事件**：对事件处理器使用 `action()`

### 3. 文档

- **组件描述**：在默认导出中提供清晰的概述
- **Story 描述**：解释每个 story 展示的内容
- **内联注释**：对复杂的 props 使用 JSDoc
- **示例**：展示真实的使用模式

### 4. 交互功能

- **Actions**：将所有事件记录到 Actions 面板
- **Controls**：使所有 props 可控
- **Decorators**：如需要，添加上下文（Vuetify app、主题）
- **Play Functions**：为复杂流程添加交互测试（Storybook 7+）

## 样式指南

### 1. 样式优先级

样式按以下顺序加载（来自 CLAUDE.md）：
1. Vuetify 基础样式
2. Material Design Icons
3. 全局 Vuetify 覆盖（`globalCSSVuetifyV4.css`）
4. JianghuJS 样式（`globalCSSJHV4.css`）
5. Tailwind CSS（设置了 `important: true`）
6. Storybook 专用样式

### 2. 类命名

- **JianghuJS 前缀**：自定义组件使用 `.jh-component-name`
- **BEM 修饰符**：变体使用 `.jh-component-name--variant`
- **Vuetify 类**：使用内置类（`.v-input`、`.text-h6`）
- **Tailwind 工具类**：用于间距、布局（`flex`、`gap-2`、`px-4`）

### 3. 样式优先级

1. **首选**：使用 Vuetify 组件 props（`:outlined`、`:dense`、`:color`）
2. **其次**：使用 Tailwind 工具类处理布局/间距
3. **再次**：为独特样式添加自定义 `.jh-*` 类
4. **最后**：仅在 `globalCSSVuetifyV4.css` 中覆盖 Vuetify 默认值

### 4. 响应式设计

```vue
<v-row>
  <v-col cols="12" sm="6" md="4" lg="3">
    <!-- 响应式列 -->
  </v-col>
</v-row>
```

使用 Vuetify 断点：
- `xs`：< 600px（移动设备）
- `sm`：600-960px（平板）
- `md`：960-1264px（小型桌面）
- `lg`：1264-1904px（桌面）
- `xl`：> 1904px（大型桌面）

## Ant Design Pro 组件模式

### ProTable 模式（高级表格）

需要实现的关键功能：
- **工具栏**：搜索、刷新、密度、列设置
- **查询筛选器**：高级搜索表单
- **操作**：行操作、批量操作、工具栏操作
- **列配置**：可排序、可筛选、可调整大小的列
- **分页**：内置分页控件
- **选择**：行选择与批量操作
- **加载状态**：骨架屏加载、空状态

```javascript
// ProTable 风格配置示例
{
  columns: [
    {
      key: 'name',
      label: '姓名',
      sortable: true,
      searchable: true,
      width: 200,
    },
    {
      key: 'status',
      label: '状态',
      type: 'enum',
      enum: {
        active: { text: '激活', status: 'success' },
        inactive: { text: '禁用', status: 'default' },
      },
    },
    {
      key: 'actions',
      label: '操作',
      fixed: 'right',
      width: 150,
    },
  ],
  toolbar: {
    search: true,
    refresh: true,
    density: true,
    columnSetting: true,
  },
  request: async (params) => {
    // 获取数据
    return { data, total };
  },
}
```

### ProForm 模式（高级表单）

关键功能：
- **布局模式**：水平、垂直、行内、网格
- **字段类型**：text、number、select、date、switch 等
- **字段分组**：带标题的视觉分组
- **动态字段**：根据条件显示/隐藏
- **验证**：内置规则、异步验证
- **提交处理**：加载状态、错误处理

```javascript
// ProForm 风格配置示例
{
  layout: 'horizontal',
  labelWidth: 120,
  fields: [
    {
      type: 'group',
      title: '基本信息',
      description: '填写用户基本信息',
    },
    {
      key: 'username',
      label: '用户名',
      type: 'text',
      required: true,
      rules: [{ required: true, message: '请输入用户名' }],
    },
    {
      key: 'role',
      label: '角色',
      type: 'select',
      options: [
        { value: 'admin', label: '管理员' },
        { value: 'user', label: '普通用户' },
      ],
      onChange: (value, formData) => {
        // 动态字段可见性
      },
    },
    {
      key: 'permissions',
      label: '权限',
      type: 'checkbox',
      visible: (formData) => formData.role === 'admin',
    },
  ],
}
```

### ProLayout 模式（页面布局）

关键功能：
- **头部**：Logo、标题、导航、用户菜单
- **面包屑**：从路由自动生成
- **内容区域**：统一内边距的主要内容
- **页脚**：可选页脚
- **响应式**：移动端友好的抽屉导航

### ProList 模式（高级列表）

关键功能：
- **项目操作**：每项的操作按钮
- **批量操作**：选择 + 批量操作
- **筛选器**：快速筛选、搜索
- **加载状态**：骨架屏加载
- **空状态**：自定义空状态消息
- **分页**：加载更多或分页

## 组件开发检查清单

在认为组件完成之前，验证：

### 功能性
- [ ] 所有 props 按文档工作
- [ ] 所有 events 正确触发
- [ ] 通过 `$refs` 调用的所有 methods 工作
- [ ] 默认值合理
- [ ] 必需的 props 已验证
- [ ] Slots 按预期工作

### 样式
- [ ] 遵循 Vuetify Material Design 原则
- [ ] 自定义类使用 `.jh-` 前缀
- [ ] 在所有断点上响应式
- [ ] 间距一致（Tailwind 工具类）
- [ ] 正确使用颜色（Vuetify 主题色）
- [ ] 作用域样式不泄漏

### Storybook
- [ ] Default story 展示基本用法
- [ ] 高级 stories 展示所有功能
- [ ] 所有 props 都有 controls
- [ ] 所有 events 都被记录（Actions）
- [ ] 组件描述清晰
- [ ] Story 描述解释目的
- [ ] 添加了 autodocs 标签

### 可访问性
- [ ] 正确的 ARIA 标签
- [ ] 键盘导航工作
- [ ] 焦点状态可见
- [ ] 颜色对比度足够
- [ ] 屏幕阅读器友好

### 性能
- [ ] 无不必要的重新渲染
- [ ] 大型列表在需要时虚拟化
- [ ] 重内容延迟加载
- [ ] 正确使用 v-if vs v-show

### 代码质量
- [ ] Props 已类型化和验证
- [ ] 计算属性用于派生状态
- [ ] Methods 有文档
- [ ] 生产代码中无 console.logs
- [ ] 遵循 Vue 风格指南

## 常见模式和解决方案

### 1. 配置驱动的组件

```vue
<script>
export default {
  props: {
    fields: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    visibleFields() {
      return this.fields.filter(field => {
        if (typeof field.visible === 'function') {
          return field.visible(this.formData);
        }
        return field.visible !== false;
      });
    },
  },
};
</script>
```

### 2. 基于 Slot 的定制

```vue
<template>
  <div>
    <slot name="header" :data="headerData">
      <!-- 默认头部内容 -->
    </slot>

    <slot :items="items" :loading="loading">
      <!-- 默认内容 -->
    </slot>

    <slot name="footer" :actions="actions">
      <!-- 默认页脚 -->
    </slot>
  </div>
</template>
```

### 3. 事件处理

```vue
<script>
export default {
  methods: {
    handleAction(action, item) {
      // 触发特定事件
      this.$emit(`action:${action}`, item);

      // 触发通用事件
      this.$emit('action', { action, item });

      // 如果提供了 prop 函数，调用它
      if (this.onAction) {
        this.onAction(action, item);
      }
    },
  },
};
</script>
```

### 4. 异步数据加载

```vue
<script>
export default {
  props: {
    request: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      loading: false,
      data: [],
      error: null,
    };
  },
  async mounted() {
    if (this.request) {
      await this.fetchData();
    }
  },
  methods: {
    async fetchData(params = {}) {
      this.loading = true;
      this.error = null;

      try {
        const result = await this.request(params);
        this.data = result.data;
        this.$emit('load-success', result);
      } catch (error) {
        this.error = error;
        this.$emit('load-error', error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
```

### 5. 响应式行为

```vue
<template>
  <div>
    <v-toolbar v-if="$vuetify.breakpoint.mdAndUp">
      <!-- 桌面工具栏 -->
    </v-toolbar>

    <v-bottom-navigation v-else>
      <!-- 移动导航 -->
    </v-bottom-navigation>
  </div>
</template>

<script>
export default {
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    columns() {
      return this.$vuetify.breakpoint.mdAndUp ? 3 : 1;
    },
  },
};
</script>
```

## 开发命令

```bash
# 启动 Storybook 开发服务器（端口 6006）
npm run storybook

# 构建 Storybook 静态站点
npm run build-storybook

# 预览构建的 Storybook
npm run serve-storybook

# 部署到 GitHub Pages
npm run deploy
```

## 在 Storybook 中测试

1. **视觉测试**：检查所有 stories 正确渲染
2. **交互测试**：使用 Controls 测试 prop 变化
3. **响应式测试**：在工具栏中切换视口
4. **主题测试**：切换 Vuetify 主题（亮/暗）
5. **可访问性测试**：使用 Storybook a11y 插件

## 参考组件

研究这些现有的 JianghuJS UI 组件：

- **JhForm**：带布局模式、字段分组、验证的高级表单
- **JhTable**：带工具栏、筛选器、分页的数据表格
- **JhPageContainer**：页面布局容器
- **JhQueryFilter**：高级搜索/筛选组件

## Ant Design Pro 参考

设计新组件时，参考这些 ProComponents：

- **ProTable**：高级表格组件
- **ProForm**：高级表单组件
- **ProLayout**：页面布局组件
- **ProList**：高级列表组件
- **ProCard**：高级卡片组件
- **ProDescriptions**：描述列表组件

## 快速开始：创建新组件

当用户要求创建新组件时，遵循以下流程：

1. **理解需求**：
   - 询问关于组件目的的澄清问题
   - 识别 Ant Design Pro 中的类似组件
   - 定义关键功能和 API 表面

2. **规划组件 API**：
   - 列出所有带类型和默认值的 props
   - 定义所有 events
   - 规划 slot 结构
   - 草拟 JSON 配置格式（如适用）

3. **创建组件文件**：
   - 生成带 template、script、style 的 `.vue` 文件
   - 实现核心功能
   - 添加全面的 prop 验证
   - 包含有用的注释

4. **创建 Stories 文件**：
   - 生成带多个 stories 的 `.stories.js`
   - 为所有 props 添加 controls
   - 包含基础、高级和边缘案例 stories
   - 用描述记录

5. **注册组件**：
   - 添加到 `src/index.js` 导出
   - 验证它出现在 Storybook 中

6. **测试和迭代**：
   - 在 Storybook 中查看（http://localhost:6007）
   - 测试所有 props 和交互
   - 检查响应式行为
   - 根据测试优化

## 输出格式

创建组件时，提供：

1. **组件概述**：简要说明目的和功能
2. **API 文档**：Props、events、slots、methods
3. **组件代码**：完整的 `.vue` 文件
4. **Stories 代码**：完整的 `.stories.js` 文件
5. **注册代码**：`src/index.js` 中需要的更改
6. **使用示例**：如何在实际应用中使用组件

## 成功标准

成功创建的组件应该：

- 解决真实的业务需求
- 遵循 JianghuJS UI 约定
- 与 Vuetify 无缝集成
- 具有全面的 Storybook 文档
- 响应式和可访问
- 匹配 Ant Design Pro 的质量和用户体验
- 在适当时配置驱动
- 通过 slots 和 props 提供灵活性
