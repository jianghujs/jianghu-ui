<template>
  <div class="jh-page-container">
    <!-- 头部内容 -->
    <div class="jh-page-second-bar px-3 px-sm-8">
      <v-row class="align-center" no-gutters>
        <!-- 页面标题 -->
        <v-col cols="12" sm="12" md="4" xl="3">
          <div class="py-4 text-body-1 font-weight-bold d-flex align-center">
            <slot name="page-title">
              {{ pageTitle }}
            </slot>
            <!-- 帮助按钮 -->
            <v-icon
              v-if="showHelpButton"
              size="15"
              class="black--text ml-1"
              @click="handleHelpClick"
            >
              mdi-help-circle
            </v-icon>
            <!-- 自定义头部操作按钮 -->
            <slot name="header-actions"></slot>
          </div>
        </v-col>

        <!-- 搜索栏插槽 -->
        <v-spacer></v-spacer>
        <v-col cols="12" xs="12" sm="12" md="8" xl="9" class="pl-md-2 mb-2 mb-md-0">
          <slot name="search-bar"></slot>
        </v-col>
      </v-row>
    </div>

    <!-- 页面内容 -->
    <div class="jh-page-body-container px-sm-8">
      <v-row class="pa-0 ma-0">
        <v-col class="pa-0" :cols="12">
          <slot name="content"></slot>
        </v-col>
      </v-row>
    </div>

    <!-- 其他插槽(如抽屉等) -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'JhPageContainer',
  props: {
    pageTitle: {
      type: String,
      default: '页面标题',
      validator: (value) => typeof value === 'string',
    },
    showHelpButton: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleHelpClick() {
      this.$emit('help-click');
    },
  },
};
</script>

<style scoped>
.jh-page-container {
  width: 100%;
  height: 100%;
}

.jh-page-second-bar {
  background-color: #ffffff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.jh-page-second-bar span[role="button"] {
  min-width: 40px;
}

.jh-page-body-container {
  padding-top: 16px;
  padding-bottom: 16px;
}

/* 移动端优化 */
@media (max-width: 600px) {
  .jh-page-second-bar {
    padding-left: 12px !important;
    padding-right: 12px !important;
  }

  .jh-page-body-container {
    padding-left: 12px !important;
    padding-right: 12px !important;
  }
}
</style>
