import JhFormFields from './JhFormFields.vue';

export default {
  title: '数据录入/JhFormFields',
  component: JhFormFields,
  parameters: {
    docs: {
      description: {
        component: '基于 Ant Design ProComponents FieldSet 设计的字段集组件,支持字段依赖、动态联动等高级特性。',
      },
    },
  },
};

// 基础用法
export const Basic = () => ({
  components: { JhFormFields },
  data() {
    return {
      formData: {
        username: '',
        email: '',
        phone: '',
      },
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
      ],
    };
  },
  template: `
    <v-container>
      <JhFormFields
        v-model="formData"
        :fields="fields"
        title="基本信息"
        description="请填写您的基本信息"
      />
      <v-divider class="my-4"></v-divider>
      <div class="text-caption">表单数据:</div>
      <pre>{{ formData }}</pre>
    </v-container>
  `,
});

// 字段依赖 - ProFormDependency
export const FieldDependency = () => ({
  components: { JhFormFields },
  data() {
    return {
      formData: {
        userType: 'personal',
        country: 'china',
      },
      fields: [
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
        { type: 'group', title: '地址信息', divider: true },
        {
          key: 'country',
          label: '国家',
          type: 'select',
          options: [
            { text: '中国', value: 'china' },
            { text: '美国', value: 'usa' },
            { text: '日本', value: 'japan' },
          ],
          defaultValue: 'china',
        },
        {
          key: 'province',
          label: '省份',
          type: 'select',
          placeholder: '请选择省份',
          options: (values) => {
            const provinceMap = {
              china: [
                { text: '北京', value: 'beijing' },
                { text: '上海', value: 'shanghai' },
                { text: '广东', value: 'guangdong' },
              ],
              usa: [
                { text: '加利福尼亚', value: 'california' },
                { text: '纽约', value: 'newyork' },
                { text: '德克萨斯', value: 'texas' },
              ],
              japan: [
                { text: '东京', value: 'tokyo' },
                { text: '大阪', value: 'osaka' },
                { text: '京都', value: 'kyoto' },
              ],
            };
            return provinceMap[values.country] || [];
          },
          dependencies: ['country'],
        },
      ],
    };
  },
  template: `
    <v-container>
      <JhFormFields
        v-model="formData"
        :fields="fields"
        title="用户注册"
        description="根据用户类型显示不同的字段"
        tooltip="字段会根据选择动态显示"
        @field-dependency-change="handleDependencyChange"
      />
      <v-divider class="my-4"></v-divider>
      <div class="text-caption">表单数据:</div>
      <pre>{{ formData }}</pre>
    </v-container>
  `,
  methods: {
    handleDependencyChange(event) {
      console.log('字段依赖变化:', event);
    },
  },
});

// 动态禁用字段
export const DynamicDisabled = () => ({
  components: { JhFormFields },
  data() {
    return {
      formData: {
        agreeTerms: false,
        subscribeNewsletter: false,
      },
      fields: [
        {
          key: 'agreeTerms',
          label: '同意服务条款',
          type: 'checkbox',
          checkboxLabel: '我已阅读并同意服务条款',
          defaultValue: false,
          cols: { md: 12 },
        },
        {
          key: 'username',
          label: '用户名',
          type: 'text',
          placeholder: '请输入用户名',
          disabled: (values) => !values.agreeTerms,
          dependencies: ['agreeTerms'],
          tooltip: '需要先同意服务条款',
        },
        {
          key: 'email',
          label: '邮箱',
          type: 'text',
          placeholder: '请输入邮箱',
          disabled: (values) => !values.agreeTerms,
          dependencies: ['agreeTerms'],
        },
        {
          key: 'subscribeNewsletter',
          label: '订阅新闻',
          type: 'checkbox',
          checkboxLabel: '订阅我们的新闻通讯',
          disabled: (values) => !values.agreeTerms,
          dependencies: ['agreeTerms'],
        },
        {
          key: 'frequency',
          label: '订阅频率',
          type: 'select',
          options: [
            { text: '每日', value: 'daily' },
            { text: '每周', value: 'weekly' },
            { text: '每月', value: 'monthly' },
          ],
          disabled: (values) => !values.agreeTerms || !values.subscribeNewsletter,
          dependencies: ['agreeTerms', 'subscribeNewsletter'],
        },
      ],
    };
  },
  template: `
    <v-container>
      <JhFormFields
        v-model="formData"
        :fields="fields"
        title="注册表单"
        description="字段根据条件动态启用/禁用"
      />
      <v-divider class="my-4"></v-divider>
      <div class="text-caption">表单数据:</div>
      <pre>{{ formData }}</pre>
    </v-container>
  `,
});

// 水平布局
export const HorizontalLayout = () => ({
  components: { JhFormFields },
  data() {
    return {
      formData: {},
      fields: [
        {
          key: 'username',
          label: '用户名',
          type: 'text',
          placeholder: '请输入用户名',
          required: true,
        },
        {
          key: 'password',
          label: '密码',
          type: 'text',
          placeholder: '请输入密码',
          props: { type: 'password' },
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
      ],
    };
  },
  template: `
    <v-container>
      <JhFormFields
        v-model="formData"
        :fields="fields"
        title="登录信息"
        layout="horizontal"
        :labelWidth="100"
        labelAlign="right"
        :defaultColsMd="12"
      />
      <v-divider class="my-4"></v-divider>
      <div class="text-caption">表单数据:</div>
      <pre>{{ formData }}</pre>
    </v-container>
  `,
});

// 行内布局
export const InlineLayout = () => ({
  components: { JhFormFields },
  data() {
    return {
      formData: {},
      fields: [
        {
          key: 'keyword',
          label: '关键词',
          type: 'text',
          placeholder: '请输入关键词',
        },
        {
          key: 'category',
          label: '分类',
          type: 'select',
          options: [
            { text: '全部', value: 'all' },
            { text: '文章', value: 'article' },
            { text: '视频', value: 'video' },
          ],
        },
        {
          key: 'status',
          label: '状态',
          type: 'select',
          options: [
            { text: '全部', value: 'all' },
            { text: '已发布', value: 'published' },
            { text: '草稿', value: 'draft' },
          ],
        },
      ],
    };
  },
  template: `
    <v-container>
      <JhFormFields
        v-model="formData"
        :fields="fields"
        title="搜索筛选"
        layout="inline"
      >
        <template #footer="{ values }">
          <v-btn color="primary" class="ml-2">搜索</v-btn>
          <v-btn text class="ml-2">重置</v-btn>
        </template>
      </JhFormFields>
      <v-divider class="my-4"></v-divider>
      <div class="text-caption">表单数据:</div>
      <pre>{{ formData }}</pre>
    </v-container>
  `,
});

// 字段分组
export const FieldGroups = () => ({
  components: { JhFormFields },
  data() {
    return {
      formData: {},
      fields: [
        { type: 'group', title: '基本信息' },
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
        { type: 'group', title: '联系方式', divider: true, description: '请填写您的联系方式' },
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
    };
  },
  template: `
    <v-container>
      <JhFormFields
        v-model="formData"
        :fields="fields"
        title="用户资料"
      />
      <v-divider class="my-4"></v-divider>
      <div class="text-caption">表单数据:</div>
      <pre>{{ formData }}</pre>
    </v-container>
  `,
});

// 只读模式
export const ReadonlyMode = () => ({
  components: { JhFormFields },
  data() {
    return {
      formData: {
        username: 'johndoe',
        email: 'john@example.com',
        phone: '13800138000',
        userType: 'company',
        status: 'active',
        subscribe: true,
        bio: '这是一段个人简介...',
      },
      fields: [
        {
          key: 'username',
          label: '用户名',
          type: 'text',
        },
        {
          key: 'email',
          label: '邮箱',
          type: 'text',
        },
        {
          key: 'phone',
          label: '手机号',
          type: 'text',
        },
        {
          key: 'userType',
          label: '用户类型',
          type: 'radio',
          options: [
            { text: '个人用户', value: 'personal' },
            { text: '企业用户', value: 'company' },
          ],
        },
        {
          key: 'status',
          label: '状态',
          type: 'select',
          options: [
            { text: '激活', value: 'active' },
            { text: '禁用', value: 'disabled' },
          ],
        },
        {
          key: 'subscribe',
          label: '订阅状态',
          type: 'switch',
        },
        {
          key: 'bio',
          label: '个人简介',
          type: 'textarea',
          cols: { md: 12 },
        },
      ],
    };
  },
  template: `
    <v-container>
      <JhFormFields
        v-model="formData"
        :fields="fields"
        title="用户详情"
        description="只读模式展示"
        readonly
      />
      <v-divider class="my-4"></v-divider>
      <div class="text-caption">表单数据:</div>
      <pre>{{ formData }}</pre>
    </v-container>
  `,
});

// 带边框样式
export const BorderedStyle = () => ({
  components: { JhFormFields },
  data() {
    return {
      formData: {},
      fields: [
        {
          key: 'username',
          label: '用户名',
          type: 'text',
          placeholder: '请输入用户名',
        },
        {
          key: 'email',
          label: '邮箱',
          type: 'text',
          placeholder: '请输入邮箱',
        },
        {
          key: 'phone',
          label: '手机号',
          type: 'text',
          placeholder: '请输入手机号',
        },
      ],
    };
  },
  template: `
    <v-container>
      <JhFormFields
        v-model="formData"
        :fields="fields"
        title="基本信息"
        description="带边框的字段集"
        tooltip="这是一个带边框的字段集组件"
        bordered
      />
      <v-divider class="my-4"></v-divider>
      <JhFormFields
        v-model="formData"
        :fields="fields"
        title="联系方式"
        bordered
        class="mt-4"
      />
    </v-container>
  `,
});

// 复杂联动示例
export const ComplexDependency = () => ({
  components: { JhFormFields },
  data() {
    return {
      formData: {
        productType: 'physical',
        hasDiscount: false,
      },
      fields: [
        {
          key: 'productType',
          label: '商品类型',
          type: 'radio',
          options: [
            { text: '实物商品', value: 'physical' },
            { text: '虚拟商品', value: 'virtual' },
            { text: '服务商品', value: 'service' },
          ],
          defaultValue: 'physical',
          cols: { md: 12 },
        },
        {
          key: 'productName',
          label: '商品名称',
          type: 'text',
          placeholder: '请输入商品名称',
          required: true,
        },
        {
          key: 'price',
          label: '价格',
          type: 'number',
          placeholder: '请输入价格',
          required: true,
        },
        {
          key: 'weight',
          label: '重量(kg)',
          type: 'number',
          placeholder: '请输入重量',
          visible: (values) => values.productType === 'physical',
          dependencies: ['productType'],
        },
        {
          key: 'shippingMethod',
          label: '配送方式',
          type: 'select',
          options: [
            { text: '快递', value: 'express' },
            { text: '自提', value: 'pickup' },
          ],
          visible: (values) => values.productType === 'physical',
          dependencies: ['productType'],
        },
        {
          key: 'downloadUrl',
          label: '下载链接',
          type: 'text',
          placeholder: '请输入下载链接',
          visible: (values) => values.productType === 'virtual',
          dependencies: ['productType'],
        },
        {
          key: 'serviceTime',
          label: '服务时长(小时)',
          type: 'number',
          placeholder: '请输入服务时长',
          visible: (values) => values.productType === 'service',
          dependencies: ['productType'],
        },
        { type: 'group', title: '优惠设置', divider: true },
        {
          key: 'hasDiscount',
          label: '启用优惠',
          type: 'checkbox',
          checkboxLabel: '启用优惠价格',
          defaultValue: false,
          cols: { md: 12 },
        },
        {
          key: 'discountType',
          label: '优惠类型',
          type: 'radio',
          options: [
            { text: '固定金额', value: 'fixed' },
            { text: '百分比', value: 'percent' },
          ],
          visible: (values) => values.hasDiscount,
          dependencies: ['hasDiscount'],
          cols: { md: 12 },
        },
        {
          key: 'discountAmount',
          label: '优惠金额',
          type: 'number',
          placeholder: '请输入优惠金额',
          visible: (values) => values.hasDiscount && values.discountType === 'fixed',
          dependencies: ['hasDiscount', 'discountType'],
        },
        {
          key: 'discountPercent',
          label: '优惠百分比',
          type: 'number',
          placeholder: '请输入优惠百分比',
          suffix: '%',
          visible: (values) => values.hasDiscount && values.discountType === 'percent',
          dependencies: ['hasDiscount', 'discountType'],
        },
      ],
    };
  },
  template: `
    <v-container>
      <JhFormFields
        v-model="formData"
        :fields="fields"
        title="商品信息"
        description="根据商品类型和优惠设置显示不同字段"
      />
      <v-divider class="my-4"></v-divider>
      <div class="text-caption">表单数据:</div>
      <pre>{{ formData }}</pre>
    </v-container>
  `,
});

// 自定义字段插槽
export const CustomFieldSlot = () => ({
  components: { JhFormFields },
  data() {
    return {
      formData: {
        rating: 3,
        color: '#1976D2',
      },
      fields: [
        {
          key: 'username',
          label: '用户名',
          type: 'text',
          placeholder: '请输入用户名',
        },
        {
          key: 'rating',
          label: '评分',
          type: 'slot',
          defaultValue: 3,
        },
        {
          key: 'color',
          label: '颜色',
          type: 'slot',
          defaultValue: '#1976D2',
        },
        {
          key: 'description',
          label: '描述',
          type: 'textarea',
          placeholder: '请输入描述',
          cols: { md: 12 },
        },
      ],
    };
  },
  template: `
    <v-container>
      <JhFormFields
        v-model="formData"
        :fields="fields"
        title="自定义字段"
        description="使用插槽自定义字段渲染"
      >
        <template #field-rating="{ value, updateField }">
          <v-rating
            :value="value"
            @input="updateField('rating', $event)"
            color="warning"
            background-color="grey lighten-1"
            half-increments
            hover
          ></v-rating>
        </template>
        
        <template #field-color="{ value, updateField }">
          <v-color-picker
            :value="value"
            @input="updateField('color', $event)"
            hide-inputs
            show-swatches
          ></v-color-picker>
        </template>
      </JhFormFields>
      <v-divider class="my-4"></v-divider>
      <div class="text-caption">表单数据:</div>
      <pre>{{ formData }}</pre>
    </v-container>
  `,
});

// 响应式布局
export const ResponsiveLayout = () => ({
  components: { JhFormFields },
  data() {
    return {
      formData: {},
      fields: [
        {
          key: 'field1',
          label: '字段1 (全宽)',
          type: 'text',
          placeholder: '所有屏幕全宽',
          cols: { xs: 12, sm: 12, md: 12, lg: 12 },
        },
        {
          key: 'field2',
          label: '字段2 (响应式)',
          type: 'text',
          placeholder: 'xs:12, sm:6, md:4, lg:3',
          cols: { xs: 12, sm: 6, md: 4, lg: 3 },
        },
        {
          key: 'field3',
          label: '字段3 (响应式)',
          type: 'text',
          placeholder: 'xs:12, sm:6, md:4, lg:3',
          cols: { xs: 12, sm: 6, md: 4, lg: 3 },
        },
        {
          key: 'field4',
          label: '字段4 (响应式)',
          type: 'text',
          placeholder: 'xs:12, sm:6, md:4, lg:3',
          cols: { xs: 12, sm: 6, md: 4, lg: 3 },
        },
        {
          key: 'field5',
          label: '字段5 (响应式)',
          type: 'text',
          placeholder: 'xs:12, sm:6, md:4, lg:3',
          cols: { xs: 12, sm: 6, md: 4, lg: 3 },
        },
        {
          key: 'field6',
          label: '字段6 (半宽)',
          type: 'text',
          placeholder: 'xs:12, md:6',
          cols: { xs: 12, md: 6 },
        },
        {
          key: 'field7',
          label: '字段7 (半宽)',
          type: 'text',
          placeholder: 'xs:12, md:6',
          cols: { xs: 12, md: 6 },
        },
      ],
    };
  },
  template: `
    <v-container>
      <JhFormFields
        v-model="formData"
        :fields="fields"
        title="响应式布局"
        description="调整浏览器窗口大小查看效果"
      />
      <v-divider class="my-4"></v-divider>
      <div class="text-caption">表单数据:</div>
      <pre>{{ formData }}</pre>
    </v-container>
  `,
});

// 在 JhForm 中使用
export const WithinJhForm = () => ({
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
          visible: (values) => values.userType === 'personal',
          dependencies: ['userType'],
        },
        {
          key: 'companyName',
          label: '公司名称',
          type: 'text',
          placeholder: '请输入公司名称',
          visible: (values) => values.userType === 'company',
          dependencies: ['userType'],
        },
      ],
    };
  },
  template: `
    <v-container>
      <v-form>
        <JhFormFields
          v-model="formData"
          :fields="basicFields"
          title="基本信息"
          bordered
        />
        
        <JhFormFields
          v-model="formData"
          :fields="typeFields"
          title="用户类型"
          bordered
          class="mt-4"
        />
        
        <v-row class="mt-4">
          <v-col cols="12" class="text-right">
            <v-btn class="mr-2">重置</v-btn>
            <v-btn color="primary">提交</v-btn>
          </v-col>
        </v-row>
      </v-form>
      
      <v-divider class="my-4"></v-divider>
      <div class="text-caption">表单数据:</div>
      <pre>{{ formData }}</pre>
    </v-container>
  `,
});
