<template>
  <v-app>
    <v-container fluid class="pa-0">
      <div class="w-full">
        <!-- 文件上传区域 -->
        <div class="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4">
          <!-- 已上传的文件 -->
          <div v-if="value && isString(value)" class="relative aspect-square rounded overflow-hidden">
            <div class="w-full h-full flex flex-col items-center justify-center p-2 bg-gray-100">
              <img v-if="isImage(value)" :src="getImageUrl(value)" class="max-w-full max-h-full object-contain">
              <jh-icon v-else icon="mdi:file-document-outline" width="40" height="40" class="text-gray-500"></jh-icon>
            </div>
            <!-- 删除按钮 -->
            <v-btn
              v-if="!readonly"
              icon
              x-small
              class="absolute top-1 right-1 !bg-black/50"
              @click="handleRemoveSingleFile"
            >
              <jh-icon icon="mdi:close" size="16" color="white"></jh-icon>
            </v-btn>
          </div>
          <div v-else-if="value && Array.isArray(value)" v-for="(file, index) in value" :key="index" class="relative aspect-square border border-gray-200 rounded overflow-hidden">
            <!-- 预览图 -->
            <div v-if="isString(file)" class="w-full h-full flex flex-col items-center justify-center p-2 bg-gray-100">
              <img v-if="isImage(file)" :src="getImageUrl(file)" class="max-w-full max-h-full object-contain">
              <jh-icon v-else icon="mdi:file-document-outline" width="40" height="40" class="text-gray-500"></jh-icon>
            </div>
            <div v-else class="w-full h-full flex flex-col items-center justify-center p-2 bg-gray-100">
              <img v-if="isImage(file)" :src="getObjectUrl(file)" class="max-w-full max-h-full object-contain">
              <jh-icon v-else icon="mdi:file-document-outline" width="40" height="40" class="text-gray-500"></jh-icon>
            </div>
            <!-- 删除按钮 -->
            <v-btn
              v-if="!readonly"
              icon
              x-small
              class="absolute top-1 right-1 !bg-black/50"
              @click="removeFile(index)"
            >
              <jh-icon icon="mdi:close" size="16" color="white"></jh-icon>
            </v-btn>
            <!-- 类型 -->
            <div class="absolute top-0 left-2 text-xs bg-green-500 text-white px-1 rounded-b-sm">
              {{ getFileExtension(file) }}
            </div>
          </div>

          <!-- 上传按钮 -->
          <div class="aspect-square border-2 border-dashed border-gray-200 rounded flex items-center justify-center cursor-pointer transition-all hover:border-blue-500 hover:bg-blue-50" @click="triggerFileInput" v-if="isCanUpload">
            <input
              type="file"
              ref="fileInput"
              :multiple="multiple"
              :accept="accept"
              @change="handleFileChange"
              class="hidden"
            >
            <jh-icon icon="mdi:plus" width="40" height="40" class="text-gray-500 transition-all group-hover:text-blue-500"></jh-icon>
          </div>
        </div>

        <!-- 错误提示 -->
        <div v-if="errorMessage" class="text-red-500 text-xs mt-2 pl-0.5">
          {{ errorMessage }}
        </div>

        <!-- 上传限制提示 -->
        <div v-if="isShowUploadLimit" class="text-gray-500 text-xs mt-2 pl-0.5">
          最多可上传 {{ maxFiles }} 个文件 (已上传 {{ isString(value) ? 1 : (value || []).length }} 个)
        </div>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import JhIcon from '../JhIcon/JhIcon.vue'

export default {
  name: 'JhFileInput',
  components: {
    JhIcon
  },
  props: {
    // 已选文件集合，可为 File[]、字符串路径数组或单个字符串
    value: {
      type: [Array, String],
      default: () => []
    },
    // 限制最大可上传文件数，0 表示不限制
    maxFiles: {
      type: Number,
      default: 0  // 0 表示不限制
    },
    // input accept 属性，控制允许的文件类型
    accept: {
      type: String,
      default: '*/*'  // 默认接受所有文件类型
    },
    // 是否允许多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 额外的校验规则
    rules: {
      type: Array,
      default: () => []
    },
    // 只读模式（禁用上传和删除）
    readonly: {
      type: Boolean,
      default: false
    },
    // 上传接口需要拼接的路径前缀
    uploadPrefix: {
      type: String,
      default: '/upload/'
    }
  },
  data() {
    return {
      errorMessage: ''
    }
  },
  watch: {
    value: {
      handler() {
        this.validate();
      },
      deep: true
    }
  },
  computed: {
    isCanUpload() {
      if (this.readonly) return false;

      if (this.multiple) {
        return !this.maxFiles || ((this.value || []).length < this.maxFiles);
      } else {
        return (this.value || []).length < 1;
      }
    },
    isShowUploadLimit() {
      return !this.readonly && this.multiple && this.maxFiles > 0;
    }
  },
  methods: {
    isString(val) {
      return typeof val === 'string';
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },

    async handleFileChange(event) {
      const files = Array.from(event.target.files);

      // 检查文件数量限制
      if (this.maxFiles && (this.value || []).length + files.length > this.maxFiles) {
        this.errorMessage = `最多只能上传 ${this.maxFiles} 个文件`;
        return;
      }

      let newFiles = [...(this.value || [])];
      for (const file of files) {
        try {
          // 检查是否已存在相同文件
          const isDuplicate = newFiles.some(existingFile =>
            existingFile.name === file.name &&
            existingFile.size === file.size
          );

          if (isDuplicate) {
            this.errorMessage = `文件 ${file.name} 已存在`;
            continue;
          }

          newFiles.push(file);
        } catch (error) {
          console.error('Upload error:', error);
          this.errorMessage = `上传文件 ${file.name} 失败`;
        }
      }

      this.$emit('input', newFiles);
      this.$emit('change', newFiles);
      if (!this.errorMessage) {
        this.errorMessage = '';
      }

      // 清空 input，以便重复选择同一文件
      event.target.value = '';
    },

    handleRemoveSingleFile() {
      this.$emit('input', []);
      this.$emit('change', []);
    },

    removeFile(index) {
      const files = [...this.value];
      files.splice(index, 1);
      this.$emit('input', files);
      this.$emit('change', files);
    },

    isImage(file) {
      if (this.isString(file)) {
        return ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'].includes(file.split('.').pop().toLowerCase());
      }
      return file.type ? file.type.startsWith('image/') : false;
    },

    getImageUrl(path) {
      return `${this.uploadPrefix}${path}`;
    },

    getObjectUrl(file) {
      return URL.createObjectURL(file);
    },

    getFileExtension(file) {
      if (this.isString(file)) {
        return file.split('.').pop();
      }
      return file.name.split('.').pop();
    },

    validate() {
      this.errorMessage = '';

      // 执行验证规则
      for (const rule of this.rules) {
        const result = rule(this.value);
        if (result !== true) {
          this.errorMessage = result;
          return false;
        }
      }

      return true;
    }
  }
}
</script>

<style scoped>
.aspect-square {
  aspect-ratio: 1 / 1;
}

.grid {
  display: grid;
}
</style>
