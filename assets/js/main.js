// JavaScript for Ranyboy Templado's Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggleBtn = document.getElementById('theme-toggle');
    const darkIcon = document.querySelector('.theme-toggle-dark-icon');
    const lightIcon = document.querySelector('.theme-toggle-light-icon');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    html.className = currentTheme;
    
    // Apply theme to the body and all themed elements
    applyTheme(currentTheme);
    
    // Initial icon state based on current theme
    updateThemeIcon(currentTheme);
    
    // Toggle theme function
    function toggleTheme() {
        const newTheme = html.classList.contains('dark') ? 'light' : 'dark';
        html.className = newTheme;
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        applyTheme(newTheme);
    }
    
    // Update the theme toggle icon based on current theme
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            darkIcon.classList.remove('hidden');
            lightIcon.classList.add('hidden');
        } else {
            lightIcon.classList.remove('hidden');
            darkIcon.classList.add('hidden');
        }
    }
    
    // Apply theme classes to elements - Enhanced to affect all boxes and elements
    function applyTheme(theme) {
        const isDark = theme === 'dark';
        const body = document.body;
        
        // Toggle body classes
        if (isDark) {
            body.classList.add('dark:bg-black', 'dark:text-white');
            body.classList.remove('light:bg-white', 'light:text-gray-900');
        } else {
            body.classList.add('light:bg-white', 'light:text-gray-900');
            body.classList.remove('dark:bg-black', 'dark:text-white');
        }
        
        // Apply to all container elements and boxes
        document.querySelectorAll('.bg-gray-900, .bg-gray-800, .bg-black').forEach(el => {
            if (isDark) {
                el.classList.add(el.classList.contains('bg-gray-800') ? 'dark:bg-gray-800' : 'dark:bg-gray-900');
                el.classList.remove('light:bg-gray-100', 'light:bg-gray-200', 'light:bg-white');
            } else {
                el.classList.add(el.classList.contains('bg-gray-800') ? 'light:bg-gray-200' : 'light:bg-gray-100');
                if (el.classList.contains('bg-black')) el.classList.add('light:bg-white');
            }
        });
        
        // Apply to all text elements
        document.querySelectorAll('.text-white, .text-gray-300, .text-gray-400, .text-gray-500, .text-gray-600').forEach(el => {
            if (isDark) {
                if (el.classList.contains('text-white')) el.classList.add('dark:text-white');
                else if (el.classList.contains('text-gray-300')) el.classList.add('dark:text-gray-300');
                else if (el.classList.contains('text-gray-400')) el.classList.add('dark:text-gray-400');
                else if (el.classList.contains('text-gray-500')) el.classList.add('dark:text-gray-500');
                else el.classList.add('dark:text-gray-600');
                
                el.classList.remove('light:text-gray-800', 'light:text-gray-700', 'light:text-gray-600', 'light:text-gray-500', 'light:text-gray-400');
            } else {
                if (el.classList.contains('text-white')) el.classList.add('light:text-gray-800');
                else if (el.classList.contains('text-gray-300')) el.classList.add('light:text-gray-700');
                else if (el.classList.contains('text-gray-400')) el.classList.add('light:text-gray-600');
                else if (el.classList.contains('text-gray-500')) el.classList.add('light:text-gray-500');
                else el.classList.add('light:text-gray-400');
                
                el.classList.remove('dark:text-white', 'dark:text-gray-300', 'dark:text-gray-400', 'dark:text-gray-500', 'dark:text-gray-600');
            }
        });
        
        // Apply to all border elements
        document.querySelectorAll('.border, .border-gray-700, .border-gray-800').forEach(el => {
            if (isDark) {
                if (el.classList.contains('border-gray-700')) el.classList.add('dark:border-gray-700');
                else if (el.classList.contains('border-gray-800')) el.classList.add('dark:border-gray-800');
                else el.classList.add('dark:border-gray-800');
                
                el.classList.remove('light:border-gray-200', 'light:border-gray-300');
            } else {
                if (el.classList.contains('border-gray-700')) el.classList.add('light:border-gray-300');
                else el.classList.add('light:border-gray-200');
                
                el.classList.remove('dark:border-gray-700', 'dark:border-gray-800');
            }
        });

        // Apply to all box elements (with rounded corners, padding, etc.)
        document.querySelectorAll('.rounded-lg, .rounded-md, .p-6, .p-8').forEach(el => {
            if (el.classList.contains('bg-gray-900') || el.classList.contains('bg-gray-800') || el.classList.contains('bg-black')) {
                if (isDark) {
                    el.style.backgroundColor = el.classList.contains('bg-gray-800') ? '#1f2937' : '#111827';
                    el.style.borderColor = '#374151';
                } else {
                    el.style.backgroundColor = '#f9fafb';
                    el.style.borderColor = '#e5e7eb';
                    el.style.color = '#111827';
                }
            }
        });

        // Apply to all button elements
        document.querySelectorAll('button, .button-hover').forEach(el => {
            if (isDark) {
                if (el.classList.contains('bg-gray-800')) {
                    el.style.backgroundColor = '#1f2937';
                }
            } else {
                if (el.classList.contains('bg-gray-800')) {
                    el.style.backgroundColor = '#f3f4f6';
                    el.style.color = '#111827';
                }
            }
        });
        
        // Fix theme toggle button specifically
        if (themeToggleBtn) {
            if (isDark) {
                themeToggleBtn.style.borderColor = '#4b5563';
                themeToggleBtn.style.color = '#ffffff';
            } else {
                themeToggleBtn.style.borderColor = '#d1d5db';
                themeToggleBtn.style.color = '#111827';
            }
        }
    }
    
    // Add click event to theme toggle button
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }

    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Add classes to elements for animations and hover effects
    const projectCards = document.querySelectorAll('#projects .bg-gray-900');
    projectCards.forEach(card => {
        card.classList.add('hover-card');
    });

    const skillTags = document.querySelectorAll('.bg-gray-800.text-white.px-4.py-2');
    skillTags.forEach(tag => {
        tag.classList.add('skill-tag');
    });

    const whiteButtons = document.querySelectorAll('.bg-white.text-black');
    whiteButtons.forEach(button => {
        button.classList.add('button-hover', 'white-button');
    });

    const outlineButtons = document.querySelectorAll('.border.border-white');
    outlineButtons.forEach(button => {
        button.classList.add('button-hover', 'outline-button');
    });

    const socialIcons = document.querySelectorAll('.w-12.h-12.bg-gray-900');
    socialIcons.forEach(icon => {
        icon.classList.add('social-icon');
    });

    const chatButton = document.querySelector('.fixed.bottom-6.right-6 button');
    if (chatButton) {
        chatButton.classList.add('chat-button');
    }

    // Blog post hover effects
    const blogPosts = document.querySelectorAll('section:last-of-type .bg-gray-900');
    blogPosts.forEach(post => {
        post.classList.add('hover-card');
    });

    // Add line to timeline elements
    const timelineLines = document.querySelectorAll('.bg-gray-700.h-full.w-0\\.5');
    timelineLines.forEach(line => {
        line.classList.add('timeline-line');
    });

    // Add 'visible' class to sections when they come into view
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Adjust for navbar height
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // Recommendation carousel
    const indicatorDots = document.querySelectorAll('.w-2.h-2.rounded-full');
    if (indicatorDots.length > 0) {
        indicatorDots[0].classList.add('active');
        
        // Setup carousel functionality here if needed
        // For a production site, you would implement proper carousel functionality
    }

    // === Recommendations Auto-Rotation ===
    const recommendations = [
        {
            text: '"Ranyboy was a dedicated intern who showed great aptitude for technology and problem-solving. His skills in data management and process optimization were valuable assets to our accounting department. He has a bright future ahead in the tech industry."',
            author: 'Juan Dela Cruz',
            role: 'Project Manager'
        },
        {
            text: '"Ranyboy consistently demonstrated a strong work ethic and a passion for learning new technologies. He was a reliable team member and contributed significantly to our projects."',
            author: 'Maria Santos',
            role: 'IT Project Manager'
        },
        {
            text: '"His attention to detail and ability to solve complex problems made him an asset to our organization. I highly recommend Ranyboy for any tech-related role."',
            author: 'Carlos Reyes',
            role: 'Teacher, Computer Science Department'
        }
    ];
    let currentRec = 0;
    function showRecommendation(idx) {
        const rec = recommendations[idx];
        const textEl = document.getElementById('recommendation-text');
        const authorEl = document.getElementById('recommendation-author');
        const roleEl = document.getElementById('recommendation-role');
        if (textEl && authorEl && roleEl) {
            textEl.textContent = rec.text;
            authorEl.textContent = rec.author;
            roleEl.textContent = rec.role;
        }
        // Update dots
        const dots = document.querySelectorAll('#recommendation-dots [data-dot]');
        dots.forEach((dot, i) => {
            if (i === idx) {
                dot.classList.remove('bg-gray-600', 'dark:bg-gray-600', 'light:bg-gray-400');
                dot.classList.add('bg-white', 'dark:bg-white', 'light:bg-gray-800');
            } else {
                dot.classList.remove('bg-white', 'dark:bg-white', 'light:bg-gray-800');
                dot.classList.add('bg-gray-600', 'dark:bg-gray-600', 'light:bg-gray-400');
            }
        });
    }
    // Only run if recommendations section exists
    if (document.getElementById('recommendation-content')) {
        setInterval(() => {
            currentRec = (currentRec + 1) % recommendations.length;
            showRecommendation(currentRec);
        }, 20000);
        // Allow clicking dots to jump to a recommendation
        Array.from(document.querySelectorAll('#recommendation-dots [data-dot]')).forEach((dot, i) => {
            dot.style.cursor = 'pointer';
            dot.onclick = () => {
                currentRec = i;
                showRecommendation(i);
            };
        });
    }

    // Add current year to copyright
    const copyright = document.querySelector('footer p');
    if (copyright) {
        const currentYear = new Date().getFullYear();
        copyright.innerHTML = `© ${currentYear} Ranyboy Templado. All rights reserved.`;
    }

    // Add active state to navigation based on scroll position
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const navSections = [];

    navLinks.forEach(link => {
        const sectionId = link.getAttribute('href');
        const section = document.querySelector(sectionId);
        if (section) {
            navSections.push({ link, section });
        }
    });

    const setActiveNavLink = () => {
        const scrollPosition = window.scrollY + 200; // Adjust for better UX

        navSections.forEach(({ link, section }) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(navLink => navLink.classList.remove('text-white'));
                navLinks.forEach(navLink => navLink.classList.add('text-gray-300'));
                link.classList.remove('text-gray-300');
                link.classList.add('text-white');
            }
        });
    };

    window.addEventListener('scroll', setActiveNavLink);

    // Initial call to set active nav link
    setActiveNavLink();

    // Chat Messenger Popup Logic (only open on button click, not auto-popup)
    const chatBtn = document.querySelector('#chat-messenger-btn button');
    const chatModal = document.getElementById('chat-messenger-modal');
    if (chatBtn && chatModal) {
        chatBtn.addEventListener('click', function() {
            chatModal.classList.remove('hidden');
            chatModal.classList.add('animate-fade-in');
        });
    }

    // Intercept all Go to Project links
    document.querySelectorAll('a[href^="http"]').forEach(function(link) {
        if (link.textContent.includes('Go to Project')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                var overlay = document.getElementById('loading-overlay');
                overlay.classList.remove('hidden');
                setTimeout(function() {
                    window.open(link.href, '_blank');
                    overlay.classList.add('hidden');
                }, 1200); // 1.2 seconds loading
            });
        }
    });
});