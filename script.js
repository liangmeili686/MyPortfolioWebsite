// JavaScript changes for project-intro fade and animation

document.addEventListener('DOMContentLoaded', () => {
    // Responsive resize method
    function handleResponsiveResize() {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const screenRatio = screenWidth / screenHeight;
        const isLongScreen = screenHeight > screenWidth; // Portrait orientation
        
        // Base font sizes for different screen sizes
        const baseFontSizes = {
            mobile: { small: 4, medium: 6, large: 11, xlarge: 15 },
            tablet: { small: 10, medium: 12, large: 17, xlarge: 25 },
            desktop: { small: 14, medium: 20, large: 28, xlarge: 38 }
        };
        
        // Determine device type
        let deviceType = 'desktop';
        if (screenWidth < 768) deviceType = 'mobile';
        else if (screenWidth < 1024) deviceType = 'tablet';
        
        const fontSize = baseFontSizes[deviceType];
        
        // Adjust text sizes
        const textElements = {
            '.intro-line1, .intro-line2': fontSize.xlarge,
            '.project-intro, .project-intro2, .contact-intro, .about-intro-group h1': fontSize.large,
            '.contact-line1, .contact-line2, .contact-line3': fontSize.large,
            '.project-text p, .project-text2 p, .about-subtitle': fontSize.medium,
            'nav a': fontSize.large,
            '.title': fontSize.xlarge,
            '.image-description p': fontSize.small
        };
        
        // Apply text size adjustments
        Object.entries(textElements).forEach(([selector, size]) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.style.fontSize = `${size}px`;
            });
        });
        
        // Adjust image and video sizes
        const mediaElements = {
            'video': { width: '100%', height: 'auto' },
            '.image-description img': { width: '100%', height: 'auto', maxWidth: isLongScreen ? '300px' : '400px' },
            /*'#check-code-btn, #play-btn': { 
                width: isLongScreen ? '200px' : '250px', 
                height: 'auto' 
            },*/
            '#bottom-nav': { 
                width: isLongScreen ? '60px' : '80px', 
                height: 'auto' 
            }
        };
        
        // Apply media size adjustments
        Object.entries(mediaElements).forEach(([selector, styles]) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                Object.entries(styles).forEach(([property, value]) => {
                    el.style[property] = value;
                });
            });
        });
        
        // Handle layout changes for long screens (portrait orientation)
        const projectRows = document.querySelectorAll('.project-row, .project-row2');
        projectRows.forEach(row => {
            if (isLongScreen) {
                row.style.lineHeight = '1.2';
                const paragraphs = row.querySelectorAll('.project-text p, .project-text2 p');
                paragraphs.forEach(p => {
                    p.style['text-shadow'] = "none"
                });


                // Single column layout for long screens
                row.style.flexDirection = 'column';
                row.style.gap = '1rem';
                
                // Adjust video and text containers
                const videos = row.querySelectorAll('.project-video, .project-video2');
                const texts = row.querySelectorAll('.project-text, .project-text2');
                
                videos.forEach(video => {
                    video.style.flex = '1 1 100%';
                    video.style.maxWidth = '100%';
                    video.style.order = '1'; // Video first
                });
                
                texts.forEach(text => {
                    text.style.flex = '1 1 100%';
                    text.style.maxWidth = '100%';
                    text.style.order = '2'; // Text second
                });
            } else {
                // Two column layout for wide screens
                row.style.flexDirection = 'row';
                row.style.gap = '2rem';
                
                const videos = row.querySelectorAll('.project-video, .project-video2');
                const texts = row.querySelectorAll('.project-text, .project-text2');
                
                videos.forEach(video => {
                    video.style.flex = '1 1 50%';
                    video.style.maxWidth = '50%';
                    video.style.order = 'unset';
                });
                
                texts.forEach(text => {
                    text.style.flex = '1 1 50%';
                    text.style.maxWidth = '50%';
                    text.style.order = 'unset';
                });
            }
        });
        
        // Handle about section separately (it uses absolute positioning, not flexbox)
        const aboutCards = document.querySelectorAll('.image-description');
        if (isLongScreen) {
            aboutCards.forEach(card => {
                const img = card.querySelector('img');
                if (img) {
                    img.style.width = Math.min(window.innerWidth * 0.15, 80) + 'px';
                }
                card.style.maxWidth = '80px';
                card.style.width = '80px';
            });
        } else {
            aboutCards.forEach(card => {
                const img = card.querySelector('img');
                if (img) {
                    img.style.width = '100%';
                }
                card.style.maxWidth = '300px';
                card.style.width = 'auto';
            });
        }
        
        // Note: About section uses absolute positioning, so we don't change its layout structure
        // The cards are positioned using CSS top/left properties and will maintain their scattered layout
        
        // Adjust header for long screens
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        if (header && nav) {
            if (isLongScreen) {
                header.style.flexDirection = 'column';
                header.style.height = 'auto';
                header.style.padding = '1rem';
                header.style.gap = '1rem';
                
                nav.style.flexWrap = 'wrap';
                nav.style.justifyContent = 'center';
                nav.style.gap = '1rem';
                
                // Adjust logo for mobile
                const logo = document.getElementById('logo');
                if (logo) {
                    logo.style.marginTop = '0';
                    logo.style.fontSize = '2rem';
                }
            } else {
                header.style.flexDirection = 'row';
                header.style.height = '70px';
                header.style.padding = '1.5rem';
                header.style.gap = '0';
                
                nav.style.flexWrap = 'nowrap';
                nav.style.justifyContent = 'flex-end';
                nav.style.gap = '2rem';
                
                const logo = document.getElementById('logo');
                if (logo) {
                    logo.style.marginTop = '2.3rem';
                    logo.style.fontSize = '2.5rem';
                }
            }
        }
        
        // Adjust content padding for different screen sizes
        const contentElements = document.querySelectorAll('.content');
        contentElements.forEach(content => {
            if (isLongScreen) {
                content.style.padding = '20px';
                content.style.minHeight = '100vh';
            } else {
                content.style.padding = '50px';
                content.style.minHeight = '100vh';
            }
        });
        
        // Adjust popup image size
        const popupImg = document.getElementById('image-popup-img');
        if (popupImg) {
            popupImg.style.maxWidth = '90vw';
            popupImg.style.maxHeight = 'auto';
        }
    }
    
    // Initial resize call
    handleResponsiveResize();
    
    // Add resize event listener
    window.addEventListener('resize', handleResponsiveResize);
    
    // Add orientation change listener for mobile devices
    window.addEventListener('orientationchange', () => {
        setTimeout(handleResponsiveResize, 100); // Small delay to ensure orientation change is complete
    });

    // Logo sprite animation
    const logo = document.getElementById('logo');
    if (logo) {
        const frameWidth = 83; // px (width of one frame)
        const frameCount = 6;
        let currentFrame = 0;
        setInterval(() => {
            logo.style.backgroundPosition = `-${currentFrame * frameWidth}px 0px`;
            currentFrame = (currentFrame + 1) % frameCount;
        }, 180); // 180ms per frame, adjust for speed
    }

    
    const intro = document.querySelector('.intro-content');
    if (intro) {
        intro.classList.add('intro-animate');
    }

    const projects = [
        {
            section: document.querySelectorAll('section')[1],
            intro: document.querySelector('.project-intro'),
            row: document.querySelector('.project-row'),
            video: document.querySelector('.project-video'),
            text: document.querySelector('.project-text')
        },
        {
            section: document.querySelectorAll('section')[2],
            intro: document.querySelector('.project-intro2'),
            row: document.querySelector('.project-row2'),
            video: document.querySelector('.project-video2'),
            text: document.querySelector('.project-text2')
        },
        {
            section: document.querySelectorAll('section')[3],
            intro: document.querySelector('.about-intro-group'),
            subtitle: document.querySelector('.about-subtitle'),
            row: document.querySelector('.about-row'),
            masonry: document.querySelector('.about-scattered'),
        },
        {
            section: document.querySelectorAll('section')[4],
            intro: document.querySelector('.contact-intro'),
            row: document.querySelector('.contact-row'),
        }
    ];

    // --- Generic project click-to-reveal logic ---
    projects.forEach((projectSection, idx) => {
        const intro = projectSection.intro;
        const row = projectSection.row;
        if (intro && row) {
            row.style.display = 'none';
            intro.classList.remove('fade-out');
            intro.style.opacity = 1;
            intro.addEventListener('click', () => {
                intro.classList.add('fade-out');
                
                setTimeout(() => {
                    intro.style.display = 'none';
                    row.style.display = 'flex';
                    void row.offsetHeight;
                    row.classList.add('show');
                    row.classList.add('shown-once');
                    // Show and animate check-code-btn if Project 1
                    if (idx === 0) {
                        const checkBtn = document.getElementById('check-code-btn');
                        if (checkBtn) {
                            checkBtn.style.display = 'block';
                            checkBtn.classList.remove('show'); // reset if needed
                            void checkBtn.offsetWidth; // force reflow
                            setTimeout(() => {
                            checkBtn.classList.add('show');
                            }, 50); // short delay to trigger transition
                        }
                    }
                    // Show and animate play-btn if Project 2
                    if (idx === 1) {
                        const playBtn = document.getElementById('play-btn');
                        if (playBtn) {
                            playBtn.style.display = 'block';
                            playBtn.classList.remove('show'); // reset if needed
                            void playBtn.offsetWidth; // force reflow
                            setTimeout(() => {
                            playBtn.classList.add('show');
                            }, 50); // short delay to trigger transition
                        }
                    }
                }, 200);
            });
        }
    });

    // --- Existing Intersection Observer code ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if(entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    }, {
        root: null,
        rootMargin: '-90px 0px 0px 0px',
        threshold: 0.1
    });
    
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // --- Bottom nav scroll logic ---
    const bottomNav = document.getElementById('bottom-nav');
    if (bottomNav) {
        bottomNav.addEventListener('click', () => {
            const sections = document.querySelectorAll('section');
            const sectionCount = sections.length;
            // Find the current section in view
            let currentIndex = 0;
            let minDistance = Infinity;
            sections.forEach((section, i) => {
                const rect = section.getBoundingClientRect();
                const distance = Math.abs(rect.top);
                if (distance < minDistance) {
                    minDistance = distance;
                    currentIndex = i;
                }
            });
            // Scroll to the next section, or to the bottom if at the last
            let nextIndex = currentIndex + 1;
            if (nextIndex >= sectionCount) {
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth'
                });
            } else {
                const nextSection = sections[nextIndex];
                const y = window.scrollY + nextSection.getBoundingClientRect().top;
                window.scrollTo({
                    top: y,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Add click handler for check-code-btn
    const checkBtn = document.getElementById('check-code-btn');
    if (checkBtn) {
        checkBtn.addEventListener('click', () => {
            window.open('https://github.com/liangmeili686/YouTubeTV-Movie-Theme-Song-Autosave-chromeExtension-on-Spotify', '_blank');
        });
    }

    const playBtn = document.getElementById('play-btn');
    if (checkBtn) {
        playBtn.addEventListener('click', () => {
            window.open('https://cautionwalpurgisnight.com/', '_blank');
        });
    }

    // Popup logic for About Me cards
    const popupOverlay = document.getElementById('image-popup-overlay');
    const popupImg = document.getElementById('image-popup-img');

    function showPopup(imgSrc) {
      if (popupImg && popupOverlay) {
        popupImg.src = imgSrc;
        popupOverlay.style.display = 'flex';
      }
    }
    function hidePopup() {
      if (popupOverlay) popupOverlay.style.display = 'none';
      if (popupImg) popupImg.src = '';
    }

    // Click handlers for artist and ui cards
    const artistCard = document.querySelector('.artist-card');
    if (artistCard) {
      artistCard.addEventListener('click', (e) => {
        e.stopPropagation();
        showPopup('assets/painting-large.png');
      });
    }
    const uiCard = document.querySelector('.ui-card');
    if (uiCard) {
      uiCard.addEventListener('click', (e) => {
        e.stopPropagation();
        showPopup('assets/UI-large.png');
      });
    }

    // Hide popup on overlay or image click
    if (popupOverlay) {
      popupOverlay.addEventListener('click', hidePopup);
    }
    if (popupImg) {
      popupImg.addEventListener('click', hidePopup);
    }

    // Play singing.mp3 when clicking the singing card
    const singingCard = document.querySelector('.singer-card');
    const singingAudio = document.getElementById('about-singing-audio');
    if (singingCard && singingAudio) {
      singingCard.addEventListener('click', (e) => {
        e.stopPropagation();
        singingAudio.currentTime = 0; // restart if already playing
        singingAudio.play();
      });
    }
});