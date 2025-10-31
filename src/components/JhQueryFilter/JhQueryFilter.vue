<template>
  <v-row class="jh-backend-form-container justify-end py-md-3" no-gutters>
    <!-- 关键字搜索（支持多字段选择） -->
    <v-col
      v-if="showKeywordSearch"
      cols="12"
      sm="4"
      md="3"
      xl="2"
      class="pl-md-2"
    >
      <v-text-field
        :disabled="keywordFieldListInternal.length == 0"
        :placeholder="keywordPlaceholder"
        class="jh-v-input"
        dense
        single-line
        filled
        v-model="keywordInternal"
      >
        <template v-slot:prepend-inner>
          <!-- 下拉选择模糊搜索字段 -->
          <v-menu
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290"
          >
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on" class="text-nowrap pt-1">
                {{ keywordLabel }}
                <span class="bg-green-500 text-white ml-0.5 px-1 rounded">
                  {{ keywordFieldListInternal.length }}
                </span>
              </div>
            </template>
            <div class="pa-2 w-[300px]">
              <v-chip
                v-for="header in availableHeaders"
                :key="header.value"
                class="ma-1"
                :color="keywordFieldListInternal.includes(header.value) ? 'primary' : 'default'"
                label
                outlined
                small
                @click="toggleKeywordField(header.value)"
              >
                {{ header.text }}
              </v-chip>
            </div>
          </v-menu>
        </template>
      </v-text-field>
    </v-col>

    <!-- 自定义筛选字段插槽 -->
    <slot name="filter-fields"></slot>

    <!-- 查询按钮 -->
    <div class="jh-backend-search-btn ml-2">
      <v-btn
        class="elevation-0 float-right mt-2 mt-sm-0"
        color="success"
        small
        @click="handleSearch"
      >
        {{ searchButtonText }}
      </v-btn>
    </div>

    <!-- 额外操作按钮插槽 -->
    <slot name="extra-actions"></slot>
  </v-row>
</template>

<script>
export default {
  name: 'JhQueryFilter',
  props: {
    // 是否显示关键字搜索
    showKeywordSearch: {
      type: Boolean,
      default: true
    },

    // 关键字搜索配置
    keyword: {
      type: String,
      default: ''
    },
    keywordFieldList: {
      type: Array,
      default: () => []
    },
    keywordLabel: {
      type: String,
      default: '标题'
    },

    // 表头数据（用于关键字字段选择）
    headers: {
      type: Array,
      default: () => []
    },

    // 查询按钮文本
    searchButtonText: {
      type: String,
      default: '查询'
    }
  },
  data() {
    return {
      keywordInternal: this.keyword,
      keywordFieldListInternal: [...this.keywordFieldList]
    };
  },
  computed: {
    // 可用的表头（排除 action 列）
    availableHeaders() {
      return this.headers.filter(h => h.value !== 'action');
    },

    // 关键字输入框占位符
    keywordPlaceholder() {
      if (typeof _ !== 'undefined') {
        return _.compact(
          this.keywordFieldListInternal.map(
            e => this.headers.find(h => h.value == e)?.text
          )
        ).join('/');
      }
      // 如果 lodash 不可用，使用原生 JS
      return this.keywordFieldListInternal
        .map(e => this.headers.find(h => h.value == e)?.text)
        .filter(Boolean)
        .join('/');
    }
  },
  watch: {
    keyword(val) {
      this.keywordInternal = val;
    },
    keywordInternal(val) {
      this.$emit('update:keyword', val);
    },
    keywordFieldList: {
      handler(val) {
        this.keywordFieldListInternal = [...val];
      },
      deep: true
    },
    keywordFieldListInternal: {
      handler(val) {
        this.$emit('update:keywordFieldList', val);
      },
      deep: true
    }
  },
  methods: {
    // 切换关键字搜索字段
    toggleKeywordField(fieldValue) {
      if (this.keywordFieldListInternal.includes(fieldValue)) {
        this.keywordFieldListInternal = this.keywordFieldListInternal.filter(
          field => field !== fieldValue
        );
      } else {
        this.keywordFieldListInternal.push(fieldValue);
      }
    },

    // 触发搜索事件
    handleSearch() {
      this.$emit('search');
    }
  }
};
</script>
