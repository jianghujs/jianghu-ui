# JhModalForm - 模态框表单组件

JhModalForm 结合 JhForm 与模态框交互，适用于弹出式创建、编辑流程，可通过配置快速生成表单布局。

## 功能特性

- 🧱 **模态承载**：继承 JhModal 行为，支持宽度、全屏、粘性标题等
- 🧩 **配置化表单**：`fields` 描述表单结构，支持多 ValueType 与联动
- 🧽 **自动重置**：模态框打开时会重置表单值和验证状态
- 🧯 **校验守卫**：`validateBeforeConfirm` 控制确认前是否校验
- 🎛️ **插槽扩展**：`content` 自定义整块内容，`field-xxx` 精准覆盖单个字段

## 基础用法

```vue
<template>
  <jh-modal-form
    v-model="dialogVisible"
    title="新增成员"
    :fields="fields"
    :initial-data="form"
    @confirm="handleSubmit"
  />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | `v-model`，控制显隐 | boolean | false |
| title | 弹窗标题 | string | `表单` |
| fields | JhForm 字段配置数组 | Array | [] |
| initialData | 表单初始值 | Object | `{}` |
| width | 最大宽度 | number \| string | 600 |
| fullscreen | 是否全屏 | boolean | false |
| persistent | 是否禁止点击遮罩关闭 | boolean | true |
| closable | 是否显示右上角关闭按钮 | boolean | true |
| showConfirmButton | 是否显示确认按钮 | boolean | true |
| confirmText | 确认按钮文本 | string | `确认` |
| cancelText | 取消按钮文本 | string | `取消` |
| formRef | 内部 JhForm ref 名称 | string | `modalForm` |
| validateBeforeConfirm | 确认前是否自动校验 | boolean | true |
| validationRules | 通用验证规则 | Object | 预置常用校验 |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| input | `v-model` 更新 | (visible: boolean) |
| close | 弹窗关闭后触发 | - |
| cancel | 点击取消或关闭按钮触发 | - |
| confirm | 校验通过后触发 | (formData: object) |
| field-change | 字段变化时触发 | ({ key, value, formData }) |

### Slots

| 名称 | 说明 |
| --- | --- |
| content | 完全自定义表单区域，默认渲染 JhForm |
| field-`key` | 针对特定字段自定义渲染 |

## 使用建议

- 如果需在关闭后保留数据，可监听 `close` 事件并阻止 `resetForm`
- 复杂布局可直接在 `content` 插槽内放置任意组件，自行控制 JhForm
- 通过 `this.$refs.modalForm.getFormData()` 可以手动读取当前表单数据
