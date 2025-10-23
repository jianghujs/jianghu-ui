<template>
  <v-data-table
      :headers="headers"
      :items="items"
      :loading="loading"
      :search="search"
      :dense="dense"
      :item-key="itemKey"
      :show-select="showSelect"
      :single-select="singleSelect"
      :items-per-page="itemsPerPage"
      :hide-default-footer="hideDefaultFooter"
      :class="tableClass"
      @click:row="handleRowClick"
    >
      <!-- 自定义表头插槽 -->
      <template v-for="header in headers" v-slot:[`header.${header.value}`]="{ header: h }">
        <slot :name="`header.${header.value}`" :header="h">
          {{ h.text }}
        </slot>
      </template>

      <!-- 自定义单元格插槽 -->
      <template v-for="header in headers" v-slot:[`item.${header.value}`]="{ item }">
        <slot :name="`item.${header.value}`" :item="item">
          {{ item[header.value] }}
        </slot>
      </template>

      <!-- 顶部工具栏插槽 -->
      <template v-slot:top>
        <slot name="top"></slot>
      </template>

      <!-- 无数据插槽 -->
      <template v-slot:no-data>
        <slot name="no-data">
          <div class="text-center py-5">暂无数据</div>
        </slot>
      </template>
    </v-data-table>
</template>

<script>
export default {
  name: 'JhTable',
  props: {
    headers: {
      type: Array,
      required: true,
      default: () => [],
    },
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    search: {
      type: String,
      default: '',
    },
    dense: {
      type: Boolean,
      default: false,
    },
    itemKey: {
      type: String,
      default: 'id',
    },
    showSelect: {
      type: Boolean,
      default: false,
    },
    singleSelect: {
      type: Boolean,
      default: false,
    },
    itemsPerPage: {
      type: Number,
      default: 10,
    },
    hideDefaultFooter: {
      type: Boolean,
      default: false,
    },
    tableClass: {
      type: String,
      default: '',
    },
  },
  methods: {
    handleRowClick(item) {
      this.$emit('row-click', item);
    },
  },
};
</script>

<style scoped>
/* 自定义样式 */
</style>
