export interface Document {
  id: string;
  title: string;
  description?: string;
  date: string;
  tags: string[];
  category: string;
}

export const documents: Document[] = [
  {
    id: "openmcp",
    title: "OpenMCP 官方教程",
    description: "MCP（Model Context Protocol）是一个开放的标准，用于连接AI助手与数据源。学习如何使用OpenMCP构建强大的AI应用。",
    date: "2025-04-22",
    tags: ["mcp", "大模型", "技术文档"],
    category: "技术",
  },
  {
    id: "torchood",
    title: "torchood 使用文档",
    description: "torchood是一个Python深度学习工具库，提供了丰富的神经网络组件和训练工具。快速上手深度学习开发。",
    date: "2024-12-16",
    tags: ["python", "我的开源作品", "技术文档"],
    category: "技术",
  },
  {
    id: "rust-nom",
    title: "Rust Nom 教程 (Nominomicon)",
    description: "Nom是Rust中最强大的解析器组合子库。从基础到高级，掌握用Nom构建高性能解析器的技巧。",
    date: "2024-11-28",
    tags: ["rust", "技术文档"],
    category: "技术",
  },
  {
    id: "i18n-haru",
    title: "i18n Haru 使用教程",
    description: "i18n Haru是一个轻量级的国际化解决方案，支持多种框架。轻松实现应用的多语言支持。",
    date: "2024-11-18",
    tags: ["i18n", "我的开源作品", "技术文档"],
    category: "技术",
  },
  {
    id: "rust-tutorial",
    title: "Rust 程序设计语言（2021 edition）简体中文版",
    description: "Rust官方教程的简体中文版本，涵盖Rust语言的所有核心概念，从入门到精通的完整指南。",
    date: "2024-09-19",
    tags: ["rust", "技术文档"],
    category: "技术",
  },
  {
    id: "live2d-render",
    title: "Live2dRender 文档",
    description: "Live2dRender是一个高性能的Live2D渲染引擎，支持Web和桌面应用。创建生动的2D动画角色。",
    date: "2024-06-26",
    tags: ["live2d", "我的开源作品", "技术文档"],
    category: "技术",
  },
  {
    id: "lagrange-onebot",
    title: "Lagrange.onebot 文档",
    description: "基于Lagrange核心的OneBot实现，提供稳定的QQ机器人开发接口。支持最新的QQ协议。",
    date: "2024-06-01",
    tags: ["qq", "我的开源作品", "技术文档"],
    category: "技术",
  },
  {
    id: "cpp-features",
    title: "C++ 新特性",
    description: "深入了解现代C++的新特性，从C++11到C++23，掌握最新的语言特性和最佳实践。",
    date: "2024-05-20",
    tags: ["C++", "技术文档"],
    category: "技术",
  },
  {
    id: "interpretation-of-dreams",
    title: "梦的解析",
    description: "弗洛伊德经典著作《梦的解析》的深度解读，探索潜意识世界和精神分析学的核心理论。",
    date: "2024-03-02",
    tags: ["精神分析学派", "心理学"],
    category: "读物",
  },
  {
    id: "lake",
    title: "湖",
    description: "川端康成短篇小说《湖》的文学赏析，感受日本文学独特的美学和深邃的人性洞察。",
    date: "2023-08-19",
    tags: ["日本文学", "川端康成"],
    category: "读物",
  }
];

export const categories = [
  { name: "技术", count: 8 },
  { name: "读物", count: 2 },
];