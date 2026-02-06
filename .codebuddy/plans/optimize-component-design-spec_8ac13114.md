---
name: optimize-component-design-spec
overview: 为江湖UI组件库创建完整详细的设计规范，涵盖基础规范系统、34个组件的分类规范、交互设计原则，以及Tailwind CSS实现指南，便于重构现有组件UI并保证设计一致性。
todos:
  - id: analyze-current-components
    content: 分析34个现有组件的实现，提取设计共性和差异特征
    status: completed
  - id: create-global-design-spec
    content: 编写全局设计系统规范 - 色彩、字体、间距、圆角、阴影、边框系统
    status: completed
    dependencies:
      - analyze-current-components
  - id: create-component-categories-spec
    content: 按6个类别编写组件分类设计规范 - 表单、表格、数据展示、对话框、选择器、其他
    status: completed
    dependencies:
      - create-global-design-spec
  - id: create-interaction-animation-spec
    content: 补充交互状态规范 - Hover、Active、Disabled、Loading等，以及动效/过渡规范
    status: completed
    dependencies:
      - create-global-design-spec
  - id: create-tailwind-implementation-guide
    content: 编写Tailwind CSS实现参考 - Token映射、类示例、定制配置
    status: completed
    dependencies:
      - create-global-design-spec
  - id: create-responsive-accessibility-guide
    content: 编写响应式设计和无障碍访问指南 - 断点、缩放、对比度、交互元素尺寸
    status: completed
    dependencies:
      - create-global-design-spec
  - id: create-design-tokens-reference
    content: 生成完整的设计Token参考表 - CSS变量、色彩值、字体参数、间距值
    status: completed
    dependencies:
      - create-global-design-spec
  - id: verify-and-integrate
    content: 审验所有规范文档的一致性，整合成规范体系，更新主文档索引
    status: completed
    dependencies:
      - create-component-categories-spec
      - create-interaction-animation-spec
      - create-tailwind-implementation-guide
      - create-responsive-accessibility-guide
      - create-design-tokens-reference
  - id: update-old-spec-doc
    content: 用新的完整规范体系替换原有的简化规范文档 jianghu-ui 组件设计规范.md
    status: completed
    dependencies:
      - verify-and-integrate
---

## 需求概述

优化和完善 `docs/design/jianghu-ui 组件设计规范.md` 文档，使其成为一套完整、详细、可实操的设计系统规范指南。

## 核心需求

### 1. 规范范围扩展

- 现有文档仅涵盖5个基础组件（按钮、输入框、表格、卡片、图标）
- 需扩展至全部34个组件（表单、表格、数据展示、对话框、选择器、编辑器、布局/导航等）
- 为每个组件类别提供详细的设计指导

### 2. 规范深度提升

- 扩展圆角、边框、色彩、字体、间距的具体规范值
- 增加交互状态规范（Hover、Active、Disabled、Loading等）
- 补充动画/过渡效果规范
- 完善响应式设计指导（移动端、平板、桌面端）
- 提供Tailwind CSS实现细节和class示例

### 3. 实用性增强

- 为每组规范配备实现代码示例
- 提供CSS变量/Token定义
- 增加常见模式和最佳实践
- 包含无障碍访问(A11y)基本要求

## 输出结构

生成以下文件：

1. **jianghu-ui_design_specification.md** - 完整的全局设计系统规范（主文档）
2. **component_categories_guide.md** - 按组件分类的详细规范（表单、表格、对话框等）
3. **interaction_animation_spec.md** - 交互与动效规范（状态转换、过渡、动画）
4. **tailwind_implementation_guide.md** - Tailwind CSS实现参考和Token配置
5. **responsive_accessibility_guide.md** - 响应式设计和无障碍访问指南
6. **design_tokens_reference.md** - 完整的设计Token/变量参考表

## 使用场景

- 指导开发者快速正确地重构现有组件UI
- 为新组件开发提供明确的设计标准
- 保证整个组件库的视觉一致性和交互一致性
- 加速设计评审和开发沟通效率

## 技术栈选择

**现有项目技术栈**:

- Vue 2.7 + Vuetify 2.x（组件库框架）
- Tailwind CSS（样式管理）
- Storybook（文档系统）
- 全局CSS变量 + scoped CSS（样式实现）

**设计系统工具**:

- Markdown（规范文档）
- CSS/SCSS（实现参考）
- Figma（可选的视觉设计工具）

## 实现策略

### 1. 全局设计系统定义

基于项目现状构建完整的设计系统，包括：

- **色彩系统**: 主色、功能色、中性色、语义色的完整定义及对应的Tailwind类
- **字体系统**: 不同尺寸级别(H1-H6、Body、Small)的具体参数(font-size、font-weight、line-height)
- **间距系统**: 基础间距单元(8px)的倍数规范，应用到padding、margin、gap
- **圆角系统**: 不同组件类型的统一圆角值(4px、6px、8px、12px)
- **阴影系统**: 深度层级对应的阴影值(elevation 0-24)
- **边框系统**: 默认边框宽度、颜色、样式的统一规范

### 2. 组件分类规范设计

将34个组件分为6类，为每类定制规范：

- **表单组件** (5个): JhForm、JhFormField、JhFormFields、JhFormList、JhFileInput
- 输入框高度、内边距、焦点状态、错误状态
- 标签、提示文字、错误提示的样式规范

- **表格/列表组件** (3个): JhTable、JhEditableTable、JhList
- 行高、单元格padding、表头样式、hover效果
- 操作列、排序、筛选的交互规范

- **数据展示组件** (5个): JhCard、JhCheckCard、JhDescriptions、JhStatisticCard、JhList
- 卡片的padding、border、shadow
- 内容排版、标题级别、数据对齐

- **对话框/抽屉组件** (5个): JhModal、JhModalForm、JhConfirmDialog、JhDrawer、JhDrawerForm
- 弹窗宽度、z-index、背景蒙层opacity
- 关闭按钮、操作按钮组的布局规范

- **选择器/输入组件** (4个): JhAddressSelect、JhTreeSelect、JhDateRangePicker、JhQueryFilter
- 下拉框尺寸、选项项高度、分组间距
- 搜索框、筛选的交互样式

- **其他功能组件** (12个): 编辑器、布局、导航、图标、提示等
- 每类组件的特定规范

### 3. 交互与动效规范

定义所有组件的标准交互行为：

- **状态转换**: Hover、Active、Disabled、Loading、Error、Success
- 每种状态的color、background、opacity、cursor变化
- Transition duration统一为200ms/300ms

- **过渡效果**: 所有状态变化使用cubic-bezier(0.4, 0, 0.2, 1)
- **动画规范**: Loading动画、展开/收缩、fade等共用的animation定义
- **焦点状态**: 键盘导航、Tab焦点的边框/阴影效果

### 4. Tailwind实现指南

提供实践中的Tailwind CSS类映射：

- **色彩映射**: 设计系统的主色、功能色对应的Tailwind色板
- **间距映射**: 8px基数单位对应的Tailwind类(p-2=8px, p-3=12px等)
- **圆角映射**: 4px、6px、8px、12px对应的Tailwind rounded类
- **阴影映射**: elevation级别对应的shadow类
- **响应式前缀**: sm:、md:、lg:、xl:在不同断点的应用

### 5. 响应式和无障碍设计

- **响应式断点**: 320px(mobile)、768px(tablet)、1024px(desktop)、1440px(wide)
- 各断点下的字体大小、间距、布局的缩放规则

- **无障碍要求**: 
- 色彩对比度达到WCAG AA标准(4.5:1)
- 交互元素最小44px×44px
- 键盘导航支持、ARIA标签

## 实现方法

采用**文档优先**的方法，按以下顺序执行：

1. **分析现状**: 审视现有34个组件的实现，提取共同的设计特征
2. **建立Token系统**: 定义可复用的设计Token(色彩、字体、间距、动效)
3. **撰写系统规范**: 生成主规范文档，定义全局原则和模式
4. **分类详细化**: 为每个组件类别补充具体的规范指导
5. **补充实现参考**: 提供Tailwind实现示例和CSS代码片段
6. **迭代验证**: 对比现有组件实现，保证规范的可行性和一致性

## 关键设计决策

- **颜色系统**: 采用低饱和度的功能色系(保留原规范的#10B981主色)，避免过度鲜艳
- **间距单元**: 以8px作为基础单元，所有间距均为8的倍数，便于Tailwind映射
- **圆角一致性**: 基础元素4px，大容器6-8px，避免12px以上的过大圆角
- **动效时长**: 使用200ms/300ms两档速度，避免过快或过慢的感知
- **兼容性**: 所有规范均基于当前的Vue 2.7+Vuetify 2.x+Tailwind CSS的实现能力

## 性能与质量考量

- **文档规模**: 预期生成5份详细的markdown文件(总计5000+行)，便于分模块参考
- **更新维护**: 采用模块化结构，便于后续的增量更新
- **版本控制**: 所有文档纳入git管理，支持版本历史和变更追踪