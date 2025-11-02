import JhTableAttachment from './JhTableAttachment.vue';

export default {
  title: '基础组件/JhTableAttachment - 附件表格',
  component: JhTableAttachment,
  tags: ['autodocs'],
  argTypes: {
    attachments: {
      control: 'object',
      description: '附件列表数据',
    },
    showCreateButton: {
      control: 'boolean',
      description: '是否显示新增按钮',
    },
    readonly: {
      control: 'boolean',
      description: '是否只读模式',
    },
    groupBy: {
      control: 'text',
      description: '分组字段名',
    },
    previewPrefix: {
      control: 'text',
      description: '预览路径前缀',
    },
    loading: {
      control: 'boolean',
      description: '是否加载中',
    },
  },
};

const sampleAttachments = [
  {
    id: 1,
    filename: '合同文档.pdf',
    downloadPath: 'documents/contract.pdf',
    fileType: '合同文件',
    fileSubtype: 'pdf'
  },
  {
    id: 2,
    filename: '产品图片1.jpg',
    downloadPath: 'images/product1.jpg',
    fileType: '产品图片',
    fileSubtype: 'jpg'
  },
  {
    id: 3,
    filename: '产品图片2.png',
    downloadPath: 'images/product2.png',
    fileType: '产品图片',
    fileSubtype: 'png'
  },
  {
    id: 4,
    filename: '技术文档.docx',
    downloadPath: 'documents/tech.docx',
    fileType: '技术资料',
    fileSubtype: 'docx'
  },
  {
    id: 5,
    filename: '财务报表.xlsx',
    downloadPath: 'documents/financial.xlsx',
    fileType: '财务文件',
    fileSubtype: 'xlsx'
  },
  {
    id: 6,
    filename: '宣传海报.jpg',
    downloadPath: 'images/poster.jpg',
    fileType: '产品图片',
    fileSubtype: 'jpg'
  },
];

export const 基础示例 = {
  args: {
    attachments: sampleAttachments,
    showCreateButton: true,
    readonly: false,
    groupBy: 'fileType',
    previewPrefix: '/upload/',
    loading: false,
  },
};

export const 空数据 = {
  args: {
    attachments: [],
    showCreateButton: true,
    readonly: false,
    groupBy: 'fileType',
    previewPrefix: '/upload/',
    loading: false,
  },
};

export const 加载状态 = {
  args: {
    attachments: [],
    showCreateButton: true,
    readonly: false,
    groupBy: 'fileType',
    previewPrefix: '/upload/',
    loading: true,
  },
};

export const 只读模式 = {
  args: {
    attachments: sampleAttachments,
    showCreateButton: false,
    readonly: true,
    groupBy: 'fileType',
    previewPrefix: '/upload/',
    loading: false,
  },
};

export const 仅图片 = {
  args: {
    attachments: [
      {
        id: 1,
        filename: '风景照片1.jpg',
        downloadPath: 'photos/landscape1.jpg',
        fileType: '风景照片',
        fileSubtype: 'jpg'
      },
      {
        id: 2,
        filename: '风景照片2.jpg',
        downloadPath: 'photos/landscape2.jpg',
        fileType: '风景照片',
        fileSubtype: 'jpg'
      },
      {
        id: 3,
        filename: '人物照片1.png',
        downloadPath: 'photos/portrait1.png',
        fileType: '人物照片',
        fileSubtype: 'png'
      },
      {
        id: 4,
        filename: '人物照片2.png',
        downloadPath: 'photos/portrait2.png',
        fileType: '人物照片',
        fileSubtype: 'png'
      },
    ],
    showCreateButton: true,
    readonly: false,
    groupBy: 'fileType',
    previewPrefix: '/upload/',
    loading: false,
  },
};

export const CustomGroupBy = {
  args: {
    attachments: [
      {
        id: 1,
        filename: 'report-q1.pdf',
        downloadPath: 'reports/q1.pdf',
        fileType: '报告',
        fileSubtype: 'pdf',
        year: '2024'
      },
      {
        id: 2,
        filename: 'report-q2.pdf',
        downloadPath: 'reports/q2.pdf',
        fileType: '报告',
        fileSubtype: 'pdf',
        year: '2024'
      },
      {
        id: 3,
        filename: 'report-q1.pdf',
        downloadPath: 'reports/2025-q1.pdf',
        fileType: '报告',
        fileSubtype: 'pdf',
        year: '2025'
      },
    ],
    showCreateButton: true,
    readonly: false,
    groupBy: 'year',
    previewPrefix: '/upload/',
    loading: false,
  },
};
