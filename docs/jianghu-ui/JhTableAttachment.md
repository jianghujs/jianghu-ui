# JhTableAttachment - 附件分组面板

JhTableAttachment 专注于以卡片方式呈现附件列表，内置分组、搜索、预览、下载、删除等能力，可作为表格附件详情的补充。

## 功能特性

- 🗂️ **分组展示**：按 `groupBy` 字段将附件划分多个卡片区域
- 🔍 **内置搜索**：顶部输入框可实时过滤文件名/类型
- 👀 **预览能力**：图片类附件支持放大预览，其他类型显示文件图标
- 📥 **下载/删除事件**：提供 download/delete 事件，方便接入后台接口
- ➕ **新增入口**：可展示“新增附件”按钮，自定义上传流程

## 基础用法

```vue
<template>
  <jh-table-attachment
    :attachments="attachmentList"
    group-by="category"
    :show-create-button="canEdit"
    @create-click="openUploader"
    @delete="removeAttachment"
    @download="downloadAttachment"
  />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| attachments | 附件数组 | Array | [] |
| showCreateButton | 是否显示“新增附件”按钮 | boolean | true |
| readonly | 是否只读（隐藏删除按钮） | boolean | false |
| groupBy | 分组字段名 | string | `fileType` |
| previewPrefix | 预览地址前缀，拼接 `downloadPath` | string | `/upload/` |
| loading | 是否展示 loading 遮罩 | boolean | false |

附件对象推荐结构：

```js
{
  id: 1,
  filename: '合同.pdf',
  downloadPath: '2023/contract.pdf',
  fileType: '合同',
  fileSubtype: 'pdf'
}
```

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| create-click | 点击新增附件按钮 | - |
| preview | 点击预览按钮 | (item) |
| download | 点击下载按钮 | (item) |
| delete | 点击删除按钮 | (item) |

### Slots

组件暂未开放插槽，如需扩展可 fork 组件进行定制。

## 使用建议

- 需要与上传接口联动时，可在 `create-click` 中打开上传抽屉，完成后刷新 `attachments`
- 若后端已返回文件完整 URL，可把 `previewPrefix` 设为空字符串
- 通过 `readonly` 控制权限，避免无权限用户看到删除按钮
