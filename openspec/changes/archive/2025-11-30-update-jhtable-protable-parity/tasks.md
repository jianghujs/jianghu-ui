1. [x] **列 schema 能力**
   - [x] 扩展 `JhTable` 的 `headers`/列定义，覆盖 `valueType`、`valueEnum`、`valueEnumStatusMap`、`valueFormatter`、`valueProps`、`search` 字段
   - [x] 将 `valueType` 映射到默认渲染器（文本/金额/百分比/进度/状态/日期/JSON/索引等）与自动筛选控件，复用 `JhFormFields`
   - [x] 默认根据列 `search` 设置自动注入 JhQueryFilter，支持 `transform`、`initialValue`、`valueEnumKey` 并提供 `autoFilterFromHeaders` 开关
   - [x] Storybook 增加「列 schema」示例，README 同步记录语义字段与迁移指引
