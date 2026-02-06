<template>
  <div>
    <v-app mobile-breakpoint="sm">
  <slot name="menu"></slot>
  <v-main class="mt-15">
    <!-- 头部内容 -->
    <div class="jh-page-second-bar px-3 px-sm-8">
      <v-row class="align-center" no-gutters>
        <!-- 页面标题 -->
        <v-col cols="12" sm="12" md="4" xl="3">
          <div class="py-4 text-body-1 font-weight-bold align-center d-flex align-center">
            {{ pageName }}
            <!-- 帮助页按钮 -->
            <jh-icon
              v-if="showHelpButton"
              icon="mdi:help-circle"
              width="15"
              height="15"
              class="black--text ml-1"
              @click="$emit('help-click')"
            ></jh-icon>
          </div>
        </v-col>

        <!-- 搜索栏插槽 -->
        <v-spacer></v-spacer>
        <v-col cols="12" xs="12" sm="12" md="8" xl="9" class="pl-md-2 mb-2 mb-md-0 flex justify-end">
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

    <!-- 其他插槽（如抽屉等） -->
    <slot></slot>

    
   </v-main>
</v-app>

<jh-toast />
<jh-mask />
<jh-confirm-dialog />
  </div>
</template>

<script>
import JhIcon from '../JhIcon/JhIcon.vue'

export default {
  name: 'JhPageContainer',
  components: {
    JhIcon
  },
  props: {
    // 页面主标题，显示在顶部 Title 区域
    pageName: {
      type: String,
      required: true,
      default: '页面标题'
    },
    // 是否展示右上角的帮助按钮
    showHelpButton: {
      type: Boolean,
      default: true
    }
  }
};
</script>
