# JhForm Grid 布局增强方案

## 背景
- 参考 Ant Design ProComponents Form，业务希望 JhForm 在大表单场景下具备自动栅格布局能力，减少手写 `v-col` 的重复工作。
- 当前 JhForm 虽有 `grid`/`colProps` 属性，但模板未按 24 栏语义进行排布，栅格配置基本无效，导致与文档描述不符。

## 目标与范围
- **Grid 布局能力**：当 `grid` 或 `layout="grid"` 启用时，JhForm 需按 24 栏（映射 Vuetify 12 栅格）自动排布字段，提供表单级 `rowProps/colProps` 与字段级 `colSpan/colProps` 控制列宽，保证底部 submitter 区域对齐。

## 非目标
- 不改动 submitter、异步选项等其他 ProForm 能力；这些能力由后续变更处理。
- 不更改已有 `actions` 插槽与非 grid 布局行为，需保持向下兼容。

## 影响与风险
- 修改模板中的 `v-col` 渲染逻辑，需要回归所有 JhForm/JhDrawerForm/JhModalForm Storybook 示例，确保不同断点表现一致。
- 需要在文档中更新 Grid 用法示例，避免使用者误解。

## 验收标准
- Storybook 提供 Grid 示例，展示 24 栏换行、行列属性透传、和 submitter 占满尾行。
- `openspec validate update-jhform-proform-features --strict` 通过，且 specs 对 Grid 行为有清晰 Scenario。
