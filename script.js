
let currentLang = 'en';
let contentData = null;

async function init() {
    try {
        const response = await fetch('content.json');
        contentData = await response.json();
        render();
    } catch (err) {
        console.error('Failed to load content:', err);
    }
    
    // Smooth scroll for social links if needed
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
                html += `<div class="brand-grid">${pageData.brands.map(b => `<div class="brand-item">${b}</div>`).join('')}</div>`;
            }
            if (pageData.products) {
                html += `<div class="product-list">${pageData.products.map(p => `<div class="product-item">☕ ${p}</div>`).join('')}</div>`;
            }
            if (pageData.methods) {
                html += pageData.methods.map(m => `
                    <div style="margin-top: 1rem; text-align: left;">
                        <h4 style="color:var(--primary-color);">${m.name}</h4>
                        <p style="font-size: 0.9rem; opacity: 0.8;">${m.items.join(' • ')}</p>
                    </div>
                `).join('');
            }
            if (pageData.contacts) {
                html += pageData.contacts.map(c => `
                    <div style="margin-bottom: 1rem;">
                        <h4 style="color:var(--primary-color);">${c.name}</h4>
                        <p style="margin-bottom:0; font-size:0.9rem;">${c.title} ${c.subtitle || ''}</p>
                        <p style="margin-bottom:0; font-size:0.9rem;">📞 ${c.tel} | ✉️ ${c.email}</p>
                    </div>
                `).join('');
                html += `<div style="margin-top: 1rem; border-top: 1px solid var(--glass-border); padding-top: 0.5rem; font-size: 0.8rem;">
                    <p>📍 ${pageData.address}</p>
                    <p style="font-weight:700;">${pageData.website}</p>
                </div>`;
            }
            html += '</div>';
            overlay.innerHTML = html;
        }
    }
}

function showWeChat() { document.getElementById('wechat-modal').style.display = 'flex'; }
function closeWeChat() { document.getElementById('wechat-modal').style.display = 'none'; }

init();

function showWeChat() {
    document.getElementById('wechat-modal').style.display = 'flex';
}

function closeWeChat() {
    document.getElementById('wechat-modal').style.display = 'none';
}

init();
