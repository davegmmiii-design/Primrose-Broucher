
const currentLang = 'zh'; // Optimized for Chinese-only powerful redesign
let contentData = null;

async function init() {
    try {
        const response = await fetch('content.json');
        contentData = await response.json();
        render();
        setupScrollInteractions();
    } catch (err) {
        console.error('Failed to load content:', err);
    }
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
            
            // Title & Slogan
            if (pageData.title) html += `<h2>${pageData.title}</h2>`;
            if (pageData.slogan) html += `<p style="font-weight:700; color:var(--primary-color); font-size:1.3rem;">${pageData.slogan}</p>`;
            
            // Main Text
            if (pageData.text) html += `<p style="text-align: justify; margin-top: 1rem;">${pageData.text}</p>`;
            
            // Secondary Content
            if (pageData.subtitle) html += `<h3>${pageData.subtitle}</h3>`;
            if (pageData.subtext) html += `<p>${pageData.subtext}</p>`;
            
            // Brands Grid
            if (pageData.brands) {
                html += `<div style="display:grid; grid-template-columns: repeat(2, 1fr); gap: 0.8rem; margin-top: 1.5rem;">${pageData.brands.map(b => `<div style="font-size:0.9rem; border:1px solid var(--glass-border); padding:0.5rem; border-radius:12px; background: rgba(255,255,255,0.05); font-weight:500;">${b}</div>`).join('')}</div>`;
            }
            
            // Products List
            if (pageData.products) {
                html += `<div style="margin-top: 1.5rem; text-align: left; font-size: 1rem; border-left: 2px solid var(--primary-color); padding-left: 1rem;">${pageData.products.map(p => `<div>☕ ${p}</div>`).join('')}</div>`;
            }
            
            // Methods
            if (pageData.methods) {
                html += pageData.methods.map(m => `
                    <div style="margin-top: 1.2rem; text-align: left;">
                        <h4 style="color:var(--primary-color); font-size:1.1rem; margin-bottom:0.3rem;">${m.name}</h4>
                        <p style="font-size: 0.9rem; opacity: 0.8;">${m.items.join(' • ')}</p>
                    </div>
                `).join('');
            }
            
            // Contacts Section
            if (pageData.contacts) {
                html += `<div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--glass-border);">`;
                html += pageData.contacts.map(c => `
                    <div style="margin-bottom: 1.2rem; text-align: center;">
                        <h4 style="color:var(--primary-color); font-size: 1.2rem;">${c.name}</h4>
                        <p style="margin-bottom:0; font-size:0.9rem; font-weight:600;">${c.title} ${c.subtitle || ''}</p>
                        <p style="margin-bottom:0; font-size:1rem; letter-spacing:1px;">${c.tel}</p>
                        <p style="margin-bottom:0; font-size:0.9rem; opacity:0.8;">${c.email}</p>
                    </div>
                `).join('');
                html += `<div style="margin-top: 1rem; font-size: 0.85rem; opacity: 0.7;">
                    <p>📍 ${pageData.address}</p>
                    <p style="font-weight:700; color:var(--primary-color); font-size:1rem;">${pageData.website}</p>
                </div></div>`;
            }
            
            html += '</div>';
            overlay.innerHTML = html;
        }
    }
}

function setupScrollInteractions() {
    const progressBar = document.getElementById('scroll-progress-bar');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    // Intersection Observer for Section Entrance
    const observerOptions = {
        threshold: 0.25
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    document.querySelectorAll('.content-overlay').forEach(overlay => {
        observer.observe(overlay);
    });

    // Scroll Depth & Indicator Logic
    window.addEventListener('scroll', () => {
        const windowScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (windowScroll / height) * 100;
        
        if (progressBar) progressBar.style.width = scrolled + "%";
        
        // Hide scroll indicator after slight scroll
        if (scrollIndicator) {
            if (windowScroll > 100) {
                scrollIndicator.style.opacity = "0";
                scrollIndicator.style.pointerEvents = "none";
            } else {
                scrollIndicator.style.opacity = "0.7";
            }
        }
    });
}

function showWeChat() { document.getElementById('wechat-modal').style.display = 'flex'; }
function closeWeChat() { document.getElementById('wechat-modal').style.display = 'none'; }

init();
