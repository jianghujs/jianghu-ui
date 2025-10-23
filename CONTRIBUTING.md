# 贡献指南

感谢你考虑为 JianghuJS UI 做出贡献！

## 如何贡献

### 报告 Bug

如果你发现了 bug，请创建一个 Issue 并包含以下信息：

- Bug 的详细描述
- 复现步骤
- 预期行为
- 实际行为
- 截图（如果适用）
- 浏览器和版本信息

### 提出新功能

如果你有新功能的想法：

1. 先创建一个 Issue 讨论该功能
2. 说明功能的用途和价值
3. 提供使用示例
4. 等待维护者反馈

### 提交代码

1. **Fork 项目**
   ```bash
   # 在 GitHub 上 fork 项目
   git clone https://github.com/your-username/jianghu-ui.git
   cd jianghu-ui
   ```

2. **创建分支**
   ```bash
   git checkout -b feature/your-feature-name
   # 或
   git checkout -b fix/your-bug-fix
   ```

3. **安装依赖**
   ```bash
   npm install
   ```

4. **开发和测试**
   ```bash
   npm run storybook
   ```

5. **提交更改**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   # 或
   git commit -m "fix: fix bug description"
   ```

6. **推送到 GitHub**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **创建 Pull Request**
   - 在 GitHub 上创建 PR
   - 填写 PR 模板
   - 等待代码审查

## 开发规范

### 代码风格

- 使用 2 空格缩进
- 组件名使用 PascalCase
- Props 使用 camelCase
- 事件使用 kebab-case
- 文件名使用 PascalCase

### 组件开发规范

```vue
<template>
  <v-app>
    <!-- 组件内容 -->
  </v-app>
</template>

<script>
export default {
  name: 'JhComponentName',
  props: {
    // Props 定义
    propName: {
      type: String,
      default: '',
      required: false,
    },
  },
  data() {
    return {
      // 组件状态
    };
  },
  methods: {
    // 方法定义
    handleEvent() {
      this.$emit('event-name', data);
    },
  },
};
</script>

<style scoped>
/* 组件样式 */
</style>
```

### Stories 编写规范

```javascript
import Component from './Component.vue';

export default {
  title: 'Category/ComponentName',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    // Props 控制
  },
};

// 默认故事
export const Default = {
  args: {
    // 默认 props
  },
};

// 其他变体
export const Variant = () => ({
  components: { Component },
  template: `<component />`,
});
```

### 提交信息规范

使用约定式提交 (Conventional Commits):

- `feat:` 新功能
- `fix:` Bug 修复
- `docs:` 文档更新
- `style:` 代码格式（不影响功能）
- `refactor:` 重构
- `test:` 测试相关
- `chore:` 构建或工具相关

示例：
```
feat: add JhDialog component
fix: correct button color prop validation
docs: update README with new examples
```

## 组件设计原则

1. **简洁性** - API 设计简单明了
2. **一致性** - 遵循现有组件的设计模式
3. **可访问性** - 支持键盘导航和屏幕阅读器
4. **性能** - 避免不必要的重渲染
5. **文档** - 提供完整的文档和示例

## Pull Request 检查清单

在提交 PR 之前，请确保：

- [ ] 代码遵循项目的代码风格
- [ ] 添加了必要的测试（如适用）
- [ ] 所有测试通过
- [ ] 更新了相关文档
- [ ] 创建了 Storybook stories
- [ ] 提交信息符合规范
- [ ] 没有引入 breaking changes（或已明确说明）

## 需要帮助？

如果你在贡献过程中遇到问题：

- 查看现有的 Issues 和 PRs
- 在 Issue 中提问
- 参考项目文档

再次感谢你的贡献！
