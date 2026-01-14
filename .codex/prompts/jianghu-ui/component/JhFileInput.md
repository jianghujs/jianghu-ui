# JhFileInput - AI 快速集成指南

> 文件上传组件

## 🎯 核心用法

```vue
<jh-file-input
  v-model="files"
  label="上传文件"
  :accept="'image/*'"
  :multiple="true"
  @change="handleFileChange"
/>

<script>
export default {
  data() {
    return {
      files: []
    };
  },
  methods: {
    handleFileChange(files) {
      console.log('选择的文件:', files);
    }
  }
};
</script>
```

## 📋 关键 Props

| Prop | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| `value` / `v-model` | Array | 文件列表 | `[]` |
| `accept` | String | 接受的文件类型 | `''` |
| `multiple` | Boolean | 多选 | `false` |
| `maxSize` | Number | 最大文件大小(MB) | `10` |

## ⚡ 快速模板

### 图片上传
```vue
<template>
  <jh-file-input
    v-model="images"
    label="上传图片"
    accept="image/*"
    :multiple="true"
    :max-size="5"
    @change="handleUpload"
  />
</template>

<script>
export default {
  data() {
    return {
      images: []
    };
  },
  methods: {
    async handleUpload(files) {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });
      await this.$api.upload(formData);
      this.$message.success('上传成功');
    }
  }
};
</script>
```

## 🔗 相关组件

- **JhForm**: 表单组件
