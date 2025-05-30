// Create enhanced floating particles
function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const colors = ['rgba(102, 126, 234, 0.8)', 'rgba(255, 119, 198, 0.8)', 'rgba(120, 200, 255, 0.8)'];
            
            for (let i = 0; i < 80; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                particle.style.animationDelay = Math.random() * 25 + 's';
                particle.style.animationDuration = (Math.random() * 15 + 15) + 's';
                particle.style.width = (Math.random() * 4 + 2) + 'px';
                particle.style.height = particle.style.width;
                particlesContainer.appendChild(particle);
            }
        }

        // Enhanced navbar scroll effect
        function handleNavbarScroll() {
            const navbar = document.getElementById('navbar');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }

        // Smooth scrolling for navigation links
        function handleSmoothScroll() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        const offsetTop = target.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }

        // Enhanced reveal animation on scroll
        function handleScrollReveal() {
            const reveals = document.querySelectorAll('.reveal');
            
            function checkReveal() {
                reveals.forEach(reveal => {
                    const windowHeight = window.innerHeight;
                    const elementTop = reveal.getBoundingClientRect().top;
                    const elementVisible = 100;
                    
                    if (elementTop < windowHeight - elementVisible) {
                        reveal.classList.add('active');
                    }
                });
            }
            
            window.addEventListener('scroll', checkReveal);
            checkReveal();
        }

        // Animate skill bars when visible
        function animateSkillBars() {
            const skillBars = document.querySelectorAll('.skill-progress');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const width = entry.target.style.width;
                        entry.target.style.width = '0%';
                        setTimeout(() => {
                            entry.target.style.width = width;
                        }, 200);
                    }
                });
            });

            skillBars.forEach(bar => observer.observe(bar));
        }

        // Enhanced form submission
        function handleFormSubmission() {
            const form = document.getElementById('contactForm');
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalContent = submitBtn.innerHTML;
                
                // Animate button
                submitBtn.innerHTML = '<span>⏳</span> Sending...';
                submitBtn.disabled = true;
                submitBtn.style.transform = 'scale(0.98)';
                
                // Simulate form submission
                setTimeout(() => {
                    submitBtn.innerHTML = '<span>✅</span> Message Sent!';
                    submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                    submitBtn.style.transform = 'scale(1)';
                    
                    // Reset form
                    this.reset();
                    
                    // Show success message
                    showNotification('Thank you! Your message has been sent successfully.', 'success');
                    
                    // Reset button
                    setTimeout(() => {
                        submitBtn.innerHTML = originalContent;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                    }, 3000);
                }, 2000);
            });
        }

        // Notification system
        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 'var(--primary-gradient)'};
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                z-index: 10001;
                animation: slideInRight 0.3s ease;
                max-width: 300px;
                font-weight: 500;
            `;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, 4000);
        }

        // Add notification animations
        const notificationStyle = document.createElement('style');
        notificationStyle.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(notificationStyle);

        // Enhanced cursor effects
        function addCursorEffects() {
            let mouseX = 0, mouseY = 0;
            let cursorX = 0, cursorY = 0;
            
            const cursor = document.createElement('div');
            cursor.style.cssText = `
                position: fixed;
                width: 20px;
                height: 20px;
                background: radial-gradient(circle, rgba(102, 126, 234, 0.8), transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: transform 0.1s ease;
                mix-blend-mode: difference;
            `;
            document.body.appendChild(cursor);
            
            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });
            
            function animateCursor() {
                cursorX += (mouseX - cursorX) * 0.1;
                cursorY += (mouseY - cursorY) * 0.1;
                cursor.style.left = cursorX - 10 + 'px';
                cursor.style.top = cursorY - 10 + 'px';
                requestAnimationFrame(animateCursor);
            }
            animateCursor();
            
            // Cursor interactions
            document.querySelectorAll('a, button, .project-card, .skill-card, .tool-item').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.style.transform = 'scale(2)';
                });
                el.addEventListener('mouseleave', () => {
                    cursor.style.transform = 'scale(1)';
                });
            });
        }

        // Loading animation
        function handleLoading() {
            const loadingOverlay = document.getElementById('loadingOverlay');
            
            window.addEventListener('load', () => {
                setTimeout(() => {
                    loadingOverlay.style.opacity = '0';
                    setTimeout(() => {
                        loadingOverlay.remove();
                    }, 500);
                }, 1000);
            });
        }

        // Parallax effect for hero section
        function addParallaxEffect() {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const hero = document.querySelector('.hero');
                if (hero) {
                    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
                }
            });
        }

        // Initialize everything
        document.addEventListener('DOMContentLoaded', function() {
            handleLoading();
            createParticles();
            handleNavbarScroll();
            handleSmoothScroll();
            handleScrollReveal();
            animateSkillBars();
            handleFormSubmission();
            addCursorEffects();
            addParallaxEffect();
            
            // Add typing effect to hero title
            const heroTitle = document.querySelector('.hero h1');
            if (heroTitle) {
                const text = heroTitle.textContent;
                heroTitle.textContent = '';
                let i = 0;
                
                function typeWriter() {
                    if (i < text.length) {
                        heroTitle.textContent += text.charAt(i);
                        i++;
                        setTimeout(typeWriter, 100);
                    }
                }
                
                setTimeout(typeWriter, 500);
            }
            
            // Welcome message
            setTimeout(() => {
                showNotification('Welcome to my portfolio! 👋', 'info');
            }, 2000);
        });

        // Add click ripple effects
        document.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: radial-gradient(circle, rgba(102, 126, 234, 0.6), transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                animation: rippleExpand 0.6s ease-out;
                left: ${e.clientX - 5}px;
                top: ${e.clientY - 5}px;
            `;
            
            document.body.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });

        // Add ripple animation
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            @keyframes rippleExpand {
                0% { transform: scale(1); opacity: 1; }
                100% { transform: scale(30); opacity: 0; }
            }
        `;
        document.head.appendChild(rippleStyle);