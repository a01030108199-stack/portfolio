/* 
   Akram Saad Portfolio - Interactive Script v13
   Includes: Stats Counter, Skill Bars, Project Filtering,
             Dark/Light Mode, Mobile Menu, Scroll Reveal,
             Announcement Bar, Scroll-to-Top
*/

document.addEventListener('DOMContentLoaded', () => {

    // ================================================
    // 1. ANNOUNCEMENT BAR
    // ================================================
    const announcementBar = document.getElementById('announcement-bar');
    const announcementClose = document.getElementById('announcement-close');
    const header = document.getElementById('header');

    if (announcementClose && announcementBar) {
        announcementClose.addEventListener('click', () => {
            announcementBar.classList.add('hidden');
            header.classList.add('no-announcement');
            header.style.top = '0';
            // Update hero padding
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.paddingTop = 'calc(var(--nav-height) + 40px)';
            }
        });
    }

    // ================================================
    // 2. THEME MANAGEMENT (Dark / Light)
    // ================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('i');
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);

        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });

        function updateThemeIcon(theme) {
            if (themeIcon) {
                themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
            themeToggleBtn.setAttribute('title', theme === 'dark' ? 'الوضع الفاتح' : 'الوضع الداكن');
        }
    }

    // ================================================
    // 3. MOBILE MENU
    // ================================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // ================================================
    // 4. SCROLL: HEADER + ACTIVE LINK + SCROLL-TO-TOP
    // ================================================
    const sections = document.querySelectorAll('section');
    const scrollTopBtn = document.getElementById('scroll-top-btn');

    window.addEventListener('scroll', () => {
        // Header sticky class
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }

        // Active nav link
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 140;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });

        // Scroll-to-top button visibility
        if (scrollTopBtn) {
            scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ================================================
    // 5. SCROLL REVEAL (IntersectionObserver)
    // ================================================
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ================================================
    // 6. STATS COUNTER ANIMATION
    // ================================================
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(counter => {
        counterObserver.observe(counter);
    });

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = Math.floor(current) + suffix;
        }, 16);
    }

    // ================================================
    // 7. SKILL BARS ANIMATION
    // ================================================
    const skillBarObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fills = entry.target.querySelectorAll('.skill-bar-fill');
                fills.forEach(fill => {
                    const width = fill.getAttribute('data-width');
                    setTimeout(() => {
                        fill.style.width = width + '%';
                    }, 200);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const skillsWrapper = document.querySelector('.skills-wrapper');
    if (skillsWrapper) skillBarObserver.observe(skillsWrapper);

    // ================================================
    // 8. PROJECTS RENDERING & FILTERING
    // ================================================
    const projectsGrid = document.getElementById('projects-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    function renderProjects(filter = 'all') {
        if (!projectsGrid || typeof PROJECTS_DATA === 'undefined') return;

        projectsGrid.innerHTML = '';

        const filtered = filter === 'all'
            ? PROJECTS_DATA
            : PROJECTS_DATA.filter(p => p.category === filter);

        if (filtered.length === 0) {
            projectsGrid.innerHTML = '<p class="no-projects">لا توجد مشاريع مضافة في هذا القسم حالياً.</p>';
            return;
        }

        filtered.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card glass reveal active';

            const tagsHTML = project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('');

            let demoBtnHTML = '';
            if (project.gallery && project.gallery.length > 0) {
                demoBtnHTML = `<a href="#" class="btn-icon project-gallery-trigger" data-project-id="${project.id}" title="عرض صور المشروع"><i class="fas fa-images"></i></a>`;
            } else if (project.category === 'excel') {
                demoBtnHTML = `<a href="${project.demoUrl}" download class="btn-icon" title="تحميل ملف Excel"><i class="fas fa-file-download"></i></a>`;
            } else {
                demoBtnHTML = `<a href="${project.demoUrl}" target="_blank" class="btn-icon" title="معاينة حية"><i class="fas fa-external-link-alt"></i></a>`;
            }

            card.innerHTML = `
                <div class="project-img-wrapper">
                    <img src="${project.image}" alt="${project.title}" class="project-img"
                         onerror="this.src='https://placehold.co/600x400/120d24/8b5cf6?text=${encodeURIComponent(project.title)}'">
                    <div class="project-overlay">
                        <a href="${project.githubUrl}" target="_blank" class="btn-icon" title="كود المصدر"><i class="fab fa-github"></i></a>
                        ${demoBtnHTML}
                    </div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-desc">${project.description}</p>
                    <div class="project-tags">${tagsHTML}</div>
                </div>
            `;

            projectsGrid.appendChild(card);
        });
    }

    // Initial render
    renderProjects();

    // Filter handlers
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');
            projectsGrid.style.opacity = '0';
            projectsGrid.style.transform = 'translateY(10px)';
            setTimeout(() => {
                renderProjects(filterValue);
                projectsGrid.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                projectsGrid.style.opacity = '1';
                projectsGrid.style.transform = 'translateY(0)';
            }, 250);
        });
    });

    // ================================================
    // 9. CONTACT FORM SUBMISSION
    // ================================================
    const contactForm = document.getElementById('contact-form');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    function showToast(message, isSuccess = true) {
        if (!toast) return;
        toast.style.background = isSuccess ? '#10b981' : '#ef4444';
        if (toastMessage) toastMessage.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 4000);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>جاري الإرسال...</span>';
            submitBtn.disabled = true;

            // Simulate sending (replace with your form service like Formspree/EmailJS)
            await new Promise(resolve => setTimeout(resolve, 1500));

            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
            contactForm.reset();
            showToast('✅ تم إرسال رسالتك بنجاح! سأرد عليك قريباً.');
        });
    }

    // ================================================
    // 10. GEOLOCATION WELCOME BANNER
    // ================================================
    const welcomeBanner = document.getElementById('welcome-banner');
    if (welcomeBanner) {
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => {
                const countryFlags = {
                    'EG': '🇪🇬', 'SA': '🇸🇦', 'AE': '🇦🇪', 'KW': '🇰🇼',
                    'QA': '🇶🇦', 'BH': '🇧🇭', 'OM': '🇴🇲', 'JO': '🇯🇴',
                    'LB': '🇱🇧', 'IQ': '🇮🇶', 'MA': '🇲🇦', 'TN': '🇹🇳',
                    'DZ': '🇩🇿', 'LY': '🇱🇾', 'SD': '🇸🇩', 'YE': '🇾🇪'
                };
                const flag = countryFlags[data.country_code] || '🌍';
                const city = data.city || '';
                const country = data.country_name || '';

                document.getElementById('welcome-flag').textContent = flag;
                document.getElementById('welcome-text').textContent =
                    `أهلاً بك من ${city ? city + '، ' : ''}${country}! نسعد بزيارتك الكريمة.`;

                welcomeBanner.style.display = 'inline-flex';
            })
            .catch(() => {
                // Silently fail if geolocation not available
            });
    }

});
