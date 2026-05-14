// Slider functionality
let currentSlideIndex = 0;
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const thumbnails = document.querySelectorAll('.thumbnail');
const totalSlides = slides.length;
const buyModal = document.getElementById('buyModal');
const buyForm = document.getElementById('buyForm');
const modalQuantityInput = document.getElementById('modalQuantity');

// Auto play interval (4 seconds)
let autoPlayInterval;
let isTransitioning = false;

// Initialize slider
function initSlider() {
    showSlide(currentSlideIndex);
    startAutoPlay();
    addTouchSupport();
    addThumbnailEvents();
    addKeyboardNavigation();
}

// Add keyboard navigation
function addKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (isTransitioning) return;

        const sliderSection = document.querySelector('.slider-section');
        const rect = sliderSection.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;

        if (!isInView) return;

        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                stopAutoPlay();
                prevSlide();
                startAutoPlay();
                break;
            case 'ArrowRight':
                e.preventDefault();
                stopAutoPlay();
                nextSlide();
                startAutoPlay();
                break;
            case 'ArrowUp':
                e.preventDefault();
                stopAutoPlay();
                currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
                showSlide(currentSlideIndex);
                startAutoPlay();
                break;
            case 'ArrowDown':
                e.preventDefault();
                stopAutoPlay();
                currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
                showSlide(currentSlideIndex);
                startAutoPlay();
                break;
        }
    });
}

// Add thumbnail hover effects
function addThumbnailEvents() {
    thumbnails.forEach((thumbnail, index) => {
        // Hover effects
        thumbnail.addEventListener('mouseenter', () => {
            if (!isTransitioning && index !== currentSlideIndex) {
                thumbnail.style.transform = 'scale(1.1)';
                thumbnail.style.zIndex = '10';
            }
        });

        thumbnail.addEventListener('mouseleave', () => {
            if (!thumbnail.classList.contains('active')) {
                thumbnail.style.transform = 'scale(1)';
                thumbnail.style.zIndex = '1';
            }
        });

        // Click event
        thumbnail.addEventListener('click', () => {
            if (!isTransitioning) {
                stopAutoPlay();
                currentSlideIndex = index;
                showSlide(currentSlideIndex);
                startAutoPlay();
            }
        });
    });
}

// Show specific slide
function showSlide(index) {
    if (isTransitioning) return;

    isTransitioning = true;

    // Update slider position with smooth transform
    const translateX = -index * 20; // 20% per slide
    slider.style.transform = `translateX(${translateX}%)`;

    // Update dots
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) {
        dots[index].classList.add('active');
    }

    // Update thumbnails
    thumbnails.forEach(thumbnail => thumbnail.classList.remove('active'));
    if (thumbnails[index]) {
        thumbnails[index].classList.add('active');
        // Scroll thumbnail into view if needed
        scrollThumbnailIntoView(index);
    }

    // Reset transition flag after animation
    setTimeout(() => {
        isTransitioning = false;
    }, 800);
}

// Scroll thumbnail into view
function scrollThumbnailIntoView(index) {
    const thumbnailsColumn = document.querySelector('.thumbnails-column');
    const thumbnail = thumbnails[index];

    if (thumbnailsColumn && thumbnail) {
        const columnHeight = thumbnailsColumn.clientHeight;
        const thumbnailHeight = thumbnail.offsetHeight;
        const thumbnailTop = thumbnail.offsetTop;
        const scrollTop = thumbnailsColumn.scrollTop;

        if (thumbnailTop < scrollTop) {
            thumbnailsColumn.scrollTop = thumbnailTop - 15;
        } else if (thumbnailTop + thumbnailHeight > scrollTop + columnHeight) {
            thumbnailsColumn.scrollTop = thumbnailTop + thumbnailHeight - columnHeight + 15;
        }
    }
}

// Next slide with smooth transition
function nextSlide() {
    if (isTransitioning) return;
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    showSlide(currentSlideIndex);
}

// Previous slide with smooth transition
function prevSlide() {
    if (isTransitioning) return;
    currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentSlideIndex);
}

// Change slide (called by navigation buttons)
function changeSlide(direction) {
    if (isTransitioning) return;

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
    if (isTransitioning) return;

    stopAutoPlay();
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
    startAutoPlay();
}

// Start auto play
function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 4000);
}

// Stop auto play
function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Add touch/swipe support for mobile
function addTouchSupport() {
    const sliderContainer = document.querySelector('.slider-container');
    if (!sliderContainer) return;

    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    // Touch events
    sliderContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        stopAutoPlay();
    });

    sliderContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
    });

    sliderContainer.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;

        const deltaX = startX - currentX;
        const threshold = 50;

        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }

        startAutoPlay();
    });

    // Mouse events for desktop
    sliderContainer.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        isDragging = true;
        stopAutoPlay();
        sliderContainer.style.cursor = 'grabbing';
    });

    sliderContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        currentX = e.clientX;
    });

    sliderContainer.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;

        const deltaX = startX - currentX;
        const threshold = 50;

        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }

        sliderContainer.style.cursor = 'grab';
        startAutoPlay();
    });

    sliderContainer.addEventListener('mouseleave', () => {
        isDragging = false;
        sliderContainer.style.cursor = 'grab';
        startAutoPlay();
    });

    // Set initial cursor
    sliderContainer.style.cursor = 'grab';
}

// Pause auto play when hovering over slider
function pauseOnHover() {
    const sliderContainer = document.querySelector('.slider-container');

    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            stopAutoPlay();
            sliderContainer.classList.add('paused');
        });
        sliderContainer.addEventListener('mouseleave', () => {
            startAutoPlay();
            sliderContainer.classList.remove('paused');
        });
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
    const quantityInput = document.getElementById('quantity');
    const selectedQuantity = quantityInput ? quantityInput.value : '1';

    if (buyModal && modalQuantityInput) {
        modalQuantityInput.value = selectedQuantity;
        openBuyModal();
        return;
    }

    // Fallback confirm flow if modal is not available
    const productName = "Nutricosmetics Premium Collection";
    const price = "1.299.000 VNĐ";

    const confirmed = confirm(
        `Xác nhận mua hàng:\n\n` +
        `Sản phẩm: ${productName}\n` +
        `Số lượng: ${selectedQuantity}\n` +
        `Giá: ${price} x ${selectedQuantity}\n\n` +
        `Bạn có muốn tiếp tục thanh toán không?`
    );

    if (confirmed) {
        alert('Đang chuyển hướng đến trang thanh toán...');
        setTimeout(() => {
            alert('Cảm ơn bạn đã mua hàng! Chúng tôi sẽ liên hệ xác nhận đơn hàng sớm nhất.');
        }, 1000);
    }
}

function openBuyModal() {
    if (!buyModal) return;

    buyModal.classList.add('is-visible');
    document.body.classList.add('modal-open');

    const firstInput = buyModal.querySelector('input');
    if (firstInput) {
        setTimeout(() => firstInput.focus(), 50);
    }
}

function closeBuyModal() {
    if (!buyModal) return;

    buyModal.classList.remove('is-visible');
    document.body.classList.remove('modal-open');
}

function initBuyModal() {
    if (!buyModal) return;

    const closeTriggers = document.querySelectorAll('[data-close-modal]');
    closeTriggers.forEach(trigger => {
        trigger.addEventListener('click', closeBuyModal);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && buyModal.classList.contains('is-visible')) {
            closeBuyModal();
        }
    });

    if (buyForm) {
        buyForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(buyForm);
            const name = (formData.get('name') || '').trim();
            const phone = (formData.get('phone') || '').trim();
            const emailBuyNow = (formData.get('emailBuyNow') || '').trim();
            const address = (formData.get('address') || '').trim();
            const quantity = formData.get('quantity') || '1';
            const note = (formData.get('note') || '').trim();
            const submitBtn = buyForm.querySelector('button[type="submit"]');

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.dataset.originalText = submitBtn.dataset.originalText || submitBtn.innerHTML;
                submitBtn.innerHTML = 'Đang gửi...';
            }

            const payload = {
                name,
                phone,
                emailBuyNow,
                address,
                quantity,
                note,
                source: 'buy-modal',
                product: 'Shinzo Kijo - Viên uống nội tiết',
                pageUrl: window.location.href
            };

            const finalize = () => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = submitBtn.dataset.originalText || 'Xác nhận đặt hàng';
                }
            };

            try {
                if (window.FormHandler && typeof window.FormHandler.submitLead === 'function') {
                    await window.FormHandler.submitLead(payload, { showStatus: false });
                } else {
                    throw new Error('FormHandler is not available');
                }

                const successMessage = `Cảm ơn ${name || 'bạn'}! Đơn ${quantity} hộp sẽ được xác nhận${phone ? ' qua số ' + phone : ''}.`;
                showNotification(successMessage, 'success');

                closeBuyModal();
                buyForm.reset();

                const pageQuantityInput = document.getElementById('quantity');
                if (pageQuantityInput) {
                    pageQuantityInput.value = quantity;
                }
            } catch (error) {
                console.error('Không thể gửi thông tin đơn hàng', error);
                showNotification('Không thể gửi thông tin. Vui lòng thử lại trong giây lát.', 'error');
            } finally {
                finalize();
            }
        });
    }

    const quantityButtons = buyModal.querySelectorAll('[data-quantity-action]');
    quantityButtons.forEach(button => {
        button.addEventListener('click', () => {
            const wrapper = button.closest('.modal-quantity');
            if (!wrapper) return;

            const input = wrapper.querySelector('input[type="number"]');
            if (!input) return;

            const min = parseInt(input.min, 10) || 1;
            const max = parseInt(input.max, 10) || 10;
            let currentValue = parseInt(input.value, 10) || min;

            if (button.dataset.quantityAction === 'increase' && currentValue < max) {
                currentValue += 1;
            } else if (button.dataset.quantityAction === 'decrease' && currentValue > min) {
                currentValue -= 1;
            }

            input.value = currentValue;
        });
    });
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

// Show notification (fallback if enhanced notification isn't loaded yet)
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;

    const palettes = {
        success: '#28a745',
        error: '#dc3545',
        info: '#17a2b8'
    };

    const background = palettes[type] || palettes.success;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${background};
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
    initBuyModal();
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
        'image_ver2/31460566802055795581.jpg',
        'image_ver2/31460566802055795582.jpg',
        'image_ver2/31460566802055795583.jpg',
        'image_ver2/31460566802055795584.jpg',
        'image_ver2/31460566802055795585.jpg'
    ];

    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Call preload images
preloadImages();

// Product Gallery Logic
const galleryImages = [
    'image_ver2/31460566802055795581.jpg',
    'image_ver2/31460566802055795582.jpg',
    'image_ver2/31460566802055795583.jpg',
    'image_ver2/31460566802055795584.jpg',
    'image_ver2/31460566802055795585.jpg'
];
// let currentGalleryIndex = 0; // Already declared in script.js line 2, wait.
// No, line 2 is currentSlideIndex. This one is currentGalleryIndex. Safe.

let currentGalleryIndex = 0;

function setGalleryImage(index) {
    currentGalleryIndex = index;
    updateGalleryDisplay();
}

function changeGalleryImage(direction) {
    currentGalleryIndex += direction;
    if (currentGalleryIndex >= galleryImages.length) currentGalleryIndex = 0;
    if (currentGalleryIndex < 0) currentGalleryIndex = galleryImages.length - 1;
    updateGalleryDisplay();
}

function updateGalleryDisplay() {
    // Update main image with fade effect
    const mainImg = document.getElementById('gallery-main-image');
    if (!mainImg) return;

    mainImg.style.opacity = '0';
    setTimeout(() => {
        mainImg.src = galleryImages[currentGalleryIndex];
        mainImg.style.opacity = '1';
    }, 200);

    // Update active thumbnail styling
    const thumbs = document.querySelectorAll('.gallery-thumb');
    thumbs.forEach((thumb, idx) => {
        if (idx === currentGalleryIndex) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

// About Section Toggle Logic
function toggleAbout() {
    const content = document.getElementById('about-more-content');
    const btn = document.getElementById('about-toggle-btn');

    if (content && btn) {
        if (content.classList.contains('hidden')) {
            content.classList.remove('hidden');
            btn.textContent = 'Thu gọn';
        } else {
            content.classList.add('hidden');
            btn.textContent = 'Tìm hiểu thêm';
        }
    }
}