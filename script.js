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

    // 8. Dynamic Visitor Counter API integration
    const visitorCountEl = document.getElementById('visitor-count');
    if (visitorCountEl) {
        // We use counterapi.dev for free, live, zero-setup visit tracking
        fetch('https://api.counterapi.dev/v1/akramsaad/portfolio/increment')
            .then(response => response.json())
            .then(data => {
                if (data && data.value) {
                    visitorCountEl.textContent = data.value.toLocaleString();
                } else {
                    visitorCountEl.textContent = '1';
                }
            })
            .catch(err => {
                console.error('Error fetching visitor count:', err);
                visitorCountEl.textContent = 'متصل';
            });
    }

    // 9. IP Geolocation Country Welcome Banner
    const welcomeBanner = document.getElementById('welcome-banner');
    const welcomeFlag = document.getElementById('welcome-flag');
    const welcomeText = document.getElementById('welcome-text');

    if (welcomeBanner && welcomeFlag && welcomeText) {
        // Fetch country info from ipapi.co (free and fast JSON geolocation API)
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => {
                if (data && data.country_code && data.country_name) {
                    const flag = getFlagEmoji(data.country_code);
                    const countryArabicName = getCountryArabic(data.country_code) || data.country_name;
                    welcomeFlag.textContent = flag;
                    welcomeText.innerHTML = `أهلاً بك! نسعد بزيارتك الكريمة من <strong>${countryArabicName}</strong> 💖`;
                    welcomeBanner.style.display = 'inline-flex';
                }
            })
            .catch(err => {
                console.warn('Geolocation failed, showing default greeting:', err);
                welcomeBanner.style.display = 'inline-flex'; // show generic welcome anyway
            });
    }

    // Helper: ISO Country Code to Flag Emoji
    function getFlagEmoji(countryCode) {
        if (!countryCode) return '🌍';
        const codePoints = countryCode
            .toUpperCase()
            .split('')
            .map(char => 127397 + char.charCodeAt(0));
        return String.fromCodePoint(...codePoints);
    }

    // Helper: Basic Country Arabic Names Mapping
    function getCountryArabic(code) {
        const countries = {
            'EG': 'مصر',
            'SA': 'المملكة العربية السعودية',
            'AE': 'الإمارات العربية المتحدة',
            'KW': 'الكويت',
            'QA': 'قطر',
            'BH': 'البحرين',
            'OM': 'سلطنة عمان',
            'JO': 'الأردن',
            'LB': 'لبنان',
            'SY': 'سوريا',
            'IQ': 'العراق',
            'YE': 'اليمن',
            'SD': 'السودان',
            'LY': 'ليبيا',
            'DZ': 'الجزائر',
            'MA': 'المغرب',
            'TN': 'تونس',
            'PS': 'فلسطين',
            'US': 'الولايات المتحدة',
            'GB': 'المملكة المتحدة',
            'FR': 'فرنسا',
            'DE': 'ألمانيا',
            'CA': 'كندا'
        };
        return countries[code.toUpperCase()];
    }

    // 10. Serverless Guestbook System
    const guestbookForm = document.getElementById('guestbook-form');
    const guestbookList = document.getElementById('guestbook-list');
    const dbUrl = 'https://api.restful-api.dev/objects/ff8081819d82fab6019ed961aa5b2cac';

    // Default mock comments to make the guestbook look full and premium from day one
    const defaultComments = [
        {
            name: "المهندس محمود الشريف",
            title: "مدير مالي - مجموعة إيجيبت فودز (Egypt Foods Group)",
            message: "عمل ممتاز يا أستاذ أكرم! أتمتة المطابقات والتسويات الماليّة وفّرت جهداً كبيراً على الإدارات المعنية. فخورون بالتعاون معك.",
            date: "2026-06-15"
        },
        {
            name: "أحمد عبد الله",
            title: "مطور برمجيات سحابية",
            message: "الدمج الرائع بين بايثون وأكواد أتمتة البيانات والعلوم المحاسبية في لوحة تحكم واحدة هو المستقبل. موقع ومنصة مذهلة بالتوفيق!",
            date: "2026-06-16"
        }
    ];

    function renderGuestbook(entries) {
        if (!guestbookList) return;
        guestbookList.innerHTML = '';
        
        if (entries.length === 0) {
            guestbookList.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 30px 0;">كن أول من يترك بصمته في لوحة الشرف!</p>';
            return;
        }

        entries.forEach(entry => {
            const dateStr = entry.date ? new Date(entry.date).toLocaleDateString('ar-EG', {year: 'numeric', month: 'long', day: 'numeric'}) : '';
            const commentCard = document.createElement('div');
            commentCard.className = 'guestbook-card';
            commentCard.style.cssText = 'background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); padding: 15px; border-radius: 12px; display: flex; flex-direction: column; gap: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);';
            
            commentCard.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 5px;">
                    <div>
                        <strong style="color: #a78bfa; font-size: 15px;">${entry.name}</strong>
                        <span style="color: var(--text-muted); font-size: 12px; margin-right: 8px; border-right: 1px solid rgba(255,255,255,0.1); padding-right: 8px;">${entry.title}</span>
                    </div>
                    <small style="color: rgba(255,255,255,0.3); font-size: 11px;">${dateStr}</small>
                </div>
                <p style="color: #f3f4f6; font-size: 13.5px; margin: 0; line-height: 1.5; font-weight: 300;">${entry.message}</p>
            `;
            guestbookList.appendChild(commentCard);
        });
    }

    function loadGuestbook() {
        fetch(dbUrl)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch');
                return res.json();
            })
            .then(resData => {
                if (resData && resData.data && Array.isArray(resData.data.comments)) {
                    renderGuestbook(resData.data.comments);
                } else {
                    renderGuestbook(defaultComments);
                }
            })
            .catch(err => {
                console.warn('Error fetching guestbook, falling back to offline defaults:', err);
                renderGuestbook(defaultComments);
            });
    }

    function saveGuestbook(entries) {
        const payload = {
            name: "AkramSaadGuestbook",
            data: {
                comments: entries
            }
        };
        fetch(dbUrl, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .catch(err => console.error('Error saving to guestbook DB:', err));
    }

    if (guestbookForm) {
        guestbookForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById('gb-name');
            const titleInput = document.getElementById('gb-title');
            const messageInput = document.getElementById('gb-message');
            const submitBtn = document.getElementById('gb-submit-btn');
            
            const newEntry = {
                name: nameInput.value,
                title: titleInput.value,
                message: messageInput.value,
                date: new Date().toISOString().split('T')[0]
            };

            // Loading state
            const originalBtnHTML = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري النشر...';

            // Fetch current DB, append new comment, save, and reload
            fetch(dbUrl)
                .then(res => {
                    if (!res.ok) throw new Error('Fetch failed');
                    return res.json();
                })
                .then(resData => {
                    let currentEntries = (resData && resData.data && Array.isArray(resData.data.comments)) ? resData.data.comments : defaultComments;
                    // Append new entry to the top
                    currentEntries.unshift(newEntry);
                    // Keep only last 15 entries for size safety
                    if (currentEntries.length > 15) {
                        currentEntries = currentEntries.slice(0, 15);
                    }
                    
                    const payload = {
                        name: "AkramSaadGuestbook",
                        data: {
                            comments: currentEntries
                        }
                    };

                    // Save to DB
                    return fetch(dbUrl, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    }).then(() => currentEntries);
                })
                .then(updatedEntries => {
                    // Success render
                    renderGuestbook(updatedEntries);
                    // Reset inputs
                    nameInput.value = '';
                    titleInput.value = '';
                    messageInput.value = '';
                })
                .catch(err => {
                    console.error('Error submitting comment:', err);
                    alert('عذراً، حدث خطأ أثناء الاتصال بالخادم. يرجى المحاولة لاحقاً.');
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHTML;
                });
        });
    }

    // Load Guestbook on startup
    loadGuestbook();
});
