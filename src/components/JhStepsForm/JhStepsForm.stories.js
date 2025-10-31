import JhStepsForm from './JhStepsForm.vue';

export default {
  title: '数据录入/JhStepsForm',
  component: JhStepsForm,
  tags: ['autodocs'],
  argTypes: {
    steps: {
      control: 'object',
      description: '步骤配置数组',
    },
    initialStep: {
      control: 'number',
      description: '初始步骤索引 (从0开始)',
    },
    editable: {
      control: 'boolean',
      description: '是否可编辑已完成的步骤',
    },
    vertical: {
      control: 'boolean',
      description: '是否垂直布局',
    },
    altLabels: {
      control: 'boolean',
      description: '是否替代标签模式',
    },
    outlined: {
      control: 'boolean',
      description: '输入框样式',
    },
    dense: {
      control: 'boolean',
      description: '紧凑模式',
    },
    submitting: {
      control: 'boolean',
      description: '提交中状态',
    },
  },
};

// 基础示例
export const Basic = {
  render: (args) => ({
    components: { JhStepsForm },
    data() {
      return {
        steps: [
          {
            title: '基本信息',
            subTitle: '填写您的基本信息',
            fields: [
              {
                name: 'username',
                label: '用户名',
                type: 'text',
                placeholder: '请输入用户名',
                required: true,
                cols: 12,
                md: 6,
              },
              {
                name: 'email',
                label: '邮箱',
                type: 'email',
                placeholder: '请输入邮箱',
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
                cols: 12,
                md: 6,
              },
              {
                name: 'gender',
                label: '性别',
                type: 'radio',
                options: [
                  { text: '男', value: 'male' },
                  { text: '女', value: 'female' },
                ],
                default: 'male',
                cols: 12,
                md: 6,
              },
            ],
          },
          {
            title: '详细信息',
            subTitle: '完善您的详细资料',
            fields: [
              {
                name: 'address',
                label: '地址',
                type: 'text',
                placeholder: '请输入详细地址',
                required: true,
                cols: 12,
              },
              {
                name: 'city',
                label: '城市',
                type: 'select',
                placeholder: '请选择城市',
                options: [
                  { text: '北京市', value: 'beijing' },
                  { text: '上海市', value: 'shanghai' },
                  { text: '广州市', value: 'guangzhou' },
                  { text: '深圳市', value: 'shenzhen' },
                ],
                required: true,
                cols: 12,
                md: 6,
              },
              {
                name: 'birthdate',
                label: '出生日期',
                type: 'date',
                placeholder: '请选择出生日期',
                cols: 12,
                md: 6,
              },
              {
                name: 'description',
                label: '个人简介',
                type: 'textarea',
                placeholder: '请输入个人简介',
                rows: 4,
                cols: 12,
              },
            ],
          },
          {
            title: '确认信息',
            subTitle: '请确认您填写的信息',
            slot: 'step-confirm',
          },
        ],
        formData: {},
      };
    },
    template: `
      <v-container>
        <jh-steps-form
          v-bind="$props"
          :steps="steps"
          @finish="handleFinish"
          @change="handleChange"
        >
          <template #step-confirm="{ formData }">
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr v-for="(value, key) in formData.step0 || {}" :key="'step0-' + key">
                    <td class="font-weight-bold">{{ key }}</td>
                    <td>{{ value }}</td>
                  </tr>
                  <tr v-for="(value, key) in formData.step1 || {}" :key="'step1-' + key">
                    <td class="font-weight-bold">{{ key }}</td>
                    <td>{{ value }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </template>
        </jh-steps-form>
      </v-container>
    `,
    methods: {
      handleFinish(data) {
        console.log('完成表单:', data);
        alert('表单提交成功!请查看控制台');
      },
      handleChange(data) {
        this.formData = data;
        console.log('表单数据变化:', data);
      },
    },
  }),
  args: {
    editable: false,
    vertical: false,
    altLabels: false,
    outlined: true,
    dense: false,
    submitting: false,
  },
};

// 垂直布局
export const Vertical = {
  render: (args) => ({
    components: { JhStepsForm },
    data() {
      return {
        steps: [
          {
            title: '步骤1',
            subTitle: '基础信息',
            fields: [
              {
                name: 'name',
                label: '姓名',
                type: 'text',
                required: true,
                cols: 12,
              },
              {
                name: 'age',
                label: '年龄',
                type: 'number',
                cols: 12,
              },
            ],
          },
          {
            title: '步骤2',
            subTitle: '联系方式',
            fields: [
              {
                name: 'email',
                label: '邮箱',
                type: 'email',
                required: true,
                cols: 12,
              },
              {
                name: 'phone',
                label: '手机',
                type: 'tel',
                cols: 12,
              },
            ],
          },
          {
            title: '步骤3',
            subTitle: '完成',
            slot: 'step-finish',
          },
        ],
      };
    },
    template: `
      <v-container>
        <jh-steps-form
          v-bind="$props"
          :steps="steps"
          vertical
          @finish="handleFinish"
        >
          <template #step-finish>
            <v-alert type="success" text>
              所有信息已填写完成,点击完成按钮提交表单
            </v-alert>
          </template>
        </jh-steps-form>
      </v-container>
    `,
    methods: {
      handleFinish(data) {
        console.log('完成表单:', data);
        alert('表单提交成功!');
      },
    },
  }),
  args: {},
};

// 可编辑步骤
export const Editable = {
  render: (args) => ({
    components: { JhStepsForm },
    data() {
      return {
        steps: [
          {
            title: '账户信息',
            fields: [
              {
                name: 'username',
                label: '用户名',
                type: 'text',
                required: true,
                cols: 12,
              },
              {
                name: 'password',
                label: '密码',
                type: 'password',
                required: true,
                cols: 12,
              },
            ],
          },
          {
            title: '个人信息',
            fields: [
              {
                name: 'realname',
                label: '真实姓名',
                type: 'text',
                required: true,
                cols: 12,
              },
              {
                name: 'phone',
                label: '手机号',
                type: 'tel',
                required: true,
                cols: 12,
              },
            ],
          },
          {
            title: '其他信息',
            fields: [
              {
                name: 'company',
                label: '公司',
                type: 'text',
                cols: 12,
              },
              {
                name: 'position',
                label: '职位',
                type: 'text',
                cols: 12,
              },
            ],
          },
        ],
      };
    },
    template: `
      <v-container>
        <v-alert type="info" text class="mb-4">
          开启了可编辑模式,您可以点击已完成的步骤标题返回修改
        </v-alert>
        <jh-steps-form
          v-bind="$props"
          :steps="steps"
          editable
          @finish="handleFinish"
        />
      </v-container>
    `,
    methods: {
      handleFinish(data) {
        console.log('完成表单:', data);
        alert('表单提交成功!');
      },
    },
  }),
  args: {},
};

// 自定义步骤内容
export const CustomContent = {
  render: (args) => ({
    components: { JhStepsForm },
    data() {
      return {
        steps: [
          {
            title: '选择方案',
            slot: 'step-plan',
          },
          {
            title: '填写信息',
            fields: [
              {
                name: 'name',
                label: '姓名',
                type: 'text',
                required: true,
                cols: 12,
              },
              {
                name: 'email',
                label: '邮箱',
                type: 'email',
                required: true,
                cols: 12,
              },
            ],
          },
          {
            title: '支付',
            slot: 'step-payment',
          },
        ],
        selectedPlan: '',
        paymentMethod: '',
      };
    },
    template: `
      <v-container>
        <jh-steps-form
          v-bind="$props"
          :steps="steps"
          @finish="handleFinish"
        >
          <template #step-plan>
            <v-row>
              <v-col cols="12" md="4" v-for="plan in plans" :key="plan.value">
                <v-card
                  :outlined="selectedPlan !== plan.value"
                  :elevation="selectedPlan === plan.value ? 4 : 0"
                  @click="selectedPlan = plan.value"
                  class="cursor-pointer"
                >
                  <v-card-title>{{ plan.name }}</v-card-title>
                  <v-card-subtitle>{{ plan.price }}</v-card-subtitle>
                  <v-card-text>
                    <v-list dense>
                      <v-list-item v-for="(feature, index) in plan.features" :key="index">
                        <v-list-item-icon>
                          <v-icon small color="success">mdi-check</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title>{{ feature }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </template>

          <template #step-payment>
            <v-radio-group v-model="paymentMethod">
              <v-radio label="支付宝" value="alipay"></v-radio>
              <v-radio label="微信支付" value="wechat"></v-radio>
              <v-radio label="银行卡" value="bank"></v-radio>
            </v-radio-group>
          </template>
        </jh-steps-form>
      </v-container>
    `,
    computed: {
      plans() {
        return [
          {
            value: 'basic',
            name: '基础版',
            price: '¥99/月',
            features: ['5个用户', '10GB存储', '基础支持'],
          },
          {
            value: 'pro',
            name: '专业版',
            price: '¥299/月',
            features: ['20个用户', '100GB存储', '优先支持', '高级功能'],
          },
          {
            value: 'enterprise',
            name: '企业版',
            price: '¥999/月',
            features: ['无限用户', '1TB存储', '7x24支持', '全部功能', '定制开发'],
          },
        ];
      },
    },
    methods: {
      handleFinish(data) {
        console.log('完成表单:', {
          ...data,
          plan: this.selectedPlan,
          payment: this.paymentMethod,
        });
        alert('订单提交成功!');
      },
    },
  }),
  args: {},
};

// 员工入职流程
export const EmployeeOnboarding = {
  render: (args) => ({
    components: { JhStepsForm },
    data() {
      return {
        steps: [
          {
            title: '基本信息',
            subTitle: '填写员工基本信息',
            fields: [
              {
                name: 'employeeName',
                label: '员工姓名',
                type: 'text',
                placeholder: '请输入员工姓名',
                required: true,
                cols: 12,
                md: 4,
              },
              {
                name: 'gender',
                label: '性别',
                type: 'radio',
                options: [
                  { text: '男', value: 'male' },
                  { text: '女', value: 'female' },
                ],
                required: true,
                cols: 12,
                md: 4,
              },
              {
                name: 'birthdate',
                label: '出生日期',
                type: 'date',
                placeholder: '请选择出生日期',
                required: true,
                cols: 12,
                md: 4,
              },
              {
                name: 'idCard',
                label: '身份证号',
                type: 'text',
                placeholder: '请输入身份证号',
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
              },
            ],
          },
          {
            title: '岗位信息',
            subTitle: '设置员工岗位',
            fields: [
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
                type: 'select',
                options: [
                  { text: '正式员工', value: 'fulltime' },
                  { text: '实习生', value: 'intern' },
                  { text: '外包', value: 'contractor' },
                ],
                required: true,
                cols: 12,
                md: 6,
              },
              {
                name: 'entryDate',
                label: '入职日期',
                type: 'date',
                placeholder: '请选择入职日期',
                required: true,
                cols: 12,
                md: 6,
              },
            ],
          },
          {
            title: '紧急联系人',
            subTitle: '填写紧急联系人信息',
            fields: [
              {
                name: 'emergencyContact',
                label: '联系人姓名',
                type: 'text',
                placeholder: '请输入紧急联系人姓名',
                required: true,
                cols: 12,
                md: 4,
              },
              {
                name: 'emergencyRelation',
                label: '关系',
                type: 'select',
                placeholder: '请选择关系',
                options: [
                  { text: '父母', value: 'parent' },
                  { text: '配偶', value: 'spouse' },
                  { text: '子女', value: 'child' },
                  { text: '兄弟姐妹', value: 'sibling' },
                  { text: '其他', value: 'other' },
                ],
                required: true,
                cols: 12,
                md: 4,
              },
              {
                name: 'emergencyPhone',
                label: '联系电话',
                type: 'tel',
                placeholder: '请输入紧急联系人电话',
                required: true,
                cols: 12,
                md: 4,
              },
            ],
          },
          {
            title: '确认信息',
            subTitle: '请确认您填写的信息',
            slot: 'step-confirm',
          },
        ],
        formData: {},
      };
    },
    template: `
      <v-container>
        <jh-steps-form
          v-bind="$props"
          :steps="steps"
          editable
          @finish="handleFinish"
          @change="handleChange"
        >
          <template #step-confirm="{ formData }">
            <v-row>
              <v-col cols="12">
                <div class="text-h6 mb-4">基本信息</div>
                <v-simple-table>
                  <template v-slot:default>
                    <tbody>
                      <tr v-for="(value, key) in formData.step0 || {}" :key="key">
                        <td class="font-weight-bold" width="200">{{ key }}</td>
                        <td>{{ value }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>

              <v-col cols="12">
                <div class="text-h6 mb-4">岗位信息</div>
                <v-simple-table>
                  <template v-slot:default>
                    <tbody>
                      <tr v-for="(value, key) in formData.step1 || {}" :key="key">
                        <td class="font-weight-bold" width="200">{{ key }}</td>
                        <td>{{ value }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>

              <v-col cols="12">
                <div class="text-h6 mb-4">紧急联系人</div>
                <v-simple-table>
                  <template v-slot:default>
                    <tbody>
                      <tr v-for="(value, key) in formData.step2 || {}" :key="key">
                        <td class="font-weight-bold" width="200">{{ key }}</td>
                        <td>{{ value }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row>
          </template>
        </jh-steps-form>
      </v-container>
    `,
    methods: {
      handleFinish(data) {
        console.log('员工入职信息:', data);
        alert('员工入职信息提交成功!请查看控制台');
      },
      handleChange(data) {
        this.formData = data;
      },
    },
  }),
  args: {},
};

// 带验证的分步表单
export const WithValidation = {
  render: (args) => ({
    components: { JhStepsForm },
    data() {
      return {
        steps: [
          {
            title: '步骤1',
            fields: [
              {
                name: 'username',
                label: '用户名',
                type: 'text',
                required: true,
                rules: [
                  {
                    pattern: /^[a-zA-Z0-9_]{3,16}$/,
                    message: '用户名为3-16位字母数字下划线',
                  },
                ],
                cols: 12,
              },
            ],
          },
          {
            title: '步骤2',
            fields: [
              {
                name: 'email',
                label: '邮箱',
                type: 'email',
                required: true,
                cols: 12,
              },
            ],
          },
          {
            title: '步骤3',
            fields: [
              {
                name: 'phone',
                label: '手机号',
                type: 'tel',
                required: true,
                rules: [
                  { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
                ],
                cols: 12,
              },
            ],
          },
        ],
      };
    },
    template: `
      <v-container>
        <v-alert type="info" text class="mb-4">
          每个步骤都有表单验证,只有验证通过才能进入下一步
        </v-alert>
        <jh-steps-form
          v-bind="$props"
          :steps="steps"
          :validate-step="validateStep"
          @finish="handleFinish"
        />
      </v-container>
    `,
    methods: {
      validateStep({ step, stepIndex, formData }) {
        console.log('验证步骤:', stepIndex, formData);
        // 自定义验证逻辑
        return true;
      },
      handleFinish(data) {
        console.log('完成表单:', data);
        alert('表单提交成功!');
      },
    },
  }),
  args: {},
};
