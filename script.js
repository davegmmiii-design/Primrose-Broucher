
let currentLang = 'en';
let contentData = null;

async function init() {
    // Initial State Class
    document.body.classList.add('lang-en');
    
    try {
        const response = await fetch('content.json');
        contentData = await response.json();
        render();
        setupIntersectionObserver();
    } catch (err) {
        console.error('Failed to load content:', err);
    }
}

function toggleLanguage() {
    // Toggle Logic
    if (currentLang === 'en') {
        currentLang = 'zh';
        document.body.classList.remove('lang-en');
        document.body.classList.add('lang-zh');
    } else {
        currentLang = 'en';
        document.body.classList.remove('lang-zh');
        document.body.classList.add('lang-en');
    }
    
    render();
}

function render() {
    if (!contentData) return;
    
    // IF ENGLISH: Clear all overlays (No glass cards, no text)
    if (currentLang === 'en') {
        for (let i = 1; i <= 12; i++) {
            const overlay = document.getElementById(`content-${i}`);
            if (overlay) overlay.innerHTML = '';
        }
        return;
    }

    // IF CHINESE: Inject floating translations
    const lang = contentData[currentLang];
    for (let i = 1; i <= 12; i++) {
        const overlay = document.getElementById(`content-${i}`);
        const pageKey = `page${i}`;
        const pageData = lang[pageKey];
        
        if (pageData && overlay) {
            let html = '<div class="overlay-card">';
            if (pageData.title) html += `<h2>${pageData.title}</h2>`;
            if (pageData.slogan) html += `<p style="font-weight:700; color:var(--primary-color);">${pageData.slogan}</p>`;
            if (pageData.since) html += `<p>${pageData.since}</p>`;
            if (pageData.text) html += `<p>${pageData.text}</p>`;
            if (pageData.subtitle) html += `<h3 style="color:var(--primary-color); margin-top:1rem;">${pageData.subtitle}</h3>`;
            if (pageData.subtext) html += `<p>${pageData.subtext}</p>`;
            if (pageData.brands) {
                html += `<div class="brand-grid" style="display:grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; margin-top: 1rem;">${pageData.brands.map(b => `<div class="brand-item" style="font-size:0.8rem; border:1px solid var(--glass-border); padding:0.3rem; border-radius:8px; background: rgba(0,0,0,0.2);">${b}</div>`).join('')}</div>`;
            }
            if (pageData.products) {
                html += `<div class="product-list" style="margin-top: 1.5rem; text-align: left; font-size: 0.95rem;">${pageData.products.map(p => `<div class="product-item">☕ ${p}</div>`).join('')}</div>`;
            }
            if (pageData.methods) {
                html += pageData.methods.map(m => `
                    <div style="margin-top: 1.2rem; text-align: left;">
                        <h4 style="color:var(--primary-color); border-bottom: 2px solid var(--primary-color); display: inline-block;">${m.name}</h4>
                        <p style="font-size: 0.9rem; opacity: 0.85; margin-top: 0.4rem;">${m.items.join(' • ')}</p>
                    </div>
                `).join('');
            }
            if (pageData.contacts) {
                html += pageData.contacts.map(c => `
                    <div style="margin-bottom: 1.2rem;">
                        <h4 style="color:var(--primary-color);">${c.name}</h4>
                        <p style="margin-bottom:0; font-size:0.9rem; font-weight:700;">${c.title} ${c.subtitle || ''}</p>
                        <p style="margin-bottom:0; font-size:0.9rem;">📞 ${c.tel}</p>
                        <p style="margin-bottom:0; font-size:0.9rem;">✉️ ${c.email}</p>
                    </div>
                `).join('');
                html += `<div style="margin-top: 1rem; border-top: 1px solid var(--glass-border); padding-top: 0.8rem; font-size: 0.8rem; opacity: 0.9;">
                    <p>📍 ${pageData.address}</p>
                    <p style="font-weight:800; color:var(--primary-color); font-size: 1rem; margin-top: 0.3rem;">${pageData.website}</p>
                </div>`;
            }
            html += '</div>';
            overlay.innerHTML = html;
        }
    }
}

function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.2, // Trigger earlier for smooth cinematic feel
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (currentLang === 'en') {
                 entry.target.style.opacity = "0";
                 return;
            }
            
            if (entry.isIntersecting) {
                // Staggered appearance
                setTimeout(() => {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0) scale(1)";
                }, 100);
            } else {
                entry.target.style.opacity = "0";
                entry.target.style.transform = "translateY(30px) scale(0.95)";
            }
        });
    }, observerOptions);

    document.querySelectorAll('.content-overlay').forEach(overlay => {
        overlay.style.transition = "all 1.2s cubic-bezier(0.165, 0.84, 0.44, 1)";
        overlay.style.transform = "translateY(30px) scale(0.95)";
        observer.observe(overlay);
    });
}

function showWeChat() { document.getElementById('wechat-modal').style.display = 'flex'; }
function closeWeChat() { document.getElementById('wechat-modal').style.display = 'none'; }

init();
