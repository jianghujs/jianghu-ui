<template>
  <v-app>
    <v-container fluid>
      <v-card class="px-4">
        <!-- 工具栏 -->
        <v-row class="ma-0 pt-0 d-flex">
          <v-btn
            v-if="showCreateButton"
            color="success"
            small
            dark
            class="elevation-0 mr-2"
            @click="handleCreateClick"
          >
            新增附件
          </v-btn>

          <v-spacer></v-spacer>

          <v-col cols="12" sm="6" md="3" xl="3" class="pa-0 pt-2 pt-sm-0">
            <v-text-field
              v-model="searchInput"
              color="success"
              prefix="表格过滤："
              class="jh-v-input"
              dense
              filled
              single-line
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- 附件分组展示 -->
        <v-card
          v-for="(itemList, groupName) in groupedAttachments"
          :key="groupName"
          outlined
          class="my-2"
        >
          <v-card-title class="pl-4" style="font-size: 20px; font-weight: 500;">
            {{ groupName }}
          </v-card-title>
          <v-card-text style="display: flex; flex-flow: wrap;">
            <v-card
              v-for="item in itemList"
              :key="item.id"
              width="200px"
              class="mr-2 mb-2"
              outlined
            >
              <v-img
                :src="getPreviewUrl(item)"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="120px"
              >
                <v-card-title class="text-subtitle-2">{{ item.filename }}</v-card-title>
              </v-img>

              <v-card-actions>
                <v-chip small>{{ item.fileSubtype || getFileType(item.filename) }}</v-chip>
                <v-spacer></v-spacer>

                <!-- 预览按钮 -->
                <v-btn
                  v-if="isImage(item.downloadPath || item.filename)"
                  icon
                  small
                  @click="handlePreview(item)"
                  title="预览"
                >
                  <v-icon>mdi-eye</v-icon>
                </v-btn>

                <!-- 下载按钮 -->
                <v-btn
                  v-if="item.downloadPath"
                  icon
                  small
                  @click="handleDownload(item)"
                  title="下载"
                >
                  <v-icon>mdi-download</v-icon>
                </v-btn>

                <!-- 删除按钮 -->
                <v-btn
                  v-if="!readonly"
                  icon
                  small
                  @click="handleDelete(item)"
                  title="删除"
                >
                  <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-card-text>
        </v-card>

        <!-- 加载状态 -->
        <v-overlay absolute :value="loading" color="#fff">
          <v-progress-circular
            color="success"
            indeterminate
            size="32"
          ></v-progress-circular>
        </v-overlay>

        <!-- 空状态 -->
        <div v-if="!loading && filteredAttachments.length === 0" class="mt-5 text-center">
          暂无附件
        </div>
      </v-card>

      <!-- 预览对话框 -->
      <v-dialog v-model="previewDialog" max-width="90vw">
        <v-card>
          <v-card-title>
            {{ previewItem ? previewItem.filename : '' }}
            <v-spacer></v-spacer>
            <v-btn icon @click="previewDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="pa-0">
            <v-img
              v-if="previewItem"
              :src="getPreviewUrl(previewItem)"
              contain
              max-height="70vh"
            ></v-img>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'JhTableAttachment',
  props: {
    // 附件列表
    attachments: {
      type: Array,
      default: () => []
      /**
       * [{
       *   id: 1,
       *   filename: '文件名.jpg',
       *   downloadPath: '/upload/xxx.jpg',
       *   fileType: '分类名称',
       *   fileSubtype: 'jpg'
       * }]
       */
    },
    // 是否显示新增按钮
    showCreateButton: {
      type: Boolean,
      default: true
    },
    // 是否只读
    readonly: {
      type: Boolean,
      default: false
    },
    // 分组字段名
    groupBy: {
      type: String,
      default: 'fileType'
    },
    // 预览路径前缀
    previewPrefix: {
      type: String,
      default: '/upload/'
    },
    // 是否加载中
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searchInput: '',
      previewDialog: false,
      previewItem: null
    };
  },
  computed: {
    filteredAttachments() {
      if (!this.searchInput) {
        return this.attachments;
      }
      return this.attachments.filter(item =>
        item.filename.toLowerCase().includes(this.searchInput.toLowerCase()) ||
        (item.fileType && item.fileType.toLowerCase().includes(this.searchInput.toLowerCase()))
      );
    },
    groupedAttachments() {
      const grouped = {};
      this.filteredAttachments.forEach(item => {
        const groupName = item[this.groupBy] || '未分类';
        if (!grouped[groupName]) {
          grouped[groupName] = [];
        }
        grouped[groupName].push(item);
      });
      return grouped;
    }
  },
  methods: {
    getPreviewUrl(item) {
      if (item.downloadPath) {
        return `${this.previewPrefix}${item.downloadPath}`;
      }
      return '/placeholder-image.jpg';
    },
    isImage(filename) {
      if (!filename) return false;
      return /\.(gif|jpg|jpeg|png|webp|svg|bmp)$/i.test(filename);
    },
    getFileType(filename) {
      if (!filename) return '';
      const ext = filename.split('.').pop();
      return ext ? ext.toLowerCase() : '';
    },
    handleCreateClick() {
      this.$emit('create-click');
    },
    handlePreview(item) {
      this.previewItem = item;
      this.previewDialog = true;
      this.$emit('preview', item);
    },
    handleDownload(item) {
      this.$emit('download', item);
      // 默认下载逻辑
      if (item.downloadPath) {
        const link = document.createElement('a');
        link.href = this.getPreviewUrl(item);
        link.download = item.filename;
        link.click();
      }
    },
    handleDelete(item) {
      this.$emit('delete', item);
    }
  }
};
</script>

<style scoped>
:deep(.jh-v-input) {
  border: 1px solid #e5e7eb;
}

:deep(.jh-v-input .v-input__slot) {
  margin: 0 !important;
  background-color: #fff !important;
}
</style>
