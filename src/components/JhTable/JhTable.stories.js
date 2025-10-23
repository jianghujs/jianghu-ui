import JhTable from './JhTable.vue';

export default {
  title: 'Components/JhTable',
  component: JhTable,
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'boolean',
      description: '加载状态',
    },
    dense: {
      control: 'boolean',
      description: '紧凑模式',
    },
    showSelect: {
      control: 'boolean',
      description: '显示选择框',
    },
  },
};

// 示例数据
const sampleHeaders = [
  { text: 'ID', value: 'id', sortable: true },
  { text: '姓名', value: 'name', sortable: true },
  { text: '邮箱', value: 'email', sortable: true },
  { text: '角色', value: 'role', sortable: true },
  { text: '状态', value: 'status', sortable: true },
];

const sampleItems = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员', status: '活跃' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: '用户', status: '活跃' },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: '用户', status: '禁用' },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: '编辑', status: '活跃' },
  { id: 5, name: '孙七', email: 'sunqi@example.com', role: '用户', status: '活跃' },
];

// 默认故事
export const Default = {
  args: {
    headers: sampleHeaders,
    items: sampleItems,
  },
};

// 加载状态
export const Loading = {
  args: {
    headers: sampleHeaders,
    items: [],
    loading: true,
  },
};

// 紧凑模式
export const Dense = {
  args: {
    headers: sampleHeaders,
    items: sampleItems,
    dense: true,
  },
};

// 可选择行
export const WithSelection = {
  args: {
    headers: sampleHeaders,
    items: sampleItems,
    showSelect: true,
  },
};

// 空数据
export const EmptyState = {
  args: {
    headers: sampleHeaders,
    items: [],
  },
};

// 大量数据
export const LargeDataset = () => {
  const largeHeaders = [
    { text: 'ID', value: 'id' },
    { text: '姓名', value: 'name' },
    { text: '部门', value: 'department' },
    { text: '职位', value: 'position' },
    { text: '入职日期', value: 'joinDate' },
    { text: '薪资', value: 'salary' },
  ];

  const largeItems = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `员工${i + 1}`,
    department: ['技术部', '市场部', '人力资源部', '财务部'][i % 4],
    position: ['工程师', '经理', '主管', '专员'][i % 4],
    joinDate: `2023-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    salary: `¥${(Math.random() * 20000 + 10000).toFixed(0)}`,
  }));

  return {
    components: { JhTable },
    data: () => ({
      headers: largeHeaders,
      items: largeItems,
    }),
    template: `
      <jh-table
        :headers="headers"
        :items="items"
        :items-per-page="15"
      />
    `,
  };
};

// 自定义单元格
export const CustomCells = () => ({
  components: { JhTable },
  data: () => ({
    headers: sampleHeaders,
    items: sampleItems,
  }),
  template: `
    <jh-table
      :headers="headers"
      :items="items"
    >
      <template v-slot:item.status="{ item }">
        <v-chip
          :color="item.status === '活跃' ? 'success' : 'error'"
          small
          dark
        >
          {{ item.status }}
        </v-chip>
      </template>
      <template v-slot:item.role="{ item }">
        <v-chip
          :color="item.role === '管理员' ? 'primary' : 'secondary'"
          small
        >
          {{ item.role }}
        </v-chip>
      </template>
    </jh-table>
  `,
});
