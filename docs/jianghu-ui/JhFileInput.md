# JhFileInput - 文件上传输入框

JhFileInput 封装常见图片/附件上传场景，支持单选、多选、预览、删除、数量限制等能力。

## 功能特性

- 🖼️ **实时预览**：自动识别图片并展示缩略图，非图片显示图标
- ♻️ **多源值支持**：兼容字符串路径、字符串数组、File 对象数组
- 🚦 **数量/类型限制**：`maxFiles`、`accept` 控制上传数量与格式
- 📤 **校验规则**：通过 `rules` 注入函数即可实现自定义校验
- 🚫 **只读模式**：设置 `readonly` 即可禁止上传与删除

## 基础用法

```vue
<template>
  <jh-file-input
    v-model="files"
    multiple
    :max-files="5"
    accept="image/*"
    :rules="[(val) => val.length > 0 || '请至少上传一张图片']"
  />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | `v-model`，可为字符串或 File 数组 | string \| Array | [] |
| maxFiles | 最大上传数量，0 表示不限制 | number | 0 |
| accept | input accept 属性 | string | `*/*` |
| multiple | 是否多选 | boolean | false |
| rules | 额外验证函数数组，返回 `true` 或错误消息 | Function[] | [] |
| readonly | 是否只读 | boolean | false |
| uploadPrefix | 拼接在字符串路径前的前缀 | string | `/upload/` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| input | `v-model` 更新 | (files: Array \| string) |
| change | 同步触发，便于监听 | (files: Array \| string) |

### Slots

组件无自定义插槽。

## 使用建议

- 需要与后端路径解耦时，可以在回显时传入字符串数组，上传时转换为 `FormData`
- 对于大文件建议结合外部上传接口，`rules` 中可校验文件大小/类型
- 读写 File 对象时注意浏览器无法直接序列化，必要时把 meta 信息保存到其他字段
