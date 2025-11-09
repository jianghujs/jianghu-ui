import JhWaterMark from './JhWaterMark.vue';

export default {
  title: '布局/JhWaterMark - 水印',
  component: JhWaterMark,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '水印组件，参考 Ant Design WaterMark 设计规范。给页面的某个区域加上水印，适用于防止信息盗用。',
      },
    },
  },
  argTypes: {
    content: {
      control: 'text',
      description: '水印文字内容，支持字符串数组实现多行文本',
      table: {
        type: { summary: 'string | string[]' },
        defaultValue: { summary: '' },
      },
    },
    image: {
      control: 'text',
      description: '图片源，建议导出 2 倍或 3 倍图，优先级高于文字',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    width: {
      control: 'number',
      description: '水印整体宽度',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '120' },
      },
    },
    height: {
      control: 'number',
      description: '水印整体高度',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '64' },
      },
    },
    rotate: {
      control: 'number',
      description: '水印旋转角度',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '-22' },
      },
    },
    gapX: {
      control: 'number',
      description: '水印之间的水平间距',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '212' },
      },
    },
    gapY: {
      control: 'number',
      description: '水印之间的垂直间距',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '222' },
      },
    },
    offsetX: {
      control: 'number',
      description: '水印在 canvas 画布上绘制的水平偏移量，正常情况下，水印绘制在中间位置，即 offsetX = gapX / 2',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 'gapX / 2' },
      },
    },
    offsetY: {
      control: 'number',
      description: '水印在 canvas 画布上绘制的垂直偏移量，正常情况下，水印绘制在中间位置，即 offsetY = gapY / 2',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 'gapY / 2' },
      },
    },
    font: {
      control: 'object',
      description: '字体配置',
      table: {
        type: { summary: 'object' },
        defaultValue: { 
          summary: `{
  color: 'rgba(0, 0, 0, 0.15)',
  fontSize: 16,
  fontWeight: 'normal',
  fontFamily: 'sans-serif',
  fontStyle: 'normal',
  textAlign: 'center'
}` 
        },
      },
    },
    zIndex: {
      control: 'number',
      description: '水印层的 z-index',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '9' },
      },
    },
  },
};

// 基础用法
export const Basic = {
  render: (args) => ({
    components: { JhWaterMark },
    setup() {
      return { args };
    },
    template: `
      <div style="height: 400px;">
        <jh-water-mark v-bind="args" content="江湖 JiangHu">
          <div style="padding: 40px; height: 100%;">
            <h3>基础水印</h3>
            <p>最简单的用法，为页面添加文字水印。</p>
            <p>水印会自动平铺在容器内，并且会防止被删除或修改。</p>
          </div>
        </jh-water-mark>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '最简单的用法，为页面添加文字水印。',
      },
    },
  },
};

// 多行文本水印
export const MultiLine = {
  render: () => ({
    components: { JhWaterMark },
    data() {
      return {
        content: ['江湖 JiangHu', 'Watermark Demo'],
      };
    },
    template: `
      <div style="height: 400px;">
        <jh-water-mark :content="content">
          <div style="padding: 40px; height: 100%;">
            <h3>多行文本水印</h3>
            <p>通过设置 content 为字符串数组，可以实现多行文本水印。</p>
            <p>每个数组元素会显示为一行。</p>
          </div>
        </jh-water-mark>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '通过设置 content 为字符串数组，可以实现多行文本水印。',
      },
    },
  },
};

// 图片水印
export const ImageWatermark = {
  render: () => ({
    components: { JhWaterMark },
    template: `
      <div style="height: 400px;">
        <jh-water-mark
          :width="130"
          :height="30"
          image="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*lkAoRbywo0oAAAAAAAAAAAAADrJ8AQ/original"
        >
          <div style="padding: 40px; height: 100%;">
            <h3>图片水印</h3>
            <p>通过 image 属性设置图片水印。</p>
            <p>图片水印的优先级高于文字水印。</p>
            <p>建议使用 2 倍或 3 倍图以保证清晰度。</p>
          </div>
        </jh-water-mark>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '通过 image 属性设置图片水印，优先级高于文字水印。',
      },
    },
  },
};

// 自定义配置
export const CustomConfig = {
  render: () => ({
    components: { JhWaterMark },
    data() {
      return {
        font: {
          color: 'rgba(0, 0, 0, 0.25)',
          fontSize: 20,
          fontWeight: 'bold',
        },
      };
    },
    template: `
      <div style="height: 400px;">
        <jh-water-mark
          content="江湖 JiangHu"
          :width="150"
          :height="80"
          :rotate="-30"
          :gap-x="100"
          :gap-y="100"
          :font="font"
        >
          <div style="padding: 40px; height: 100%;">
            <h3>自定义配置</h3>
            <p>可以自定义水印的宽度、高度、旋转角度、间距等。</p>
            <p>也可以通过 font 属性自定义字体样式。</p>
          </div>
        </jh-water-mark>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '自定义水印的各种配置参数，包括尺寸、旋转角度、间距和字体样式。',
      },
    },
  },
};

// 自定义间距
export const CustomGap = {
  render: () => ({
    components: { JhWaterMark },
    template: `
      <div style="height: 400px;">
        <jh-water-mark
          content="江湖"
          :gap-x="30"
          :gap-y="30"
        >
          <div style="padding: 40px; height: 100%;">
            <h3>自定义间距</h3>
            <p>通过 gapX 和 gapY 属性可以调整水印之间的间距。</p>
            <p>较小的间距会让水印更密集。</p>
          </div>
        </jh-water-mark>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '通过 gapX 和 gapY 调整水印之间的水平和垂直间距。',
      },
    },
  },
};

// 自定义偏移量
export const CustomOffset = {
  render: () => ({
    components: { JhWaterMark },
    template: `
      <div style="height: 400px;">
        <jh-water-mark
          content="江湖 JiangHu"
          :offset-x="50"
          :offset-y="50"
        >
          <div style="padding: 40px; height: 100%;">
            <h3>自定义偏移量</h3>
            <p>通过 offsetX 和 offsetY 可以调整水印的起始位置。</p>
            <p>默认情况下，水印会从容器中心开始绘制。</p>
          </div>
        </jh-water-mark>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '通过 offsetX 和 offsetY 调整水印的起始绘制位置。',
      },
    },
  },
};

// 自定义旋转角度
export const CustomRotate = {
  render: () => ({
    components: { JhWaterMark },
    template: `
      <div style="height: 400px;">
        <jh-water-mark
          content="江湖 JiangHu"
          :rotate="0"
        >
          <div style="padding: 40px; height: 100%;">
            <h3>自定义旋转角度</h3>
            <p>通过 rotate 属性可以调整水印的旋转角度。</p>
            <p>此示例设置为 0 度，水印不旋转。</p>
          </div>
        </jh-water-mark>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '通过 rotate 属性调整水印的旋转角度，默认为 -22 度。',
      },
    },
  },
};

// 自定义字体颜色
export const CustomColor = {
  render: () => ({
    components: { JhWaterMark },
    data() {
      return {
        font: {
          color: 'rgba(255, 0, 0, 0.2)',
        },
      };
    },
    template: `
      <div style="height: 400px;">
        <jh-water-mark
          content="江湖 JiangHu"
          :font="font"
        >
          <div style="padding: 40px; height: 100%;">
            <h3>自定义字体颜色</h3>
            <p>通过 font.color 属性可以自定义水印的颜色。</p>
            <p>建议使用半透明颜色，避免影响内容阅读。</p>
          </div>
        </jh-water-mark>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '通过 font.color 自定义水印文字颜色。',
      },
    },
  },
};

// 自定义字体大小
export const CustomFontSize = {
  render: () => ({
    components: { JhWaterMark },
    data() {
      return {
        font: {
          fontSize: 24,
          fontWeight: 'bold',
        },
      };
    },
    template: `
      <div style="height: 400px;">
        <jh-water-mark
          content="江湖"
          :font="font"
          :width="180"
          :height="100"
        >
          <div style="padding: 40px; height: 100%;">
            <h3>自定义字体大小</h3>
            <p>通过 font.fontSize 和 font.fontWeight 可以调整字体大小和粗细。</p>
            <p>较大的字体需要相应增加 width 和 height。</p>
          </div>
        </jh-water-mark>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '通过 font.fontSize 和 font.fontWeight 自定义字体大小和粗细。',
      },
    },
  },
};

// 全屏水印
export const FullScreen = {
  render: () => ({
    components: { JhWaterMark },
    template: `
      <div style="height: 600px; background: #f0f2f5;">
        <jh-water-mark content="江湖 JiangHu">
          <div style="padding: 40px; height: 100%;">
            <h3>全屏水印</h3>
            <p>水印会自动填充整个容器区域。</p>
            <p>适用于需要保护整个页面内容的场景。</p>
            <div style="margin-top: 40px; padding: 20px; background: white; border-radius: 4px;">
              <h4>内容区域 1</h4>
              <p>这是一些需要保护的内容。</p>
            </div>
            <div style="margin-top: 20px; padding: 20px; background: white; border-radius: 4px;">
              <h4>内容区域 2</h4>
              <p>水印会覆盖在所有内容之上。</p>
            </div>
          </div>
        </jh-water-mark>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '水印会自动填充整个容器区域，适用于全屏保护场景。',
      },
    },
  },
};

// 卡片水印
export const CardWatermark = {
  render: () => ({
    components: { JhWaterMark },
    template: `
      <div style="background: #f0f2f5; padding: 20px;">
        <div style="background: white; border-radius: 8px; overflow: hidden; max-width: 600px; margin: 0 auto;">
          <jh-water-mark content="机密文档">
            <div style="padding: 40px; min-height: 400px;">
              <h3>机密文档</h3>
              <p><strong>文档编号：</strong>JH-2024-001</p>
              <p><strong>创建时间：</strong>2024年11月9日</p>
              <p><strong>创建人：</strong>张三</p>
              <hr style="margin: 20px 0; border: none; border-top: 1px solid #e8e8e8;">
              <h4>文档内容</h4>
              <p>这是一份需要保护的机密文档内容。</p>
              <p>通过添加水印可以有效防止信息泄露和盗用。</p>
              <p>水印会自动覆盖在内容之上，但不会影响内容的正常阅读。</p>
            </div>
          </jh-water-mark>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '在卡片或特定区域添加水印，适用于文档保护场景。',
      },
    },
  },
};

// 表格水印
export const TableWatermark = {
  render: () => ({
    components: { JhWaterMark },
    template: `
      <div style="height: 500px;">
        <jh-water-mark content="内部数据" :font="{ color: 'rgba(0, 0, 0, 0.1)' }">
          <div style="padding: 20px; height: 100%;">
            <h3>数据表格</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <thead>
                <tr style="background: #fafafa;">
                  <th style="padding: 12px; border: 1px solid #e8e8e8; text-align: left;">姓名</th>
                  <th style="padding: 12px; border: 1px solid #e8e8e8; text-align: left;">部门</th>
                  <th style="padding: 12px; border: 1px solid #e8e8e8; text-align: left;">职位</th>
                  <th style="padding: 12px; border: 1px solid #e8e8e8; text-align: right;">薪资</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding: 12px; border: 1px solid #e8e8e8;">张三</td>
                  <td style="padding: 12px; border: 1px solid #e8e8e8;">技术部</td>
                  <td style="padding: 12px; border: 1px solid #e8e8e8;">高级工程师</td>
                  <td style="padding: 12px; border: 1px solid #e8e8e8; text-align: right;">¥25,000</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #e8e8e8;">李四</td>
                  <td style="padding: 12px; border: 1px solid #e8e8e8;">产品部</td>
                  <td style="padding: 12px; border: 1px solid #e8e8e8;">产品经理</td>
                  <td style="padding: 12px; border: 1px solid #e8e8e8; text-align: right;">¥22,000</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #e8e8e8;">王五</td>
                  <td style="padding: 12px; border: 1px solid #e8e8e8;">设计部</td>
                  <td style="padding: 12px; border: 1px solid #e8e8e8;">UI设计师</td>
                  <td style="padding: 12px; border: 1px solid #e8e8e8; text-align: right;">¥18,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </jh-water-mark>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '在表格数据上添加水印，保护敏感数据不被截图泄露。',
      },
    },
  },
};

// 防删除演示
export const MutationProtection = {
  render: () => ({
    components: { JhWaterMark },
    methods: {
      tryRemoveWatermark() {
        const watermarkLayer = document.querySelector('.jh-watermark-layer');
        if (watermarkLayer) {
          watermarkLayer.remove();
          this.$nextTick(() => {
            alert('水印已被删除，但会自动恢复！请观察页面变化。');
          });
        }
      },
      tryModifyWatermark() {
        const watermarkLayer = document.querySelector('.jh-watermark-layer');
        if (watermarkLayer) {
          watermarkLayer.style.display = 'none';
          this.$nextTick(() => {
            alert('水印已被隐藏，但会自动恢复！请观察页面变化。');
          });
        }
      },
    },
    template: `
      <div style="height: 400px;">
        <jh-water-mark content="防删除保护">
          <div style="padding: 40px; height: 100%;">
            <h3>防删除保护</h3>
            <p>水印组件内置了防删除和防修改机制。</p>
            <p>即使通过开发者工具删除或修改水印元素，也会自动恢复。</p>
            <div style="margin-top: 20px;">
              <button 
                @click="tryRemoveWatermark"
                style="padding: 8px 16px; margin-right: 10px; background: #1890ff; color: white; border: none; border-radius: 4px; cursor: pointer;"
              >
                尝试删除水印
              </button>
              <button 
                @click="tryModifyWatermark"
                style="padding: 8px 16px; background: #52c41a; color: white; border: none; border-radius: 4px; cursor: pointer;"
              >
                尝试隐藏水印
              </button>
            </div>
            <p style="margin-top: 20px; color: #999; font-size: 12px;">
              提示：点击按钮后，水印会被删除或隐藏，但会立即自动恢复。
            </p>
          </div>
        </jh-water-mark>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '演示水印的防删除和防修改保护机制，即使被删除也会自动恢复。',
      },
    },
  },
};

// 自定义 z-index
export const CustomZIndex = {
  render: () => ({
    components: { JhWaterMark },
    template: `
      <div style="height: 400px; position: relative;">
        <jh-water-mark content="背景水印" :z-index="1">
          <div style="padding: 40px; height: 100%; position: relative;">
            <h3>自定义 z-index</h3>
            <p>通过 zIndex 属性可以控制水印的层级。</p>
            <div style="position: relative; z-index: 10; background: white; padding: 20px; margin-top: 20px; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <h4>高层级内容</h4>
              <p>这个区域的 z-index 为 10，高于水印层级，所以不会被水印覆盖。</p>
            </div>
          </div>
        </jh-water-mark>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '通过 zIndex 属性控制水印的层级关系。',
      },
    },
  },
};

// 所有功能组合
export const AllFeatures = {
  render: () => ({
    components: { JhWaterMark },
    data() {
      return {
        content: ['江湖 JiangHu'],
        font: {
          color: 'rgba(0, 0, 0, 0.2)',
          fontSize: 18,
          fontWeight: 'bold',
        },
      };
    },
    template: `
      <div style="height: 600px; background: #f0f2f5;">
        <jh-water-mark
          :content="content"
          :width="200"
          :height="100"
          :rotate="-25"
          :gap-x="150"
          :gap-y="150"
          :font="font"
          :z-index="9"
        >
          <div style="padding: 40px; height: 100%;">
            <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <h3>完整功能演示</h3>
              <p>这是一个包含所有配置选项的完整示例：</p>
              <ul style="margin-top: 20px; line-height: 2;">
                <li>✓ 多行文本水印</li>
                <li>✓ 自定义宽度和高度</li>
                <li>✓ 自定义旋转角度</li>
                <li>✓ 自定义水平和垂直间距</li>
                <li>✓ 自定义字体样式（颜色、大小、粗细）</li>
                <li>✓ 自定义层级</li>
                <li>✓ 防删除和防修改保护</li>
              </ul>
              <div style="margin-top: 30px; padding: 20px; background: #f9f9f9; border-radius: 4px;">
                <h4>使用场景</h4>
                <p>适用于需要版权保护、防止信息泄露的场景，如：</p>
                <ul>
                  <li>机密文档</li>
                  <li>内部数据报表</li>
                  <li>设计稿预览</li>
                  <li>敏感信息展示</li>
                </ul>
              </div>
            </div>
          </div>
        </jh-water-mark>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '包含所有配置选项的完整示例，展示水印组件的全部功能。',
      },
    },
  },
};
