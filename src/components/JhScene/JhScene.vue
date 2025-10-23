<template>
  <div class="jh-scene">
    <v-row class="ma-0">
      <!-- 场景列表 -->
      <v-btn-toggle
        :value="currentSceneIndex"
        mandatory
        dense
        :class="{ 'mr-md-2': showActionBtn }"
        color="success"
        @change="handleSceneChange"
      >
        <v-btn small v-for="(scene, index) in sceneList" :key="index">{{ scene.name }}</v-btn>
      </v-btn-toggle>

      <!-- 场景操作菜单 -->
      <v-menu v-if="showActionBtn" offset-y v-model="isSceneOperationShown">
        <template v-slot:activator="{ on, attrs }">
          <v-btn-toggle dense color="white">
            <v-btn small v-bind="attrs" v-on="on">
              <v-icon small class="mx-0">mdi-chevron-down</v-icon>
            </v-btn>
          </v-btn-toggle>
        </template>
        <v-list dense class="pb-0">
          <v-list-item @click="openCreateSceneDialog">
            <v-list-item-title class="success--text">
              <v-icon small class="success--text">mdi-plus</v-icon>
              <span class="success--text">新建场景</span>
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="openSceneListDialog">
            <v-list-item-title class="success--text">
              <v-icon small class="success--text">mdi-cog-outline</v-icon>
              <span class="success--text">场景管理</span>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-row>

    <!-- 新建场景dialog -->
    <v-dialog v-model="isCreateSceneDialogShown" persistent width="360px">
      <v-card>
        <v-card-title>
          <v-row class="ma-0">
            <div style="font-size: 16px">新建场景</div>
            <v-spacer></v-spacer>
            <v-btn class="elevation-0" fab x-small @click="closeCreateSceneDialog">
              <v-icon dark>mdi-close</v-icon>
            </v-btn>
          </v-row>
        </v-card-title>
        <v-card-text>
          <div class="mb-2">
            <span class="jh-input-label">场景名称</span>
            <v-text-field
              class="jh-v-input"
              dense
              single-line
              filled
              hide-details
              v-model="createItem.name"
              placeholder="场景名称，最多10个字符"
              :rules="validationRules.requireRules"
            ></v-text-field>
          </div>
          <div v-if="hasFormSlot" class="mb-2">
            <span class="jh-input-label">筛选条件</span>
            <slot name="form" :form="createItem.form"></slot>
          </div>
        </v-card-text>
        <v-card-actions class="pb-4">
          <v-row class="ma-0 pa-6 pt-2 justify-end">
            <v-btn class="ml-2" @click="doCreateScene" small color="success">保存</v-btn>
            <v-btn class="ml-2" @click="closeCreateSceneDialog" small>取消</v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 场景列表dialog -->
    <v-dialog v-model="isSceneListShown" persistent width="360px">
      <v-card class="scene-manage">
        <v-card-title>
          <v-row class="ma-0">
            <div style="font-size: 16px">场景管理</div>
            <v-spacer></v-spacer>
            <v-btn class="elevation-0" fab x-small @click="closeSceneListDialog">
              <v-icon dark>mdi-close</v-icon>
            </v-btn>
          </v-row>
        </v-card-title>
        <v-card-text class="pb-2">
          <v-card outlined>
            <v-list dense class="scene-list">
              <!-- 场景列表数据 -->
              <template v-if="sceneCustomList && sceneCustomList.length">
                <v-list-item class="scene-item px-2" v-for="item in sceneCustomList" :key="item.id">
                  <v-list-item-content>{{ item.name }}</v-list-item-content>
                  <v-list-item-icon @click.stop="doDeleteScene(item)">
                    <v-icon size="22">mdi-delete</v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </template>
              <template v-else>
                <div class="text-center grey--text" style="line-height: 100px">暂无自定义场景</div>
              </template>
            </v-list>
          </v-card>
        </v-card-text>
        <v-card-actions class="pb-4">
          <v-row class="ma-0 pa-6 pt-2 justify-end">
            <v-btn class="ml-2" @click="changeToCreateDialog" small color="success">新建场景</v-btn>
            <v-btn class="ml-2" @click="closeSceneListDialog" small>取消</v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'JhScene',
  props: {
    // 初始表单数据
    initFormData: {
      type: Object,
      default: () => ({}),
    },
    // localStorage 存储的 key
    storageKey: {
      type: String,
      default: 'jh-scene-list',
    },
    // 初始场景列表
    scenes: {
      type: Array,
      default: () => [],
    },
    // 当前场景ID
    currentSceneId: {
      type: String,
      default: null,
    },
    // 是否显示操作按钮
    showActionBtn: {
      type: Boolean,
      default: true,
    },
    // 是否使用 localStorage
    useLocalStorage: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      validationRules: {
        requireRules: [(v) => !!v || '此项必填'],
      },
      // 全部场景列表
      sceneList: [],
      // 自定义场景列表
      sceneCustomList: [],
      // 场景操作数据
      deleteItem: {},
      createItem: {
        name: '',
        form: {},
      },
      // 新建场景弹窗
      isCreateSceneDialogShown: false,
      // 场景操作菜单
      isSceneOperationShown: false,
      // 场景管理弹窗
      isSceneListShown: false,
      // 当前场景索引
      currentSceneIndex: 0,
    };
  },
  computed: {
    hasFormSlot() {
      return !!this.$scopedSlots.form;
    },
  },
  watch: {
    scenes: {
      handler(newVal) {
        if (newVal && newVal.length > 0) {
          this.sceneList = [...newVal];
          this.updateCustomSceneList();
        }
      },
      immediate: true,
    },
  },
  created() {
    this.initSceneList();
  },
  methods: {
    // 初始化场景列表
    initSceneList() {
      if (this.useLocalStorage) {
        this.getSceneListFromStorage();
      } else if (this.scenes && this.scenes.length > 0) {
        this.sceneList = [...this.scenes];
      }
      this.updateCustomSceneList();
      this.useDefaultScene();
    },

    // 从 localStorage 获取场景列表
    getSceneListFromStorage() {
      let localSceneList = localStorage.getItem(this.storageKey);
      if (localSceneList == null) localSceneList = '[]';
      localSceneList = JSON.parse(localSceneList);
      this.sceneList = localSceneList;
    },

    // 保存场景列表到 localStorage
    saveSceneListToStorage() {
      if (this.useLocalStorage) {
        localStorage.setItem(this.storageKey, JSON.stringify(this.sceneList));
      }
    },

    // 更新自定义场景列表
    updateCustomSceneList() {
      this.sceneCustomList = this.sceneList.filter((item) => !item.system);
    },

    // 使用默认场景
    useDefaultScene() {
      let defaultScene = this.sceneList.find((item) => item.default === true);
      if (!defaultScene && this.sceneList.length > 0) {
        defaultScene = this.sceneList[0];
      }
      if (defaultScene) {
        this.currentSceneIndex = this.sceneList.findIndex((item) => item.id === defaultScene.id);
        this.useScene(defaultScene);
      }
    },

    // 使用场景
    useScene(scene) {
      this.$emit('scene-change', scene);
    },

    // 处理场景切换
    handleSceneChange(index) {
      this.currentSceneIndex = index;
      if (this.sceneList[index]) {
        this.useScene(this.sceneList[index]);
      }
    },

    // 生成UUID
    getUUID(prefix) {
      const s = [];
      const hexDigits = '0123456789abcdef';
      for (let i = 0; i < 10; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = '4';
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
      const uuid = s.join('');
      return prefix + '-' + uuid;
    },

    // 准备新建场景数据
    prepareCreateSceneData() {
      this.createItem = {
        name: '',
        form: { ...this.initFormData },
        id: this.getUUID('scene'),
      };
    },

    // 打开新建场景对话框
    openCreateSceneDialog() {
      this.prepareCreateSceneData();
      this.isCreateSceneDialogShown = true;
      this.isSceneOperationShown = false;
    },

    // 关闭新建场景对话框
    closeCreateSceneDialog() {
      this.isCreateSceneDialogShown = false;
    },

    // 验证场景名称
    validateSceneName() {
      const newSceneName = this.createItem.name;
      if (!newSceneName) {
        throw new Error('场景名称不能为空');
      }
      const nameExist = this.sceneList.some((item) => item.name === newSceneName);
      if (nameExist) {
        throw new Error('场景名称重复');
      }
    },

    // 创建场景
    doCreateScene() {
      try {
        this.validateSceneName();
        const newScene = { ...this.createItem };
        this.sceneList.push(newScene);
        this.saveSceneListToStorage();
        this.updateCustomSceneList();
        this.closeCreateSceneDialog();

        // 使用新创建的场景
        this.currentSceneIndex = this.sceneList.length - 1;
        this.useScene(newScene);

        this.$emit('scene-created', newScene);
      } catch (error) {
        this.$emit('error', error.message);
      }
    },

    // 打开场景列表对话框
    openSceneListDialog() {
      this.isSceneListShown = true;
      this.isSceneOperationShown = false;
    },

    // 关闭场景列表对话框
    closeSceneListDialog() {
      this.isSceneListShown = false;
    },

    // 切换到新建对话框
    changeToCreateDialog() {
      this.closeSceneListDialog();
      this.openCreateSceneDialog();
    },

    // 删除场景
    doDeleteScene(item) {
      this.deleteItem = { ...item };

      // 如果删除的是当前场景，切换到默认场景
      if (this.sceneList[this.currentSceneIndex]?.id === item.id) {
        this.useDefaultScene();
      }

      this.sceneList = this.sceneList.filter((scene) => scene.id !== item.id);
      this.saveSceneListToStorage();
      this.updateCustomSceneList();

      this.$emit('scene-deleted', item);
    },
  },
};
</script>

<style scoped>
.jh-scene {
  display: inline-block;
}

.scene-manage >>> .scene-item:not(:last-child) {
  border-bottom: 1px solid #eeeeee;
}

.jh-input-label {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  display: block;
  margin-bottom: 8px;
}
</style>
