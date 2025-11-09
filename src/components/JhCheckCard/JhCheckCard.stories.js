import JhCheckCard from './JhCheckCard.vue';

export default {
  title: '数据录入/JhCheckCard - 多选卡片',
  component: JhCheckCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '多选卡片组件，参考 Ant Design ProComponents CheckCard 设计规范。支持单选、多选、不同尺寸、自定义内容等功能。',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: '卡片标题',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    description: {
      control: 'text',
      description: '卡片描述',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    cover: {
      control: 'text',
      description: '卡片封面图片URL',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    extra: {
      control: 'text',
      description: '右下角额外内容',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    value: {
      control: 'text',
      description: '卡片值，用于多选时的标识',
      table: {
        type: { summary: 'string | number | boolean' },
        defaultValue: { summary: 'null' },
      },
    },
    checked: {
      control: 'boolean',
      description: '是否选中',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    defaultChecked: {
      control: 'boolean',
      description: '默认选中状态',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: '是否加载中',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'default', 'large'],
      description: '卡片尺寸',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    bordered: {
      control: 'boolean',
      description: '是否显示边框',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    hideCheckbox: {
      control: 'boolean',
      description: '是否隐藏选择框',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    checkboxPosition: {
      control: { type: 'select' },
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      description: '选择框位置',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'top-right' },
      },
    },
    hoverable: {
      control: 'boolean',
      description: '是否可悬浮',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    width: {
      control: 'text',
      description: '卡片宽度',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: '' },
      },
    },
    height: {
      control: 'text',
      description: '卡片高度',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: '' },
      },
    },
  },
};

// 基础用法
export const Basic = {
  render: (args) => ({
    components: { JhCheckCard },
    setup() {
      return { args };
    },
    template: `
      <div style="background: rgb(240, 242, 245); padding: 20px;">
        <jh-check-card
          v-bind="args"
          title="基础卡片"
          description="这是一个基础的多选卡片"
          style="width: 200px;"
        >
          <div>卡片内容</div>
        </jh-check-card>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '基础的多选卡片，包含标题、描述和内容。',
      },
    },
  },
};

// 不同尺寸
export const Sizes = {
  render: () => ({
    components: { JhCheckCard },
    template: `
      <div style="background: rgb(240, 242, 245); padding: 20px;">
        <div style="display: flex; gap: 16px; align-items: flex-start;">
          <jh-check-card
            title="小尺寸"
            description="Small size card"
            size="small"
            style="width: 150px;"
          >
            <div>小卡片</div>
          </jh-check-card>
          
          <jh-check-card
            title="默认尺寸"
            description="Default size card"
            size="default"
            style="width: 200px;"
          >
            <div>默认卡片</div>
          </jh-check-card>
          
          <jh-check-card
            title="大尺寸"
            description="Large size card"
            size="large"
            style="width: 250px;"
          >
            <div>大卡片</div>
          </jh-check-card>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '不同尺寸的卡片：小、默认、大。',
      },
    },
  },
};

// 选择框位置
export const CheckboxPositions = {
  render: () => ({
    components: { JhCheckCard },
    template: `
      <div style="background: rgb(240, 242, 245); padding: 20px;">
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; max-width: 500px;">
          <jh-check-card
            title="左上角"
            description="Top Left"
            checkbox-position="top-left"
            :checked="true"
            style="width: 200px;"
          >
            <div>选择框在左上角</div>
          </jh-check-card>
          
          <jh-check-card
            title="右上角"
            description="Top Right"
            checkbox-position="top-right"
            :checked="true"
            style="width: 200px;"
          >
            <div>选择框在右上角</div>
          </jh-check-card>
          
          <jh-check-card
            title="左下角"
            description="Bottom Left"
            checkbox-position="bottom-left"
            :checked="true"
            style="width: 200px;"
          >
            <div>选择框在左下角</div>
          </jh-check-card>
          
          <jh-check-card
            title="右下角"
            description="Bottom Right"
            checkbox-position="bottom-right"
            :checked="true"
            style="width: 200px;"
          >
            <div>选择框在右下角</div>
          </jh-check-card>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '选择框可以放置在卡片的四个角落。',
      },
    },
  },
};

// 带封面图片
export const WithCover = {
  render: () => ({
    components: { JhCheckCard },
    template: `
      <div style="background: rgb(240, 242, 245); padding: 20px;">
        <div style="display: flex; gap: 16px;">
          <jh-check-card
            title="产品A"
            description="高质量产品"
            cover="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            extra="￥299"
            style="width: 200px;"
          >
            <div>产品详细信息</div>
          </jh-check-card>
          
          <jh-check-card
            title="产品B"
            description="性价比之选"
            cover="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
            extra="￥199"
            :checked="true"
            style="width: 200px;"
          >
            <div>产品详细信息</div>
          </jh-check-card>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '带封面图片的卡片，适合商品展示。',
      },
    },
  },
};

// 多选组合
export const MultipleSelection = {
  render: () => ({
    components: { JhCheckCard },
    data() {
      return {
        selectedValues: ['option1', 'option3'],
        options: [
          { value: 'option1', title: '选项一', description: '这是第一个选项' },
          { value: 'option2', title: '选项二', description: '这是第二个选项' },
          { value: 'option3', title: '选项三', description: '这是第三个选项' },
          { value: 'option4', title: '选项四', description: '这是第四个选项' },
        ],
      };
    },
    methods: {
      handleChange(checked, value) {
        if (checked) {
          if (!this.selectedValues.includes(value)) {
            this.selectedValues.push(value);
          }
        } else {
          const index = this.selectedValues.indexOf(value);
          if (index > -1) {
            this.selectedValues.splice(index, 1);
          }
        }
      },
    },
    template: `
      <div style="background: rgb(240, 242, 245); padding: 20px;">
        <div style="margin-bottom: 16px;">
          <strong>已选择：</strong>{{ selectedValues.join(', ') || '无' }}
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; max-width: 500px;">
          <jh-check-card
            v-for="option in options"
            :key="option.value"
            :title="option.title"
            :description="option.description"
            :value="option.value"
            :checked="selectedValues.includes(option.value)"
            @change="handleChange"
            style="width: 200px;"
          >
            <div>{{ option.description }}</div>
          </jh-check-card>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '多选卡片组合，支持选择多个选项。',
      },
    },
  },
};

// 单选组合
export const SingleSelection = {
  render: () => ({
    components: { JhCheckCard },
    data() {
      return {
        selectedValue: 'plan2',
        plans: [
          { value: 'plan1', title: '基础版', description: '适合个人用户', price: '免费' },
          { value: 'plan2', title: '专业版', description: '适合小团队', price: '￥99/月' },
          { value: 'plan3', title: '企业版', description: '适合大企业', price: '￥299/月' },
        ],
      };
    },
    methods: {
      handleChange(checked, value) {
        if (checked) {
          this.selectedValue = value;
        }
      },
    },
    template: `
      <div style="background: rgb(240, 242, 245); padding: 20px;">
        <div style="margin-bottom: 16px;">
          <strong>已选择套餐：</strong>{{ selectedValue }}
        </div>
        
        <div style="display: flex; gap: 16px;">
          <jh-check-card
            v-for="plan in plans"
            :key="plan.value"
            :title="plan.title"
            :description="plan.description"
            :value="plan.value"
            :checked="selectedValue === plan.value"
            :extra="plan.price"
            @change="handleChange"
            style="width: 200px;"
          >
            <div style="text-align: center; padding: 20px;">
              <div style="font-size: 24px; font-weight: bold; color: #1890ff;">
                {{ plan.price }}
              </div>
            </div>
          </jh-check-card>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '单选卡片组合，类似单选按钮组。',
      },
    },
  },
};

// 禁用状态
export const Disabled = {
  render: () => ({
    components: { JhCheckCard },
    template: `
      <div style="background: rgb(240, 242, 245); padding: 20px;">
        <div style="display: flex; gap: 16px;">
          <jh-check-card
            title="正常状态"
            description="可以正常选择"
            style="width: 200px;"
          >
            <div>正常卡片</div>
          </jh-check-card>
          
          <jh-check-card
            title="禁用状态"
            description="无法选择"
            :disabled="true"
            style="width: 200px;"
          >
            <div>禁用卡片</div>
          </jh-check-card>
          
          <jh-check-card
            title="禁用选中"
            description="禁用且选中"
            :disabled="true"
            :checked="true"
            style="width: 200px;"
          >
            <div>禁用选中卡片</div>
          </jh-check-card>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '禁用状态的卡片无法进行选择操作。',
      },
    },
  },
};

// 加载状态
export const Loading = {
  render: () => ({
    components: { JhCheckCard },
    template: `
      <div style="background: rgb(240, 242, 245); padding: 20px;">
        <div style="display: flex; gap: 16px;">
          <jh-check-card
            title="正常状态"
            description="正常显示"
            style="width: 200px;"
          >
            <div>正常内容</div>
          </jh-check-card>
          
          <jh-check-card
            title="加载中"
            description="数据加载中"
            :loading="true"
            style="width: 200px;"
          >
            <div>加载中的内容</div>
          </jh-check-card>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '加载状态显示加载指示器。',
      },
    },
  },
};

// 隐藏选择框
export const HideCheckbox = {
  render: () => ({
    components: { JhCheckCard },
    data() {
      return {
        selectedCard: 'card2',
      };
    },
    methods: {
      handleSelect(value) {
        this.selectedCard = value;
      },
    },
    template: `
      <div style="background: rgb(240, 242, 245); padding: 20px;">
        <div style="margin-bottom: 16px;">
          <strong>选中卡片：</strong>{{ selectedCard }}
        </div>
        
        <div style="display: flex; gap: 16px;">
          <jh-check-card
            title="卡片1"
            description="隐藏选择框"
            value="card1"
            :checked="selectedCard === 'card1'"
            :hide-checkbox="true"
            @click="handleSelect('card1')"
            style="width: 200px;"
          >
            <div>点击整个卡片选择</div>
          </jh-check-card>
          
          <jh-check-card
            title="卡片2"
            description="隐藏选择框"
            value="card2"
            :checked="selectedCard === 'card2'"
            :hide-checkbox="true"
            @click="handleSelect('card2')"
            style="width: 200px;"
          >
            <div>点击整个卡片选择</div>
          </jh-check-card>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '隐藏选择框，通过卡片边框和背景色显示选中状态。',
      },
    },
  },
};

// 自定义内容
export const CustomContent = {
  render: () => ({
    components: { JhCheckCard },
    data() {
      return {
        selectedFeatures: ['feature1'],
      };
    },
    methods: {
      handleFeatureChange(checked, value) {
        if (checked) {
          if (!this.selectedFeatures.includes(value)) {
            this.selectedFeatures.push(value);
          }
        } else {
          const index = this.selectedFeatures.indexOf(value);
          if (index > -1) {
            this.selectedFeatures.splice(index, 1);
          }
        }
      },
    },
    template: `
      <div style="background: rgb(240, 242, 245); padding: 20px;">
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 800px;">
          <jh-check-card
            value="feature1"
            :checked="selectedFeatures.includes('feature1')"
            @change="handleFeatureChange"
            style="width: 240px;"
          >
            <template #title>
              <div style="display: flex; align-items: center;">
                <v-icon color="primary" class="mr-2">mdi-rocket</v-icon>
                高性能
              </div>
            </template>
            <template #description>
              <div style="color: #52c41a;">99.9% 可用性保证</div>
            </template>
            <div style="text-align: center; padding: 20px;">
              <div style="font-size: 32px; margin-bottom: 8px;">⚡</div>
              <div>闪电般的速度体验</div>
            </div>
          </jh-check-card>
          
          <jh-check-card
            value="feature2"
            :checked="selectedFeatures.includes('feature2')"
            @change="handleFeatureChange"
            style="width: 240px;"
          >
            <template #title>
              <div style="display: flex; align-items: center;">
                <v-icon color="success" class="mr-2">mdi-shield-check</v-icon>
                安全可靠
              </div>
            </template>
            <template #description>
              <div style="color: #1890ff;">企业级安全保障</div>
            </template>
            <div style="text-align: center; padding: 20px;">
              <div style="font-size: 32px; margin-bottom: 8px;">🔒</div>
              <div>数据加密传输</div>
            </div>
          </jh-check-card>
          
          <jh-check-card
            value="feature3"
            :checked="selectedFeatures.includes('feature3')"
            @change="handleFeatureChange"
            style="width: 240px;"
          >
            <template #title>
              <div style="display: flex; align-items: center;">
                <v-icon color="warning" class="mr-2">mdi-account-group</v-icon>
                团队协作
              </div>
            </template>
            <template #description>
              <div style="color: #faad14;">支持多人协作</div>
            </template>
            <div style="text-align: center; padding: 20px;">
              <div style="font-size: 32px; margin-bottom: 8px;">👥</div>
              <div>实时协作编辑</div>
            </div>
          </jh-check-card>
        </div>
        
        <div style="margin-top: 20px; padding: 16px; background: white; border-radius: 4px;">
          <strong>已选择功能：</strong>
          {{ selectedFeatures.length > 0 ? selectedFeatures.join(', ') : '无' }}
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '使用插槽自定义卡片内容，支持图标、颜色等个性化设计。',
      },
    },
  },
};

// 响应式布局
export const ResponsiveLayout = {
  render: () => ({
    components: { JhCheckCard },
    data() {
      return {
        selectedOptions: [],
        options: Array.from({ length: 8 }, (_, i) => ({
          value: `option${i + 1}`,
          title: `选项 ${i + 1}`,
          description: `这是第 ${i + 1} 个选项的描述`,
        })),
      };
    },
    methods: {
      handleChange(checked, value) {
        if (checked) {
          if (!this.selectedOptions.includes(value)) {
            this.selectedOptions.push(value);
          }
        } else {
          const index = this.selectedOptions.indexOf(value);
          if (index > -1) {
            this.selectedOptions.splice(index, 1);
          }
        }
      },
    },
    template: `
      <div style="background: rgb(240, 242, 245); padding: 20px;">
        <div style="margin-bottom: 16px;">
          <strong>已选择 {{ selectedOptions.length }} 项：</strong>
          {{ selectedOptions.join(', ') || '无' }}
        </div>
        
        <div style="
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
        ">
          <jh-check-card
            v-for="option in options"
            :key="option.value"
            :title="option.title"
            :description="option.description"
            :value="option.value"
            :checked="selectedOptions.includes(option.value)"
            @change="handleChange"
          >
            <div style="text-align: center; padding: 16px;">
              <v-icon size="32" color="primary">mdi-check-circle</v-icon>
            </div>
          </jh-check-card>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '响应式网格布局，自适应不同屏幕尺寸。',
      },
    },
  },
};
