window.BusinessDemoView = {
  template: `
    <div class="page-container">
      <v-tabs v-model="activeTab">
        <v-tab>Markdown 编辑器</v-tab>
        <v-tab>JSON 编辑器</v-tab>
        <v-tab>文件上传</v-tab>
      </v-tabs>

      <v-tabs-items v-model="activeTab" class="mt-4">
        <!-- Markdown Editor -->
        <v-tab-item>
          <jh-card title="Markdown 编辑器演示" class="pa-4">
             <v-alert type="info" text dense>
               jh-markdown-editor 是基于 v-md-editor 的封装，支持预览和编辑。
             </v-alert>
             <div style="height: 500px">
                <!-- Fallback to textarea if component not available in this demo build, 
                     but assuming standard usage -->
                <jh-markdown-editor 
                  v-model="markdownContent" 
                  height="400px"
                  placeholder="请输入 Markdown 内容..."
                ></jh-markdown-editor>
             </div>
             <div class="mt-4">
               <h3>内容预览：</h3>
               <pre class="grey lighten-4 pa-2">{{ markdownContent }}</pre>
             </div>
          </jh-card>
        </v-tab-item>

        <!-- JSON Editor -->
        <v-tab-item>
          <jh-card title="JSON 编辑器演示" class="pa-4">
            <v-alert type="info" text dense>
               jh-json-editor 支持 JSON 格式化、验证和高亮。
             </v-alert>
            <v-row>
              <v-col cols="6">
                <jh-json-editor
                  v-model="jsonData"
                  height="400px"
                  mode="code"
                ></jh-json-editor>
              </v-col>
              <v-col cols="6">
                <h3>当前数据对象：</h3>
                <pre class="grey lighten-4 pa-2" style="max-height: 400px; overflow: auto">{{ jsonData }}</pre>
              </v-col>
            </v-row>
          </jh-card>
        </v-tab-item>

        <!-- File Input -->
        <v-tab-item>
          <jh-card title="文件上传演示" class="pa-4">
            <v-alert type="info" text dense>
               jh-file-input 是对 v-file-input 的增强，支持预览和文件类型限制。
             </v-alert>
            <v-row>
              <v-col cols="12" md="6">
                <jh-file-input
                  v-model="file1"
                  label="单文件上传"
                  placeholder="请选择文件"
                  show-size
                  counter
                ></jh-file-input>
              </v-col>
              <v-col cols="12" md="6">
                <jh-file-input
                  v-model="files"
                  label="多文件上传 (图片)"
                  multiple
                  accept="image/*"
                  prepend-icon="mdi-camera"
                  show-size
                ></jh-file-input>
              </v-col>
            </v-row>
            
            <div class="mt-4" v-if="file1 || (files && files.length)">
              <h3>已选择文件：</h3>
              <ul class="pl-4">
                <li v-if="file1">单文件: {{ file1.name }} ({{ (file1.size/1024).toFixed(2) }} KB)</li>
                <li v-for="f in files" :key="f.name">多文件: {{ f.name }} ({{ (f.size/1024).toFixed(2) }} KB)</li>
              </ul>
            </div>
          </jh-card>
        </v-tab-item>
      </v-tabs-items>
    </div>
  `,
  data() {
    return {
      activeTab: 0,
      
      // Markdown Data
      markdownContent: '# Hello Jianghu UI\n\n这是一个 **Markdown** 编辑器演示。\n\n- 支持列表\n- 支持代码块\n- 支持预览',
      
      // JSON Data
      jsonData: {
        project: "Jianghu UI Demo",
        version: "1.0.0",
        features: ["Components", "Layouts", "Utilities"],
        active: true
      },
      
      // File Data
      file1: null,
      files: []
    };
  }
};
