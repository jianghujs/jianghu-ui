import JhAddressSelect from './JhAddressSelect.vue';
import { ref, watch } from 'vue';

export default {
  title: '表单/JhAddressSelect - 省市区选择',
  component: JhAddressSelect,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '省市区三级联动选择组件，支持自定义显示层级、标签文本和数据源。这是一个封装了多个 `v-select` 的便利组件，用于快速构建地址输入功能。',
      },
    },
  },
  argTypes: {
    value: {
      control: 'object',
      description: 'v-model 绑定值，包含 `province`, `city`, `district`',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{ province: null, city: null, district: null }' },
      },
    },
    level: {
      control: { type: 'select' },
      options: [1, 2, 3, 4],
      description: '显示层级：1-仅省份，2-省市，3-省市区，4-省市区镇',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '3' },
      },
    },
    outlined: {
      control: 'boolean',
      description: '是否使用 `outlined` 样式',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    dense: {
      control: 'boolean',
      description: '是否使用紧凑模式 `dense`',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    loading: {
      control: 'boolean',
      description: '是否显示加载状态',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    labels: {
      control: 'object',
      description: '自定义下拉框的标签文本',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: "{ province: '省份', city: '城市', district: '区/县' }" },
      },
    },
    data: {
      control: 'object',
      description: '省市区数据源，默认为内置数据',
      table: {
        type: { summary: 'array' },
      },
    },
    onChange: {
      action: 'changed',
      description: '值变化时触发的事件',
    }
  },
};

// 模拟的省市区数据
const defaultData = [
  { code: '110000', name: '北京市', children: [{ code: '110100', name: '市辖区', children: [{ code: '110101', name: '东城区', children: [{ code: '110101001', name: '东华门街道' }] }, { code: '110102', name: '西城区', children: [{ code: '110102001', name: '西长安街街道' }] }] }] },
  {
    code: '440000', name: '广东省',
    children: [
      { code: '440100', name: '广州市', children: [{ code: '440106', name: '天河区', children: [{ code: '440106001', name: '天河南街道' }] }, { code: '440103', name: '荔湾区', children: [{ code: '440103001', name: '金花街道' }] }] },
      { code: '440300', name: '深圳市', children: [{ code: '440305', name: '南山区', children: [{ code: '440305001', name: '南头街道' }] }, { code: '440304', name: '福田区', children: [{ code: '440304001', name: '园岭街道' }] }] }
    ]
  }
];

// 统一的渲染模板
const Template = (args) => ({
  components: { JhAddressSelect },
  setup() {
    const value = ref(args.value);
    watch(() => args.value, (newValue) => {
      value.value = newValue;
    }, { deep: true });

    return { args, value };
  },
  template: `
    <div style="background: rgb(240, 242, 245); padding: 30px; min-height: 350px;">
      <jh-address-select
        v-model="value"
        :level="args.level"
        :outlined="args.outlined"
        :dense="args.dense"
        :loading="args.loading"
        :labels="args.labels"
        :data="args.data"
        @change="args.onChange"
      />
      <div style="margin-top: 20px; background: white; padding: 16px; border-radius: 4px;">
        <strong>v-model value:</strong>
        <pre style="margin-top: 8px;">{{ value }}</pre>
      </div>
    </div>
  `,
});

const baseArgs = {
  value: { province: null, city: null, district: null, town: null },
  level: 3,
  outlined: true,
  dense: true,
  loading: false,
  labels: { province: '省份', city: '城市', district: '区/县', town: '乡镇' },
  data: defaultData,
};

// 故事导出
export const Default = Template.bind({});
Default.storyName = "基础用法";
Default.args = {
  ...baseArgs,
};
Default.parameters = {
  docs: {
    description: {
      story: '默认情况下，组件会渲染一个三级（省-市-区）地址选择器。',
    },
  },
};

export const WithInitialValue = Template.bind({});
WithInitialValue.storyName = "带初始值";
WithInitialValue.args = {
  ...baseArgs,
  value: { 
    province: { code: '440000', name: '广东省' }, 
    city: { code: '440300', name: '深圳市' }, 
    district: { code: '440305', name: '南山区' } 
  },
};
WithInitialValue.parameters = {
  docs: {
    description: {
      story: '设置 `v-model` 的初始值可以使组件在加载时就显示已选定的地址。返回值包含 `code` 和 `name` 两个字段。',
    },
  },
};

export const Level2CityOnly = Template.bind({});
Level2CityOnly.storyName = "二级联动 (省-市)";
Level2CityOnly.args = {
  ...baseArgs,
  level: 2,
};
Level2CityOnly.parameters = {
  docs: {
    description: {
      story: '通过设置 `level: 2`，可以将组件配置为只显示省和市两级选择。',
    },
  },
};

export const Level1ProvinceOnly = Template.bind({});
Level1ProvinceOnly.storyName = "一级联动 (仅省)";
Level1ProvinceOnly.args = {
  ...baseArgs,
  level: 1,
};
Level1ProvinceOnly.parameters = {
  docs: {
    description: {
      story: '通过设置 `level: 1`，可以将组件配置为只显示省份一级选择。',
    },
  },
};

export const DenseMode = Template.bind({});
DenseMode.storyName = "紧凑模式";
DenseMode.args = {
  ...baseArgs,
  dense: true,
};
DenseMode.parameters = {
  docs: {
    description: {
      story: '设置 `dense: true` 可以减小组件的垂直间距，适用于空间有限的场景。',
    },
  },
};

export const FilledStyle = Template.bind({});
FilledStyle.storyName = "填充样式";
FilledStyle.args = {
  ...baseArgs,
  outlined: true,
};
FilledStyle.parameters = {
  docs: {
    description: {
      story: '通过设置 `outlined: false`，可以切换到 `filled` 样式的输入框。',
    },
  },
};

export const LoadingState = Template.bind({});
LoadingState.storyName = "加载状态";
LoadingState.args = {
  ...baseArgs,
  loading: true,
};
LoadingState.parameters = {
  docs: {
    description: {
      story: '设置 `loading: true` 会禁用所有下拉框并显示加载指示器，适用于数据正在从后端异步加载的场景。',
    },
  },
};

export const CustomLabels = Template.bind({});
CustomLabels.storyName = "自定义标签";
CustomLabels.args = {
  ...baseArgs,
  labels: { province: '选择省', city: '选择市', district: '选择区', town: '选择乡镇' },
};
CustomLabels.parameters = {
  docs: {
    description: {
      story: '通过 `labels` 属性，可以自定义每个下拉框的标签文本，以适应不同的业务术语。',
    },
  },
};

export const Level4Full = Template.bind({});
Level4Full.storyName = "四级联动 (省-市-区-镇)";
Level4Full.args = {
  ...baseArgs,
  level: 4,
};
Level4Full.parameters = {
  docs: {
    description: {
      story: '通过设置 `level: 4`，可以将组件配置为显示省、市、区、镇四级选择，适用于需要精确到乡镇的场景。',
    },
  },
};

export const Level4WithInitialValue = Template.bind({});
Level4WithInitialValue.storyName = "四级联动 (带初始值)";
Level4WithInitialValue.args = {
  ...baseArgs,
  level: 4,
  value: { 
    province: { code: '440000', name: '广东省' }, 
    city: { code: '440300', name: '深圳市' }, 
    district: { code: '440305', name: '南山区' },
    town: { code: '440305001', name: '南头街道' }
  },
};
Level4WithInitialValue.parameters = {
  docs: {
    description: {
      story: '四级联动并设置初始值，展示完整的省市区镇选择功能。',
    },
  },
};

