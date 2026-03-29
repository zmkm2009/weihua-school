/**
 * 网站内容自动生成工具
 * 从 data.json 读取数据并更新网站内容
 */

// 读取数据配置文件
async function loadConfig() {
    try {
        const response = await fetch('data.json');
        const config = await response.json();
        return config;
    } catch (error) {
        console.error('加载配置文件失败:', error);
        return null;
    }
}

// 更新新闻动态
function updateNews(config) {
    if (!config.news) return;

    const updateColumn = (selector, newsList) => {
        const container = document.querySelector(selector);
        if (!container) return;

        const newsItems = container.querySelectorAll('.news-item');
        newsList.forEach((news, index) => {
            if (newsItems[index]) {
                const dateElement = newsItems[index].querySelector('.news-date');
                const titleElement = newsItems[index].querySelector('.news-title');
                
                if (dateElement) dateElement.textContent = news.date;
                if (titleElement) {
                    titleElement.textContent = news.title;
                    titleElement.href = news.link || '#';
                }
            }
        });
    };

    updateColumn('.news-column:nth-child(1) ul', config.news.latest);
    updateColumn('.news-column:nth-child(2) ul', config.news.campus);
    updateColumn('.news-column:nth-child(3) ul', config.news.achievements);
}

// 更新统计数据
function updateStats(config) {
    if (!config.stats) return;

    const statItems = document.querySelectorAll('.stat-item');
    const statValues = [config.stats.students, config.stats.teachers, config.stats.courses, config.stats.satisfaction];
    
    statItems.forEach((item, index) => {
        const numberElement = item.querySelector('.stat-number');
        if (numberElement && statValues[index]) {
            numberElement.setAttribute('data-count', statValues[index]);
        }
    });

    // 重新触发计数动画
    if (typeof animateCounter === 'function') {
        animateCounter();
    }
}

// 更新学校基本信息
function updateSchoolInfo(config) {
    if (!config.school) return;

    // 更新页面标题
    document.title = `${config.school.name} - ${config.school.slogan}`;

    // 更新联系信息
    const phoneElements = document.querySelectorAll('.school-phone');
    phoneElements.forEach(el => {
        el.textContent = config.school.phone;
    });

    const emailElements = document.querySelectorAll('.school-email');
    emailElements.forEach(el => {
        el.textContent = config.school.email;
    });

    const addressElements = document.querySelectorAll('.school-address');
    addressElements.forEach(el => {
        el.textContent = config.school.address;
    });
}

// 主初始化函数
async function init() {
    const config = await loadConfig();
    if (!config) return;

    updateNews(config);
    updateStats(config);
    updateSchoolInfo(config);

    console.log('✅ 网站内容已从配置文件更新');
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', init);
