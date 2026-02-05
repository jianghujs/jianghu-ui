<template>
  <div
    :class="iconClasses"
    :style="iconStyles"
  >
    <Icon
      :icon="icon"
      :size="size"
      :color="color"
      v-bind="$attrs"
    />
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2';

export default {
  name: 'JhIcon',
  components: {
    Icon,
  },
  props: {
    // 图标名称，格式为 'icon-set:icon-name'，例如 'mdi:home'
    icon: {
      type: String,
      required: true,
    },

    // 图标大小
    size: {
      type: [String, Number],
      default: '24px',
    },

    // 图标颜色
    color: {
      type: String,
      default: '',
    },

    // 图标样式类
    class: {
      type: String,
      default: '',
    },
  },

  computed: {
    // 图标样式类
    iconClasses() {
      return {
        'jh-icon': true,
        [this.class]: !!this.class,
      };
    },

    // 图标样式
    iconStyles() {
      return {};
    },
  },
};
</script>

<style scoped>
.jh-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>