<template>
  <v-btn
    :color="color"
    :size="size"
    :disabled="disabled"
    :loading="loading"
    :outlined="outlined"
    :text="text"
    :block="block"
    :rounded="rounded"
    :elevation="elevation"
    :icon="icon"
    @click="handleClick"
  >
    <v-icon v-if="prependIcon" left>{{ prependIcon }}</v-icon>
    <slot>{{ label }}</slot>
    <v-icon v-if="appendIcon" right>{{ appendIcon }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'JhButton',
  props: {
    label: {
      type: String,
      default: 'Button',
    },
    color: {
      type: String,
      default: 'primary',
    },
    size: {
      type: String,
      default: 'default',
      validator: (value) => ['x-small', 'small', 'default', 'large', 'x-large'].includes(value),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    text: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Boolean,
      default: false,
    },
    elevation: {
      type: [Number, String],
      default: 2,
    },
    prependIcon: {
      type: String,
      default: '',
    },
    appendIcon: {
      type: String,
      default: '',
    },
  },
  methods: {
    handleClick(event) {
      this.$emit('click', event);
    },
  },
};
</script>

<style scoped>
/* 自定义样式 */
</style>
