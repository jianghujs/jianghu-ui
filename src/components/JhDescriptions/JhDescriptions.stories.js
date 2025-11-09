import JhDescriptions from './JhDescriptions.vue';

export default {
  title: '数据展示/JhDescriptions - 定义列表',
  component: JhDescriptions,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '描述列表标题',
    },
    layout: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: '布局方式',
    },
    column: {
      control: 'number',
      description: '列数',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'default'],
      description: '尺寸',
    },
    bordered: {
      control: 'boolean',
      description: '是否显示边框',
    },
    colon: {
      control: 'boolean',
      description: '是否显示冒号',
    },
    editable: {
      control: 'boolean',
      description: '是否可编辑',
    },
  },
};

// 基础用法
export const Basic = {
  render: (args) => ({
    components: { JhDescriptions },
    setup() {
      const columns = [
        {
          title: '用户名',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: '手机号',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: '邮箱',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: '地址',
          dataIndex: 'address',
          key: 'address',
          span: 2,
        },
        {
          title: '备注',
          dataIndex: 'remark',
          key: 'remark',
          span: 3,
        },
      ];

      const dataSource = {
        username: '张三',
        phone: '13800138000',
        email: 'zhangsan@example.com',
        address: '浙江省杭州市西湖区某某街道某某号',
        remark: '这是一段备注信息',
      };

      return { args, columns, dataSource };
    },
    template: `
      <jh-descriptions
        v-bind="args"
        :columns="columns"
        :data-source="dataSource"
      />
    `,
  }),
  args: {
    title: '用户信息',
    column: 3,
    bordered: true,
  },
};

// 垂直布局
export const VerticalLayout = {
  render: (args) => ({
    components: { JhDescriptions },
    setup() {
      const columns = [
        {
          title: '产品名称',
          dataIndex: 'productName',
          key: 'productName',
        },
        {
          title: '产品价格',
          dataIndex: 'price',
          key: 'price',
          valueType: 'money',
        },
        {
          title: '库存数量',
          dataIndex: 'stock',
          key: 'stock',
          valueType: 'digit',
        },
        {
          title: '产品状态',
          dataIndex: 'status',
          key: 'status',
          valueType: 'option',
          valueEnum: {
            online: '在线',
            offline: '离线',
            pending: '待审核',
          },
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
          valueType: 'dateTime',
        },
        {
          title: '产品描述',
          dataIndex: 'description',
          key: 'description',
        },
      ];

      const dataSource = {
        productName: 'iPhone 15 Pro',
        price: 7999,
        stock: 1234,
        status: 'online',
        createTime: '2024-01-15 10:30:00',
        description: '这是一款高端智能手机，配备最新的A17芯片和钛金属边框。',
      };

      return { args, columns, dataSource };
    },
    template: `
      <jh-descriptions
        v-bind="args"
        :columns="columns"
        :data-source="dataSource"
      />
    `,
  }),
  args: {
    title: '产品详情',
    layout: 'vertical',
    column: 3,
    bordered: true,
  },
};

// 可编辑
export const Editable = {
  render: (args) => ({
    components: { JhDescriptions },
    setup() {
      const columns = [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
          editable: true,
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age',
          valueType: 'digit',
          editable: true,
        },
        {
          title: '性别',
          dataIndex: 'gender',
          key: 'gender',
          valueType: 'select',
          editable: true,
          valueEnum: {
            male: '男',
            female: '女',
          },
        },
        {
          title: '出生日期',
          dataIndex: 'birthday',
          key: 'birthday',
          valueType: 'date',
          editable: true,
        },
        {
          title: '手机号',
          dataIndex: 'phone',
          key: 'phone',
          editable: true,
        },
        {
          title: '邮箱',
          dataIndex: 'email',
          key: 'email',
          editable: true,
        },
        {
          title: '个人简介',
          dataIndex: 'bio',
          key: 'bio',
          valueType: 'textarea',
          editable: true,
          span: 3,
        },
      ];

      const dataSource = {
        name: '李四',
        age: 28,
        gender: 'male',
        birthday: '1996-05-20',
        phone: '13900139000',
        email: 'lisi@example.com',
        bio: '热爱编程，喜欢开源技术。',
      };

      const handleSave = (data) => {
        console.log('保存数据:', data);
        alert('保存成功！');
      };

      return { args, columns, dataSource, handleSave };
    },
    template: `
      <jh-descriptions
        v-bind="args"
        :columns="columns"
        :data-source="dataSource"
        @save="handleSave"
      />
    `,
  }),
  args: {
    title: '个人信息',
    column: 3,
    bordered: true,
    editable: true,
  },
};

// 不同的 ValueType
export const ValueTypes = {
  render: (args) => ({
    components: { JhDescriptions },
    setup() {
      const columns = [
        {
          title: '文本',
          dataIndex: 'text',
          key: 'text',
          valueType: 'text',
        },
        {
          title: '金额',
          dataIndex: 'money',
          key: 'money',
          valueType: 'money',
        },
        {
          title: '百分比',
          dataIndex: 'percent',
          key: 'percent',
          valueType: 'percent',
        },
        {
          title: '数字',
          dataIndex: 'digit',
          key: 'digit',
          valueType: 'digit',
        },
        {
          title: '日期',
          dataIndex: 'date',
          key: 'date',
          valueType: 'date',
        },
        {
          title: '日期时间',
          dataIndex: 'dateTime',
          key: 'dateTime',
          valueType: 'dateTime',
        },
        {
          title: '时间',
          dataIndex: 'time',
          key: 'time',
          valueType: 'time',
        },
        {
          title: '选项',
          dataIndex: 'option',
          key: 'option',
          valueType: 'option',
          valueEnum: {
            success: '成功',
            error: '失败',
            warning: '警告',
          },
        },
      ];

      const dataSource = {
        text: '这是一段文本',
        money: 12345.67,
        percent: 85,
        digit: 1234567,
        date: '2024-01-15',
        dateTime: '2024-01-15 14:30:00',
        time: '14:30:00',
        option: 'success',
      };

      return { args, columns, dataSource };
    },
    template: `
      <jh-descriptions
        v-bind="args"
        :columns="columns"
        :data-source="dataSource"
      />
    `,
  }),
  args: {
    title: 'ValueType 示例',
    column: 2,
    bordered: true,
  },
};

// 自定义渲染
export const CustomRender = {
  render: (args) => ({
    components: { JhDescriptions },
    setup() {
      const columns = [
        {
          title: '用户名',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          render: (value) => {
            const statusMap = {
              active: '<span style="color: #52c41a;">● 活跃</span>',
              inactive: '<span style="color: #ff4d4f;">● 未激活</span>',
              pending: '<span style="color: #faad14;">● 待审核</span>',
            };
            return statusMap[value] || value;
          },
        },
        {
          title: '等级',
          dataIndex: 'level',
          key: 'level',
          render: (value) => {
            const stars = '★'.repeat(value) + '☆'.repeat(5 - value);
            return `<span style="color: #faad14;">${stars}</span>`;
          },
        },
        {
          title: '进度',
          dataIndex: 'progress',
          key: 'progress',
          render: (value) => {
            const color = value >= 80 ? '#52c41a' : value >= 50 ? '#faad14' : '#ff4d4f';
            return `
              <div style="display: flex; align-items: center; gap: 8px;">
                <div style="flex: 1; height: 8px; background: #f0f0f0; border-radius: 4px; overflow: hidden;">
                  <div style="width: ${value}%; height: 100%; background: ${color}; transition: width 0.3s;"></div>
                </div>
                <span>${value}%</span>
              </div>
            `;
          },
          span: 2,
        },
      ];

      const dataSource = {
        username: '王五',
        status: 'active',
        level: 4,
        progress: 75,
      };

      return { args, columns, dataSource };
    },
    template: `
      <jh-descriptions
        v-bind="args"
        :columns="columns"
        :data-source="dataSource"
      />
    `,
  }),
  args: {
    title: '自定义渲染',
    column: 2,
    bordered: true,
  },
};

// 可复制
export const Copyable = {
  render: (args) => ({
    components: { JhDescriptions },
    setup() {
      const columns = [
        {
          title: 'API Key',
          dataIndex: 'apiKey',
          key: 'apiKey',
          copyable: true,
        },
        {
          title: 'Secret Key',
          dataIndex: 'secretKey',
          key: 'secretKey',
          copyable: true,
        },
        {
          title: '访问令牌',
          dataIndex: 'token',
          key: 'token',
          copyable: true,
          span: 2,
        },
        {
          title: 'Webhook URL',
          dataIndex: 'webhookUrl',
          key: 'webhookUrl',
          copyable: true,
          span: 3,
        },
      ];

      const dataSource = {
        apiKey: 'sk_test_1234567890abcdef',
        secretKey: 'sk_live_abcdef1234567890',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ',
        webhookUrl: 'https://api.example.com/webhook/callback',
      };

      const handleCopy = ({ text }) => {
        console.log('已复制:', text);
      };

      return { args, columns, dataSource, handleCopy };
    },
    template: `
      <jh-descriptions
        v-bind="args"
        :columns="columns"
        :data-source="dataSource"
        @copy="handleCopy"
      />
    `,
  }),
  args: {
    title: 'API 配置',
    tooltip: '点击复制按钮可以复制内容到剪贴板',
    column: 3,
    bordered: true,
  },
};

// 响应式列数
export const ResponsiveColumns = {
  render: (args) => ({
    components: { JhDescriptions },
    setup() {
      const columns = [
        {
          title: '订单号',
          dataIndex: 'orderNo',
          key: 'orderNo',
        },
        {
          title: '订单状态',
          dataIndex: 'status',
          key: 'status',
          valueType: 'option',
          valueEnum: {
            pending: '待支付',
            paid: '已支付',
            shipped: '已发货',
            completed: '已完成',
          },
        },
        {
          title: '订单金额',
          dataIndex: 'amount',
          key: 'amount',
          valueType: 'money',
        },
        {
          title: '下单时间',
          dataIndex: 'createTime',
          key: 'createTime',
          valueType: 'dateTime',
        },
        {
          title: '收货地址',
          dataIndex: 'address',
          key: 'address',
          span: 2,
        },
        {
          title: '订单备注',
          dataIndex: 'remark',
          key: 'remark',
          span: 3,
        },
      ];

      const dataSource = {
        orderNo: 'ORD20240115001',
        status: 'paid',
        amount: 299.99,
        createTime: '2024-01-15 10:30:00',
        address: '浙江省杭州市西湖区某某街道某某号',
        remark: '请尽快发货，谢谢！',
      };

      return { args, columns, dataSource };
    },
    template: `
      <jh-descriptions
        v-bind="args"
        :columns="columns"
        :data-source="dataSource"
      />
    `,
  }),
  args: {
    title: '订单详情',
    column: {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 3,
      xl: 3,
      xxl: 4,
    },
    bordered: true,
  },
};

// 小尺寸
export const SmallSize = {
  render: (args) => ({
    components: { JhDescriptions },
    setup() {
      const columns = [
        {
          title: '名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '类型',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: '大小',
          dataIndex: 'size',
          key: 'size',
        },
        {
          title: '修改时间',
          dataIndex: 'modifyTime',
          key: 'modifyTime',
          valueType: 'dateTime',
        },
      ];

      const dataSource = {
        name: 'document.pdf',
        type: 'PDF 文档',
        size: '2.5 MB',
        modifyTime: '2024-01-15 14:30:00',
      };

      return { args, columns, dataSource };
    },
    template: `
      <jh-descriptions
        v-bind="args"
        :columns="columns"
        :data-source="dataSource"
      />
    `,
  }),
  args: {
    title: '文件信息',
    column: 2,
    size: 'small',
    bordered: true,
  },
};

// 使用 Request 加载数据
export const WithRequest = {
  render: (args) => ({
    components: { JhDescriptions },
    setup() {
      const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: '标题',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: '作者',
          dataIndex: 'author',
          key: 'author',
        },
        {
          title: '发布时间',
          dataIndex: 'publishTime',
          key: 'publishTime',
          valueType: 'dateTime',
        },
        {
          title: '阅读量',
          dataIndex: 'views',
          key: 'views',
          valueType: 'digit',
        },
        {
          title: '点赞数',
          dataIndex: 'likes',
          key: 'likes',
          valueType: 'digit',
        },
        {
          title: '摘要',
          dataIndex: 'summary',
          key: 'summary',
          span: 3,
        },
      ];

      const request = async (params) => {
        // 模拟 API 请求
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              id: params.id || 1,
              title: '如何使用 JhDescriptions 组件',
              author: '张三',
              publishTime: '2024-01-15 10:00:00',
              views: 12345,
              likes: 567,
              summary: '这是一篇关于如何使用 JhDescriptions 组件的详细教程，包含了各种使用场景和示例代码。',
            });
          }, 1000);
        });
      };

      return { args, columns, request };
    },
    template: `
      <jh-descriptions
        v-bind="args"
        :columns="columns"
        :request="request"
        :params="{ id: 1 }"
      />
    `,
  }),
  args: {
    title: '文章详情',
    column: 3,
    bordered: true,
  },
};

// 自定义插槽
export const CustomSlots = {
  render: (args) => ({
    components: { JhDescriptions },
    setup() {
      const columns = [
        {
          title: '用户头像',
          dataIndex: 'avatar',
          key: 'avatar',
        },
        {
          title: '用户名',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: '会员等级',
          dataIndex: 'vipLevel',
          key: 'vipLevel',
        },
        {
          title: '标签',
          dataIndex: 'tags',
          key: 'tags',
          span: 2,
        },
      ];

      const dataSource = {
        avatar: 'https://i.pravatar.cc/150?img=1',
        username: '赵六',
        vipLevel: 3,
        tags: ['前端开发', 'Vue.js', 'React'],
      };

      return { args, columns, dataSource };
    },
    template: `
      <jh-descriptions
        v-bind="args"
        :columns="columns"
        :data-source="dataSource"
      >
        <template #item-avatar="{ value }">
          <img :src="value" alt="avatar" style="width: 48px; height: 48px; border-radius: 50%;" />
        </template>
        
        <template #item-vipLevel="{ value }">
          <span style="display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; font-size: 12px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
            VIP {{ value }}
          </span>
        </template>
        
        <template #item-tags="{ value }">
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <span
              v-for="tag in value"
              :key="tag"
              style="padding: 2px 8px; background: #f0f0f0; border-radius: 4px; font-size: 12px;"
            >
              {{ tag }}
            </span>
          </div>
        </template>
      </jh-descriptions>
    `,
  }),
  args: {
    title: '用户资料',
    column: 2,
    bordered: true,
  },
};

// 无边框
export const NoBorder = {
  render: (args) => ({
    components: { JhDescriptions },
    setup() {
      const columns = [
        {
          title: '项目名称',
          dataIndex: 'projectName',
          key: 'projectName',
        },
        {
          title: '负责人',
          dataIndex: 'owner',
          key: 'owner',
        },
        {
          title: '项目状态',
          dataIndex: 'status',
          key: 'status',
          valueType: 'option',
          valueEnum: {
            planning: '规划中',
            developing: '开发中',
            testing: '测试中',
            online: '已上线',
          },
        },
        {
          title: '开始时间',
          dataIndex: 'startTime',
          key: 'startTime',
          valueType: 'date',
        },
        {
          title: '项目描述',
          dataIndex: 'description',
          key: 'description',
          span: 2,
        },
      ];

      const dataSource = {
        projectName: 'JiangHu UI',
        owner: '开发团队',
        status: 'developing',
        startTime: '2024-01-01',
        description: '一个基于 Vue 和 Vuetify 的企业级 UI 组件库',
      };

      return { args, columns, dataSource };
    },
    template: `
      <jh-descriptions
        v-bind="args"
        :columns="columns"
        :data-source="dataSource"
      />
    `,
  }),
  args: {
    title: '项目信息',
    column: 2,
    bordered: false,
  },
};
