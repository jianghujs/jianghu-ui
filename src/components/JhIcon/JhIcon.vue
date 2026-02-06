<template>
  <span 
    class="jh-icon d-inline-flex align-center justify-center" 
    :class="[colorClass]"
    @click="$emit('click', $event)"
  >
    <Icon 
      :icon="iconName" 
      :width="size || width" 
      :height="size || height" 
      :rotate="rotate" 
      :flip="flip"
      :color="computedColor"
    />
  </span>
</template>

<script>
import { Icon } from '@iconify/vue2';

export default {
  name: 'JhIcon',
  components: { Icon },
  props: {
    icon: { type: String, required: true },
    size: { type: [Number, String], default: null },
    width: { type: [Number, String], default: 18 },
    height: { type: [Number, String], default: 18 },
    color: { type: String },
    rotate: { type: [Number, String] },
    flip: { type: String },
  },
  computed: {
    iconName() {
      // Handle mdi- prefix for Vuetify compatibility
      if (this.icon && this.icon.startsWith('mdi-')) {
        return this.icon.replace('mdi-', 'mdi:');
      }
      return this.icon;
    },
    isCssColor() {
      return this.color && (
        this.color.startsWith('#') || 
        this.color.startsWith('rgb') || 
        this.color.startsWith('rgba') ||
        this.color.startsWith('var(')
      );
    },
    computedColor() {
      if (this.isCssColor) return this.color;
      return undefined;
    },
    colorClass() {
      if (this.color && !this.isCssColor) {
        // Vuetify convention: 'primary' -> 'primary--text'
        // If it already has --text, leave it.
        if (this.color.endsWith('--text')) return this.color;
        
        // Simple heuristic for Vuetify theme colors
        // If it's a single word, assume it's a color class base
        if (!this.color.includes(' ')) {
           return `${this.color}--text`;
        }
        return this.color;
      }
      return '';
    }
  }
};
</script>

<style scoped>
.jh-icon {
  line-height: 1;
}
</style>
