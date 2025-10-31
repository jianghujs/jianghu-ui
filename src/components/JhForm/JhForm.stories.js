import JhForm from './JhForm.vue';

export default {
  title: '数据录入/JhForm',
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

// 基础表单
export const Basic = {
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

// 完整表单示例
export const Complete = {
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

// 紧凑模式（3列布局）
export const CompactThreeColumns = {
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
export const WithoutLabels = {
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
export const OutlinedStyle = {
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

// 自定义初始数据
export const WithInitialData = {
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
export const SingleColumn = {
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

// 时间相关字段
export const DateTimeFields = {
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

// 水平布局 (标签并排)
export const HorizontalLayout = {
  args: {
    layout: 'horizontal',
    labelWidth: 120,
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
export const InlineLayout = {
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

// 表单分组
export const WithGroups = {
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
export const FieldDependency = {
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

// 只读模式
export const ReadonlyMode = {
  args: {
    readonly: true,
    layout: 'horizontal',
    labelWidth: 120,
    fields: [
      {
        key: 'username',
        label: '用户名',
        type: 'text',
        cols: { md: 12 },
      },
      {
        key: 'email',
        label: '邮箱',
        type: 'text',
        cols: { md: 12 },
      },
      {
        key: 'role',
        label: '角色',
        type: 'select',
        options: [
          { text: '管理员', value: 'admin' },
          { text: '普通用户', value: 'user' },
        ],
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
        cols: { md: 12 },
      },
      {
        key: 'receiveNotification',
        label: '接收通知',
        type: 'switch',
        cols: { md: 12 },
      },
      {
        key: 'tags',
        label: '标签',
        type: 'select',
        multiple: true,
        options: [
          { text: 'VIP', value: 'vip' },
          { text: '活跃', value: 'active' },
          { text: '新用户', value: 'new' },
        ],
        cols: { md: 12 },
      },
      {
        key: 'bio',
        label: '个人简介',
        type: 'textarea',
        cols: { md: 12 },
      },
    ],
    initialData: {
      username: '张三',
      email: 'zhangsan@example.com',
      role: 'admin',
      status: 'active',
      receiveNotification: true,
      tags: ['vip', 'active'],
      bio: '这是一段个人简介文本,用于测试只读模式的显示效果。',
    },
  },
};

// 混合布局 (字段级别控制)
export const MixedLayout = {
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
        labelWidth: 100,
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
        labelWidth: 100,
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
