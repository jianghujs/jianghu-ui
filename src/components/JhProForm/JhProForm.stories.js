import JhProForm from './JhProForm.vue';

export default {
  title: 'Pro Components/JhProForm',
  component: JhProForm,
  tags: ['autodocs'],
  argTypes: {
    dense: {
      control: 'boolean',
      description: '紧凑模式',
    },
    outlined: {
      control: 'boolean',
      description: '是否使用 outlined 样式',
    },
    showButtons: {
      control: 'boolean',
      description: '是否显示提交和重置按钮',
    },
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal', 'inline', 'grid'],
      description: '表单布局方式',
    },
  },
  parameters: {
    docs: {
      description: {
        component: '高级表单组件，支持多种字段类型、布局方式和字段联动。参考 Ant Design ProForm 设计。',
      },
    },
  },
};

export const Default = {
  name: '默认表单',
  render: (args) => ({
    components: { JhProForm },
    data() {
      return {
        args,
        formFields: [
          { name: 'username', label: '用户名', type: 'text', required: true },
          { name: 'email', label: '邮箱', type: 'email', required: true },
          { name: 'phone', label: '手机号', type: 'tel' },
          { name: 'age', label: '年龄', type: 'number', min: 0, max: 150 },
        ],
      };
    },
    template: `
      <jh-pro-form
        v-bind="args"
        :fields="formFields"
        @submit="handleSubmit"
        @reset="handleReset"
      />
    `,
    methods: {
      handleSubmit(values) {
        console.log('提交表单:', values);
        alert(JSON.stringify(values, null, 2));
      },
      handleReset() {
        console.log('重置表单');
      },
    },
  }),
  args: {
    dense: false,
    outlined: true,
    showButtons: true,
  },
};

export const AllFieldTypes = {
  name: '所有字段类型',
  render: (args) => ({
    components: { JhProForm },
    data() {
      return {
        args,
        formFields: [
          { type: 'group', title: '基本信息' },
          { name: 'username', label: '用户名', type: 'text', required: true, cols: 6 },
          { name: 'email', label: '邮箱', type: 'email', required: true, cols: 6 },
          { name: 'password', label: '密码', type: 'password', cols: 6 },
          { name: 'phone', label: '手机号', type: 'tel', cols: 6 },
          { name: 'website', label: '网站', type: 'url', cols: 12 },
          { name: 'bio', label: '个人简介', type: 'textarea', rows: 3 },

          { type: 'group', title: '选择器' },
          {
            name: 'role',
            label: '角色',
            type: 'select',
            options: [
              { text: '管理员', value: 'admin' },
              { text: '普通用户', value: 'user' },
              { text: '访客', value: 'guest' },
            ],
            cols: 6,
          },
          {
            name: 'tags',
            label: '标签',
            type: 'select',
            multiple: true,
            options: [
              { text: 'Vue', value: 'vue' },
              { text: 'React', value: 'react' },
              { text: 'Angular', value: 'angular' },
            ],
            cols: 6,
          },
          {
            name: 'country',
            label: '国家',
            type: 'autocomplete',
            options: [
              { text: '中国', value: 'cn' },
              { text: '美国', value: 'us' },
              { text: '日本', value: 'jp' },
            ],
            cols: 6,
          },

          { type: 'group', title: '日期时间' },
          { name: 'birthdate', label: '出生日期', type: 'date', cols: 6 },
          { name: 'dateRange', label: '日期范围', type: 'daterange', cols: 6 },

          { type: 'group', title: '开关与选项' },
          { name: 'newsletter', label: '订阅邮件', type: 'checkbox', cols: 4 },
          { name: 'active', label: '激活账户', type: 'switch', cols: 4 },
          {
            name: 'gender',
            label: '性别',
            type: 'radio',
            row: true,
            options: [
              { text: '男', value: 'male' },
              { text: '女', value: 'female' },
            ],
            cols: 4,
          },

          { type: 'group', title: '评分与滑块' },
          { name: 'rating', label: '评分', type: 'rating', length: 5, cols: 6 },
          { name: 'satisfaction', label: '满意度', type: 'slider', min: 0, max: 100, cols: 6 },
        ],
      };
    },
    template: `
      <jh-pro-form
        v-bind="args"
        :fields="formFields"
        @submit="handleSubmit"
      />
    `,
    methods: {
      handleSubmit(values) {
        console.log('提交表单:', values);
        alert(JSON.stringify(values, null, 2));
      },
    },
  }),
  args: {
    outlined: true,
  },
};

export const WithInitialData = {
  name: '带初始数据',
  render: (args) => ({
    components: { JhProForm },
    data() {
      return {
        args,
        formFields: [
          { name: 'username', label: '用户名', type: 'text', required: true, cols: 6 },
          { name: 'email', label: '邮箱', type: 'email', required: true, cols: 6 },
          { name: 'role', label: '角色', type: 'select', options: [
            { text: '管理员', value: 'admin' },
            { text: '普通用户', value: 'user' },
          ], cols: 6 },
          { name: 'active', label: '激活', type: 'switch', cols: 6 },
        ],
        initialData: {
          username: '张三',
          email: 'zhangsan@example.com',
          role: 'admin',
          active: true,
        },
      };
    },
    template: `
      <jh-pro-form
        v-bind="args"
        :fields="formFields"
        :initial-data="initialData"
        @submit="handleSubmit"
      />
    `,
    methods: {
      handleSubmit(values) {
        console.log('提交表单:', values);
        alert(JSON.stringify(values, null, 2));
      },
    },
  }),
  args: {
    outlined: true,
  },
};

export const ConditionalFields = {
  name: '条件字段',
  render: (args) => ({
    components: { JhProForm },
    data() {
      return {
        args,
        formFields: [
          {
            name: 'userType',
            label: '用户类型',
            type: 'select',
            options: [
              { text: '个人', value: 'personal' },
              { text: '企业', value: 'company' },
            ],
            required: true,
          },
          {
            name: 'personalName',
            label: '姓名',
            type: 'text',
            visible: (formData) => formData.userType === 'personal',
            required: true,
          },
          {
            name: 'idCard',
            label: '身份证号',
            type: 'text',
            visible: (formData) => formData.userType === 'personal',
          },
          {
            name: 'companyName',
            label: '公司名称',
            type: 'text',
            visible: (formData) => formData.userType === 'company',
            required: true,
          },
          {
            name: 'taxNumber',
            label: '税号',
            type: 'text',
            visible: (formData) => formData.userType === 'company',
          },
        ],
      };
    },
    template: `
      <div>
        <v-alert type="info" class="mb-4">
          根据选择的用户类型，表单会动态显示不同的字段
        </v-alert>
        <jh-pro-form
          v-bind="args"
          :fields="formFields"
          @submit="handleSubmit"
          @field-change="handleFieldChange"
        />
      </div>
    `,
    methods: {
      handleSubmit(values) {
        console.log('提交表单:', values);
        alert(JSON.stringify(values, null, 2));
      },
      handleFieldChange({ field, values }) {
        console.log('字段变化:', field, values);
      },
    },
  }),
  args: {
    outlined: true,
  },
};

export const CustomLayout = {
  name: '自定义布局',
  render: (args) => ({
    components: { JhProForm },
    data() {
      return {
        args,
        formFields: [
          { type: 'group', title: '基本信息' },
          { name: 'username', label: '用户名', type: 'text', required: true, cols: 12, md: 6 },
          { name: 'email', label: '邮箱', type: 'email', required: true, cols: 12, md: 6 },

          { type: 'group', title: '详细信息' },
          { name: 'phone', label: '手机号', type: 'tel', cols: 12, md: 4 },
          { name: 'age', label: '年龄', type: 'number', cols: 12, md: 4 },
          { name: 'gender', label: '性别', type: 'select', options: [
            { text: '男', value: 'male' },
            { text: '女', value: 'female' },
          ], cols: 12, md: 4 },

          { type: 'group', title: '其他' },
          { name: 'address', label: '地址', type: 'textarea', cols: 12 },
        ],
      };
    },
    template: `
      <jh-pro-form
        v-bind="args"
        :fields="formFields"
        @submit="handleSubmit"
      />
    `,
    methods: {
      handleSubmit(values) {
        console.log('提交表单:', values);
        alert(JSON.stringify(values, null, 2));
      },
    },
  }),
  args: {
    outlined: true,
  },
};

export const NoButtons = {
  name: '自定义按钮',
  render: (args) => ({
    components: { JhProForm },
    data() {
      return {
        args,
        formFields: [
          { name: 'username', label: '用户名', type: 'text', required: true },
          { name: 'email', label: '邮箱', type: 'email', required: true },
        ],
      };
    },
    template: `
      <div>
        <jh-pro-form
          ref="formRef"
          v-bind="args"
          :fields="formFields"
          @submit="handleSubmit"
        >
          <template #buttons>
            <v-btn color="success" @click="handleCustomSubmit">
              <v-icon left>mdi-check</v-icon>
              自定义提交
            </v-btn>
          </template>
        </jh-pro-form>
      </div>
    `,
    methods: {
      async handleCustomSubmit() {
        const valid = await this.$refs.formRef.validate();
        if (valid) {
          const data = this.$refs.formRef.getFormData();
          console.log('自定义提交:', data);
          alert(JSON.stringify(data, null, 2));
        }
      },
      handleSubmit(values) {
        console.log('提交表单:', values);
      },
    },
  }),
  args: {
    outlined: true,
    showButtons: true,
  },
};

// ========== 业务场景示例 ==========

/**
 * 场景1：用户注册表单
 * 演示：分组、多种字段类型、表单验证、响应式布局
 */
export const UserRegistration = {
  name: '用户注册表单',
  render: (args) => ({
    components: { JhProForm },
    data() {
      return {
        args,
        registerFields: [
          { type: 'group', title: '账户信息' },
          {
            name: 'username',
            label: '用户名',
            type: 'text',
            placeholder: '请输入用户名',
            required: true,
            hint: '3-16位字母、数字或下划线',
            rules: [
              (v) => /^[a-zA-Z0-9_]{3,16}$/.test(v) || '用户名格式不正确',
            ],
            cols: 12,
            md: 6,
          },
          {
            name: 'email',
            label: '邮箱地址',
            type: 'email',
            placeholder: '请输入邮箱地址',
            required: true,
            cols: 12,
            md: 6,
          },
          {
            name: 'phone',
            label: '手机号',
            type: 'tel',
            placeholder: '请输入手机号',
            required: true,
            rules: [
              (v) => /^1[3-9]\d{9}$/.test(v) || '请输入正确的手机号',
            ],
            cols: 12,
            md: 6,
          },
          {
            name: 'password',
            label: '密码',
            type: 'password',
            placeholder: '请输入密码',
            required: true,
            hint: '密码长度8-20位，需包含字母和数字',
            rules: [
              (v) => (v && v.length >= 8) || '密码至少8位',
              (v) => /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(v) || '密码需包含字母和数字',
            ],
            cols: 12,
            md: 6,
          },

          { type: 'group', title: '个人信息' },
          {
            name: 'realname',
            label: '真实姓名',
            type: 'text',
            placeholder: '请输入真实姓名',
            required: true,
            cols: 12,
            md: 4,
          },
          {
            name: 'gender',
            label: '性别',
            type: 'radio',
            row: true,
            options: [
              { text: '男', value: 'male' },
              { text: '女', value: 'female' },
            ],
            default: 'male',
            cols: 12,
            md: 4,
          },
          {
            name: 'birthdate',
            label: '出生日期',
            type: 'date',
            placeholder: '请选择出生日期',
            cols: 12,
            md: 4,
          },
          {
            name: 'city',
            label: '所在城市',
            type: 'autocomplete',
            placeholder: '请选择城市',
            options: [
              { text: '北京市', value: 'beijing' },
              { text: '上海市', value: 'shanghai' },
              { text: '广州市', value: 'guangzhou' },
              { text: '深圳市', value: 'shenzhen' },
              { text: '杭州市', value: 'hangzhou' },
              { text: '成都市', value: 'chengdu' },
              { text: '武汉市', value: 'wuhan' },
            ],
            cols: 12,
            md: 6,
          },
          {
            name: 'industry',
            label: '所属行业',
            type: 'select',
            placeholder: '请选择行业',
            options: [
              { text: '互联网/IT', value: 'it' },
              { text: '金融/保险', value: 'finance' },
              { text: '教育/培训', value: 'education' },
              { text: '医疗/健康', value: 'healthcare' },
              { text: '制造业', value: 'manufacturing' },
              { text: '其他', value: 'other' },
            ],
            cols: 12,
            md: 6,
          },

          { type: 'group', title: '其他设置' },
          {
            name: 'subscribe',
            label: '订阅产品资讯和优惠信息',
            type: 'checkbox',
            default: true,
            cols: 12,
          },
          {
            name: 'agreement',
            label: '我已阅读并同意《用户协议》和《隐私政策》',
            type: 'checkbox',
            required: true,
            cols: 12,
          },
        ],
      };
    },
    template: `
      <div>
        <v-alert type="info" class="mb-4" dense>
          <strong>场景说明：</strong>用户注册表单，包含账户信息、个人信息和协议确认。
          演示了分组、多种字段类型、表单验证和响应式布局。
        </v-alert>
        <jh-pro-form
          v-bind="args"
          :fields="registerFields"
          submit-button-text="注册"
          reset-button-text="清空"
          @submit="handleRegister"
        />
      </div>
    `,
    methods: {
      handleRegister(values) {
        console.log('注册数据:', values);
        alert('注册成功！\n\n' + JSON.stringify(values, null, 2));
      },
    },
  }),
  args: {
    outlined: true,
  },
};

/**
 * 场景2：员工入职表单
 * 演示：复杂字段联动、条件显示、动态表单
 */
export const EmployeeOnboarding = {
  name: '员工入职表单',
  render: (args) => ({
    components: { JhProForm },
    data() {
      return {
        args,
        employeeFields: [
          { type: 'group', title: '基本信息' },
          {
            name: 'employeeName',
            label: '员工姓名',
            type: 'text',
            placeholder: '请输入员工姓名',
            required: true,
            cols: 12,
            md: 6,
          },
          {
            name: 'gender',
            label: '性别',
            type: 'radio',
            row: true,
            options: [
              { text: '男', value: 'male' },
              { text: '女', value: 'female' },
            ],
            required: true,
            cols: 12,
            md: 6,
          },
          {
            name: 'phone',
            label: '手机号码',
            type: 'tel',
            placeholder: '请输入手机号码',
            required: true,
            rules: [
              (v) => /^1[3-9]\d{9}$/.test(v) || '请输入正确的手机号',
            ],
            cols: 12,
            md: 6,
          },
          {
            name: 'email',
            label: '邮箱地址',
            type: 'email',
            placeholder: '请输入邮箱地址',
            required: true,
            cols: 12,
            md: 6,
          },

          { type: 'group', title: '岗位信息' },
          {
            name: 'department',
            label: '所属部门',
            type: 'select',
            placeholder: '请选择部门',
            options: [
              { text: '技术部', value: 'tech' },
              { text: '产品部', value: 'product' },
              { text: '市场部', value: 'marketing' },
              { text: '销售部', value: 'sales' },
              { text: '人力资源部', value: 'hr' },
              { text: '财务部', value: 'finance' },
            ],
            required: true,
            cols: 12,
            md: 6,
          },
          {
            name: 'position',
            label: '职位',
            type: 'text',
            placeholder: '请输入职位',
            required: true,
            cols: 12,
            md: 6,
          },
          {
            name: 'employeeType',
            label: '员工类型',
            type: 'radio',
            row: true,
            options: [
              { text: '正式员工', value: 'fulltime' },
              { text: '实习生', value: 'intern' },
              { text: '外包', value: 'contractor' },
            ],
            required: true,
            cols: 12,
          },

          // 正式员工字段
          {
            name: 'contractPeriod',
            label: '合同期限',
            type: 'daterange',
            placeholder: '请选择合同开始和结束日期',
            visible: (formData) => formData.employeeType === 'fulltime',
            cols: 12,
          },
          {
            name: 'baseSalary',
            label: '基本工资',
            type: 'number',
            placeholder: '请输入基本工资',
            min: 0,
            visible: (formData) => formData.employeeType === 'fulltime',
            hint: '单位：元/月',
            cols: 12,
            md: 6,
          },

          // 实习生字段
          {
            name: 'internPeriod',
            label: '实习期限',
            type: 'daterange',
            placeholder: '请选择实习开始和结束日期',
            visible: (formData) => formData.employeeType === 'intern',
            cols: 12,
          },
          {
            name: 'mentor',
            label: '导师姓名',
            type: 'text',
            placeholder: '请输入导师姓名',
            visible: (formData) => formData.employeeType === 'intern',
            cols: 12,
            md: 6,
          },

          { type: 'group', title: '技能特长' },
          {
            name: 'skills',
            label: '技能标签',
            type: 'select',
            multiple: true,
            placeholder: '请选择技能特长',
            options: [
              { text: 'Java', value: 'java' },
              { text: 'Python', value: 'python' },
              { text: 'JavaScript', value: 'javascript' },
              { text: 'Vue.js', value: 'vue' },
              { text: 'React', value: 'react' },
              { text: 'Node.js', value: 'node' },
              { text: 'SQL', value: 'sql' },
            ],
            cols: 12,
          },
          {
            name: 'selfIntroduction',
            label: '自我介绍',
            type: 'textarea',
            rows: 3,
            placeholder: '请简要介绍个人经历、特长、期望等',
            cols: 12,
          },
        ],
      };
    },
    template: `
      <div>
        <v-alert type="info" class="mb-4" dense>
          <strong>场景说明：</strong>员工入职表单，根据员工类型（正式/实习/外包）动态显示不同字段。
          演示了字段联动和条件显示功能。
        </v-alert>
        <jh-pro-form
          v-bind="args"
          :fields="employeeFields"
          submit-button-text="提交入职信息"
          @submit="handleSubmit"
          @field-change="handleFieldChange"
        />
      </div>
    `,
    methods: {
      handleSubmit(values) {
        console.log('员工入职信息:', values);
        alert('提交成功！\n\n' + JSON.stringify(values, null, 2));
      },
      handleFieldChange({ field, values }) {
        console.log('字段变化:', field, '当前值:', values);
      },
    },
  }),
  args: {
    outlined: true,
  },
};

/**
 * 场景3：商品发布表单
 * 演示：复杂业务场景、多种字段类型组合
 */
export const ProductPublish = {
  name: '商品发布表单',
  render: (args) => ({
    components: { JhProForm },
    data() {
      return {
        args,
        productFields: [
          { type: 'group', title: '基本信息' },
          {
            name: 'productName',
            label: '商品名称',
            type: 'text',
            placeholder: '请输入商品名称',
            required: true,
            hint: '不超过60个字符',
            rules: [
              (v) => (v && v.length <= 60) || '商品名称不能超过60个字符',
            ],
            cols: 12,
          },
          {
            name: 'category',
            label: '商品分类',
            type: 'select',
            placeholder: '请选择商品分类',
            options: [
              { text: '电子产品', value: 'electronics' },
              { text: '服装鞋包', value: 'clothing' },
              { text: '食品饮料', value: 'food' },
              { text: '家居用品', value: 'home' },
              { text: '图书音像', value: 'books' },
              { text: '运动户外', value: 'sports' },
            ],
            required: true,
            cols: 12,
            md: 6,
          },
          {
            name: 'brand',
            label: '品牌',
            type: 'autocomplete',
            placeholder: '请输入或选择品牌',
            options: [
              { text: '苹果 Apple', value: 'apple' },
              { text: '华为 Huawei', value: 'huawei' },
              { text: '小米 Xiaomi', value: 'xiaomi' },
              { text: '三星 Samsung', value: 'samsung' },
            ],
            cols: 12,
            md: 6,
          },

          { type: 'group', title: '价格库存' },
          {
            name: 'price',
            label: '商品价格',
            type: 'number',
            placeholder: '请输入价格',
            min: 0,
            required: true,
            hint: '单位：元',
            prependIcon: 'mdi-currency-cny',
            cols: 12,
            md: 4,
          },
          {
            name: 'stock',
            label: '库存数量',
            type: 'number',
            placeholder: '请输入库存',
            min: 0,
            required: true,
            cols: 12,
            md: 4,
          },
          {
            name: 'unit',
            label: '单位',
            type: 'select',
            placeholder: '请选择单位',
            options: [
              { text: '件', value: 'piece' },
              { text: '个', value: 'unit' },
              { text: '盒', value: 'box' },
              { text: '套', value: 'set' },
            ],
            default: 'piece',
            cols: 12,
            md: 4,
          },

          { type: 'group', title: '商品详情' },
          {
            name: 'description',
            label: '商品描述',
            type: 'textarea',
            rows: 4,
            placeholder: '请输入商品描述，包括特点、用途、注意事项等',
            required: true,
            cols: 12,
          },
          {
            name: 'tags',
            label: '商品标签',
            type: 'select',
            multiple: true,
            placeholder: '请选择商品标签',
            options: [
              { text: '热销', value: 'hot' },
              { text: '新品', value: 'new' },
              { text: '包邮', value: 'free_shipping' },
              { text: '促销', value: 'promotion' },
              { text: '限量', value: 'limited' },
            ],
            cols: 12,
          },

          { type: 'group', title: '销售设置' },
          {
            name: 'saleType',
            label: '销售方式',
            type: 'radio',
            row: true,
            options: [
              { text: '立即开售', value: 'immediate' },
              { text: '定时开售', value: 'scheduled' },
              { text: '暂不开售', value: 'draft' },
            ],
            default: 'immediate',
            required: true,
            cols: 12,
          },
          {
            name: 'saleTime',
            label: '开售时间',
            type: 'date',
            placeholder: '请选择开售时间',
            visible: (formData) => formData.saleType === 'scheduled',
            cols: 12,
            md: 6,
          },
          {
            name: 'allowReturn',
            label: '支持7天无理由退货',
            type: 'switch',
            default: true,
            cols: 12,
            md: 6,
          },
        ],
      };
    },
    template: `
      <div>
        <v-alert type="info" class="mb-4" dense>
          <strong>场景说明：</strong>商品发布表单，包含基本信息、价格库存、商品详情和销售设置。
          根据销售方式动态显示开售时间字段。
        </v-alert>
        <jh-pro-form
          v-bind="args"
          :fields="productFields"
          submit-button-text="发布商品"
          reset-button-text="重置"
          @submit="handlePublish"
        />
      </div>
    `,
    methods: {
      handlePublish(values) {
        console.log('商品发布信息:', values);
        alert('发布成功！\n\n' + JSON.stringify(values, null, 2));
      },
    },
  }),
  args: {
    outlined: true,
  },
};

/**
 * 场景4：客户信息编辑表单（带初始数据）
 * 演示：表单编辑、数据回填
 */
export const CustomerEdit = {
  name: '客户信息编辑',
  render: (args) => ({
    components: { JhProForm },
    data() {
      return {
        args,
        customerFields: [
          { type: 'group', title: '客户基本信息' },
          {
            name: 'companyName',
            label: '公司名称',
            type: 'text',
            placeholder: '请输入公司名称',
            required: true,
            cols: 12,
            md: 6,
          },
          {
            name: 'industry',
            label: '所属行业',
            type: 'select',
            placeholder: '请选择行业',
            options: [
              { text: '互联网/IT', value: 'it' },
              { text: '金融/保险', value: 'finance' },
              { text: '制造业', value: 'manufacturing' },
              { text: '贸易/零售', value: 'retail' },
              { text: '教育/培训', value: 'education' },
            ],
            required: true,
            cols: 12,
            md: 6,
          },
          {
            name: 'scale',
            label: '公司规模',
            type: 'select',
            placeholder: '请选择规模',
            options: [
              { text: '1-50人', value: 'small' },
              { text: '51-200人', value: 'medium' },
              { text: '201-500人', value: 'large' },
              { text: '500人以上', value: 'xlarge' },
            ],
            cols: 12,
            md: 6,
          },
          {
            name: 'establishedDate',
            label: '成立日期',
            type: 'date',
            placeholder: '请选择成立日期',
            cols: 12,
            md: 6,
          },

          { type: 'group', title: '联系人信息' },
          {
            name: 'contactName',
            label: '联系人',
            type: 'text',
            placeholder: '请输入联系人姓名',
            required: true,
            cols: 12,
            md: 6,
          },
          {
            name: 'contactPosition',
            label: '职位',
            type: 'text',
            placeholder: '请输入职位',
            cols: 12,
            md: 6,
          },
          {
            name: 'contactPhone',
            label: '联系电话',
            type: 'tel',
            placeholder: '请输入联系电话',
            required: true,
            rules: [
              (v) => /^1[3-9]\d{9}$/.test(v) || '请输入正确的手机号',
            ],
            cols: 12,
            md: 6,
          },
          {
            name: 'contactEmail',
            label: '邮箱',
            type: 'email',
            placeholder: '请输入邮箱地址',
            cols: 12,
            md: 6,
          },

          { type: 'group', title: '合作信息' },
          {
            name: 'customerLevel',
            label: '客户等级',
            type: 'radio',
            row: true,
            options: [
              { text: 'VIP客户', value: 'vip' },
              { text: '重点客户', value: 'important' },
              { text: '普通客户', value: 'normal' },
            ],
            default: 'normal',
            cols: 12,
          },
          {
            name: 'cooperationPeriod',
            label: '合作期限',
            type: 'daterange',
            placeholder: '请选择合作开始和结束日期',
            cols: 12,
          },
          {
            name: 'isActive',
            label: '当前是否在合作',
            type: 'switch',
            default: true,
            cols: 12,
            md: 6,
          },
          {
            name: 'satisfactionRating',
            label: '满意度评分',
            type: 'rating',
            length: 5,
            cols: 12,
            md: 6,
          },
          {
            name: 'remarks',
            label: '备注',
            type: 'textarea',
            rows: 3,
            placeholder: '请输入备注信息',
            cols: 12,
          },
        ],
        initialCustomerData: {
          companyName: '蓝海科技有限公司',
          industry: 'it',
          scale: 'medium',
          establishedDate: '2015-03-15',
          contactName: '张经理',
          contactPosition: '采购总监',
          contactPhone: '13800138000',
          contactEmail: 'zhang@bluesea.com',
          customerLevel: 'important',
          cooperationPeriod_start: '2020-01-01',
          cooperationPeriod_end: '2025-12-31',
          isActive: true,
          satisfactionRating: 4,
          remarks: '长期合作客户，服务质量良好',
        },
      };
    },
    template: `
      <div>
        <v-alert type="info" class="mb-4" dense>
          <strong>场景说明：</strong>客户信息编辑表单，演示了数据回填和编辑功能。
          表单已预填充了客户数据，可直接修改保存。
        </v-alert>
        <jh-pro-form
          v-bind="args"
          :fields="customerFields"
          :initial-data="initialCustomerData"
          submit-button-text="保存修改"
          reset-button-text="恢复原始"
          @submit="handleUpdate"
        />
      </div>
    `,
    methods: {
      handleUpdate(values) {
        console.log('更新客户信息:', values);
        alert('保存成功！\n\n' + JSON.stringify(values, null, 2));
      },
    },
  }),
  args: {
    outlined: true,
  },
};

/**
 * 场景5：活动报名表单
 * 演示：多种交互组件组合
 */
export const EventRegistration = {
  name: '活动报名表单',
  render: (args) => ({
    components: { JhProForm },
    data() {
      return {
        args,
        eventFields: [
          { type: 'group', title: '报名人信息' },
          {
            name: 'participantName',
            label: '姓名',
            type: 'text',
            placeholder: '请输入姓名',
            required: true,
            cols: 12,
            md: 6,
          },
          {
            name: 'phone',
            label: '手机号',
            type: 'tel',
            placeholder: '请输入手机号',
            required: true,
            rules: [
              (v) => /^1[3-9]\d{9}$/.test(v) || '请输入正确的手机号',
            ],
            cols: 12,
            md: 6,
          },
          {
            name: 'email',
            label: '邮箱',
            type: 'email',
            placeholder: '请输入邮箱地址',
            cols: 12,
            md: 6,
          },
          {
            name: 'company',
            label: '所在公司',
            type: 'text',
            placeholder: '请输入公司名称',
            cols: 12,
            md: 6,
          },

          { type: 'group', title: '活动选择' },
          {
            name: 'eventType',
            label: '活动类型',
            type: 'select',
            placeholder: '请选择活动类型',
            options: [
              { text: '技术沙龙', value: 'tech_salon' },
              { text: '产品发布会', value: 'product_launch' },
              { text: '行业峰会', value: 'summit' },
              { text: '培训课程', value: 'training' },
            ],
            required: true,
            cols: 12,
            md: 6,
          },
          {
            name: 'participantCount',
            label: '参与人数',
            type: 'number',
            placeholder: '请输入人数',
            min: 1,
            max: 5,
            default: 1,
            hint: '最多可携带4人',
            cols: 12,
            md: 6,
          },
          {
            name: 'preferredTopics',
            label: '感兴趣的话题',
            type: 'select',
            multiple: true,
            placeholder: '请选择感兴趣的话题',
            options: [
              { text: '人工智能', value: 'ai' },
              { text: '云计算', value: 'cloud' },
              { text: '大数据', value: 'bigdata' },
              { text: '物联网', value: 'iot' },
              { text: '区块链', value: 'blockchain' },
            ],
            cols: 12,
          },

          { type: 'group', title: '餐饮安排' },
          {
            name: 'mealRequired',
            label: '是否需要提供午餐',
            type: 'switch',
            default: true,
            cols: 12,
            md: 6,
          },
          {
            name: 'dietaryRestrictions',
            label: '饮食禁忌',
            type: 'select',
            placeholder: '请选择',
            options: [
              { text: '无', value: 'none' },
              { text: '素食', value: 'vegetarian' },
              { text: '清真', value: 'halal' },
              { text: '其他', value: 'other' },
            ],
            visible: (formData) => formData.mealRequired === true,
            cols: 12,
            md: 6,
          },

          { type: 'group', title: '其他' },
          {
            name: 'expectation',
            label: '您对本次活动的期望',
            type: 'textarea',
            rows: 3,
            placeholder: '请描述您对本次活动的期望或建议',
            cols: 12,
          },
          {
            name: 'eventRating',
            label: '对往期活动的评分',
            type: 'rating',
            length: 5,
            hint: '如果之前参加过我们的活动，请为其评分',
            cols: 12,
            md: 6,
          },
          {
            name: 'willShare',
            label: '愿意分享到社交媒体',
            type: 'checkbox',
            cols: 12,
          },
        ],
      };
    },
    template: `
      <div>
        <v-alert type="info" class="mb-4" dense>
          <strong>场景说明：</strong>活动报名表单，包含参与人信息、活动选择、餐饮安排等。
          演示了多种交互组件的组合使用。
        </v-alert>
        <jh-pro-form
          v-bind="args"
          :fields="eventFields"
          submit-button-text="提交报名"
          @submit="handleSubmit"
        />
      </div>
    `,
    methods: {
      handleSubmit(values) {
        console.log('活动报名信息:', values);
        alert('报名成功！\n\n' + JSON.stringify(values, null, 2));
      },
    },
  }),
  args: {
    outlined: true,
  },
};

// ========== Grid 布局示例 ==========

/**
 * Grid 布局 - 2列
 * 演示：使用 grid 布局自动将字段分成2列显示
 */
export const GridLayout2Columns = {
  name: 'Grid布局 - 2列',
  render: (args) => ({
    components: { JhProForm },
    data() {
      return {
        args,
        formFields: [
          { type: 'group', title: '用户基本信息' },
          { name: 'username', label: '用户名', type: 'text', required: true },
          { name: 'email', label: '邮箱', type: 'email', required: true },
          { name: 'phone', label: '手机号', type: 'tel' },
          { name: 'age', label: '年龄', type: 'number' },

          { type: 'group', title: '详细信息' },
          { name: 'realname', label: '真实姓名', type: 'text' },
          { name: 'idCard', label: '身份证号', type: 'text' },
          { name: 'address', label: '地址', type: 'text', colSpan: 2 }, // 跨2列，占满整行
          { name: 'bio', label: '个人简介', type: 'textarea', rows: 3, colSpan: 2 },
        ],
      };
    },
    template: `
      <div>
        <v-alert type="info" class="mb-4" dense>
          <strong>Grid 布局 - 2列：</strong>设置 layout="grid" 和 grid.column=2，字段自动分成2列显示。
          <br>使用 colSpan 属性可以让字段跨多列（如地址和简介字段跨2列占满整行）。
        </v-alert>
        <jh-pro-form
          v-bind="args"
          layout="grid"
          :grid="{ column: 2, gutter: 16 }"
          :fields="formFields"
          @submit="handleSubmit"
        />
      </div>
    `,
    methods: {
      handleSubmit(values) {
        console.log('提交:', values);
        alert(JSON.stringify(values, null, 2));
      },
    },
  }),
  args: {
    outlined: true,
  },
};

/**
 * Grid 布局 - 3列
 * 演示：使用 grid 布局自动将字段分成3列显示
 */
export const GridLayout3Columns = {
  name: 'Grid布局 - 3列',
  render: (args) => ({
    components: { JhProForm },
    data() {
      return {
        args,
        formFields: [
          { type: 'group', title: '商品信息' },
          { name: 'productName', label: '商品名称', type: 'text', required: true, colSpan: 3 },
          { name: 'category', label: '分类', type: 'select', options: [
            { text: '电子产品', value: 'electronics' },
            { text: '服装鞋包', value: 'clothing' },
            { text: '食品饮料', value: 'food' },
          ]},
          { name: 'brand', label: '品牌', type: 'text' },
          { name: 'model', label: '型号', type: 'text' },
          { name: 'price', label: '价格', type: 'number' },
          { name: 'stock', label: '库存', type: 'number' },
          { name: 'unit', label: '单位', type: 'select', options: [
            { text: '件', value: 'piece' },
            { text: '个', value: 'unit' },
            { text: '盒', value: 'box' },
          ]},
          { name: 'description', label: '商品描述', type: 'textarea', rows: 3, colSpan: 3 },
        ],
      };
    },
    template: `
      <div>
        <v-alert type="info" class="mb-4" dense>
          <strong>Grid 布局 - 3列：</strong>设置 grid.column=3，字段自动分成3列显示。
          <br>商品名称和描述使用 colSpan=3 占满整行。
        </v-alert>
        <jh-pro-form
          v-bind="args"
          layout="grid"
          :grid="{ column: 3, gutter: 16 }"
          :fields="formFields"
          @submit="handleSubmit"
        />
      </div>
    `,
    methods: {
      handleSubmit(values) {
        console.log('提交:', values);
        alert(JSON.stringify(values, null, 2));
      },
    },
  }),
  args: {
    outlined: true,
  },
};

/**
 * Grid 布局 - 4列
 * 演示：使用 grid 布局自动将字段分成4列显示
 */
export const GridLayout4Columns = {
  name: 'Grid布局 - 4列',
  render: (args) => ({
    components: { JhProForm },
    data() {
      return {
        args,
        formFields: [
          { type: 'group', title: '季度报表' },
          { name: 'q1', label: 'Q1营收', type: 'number' },
          { name: 'q2', label: 'Q2营收', type: 'number' },
          { name: 'q3', label: 'Q3营收', type: 'number' },
          { name: 'q4', label: 'Q4营收', type: 'number' },

          { type: 'group', title: '费用明细' },
          { name: 'salary', label: '人力成本', type: 'number' },
          { name: 'rent', label: '租金', type: 'number' },
          { name: 'marketing', label: '营销费用', type: 'number' },
          { name: 'other', label: '其他', type: 'number' },

          { name: 'summary', label: '总结', type: 'textarea', rows: 3, colSpan: 4 },
        ],
      };
    },
    template: `
      <div>
        <v-alert type="info" class="mb-4" dense>
          <strong>Grid 布局 - 4列：</strong>设置 grid.column=4，适合展示表格类数据。
          <br>总结字段使用 colSpan=4 占满整行。
        </v-alert>
        <jh-pro-form
          v-bind="args"
          layout="grid"
          :grid="{ column: 4, gutter: 16 }"
          :fields="formFields"
          @submit="handleSubmit"
        />
      </div>
    `,
    methods: {
      handleSubmit(values) {
        console.log('提交:', values);
        alert(JSON.stringify(values, null, 2));
      },
    },
  }),
  args: {
    outlined: true,
    dense: true,
  },
};

/**
 * Grid 布局 - 混合跨列
 * 演示：复杂的跨列布局场景
 */
export const GridLayoutMixedSpan = {
  name: 'Grid布局 - 混合跨列',
  render: (args) => ({
    components: { JhProForm },
    data() {
      return {
        args,
        formFields: [
          { type: 'group', title: '文章发布' },
          { name: 'title', label: '文章标题', type: 'text', required: true, colSpan: 3 },

          { name: 'author', label: '作者', type: 'text', colSpan: 1 },
          { name: 'category', label: '分类', type: 'select', options: [
            { text: '技术', value: 'tech' },
            { text: '生活', value: 'life' },
            { text: '财经', value: 'finance' },
          ], colSpan: 1 },
          { name: 'publishDate', label: '发布日期', type: 'date', colSpan: 1 },

          { name: 'summary', label: '摘要', type: 'textarea', rows: 2, colSpan: 2 },
          { name: 'coverUrl', label: '封面图', type: 'url', colSpan: 1 },

          { name: 'content', label: '正文内容', type: 'textarea', rows: 6, colSpan: 3 },

          { type: 'group', title: '其他设置' },
          { name: 'allowComment', label: '允许评论', type: 'switch', colSpan: 1 },
          { name: 'featured', label: '推荐文章', type: 'switch', colSpan: 1 },
          { name: 'status', label: '状态', type: 'radio', row: true, options: [
            { text: '草稿', value: 'draft' },
            { text: '发布', value: 'published' },
          ], colSpan: 1 },
        ],
      };
    },
    template: `
      <div>
        <v-alert type="info" class="mb-4" dense>
          <strong>Grid 布局 - 混合跨列：</strong>演示复杂的跨列布局场景。
          <br>- 标题跨3列占满
          <br>- 作者/分类/日期各占1列
          <br>- 摘要跨2列，封面图占1列
          <br>- 正文跨3列占满
        </v-alert>
        <jh-pro-form
          v-bind="args"
          layout="grid"
          :grid="{ column: 3, gutter: 16 }"
          :fields="formFields"
          @submit="handleSubmit"
        />
      </div>
    `,
    methods: {
      handleSubmit(values) {
        console.log('提交:', values);
        alert(JSON.stringify(values, null, 2));
      },
    },
  }),
  args: {
    outlined: true,
  },
};

/**
 * Grid 布局 - 响应式
 * 演示：结合响应式断点的 Grid 布局
 */
export const GridLayoutResponsive = {
  name: 'Grid布局 - 响应式',
  render: (args) => ({
    components: { JhProForm },
    data() {
      return {
        args,
        formFields: [
          { type: 'group', title: '基本信息' },
          {
            name: 'username',
            label: '用户名',
            type: 'text',
            required: true,
            // 在 grid 模式下使用 colSpan，同时也支持 md/lg 进行响应式控制
            colSpan: 1,
            md: 6,  // 中屏及以上占一半
            lg: 4,  // 大屏占1/3
          },
          {
            name: 'email',
            label: '邮箱',
            type: 'email',
            required: true,
            colSpan: 1,
            md: 6,
            lg: 4,
          },
          {
            name: 'phone',
            label: '手机号',
            type: 'tel',
            colSpan: 1,
            md: 12, // 中屏占满一行
            lg: 4,  // 大屏占1/3
          },

          { type: 'group', title: '地址信息' },
          { name: 'province', label: '省份', type: 'text', colSpan: 1 },
          { name: 'city', label: '城市', type: 'text', colSpan: 1 },
          { name: 'district', label: '区县', type: 'text', colSpan: 1 },
          { name: 'detailAddress', label: '详细地址', type: 'text', colSpan: 3 },
        ],
      };
    },
    template: `
      <div>
        <v-alert type="info" class="mb-4" dense>
          <strong>Grid 布局 - 响应式：</strong>在 Grid 模式下仍然支持 md/lg 等响应式断点。
          <br>- 小屏：使用 grid.column 控制（本例为3列）
          <br>- 中屏及以上：使用字段的 md/lg 属性进行精细控制
          <br><em>提示：调整浏览器窗口大小查看响应式效果</em>
        </v-alert>
        <jh-pro-form
          v-bind="args"
          layout="grid"
          :grid="{ column: 3, gutter: 16 }"
          :fields="formFields"
          @submit="handleSubmit"
        />
      </div>
    `,
    methods: {
      handleSubmit(values) {
        console.log('提交:', values);
        alert(JSON.stringify(values, null, 2));
      },
    },
  }),
  args: {
    outlined: true,
  },
};

/**
 * 对比：传统布局 vs Grid 布局
 * 演示：相同字段在不同布局模式下的表现
 */
export const LayoutComparison = {
  name: '布局对比',
  render: (args) => ({
    components: { JhProForm },
    data() {
      return {
        args,
        formFields: [
          { name: 'username', label: '用户名', type: 'text', required: true },
          { name: 'email', label: '邮箱', type: 'email', required: true },
          { name: 'phone', label: '手机号', type: 'tel' },
          { name: 'age', label: '年龄', type: 'number' },
          { name: 'address', label: '地址', type: 'text' },
          { name: 'bio', label: '简介', type: 'textarea', rows: 2 },
        ],
      };
    },
    template: `
      <div>
        <v-alert type="info" class="mb-4" dense>
          <strong>布局对比：</strong>查看相同字段在不同布局模式下的表现差异
        </v-alert>

        <h3 class="mb-3">传统布局（每个字段独占一行）</h3>
        <jh-pro-form
          :fields="formFields"
          outlined
          submit-button-text="提交（传统）"
          class="mb-6"
        />

        <v-divider class="my-8" />

        <h3 class="mb-3">Grid 布局 - 2列（自动分组）</h3>
        <jh-pro-form
          layout="grid"
          :grid="{ column: 2 }"
          :fields="formFields"
          outlined
          submit-button-text="提交（Grid 2列）"
          class="mb-6"
        />

        <v-divider class="my-8" />

        <h3 class="mb-3">Grid 布局 - 3列（更紧凑）</h3>
        <jh-pro-form
          layout="grid"
          :grid="{ column: 3 }"
          :fields="formFields"
          outlined
          submit-button-text="提交（Grid 3列）"
        />
      </div>
    `,
  }),
};

// ========== 水平布局示例 ==========

/**
 * 水平布局 - 标签在左
 * 演示：类似 Ant Design 的水平表单布局
 */
export const HorizontalLayout = {
  name: '水平布局 - 标签在左',
  render: (args) => ({
    components: { JhProForm },
    data() {
      return {
        args,
        formFields: [
          { type: 'group', title: '基本信息' },
          { name: 'invoiceDate', label: '开票日期', type: 'date', required: true },
          { name: 'invoiceCode', label: '发票代码', type: 'text', required: true },
          { name: 'invoiceNumber', label: '发票号码', type: 'text', required: true },
          { name: 'invoiceStatus', label: '发票状态', type: 'select', required: true, options: [
            { text: '正常', value: 'normal' },
            { text: '作废', value: 'void' },
            { text: '红冲', value: 'red' },
          ]},
          { name: 'supplierName', label: '供应商名称', type: 'text', required: true },
          { name: 'verifyDate', label: '认证日期', type: 'date' },
          { name: 'taxCode', label: '统一社会信用代码', type: 'text' },
          { name: 'addressPhone', label: '地址及电话', type: 'text' },
          { name: 'bankAccount', label: '开户行及账户', type: 'text' },
          { name: 'entryDate', label: '录入日期', type: 'date' },
          { name: 'remark', label: '备注', type: 'textarea', rows: 2 },

          { type: 'group', title: '业务类型' },
          { name: 'template', label: '模板', type: 'select', options: [
            { text: '采购支出', value: 'purchase' },
            { text: '费用报销', value: 'expense' },
          ]},

          { type: 'group', title: '发票数据' },
          { name: 'includesTax', label: '是否含入发票明细', type: 'radio', options: [
            { text: '是', value: true },
            { text: '否', value: false },
          ], row: true, required: true },
          { name: 'totalAmount', label: '不含税金额', type: 'number', required: true },
          { name: 'taxRate', label: '税率', type: 'select', options: [
            { text: '3', value: 3 },
            { text: '6', value: 6 },
            { text: '9', value: 9 },
            { text: '13', value: 13 },
          ]},
          { name: 'taxAmount', label: '税额', type: 'number', required: true },
          { name: 'totalWithTax', label: '价税合计', type: 'number' },
        ],
      };
    },
    template: `
      <div>
        <v-alert type="info" class="mb-4" dense>
          <strong>水平布局：</strong>设置 layout="horizontal"，标签显示在左侧，输入框在右侧。
          <br>使用 labelCol 和 wrapperCol 控制标签和输入框的宽度比例。
          <br>默认配置：labelCol (sm:4, md:3), wrapperCol (sm:8, md:9)
        </v-alert>
        <jh-pro-form
          v-bind="args"
          layout="horizontal"
          :fields="formFields"
          @submit="handleSubmit"
        />
      </div>
    `,
    methods: {
      handleSubmit(values) {
        console.log('提交:', values);
        alert(JSON.stringify(values, null, 2));
      },
    },
  }),
  args: {
    outlined: true,
  },
};

/**
 * 水平布局 + Grid - 2列
 * 演示：水平布局结合 Grid 布局
 */
export const HorizontalGridLayout2Columns = {
  name: '水平布局 + Grid 2列',
  render: (args) => ({
    components: { JhProForm },
    data() {
      return {
        args,
        formFields: [
          { type: 'group', title: '基本信息' },
          { name: 'invoiceDate', label: '开票日期', type: 'date', required: true },
          { name: 'invoiceCode', label: '发票代码', type: 'text', required: true },
          { name: 'invoiceNumber', label: '发票号码', type: 'text', required: true },
          { name: 'invoiceStatus', label: '发票状态', type: 'select', required: true, options: [
            { text: '正常', value: 'normal' },
            { text: '作废', value: 'void' },
          ]},
          { name: 'supplierName', label: '供应商名称', type: 'text', required: true, colSpan: 2 },
          { name: 'taxCode', label: '统一社会信用代码', type: 'text', colSpan: 2 },
          { name: 'addressPhone', label: '地址及电话', type: 'text', colSpan: 2 },
          { name: 'remark', label: '备注', type: 'textarea', rows: 2, colSpan: 2 },

          { type: 'group', title: '发票数据' },
          { name: 'totalAmount', label: '不含税金额', type: 'number', required: true },
          { name: 'taxRate', label: '税率', type: 'select', options: [
            { text: '3%', value: 3 },
            { text: '6%', value: 6 },
            { text: '13%', value: 13 },
          ]},
          { name: 'taxAmount', label: '税额', type: 'number', required: true },
          { name: 'totalWithTax', label: '价税合计', type: 'number' },
        ],
      };
    },
    template: `
      <div>
        <v-alert type="info" class="mb-4" dense>
          <strong>水平布局 + Grid 2列：</strong>同时使用 layout="horizontal" 和 grid.column=2。
          <br>字段自动分成2列显示，每个字段内部是标签在左、输入框在右的水平布局。
          <br>使用 colSpan 可以让字段跨列（如供应商名称、备注等跨2列占满整行）。
        </v-alert>
        <jh-pro-form
          v-bind="args"
          layout="horizontal"
          :grid="{ column: 2 }"
          :fields="formFields"
          @submit="handleSubmit"
        />
      </div>
    `,
    methods: {
      handleSubmit(values) {
        console.log('提交:', values);
        alert(JSON.stringify(values, null, 2));
      },
    },
  }),
  args: {
    outlined: true,
  },
};

/**
 * 水平布局 + Grid - 3列
 * 演示：水平布局结合 Grid 3列布局
 */
export const HorizontalGridLayout3Columns = {
  name: '水平布局 + Grid 3列',
  render: (args) => ({
    components: { JhProForm },
    data() {
      return {
        args,
        formFields: [
          { type: 'group', title: '发票基本信息' },
          { name: 'invoiceDate', label: '开票日期', type: 'date', required: true },
          { name: 'invoiceCode', label: '发票代码', type: 'text', required: true },
          { name: 'invoiceNumber', label: '发票号码', type: 'text', required: true },
          { name: 'invoiceStatus', label: '发票状态', type: 'select', required: true, options: [
            { text: '正常', value: 'normal' },
            { text: '作废', value: 'void' },
            { text: '红冲', value: 'red' },
          ]},
          { name: 'verifyDate', label: '认证日期', type: 'date' },
          { name: 'entryDate', label: '录入日期', type: 'date' },

          { type: 'group', title: '供应商信息' },
          { name: 'supplierName', label: '供应商名称', type: 'text', required: true, colSpan: 3 },
          { name: 'taxCode', label: '信用代码', type: 'text' },
          { name: 'addressPhone', label: '地址电话', type: 'text' },
          { name: 'bankAccount', label: '开户行账户', type: 'text' },

          { type: 'group', title: '金额信息' },
          { name: 'totalAmount', label: '不含税金额', type: 'number', required: true },
          { name: 'taxRate', label: '税率(%)', type: 'select', options: [
            { text: '3', value: 3 },
            { text: '6', value: 6 },
            { text: '9', value: 9 },
            { text: '13', value: 13 },
          ]},
          { name: 'taxAmount', label: '税额', type: 'number', required: true },
          { name: 'remark', label: '备注', type: 'textarea', rows: 2, colSpan: 3 },
        ],
      };
    },
    template: `
      <div>
        <v-alert type="info" class="mb-4" dense>
          <strong>水平布局 + Grid 3列：</strong>字段分成3列显示，更加紧凑。
          <br>适合字段较多、屏幕较宽的场景。
          <br>供应商名称和备注使用 colSpan=3 占满整行。
        </v-alert>
        <jh-pro-form
          v-bind="args"
          layout="horizontal"
          :grid="{ column: 3 }"
          :fields="formFields"
          @submit="handleSubmit"
        />
      </div>
    `,
    methods: {
      handleSubmit(values) {
        console.log('提交:', values);
        alert(JSON.stringify(values, null, 2));
      },
    },
  }),
  args: {
    outlined: true,
    dense: true,
  },
};

/**
 * 水平布局 - 自定义标签宽度
 * 演示：通过 labelCol 和 wrapperCol 自定义标签和输入框的宽度
 */
export const HorizontalLayoutCustomWidth = {
  name: '水平布局 - 自定义标签宽度',
  render: (args) => ({
    components: { JhProForm },
    data() {
      return {
        args,
        formFields: [
          { type: 'group', title: '较窄标签列（2列）' },
          { name: 'name', label: '姓名', type: 'text', required: true },
          { name: 'email', label: '邮箱', type: 'email', required: true },
          { name: 'phone', label: '电话', type: 'tel' },
        ],
      };
    },
    template: `
      <div>
        <v-alert type="info" class="mb-4" dense>
          <strong>自定义标签宽度：</strong>通过配置 labelCol 和 wrapperCol 控制标签和输入框的宽度比例。
        </v-alert>

        <h3 class="mb-3">标签列占2列（默认）</h3>
        <jh-pro-form
          layout="horizontal"
          :fields="formFields"
          :label-col="{ cols: 12, sm: 3, md: 2 }"
          :wrapper-col="{ cols: 12, sm: 9, md: 10 }"
          outlined
          class="mb-6"
        />

        <v-divider class="my-8" />

        <h3 class="mb-3">标签列占4列（较宽）</h3>
        <jh-pro-form
          layout="horizontal"
          :fields="formFields"
          :label-col="{ cols: 12, sm: 5, md: 4 }"
          :wrapper-col="{ cols: 12, sm: 7, md: 8 }"
          outlined
          class="mb-6"
        />

        <v-divider class="my-8" />

        <h3 class="mb-3">标签列占6列（1:1比例）</h3>
        <jh-pro-form
          layout="horizontal"
          :fields="formFields"
          :label-col="{ cols: 12, sm: 6 }"
          :wrapper-col="{ cols: 12, sm: 6 }"
          outlined
        />
      </div>
    `,
  }),
};

/**
 * 水平布局 - 标签对齐方式
 * 演示：通过 labelAlign 控制标签的对齐方式
 */
export const HorizontalLayoutLabelAlign = {
  name: '水平布局 - 标签对齐',
  render: (args) => ({
    components: { JhProForm },
    data() {
      return {
        args,
        formFields: [
          { name: 'username', label: '用户名', type: 'text', required: true },
          { name: 'email', label: '邮箱地址', type: 'email', required: true },
          { name: 'phone', label: '手机号码', type: 'tel' },
        ],
      };
    },
    template: `
      <div>
        <v-alert type="info" class="mb-4" dense>
          <strong>标签对齐方式：</strong>通过 labelAlign 属性控制标签的对齐方式。
        </v-alert>

        <h3 class="mb-3">左对齐</h3>
        <jh-pro-form
          layout="horizontal"
          :fields="formFields"
          label-align="left"
          outlined
          class="mb-6"
        />

        <v-divider class="my-8" />

        <h3 class="mb-3">右对齐（默认）</h3>
        <jh-pro-form
          layout="horizontal"
          :fields="formFields"
          label-align="right"
          outlined
          class="mb-6"
        />

        <v-divider class="my-8" />

        <h3 class="mb-3">居中对齐</h3>
        <jh-pro-form
          layout="horizontal"
          :fields="formFields"
          label-align="center"
          outlined
        />
      </div>
    `,
  }),
};
