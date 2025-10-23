## 背景与目标

随着团队和产品规模增长，**界面风格不一致**的问题日益显现：不同开发者或不同项目中，按钮、色调、间距等细节容易出现差异，长期下来导致用户体验割裂、开发效率下降。

另一方面，缺少统一的组件库时，团队往往会重复造轮子，各自实现相似功能组件，既浪费人力又难以维护。实际上，仅有易用的组件并不足以解决问题：如果没有共享的设计令牌和规范，即使组件库易用，一致性仍会很快丧失。

- 没有在线预览调试组件
- 组件更新文档没有更新
- 一键复制各种配置的组件代码
- 等等

**项目目标**是通过构建统一的UI组件库来**提高界面一致性和开发效率**：定义共享的视觉语言，封装常用组件，实现复用和统一风格，并简化团队协作和维护。组件库以 Vuetify2 为基础，提供诸如 `jh-menu`、`jh-table` 等封装组件，

同时利用 Storybook 提供在线预览、调试和复制代码功能，使开发者能快速了解和使用各组件。对于**生成式 AI**（如 Claude Code）等新兴技术，我们希望借助组件库为 AI 提供“视觉语言词典”，从而让其生成的界面保持风格一致。

## 技术选型与架构

-   **Vue2 + Vuetify2**：现有项目基于 Vue2，团队熟悉该框架；Vuetify2 提供了基于 Google 材料设计规范的丰富组件和主题功能，可快速实现风格统一。Vuetify 的主题可定制性强，内置响应式布局，方便适配多种屏幕。

-   **Storybook**：作为前端组件隔离开发环境，Storybook 可以单独预览组件、测试各种状态，并生成属性文档。引入 Storybook 后，组件库可在线演示示例和代码片段，方便团队查看和调试各组件。

-   **整体架构**：组件库项目组织为一个独立的包（可发布到 npm 私服），其中包含组件源码、样式和 Storybook 配置。我们通过 Vue 插件模式**全局注册** Vuetify 及组件，确保应用和 Storybook 使用相同的配置。例如，在 `src/plugins/vuetify.js` 中创建并导出 Vuetify 实例配置，然后在 Storybook 的配置文件中复用这些配置，实现样式和主题的统一。组件库编译后，在业务项目中以依赖包形式引用；也可以提供插件安装方式（`Vue.use(JhUI)`），使团队按需全局注册组件。

## 组件设计规范

-   **命名规范**：所有组件名称统一加项目前缀，如 `jh-menu`、`jh-table` 等，避免与原有库冲突。文件名使用 PascalCase（如 `JhMenu.vue`），模板中使用 kebab-case 标签。

-   **Props 设计**：每个组件需显式定义必要的 props，类型和默认值应明确、合理。尽量复用 Vuetify 组件的 props 语义，减少冗余属性。例如，可以通过一个通用的 `variant` 属性控制按钮样式，而不是为每种风格创建多个组件。Props 名称使用驼峰式（JS 代码中）及相应的模板中小写中划线形式。

-   **Slots 使用**：充分利用 Vue 的插槽机制提供扩展性。一般来说，组件主体内容通过**默认插槽**传入，必要时定义具名插槽（如 `header`、`footer` 等）以支持自定义模板。例如，下拉菜单组件可将菜单项放在默认插槽中，触发器文本通过 prop 提供；对话框组件可使用具名插槽插入标题、内容和操作按钮。**示例**（`jh-menu` 封装）：

    ```
    <!-- JhMenu.vue -->
    <template>
      <v-menu>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on">{{ title }}</v-btn>
        </template>
        <!-- 菜单项放在默认插槽 -->
        <slot/>
      </v-menu>
    </template>
    <script>
    export default {
      name: 'JhMenu',
      props: {
        title: { type: String, required: true },
        // 更多 props...
      },
    };
    </script>
    ```

-   **响应式设计**：依托 Vuetify 的栅格系统和显示/隐藏类，确保组件在不同屏幕下自适应。组件样式尽量简化，避免硬编码尺寸和断点，可使用 Vuetify 的断点服务（如 `this.$vuetify.breakpoint`）或 CSS 的响应式工具类来控制布局和可见性。

## Storybook 集成方案

-   **组织结构**：在 `.storybook` 目录下设置 Storybook 配置。组件故事文件（`.stories.js` 或 MDX）应按模块分类，如 `导航`、`表格`、`表单` 等。例如，可在每个组件目录下编写对应的 `*.stories.js`。在故事配置中，通过 `title` 字段指定分组（如 `导航/JhMenu`），使 Storybook 侧边栏层级清晰。

-   **代码示例与交互演示**：启用 Storybook 的 Docs 中的代码面板，可在浏览组件时显示其源代码。具体做法是在 `.storybook/preview.js` 中全局设置 `parameters.docs.codePanel = true`。这样，在查看组件的 Canvas 时，右侧 Docs 会展示带有当前 prop 值的代码片段，开发者可以复制粘贴使用。我们还将利用 Storybook 的 Args/Controls 功能为组件属性生成交互控件，让使用者动态调整 props，实时观察效果。

-   **示例故事结构**：采用组件故事格式（CSF）编写故事。下面是一个简单示例：

    ```
    import JhMenu from '@/components/JhMenu.vue';

    export default {
      title: '导航/JhMenu',
      component: JhMenu,
      argTypes: { title: { control: 'text', description: '菜单标题' } },
    };

    const Template = (args, { argTypes }) => ({
      components: { JhMenu },
      props: Object.keys(argTypes),
      template: '<jh-menu :title="title">菜单项1<br/>菜单项2</jh-menu>',
    });

    export const Default = Template.bind({});
    Default.args = { title: '示例菜单' };
    ```

    通过如上配置，Storybook 会自动生成属性面板和交互控件，可在线预览 `JhMenu` 组件的不同状态。我们还可以在文档中编写 Markdown 或 MDX 说明，如示例用法和注意事项。

## 使用方式

开发者在业务项目中使用该组件库时，可通过以下方式快速集成和构建页面：

-   **引用组件**：安装组件库后，在 Vue 文件中按需引入组件。例如：

    ```
    <template>
      <div>
        <jh-menu title="主菜单"/>
        <jh-table :items="tableData"/>
      </div>
    </template>
    <script>
    import { JhMenu, JhTable } from 'jh-ui-library';
    export default {
      components: { JhMenu, JhTable },
      data() { return { tableData: [/*...*/] }; }
    }
    </script>
    ```

    如果组件库作为 Vue 插件发布，也可在项目入口处统一注册，之后无需逐个引入即可在模板中使用。组件名与库中定义的 `name` 保持一致，例如 `<jh-menu>`、`<jh-table>` 等。

-   **快速搭建页面**：使用组件库提供的常用组件块，例如布局网格、导航菜单、表格、表单控件等，可以快速拼装页面框架。开发者只需提供业务数据和必要的配置即可。例如，将 `JhTable` 和 `JhPagination` 组件结合，快速构建可分页的列表；使用 `JhDialog` 统一弹出窗口样式。通过复用封装好的组件，能大大缩短开发时间并保证 UI 风格一致。

## AI 集成展望

未来我们计划结合智能助手工具（如 Claude Code、GitHub Copilot 等）来进一步提升开发效率。借助组件库，我们可以为 AI 提供明确的结构和规范：例如在项目根目录创建 `CLAUDE.md` 文件，将组件用法、代码风格、常用命令等写入其中，Claude Code 运行时会自动加载这些上下文。这样，当工程师向 AI 机器人描述需求（或传递 JSON 结构）时，AI 会参考已有组件库来生成代码，实现风格统一的 UI 设计。例如，可以预先定义好页面的 JSON 布局结构，让 AI 将其映射为包含 `JhMenu`、`JhTable` 等组件的 Vue 代码，从而避免生成杂乱无章的样式。我们也可以开发示例 Prompt 或工作流程脚本，引导 AI 在项目环境中执行命令，以自动化地生成或修改页面组件。

## 后续规划

-   **新增组件**：后续将优先丰富核心组件集合，包括但不限于按钮、输入框、表单控件、表格、导航菜单、对话框、选项卡等。此后可逐步扩展更多常用组件（如图表、标签页、通知消息等），满足产品需求。每个新组件都会遵循上述设计规范，并配套 Storybook 示例。
-   **Vue3/Vuetify3 迁移**：鉴于 Vuetify2 已于 2025 年 1 月达到生命周期终止（EOL）[v2.vuetifyjs.com](https://v2.vuetifyjs.com/en/about/eol/#:~:text=Effective%20January%2025th%2C%202025%2C%20Vuetify,CDNs%2C%20package%20managers%2C%20and%20GitHub)，我们将评估升级到 Vue3 和 Vuetify3 的可行性。Vue3、Vuetify3 带来更好的性能和特性，但迁移成本较高；我们会在兼顾现有稳定性的前提下规划升级路径，确保未来版本兼容并逐步迁移。
-   **组件测试**：引入自动化测试以保证质量。计划使用 Vue Test Utils + Jest 进行单元测试，验证组件渲染和交互行为；同时可编写快照测试监控 UI 变更。借助 CI/CD 管道，在每次提交时运行测试，及时发现回归问题。
-   **文档自动化**：除了 Storybook 文档外，我们将探索结合自动化工具生成其他文档形式。例如利用 JSDoc/VuePress 等为组件 API 生成静态文档站点，或使用 Storybook 的 DocsPage 自动汇总组件说明。我们还会维护版本发布日志和变更记录，采用语义化版本控制（SemVer）管理发布，确保团队成员对更新有清晰预期。

通过上述方案和持续演进，我们的统一 UI 组件库将为团队提供一致且高效的开发体验，加速项目交付，提高整体质量和可维护性。

image.png
