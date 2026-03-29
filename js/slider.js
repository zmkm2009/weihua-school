// 轮播图功能

class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.arrow.prev');
        this.nextBtn = document.querySelector('.arrow.next');
        this.currentSlide = 0;
        this.interval = null;
        this.autoPlayDelay = 5000; // 5秒自动切换
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {
        // 初始化事件监听
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
        
        // 触摸事件支持（移动端）
        this.setupTouchEvents();
        
        // 键盘导航
        this.setupKeyboardEvents();
        
        // 开始自动播放
        this.startAutoPlay();
        
        // 鼠标悬停时暂停自动播放
        const sliderContainer = document.querySelector('.hero-slider');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => this.stopAutoPlay());
            sliderContainer.addEventListener('mouseleave', () => this.startAutoPlay());
        }
        
        // 初始化轮播图背景（这里使用渐变色作为占位）
        this.initSlideBackgrounds();
    }
    
    initSlideBackgrounds() {
        const slides = document.querySelectorAll('.slide-bg');
        const gradients = [
            'linear-gradient(135deg, #C8102E 0%, #9C0D23 100%)',
            'linear-gradient(135deg, #E6395A 0%, #C8102E 100%)',
            'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
        ];
        
        slides.forEach((bg, index) => {
            if (gradients[index]) {
                bg.style.background = gradients[index];
            }
        });
    }
    
    goToSlide(index) {
        if (this.isAnimating || index === this.currentSlide) return;
        
        this.isAnimating = true;
        
        // 移除当前活动状态
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');
        
        // 更新索引
        this.currentSlide = index;
        
        // 添加新的活动状态
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
        
        // 动画结束后重置状态
        setTimeout(() => {
            this.isAnimating = false;
        }, 800);
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }
    
    startAutoPlay() {
        if (this.interval) return;
        this.interval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }
    
    stopAutoPlay() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
    
    setupTouchEvents() {
        const slider = document.querySelector('.slider-container');
        if (!slider) return;
        
        let touchStartX = 0;
        let touchEndX = 0;
        const minSwipeDistance = 50;
        
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            this.stopAutoPlay();
        }, { passive: true });
        
        slider.addEventListener('touchmove', (e) => {
            touchEndX = e.touches[0].clientX;
        }, { passive: true });
        
        slider.addEventListener('touchend', () => {
            const swipeDistance = touchEndX - touchStartX;
            
            if (Math.abs(swipeDistance) > minSwipeDistance) {
                if (swipeDistance > 0) {
                    // 向右滑动，显示上一张
                    this.prevSlide();
                } else {
                    // 向左滑动，显示下一张
                    this.nextSlide();
                }
            }
            
            this.startAutoPlay();
        });
    }
    
    setupKeyboardEvents() {
        document.addEventListener('keydown', (e) => {
            // 只有当轮播图在视口中时才响应键盘事件
            const slider = document.querySelector('.hero-slider');
            if (!slider) return;
            
            const rect = slider.getBoundingClientRect();
            const isInViewport = (
                rect.top <= window.innerHeight &&
                rect.bottom >= 0
            );
            
            if (!isInViewport) return;
            
            switch (e.key) {
                case 'ArrowLeft':
                    this.prevSlide();
                    break;
                case 'ArrowRight':
                    this.nextSlide();
                    break;
                case ' ':
                    e.preventDefault();
                    this.nextSlide();
                    break;
            }
        });
    }
    
    // 销毁实例
    destroy() {
        this.stopAutoPlay();
        // 移除所有事件监听器...
    }
}

// 页面加载完成后初始化轮播图
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new HeroSlider();
    });
} else {
    new HeroSlider();
}

// 导出类供其他模块使用
export default HeroSlider;
