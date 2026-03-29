// 数字计数动画功能

class CounterAnimation {
    constructor(options = {}) {
        this.duration = options.duration || 2000; // 动画持续时间（毫秒）
        this.startValue = options.startValue || 0;
        this.easeFunction = options.easeFunction || this.easeOutQuart;
        this.endedCallback = options.endedCallback || null;
    }
    
    // 缓动函数 - 四次方缓出
    easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }
    
    // 缓动函数 - 二次方缓出
    easeOutQuad(t) {
        return t * (2 - t);
    }
    
    // 缓动函数 - 指数缓出
    easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }
    
    animate(element, targetValue) {
        const startTime = performance.now();
        const elementValue = this.startValue;
        const difference = targetValue - elementValue;
        
        const updateCount = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / this.duration, 1);
            const easeProgress = this.easeFunction(progress);
            const currentCount = Math.floor(elementValue + difference * easeProgress);
            
            // 更新显示
            element.textContent = currentCount;
            element.classList.add('animate');
            
            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                // 动画结束
                element.textContent = targetValue;
                element.classList.add('complete');
                if (this.endedCallback) {
                    this.endedCallback(element);
                }
            }
        };
        
        requestAnimationFrame(updateCount);
    }
}

// 检测元素是否进入视口
class IntersectionObserverManager {
    constructor(callback, options = {}) {
        this.observer = new IntersectionObserver(callback, {
            root: null,
            rootMargin: '0px',
            threshold: options.threshold || 0.2
        });
    }
    
    observe(element) {
        this.observer.observe(element);
    }
    
    unobserve(element) {
        this.observer.unobserve(element);
    }
    
    disconnect() {
        this.observer.disconnect();
    }
}

// 统计数字管理器
class StatsCounter {
    constructor() {
        this.counterAnimation = new CounterAnimation({
            duration: 2500,
            easeFunction: (t) => {
                // 自定义缓动函数 - 快速启动，缓慢结束
                return 1 - Math.pow(1 - t, 5);
            }
        });
        this.observer = new IntersectionObserverManager((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const targetValue = parseInt(element.getAttribute('data-target'));
                    
                    if (targetValue && !element.classList.contains('counted')) {
                        this.counterAnimation.animate(element, targetValue);
                        element.classList.add('counted');
                        this.observer.unobserve(element);
                    }
                }
            });
        }, { threshold: 0.5 });
        
        this.init();
    }
    
    init() {
        // 查找所有需要计数的数字元素
        const statNumbers = document.querySelectorAll('.stat-number[data-target]');
        
        statNumbers.forEach(number => {
            this.observer.observe(number);
        });
    }
    
    // 手动触发计数动画
    animate(element) {
        const targetValue = parseInt(element.getAttribute('data-target'));
        if (targetValue) {
            this.counterAnimation.animate(element, targetValue);
            element.classList.add('counted');
        }
    }
    
    // 重新计数
    reset() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(number => {
            number.textContent = '0';
            number.classList.remove('counted', 'complete', 'animate');
            this.observer.observe(number);
        });
    }
    
    // 销毁实例
    destroy() {
        this.observer.disconnect();
    }
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new StatsCounter();
    });
} else {
    new StatsCounter();
}

// 导出类供其他模块使用
export { CounterAnimation, StatsCounter };
