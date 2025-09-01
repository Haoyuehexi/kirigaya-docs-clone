# torchood 使用文档

> 一个轻量级的PyTorch深度学习工具库

## 简介

torchood 是一个基于PyTorch的深度学习工具库，提供了丰富的神经网络组件、训练工具和实用函数，帮助开发者快速构建和训练深度学习模型。

## 安装

```bash
pip install torchood
```

或从源码安装：

```bash
git clone https://github.com/username/torchood.git
cd torchood
pip install -e .
```

## 快速开始

### 创建一个简单的神经网络

```python
import torch
import torch.nn as nn
from torchood import Sequential, Linear, ReLU, Dropout

# 使用torchood创建模型
model = Sequential(
    Linear(784, 512),
    ReLU(),
    Dropout(0.2),
    Linear(512, 256),
    ReLU(),
    Dropout(0.2),
    Linear(256, 10)
)

print(model)
```

### 训练配置

```python
from torchood.training import Trainer
from torchood.optimizers import AdamW
from torchood.schedulers import CosineAnnealingLR

# 创建训练器
trainer = Trainer(
    model=model,
    optimizer=AdamW(model.parameters(), lr=0.001),
    scheduler=CosineAnnealingLR(optimizer, T_max=100),
    device='cuda' if torch.cuda.is_available() else 'cpu'
)

# 开始训练
trainer.fit(
    train_loader=train_loader,
    val_loader=val_loader,
    epochs=100
)
```

## 核心功能

### 1. 模型组件

#### 注意力机制
```python
from torchood.attention import MultiHeadAttention

attention = MultiHeadAttention(
    embed_dim=512,
    num_heads=8,
    dropout=0.1
)
```

#### 卷积层
```python
from torchood.conv import DepthwiseSeparableConv2d

conv = DepthwiseSeparableConv2d(
    in_channels=64,
    out_channels=128,
    kernel_size=3,
    padding=1
)
```

### 2. 损失函数

```python
from torchood.losses import FocalLoss, LabelSmoothingLoss

# Focal Loss for imbalanced datasets
focal_loss = FocalLoss(alpha=1, gamma=2)

# Label Smoothing
smooth_loss = LabelSmoothingLoss(classes=10, smoothing=0.1)
```

### 3. 数据增强

```python
from torchood.augmentation import MixUp, CutMix

# MixUp augmentation
mixup = MixUp(alpha=0.2)
mixed_x, mixed_y = mixup(x, y)

# CutMix augmentation
cutmix = CutMix(alpha=1.0)
mixed_x, mixed_y = cutmix(x, y)
```

### 4. 模型工具

```python
from torchood.utils import count_parameters, model_summary

# 统计参数数量
params = count_parameters(model)
print(f"Total parameters: {params:,}")

# 模型摘要
model_summary(model, input_size=(1, 3, 224, 224))
```

## 高级特性

### 分布式训练

```python
from torchood.distributed import DistributedTrainer

trainer = DistributedTrainer(
    model=model,
    world_size=4,
    rank=0
)
```

### 模型量化

```python
from torchood.quantization import quantize_model

# 动态量化
quantized_model = quantize_model(model, method='dynamic')

# 静态量化
quantized_model = quantize_model(
    model, 
    method='static',
    calibration_loader=cal_loader
)
```

### 知识蒸馏

```python
from torchood.distillation import KnowledgeDistillation

# 创建蒸馏训练器
distiller = KnowledgeDistillation(
    teacher_model=teacher,
    student_model=student,
    temperature=4.0,
    alpha=0.7
)

distiller.train(train_loader, epochs=50)
```

## API 参考

### 核心类

- `Sequential`: 顺序容器
- `Trainer`: 训练器
- `DataLoader`: 数据加载器
- `Optimizer`: 优化器包装

### 工具函数

- `save_checkpoint()`: 保存检查点
- `load_checkpoint()`: 加载检查点
- `seed_everything()`: 设置随机种子
- `get_device()`: 获取设备信息

## 示例项目

查看 [examples](https://github.com/username/torchood/tree/main/examples) 目录获取完整示例：

- 图像分类 (CIFAR-10)
- 目标检测 (COCO)
- 语义分割 (Cityscapes)
- 自然语言处理 (BERT fine-tuning)

## 贡献指南

欢迎贡献代码！请查看 [CONTRIBUTING.md](https://github.com/username/torchood/blob/main/CONTRIBUTING.md) 了解详细信息。

---

*最后更新: 2024-12-16*