# 为华学校官网 - 简易更新指南

## 🎯 最简单的更新方法

### 一、更新数据（推荐）

只需修改 `data.json` 文件，网站会自动更新！

#### 步骤 1：编辑 data.json

```json
{
  "news": {
    "latest": [
      {
        "date": "2025-03-29",
        "title": "2025年春季招生简章发布",
        "link": "#admissions"
      }
    ]
  }
}
```

#### 步骤 2：推送更新

```powershell
cd "c:\Users\luca\WorkBuddy\Claw\weihua-school"
git add data.json
git commit -m "更新新闻动态"
git push
```

#### 步骤 3：等待部署（1-2分钟）

访问：https://zmkm2009.github.io/weihua-school/

---

### 二、快速更新脚本

创建一个批处理文件，一键更新：

**文件名**：`update.bat`

```batch
@echo off
chcp 65001 >nul
cd /d "c:\Users\luca\WorkBuddy\Claw\weihua-school"

echo 📝 请输入更新描述...
set /p desc=

echo.
echo 📦 正在添加文件...
git add data.json

echo 🚀 正在提交更改...
git commit -m "%desc%"

echo 📤 正在推送到 GitHub...
git push

echo.
echo ✅ 更新成功！
echo 🌐 访问网站：https://zmkm2009.github.io/weihua-school/
echo.
pause
```

**使用方法**：

1. 先编辑 `data.json` 文件
2. 双击 `update.bat`
3. 输入更新描述
4. 等待完成

---

### 三、data.json 配置说明

#### 1. 新闻动态

```json
{
  "news": {
    "latest": [           // 最新通知
      {"date": "2025-03-29", "title": "标题", "link": "#"}
    ],
    "campus": [           // 校园新闻
      {"date": "2025-03-28", "title": "标题", "link": "#"}
    ],
    "achievements": [     // 教学成果
      {"date": "2025-03-20", "title": "标题", "link": "#"}
    ]
  }
}
```

#### 2. 统计数据

```json
{
  "stats": {
    "students": 500,      // 在校生人数
    "teachers": 100,      // 教师人数
    "courses": 50,        // 课程数量
    "satisfaction": 98     // 家长满意度（百分比）
  }
}
```

#### 3. 学校信息

```json
{
  "school": {
    "name": "为华学校",
    "phone": "010-12345678",
    "email": "contact@weihua-school.com",
    "address": "北京市海淀区中关村大街123号"
  }
}
```

---

### 四、图片更新

#### 放置图片

```
weihua-school/
└── images/
    ├── banner/           # 轮播图（1920x1080）
    ├── teachers/        # 教师照片（300x400）
    ├── about/           # 校园风景（1200x800）
    ├── activities/      # 活动照片（800x600）
    └── courses/         # 课程图片（600x400）
```

#### 更新图片

1. 将新图片放到对应目录
2. 运行 `update.bat` 脚本

---

### 五、常见问题

#### Q: 修改 data.json 后网站没有更新？

A: 1. 检查 JSON 格式是否正确（使用工具：https://jsonlint.com/）
   2. 刷新浏览器（Ctrl+Shift+R）
   3. 等待 1-2 分钟让 GitHub Pages 部署完成

#### Q: 如何修改网站结构？

A: 需要编辑对应的 HTML 文件，然后推送更新。

#### Q: 如何备份网站？

A: 
```powershell
git push origin backup-$(get-date -Format 'yyyy-MM-dd')
```

---

### 六、更新频率建议

| 内容 | 更新频率 | 位置 |
|------|---------|------|
| 新闻动态 | 每周 | data.json |
| 统计数据 | 每月 | data.json |
| 图片 | 每季度 | images/ 目录 |
| 页面内容 | 每年 | HTML 文件 |

---

## 📞 技术支持

如有问题，请检查：
1. 文件格式是否正确（JSON、HTML）
2. 网络连接是否正常
3. Git 和 GitHub 权限是否正常

---

**大王，现在只需修改 `data.json` 文件，然后运行 `update.bat` 就能轻松更新网站了！** 🎉
