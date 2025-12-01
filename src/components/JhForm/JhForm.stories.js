import JhForm from './JhForm.vue';
import JhFormFields from '../JhFormFields/JhFormFields.vue';

export default {
  title: '数据录入/JhForm - 高级表单',
  component: JhForm,
  tags: ['autodocs'],
  argTypes: {
    showLabels: {
      control: 'boolean',
      description: '是否显示标签',
    },
    labelPosition: {
      control: 'select',
      options: ['top', 'left'],
      description: '标签位置',
    },
    defaultDense: {
      control: 'boolean',
      description: '默认紧凑模式',
    },
    defaultFilled: {
      control: 'boolean',
      description: '默认填充样式',
    },
    defaultOutlined: {
      control: 'boolean',
      description: '默认轮廓样式',
    },
    defaultColsMd: {
      control: 'select',
      options: [3, 4, 6, 12],
      description: '默认列宽（md断点）',
    },
  },
};

// 基础示例
export const 基础示例 = {
  args: {
    fields: [
      {
        key: 'username',
        label: '用户名',
        type: 'text',
        placeholder: '请输入用户名',
        required: true,
      },
      {
        key: 'email',
        label: '邮箱',
        type: 'text',
        placeholder: '请输入邮箱',
        rules: 'email',
      },
      {
        key: 'phone',
        label: '手机号',
        type: 'text',
        placeholder: '请输入手机号',
        rules: 'phone',
      },
      {
        key: 'age',
        label: '年龄',
        type: 'number',
        placeholder: '请输入年龄',
        rules: 'integer',
      },
    ],
    initialData: {
      username: '',
      email: '',
      phone: '',
      age: '',
    },
  },
  render: (args) => ({
    components: { JhForm },
    setup() {
      return { args };
    },
    template: `
      <JhForm v-bind="args">
        <template #actions="{ validate, resetForm }">
          <v-row class="mt-4">
            <v-col cols="12" class="text-right">
              <v-btn class="mr-2" @click="resetForm">重置</v-btn>
              <v-btn color="success" @click="validate">验证</v-btn>
            </v-col>
          </v-row>
        </template>
      </JhForm>
    `,
  }),
};

// 完整示例
export const 完整示例 = {
  args: {
    fields: [
      {
        key: 'name',
        label: '姓名',
        type: 'text',
        placeholder: '请输入姓名',
        required: true,
        cols: { xs: 12, sm: 6, md: 6 },
      },
      {
        key: 'gender',
        label: '性别',
        type: 'select',
        placeholder: '请选择性别',
        required: true,
        options: [
          { text: '男', value: 'male' },
          { text: '女', value: 'female' },
        ],
        cols: { xs: 12, sm: 6, md: 6 },
      },
      {
        key: 'birthday',
        label: '出生日期',
        type: 'date',
        placeholder: '请选择日期',
        cols: { xs: 12, sm: 6, md: 6 },
      },
      {
        key: 'email',
        label: '邮箱',
        type: 'text',
        placeholder: '请输入邮箱',
        rules: 'email',
        cols: { xs: 12, sm: 6, md: 6 },
      },
      {
        key: 'phone',
        label: '手机号',
        type: 'text',
        placeholder: '请输入手机号',
        rules: 'phone',
        cols: { xs: 12, sm: 6, md: 6 },
      },
      {
        key: 'department',
        label: '部门',
        type: 'autocomplete',
        placeholder: '请选择部门',
        options: [
          { text: '技术部', value: 'tech' },
          { text: '产品部', value: 'product' },
          { text: '运营部', value: 'operation' },
        ],
        cols: { xs: 12, sm: 6, md: 6 },
      },
      {
        key: 'status',
        label: '状态',
        type: 'radio',
        required: true,
        options: [
          { text: '激活', value: 'active' },
          { text: '禁用', value: 'inactive' },
        ],
        cols: { xs: 12, sm: 12, md: 12 },
      },
      {
        key: 'receiveEmail',
        label: '接收邮件通知',
        type: 'switch',
        switchLabel: '接收邮件通知',
        cols: { xs: 12, sm: 6, md: 6 },
      },
      {
        key: 'agree',
        label: '同意协议',
        type: 'checkbox',
        checkboxLabel: '我已阅读并同意用户协议',
        cols: { xs: 12, sm: 6, md: 6 },
      },
      {
        key: 'bio',
        label: '个人简介',
        type: 'textarea',
        placeholder: '请输入个人简介',
        rows: 4,
        cols: { xs: 12, sm: 12, md: 12 },
      },
    ],
    initialData: {
      name: '',
      gender: '',
      birthday: '',
      email: '',
      phone: '',
      department: '',
      status: 'active',
      receiveEmail: true,
      agree: false,
      bio: '',
    },
  },
  render: (args) => ({
    components: { JhForm },
    setup() {
      return { args };
    },
    template: `
      <JhForm v-bind="args" @submit="handleSubmit" @reset="handleReset">
        <template #actions="{ validate, resetForm, formData }">
          <v-row class="mt-4">
            <v-col cols="12" class="text-right">
              <v-btn class="mr-2" @click="resetForm">重置</v-btn>
              <v-btn color="success" @click="handleValidate(validate, formData)">提交</v-btn>
            </v-col>
          </v-row>
        </template>
      </JhForm>
    `,
    methods: {
      handleSubmit(data) {
        console.log('表单提交:', data);
        alert('表单提交成功！请查看控制台');
      },
      handleReset(data) {
        console.log('表单重置:', data);
      },
      async handleValidate(validate, formData) {
        const isValid = await validate();
        if (isValid) {
          console.log('验证通过:', formData);
          alert('验证通过！请查看控制台');
        } else {
          alert('验证失败，请检查表单');
        }
      },
    },
  }),
};

// Grid 自动布局
export const Grid栅格布局 = {
  args: {
    layout: 'grid',
    grid: true,
    colProps: { span: 8, lg: 6 },
    rowProps: { dense: true },
    fields: [
      { type: 'group', title: '项目信息' },
      {
        key: 'projectCode',
        label: '项目编号',
        type: 'text',
        placeholder: '请输入编号',
        colSpan: 6,
      },
      {
        key: 'projectName',
        label: '项目名称',
        type: 'text',
        placeholder: '请输入名称',
        colSpan: 12,
        required: true,
      },
      {
        key: 'owner',
        label: '负责人',
        type: 'text',
        placeholder: '请输入负责人',
        colProps: { md: 4 },
      },
      {
        key: 'status',
        label: '状态',
        type: 'select',
        options: [
          { text: '未开始', value: 'todo' },
          { text: '进行中', value: 'doing' },
          { text: '已完成', value: 'done' },
        ],
        colProps: { md: 4 },
      },
      {
        key: 'publish',
        label: '发布时间',
        type: 'date',
        colProps: { md: 4 },
      },
    ],
    initialData: {
      projectCode: 'PRJ-2024-001',
      status: 'doing',
    },
  },
  render: (args) => ({
    components: { JhForm },
    setup() {
      return { args };
    },
    template: `
      <JhForm v-bind="args">
        <template #actions="{ validate, resetForm }">
          <v-btn class="mr-2" text @click="resetForm">重置</v-btn>
          <v-btn color="primary" @click="validate">提交</v-btn>
        </template>
      </JhForm>
    `,
  }),
};

// 三列布局
export const 三列布局 = {
  args: {
    fields: [
      {
        key: 'field1',
        label: '字段1',
        type: 'text',
        placeholder: '请输入',
        cols: { md: 4 },
      },
      {
        key: 'field2',
        label: '字段2',
        type: 'text',
        placeholder: '请输入',
        cols: { md: 4 },
      },
      {
        key: 'field3',
        label: '字段3',
        type: 'text',
        placeholder: '请输入',
        cols: { md: 4 },
      },
      {
        key: 'field4',
        label: '字段4',
        type: 'select',
        placeholder: '请选择',
        options: [
          { text: '选项1', value: '1' },
          { text: '选项2', value: '2' },
        ],
        cols: { md: 4 },
      },
      {
        key: 'field5',
        label: '字段5',
        type: 'date',
        placeholder: '请选择日期',
        cols: { md: 4 },
      },
      {
        key: 'field6',
        label: '字段6',
        type: 'text',
        placeholder: '请输入',
        cols: { md: 4 },
      },
    ],
    defaultColsMd: 4,
  },
};

// 无标签模式
export const 无标签模式 = {
  args: {
    showLabels: false,
    fields: [
      {
        key: 'name',
        type: 'text',
        placeholder: '姓名',
      },
      {
        key: 'email',
        type: 'text',
        placeholder: '邮箱',
      },
      {
        key: 'phone',
        type: 'text',
        placeholder: '手机号',
      },
      {
        key: 'message',
        type: 'textarea',
        placeholder: '留言内容',
        rows: 3,
        cols: { md: 12 },
      },
    ],
  },
};

// 轮廓样式
export const 轮廓样式 = {
  args: {
    defaultFilled: false,
    defaultOutlined: true,
    fields: [
      {
        key: 'username',
        label: '用户名',
        type: 'text',
        placeholder: '请输入用户名',
      },
      {
        key: 'password',
        label: '密码',
        type: 'text',
        placeholder: '请输入密码',
        props: {
          type: 'password',
        },
      },
      {
        key: 'role',
        label: '角色',
        type: 'select',
        placeholder: '请选择角色',
        options: [
          { text: '管理员', value: 'admin' },
          { text: '普通用户', value: 'user' },
        ],
      },
    ],
  },
};

// 预填充数据
export const 预填充数据 = {
  args: {
    fields: [
      {
        key: 'username',
        label: '用户名',
        type: 'text',
        placeholder: '请输入用户名',
        required: true,
      },
      {
        key: 'email',
        label: '邮箱',
        type: 'text',
        placeholder: '请输入邮箱',
        rules: 'email',
      },
      {
        key: 'status',
        label: '状态',
        type: 'select',
        options: [
          { text: '激活', value: 'active' },
          { text: '禁用', value: 'inactive' },
        ],
      },
      {
        key: 'receiveNotification',
        label: '接收通知',
        type: 'switch',
        switchLabel: '接收通知',
      },
    ],
    initialData: {
      username: '张三',
      email: 'zhangsan@example.com',
      status: 'active',
      receiveNotification: true,
    },
  },
};

// 单列布局
export const 单列布局 = {
  args: {
    defaultColsMd: 12,
    fields: [
      {
        key: 'title',
        label: '标题',
        type: 'text',
        placeholder: '请输入标题',
        required: true,
      },
      {
        key: 'category',
        label: '分类',
        type: 'select',
        placeholder: '请选择分类',
        options: [
          { text: '技术', value: 'tech' },
          { text: '生活', value: 'life' },
          { text: '工作', value: 'work' },
        ],
      },
      {
        key: 'tags',
        label: '标签',
        type: 'select',
        placeholder: '请选择标签',
        multiple: true,
        chips: true,
        options: [
          { text: 'Vue', value: 'vue' },
          { text: 'React', value: 'react' },
          { text: 'Angular', value: 'angular' },
        ],
      },
      {
        key: 'content',
        label: '内容',
        type: 'textarea',
        placeholder: '请输入内容',
        rows: 6,
      },
    ],
  },
};

// 时间字段
export const 时间字段 = {
  args: {
    fields: [
      {
        key: 'startDate',
        label: '开始日期',
        type: 'date',
        placeholder: '请选择开始日期',
        required: true,
      },
      {
        key: 'endDate',
        label: '结束日期',
        type: 'date',
        placeholder: '请选择结束日期',
        required: true,
      },
      {
        key: 'startTime',
        label: '开始时间',
        type: 'time',
        placeholder: '请选择开始时间',
      },
      {
        key: 'endTime',
        label: '结束时间',
        type: 'time',
        placeholder: '请选择结束时间',
      },
    ],
  },
};

// 水平布局
export const 水平布局 = {
  args: {
    layout: 'horizontal',
    labelWidth: 'auto',
    labelAlign: 'right',
    fields: [
      {
        key: 'username',
        label: '用户名',
        type: 'text',
        placeholder: '请输入用户名',
        required: true,
        cols: { md: 12 },
      },
      {
        key: 'realname',
        label: '真实姓名',
        type: 'text',
        placeholder: '请输入真实姓名',
        cols: { md: 12 },
      },
      {
        key: 'email',
        label: '邮箱地址',
        type: 'text',
        placeholder: '请输入邮箱',
        rules: 'email',
        cols: { md: 12 },
      },
      {
        key: 'phone',
        label: '手机号',
        type: 'text',
        placeholder: '请输入手机号',
        rules: 'phone',
        cols: { md: 12 },
      },
      {
        key: 'status',
        label: '状态',
        type: 'radio',
        options: [
          { text: '激活', value: 'active' },
          { text: '禁用', value: 'inactive' },
        ],
        defaultValue: 'active',
        cols: { md: 12 },
      },
      {
        key: 'bio',
        label: '个人简介',
        type: 'textarea',
        placeholder: '请输入个人简介',
        rows: 3,
        cols: { md: 12 },
      },
    ],
  },
};

// 行内布局
export const 行内布局 = {
  args: {
    layout: 'inline',
    defaultColsMd: 'auto',
    defaultDense: true,
    fields: [
      {
        key: 'keyword',
        label: '关键词',
        type: 'text',
        placeholder: '请输入关键词',
      },
      {
        key: 'status',
        label: '状态',
        type: 'select',
        placeholder: '请选择状态',
        options: [
          { text: '全部', value: '' },
          { text: '激活', value: 'active' },
          { text: '禁用', value: 'inactive' },
        ],
      },
      {
        key: 'date',
        label: '日期',
        type: 'date',
        placeholder: '请选择日期',
      },
    ],
  },
  render: (args) => ({
    components: { JhForm },
    setup() {
      return { args };
    },
    template: `
      <div>
        <JhForm v-bind="args">
          <template #actions="{ validate, resetForm }">
            <v-btn color="primary" class="ml-2" @click="validate">查询</v-btn>
            <v-btn text class="ml-2" @click="resetForm">重置</v-btn>
          </template>
        </JhForm>
      </div>
    `,
  }),
};

// 字段分组
export const 字段分组 = {
  args: {
    fields: [
      { type: 'group', title: '基本信息', divider: false },
      {
        key: 'username',
        label: '用户名',
        type: 'text',
        placeholder: '请输入用户名',
        required: true,
        cols: { md: 6 },
      },
      {
        key: 'realname',
        label: '真实姓名',
        type: 'text',
        placeholder: '请输入真实姓名',
        required: true,
        cols: { md: 6 },
      },
      {
        key: 'email',
        label: '邮箱',
        type: 'text',
        placeholder: '请输入邮箱',
        rules: 'email',
        cols: { md: 6 },
      },
      {
        key: 'phone',
        label: '手机号',
        type: 'text',
        placeholder: '请输入手机号',
        rules: 'phone',
        cols: { md: 6 },
      },

      { type: 'group', title: '账户设置', divider: true, description: '设置账户相关信息' },
      {
        key: 'role',
        label: '角色',
        type: 'select',
        placeholder: '请选择角色',
        options: [
          { text: '管理员', value: 'admin' },
          { text: '普通用户', value: 'user' },
        ],
        required: true,
        cols: { md: 6 },
      },
      {
        key: 'status',
        label: '状态',
        type: 'radio',
        options: [
          { text: '激活', value: 'active' },
          { text: '禁用', value: 'inactive' },
        ],
        defaultValue: 'active',
        cols: { md: 6 },
      },
      {
        key: 'receiveNotification',
        label: '接收通知',
        type: 'switch',
        switchLabel: '接收邮件通知',
        cols: { md: 6 },
      },

      { type: 'group', title: '其他信息', divider: true },
      {
        key: 'bio',
        label: '个人简介',
        type: 'textarea',
        placeholder: '请输入个人简介',
        rows: 4,
        cols: { md: 12 },
      },
    ],
  },
};

// 字段联动
export const 字段联动 = {
  args: {
    fields: [
      {
        key: 'userType',
        label: '用户类型',
        type: 'radio',
        options: [
          { text: '个人用户', value: 'personal' },
          { text: '企业用户', value: 'company' },
        ],
        required: true,
        defaultValue: 'personal',
        cols: { md: 12 },
      },

      // 个人用户字段
      {
        key: 'personalName',
        label: '姓名',
        type: 'text',
        placeholder: '请输入姓名',
        required: true,
        visible: (formData) => formData.userType === 'personal',
        cols: { md: 6 },
      },
      {
        key: 'idCard',
        label: '身份证号',
        type: 'text',
        placeholder: '请输入身份证号',
        visible: (formData) => formData.userType === 'personal',
        cols: { md: 6 },
      },

      // 企业用户字段
      {
        key: 'companyName',
        label: '公司名称',
        type: 'text',
        placeholder: '请输入公司名称',
        required: true,
        visible: (formData) => formData.userType === 'company',
        cols: { md: 6 },
      },
      {
        key: 'businessLicense',
        label: '营业执照号',
        type: 'text',
        placeholder: '请输入营业执照号',
        visible: (formData) => formData.userType === 'company',
        cols: { md: 6 },
      },
      {
        key: 'legalPerson',
        label: '法人代表',
        type: 'text',
        placeholder: '请输入法人代表',
        visible: (formData) => formData.userType === 'company',
        cols: { md: 6 },
      },

      // 共同字段
      {
        key: 'phone',
        label: '联系电话',
        type: 'text',
        placeholder: '请输入联系电话',
        rules: 'phone',
        required: true,
        cols: { md: 6 },
      },
      {
        key: 'email',
        label: '邮箱',
        type: 'text',
        placeholder: '请输入邮箱',
        rules: 'email',
        cols: { md: 6 },
      },

      // 条件禁用示例
      {
        key: 'agreeTerms',
        label: '同意条款',
        type: 'checkbox',
        checkboxLabel: '我已阅读并同意用户协议',
        cols: { md: 12 },
      },
      {
        key: 'remarks',
        label: '备注',
        type: 'textarea',
        placeholder: '请输入备注信息',
        rows: 3,
        disabled: (formData) => !formData.agreeTerms,
        cols: { md: 12 },
      },
    ],
    initialData: {
      userType: 'personal',
      agreeTerms: false,
    },
  },
};
// 混合布局
export const 混合布局 = {
  args: {
    layout: 'vertical',
    fields: [
      {
        key: 'title',
        label: '标题',
        type: 'text',
        placeholder: '请输入标题',
        required: true,
        cols: { md: 12 },
      },
      {
        key: 'category',
        label: '分类',
        type: 'select',
        placeholder: '请选择分类',
        layout: 'horizontal',
        labelWidth: 'auto',
        options: [
          { text: '技术', value: 'tech' },
          { text: '生活', value: 'life' },
        ],
        cols: { md: 6 },
      },
      {
        key: 'priority',
        label: '优先级',
        type: 'select',
        placeholder: '请选择优先级',
        layout: 'horizontal',
        labelWidth: 'auto',
        options: [
          { text: '高', value: 'high' },
          { text: '中', value: 'medium' },
          { text: '低', value: 'low' },
        ],
        cols: { md: 6 },
      },
      {
        key: 'content',
        label: '内容',
        type: 'textarea',
        placeholder: '请输入内容',
        rows: 6,
        cols: { md: 12 },
      },
    ],
  },
};

// 提示信息示例
export const 提示信息 = {
  args: {
    fields: [
      {
        key: 'username',
        label: '用户名',
        type: 'text',
        placeholder: '请输入用户名',
        required: true,
        tooltip: '用户名用于登录系统,长度4-20个字符',
        extra: '用户名一旦设置不可修改',
        cols: { md: 6 },
      },
      {
        key: 'password',
        label: '密码',
        type: 'text',
        placeholder: '请输入密码',
        required: true,
        tooltip: '密码长度至少8位,包含字母、数字和特殊字符',
        extra: '建议使用强密码以保护账户安全',
        props: { type: 'password' },
        cols: { md: 6 },
      },
      {
        key: 'email',
        label: '邮箱',
        type: 'text',
        placeholder: '请输入邮箱',
        rules: 'email',
        tooltip: '用于接收系统通知和找回密码',
        cols: { md: 6 },
      },
      {
        key: 'phone',
        label: '手机号',
        type: 'text',
        placeholder: '请输入手机号',
        rules: 'phone',
        tooltip: '用于接收短信验证码',
        extra: '请确保手机号真实有效',
        cols: { md: 6 },
      },
    ],
  },
};

// 数据转换示例
export const 数据转换 = {
  args: {
    fields: [
      {
        key: 'price',
        label: '价格(元)',
        type: 'number',
        placeholder: '请输入价格',
        required: true,
        tooltip: '输入金额,提交时会自动转换为分',
        // 提交时转换为分
        transform: (value) => value ? Math.round(value * 100) : 0,
        cols: { md: 6 },
      },
      {
        key: 'tags',
        label: '标签',
        type: 'select',
        placeholder: '请选择标签',
        multiple: true,
        chips: true,
        options: [
          { text: 'Vue', value: 'vue' },
          { text: 'React', value: 'react' },
          { text: 'Angular', value: 'angular' },
          { text: 'Node.js', value: 'nodejs' },
        ],
        tooltip: '可以选择多个标签',
        // 提交时转换为逗号分隔的字符串
        transform: (value) => Array.isArray(value) ? value.join(',') : value,
        cols: { md: 6 },
      },
      {
        key: 'discount',
        label: '折扣(%)',
        type: 'number',
        placeholder: '请输入折扣',
        tooltip: '输入百分比,提交时会转换为小数',
        // 提交时转换为小数
        transform: (value) => value ? value / 100 : 0,
        cols: { md: 6 },
      },
      {
        key: 'description',
        label: '描述',
        type: 'textarea',
        placeholder: '请输入描述',
        rows: 3,
        // 提交时去除首尾空格
        transform: (value) => value ? value.trim() : '',
        cols: { md: 12 },
      },
    ],
    initialData: {
      price: 99.99,
      tags: ['vue', 'react'],
      discount: 15,
      description: '  这是一个示例描述  ',
    },
    omitNil: true,
  },
  render: (args) => ({
    components: { JhForm },
    setup() {
      return { args };
    },
    template: `
      <div>
        <JhForm v-bind="args" ref="form">
          <template #actions="{ validate, resetForm, formData }">
            <v-row class="mt-4">
              <v-col cols="12" class="text-right">
                <v-btn class="mr-2" @click="resetForm">重置</v-btn>
                <v-btn color="success" @click="handleSubmit">查看转换后的数据</v-btn>
              </v-col>
            </v-row>
          </template>
        </JhForm>
        <v-divider class="my-4"></v-divider>
        <div class="pa-4 grey lighten-4">
          <h4 class="mb-2">说明:</h4>
          <ul>
            <li>价格: 99.99元 → 9999分</li>
            <li>标签: ['vue', 'react'] → 'vue,react'</li>
            <li>折扣: 15% → 0.15</li>
            <li>描述: 自动去除首尾空格</li>
          </ul>
        </div>
      </div>
    `,
    methods: {
      async handleSubmit() {
        const isValid = await this.$refs.form.validate();
        if (isValid) {
          const transformedData = this.$refs.form.getTransformedData();
          console.log('原始数据:', this.$refs.form.getFormData());
          console.log('转换后数据:', transformedData);
          alert('转换后的数据已打印到控制台,请查看');
        }
      },
    },
  }),
};

// onFinish 回调示例
export const 提交回调 = {
  args: {
    fields: [
      {
        key: 'title',
        label: '标题',
        type: 'text',
        placeholder: '请输入标题',
        required: true,
      },
      {
        key: 'content',
        label: '内容',
        type: 'textarea',
        placeholder: '请输入内容',
        required: true,
        rows: 4,
        cols: { md: 12 },
      },
    ],
    initialData: {
      title: '',
      content: '',
    },
  },
  render: (args) => ({
    components: { JhForm },
    data() {
      return {
        args: {
          ...args,
          onFinish: this.handleFinish,
          onFinishFailed: this.handleFinishFailed,
        },
        loading: false,
      };
    },
    template: `
      <div>
        <JhForm v-bind="args">
          <template #actions="{ validate, resetForm }">
            <v-row class="mt-4">
              <v-col cols="12" class="text-right">
                <v-btn class="mr-2" @click="resetForm" :disabled="loading">重置</v-btn>
                <v-btn 
                  color="success" 
                  @click="validate" 
                  :loading="loading"
                >
                  提交
                </v-btn>
              </v-col>
            </v-row>
          </template>
        </JhForm>
        <v-alert v-if="submitResult" :type="submitResult.type" class="mt-4">
          {{ submitResult.message }}
        </v-alert>
      </div>
    `,
    data() {
      return {
        submitResult: null,
      };
    },
    methods: {
      async handleFinish(values) {
        this.loading = true;
        this.submitResult = null;
        
        // 模拟 API 调用
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log('提交成功:', values);
        this.submitResult = {
          type: 'success',
          message: '提交成功! 数据: ' + JSON.stringify(values),
        };
        this.loading = false;
      },
      handleFinishFailed(values) {
        console.log('验证失败:', values);
        this.submitResult = {
          type: 'error',
          message: '表单验证失败,请检查必填项',
        };
      },
    },
  }),
};

// 只读模式示例
export const 只读模式 = {
  args: {
    readonly: true,
    fields: [
      {
        key: 'username',
        label: '用户名',
        type: 'text',
        cols: { md: 6 },
      },
      {
        key: 'email',
        label: '邮箱',
        type: 'text',
        cols: { md: 6 },
      },
      {
        key: 'role',
        label: '角色',
        type: 'select',
        options: [
          { text: '管理员', value: 'admin' },
          { text: '普通用户', value: 'user' },
        ],
        cols: { md: 6 },
      },
      {
        key: 'status',
        label: '状态',
        type: 'radio',
        options: [
          { text: '激活', value: 'active' },
          { text: '禁用', value: 'inactive' },
        ],
        cols: { md: 6 },
      },
      {
        key: 'receiveNotification',
        label: '接收通知',
        type: 'switch',
        switchLabel: '接收邮件通知',
        cols: { md: 6 },
      },
      {
        key: 'tags',
        label: '标签',
        type: 'select',
        multiple: true,
        options: [
          { text: 'Vue', value: 'vue' },
          { text: 'React', value: 'react' },
          { text: 'Angular', value: 'angular' },
        ],
        cols: { md: 6 },
      },
      {
        key: 'bio',
        label: '个人简介',
        type: 'textarea',
        rows: 3,
        cols: { md: 12 },
      },
    ],
    initialData: {
      username: '张三',
      email: 'zhangsan@example.com',
      role: 'admin',
      status: 'active',
      receiveNotification: true,
      tags: ['vue', 'react'],
      bio: '这是一段个人简介,用于展示只读模式下的文本域显示效果。',
    },
  },
};

// 使用 JhFormFields 组合表单
export const 使用JhFormFields组合 = () => ({
  components: { JhFormFields },
  data() {
    return {
      formData: {
        userType: 'personal',
      },
      basicFields: [
        {
          key: 'username',
          label: '用户名',
          type: 'text',
          placeholder: '请输入用户名',
          required: true,
        },
        {
          key: 'email',
          label: '邮箱',
          type: 'text',
          placeholder: '请输入邮箱',
          rules: 'email',
        },
      ],
      typeFields: [
        {
          key: 'userType',
          label: '用户类型',
          type: 'radio',
          options: [
            { text: '个人用户', value: 'personal' },
            { text: '企业用户', value: 'company' },
          ],
          defaultValue: 'personal',
          cols: { md: 12 },
        },
        {
          key: 'personalName',
          label: '真实姓名',
          type: 'text',
          placeholder: '请输入真实姓名',
          required: true,
          visible: (values) => values.userType === 'personal',
          dependencies: ['userType'],
        },
        {
          key: 'idCard',
          label: '身份证号',
          type: 'text',
          placeholder: '请输入身份证号',
          visible: (values) => values.userType === 'personal',
          dependencies: ['userType'],
        },
        {
          key: 'companyName',
          label: '公司名称',
          type: 'text',
          placeholder: '请输入公司名称',
          required: true,
          visible: (values) => values.userType === 'company',
          dependencies: ['userType'],
        },
        {
          key: 'businessLicense',
          label: '营业执照号',
          type: 'text',
          placeholder: '请输入营业执照号',
          visible: (values) => values.userType === 'company',
          dependencies: ['userType'],
        },
      ],
      contactFields: [
        {
          key: 'phone',
          label: '手机号',
          type: 'text',
          placeholder: '请输入手机号',
          rules: 'phone',
        },
        {
          key: 'address',
          label: '地址',
          type: 'textarea',
          placeholder: '请输入地址',
          rows: 3,
          cols: { md: 12 },
        },
      ],
    };
  },
  template: `
    <v-container>
      <v-form>
        <!-- 基本信息字段集 -->
        <JhFormFields
          v-model="formData"
          :fields="basicFields"
          title="基本信息"
          description="请填写您的基本信息"
          bordered
        />
        
        <!-- 用户类型字段集 (带依赖联动) -->
        <JhFormFields
          v-model="formData"
          :fields="typeFields"
          title="用户类型"
          description="根据用户类型显示不同的字段"
          tooltip="字段会根据选择动态显示"
          bordered
          class="mt-4"
        />
        
        <!-- 联系方式字段集 -->
        <JhFormFields
          v-model="formData"
          :fields="contactFields"
          title="联系方式"
          bordered
          class="mt-4"
        />
        
        <!-- 提交按钮 -->
        <v-row class="mt-4">
          <v-col cols="12" class="text-right">
            <v-btn class="mr-2" @click="resetForm">重置</v-btn>
            <v-btn color="primary" @click="submitForm">提交</v-btn>
          </v-col>
        </v-row>
      </v-form>
      
      <v-divider class="my-4"></v-divider>
      <div class="text-caption grey--text">表单数据:</div>
      <pre class="mt-2 pa-3 grey lighten-4 rounded">{{ formData }}</pre>
    </v-container>
  `,
  methods: {
    submitForm() {
      console.log('提交数据:', this.formData);
      alert('提交成功! 请查看控制台');
    },
    resetForm() {
      this.formData = { userType: 'personal' };
    },
  },
});
