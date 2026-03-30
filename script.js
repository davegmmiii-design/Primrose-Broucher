
let currentLang = 'en';
let contentData = null;

async function init() {
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
    currentLang = currentLang === 'en' ? 'zh' : 'en';
    render();
}

function render() {
    if (!contentData) return;
    const lang = contentData[currentLang];
    
    // Inject content into overlays
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
                html += `<div class="brand-grid" style="display:grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; margin-top: 1rem;">${pageData.brands.map(b => `<div class="brand-item" style="font-size:0.8rem; border:1px solid var(--glass-border); padding:0.3rem; border-radius:8px;">${b}</div>`).join('')}</div>`;
            }
            if (pageData.products) {
                html += `<div class="product-list" style="margin-top: 1rem; text-align: left; font-size: 0.9rem;">${pageData.products.map(p => `<div class="product-item">☕ ${p}</div>`).join('')}</div>`;
            }
            if (pageData.methods) {
                html += pageData.methods.map(m => `
                    <div style="margin-top: 1rem; text-align: left;">
                        <h4 style="color:var(--primary-color); border-bottom: 1px solid var(--glass-border); display: inline-block;">${m.name}</h4>
                        <p style="font-size: 0.85rem; opacity: 0.8; margin-top: 0.2rem;">${m.items.join(' • ')}</p>
                    </div>
                `).join('');
            }
            if (pageData.contacts) {
                html += pageData.contacts.map(c => `
                    <div style="margin-bottom: 1rem;">
                        <h4 style="color:var(--primary-color);">${c.name}</h4>
                        <p style="margin-bottom:0; font-size:0.85rem; font-weight:bold;">${c.title} ${c.subtitle || ''}</p>
                        <p style="margin-bottom:0; font-size:0.85rem;">📞 ${c.tel}</p>
                        <p style="margin-bottom:0; font-size:0.85rem;">✉️ ${c.email}</p>
                    </div>
                `).join('');
                html += `<div style="margin-top: 0.5rem; border-top: 1px solid var(--glass-border); padding-top: 0.5rem; font-size: 0.75rem; opacity: 0.8;">
                    <p>📍 ${pageData.address}</p>
                    <p style="font-weight:700; color:var(--primary-color);">${pageData.website}</p>
                </div>`;
            }
            html += '</div>';
            overlay.innerHTML = html;
        }
    }
}

function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            } else {
                entry.target.style.opacity = "0";
                entry.target.style.transform = "translateY(20px)";
            }
        });
    }, observerOptions);

    document.querySelectorAll('.content-overlay').forEach(overlay => {
        overlay.style.transition = "all 0.8s ease-out";
        overlay.style.transform = "translateY(20px)";
        observer.observe(overlay);
    });
}

function showWeChat() { document.getElementById('wechat-modal').style.display = 'flex'; }
function closeWeChat() { document.getElementById('wechat-modal').style.display = 'none'; }

init();
