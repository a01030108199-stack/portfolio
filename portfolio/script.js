/* 
   Akram Saad Portfolio - Interactive Script
   Includes: Project Filtering, Dark/Light Mode, Mobile Menu, Scroll Reveal, Form Submission
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Management (Dark / Light Mode)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check local storage or system preference
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
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun'; // sun icon for switching to light
            themeToggleBtn.setAttribute('title', 'الوضع الفاتح');
        } else {
            themeIcon.className = 'fas fa-moon'; // moon icon for switching to dark
            themeToggleBtn.setAttribute('title', 'الوضع الداكن');
        }
    }

    // 2. Mobile Menu (Hamburger Menu)
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Set active class
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Close mobile menu if clicked outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // 3. Dynamic Projects Rendering & Filtering
    const projectsGrid = document.getElementById('projects-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    function renderProjects(filter = 'all') {
        projectsGrid.innerHTML = '';
        
        const filteredProjects = filter === 'all' 
            ? PROJECTS_DATA 
            : PROJECTS_DATA.filter(project => project.category === filter);
            
        if (filteredProjects.length === 0) {
            projectsGrid.innerHTML = '<p class="no-projects">لا توجد مشاريع مضافة في هذا القسم حالياً.</p>';
            return;
        }

        filteredProjects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card glass reveal active';
            
            // Create tags list HTML
            const tagsHTML = project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('');
            
            card.innerHTML = `
                <div class="project-img-wrapper">
                    <img src="${project.image}" alt="${project.title}" class="project-img" onerror="this.src='https://placehold.co/600x400/120d24/ffffff?text=${encodeURIComponent(project.title)}'">
                    <div class="project-overlay">
                        <a href="${project.githubUrl}" target="_blank" class="btn-icon" title="كود المصدر"><i class="fab fa-github"></i></a>
                        <a href="${project.demoUrl}" class="btn-icon" title="معاينة حية"><i class="fas fa-external-link-alt"></i></a>
                    </div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-desc">${project.description}</p>
                    <div class="project-tags">
                        ${tagsHTML}
                    </div>
                </div>
            `;
            
            projectsGrid.appendChild(card);
        });
    }

    // Initial render
    if (typeof PROJECTS_DATA !== 'undefined') {
        renderProjects();
    }

    // Filter click handler
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            // Add a brief fade-out/in effect
            projectsGrid.style.opacity = '0';
            setTimeout(() => {
                renderProjects(filterValue);
                projectsGrid.style.opacity = '1';
            }, 200);
        });
    });

    // 4. Scroll Header Shadow & Active Section Link
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        // Sticky Header class
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active link highlight
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // 5. Scroll Reveal Effect
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealOnScroll.observe(el));

    // 6. Contact Form Submission Handling
    const contactForm = document.getElementById('contact-form');
    const toast = document.getElementById('toast');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
            
            // Simulate API call
            setTimeout(() => {
                // Show toast notification
                toast.classList.add('show');
                
                // Reset form and button
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                // Hide toast after 4 seconds
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 4000);
            }, 1500);
        });
    }

    // 7. Logo Error Fallback (Try different formats before text fallback)
    const logoImg = document.getElementById('logo-img');
    if (logoImg) {
        logoImg.addEventListener('error', function() {
            if (this.src.includes('logo.jpg')) {
                this.src = 'assets/images/logo.png';
                return;
            }
            if (this.src.includes('logo.png')) {
                this.src = 'assets/images/logo.svg';
                return;
            }
            
            // If all image attempts fail, show the text initials fallback
            this.style.display = 'none';
            const logoArea = document.querySelector('.logo-area');
            if (!logoArea.querySelector('.logo-initials')) {
                const initialsBadge = document.createElement('div');
                initialsBadge.className = 'logo-initials';
                initialsBadge.style.width = '40px';
                initialsBadge.style.height = '40px';
                initialsBadge.style.borderRadius = '8px';
                initialsBadge.style.background = 'var(--accent-gradient)';
                initialsBadge.style.color = '#ffffff';
                initialsBadge.style.display = 'flex';
                initialsBadge.style.alignItems = 'center';
                initialsBadge.style.justifyContent = 'center';
                initialsBadge.style.fontWeight = 'bold';
                initialsBadge.style.fontSize = '0.95rem';
                initialsBadge.style.marginRight = '8px';
                initialsBadge.innerHTML = 'أ س'; // Initials for Akram Saad
                logoArea.insertBefore(initialsBadge, logoArea.firstChild);
            }
        });
    }
});
