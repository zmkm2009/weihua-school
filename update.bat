@echo off
chcp 65001 >nul
cd /d "c:\Users\luca\WorkBuddy\Claw\weihua-school"

echo ═══════════════════════════════════════
echo      为华学校官网 - 一键更新工具
echo ═══════════════════════════════════════
echo.

echo 📝 请输入更新描述...
echo.
set /p desc="更新内容： "

echo.
echo 📦 正在添加文件...
git add data.json
git add images/
git add *.html

if %errorlevel% neq 0 (
    echo ❌ 添加文件失败！
    pause
    exit /b 1
)

echo.
echo 🚀 正在提交更改...
git commit -m "%desc%"

if %errorlevel% neq 0 (
    echo ⚠️  没有需要提交的更改
    echo.
    echo 💡 提示：请先修改 data.json 或添加新图片
    echo.
    pause
    exit /b 0
)

echo.
echo 📤 正在推送到 GitHub...
git push

if %errorlevel% neq 0 (
    echo ❌ 推送失败！请检查网络连接
    pause
    exit /b 1
)

echo.
echo ═══════════════════════════════════════
echo ✅ 更新成功！
echo.
echo 🌐 网站地址：https://zmkm2009.github.io/weihua-school/
echo ⏰  请等待 1-2 分钟让 GitHub Pages 自动部署
echo.
echo 💡 提示：更新后按 Ctrl+Shift+R 强制刷新浏览器
echo ═══════════════════════════════════════
echo.
pause
