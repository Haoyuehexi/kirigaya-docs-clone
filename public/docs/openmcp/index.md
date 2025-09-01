# OpenMCP 官方教程

> Model Context Protocol (MCP) - 连接AI助手与数据源的开放标准

## 什么是 MCP？

Model Context Protocol (MCP) 是一个开放的标准，旨在为AI助手和数据源之间的连接提供统一的接口。通过MCP，开发者可以轻松地将各种数据源（如数据库、API、文件系统等）连接到AI应用中。

## 核心特性

### 🔌 统一接口
- 标准化的协议规范
- 支持多种数据源类型
- 简化集成复杂度

### 🚀 高性能
- 异步通信机制
- 优化的数据传输
- 支持流式处理

### 🛡️ 安全可靠
- 内置安全验证
- 权限控制系统
- 数据加密传输

## 快速开始

### 1. 安装

```bash
npm install openmcp
# 或
pip install openmcp
```

### 2. 基本使用

```python
from openmcp import MCPClient

# 创建客户端
client = MCPClient("ws://localhost:8080")

# 连接数据源
await client.connect()

# 查询数据
result = await client.query("SELECT * FROM users")
print(result)
```

### 3. 配置数据源

```yaml
# mcp-config.yaml
datasources:
  - name: "main_db"
    type: "postgresql"
    connection: "postgresql://user:pass@localhost/db"
  
  - name: "redis_cache"
    type: "redis"
    connection: "redis://localhost:6379"
```

## 高级特性

### 自定义适配器

```python
from openmcp import BaseAdapter

class CustomAdapter(BaseAdapter):
    async def query(self, sql):
        # 自定义查询逻辑
        return await self.execute(sql)
    
    async def connect(self):
        # 自定义连接逻辑
        pass
```

### 中间件支持

```python
from openmcp.middleware import AuthMiddleware, LoggingMiddleware

client = MCPClient("ws://localhost:8080")
client.use(AuthMiddleware(token="your-token"))
client.use(LoggingMiddleware(level="DEBUG"))
```

## 最佳实践

1. **连接池管理**: 使用连接池提高性能
2. **错误处理**: 实现完善的错误恢复机制
3. **监控告警**: 添加系统监控和告警
4. **安全考虑**: 始终使用加密连接和身份验证

## 更多资源

- [GitHub 仓库](https://github.com/openmcp/openmcp)
- [API 文档](https://docs.openmcp.org/api)
- [社区讨论](https://discord.gg/openmcp)
- [示例项目](https://github.com/openmcp/examples)

---

*最后更新: 2025-04-22*