<template>
  <v-card
    :elevation="elevation"
    :outlined="outlined"
    :shaped="shaped"
    :tile="tile"
    :hover="hover"
    :color="color"
    :class="cardClass"
  >
    <v-card-title v-if="title || $slots.title" :class="titleClass">
      <slot name="title">{{ title }}</slot>
    </v-card-title>

    <v-card-subtitle v-if="subtitle || $slots.subtitle">
      <slot name="subtitle">{{ subtitle }}</slot>
    </v-card-subtitle>

    <v-card-text v-if="$slots.default" :class="contentClass">
      <slot></slot>
    </v-card-text>

    <v-card-actions v-if="$slots.actions">
      <slot name="actions"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'JhCard',
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    elevation: {
      type: [Number, String],
      default: 2,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    shaped: {
      type: Boolean,
      default: false,
    },
    tile: {
      type: Boolean,
      default: false,
    },
    hover: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: '',
    },
    cardClass: {
      type: String,
      default: '',
    },
    titleClass: {
      type: String,
      default: '',
    },
    contentClass: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>
/* 自定义样式 */
</style>
