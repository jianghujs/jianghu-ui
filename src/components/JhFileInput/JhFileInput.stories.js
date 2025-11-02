import JhFileInput from './JhFileInput.vue';

export default {
  title: '基础组件/JhFileInput - 文件上传',
  component: JhFileInput,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'object',
      description: '文件值，可以是数组、字符串或文件对象',
    },
    maxFiles: {
      control: 'number',
      description: '最多可上传的文件数量，0 表示不限制',
    },
    accept: {
      control: 'text',
      description: '接受的文件类型，如 "image/*" 或 ".jpg,.png"',
    },
    multiple: {
      control: 'boolean',
      description: '是否允许多文件上传',
    },
    readonly: {
      control: 'boolean',
      description: '是否只读模式',
    },
    uploadPrefix: {
      control: 'text',
      description: '上传文件的 URL 前缀',
    },
  },
};

export const 基础示例 = {
  args: {
    value: [],
    maxFiles: 0,
    accept: '*/*',
    multiple: false,
    readonly: false,
    uploadPrefix: '/upload/',
  },
};

export const 单图上传 = {
  args: {
    value: [],
    maxFiles: 1,
    accept: 'image/*',
    multiple: false,
    readonly: false,
    uploadPrefix: '/upload/',
  },
};

export const 多图上传 = {
  args: {
    value: [],
    maxFiles: 5,
    accept: 'image/*',
    multiple: true,
    readonly: false,
    uploadPrefix: '/upload/',
  },
};

export const 已有文件 = {
  args: {
    value: ['images/photo1.jpg', 'images/photo2.png', 'documents/file.pdf'],
    maxFiles: 5,
    accept: '*/*',
    multiple: true,
    readonly: false,
    uploadPrefix: '/upload/',
  },
};

export const 只读模式 = {
  args: {
    value: ['images/photo1.jpg', 'images/photo2.png'],
    maxFiles: 0,
    accept: '*/*',
    multiple: true,
    readonly: true,
    uploadPrefix: '/upload/',
  },
};

export const 带验证 = {
  args: {
    value: [],
    maxFiles: 3,
    accept: 'image/*',
    multiple: true,
    readonly: false,
    uploadPrefix: '/upload/',
    rules: [
      (v) => (v && v.length > 0) || '请至少上传一个文件',
      (v) => (v && v.length <= 3) || '最多只能上传3个文件',
    ],
  },
};
