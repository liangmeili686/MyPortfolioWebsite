// JavaScript changes for project-intro fade and animation

document.addEventListener('DOMContentLoaded', () => {
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