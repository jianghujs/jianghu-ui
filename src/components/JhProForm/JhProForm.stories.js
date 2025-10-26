import JhProForm from './JhProForm.vue';

export default {
  title: '数据录入/JhProForm',
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
    labelPosition: {
      control: 'select',
      options: ['float', 'top'],
      description: '标签位置（vertical 布局下有效）',
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
        layout="vertical"
        label-position="top"
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
    dense: true,
    outlined: true,
    showButtons: true,
  },
};


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

// ========== 垂直布局 - 顶部标签示例 ==========

/**
 * 垂直布局 - 标签在上
 * 演示：标签固定显示在输入框上方的布局方式
 */
export const VerticalTopLabelLayout = {
  name: '垂直布局 - 标签在上',
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
          { name: 'remark', label: '备注', type: 'textarea', rows: 2 },

          { type: 'group', title: '发票数据' },
          { name: 'includesTax', label: '是否含入发票明细', type: 'radio', options: [
            { text: '是', value: true },
            { text: '否', value: false },
          ], row: true, required: true },
          { name: 'totalAmount', label: '不含税金额', type: 'number', required: true },
          { name: 'taxRate', label: '税率', type: 'select', options: [
            { text: '3%', value: 3 },
            { text: '6%', value: 6 },
            { text: '9%', value: 9 },
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
          <strong>垂直布局 - 标签在上：</strong>设置 layout="vertical" 和 labelPosition="top"。
          <br>标签固定显示在输入框上方，不同于 Vuetify 默认的浮动标签效果。
          <br>适合需要明确标签显示的表单场景。
        </v-alert>
        <jh-pro-form
          v-bind="args"
          layout="vertical"
          label-position="top"
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
 * 垂直布局 + Grid - 标签在上
 * 演示：顶部标签布局结合 Grid 2列布局
 */
export const VerticalTopLabelGrid2Columns = {
  name: '垂直布局 + Grid 2列 - 标签在上',
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
          <strong>垂直布局 + Grid 2列 - 标签在上：</strong>结合 Grid 2列布局和顶部标签。
          <br>字段自动分成2列显示，每个字段内部标签在上、输入框在下。
          <br>使用 colSpan 可以让字段跨列（如供应商名称、备注等跨2列占满整行）。
        </v-alert>
        <jh-pro-form
          v-bind="args"
          layout="vertical"
          label-position="top"
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
 * 垂直布局 + Grid - 3列标签在上
 * 演示：顶部标签布局结合 Grid 3列布局
 */
export const VerticalTopLabelGrid3Columns = {
  name: '垂直布局 + Grid 3列 - 标签在上',
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
          <strong>垂直布局 + Grid 3列 - 标签在上：</strong>字段分成3列显示，更加紧凑。
          <br>适合字段较多、屏幕较宽的场景。
          <br>供应商名称和备注使用 colSpan=3 占满整行。
        </v-alert>
        <jh-pro-form
          v-bind="args"
          layout="vertical"
          label-position="top"
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
