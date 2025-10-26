// Slider functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

// Auto play interval (5 seconds)
let autoPlayInterval;

// Initialize slider
function initSlider() {
    showSlide(currentSlideIndex);
    startAutoPlay();
}

// Show specific slide
function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

// Next slide
function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    showSlide(currentSlideIndex);
}

// Previous slide
function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentSlideIndex);
}

// Change slide (called by navigation buttons)
function changeSlide(direction) {
    stopAutoPlay();
    if (direction === 1) {
        nextSlide();
    } else {
        prevSlide();
    }
    startAutoPlay();
}

// Go to specific slide (called by dots)
function currentSlide(index) {
    stopAutoPlay();
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
    startAutoPlay();
}

// Start auto play
function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000);
}

// Stop auto play
function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Pause auto play when hovering over slider
function pauseOnHover() {
    const sliderContainer = document.querySelector('.slider-container');
    
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoPlay);
        sliderContainer.addEventListener('mouseleave', startAutoPlay);
    }
}

// Product quantity management
function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    let currentValue = parseInt(quantityInput.value);
    if (currentValue < 10) {
        quantityInput.value = currentValue + 1;
    }
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    let currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }
}

// Buy now functionality
function buyNow() {
    const quantity = document.getElementById('quantity').value;
    const productName = "Nutricosmetics Premium Collection";
    const price = "1.299.000 VNĐ";
    
    // Show confirmation dialog
    const confirmed = confirm(
        `Xác nhận mua hàng:\n\n` +
        `Sản phẩm: ${productName}\n` +
        `Số lượng: ${quantity}\n` +
        `Giá: ${price} x ${quantity}\n\n` +
        `Bạn có muốn tiếp tục thanh toán không?`
    );
    
    if (confirmed) {
        // Simulate redirect to checkout page
        alert('Đang chuyển hướng đến trang thanh toán...');
        // In real application, you would redirect to checkout page
        // window.location.href = '/checkout';
        
        // For demo, show success message
        setTimeout(() => {
            alert('Cảm ơn bạn đã mua hàng! Chúng tôi sẽ liên hệ xác nhận đơn hàng sớm nhất.');
        }, 1000);
    }
}

// Add to cart functionality
function addToCart() {
    const quantity = document.getElementById('quantity').value;
    const productName = "Nutricosmetics Premium Collection";
    
    // Animate add to cart button
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    const originalText = addToCartBtn.innerHTML;
    
    addToCartBtn.innerHTML = '<i class="fas fa-check"></i> Đã thêm!';
    addToCartBtn.style.background = '#28a745';
    addToCartBtn.style.color = 'white';
    addToCartBtn.style.border = '2px solid #28a745';
    
    // Show notification
    showNotification(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
    
    // Reset button after 2 seconds
    setTimeout(() => {
        addToCartBtn.innerHTML = originalText;
        addToCartBtn.style.background = '';
        addToCartBtn.style.color = '';
        addToCartBtn.style.border = '';
    }, 2000);
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: bold;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Mobile navigation menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header background opacity on scroll
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.feature-card, .about-text, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Contact form handling
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (name && email && message) {
                // Show success message (you can customize this)
                showNotification('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
                
                // Reset form
                this.reset();
            } else {
                alert('Vui lòng điền đầy đủ thông tin.');
            }
        });
    }
}

// Keyboard navigation for slider
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    });
}

// Touch/swipe support for mobile
function initTouchSupport() {
    const slider = document.querySelector('.slider');
    let startX = 0;
    let endX = 0;
    
    if (slider) {
        slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        slider.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const threshold = 50; // Minimum swipe distance
            
            if (startX - endX > threshold) {
                // Swipe left - next slide
                changeSlide(1);
            } else if (endX - startX > threshold) {
                // Swipe right - previous slide
                changeSlide(-1);
            }
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initSlider();
    pauseOnHover();
    initMobileMenu();
    initSmoothScrolling();
    initHeaderScroll();
    initScrollAnimations();
    initContactForm();
    initKeyboardNavigation();
    initTouchSupport();
});

// Handle page visibility change (pause slider when tab is not active)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        stopAutoPlay();
    } else {
        startAutoPlay();
    }
});

// Preload images for better performance
function preloadImages() {
    const imageUrls = [
        'images/1.png',
        'images/2.png',
        'images/3.png',
        'images/4.png',
        'images/5.png'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Call preload images
preloadImages();