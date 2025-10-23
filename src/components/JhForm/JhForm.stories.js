import JhForm from './JhForm.vue';

export default {
  title: 'Components/JhForm',
  component: JhForm,
  tags: ['autodocs'],
  argTypes: {
    dense: {
      control: 'boolean',
      description: '紧凑模式',
    },
    outlined: {
      control: 'boolean',
      description: '边框样式',
    },
    onSubmit: { action: 'submitted' },
    onReset: { action: 'reset' },
  },
};

// 基础表单
export const BasicForm = () => ({
  components: { JhForm },
  data: () => ({
    fields: [
      {
        name: 'username',
        label: '用户名',
        type: 'text',
        placeholder: '请输入用户名',
        rules: [(v) => !!v || '用户名不能为空'],
        required: true,
        cols: 12,
      },
      {
        name: 'email',
        label: '邮箱',
        type: 'email',
        placeholder: '请输入邮箱地址',
        rules: [
          (v) => !!v || '邮箱不能为空',
          (v) => /.+@.+\..+/.test(v) || '邮箱格式不正确',
        ],
        required: true,
        cols: 12,
      },
      {
        name: 'password',
        label: '密码',
        type: 'password',
        placeholder: '请输入密码',
        rules: [
          (v) => !!v || '密码不能为空',
          (v) => v.length >= 6 || '密码至少6位',
        ],
        required: true,
        cols: 12,
      },
    ],
  }),
  methods: {
    handleSubmit(data) {
      console.log('表单提交:', data);
      alert(`表单提交成功！\n${JSON.stringify(data, null, 2)}`);
    },
  },
  template: `
    <jh-form
      :fields="fields"
      @submit="handleSubmit"
    />
  `,
});

// 多列布局
export const MultiColumnForm = () => ({
  components: { JhForm },
  data: () => ({
    fields: [
      {
        name: 'firstName',
        label: '名',
        type: 'text',
        cols: 12,
        md: 6,
        rules: [(v) => !!v || '必填项'],
      },
      {
        name: 'lastName',
        label: '姓',
        type: 'text',
        cols: 12,
        md: 6,
        rules: [(v) => !!v || '必填项'],
      },
      {
        name: 'email',
        label: '邮箱',
        type: 'email',
        cols: 12,
        md: 6,
        rules: [(v) => !!v || '必填项'],
      },
      {
        name: 'phone',
        label: '电话',
        type: 'text',
        cols: 12,
        md: 6,
        rules: [(v) => !!v || '必填项'],
      },
      {
        name: 'address',
        label: '地址',
        type: 'textarea',
        cols: 12,
        rows: 3,
      },
    ],
  }),
  methods: {
    handleSubmit(data) {
      console.log('表单提交:', data);
    },
  },
  template: `
    <jh-form
      :fields="fields"
      @submit="handleSubmit"
    />
  `,
});

// 完整表单示例
export const CompleteForm = () => ({
  components: { JhForm },
  data: () => ({
    fields: [
      {
        name: 'name',
        label: '姓名',
        type: 'text',
        cols: 12,
        md: 6,
        prependIcon: 'mdi-account',
        rules: [(v) => !!v || '必填项'],
      },
      {
        name: 'gender',
        label: '性别',
        type: 'radio',
        cols: 12,
        md: 6,
        row: true,
        options: [
          { text: '男', value: 'male' },
          { text: '女', value: 'female' },
        ],
        default: 'male',
      },
      {
        name: 'email',
        label: '邮箱',
        type: 'email',
        cols: 12,
        md: 6,
        prependIcon: 'mdi-email',
        rules: [(v) => !!v || '必填项'],
      },
      {
        name: 'phone',
        label: '电话',
        type: 'text',
        cols: 12,
        md: 6,
        prependIcon: 'mdi-phone',
      },
      {
        name: 'birthDate',
        label: '出生日期',
        type: 'date',
        cols: 12,
        md: 6,
      },
      {
        name: 'department',
        label: '部门',
        type: 'select',
        cols: 12,
        md: 6,
        options: [
          { text: '技术部', value: 'tech' },
          { text: '市场部', value: 'marketing' },
          { text: '人力资源部', value: 'hr' },
          { text: '财务部', value: 'finance' },
        ],
        rules: [(v) => !!v || '必填项'],
      },
      {
        name: 'skills',
        label: '技能',
        type: 'select',
        multiple: true,
        cols: 12,
        options: [
          { text: 'JavaScript', value: 'js' },
          { text: 'Python', value: 'python' },
          { text: 'Java', value: 'java' },
          { text: 'Go', value: 'go' },
        ],
      },
      {
        name: 'bio',
        label: '个人简介',
        type: 'textarea',
        cols: 12,
        rows: 4,
        hint: '简要介绍一下自己',
        persistentHint: true,
      },
      {
        name: 'agree',
        label: '我同意服务条款和隐私政策',
        type: 'checkbox',
        cols: 12,
        rules: [(v) => !!v || '必须同意条款'],
      },
    ],
  }),
  methods: {
    handleSubmit(data) {
      console.log('表单提交:', data);
      alert('表单提交成功！请查看控制台输出。');
    },
    handleReset() {
      console.log('表单已重置');
    },
  },
  template: `
    <jh-form
      :fields="fields"
      @submit="handleSubmit"
      @reset="handleReset"
    />
  `,
});

// 紧凑样式
export const DenseForm = () => ({
  components: { JhForm },
  data: () => ({
    fields: [
      {
        name: 'username',
        label: '用户名',
        type: 'text',
        cols: 12,
        rules: [(v) => !!v || '必填项'],
      },
      {
        name: 'email',
        label: '邮箱',
        type: 'email',
        cols: 12,
        rules: [(v) => !!v || '必填项'],
      },
      {
        name: 'role',
        label: '角色',
        type: 'select',
        cols: 12,
        options: [
          { text: '管理员', value: 'admin' },
          { text: '用户', value: 'user' },
        ],
      },
    ],
  }),
  template: `
    <jh-form
      :fields="fields"
      dense
    />
  `,
});

// 边框样式
export const OutlinedForm = () => ({
  components: { JhForm },
  data: () => ({
    fields: [
      {
        name: 'title',
        label: '标题',
        type: 'text',
        cols: 12,
      },
      {
        name: 'category',
        label: '分类',
        type: 'select',
        cols: 12,
        options: [
          { text: '技术', value: 'tech' },
          { text: '生活', value: 'life' },
        ],
      },
      {
        name: 'content',
        label: '内容',
        type: 'textarea',
        cols: 12,
        rows: 5,
      },
    ],
  }),
  template: `
    <jh-form
      :fields="fields"
      outlined
    />
  `,
});
