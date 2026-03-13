document.addEventListener('DOMContentLoaded', () => {

    // ===== Intersection Observer for fade-in =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.observe-fade').forEach(el => observer.observe(el));

    // ===== Copy CA =====
    const copyCABtn = document.getElementById('copyCA');
    if (copyCABtn) {
        copyCABtn.addEventListener('click', () => {
            const ca = copyCABtn.getAttribute('data-ca');
            navigator.clipboard.writeText(ca).then(() => {
                const caText = copyCABtn.querySelector('.ca-text');
                const orig = caText.textContent;
                caText.textContent = 'COPIED!';
                copyCABtn.classList.add('copied');
                setTimeout(() => {
                    caText.textContent = orig;
                    copyCABtn.classList.remove('copied');
                }, 2000);
            }).catch(err => console.error('Copy failed:', err));
        });
    }

    // ===== Floating emojis (cat paws, music, sparkles) =====
    const emojis = ['\uD83D\uDC3E', '\u2728', '\uD83C\uDFB5', '\uD83C\uDFB6', '\uD83D\uDC31', '\uD83C\uDF1F', '\uD83D\uDC83', '\uD83C\uDF3F', '\uD83C\uDF40', '\uD83E\uDD8B'];
    function spawnEmoji() {
        const el = document.createElement('span');
        el.className = 'float-emoji';
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.left = Math.random() * 100 + '%';
        el.style.animationDuration = (8 + Math.random() * 8) + 's';
        el.style.animationDelay = Math.random() * 3 + 's';
        el.style.fontSize = (1.2 + Math.random() * 1.5) + 'rem';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 18000);
    }
    for (let i = 0; i < 6; i++) setTimeout(spawnEmoji, i * 600);
    setInterval(spawnEmoji, 2500);

    // ===== Smooth scroll =====
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e) {
            e.preventDefault();
            const t = document.querySelector(this.getAttribute('href'));
            if (t) t.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // ===== Autoplay local videos in .tiktok-video =====
    document.querySelectorAll('.tiktok-video video').forEach(video => {
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.removeAttribute('poster');
        video.style.background = 'none';
        // Try to play immediately
        video.play().catch(() => {});
    });

    // ===== Set Default Center Video for Mobile Carousel =====
    const tiktokGrid = document.querySelector('.tiktok-grid');
    const tiktokVideos = document.querySelectorAll('.tiktok-video');
    if (tiktokGrid && tiktokVideos.length >= 3) {
        // Obliczamy ile musimy przewinąć żeby drugi (środkowy) element był w centrum
        // Ponieważ jest to responsywne, odpalamy to asynchronicznie kiedy strona sie wyrysuje
        setTimeout(() => {
            if (window.innerWidth <= 480) {
                // Skrolujemy do drugiego video pomniejszonego o offset środkujący
                const targetVideo = tiktokVideos[1];
                const scrollLeftPos = targetVideo.offsetLeft - (window.innerWidth / 2) + (targetVideo.offsetWidth / 2);
                tiktokGrid.scrollTo({ left: scrollLeftPos, behavior: 'instant' });
            }
        }, 100); // 100ms opóznienia zeby upewnic się, ze flex-layout na mobile zaskoczył
    }

});
