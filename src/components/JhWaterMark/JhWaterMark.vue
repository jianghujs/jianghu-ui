<template>
  <div class="jh-watermark" :style="containerStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'JhWaterMark',

  props: {
    // 水印文字内容（支持字符串数组实现多行文本）
    content: {
      type: [String, Array],
      default: '',
    },

    // 图片源，建议导出 2 倍或 3 倍图，优先级高于文字
    image: {
      type: String,
      default: '',
    },

    // 水印整体宽度
    width: {
      type: Number,
      default: 120,
    },

    // 水印整体高度
    height: {
      type: Number,
      default: 64,
    },

    // 水印旋转角度
    rotate: {
      type: Number,
      default: -22,
    },

    // 水印之间的水平间距
    gapX: {
      type: Number,
      default: 212,
    },

    // 水印之间的垂直间距
    gapY: {
      type: Number,
      default: 222,
    },

    // 水印在 canvas 画布上绘制的水平偏移量，正常情况下，水印绘制在中间位置，即 offsetX = gapX / 2
    offsetX: {
      type: Number,
      default: undefined,
    },

    // 水印在 canvas 画布上绘制的垂直偏移量，正常情况下，水印绘制在中间位置，即 offsetY = gapY / 2
    offsetY: {
      type: Number,
      default: undefined,
    },

    // 字体配置
    font: {
      type: Object,
      default: () => ({}),
    },

    // 水印层的 z-index
    zIndex: {
      type: Number,
      default: 9,
    },

    // 追加的水印元素的根节点
    getContainer: {
      type: Function,
      default: undefined,
    },
  },

  data() {
    return {
      watermarkUrl: '',
      observer: null,
    };
  },

  computed: {
    containerStyle() {
      return {
        position: 'relative',
      };
    },

    // 合并字体配置
    mergedFont() {
      return {
        color: 'rgba(0, 0, 0, 0.15)',
        fontSize: 16,
        fontWeight: 'normal',
        fontFamily: 'sans-serif',
        fontStyle: 'normal',
        textAlign: 'center',
        ...this.font,
      };
    },

    // 计算实际偏移量
    actualOffsetX() {
      return this.offsetX !== undefined ? this.offsetX : this.gapX / 2;
    },

    actualOffsetY() {
      return this.offsetY !== undefined ? this.offsetY : this.gapY / 2;
    },
  },

  watch: {
    content: {
      handler() {
        this.renderWatermark();
      },
      deep: true,
    },
    image() {
      this.renderWatermark();
    },
    width() {
      this.renderWatermark();
    },
    height() {
      this.renderWatermark();
    },
    rotate() {
      this.renderWatermark();
    },
    gapX() {
      this.renderWatermark();
    },
    gapY() {
      this.renderWatermark();
    },
    offsetX() {
      this.renderWatermark();
    },
    offsetY() {
      this.renderWatermark();
    },
    font: {
      handler() {
        this.renderWatermark();
      },
      deep: true,
    },
  },

  mounted() {
    this.renderWatermark();
    this.observeWatermark();
  },

  beforeDestroy() {
    this.destroyWatermark();
    if (this.observer) {
      this.observer.disconnect();
    }
  },

  methods: {
    // 生成水印
    async renderWatermark() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      const canvasWidth = (this.width + this.gapX) * 2;
      const canvasHeight = (this.height + this.gapY) * 2;
      
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      if (this.image) {
        // 使用图片水印
        await this.drawImageWatermark(ctx, canvasWidth, canvasHeight);
      } else if (this.content) {
        // 使用文字水印
        this.drawTextWatermark(ctx, canvasWidth, canvasHeight);
      }

      this.watermarkUrl = canvas.toDataURL();
      this.updateWatermarkElement();
    },

    // 绘制图片水印
    drawImageWatermark(ctx, canvasWidth, canvasHeight) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.referrerPolicy = 'no-referrer';
        
        img.onload = () => {
          ctx.save();
          
          // 计算中心点
          const centerX = canvasWidth / 2;
          const centerY = canvasHeight / 2;
          
          // 移动到中心点并旋转
          ctx.translate(centerX, centerY);
          ctx.rotate((Math.PI / 180) * this.rotate);
          
          // 绘制图片（以中心点为基准）
          ctx.drawImage(
            img,
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
          );
          
          ctx.restore();
          resolve();
        };
        
        img.onerror = () => {
          console.error('Watermark image load failed');
          reject();
        };
        
        img.src = this.image;
      });
    },

    // 绘制文字水印
    drawTextWatermark(ctx, canvasWidth, canvasHeight) {
      const { color, fontSize, fontWeight, fontFamily, fontStyle, textAlign } = this.mergedFont;
      
      ctx.save();
      
      // 设置字体样式
      ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;
      ctx.fillStyle = color;
      ctx.textAlign = textAlign;
      ctx.textBaseline = 'middle';
      
      // 计算中心点
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;
      
      // 移动到中心点并旋转
      ctx.translate(centerX, centerY);
      ctx.rotate((Math.PI / 180) * this.rotate);
      
      // 处理多行文本
      const contents = Array.isArray(this.content) ? this.content : [this.content];
      const lineHeight = fontSize * 1.5;
      const totalHeight = contents.length * lineHeight;
      const startY = -totalHeight / 2 + lineHeight / 2;
      
      // 绘制每一行文字
      contents.forEach((text, index) => {
        const y = startY + index * lineHeight;
        ctx.fillText(text, 0, y);
      });
      
      ctx.restore();
    },

    // 更新水印元素
    updateWatermarkElement() {
      this.destroyWatermark();
      
      const container = this.getContainer ? this.getContainer() : this.$el;
      if (!container) return;

      const watermarkDiv = document.createElement('div');
      watermarkDiv.className = 'jh-watermark-layer';
      watermarkDiv.style.cssText = `
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        pointer-events: none;
        z-index: ${this.zIndex};
        background-image: url(${this.watermarkUrl});
        background-repeat: repeat;
        background-position: ${this.actualOffsetX}px ${this.actualOffsetY}px;
        overflow: hidden;
      `;
      
      watermarkDiv.setAttribute('data-watermark', 'true');
      container.appendChild(watermarkDiv);
      this.watermarkElement = watermarkDiv;
    },

    // 销毁水印元素
    destroyWatermark() {
      if (this.watermarkElement && this.watermarkElement.parentNode) {
        this.watermarkElement.parentNode.removeChild(this.watermarkElement);
        this.watermarkElement = null;
      }
    },

    // 监听水印元素变化，防止被删除或修改
    observeWatermark() {
      if (!window.MutationObserver) return;

      this.observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            const removed = Array.from(mutation.removedNodes).some(
              (node) => node === this.watermarkElement
            );
            if (removed) {
              this.updateWatermarkElement();
            }
          } else if (mutation.type === 'attributes') {
            if (mutation.target === this.watermarkElement) {
              this.updateWatermarkElement();
            }
          }
        });
      });

      this.observer.observe(this.$el, {
        childList: true,
        attributes: true,
        subtree: true,
      });
    },
  },
};
</script>

<style scoped>
.jh-watermark {
  position: relative;
  min-height: 100%;
}

.jh-watermark-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-repeat: repeat;
}
</style>
